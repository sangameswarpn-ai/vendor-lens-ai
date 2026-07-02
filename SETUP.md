# VendorLens AI - Local Development Setup Guide

## Prerequisites
- **Node.js** 18+ and npm/yarn
- **PostgreSQL** 12+ (running locally or on a server)
- Git

## Quick Start

### 1️⃣ Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in another terminal)
cd frontend
npm install
```

### 2️⃣ Database Setup

Ensure PostgreSQL is running and accessible.

**Option A: Using the initialization script (Recommended)**
```bash
cd backend
npm run init-db
```

**Option B: Manual SQL execution**
```bash
# Connect to PostgreSQL and run:
psql -U postgres -d vendor_lens_ai -f backend/sql/schema.sql
```

If the database doesn't exist, create it first:
```bash
createdb -U postgres vendor_lens_ai
```

### 3️⃣ Configure Environment Variables

Check that `.env` files are properly configured:

**Backend** (`backend/.env`):
```env
DATABASE_URL=postgres://postgres@localhost:5432/vendor_lens_ai
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=vendorlensai123
JWT_EXPIRES_IN=7d
UPLOAD_DIR=uploads
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4️⃣ Start the Project

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run at: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run at: `http://localhost:3000`

### 5️⃣ Test the Application

1. Open `http://localhost:3000` in your browser
2. Click **Sign Up** and create an account
3. Test **Login** with your credentials
4. Navigate to **Vendor Management** to create vendors
5. Use **Upload Contract** to upload documents
6. Check **AI Reports** for analysis

---

## Common Issues & Solutions

### ❌ "PostgreSQL connection failed"
- Ensure PostgreSQL is running: `psql -U postgres`
- Check DATABASE_URL in `backend/.env`
- Verify the database exists: `createdb -U postgres vendor_lens_ai`

### ❌ "Cannot POST /api/auth/register"
- Ensure backend is running on port 5000
- Check CORS_ORIGIN in `backend/.env` matches frontend URL
- Verify `NEXT_PUBLIC_API_URL` in `frontend/.env.local` is correct

### ❌ "TypeScript errors in frontend"
- Run: `npm run build` in frontend to see full error log
- Delete `.next` folder and reinstall: `rm -rf .next && npm install`

### ❌ "Port 5000 already in use"
- Change PORT in `backend/.env` to an available port (e.g., 5001)
- Update `NEXT_PUBLIC_API_URL` in `frontend/.env.local` accordingly

---

## Project Structure

```
vendorlens-ai/
├── backend/
│   ├── config/        # Database & logger config
│   ├── controllers/   # Route handlers
│   ├── middleware/    # Auth, upload, error handling
│   ├── models/        # Database schema references
│   ├── routes/        # API endpoints
│   ├── services/      # Business logic
│   ├── sql/           # Database schemas
│   ├── uploads/       # File upload directory
│   ├── utils/         # JWT, password utilities
│   ├── validators/    # Input validation
│   ├── server.js      # Express app entry
│   └── .env           # Environment variables
├── frontend/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── lib/           # Utilities (API, auth)
│   ├── public/        # Static assets
│   └── .env.local     # Environment variables
```

---

## Available API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Vendors
- `GET /api/vendors` - List all vendors
- `POST /api/vendors` - Create vendor
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor

### Products
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### File Upload
- `POST /api/uploads` - Upload vendor document

### AI Analysis
- `POST /api/ai/analyze` - Analyze vendor document

### Reports
- `GET /api/reports/latest` - Download latest PDF report

---

## Deployment

See [README.md](../README.md) for Vercel (frontend) and Render (backend) deployment instructions.
