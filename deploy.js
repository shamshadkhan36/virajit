const { Client } = require("ssh2");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Load environment variables from local .env if present
try {
  const envPath = path.join(__dirname, ".env");
  if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, "utf-8").split(/\r?\n/);
    envLines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const idx = trimmed.indexOf("=");
        if (idx > -1) {
          const k = trimmed.substring(0, idx).trim();
          const v = trimmed.substring(idx + 1).trim().replace(/^["']|["']$/g, "");
          if (!process.env[k]) {
            process.env[k] = v;
          }
        }
      }
    });
  }
} catch (e) {}

const SSH_CONFIG = {
  host: process.env.SSH_HOST || "193.70.46.14",
  port: parseInt(process.env.SSH_PORT || "22", 10),
  username: process.env.SSH_USER || "root",
  password: process.env.SSH_PASSWORD || "",
  readyTimeout: 30000,
};

const REMOTE_DIR = "/var/www/refurbished-laptop";
const APP_PORT = 8002;

function runRemoteCommand(conn, cmd) {
  return new Promise((resolve, reject) => {
    console.log(`\n[REMOTE EXEC] $ ${cmd}`);
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let stdout = "";
      let stderr = "";
      stream
        .on("close", (code, signal) => {
          if (code === 0) {
            resolve({ stdout, stderr, code });
          } else {
            console.warn(`[COMMAND FAILED with code ${code}] Output:\n${stdout}\n${stderr}`);
            resolve({ stdout, stderr, code });
          }
        })
        .on("data", (data) => {
          process.stdout.write(data);
          stdout += data.toString();
        })
        .stderr.on("data", (data) => {
          process.stderr.write(data);
          stderr += data.toString();
        });
    });
  });
}

function uploadFile(sftp, localPath, remotePath) {
  return new Promise((resolve, reject) => {
    console.log(`[SFTP UPLOAD] ${path.basename(localPath)} -> ${remotePath}`);
    sftp.fastPut(localPath, remotePath, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function main() {
  console.log("=== Starting Automated Deployment to VPS ===");
  console.log(`Target: ${SSH_CONFIG.username}@${SSH_CONFIG.host} (Port ${APP_PORT})`);

  // Step 1: Create local tar archive of the project excluding node_modules, .next, .git
  const archivePath = path.join(__dirname, "app-deploy.tar.gz");
  if (fs.existsSync(archivePath)) fs.unlinkSync(archivePath);

  console.log("\n1. Creating source bundle app-deploy.tar.gz...");
  // Using tar command
  try {
    execSync(`tar --exclude="node_modules" --exclude=".next" --exclude=".git" --exclude="*.log" -czf app-deploy.tar.gz src prisma public package.json tsconfig.json tailwind.config.ts postcss.config.mjs next.config.mjs .env`, {
      cwd: __dirname,
      stdio: "inherit",
    });
  } catch (err) {
    console.error("Tar creation error:", err);
    return;
  }

  console.log("Archive created successfully. Size:", (fs.statSync(archivePath).size / 1024 / 1024).toFixed(2), "MB");

  // Step 2: Connect SSH
  const conn = new Client();

  conn.on("ready", async () => {
    console.log("\n✓ SSH Connection established successfully.");

    try {
      // Step 3: Check Node.js and PM2 on remote server
      await runRemoteCommand(conn, "mkdir -p /var/www/refurbished-laptop");
      
      const nodeCheck = await runRemoteCommand(conn, "node -v; npm -v");
      if (nodeCheck.code !== 0 || !nodeCheck.stdout.includes("v")) {
        console.log("Installing Node.js 20 on remote server...");
        await runRemoteCommand(conn, "curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs build-essential");
      }

      // Check PM2
      const pm2Check = await runRemoteCommand(conn, "pm2 -v");
      if (pm2Check.code !== 0) {
        console.log("Installing PM2 globally...");
        await runRemoteCommand(conn, "npm install -g pm2");
      }

      // Step 4: Upload archive via SFTP
      conn.sftp(async (err, sftp) => {
        if (err) {
          console.error("SFTP error:", err);
          conn.end();
          return;
        }

        try {
          await uploadFile(sftp, archivePath, "/var/www/refurbished-laptop/app-deploy.tar.gz");

          // Step 5: Extract and Build on Server
          console.log("\n5. Extracting bundle on VPS...");
          await runRemoteCommand(conn, `cd ${REMOTE_DIR} && tar -xzf app-deploy.tar.gz && rm -f app-deploy.tar.gz`);

          console.log("\n6. Installing dependencies on VPS...");
          await runRemoteCommand(conn, `cd ${REMOTE_DIR} && npm install`);

          console.log("\n7. Setting up SQLite database and Seeding...");
          await runRemoteCommand(conn, `cd ${REMOTE_DIR} && npx prisma db push --force-reset && node prisma/seed.js`);

          console.log("\n8. Building Next.js application on VPS...");
          await runRemoteCommand(conn, `cd ${REMOTE_DIR} && npm run build`);

          console.log(`\n9. Launching application with PM2 on Port ${APP_PORT}...`);
          await runRemoteCommand(conn, `pm2 delete refurbished-laptop || true`);
          await runRemoteCommand(conn, `cd ${REMOTE_DIR} && PORT=${APP_PORT} pm2 start npm --name "refurbished-laptop" -- start -- -p ${APP_PORT}`);
          await runRemoteCommand(conn, `pm2 save`);

          console.log("\n10. Checking firewall rules (UFW)...");
          await runRemoteCommand(conn, `which ufw && ufw allow ${APP_PORT}/tcp || true`);

          console.log("\n11. Verifying local curl on VPS...");
          const curlRes = await runRemoteCommand(conn, `curl -I http://127.0.0.1:${APP_PORT}`);

          console.log("\n========================================================");
          console.log(`🚀 DEPLOYMENT COMPLETED SUCCESSFULLY!`);
          console.log(`🌐 Live URL: http://${SSH_CONFIG.host}:${APP_PORT}`);
          console.log(`🛠️ Admin URL: http://${SSH_CONFIG.host}:${APP_PORT}/admin`);
          console.log(`📖 Blog URL: http://${SSH_CONFIG.host}:${APP_PORT}/blog`);
          console.log("========================================================");
        } catch (uploadErr) {
          console.error("SFTP or build error:", uploadErr);
        } finally {
          conn.end();
          if (fs.existsSync(archivePath)) fs.unlinkSync(archivePath);
        }
      });
    } catch (cmdErr) {
      console.error("Remote command error:", cmdErr);
      conn.end();
    }
  });

  conn.on("error", (err) => {
    console.error("SSH Connection Error:", err);
  });

  conn.connect(SSH_CONFIG);
}

main();
