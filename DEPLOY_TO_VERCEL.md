# 🚀 Deploying ARAY AI to Vercel

Since your project is already on GitHub, deploying to Vercel is very fast.

### 1. Connect Vercel to GitHub
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Next to your repository `dnzkubilay/Aray-ai`, click **"Import"**.

### 2. Configure Project
1. **Framework Preset:** Leave as `Next.js`.
2. **Root Directory:** Leave as `./`.
3. **Environment Variables:**
   You MUST add the following variables (copy them from your `.env.local` file):
   
   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://ozvrijvbdslxauztujrp.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_...` (Your long key) |
   | `SUPABASE_SERVICE_ROLE_KEY` | `sb_secret_...` (Your secret key) |
   | `STRIPE_SECRET_KEY` | (Optional for now) Add this later when testing payments |

### 3. Deploy
1. Click **"Deploy"**.
2. Wait for about 1-2 minutes.
3. Once finished, you will get a live URL (e.g., `aray-ai.vercel.app`).

### 🎉 Done!
Your site is now live worldwide. 

**Note:** If "Sign In" doesn't work on the live site, you need to add your Vercel URL to Supabase:
1. Go to Supabase Dashboard -> Authentication -> URL Configuration.
2. Add your new Vercel URL (e.g., `https://aray-ai.vercel.app`) to "Redirect URLs".
