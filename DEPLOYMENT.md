# VendorLens AI - Complete Deployment Guide

This guide covers deploying both backend (Render) and frontend (Vercel) to production.

---

## 🚀 Architecture Overview

```
┌─────────────────────────────────────────────┐
│ Frontend (Vercel)                           │
│ https://vendor-lens-ai.vercel.app          │
│ - Next.js 16 (React)                        │
│ - TypeScript + Tailwind CSS                 │
│ - Static export + ISR                       │
└──────────────────┬──────────────────────────┘
                   │ API Calls (HTTPS)
                   │ CORS Enabled
                   ▼
┌─────────────────────────────────────────────┐
│ Backend (Render)                            │
│ https://vendor-lens-backend.onrender.com    │
│ - Express.js + Node.js                      │
│ - JWT Authentication                        │
│ - File Upload (Multer)                      │
│ - AI Analysis Service                       │
└──────────────────┬──────────────────────────┘
                   │ SQL Queries
                   │ TCP Connection
                   ▼
┌─────────────────────────────────────────────┐
│ Database (Render PostgreSQL)                │
│ postgresql://host:5432/vendor_lens_ai       │
│ - Users Table                               │
│ - Vendors Table                             │
│ - Products Table                            │
│ - Documents Table                           │
│ - AI Reports Table                          │
└─────────────────────────────────────────────┘
```

---

## 📋 Pre-Deployment Checklist

### Backend
- [ ] All environment variables defined in `backend/.env`
- [ ] Database connection string verified
- [ ] JWT secret is strong (32+ characters)
- [ ] CORS_ORIGIN configured
- [ ] npm dependencies installed (`npm install`)
- [ ] No console.log() statements left (or wrapped in dev-only code)
- [ ] Error handling in all routes
- [ ] Database schema created

### Frontend
- [ ] Build succeeds locally (`npm run build`)
- [ ] Environment variables in `frontend/.env.local`
- [ ] API_URL points to backend
- [ ] No hardcoded localhost references
- [ ] TypeScript compiles without errors
- [ ] Authentication guards in place

### Git/GitHub
- [ ] All code committed and pushed to main branch
- [ ] No sensitive files committed (.env, secrets, etc.)
- [ ] Repository is public (or connected to Render/Vercel)

---

## 🎯 Quick Start Deployment

### Step 1: Deploy Backend to Render (15 minutes)

See: [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)

Key steps:
1. Create PostgreSQL database on Render
2. Create Web Service and connect GitHub
3. Set Root Directory to `backend`
4. Add environment variables
5. Deploy
6. Run `npm run init-db` in Shell tab
7. Test health endpoint

**Expected Outcome:**
```bash
curl https://vendor-lens-backend.onrender.com/health
# Response: {"success": true, "message": "Healthy"}
```

---

### Step 2: Deploy Frontend to Vercel (10 minutes)

See: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

Key steps:
1. Connect GitHub repository to Vercel
2. Set Root Directory to `frontend`
3. Add environment variables
4. Deploy
5. Verify frontend is accessible
6. Test authentication flow

**Expected Outcome:**
```
https://vendor-lens-ai.vercel.app → Works ✅
Login → Redirects to /dashboard ✅
```

---

### Step 3: Connect Services

1. Update Backend CORS:
   ```
   CORS_ORIGIN = https://vendor-lens-ai.vercel.app
   ```

2. Update Frontend API:
   ```
   NEXT_PUBLIC_API_URL = https://vendor-lens-backend.onrender.com/api
   ```

3. Restart both services

---

## 🧪 Post-Deployment Testing

### Test Backend API

```bash
# Health Check
curl https://vendor-lens-backend.onrender.com/health

# Register
curl -X POST https://vendor-lens-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'

# Login
curl -X POST https://vendor-lens-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Frontend

1. Open `https://vendor-lens-ai.vercel.app`
2. Sign up with new account
3. Login with credentials
4. Navigate to Dashboard
5. Create vendor
6. Upload document
7. Check AI analysis

