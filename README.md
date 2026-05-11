# Modern Full-Stack eCommerce Dashboard

This repository contains the complete full-stack code for the eCommerce dashboard. It includes a beautiful React frontend, a scalable Node.js + Prisma backend, and supplementary PHP APIs.

## Folder Structure

- `/frontend` - React + Vite + Tailwind UI (Configured for GitHub Pages deployment)
- `/backend-node` - Express + Prisma ORM REST API (MySQL/PostgreSQL)
- `/backend-php` - PHP Backend API endpoints

## Frontend Demo Deployment (GitHub Pages)

The frontend is specifically configured to deploy to your GitHub account for free, running as a static demonstration using React `HashRouter`.

1. Open a terminal in the root directory and initialize git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. Navigate to the frontend folder and deploy:
   ```bash
   cd frontend
   npm install
   npm run deploy
   ```
   *This will compile the React code and automatically push it to the `gh-pages` branch, making your dashboard live.*

## Backend Setup (Local Development)

Because GitHub Pages only supports static frontend sites, the Node.js and PHP APIs must be run on a traditional server (like Render, AWS, or your local machine) to be fully functional.

### Node.js Setup
1. `cd backend-node`
2. `npm install`
3. Update the `.env` file with your MySQL/PostgreSQL connection string:
   `DATABASE_URL="mysql://user:password@localhost:3306/ecommerce"`
4. Run `npx prisma db push` to generate the database tables.
5. Run `node index.js` to start the server.

### PHP Setup
Place the `backend-php` folder inside your XAMPP/WAMP `htdocs` or standard Apache/Nginx web root to serve the PHP API endpoints.

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS, Recharts, Lucide React
- **Backend:** Node.js, Express, Prisma (and PHP)
- **Database:** PostgreSQL / MySQL
