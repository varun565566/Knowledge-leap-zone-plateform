# Knowledge Leap Zone - Deployment Guide

## ✅ Pre-Deployment Checklist

Your site has been verified and is ready for deployment:

- ✅ Build successful (711.33 kB optimized bundle)
- ✅ Production preview tested
- ✅ Git repository initialized
- ✅ Environment variables configured
- ✅ Deployment configurations created (Vercel & Netlify)

## 🚀 Quick Deployment Options

### Option 1: Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   # Create a new repository on GitHub
   # Then run:
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variables:
     - `VITE_SUPABASE_URL`: `https://nbbozpqfbohgyuuezlgc.supabase.co`
     - `VITE_SUPABASE_PUBLISHABLE_KEY`: (from .env file)
     - `VITE_SUPABASE_PROJECT_ID`: `nbbozpqfbohgyuuezlgc`
   - Click "Deploy"

   **Or use Vercel CLI:**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

### Option 2: Deploy to Netlify

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Netlify will auto-detect settings from `netlify.toml`
   - Add environment variables in Site settings → Environment variables
   - Click "Deploy"

   **Or use Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod
   ```

### Option 3: Deploy to GitHub Pages

1. **Update vite.config.ts** (add base path):
   ```typescript
   export default defineConfig(({ mode }) => ({
     base: '/knowledge-leap-zone-main/', // Your repo name
     // ... rest of config
   }))
   ```

2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to package.json:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

### Option 4: Deploy to Railway/Render/Fly.io

These platforms can auto-detect your Vite app and deploy it. Just:
1. Connect your GitHub repository
2. Add environment variables
3. Deploy

## 🔐 Environment Variables Required

Make sure to add these environment variables on your deployment platform:

```env
VITE_SUPABASE_PROJECT_ID=nbbozpqfbohgyuuezlgc
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iYm96cHFmYm9oZ3l1dWV6bGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODIxMDAsImV4cCI6MjA3ODI1ODEwMH0.u4YfetNxQ0JYLbyq-2WofXyb4fI3oe8JjB9XH7GeNdo
VITE_SUPABASE_URL=https://nbbozpqfbohgyuuezlgc.supabase.co
```

## 📦 Build Information

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** 18 or higher
- **Bundle Size:** ~711 KB (gzipped: ~207 KB)

## 🧪 Testing Production Build Locally

Your production build is currently running at:
- Preview URL: http://localhost:4173

To stop and restart:
```bash
# Stop
Ctrl+C

# Rebuild and preview
npm run build
npm run preview
```

## ⚠️ Important Notes

1. **Don't commit .env to public repositories** - The .env file should be in .gitignore
2. **Add environment variables** on your deployment platform (not in code)
3. **Update Supabase CORS settings** if needed for your production domain
4. **Consider enabling analytics** (Vercel Analytics, Google Analytics, etc.)

## 📊 Performance Optimization

The build shows a warning about chunk size. Consider optimizing by:
1. Code splitting with dynamic imports
2. Lazy loading routes
3. Analyzing bundle with `npm run build -- --sourcemap`

## 🆘 Troubleshooting

**Build fails:**
- Check Node.js version (should be 18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Runtime errors:**
- Verify environment variables are set correctly
- Check browser console for specific errors
- Ensure Supabase project is active

**Deployment issues:**
- Ensure `dist` folder is being deployed, not root
- Verify SPA routing redirects are configured (handled by vercel.json/netlify.toml)

---

**Your site is ready to deploy! Choose your preferred platform above and follow the steps.**
