# Deploy VendorLens AI Backend to Render

This guide walks you through deploying the backend to Render with PostgreSQL.

## Prerequisites

- GitHub account with the `vendor-lens-ai` repository pushed
- Render account (free tier available at https://render.com)

---

## Step 1: Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **PostgreSQL**
3. Fill in the form:
   - **Name**: `vendor-lens-db`
   - **Database**: `vendor_lens_ai`
   - **User**: `postgres`
   - **Region**: Choose closest to your location
   - **PostgreSQL Version**: Latest (14+)
4. Click **Create Database**
5. Wait 2-3 minutes for the database to be ready
6. Copy the **Internal Database URL** (for backend service)
   - Format: `postgresql://user:password@hostname:5432/vendor_lens_ai`

---

## Step 2: Deploy Backend Service to Render

### A. Connect GitHub Repository

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Click **Connect account** next to your GitHub repository
4. Select `vendor-lens-ai` repository
5. Authorize Render to access your GitHub

### B. Configure Web Service

1. Fill in the service settings:
   - **Name**: `vendor-lens-backend`
   - **Environment**: `Node`
   - **Region**: Same as database (important for performance)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend` ⚠️ **IMPORTANT**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

2. Click **Advanced** to add Environment Variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Paste the Internal Database URL from Step 1 |
| `PORT` | `5000` |
| `JWT_SECRET` | Generate a strong random string (use: `openssl rand -base64 32`) |
| `JWT_EXPIRES_IN` | `7d` |
| `CORS_ORIGIN` | `https://your-frontend-domain.vercel.app` (update after frontend deployment) |
| `UPLOAD_DIR` | `uploads` |

3. **Instance Type**: Select `Free` (or `Starter` for production)

4. Click **Create Web Service**

---

## Step 3: Initialize Database Tables

After the backend service is deployed:

1. Go to Render Dashboard → Your backend service
2. Click **Shell** tab (or use the connect button)
3. Run the database initialization:
   ```bash
   npm run init-db
   ```
4. Wait for confirmation: `✅ Database initialized successfully!`

---

## Step 4: Verify Deployment

1. Go to your backend service page on Render
2. Under **Deploys**, check the latest deployment status (should show "Live")
3. Copy your service URL (e.g., `https://vendor-lens-backend.onrender.com`)
4. Test the health endpoint in your browser or terminal:
   ```bash
   curl https://vendor-lens-backend.onrender.com/health
   ```
   Expected response:
   ```json
   {"success": true, "message": "Healthy"}
   ```

---

## Step 5: Update Frontend Configuration

After backend is deployed, update your frontend `.env.production` or deployment environment:

```env
NEXT_PUBLIC_API_URL=https://vendor-lens-backend.onrender.com/api
```

---

## Environment Variables Reference

### Production Backend Environment Variables

```env
# Server
NODE_ENV=production
PORT=5000

# Database (from Render PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/vendor_lens_ai

# JWT
JWT_SECRET=your-strong-random-secret-key
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=https://your-frontend-domain.vercel.app

# File Upload
UPLOAD_DIR=uploads
```

---

## Generate Strong JWT Secret

Use one of these methods:

**Option 1: OpenSSL (Mac/Linux)**
```bash
openssl rand -base64 32
```

**Option 2: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 3: Online Generator**
Visit: https://www.lastpass.com/password-generator

---

## Deployment Checklist

- [ ] PostgreSQL database created on Render
- [ ] Internal Database URL copied
- [ ] Backend service created on Render
- [ ] Root Directory set to `backend`
- [ ] All environment variables configured
- [ ] `npm run init-db` executed successfully
- [ ] Health endpoint responds with 200 OK
- [ ] Backend URL noted for frontend configuration

---

## Troubleshooting

### ❌ "PostgreSQL connection failed"
**Solution:**
- Verify DATABASE_URL is correct (use Internal URL for Render service)
- Ensure database is in READY state
- Run `npm run init-db` again
- Check logs: Render Dashboard → Service → Logs

### ❌ "Service failed to start"
**Solution:**
- Check Root Directory is set to `backend`
- Check Build Command: `npm install`
- Check Start Command: `npm start`
- Review logs for errors

### ❌ "CORS errors when frontend calls backend"
**Solution:**
- Update CORS_ORIGIN to match frontend URL
- Restart the service after changing environment variables
- Check that CORS is allowed in server.js

### ❌ "File uploads not working"
**Solution:**
- Render free tier doesn't persist files between deploys
- Upgrade to paid tier or use external storage (AWS S3, etc.)
- For now, uploads work but are cleared on service restart

---

## Next Steps

1. **Deploy Frontend**: Use Vercel (see FRONTEND_DEPLOYMENT.md)
2. **Connect Services**: Update CORS_ORIGIN and NEXT_PUBLIC_API_URL
3. **Monitor**: Set up error tracking with Sentry or similar
4. **Scale**: Upgrade Render plan if needed for production traffic

---

## Useful Render Commands

**View Logs:**
```
Render Dashboard → Service → Logs tab
```

**Manually Trigger Deploy:**
```
Render Dashboard → Service → Manual Deploy
```

**Connect via SSH:**
```
Render Dashboard → Service → Shell tab
```

**Restart Service:**
```
Render Dashboard → Service → Settings → Restart Service
```

---

## Support

- **Render Docs**: https://render.com/docs
- **Express.js Docs**: https://expressjs.com
- **PostgreSQL Docs**: https://www.postgresql.org/docs

