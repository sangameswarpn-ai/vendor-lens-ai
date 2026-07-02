# Vendor Lens AI 🔍

Vendor Lens AI is a full-stack web application that helps businesses monitor, review, and evaluate vendors. The project utilizes a Next.js (React) frontend and an Express (Node.js) backend connected to a PostgreSQL database, featuring an automated PDF reports generator and AI-powered notes analysis.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (v16 App Router)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) & [Base UI](https://base-ui.com/)
- **State Management & Icons**: [Lucide React](https://lucide.dev/), Shadcn
- **API Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via `pg` client pool)
- **Authentication**: JWT (JSON Web Tokens) & Password Hashing (bcryptjs)
- **File Handling**: [Multer](https://github.com/expressjs/multer) (for file uploads)
- **PDF Generation**: [PDFKit](https://pdfkit.org/)

---

## 📁 Monorepo Folder Structure

The repository is structured as a monorepo containing both the frontend and backend applications:

```text
vendor-lens-ai/
├── frontend/               # Next.js App
│   ├── app/                # Pages and routing
│   ├── components/         # Reusable UI components
│   ├── lib/                # API client (api.ts) & auth state (auth.ts)
│   ├── public/             # Static assets
│   ├── package.json        # Frontend scripts and dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   └── .env.example        # Frontend environment variables template
│
├── backend/                # Express API Server
│   ├── config/             # DB & logger configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth, upload, and error middlewares
│   ├── models/             # DB queries & schema definition
│   ├── routes/             # API route handlers
│   ├── services/           # External/internal logic service helpers
│   ├── sql/                # SQL scripts (schema creation)
│   ├── package.json        # Backend scripts and dependencies
│   ├── server.js           # Server entry point
│   └── .env.example        # Backend environment variables template
│
├── README.md               # Monorepo documentation
└── .gitignore              # Repository gitignore settings
```

---

## ⚙️ Environment Variables Required

You must configure the following environment variables in order for the applications to run properly.

### Frontend (`frontend/.env`)
Create a `.env` file inside the `frontend/` folder:
```env
# The URL where the Express backend API is running
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)
Create a `.env` file inside the `backend/` folder:
```env
# PostgreSQL database connection URL (e.g. Supabase, Neon, or local PostgreSQL)
DATABASE_URL=postgres://username:password@localhost:5432/vendor_lens_ai

# Server settings
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Authentication (Use a strong unique random key in production)
JWT_SECRET=replace-with-a-strong-secret
JWT_EXPIRES_IN=7d

# File Upload Settings
UPLOAD_DIR=uploads
```

---

## 🚀 Local Development Setup

Follow these steps to run the frontend and backend locally.

### Prerequisites
- Node.js installed (v18 or higher recommended)
- PostgreSQL database instance running locally or hosted in the cloud

### Step 1: Clone the Repository
```bash
git clone https://github.com/sangameswarpn-ai/vendor-lens-ai.git
cd vendor-lens-ai
```

### Step 2: Database Initialization
1. Ensure your PostgreSQL server is running.
2. Create a database named `vendor_lens_ai`.
3. Locate the initialization SQL scripts inside `backend/sql/` (or database migrations) and execute them to create tables (e.g. `vendors`, `products`, `users`).

### Step 3: Run the Backend
1. Open a new terminal in the repository root:
   ```bash
   cd backend
   npm install
   ```
2. Set up the backend environment variables:
   - Copy `.env.example` to `.env` and fill in your PostgreSQL credentials (`DATABASE_URL`).
3. Start the dev server:
   ```bash
   npm run dev
   ```
   *The backend will be running at `http://localhost:5000`.*

### Step 4: Run the Frontend
1. Open a new terminal in the repository root:
   ```bash
   cd frontend
   npm install
   ```
2. Set up the frontend environment variables:
   - Copy `.env.example` to `.env` and point it to the backend url.
3. Start the dev server:
   ```bash
   npm run dev
   ```
   *The frontend will be running at `http://localhost:3000`.*

---

## 🌐 GitHub Setup & Committing

1. Initialize git (if not already done):
   ```bash
   git init
   ```
2. Add remote:
   ```bash
   git remote add origin https://github.com/sangameswarpn-ai/vendor-lens-ai.git
   ```
3. Commit and push:
   ```bash
   git add .
   git commit -m "Configure monorepo structure and prepare for deployment"
   git push -u origin master
   ```

*Note: Since the `.gitignore` contains strict rule patterns, your secret keys, local databases, and temporary directories will never be pushed.*

---

## ☁️ Vercel Deployment (Frontend)

You can easily deploy the frontend to Vercel:

1. Sign in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import your GitHub repository: `vendor-lens-ai`.
4. Configure the Project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend` *(This is important!)*
   - **Build Command**: `npm run build` (Vercel default)
   - **Output Directory**: `.next` (Vercel default)
5. Expand the **Environment Variables** section and add:
   - `NEXT_PUBLIC_API_URL`: *The URL of your deployed backend on Render (e.g., `https://vendor-lens-api.onrender.com/api`)*
6. Click **Deploy**.

---

## ☁️ Render Deployment (Backend)

You can deploy the backend web service to Render:

### Step 1: Deploy PostgreSQL Database
1. Go to your [Render Dashboard](https://dashboard.render.com).
2. Click **New** > **PostgreSQL**.
3. Name your database (e.g., `vendor-lens-db`) and click **Create Database**.
4. Once database is ready, copy the **Internal Database URL** (for backend web service) or **External Database URL** (for local tool verification).

### Step 2: Deploy Backend Service
1. In the Render Dashboard, click **New** > **Web Service**.
2. Connect your GitHub repository: `vendor-lens-ai`.
3. Configure the Web Service settings:
   - **Name**: `vendor-lens-backend`
   - **Runtime**: `Node`
   - **Root Directory**: `backend` *(This is important!)*
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js` (or `npm start`)
4. Click **Advanced** to add Environment Variables:
   - `DATABASE_URL`: *The Internal Database URL copied from Step 1*
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: *A strong secret key*
   - `JWT_EXPIRES_IN`: `7d`
   - `CORS_ORIGIN`: *Your Vercel deployment URL (e.g., `https://vendor-lens-ai.vercel.app`)*
   - `UPLOAD_DIR`: `uploads`
5. Click **Create Web Service**.
