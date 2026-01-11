# 🔧 GitHub Actions Setup (One-Time)

Your GitHub Actions workflow failed because the `GCP_SA_KEY` secret isn't set up yet. Follow these steps:

## Quick Setup (5 minutes)

### 1. Create Service Account

**Direct link**: https://console.cloud.google.com/iam-admin/serviceaccounts?project=495546644086

1. Click **"CREATE SERVICE ACCOUNT"**
2. **Name**: `github-actions-deploy`
3. Click **"CREATE AND CONTINUE"**
4. **Grant roles**:
   - ✅ `Cloud Run Admin`
   - ✅ `Service Account User`  
   - ✅ `Storage Admin`
5. Click **"CONTINUE"** → **"DONE"**

### 2. Create JSON Key

1. Click on the service account you just created
2. Go to **"KEYS"** tab
3. Click **"ADD KEY"** → **"Create new key"**
4. Select **"JSON"**
5. Click **"CREATE"** - File downloads automatically

### 3. Add to GitHub Secrets

**Direct link**: https://github.com/willmac1wm/airtrafficexpert-site/settings/secrets/actions

1. Click **"New repository secret"**
2. **Name**: `GCP_SA_KEY`
3. **Value**: Open the downloaded JSON file, select all (Cmd+A), copy (Cmd+C), paste here
4. Click **"Add secret"**

### 4. Test It

1. Go to: https://github.com/willmac1wm/airtrafficexpert-site/actions
2. Click **"Deploy to Cloud Run"** workflow
3. Click **"Run workflow"** → **"Run workflow"** button
4. Watch it deploy! ✅

## After Setup

- ✅ Every push to `main` auto-deploys
- ✅ No manual steps needed
- ✅ Deployment takes ~3-5 minutes

## Troubleshooting

**"GCP_SA_KEY secret not found"**
- Make sure you added the secret exactly as `GCP_SA_KEY`
- Check that you copied the ENTIRE JSON file content

**"Permission denied"**
- Make sure the service account has all 3 roles listed above
- Wait 1-2 minutes after creating roles (propagation delay)

**"Build failed"**
- Check the Actions logs for specific errors
- Make sure `npm run build` works locally first

## Need Help?

Check the full [DEPLOY.md](DEPLOY.md) guide for more details.
