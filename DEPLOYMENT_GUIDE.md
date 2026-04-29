# BuildWithKayAI — Deployment Guide
## Phase 6: Polish & Deploy

---

## STEP 1 — Test Locally First
```bash
cd buildwithkayai-v2
npm install
npm run dev
```
Open http://localhost:3000 and check:
- [ ] Home page loads
- [ ] All tabs navigate correctly
- [ ] AI Co-Pilot opens and responds
- [ ] Contact form submits
- [ ] Admin login works at /admin/login
- [ ] Admin dashboard shows correctly
- [ ] Can create a new post
- [ ] Subscribe form works

---

## STEP 2 — Push to GitHub
```bash
git add .
git commit -m "Complete BuildWithKayAI v2 — full stack portfolio"
git push
```

---

## STEP 3 — Deploy to Vercel

1. Go to **vercel.com** → Log in with GitHub
2. Click **"Add New Project"**
3. Import your **buildwithkayai-v2** repository
4. Vercel auto-detects Next.js — leave settings as default
5. **DO NOT click Deploy yet** — add env vars first (Step 4)

---

## STEP 4 — Add Environment Variables in Vercel

In Vercel project settings → **Environment Variables**, add ALL of these:

```
ANTHROPIC_API_KEY          = sk-ant-xxxxxxxxxx
GROQ_API_KEY               = gsk_xxxxxxxxxx
NEXT_PUBLIC_SUPABASE_URL   = https://xxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = xxxxxxxxxx
SUPABASE_SERVICE_KEY       = xxxxxxxxxx
RESEND_API_KEY             = re_xxxxxxxxxx
ADMIN_EMAIL                = oyekunlekehinde23@gmail.com
ADMIN_PASSWORD             = your_secure_password
NEXTAUTH_SECRET            = your_random_long_string_here
NEXTAUTH_URL               = https://www.buildwithkayai.com
```

⚠️ Make sure NEXTAUTH_URL is your LIVE domain, not localhost!

---

## STEP 5 — Deploy
Click **"Deploy"** in Vercel.
Wait ~2 minutes for build to complete.

---

## STEP 6 — Connect buildwithkayai.com Domain

### In Vercel:
1. Go to your project → **Settings → Domains**
2. Click **"Add Domain"**
3. Type: `buildwithkayai.com`
4. Also add: `www.buildwithkayai.com`
5. Vercel shows you nameservers or DNS records

### In Namecheap:
1. Go to **Domain List → Manage → Nameservers**
2. Select **"Custom DNS"**
3. Add Vercel's nameservers (shown in Vercel dashboard)
4. Save

DNS propagation takes **10 minutes to 48 hours**.

---

## STEP 7 — Set Up Supabase Storage

1. Go to **Supabase → Storage**
2. Click **"New Bucket"**
3. Name: `buildwithkayai`
4. Set to **Public**
5. Click **"Create bucket"**

This is needed for image and CV uploads to work.

---

## STEP 8 — Set Up Resend Domain

1. Go to **resend.com → Domains**
2. Click **"Add Domain"**
3. Add `buildwithkayai.com`
4. Add the DNS records Resend provides to Namecheap
5. Verify the domain

This allows emails to send from `noreply@buildwithkayai.com`

---

## STEP 9 — Train Your AI Co-Pilot

1. Go to **buildwithkayai.com/admin**
2. Login with your admin credentials
3. Click **"RAG DOCS"** in the nav
4. Add your documents in this order:

### Add your CV:
- Type: CV
- Title: "Kehinde Oyekunle CV"
- Content: Paste your full CV text

### Add your LinkedIn posts:
- Type: Post
- Title: "Career Journey Post"
- Content: Paste the full post text

### Add project details:
- Type: Project
- Title: "VMS Project Details"
- Content: Full description of what you built

The more you add, the smarter the AI becomes! ✅

---

## STEP 10 — Final Testing Checklist

### Public Site:
- [ ] buildwithkayai.com loads correctly
- [ ] All 8 tabs work
- [ ] AI Co-Pilot responds accurately
- [ ] Contact form sends email to you
- [ ] Subscribe form works and sends confirmation email
- [ ] CV download works (or triggers email if no CV)
- [ ] LOGS section shows posts
- [ ] Mobile view looks correct

### Admin:
- [ ] buildwithkayai.com/admin/login works
- [ ] Dashboard shows stats
- [ ] Can create, edit, publish a post
- [ ] Published post appears on /logs
- [ ] Messages inbox works
- [ ] Subscribers page shows data
- [ ] Analytics tracks events
- [ ] RAG documents can be added/removed
- [ ] Settings page loads

---

## FUTURE UPDATES

Every time you make changes:
```bash
git add .
git commit -m "describe what you changed"
git push
```
Vercel auto-deploys in ~60 seconds. ✅

---

## TROUBLESHOOTING

### Build fails on Vercel:
- Check all env vars are added correctly
- Make sure NEXTAUTH_URL is the live domain not localhost
- Check Vercel build logs for specific errors

### Emails not sending:
- Verify Resend domain is confirmed
- Check RESEND_API_KEY is correct in Vercel env vars
- Check Resend dashboard for failed sends

### Admin login not working:
- Verify ADMIN_EMAIL and ADMIN_PASSWORD match exactly
- Make sure NEXTAUTH_SECRET is set
- Try clearing browser cookies

### AI not responding:
- Verify ANTHROPIC_API_KEY is valid and has credits
- GROQ_API_KEY should be set as fallback
- Check Vercel function logs for errors