---

## 📊 Monitoring & Maintenance

### Monitor Backend

**Render Dashboard:**
- View real-time logs
- Monitor CPU/Memory usage
- Check deployment history
- Restart service if needed

**Common Issues:**
- Database connection failures
- Memory leaks (check logs)
- Deployment timeouts

### Monitor Frontend

**Vercel Dashboard:**
- View build logs
- Monitor Core Web Vitals
- Check error rates
- View analytics

---

## 🔐 Security Checklist

### Environment Variables
- [ ] JWT_SECRET is strong (no default values)
- [ ] DATABASE_URL uses secure connection
- [ ] No secrets in code or .env files
- [ ] All .env files in .gitignore

### CORS
- [ ] CORS_ORIGIN is specific (not "*" in production)
- [ ] Only frontend domain is allowed

### Database
- [ ] SSL enabled for database connection
- [ ] Regular backups configured
- [ ] Strong database password

### Frontend
- [ ] HTTPS enforced
- [ ] No sensitive data in localStorage
- [ ] JWT tokens validated before API calls

---

## 💾 Backup & Recovery

### Database Backups

Render PostgreSQL automatically backups:
- Daily (7-day retention on free tier)
- 30-day retention on paid plans

**Manual Backup:**
```bash
# From Render Shell tab
pg_dump --no-owner --no-privileges $DATABASE_URL > backup.sql
```

### Code Backups

GitHub is your backup:
- Push all changes to main branch
- Vercel/Render auto-deploy on push

---

## 🚦 Scaling Checklist

When you need more performance:

**Backend (Render):**
- Upgrade from Free → Starter ($7/month)
- Add more reserved capacity
- Monitor database performance

**Frontend (Vercel):**
- Already scales automatically
- Consider Pro plan for analytics

**Database (Render):**
- Upgrade PostgreSQL tier as needed
- Add read replicas for high traffic

---

## 📞 Support & Troubleshooting

### Common Issues

**Problem:** Backend not responding
- Check Render Dashboard logs
- Verify DATABASE_URL
- Run `npm run init-db` again

**Problem:** CORS errors from frontend
- Verify CORS_ORIGIN matches frontend URL exactly
- Restart backend service
- Check browser console for full error

**Problem:** Login not working
- Check JWT_SECRET is set
- Verify database tables exist
- Check user creation endpoint

**Problem:** File uploads not working
- Render free tier doesn't persist files
- Upgrade to paid tier for persistent storage
- Or integrate AWS S3

### Get Help

- **Render Support:** https://render.com/support
- **Vercel Support:** https://vercel.com/support
- **GitHub Issues:** Open an issue in the repository

---

## 📈 Performance Tips

### Backend
- Use database indexes on frequently queried columns
- Cache common queries
- Implement rate limiting
- Use connection pooling

### Frontend  
- Enable ISR (Incremental Static Regeneration)
- Lazy load components
- Optimize images
- Use CDN (Vercel provides this)

### Database
- Regular VACUUM and ANALYZE
- Monitor slow queries
- Add indexes as needed

---

## 🎓 Next Steps

1. **Set up monitoring**: Use Sentry for error tracking
2. **Configure alerts**: Get notified of failures
3. **Add analytics**: Track user behavior
4. **Implement logging**: Structured logging for debugging
5. **Schedule backups**: Automate database backups
6. **Plan scaling**: Prepare for growth

---

## 📚 Additional Resources

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Next.js Deployment](https://nextjs.org/docs/deployment/vercel)

---

## ✅ Deployment Summary

| Component | Platform | Status | URL |
|-----------|----------|--------|-----|
| Frontend | Vercel | Deployed | https://vendor-lens-ai.vercel.app |
| Backend | Render | Deployed | https://vendor-lens-backend.onrender.com |
| Database | Render PostgreSQL | Ready | postgresql://... |

**Total Time:** ~25 minutes  
**Cost:** Free tier available for both services

