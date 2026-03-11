# 🚀 Deploy to Netlify - Complete Guide

## ✅ Ready to Deploy

Your application is **fully configured** and ready for Netlify deployment.

---

## 📋 Deployment Steps

### Option 1: Deploy via Netlify Dashboard (Recommended)

#### Step 1: Go to Netlify
```
https://app.netlify.com
```

#### Step 2: Create New Site
1. Click **"Add new site"**
2. Select **"Import an existing project"**

#### Step 3: Connect GitHub
1. Click **"Deploy with GitHub"**
2. Authorize Netlify if prompted
3. Search for repository: `sadadonline17-oss/you_pyment`
4. Click to select it

#### Step 4: Configure Build Settings

Netlify will auto-detect most settings. Verify these:

| Setting | Value |
|---------|-------|
| **Base directory** | (leave empty) |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Functions directory** | `netlify/functions` |
| **Edge Functions directory** | `netlify/edge-functions` |

#### Step 5: Set Environment Variables

Click **"Advanced"** → **"New variable"** → Add these if needed:

```
VITE_SUPABASE_URL = your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY = your_supabase_key
VITE_TELEGRAM_BOT_TOKEN = your_bot_token
VITE_TELEGRAM_CHAT_ID = your_chat_id
```

> ⚠️ **Note:** These are optional. The app works without them using fallback mode.

#### Step 6: Deploy
1. Click **"Deploy site"**
2. Wait for build to complete (~2-5 minutes)
3. Click on the site name to view your live site!

---

### Option 2: Deploy via Netlify CLI

#### Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Login to Netlify
```bash
netlify login
```

#### Deploy
```bash
cd /data/data/com.termux/files/home/you_pyment_source
netlify deploy --prod
```

Follow the prompts:
- **Site name:** you_pyment (or your preferred name)
- **Build command:** npm run build
- **Publish directory:** dist

---

## 🔧 Netlify Configuration

### netlify.toml (Already configured ✅)

```toml
[build]
  publish = "dist"
  command = "npm ci && npm run build"
  functions = "netlify/functions"
  edge_functions = "netlify/edge-functions"

[build.environment]
  NODE_VERSION = "20.12.1"
  NPM_FLAGS = "--legacy-peer-deps"
```

### Features Enabled

- ✅ **Edge Functions** - Dynamic OG meta tags
- ✅ **Netlify Forms** - Payment form submissions
- ✅ **SPA Routing** - Client-side routing support
- ✅ **Security Headers** - X-Frame-Options, CSP, etc.
- ✅ **Image Caching** - OG images cached for 1 year

---

## 🌐 Your Live Site URL

After deployment, your site will be available at:

```
https://you_pyment.netlify.app
```

Or with the generated Netlify subdomain:
```
https://<random-name>.netlify.app
```

### Custom Domain (Optional)

To add a custom domain:
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `payment.yoursite.com`)
4. Follow DNS configuration instructions

---

## 🧪 Post-Deployment Checklist

### 1. Test Payment Flow
```
- Open your Netlify site
- Create a test payment link
- Share the link
- Complete a test payment
```

### 2. Verify OG Tags
```
- Share a payment link on WhatsApp
- Check if preview image appears
- Verify company branding shows correctly
```

### 3. Test Netlify Forms
```
- Submit a test payment
- Go to Netlify Dashboard → Your Site → Forms
- Verify form submission appears
```

### 4. Check Edge Functions
```
- Open any payment page
- View page source
- Look for dynamic OG meta tags
```

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Check build logs on Netlify
# Common issues:
# - Node version mismatch → Verify NODE_VERSION = 20.12.1
# - Dependency issues → Verify NPM_FLAGS = --legacy-peer-deps
```

### Site Shows Blank Page
```
1. Clear browser cache (Ctrl + Shift + R)
2. Check browser console for errors
3. Verify base URL is "/" in vite.config.ts
```

### Forms Not Working
```
1. Go to Netlify Dashboard → Site → Forms
2. Enable form detection
3. Re-deploy the site
```

### OG Images Not Showing
```
1. Wait 5-10 minutes for cache to clear
2. Use WhatsApp URL debugger:
   https://developers.facebook.com/tools/debug/
3. Share link again
```

---

## 📊 Deployment Status

| Component | Status |
|-----------|--------|
| Build Config | ✅ Ready |
| Edge Functions | ✅ Configured |
| Netlify Forms | ✅ Enabled |
| SPA Routing | ✅ Configured |
| Security Headers | ✅ Set |
| Environment Variables | ⚠️ Optional |
| GitHub Repository | ✅ Connected |

---

## 🎯 Quick Deploy Link

Click here to start deployment:

**[Deploy to Netlify](https://app.netlify.com/start)**

Then select: `sadadonline17-oss/you_pyment`

---

## 📞 Support

If you encounter any issues:

1. **Check Build Logs:** Netlify Dashboard → Deploys → Click on deploy → View build log
2. **Test Locally:** `npm run build` then `npm run preview`
3. **Clear Cache:** Netlify Dashboard → Deploys → Trigger deploy → Clear cache and deploy site

---

**Ready to deploy?** Follow Option 1 above for the easiest deployment! 🚀
