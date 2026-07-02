# Deploy VendorLens AI Frontend to Vercel

This guide walks you through deploying the frontend to Vercel.

## Prerequisites

- Vercel account (free tier available at https://vercel.com)
- GitHub account with `vendor-lens-ai` repository
- Backend already deployed to Render (get the URL)

---

## Step 1: Connect GitHub to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Click **Continue with GitHub**
4. Select the `vendor-lens-ai` repository
5. Click **Import**

---

## Step 2: Configure Project Settings

1. **Project Name**: `vendor-lens-ai` (or any name)

2. **Framework Preset**: Select `Next.js`

3. **Root Directory**: Click **Edit** and set to `frontend`

4. **Build Command**: `npm run build` (default)

5. **Install Command**: `npm install` (default)

6. **Output Directory**: `.next` (default)

---

## Step 3: Add Environment Variables

1. Scroll down to **Environment Variables** section
2. Add the following variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | `https://vendor-lens-backend.onrender.com/api` |

Replace `vendor-lens-backend` with your actual Render backend service name.

---

## Step 4: Deploy

1. Click **Deploy**
2. Wait for the build to complete (usually 2-5 minutes)
3. Once complete, you'll get a URL like: `https://vendor-lens-ai.vercel.app`

---

## Step 5: Update Backend CORS

Go back to Render Dashboard:

1. Select your backend service
2. Go to **Environment** tab
3. Update `CORS_ORIGIN`:
   ```
   https://vendor-lens-ai.vercel.app
   ```
4. Click **Save Changes**
5. Service will auto-restart

---

## Step 6: Verify Deployment

1. Open your Vercel URL in browser: `https://vendor-lens-ai.vercel.app`
2. Test the signup/login flow
3. Create a vendor
4. Upload a document
5. Check AI analysis

---

## Environment Variables Reference

### Production Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-backend-service.onrender.com/api
```

---

## Deployment Checklist

- [ ] GitHub repository connected to Vercel
- [ ] Root Directory set to `frontend`
- [ ] Environment variables added
- [ ] Initial deployment successful
- [ ] CORS updated on backend
- [ ] Frontend URL working
- [ ] API calls connecting to backend
- [ ] Authentication flow working

---

## Troubleshooting

### ❌ "Build failed"
**Solution:**
- Check Root Directory is set to `frontend`
- Check logs in Vercel Dashboard
- Ensure all dependencies in `frontend/package.json` are installed locally: `npm install`

### ❌ "CORS errors"
**Solution:**
- Verify CORS_ORIGIN in backend matches your Vercel URL exactly
- Check that backend is running and responding
- Restart the backend service

### ❌ "API calls returning 404"
**Solution:**
- Verify NEXT_PUBLIC_API_URL ends with `/api`
- Check backend service URL is correct
- Ensure backend is deployed and running

### ❌ "Images not loading"
**Solution:**
- Check `public` folder has all images
- Rebuild and redeploy: **Vercel Dashboard** → **Deployments** → Click latest → **Redeploy**

---

## Auto-Deploy on Git Push

Every time you push to the `main` branch (or your default branch), Vercel automatically redeploys:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

---

## Custom Domain (Optional)

1. Go to **Vercel Dashboard** → Your project → **Settings**
2. Go to **Domains** tab
3. Add your custom domain (e.g., `vendorlens.com`)
4. Update DNS records as instructed
5. Update backend CORS_ORIGIN if needed

---

## Environment Variables by Deployment Stage

### Development (Local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Staging (Vercel Preview)
```env
NEXT_PUBLIC_API_URL=https://vendor-lens-backend.onrender.com/api
```

### Production (Vercel)
```env
NEXT_PUBLIC_API_URL=https://vendor-lens-backend.onrender.com/api
```

---

## Useful Vercel Commands

**Deploy using CLI:**
```bash
npm i -g vercel
cd frontend
vercel
```

**View Logs:**
```
Vercel Dashboard → Project → Deployments → Select deployment → Logs
```

**Rollback to Previous Deployment:**
```
Vercel Dashboard → Deployments → Click previous version → Promote to Production
```

---

## Performance Tips

1. **Enable Analytics**:
   - Vercel Dashboard → Settings → Analytics
   - Enable Core Web Vitals monitoring

2. **Set up ISR** (Incremental Static Regeneration):
   - Already configured in Next.js 16
   - Static pages regenerate on demand

3. **Monitor Build Time**:
   - Aim for builds under 60 seconds
   - Check Vercel Dashboard for optimization suggestions

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Community**: https://github.com/vercel/next.js/discussions

