# 🚀 Vercel Deployment Guide

Complete step-by-step guide to deploy Lumina to Vercel.

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [x] All code committed to GitHub
- [x] `.env.local` file configured locally (for testing)
- [x] `.env.example` file in repository
- [x] All API keys obtained
- [x] Local development tested and working
- [x] At least 10-15 meaningful commits with good messages

## Step 1: Prepare API Keys

### Required API Keys

#### 1. **Neon Database** (Production)

```bash
# Create production database
1. Go to: https://console.neon.tech
2. Create new project: "lumina-production"
3. Copy connection string
4. Save as: DATABASE_URL
```

#### 2. **NextAuth Secret**

```bash
# Generate secure secret
openssl rand -base64 32

# Or use online generator
# Visit: https://generate-secret.vercel.app/32

# Save as: NEXTAUTH_SECRET
```

#### 3. **Google OAuth**

```bash
1. Go to: https://console.cloud.google.com
2. Select your project
3. Navigate to: APIs & Services → Credentials
4. Click your OAuth 2.0 Client ID
5. Add Authorized Redirect URI:
   https://your-app-name.vercel.app/api/auth/callback/google

# Note: You'll update "your-app-name" after Vercel assigns domain
```

#### 4. **GitHub OAuth**

```bash
1. Go to: https://github.com/settings/developers
2. Click your OAuth App
3. Update Authorization callback URL:
   https://your-app-name.vercel.app/api/auth/callback/github
```

#### 5. **AI Provider** (OpenAI/Anthropic/Gemini)

- Already have from local development
- Use same key for production

#### 6. **Tool APIs**

- **OpenWeatherMap**: Same key as development
- **Alpha Vantage**: Same key as development

## Step 2: Push to GitHub

```bash
# Make sure all changes are committed
git status

# If there are uncommitted changes
git add .
git commit -m "chore: prepare for production deployment"

# Push to GitHub
git push origin main
```

### Verify `.gitignore`

Ensure these files are NOT committed:

```gitignore
# Environment variables
.env
.env.local
.env*.local

# Build output
.next/
out/

# Dependencies
node_modules/

# Other
.DS_Store
*.log
```

## 🚢 Step 3: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

#### 1. **Import Project**

```bash
1. Go to: https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Import"
```

#### 2. **Configure Project**

```bash
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build (or leave default)
Output Directory: .next (or leave default)
Install Command: npm install (or leave default)
```

#### 3. **Environment Variables**

Click "Environment Variables" and add each one:

```env
# Database
DATABASE_URL = postgresql://...

# NextAuth
NEXTAUTH_URL = https://your-app.vercel.app (leave this for now)
NEXTAUTH_SECRET = [paste your generated secret]

# OAuth - Google
GOOGLE_CLIENT_ID = [paste your client ID]
GOOGLE_CLIENT_SECRET = [paste your client secret]

# OAuth - GitHub
GITHUB_CLIENT_ID = [paste your client ID]
GITHUB_CLIENT_SECRET = [paste your client secret]

# AI Provider (choose one)
OPENAI_API_KEY = sk-proj-...
# OR
ANTHROPIC_API_KEY = sk-ant-...
# OR
GEMINI_API_KEY = ...

# Tool APIs
OPENWEATHER_API_KEY = [paste your key]
ALPHA_VANTAGE_API_KEY = [paste your key]
```

**Important:** For each variable:

- Select environment: `Production`, `Preview`, `Development` (check all)
- Click "Add"

#### 4. **Deploy**

```bash
1. Click "Deploy"
2. Wait 2-5 minutes for build
3. Watch build logs for any errors
```

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# Set up and deploy? Yes
# Which scope? [Select your account]
# Link to existing project? No
# What's your project's name? lumina
# In which directory is your code located? ./
# Want to modify settings? No

# Deploy to production
vercel --prod
```

## 🔧 Step 4: Post-Deployment Configuration

### 1. **Get Your Vercel Domain**

After deployment completes, you'll get a URL like:

```
https://lumina-xyz123.vercel.app
```

### 2. **Update NEXTAUTH_URL**

```bash
1. Go to: Vercel Dashboard → Your Project → Settings → Environment Variables
2. Find NEXTAUTH_URL
3. Click "Edit"
4. Change to: https://your-actual-vercel-domain.vercel.app
5. Click "Save"
6. Redeploy: Deployments → Latest → "Redeploy"
```

### 3. **Update OAuth Redirect URIs**

#### Google OAuth:

```bash
1. Go to: https://console.cloud.google.com
2. Navigate to: APIs & Services → Credentials
3. Click your OAuth Client ID
4. Under "Authorized redirect URIs", add:
   https://your-actual-vercel-domain.vercel.app/api/auth/callback/google
5. Click "Save"
```

#### GitHub OAuth:

```bash
1. Go to: https://github.com/settings/developers
2. Click your OAuth App
3. Update "Authorization callback URL":
   https://your-actual-vercel-domain.vercel.app/api/auth/callback/github
