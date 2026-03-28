# AlphaCreative Website

Next.js 14 app — AlphaCreative platform and portfolio site.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (feedback form backend)
- Vercel (hosting)

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Copy env file and fill in values
   ```bash
   cp .env.local.example .env.local
   ```

3. Run the Supabase migration
   - Open your Supabase project → SQL Editor
   - Paste and run `supabase-feedback-migration.sql`

4. Run locally
   ```bash
   npm run dev
   ```

## Routes
- `/` — Homepage
- `/feedback` — Client feedback form (public)
- `/admin/feedback` — Feedback admin dashboard (password protected)
- `/api/feedback` — POST endpoint for form submissions

## Deploy
Push to `main` — Vercel auto-deploys.

Add these environment variables in Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_USER`
- `ADMIN_PASSWORD`
