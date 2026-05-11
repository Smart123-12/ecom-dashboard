# 🛒 Modern Full-Stack eCommerce Dashboard

A production-ready, scalable eCommerce admin dashboard built with **React**, **Node.js**, **PHP**, and **MySQL/PostgreSQL**.

---

## 📁 Project Structure

```
ecomarce/
├── frontend/          → React + Vite + TailwindCSS (GitHub Pages Demo)
│   └── src/
│       ├── pages/     → Dashboard, Login, Register, Products, Orders, Customers, Settings
│       ├── layouts/   → AdminLayout (Sidebar + Navbar)
│       └── lib/       → Utility functions
│
├── backend-node/      → Node.js + Express + Prisma (REST API)
│   ├── controllers/   → authController, productController, orderController
│   ├── routes/        → authRoutes, productRoutes, orderRoutes
│   ├── middleware/     → JWT auth + Admin role guard
│   └── prisma/        → schema.prisma + seed.js
│
├── backend-php/       → PHP REST API (MySQL)
│   ├── config/        → db.php (database connection)
│   ├── auth.php       → Login & Register API
│   └── products.php   → Products CRUD API
│
└── database/
    └── schema.sql     → Full MySQL schema (10 tables with indexes & seed data)
```

---

## 🚀 GitHub Pages Demo Deployment (FREE)

The frontend demo is configured to deploy to **GitHub Pages for free** with zero server costs.

### Step 1: Create GitHub Repo
Go to [github.com/new](https://github.com/new) and create an empty repository.

### Step 2: Push Code to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 3: Deploy to GitHub Pages
```bash
cd frontend
npm run deploy
```
✅ Your dashboard will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO`

---

## ⚙️ Node.js Backend Setup (Local)

```bash
cd backend-node
npm install
cp .env.example .env     # Fill in your DB credentials
npx prisma db push       # Creates all tables in your DB
node prisma/seed.js      # Adds demo data
node index.js            # Start the server (port 5000)
```

### API Endpoints
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login & get JWT | Public |
| GET | `/api/auth/me` | Get current user | JWT |
| GET | `/api/products` | List products (search, pagination) | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |
| GET | `/api/orders` | List all orders | Admin |
| PATCH | `/api/orders/:id/status` | Update order status | Admin |

---

## 🐘 PHP Backend Setup (XAMPP/Shared Hosting)

1. Copy the `backend-php/` folder into your XAMPP `htdocs/` or web root.
2. Visit `http://localhost/backend-php/auth.php?action=login` to test.

---

## 🗄️ Database Setup (MySQL)

```bash
mysql -u root -p < database/schema.sql
```
This creates all 10 tables: `users`, `products`, `categories`, `orders`, `order_items`, `payments`, `cart`, `wishlists`, `reviews`, `coupons`, `notifications`.

---

## 🔑 Admin Credentials (Demo)

| Field | Value |
|-------|-------|
| Email | `admin@example.com` |
| Password | `admin123` |
| Role | `ADMIN` |

---

## 🔒 Environment Variables (.env)

```env
DATABASE_URL="mysql://root:password@localhost:3306/ecommerce"
JWT_SECRET="your_super_secret_key"
STRIPE_SECRET_KEY="sk_test_..."
PAYPAL_CLIENT_ID="your_paypal_id"
RAZORPAY_KEY_ID="rzp_test_..."
PORT=5000
```

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, TailwindCSS v4, Recharts, React Router |
| Node Backend | Express.js, Prisma ORM, JWT, bcrypt |
| PHP Backend | PHP 8, MySQLi, password_hash |
| Database | MySQL / PostgreSQL |
| Deployment | GitHub Pages (Frontend), Any PHP/Node host (Backend) |

---

*Built with ❤️ — Full-stack, production-ready.*
