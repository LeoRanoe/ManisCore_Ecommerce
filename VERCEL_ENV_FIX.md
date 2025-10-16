# Fix for 404 Error on E-commerce Root Page

## Problem
The root page (`/`) is showing a 404 error because the environment variable `NEXT_PUBLIC_DEFAULT_COMPANY` is not properly configured in Vercel.

## Solution

### Step 1: Set Environment Variable in Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select the `maniscore-ecommerce` project
3. Go to **Settings** → **Environment Variables**
4. Add or update the following variable:
   - **Key**: `NEXT_PUBLIC_DEFAULT_COMPANY`
   - **Value**: `next-x`
   - **Environments**: Select all (Production, Preview, Development)
5. Click **Save**

### Step 2: Redeploy

After setting the environment variable, you must redeploy:

1. Go to the **Deployments** tab
2. Find the latest deployment
3. Click the three dots menu (⋯) and select **Redeploy**
4. Or make a new commit to trigger a new deployment

### Step 3: Verify

After redeployment:
- Visit: https://maniscore-ecommerce.vercel.app/
- It should redirect to: https://maniscore-ecommerce.vercel.app/next-x
- You should see the home page instead of 404

## Alternative: Direct Access

If you want to access the site immediately while waiting for the environment variable fix:
- Go directly to: https://maniscore-ecommerce.vercel.app/next-x

## What Was Fixed

1. **Updated `.env.local`**: Changed default company from `nextx` to `next-x` to match production
2. **Updated `src/app/page.tsx`**: Changed fallback default from `nextx` to `next-x`

## Important Notes

- `NEXT_PUBLIC_*` environment variables are embedded at **build time**
- Changing them in Vercel requires a **rebuild/redeploy**
- For local development, restart your dev server after changing `.env.local`

## Local Development

For local testing, restart your development server:

```powershell
cd d:\ManisCore\ManisCore_Ecommerce
pnpm run dev
```

Then visit: http://localhost:3001
