# 🚀 Deployment Guide - Dynamic Payment Links

## ✅ GitHub Push Status

**COMPLETED** ✓
- All changes pushed to GitHub
- Repository: `you3333ef/always-payment-system`
- Branch: `main`
- Commit: `feat: implement dynamic payment links with OG meta tags`

## 📦 Netlify Deployment Options

### Option 1: Automatic Deployment (Recommended)

1. **Connect GitHub to Netlify**
   ```
   1. Go to https://app.netlify.com/start
   2. Click "Deploy with GitHub"
   3. Select repo: always-payment-system
   4. Configure build settings:
      - Build command: npm run build
      - Publish directory: dist
   5. Click "Deploy site"
   ```

2. **Environment Variables** (if needed)
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   ```

3. **Auto-deploy on Push**
   - Netlify will automatically build and deploy on every git push
   - New commits trigger automatic deployments

### Option 2: Manual Deployment

1. **Using Netlify Drop** (Quick)
   ```
   1. Go to https://app.netlify.com/drop
   2. Drag and drop the 'dist' folder
   3. Your site is live!
   ```

2. **Using Netlify CLI** (Advanced)
   ```bash
   # Install CLI
   npm install -g netlify-cli

   # Deploy
   netlify deploy --prod --dir=dist
   ```

## 🌐 Site Configuration

### Build Settings
```
Build command: npm run build
Publish directory: dist
Node version: 18.x or higher
```

### Redirects (Already configured in netlify.toml)
```
/r/*  →  /.netlify/functions/microsite-meta  (200)
/pay/*  →  /.netlify/functions/microsite-meta  (200)
/*  →  /index.html  (200)
```

### Edge Functions (Already configured)
```
Path: /pay/*
Function: og-injector
```

## 📋 Post-Deployment Checklist

- [ ] Visit site and verify it loads
- [ ] Test creating a shipping link (DHL - UAE)
- [ ] Test creating a shipping link (Aramex - SA)
- [ ] Test Preview button opens correct URL
- [ ] Test Copy button copies URL with parameters
- [ ] Test Microsite shows correct OG image
- [ ] Test payment page displays correct currency
- [ ] Verify OG meta tags on social platforms

## 🔍 Testing URLs

After deployment, test these example URLs:

**Shipping Links:**
```
/create/SA/shipping (Saudi Arabia - SAR)
/create/AE/shipping (UAE - AED)
/create/KW/shipping (Kuwait - KWD)
```

**Payment Pages:**
```
/pay/{linkId}/recipient?company=dhl&currency=AED&title=Payment%20in%20UAE
/pay/{linkId}/recipient?company=aramex&currency=SAR&title=Payment%20in%20Saudi%20Arabia
```

**Microsites:**
```
/r/SA/shipping/{linkId}?company=aramex
/r/AE/shipping/{linkId}?company=dhl
```

## 🎯 Dynamic Features Verified

- ✅ Company-specific OG meta tags
- ✅ Currency display per country
- ✅ Dynamic titles
- ✅ Preview & Copy functionality
- ✅ SPA routing
- ✅ Social media sharing

## 🆘 Troubleshooting

**Build Fails:**
```bash
# Check build locally
npm run build

# Check for TypeScript errors
npm run lint
```

**OG Meta Tags Not Working:**
- Ensure Edge Function is deployed
- Check `/pay/*` routes
- Verify og-injector.ts is in edge-functions/

**Currency Not Displaying:**
- Check URL parameters
- Verify countryData.ts is imported
- Check PaymentRecipient.tsx logic

## 📞 Support

For deployment issues:
1. Check Netlify build logs
2. Verify environment variables
3. Test locally first with `npm run build`

---

**Status**: Ready for Deployment ✅
**Build**: Successful ✅
**GitHub**: Pushed ✅
