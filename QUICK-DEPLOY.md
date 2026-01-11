# ⚡ Quick Deploy Instructions

## Deploy Now (Choose One Method)

### Method 1: Using Cloud Console (Easiest - No Terminal Needed)

1. **Go to Cloud Run Console**: https://console.cloud.google.com/run?project=495546644086
2. **Click your service**: `air-traffic-expert-portal`
3. **Click "EDIT & DEPLOY NEW REVISION"**
4. **Select "Continuously deploy from source repository"**
5. **Choose**: 
   - Repository: `willmac1wm/airtrafficexpert-site`
   - Branch: `main`
   - Build type: `Dockerfile`
6. **Click "DEPLOY"**
7. **Wait 2-3 minutes** - Done! ✅

### Method 2: Using Terminal Script

```bash
# Make script executable (first time only)
chmod +x deploy.sh

# Deploy
./deploy.sh
```

### Method 3: Manual gcloud Command

```bash
gcloud run deploy air-traffic-expert-portal \
    --source . \
    --region us-west1 \
    --platform managed \
    --allow-unauthenticated
```

## What Was Fixed

✅ **Routing**: Switched from HashRouter to BrowserRouter - all links work now
✅ **Blog Page**: Added `/blog` route
✅ **Server**: Express server properly serves JavaScript files
✅ **Deployment**: Created automation for future updates

## After Deployment

Your site will be live at:
`https://air-traffic-expert-portal-495546644086.us-west1.run.app`

**All pages work:**
- `/` - Home
- `/services` - Services
- `/blog` - Blog
- `/simulator` - Simulator
- `/simulation` - Simulator (alternate)

## Future Updates

**Option A: Auto-deploy** (Recommended)
- Set up GitHub Actions (see DEPLOY.md)
- Every push to `main` auto-deploys

**Option B: Manual**
- Run `./deploy.sh` whenever you make changes
