# VirajIT - Refurbished Laptop Store & Services Platform

A modern, full-stack e-commerce and store portal built for **VirajIT** (Kandivali West, Mumbai) using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM** with SQLite.

---

## ✨ Features

- **Dynamic Product Catalogue**:
  - Filter by price tiers (Under ₹20,000, ₹30,000, ₹40,000+), brand, RAM, storage, and processor.
  - Dedicated SEO-optimized category and landing pages.
- **Stock Lock & Reservation Engine**:
  - Temporary 10-minute cart lock mechanism prevents overselling and race conditions during high-demand checkouts.
  - Automatic expiration and lock release for abandoned checkouts.
- **Admin Management Portal (`/admin`)**:
  - **Inventory Management**: Add, edit, remove products, and bulk upload products via CSV.
  - **Live Lock Monitor**: View active customer session locks and manually release locks when necessary.
  - **Orders Dashboard**: Track customer orders, payment status, and shipping information.
  - **Page & Blog Builder**: Visual block-based editor to create and manage dynamic blog posts and landing content.
- **Service & Location Landing Pages**:
  - Laptop Rentals in Mumbai (`/laptop-on-rent-mumbai`)
  - Laptop Repair Services (`/laptop-repair-store-in-mumbai`)
  - Local Store Presence (`/virajit-laptop-store-kandivali-west`)
- **Automated VPS Deployment**:
  - Built-in `deploy.js` script for automated zero-friction deployment to VPS via SSH/SFTP with PM2 process manager.

---

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Lucide React
- **Database & ORM**: SQLite via Prisma ORM
- **Deployment**: Node.js / PM2 / SSH2

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18.x or 20.x+
- npm / yarn / pnpm

### 2. Installation
```bash
git clone https://github.com/shamshadkhan36/virajit.git
cd virajit
npm install
```

### 3. Environment Setup
Copy the sample environment file:
```bash
cp .env.example .env
```
Ensure `DATABASE_URL` is set:
```env
DATABASE_URL="file:./dev.db"
```

### 4. Database Setup & Seeding
Generate Prisma client and initialize database schema:
```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

### 5. Running the Application
Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

To run the production build locally:
```bash
npm run build
npm run start
```

---

## 🧪 Testing Stock Locking System

To verify concurrency handling and stock reservation:
```bash
node test-stock-lock.js
```

---

## 📦 Deployment to VPS

The repository includes an automated deployment script `deploy.js` using `ssh2`.

1. Set your SSH credentials in `.env`:
   ```env
   SSH_HOST="your-vps-ip"
   SSH_PORT="22"
   SSH_USER="root"
   SSH_PASSWORD="your-password"
   ```
2. Run deployment:
   ```bash
   node deploy.js
   ```

---

## 📄 License

Private & Proprietary - VirajIT.
