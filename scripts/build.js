const { execSync } = require('child_process');

// Default fallback to local SQLite database if DATABASE_URL is not specified in cloud environment
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./dev.db';
}

console.log('--- Step 1: Generating Prisma Client ---');
execSync('npx prisma generate', { stdio: 'inherit', env: process.env });

console.log('--- Step 2: Syncing Database Schema ---');
execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit', env: process.env });

console.log('--- Step 3: Seeding Catalogue & Blogs ---');
try {
  execSync('node prisma/seed.js', { stdio: 'inherit', env: process.env });
} catch (err) {
  console.warn('Seed warning (continuing build):', err.message);
}

console.log('--- Step 4: Building Next.js Application ---');
execSync('npx next build', { stdio: 'inherit', env: process.env });