4. Click "Update application"
```

### 4. **Verify Database Connection**

```bash
1. Go to: https://console.neon.tech
2. Select your production project
3. Ensure database is active (not paused)
4. Copy connection string again if needed
5. Verify DATABASE_URL in Vercel matches
```

## Step 5: Test Production Deployment

### Test Checklist

Visit your deployed app and test:

- [ ] **Landing page loads** without errors
- [ ] **Dark mode toggle** works
- [ ] **Google OAuth login** works
- [ ] **GitHub OAuth login** works
- [ ] **Chat interface** loads after login
- [ ] **AI responses** stream correctly
- [ ] **Weather tool** returns data
- [ ] **F1 schedules tool** returns data
- [ ] **Stock price tool** returns data
- [ ] **Chat history** persists after refresh
- [ ] **Logout** works
- [ ] **Mobile responsive** design works

### Check for Errors

```bash
# View Vercel logs
1. Go to: Vercel Dashboard → Your Project → Deployments
2. Click latest deployment
3. Click "Functions" or "Build Logs"
4. Check for any errors
```

## 🐛 Common Deployment Issues

### Issue 1: OAuth Redirect URI Mismatch

**Error:**

```
Error: redirect_uri_mismatch
```

**Solution:**

1. Verify NEXTAUTH_URL matches your Vercel domain exactly
2. Check OAuth provider redirect URIs include full callback path
3. Ensure no trailing slashes

### Issue 2: Database Connection Failed

**Error:**

```
Error: P1001: Can't reach database server
```

**Solution:**

1. Verify DATABASE_URL is correct
2. Check Neon DB is not paused
3. Ensure SSL mode is included: `?sslmode=require`
4. Test connection in Neon dashboard

### Issue 3: Environment Variables Not Working

**Error:**

```
Error: Environment variable X is not defined
```

**Solution:**

1. Go to Vercel → Settings → Environment Variables
2. Verify all variables are set
3. Ensure they're enabled for Production
4. Redeploy after adding variables

### Issue 4: Build Fails

**Error:**

```
Error: Command "npm run build" exited with 1
```

**Solution:**

1. Check build logs for specific error
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`
4. Check TypeScript errors: `npm run type-check`

### Issue 5: API Rate Limits

**Error:**

```
Error: 429 Too Many Requests
```

**Solution:**

1. Implement caching for API calls
2. Add rate limiting middleware
3. Consider upgrading API tiers
4. Use free tiers wisely during testing

## Security Best Practices

### Production Checklist

- [ ] All secrets in Vercel environment variables (not in code)
- [ ] `.env.local` in `.gitignore`
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] OAuth redirect URIs use HTTPS
- [ ] Database uses SSL connection
- [ ] Rate limiting implemented (optional but recommended)
- [ ] Error messages don't expose sensitive data
- [ ] CORS configured properly
- [ ] Input validation on all API routes

## Monitoring & Maintenance

### Vercel Analytics

```bash
# Enable analytics
1. Go to: Vercel Dashboard → Your Project → Analytics
2. Click "Enable Analytics"
3. Monitor: Page views, performance, visitors
```

### Database Monitoring

```bash
# Neon DB monitoring
1. Go to: https://console.neon.tech
2. Select your project
3. Monitor: Query performance, storage, connections
```

### Error Tracking (Optional)

Consider integrating:

- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Vercel Logs**: Built-in logging

## Continuous Deployment

Once set up, every push to `main` branch automatically deploys:

```bash
git add .
git commit -m "feat: add new feature"
git push origin main

# Vercel automatically:
# 1. Detects push
# 2. Builds project
# 3. Runs tests
# 4. Deploys to production
```

### Preview Deployments

Every PR gets a preview URL:

```bash
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create PR on GitHub
# Vercel automatically creates preview deployment
# Test on preview URL before merging
```

## Domain Configuration (Optional)

### Add Custom Domain

```bash
1. Go to: Vercel Dashboard → Your Project → Settings → Domains
2. Click "Add Domain"
3. Enter your domain: lumina.yourdomain.com
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)
6. Update NEXTAUTH_URL to custom domain
7. Update OAuth redirect URIs to custom domain
```

## 📈 Performance Optimization

### Vercel Settings

```bash
# Go to: Project Settings → General
1. Enable "Automatically expose System Environment Variables": Yes
2. Node.js Version: 18.x (or latest LTS)
3. Framework Preset: Next.js

# Go to: Project Settings → Functions
1. Function Region: [Choose closest to users]
2. Max Duration: 10s (adjust if needed)
```

### Database Optimization

```bash
# Neon DB settings
1. Enable connection pooling
2. Set appropriate compute size
3. Configure auto-suspend for cost savings
4. Add indexes to frequently queried columns
```

## Success!

Your Lumina app should now be:

✅ **Live** on Vercel
✅ **Secure** with HTTPS
✅ **Fast** with edge deployment
✅ **Reliable** with automatic deployments
✅ **Monitored** with analytics
