# Initial Provisioning (Supabase + Vercel)

## 1. Supabase Project

- Project ref: `rkzvnbcbwudcskufcnci`
- Base URL: `https://rkzvnbcbwudcskufcnci.supabase.co`

## 2. Supabase Auth (Google OAuth)

- Enable Google provider in Supabase Auth.
- Add redirect URLs:
  - `http://localhost:3000/auth/callback`
  - `https://<vercel-preview-url>/auth/callback`
  - `https://<production-domain>/auth/callback`

## 3. Storage

- Create bucket: `listing-images`
- Suggested access policy for MVP:
  - uploads allowed for authenticated users only
  - reads constrained by RLS checks in listings flow

## 4. Vercel Project

- Create Vercel project connected to `fabiocostagomes/uniformes`.
- Configure environment variables from `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_SITE_URL`

## 5. Local setup

1. Copy `.env.example` to `.env.local`.
2. Fill values with Supabase keys.
3. Run:

```bash
pnpm install
pnpm test:unit -- env.test.ts
```

Expected: test passes after variables are filled with non-placeholder values.

