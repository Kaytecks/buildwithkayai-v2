# BuildWithKayAI — Claude Code Project Brief

## About This Project
Full-stack portfolio website for **Kehinde Afolarin Oyekunle** — DevOps & SRE Engineer based in Middlesbrough, UK.
Domain: **buildwithkayai.com**
Admin panel: **buildwithkayai.com/admin**

---

## Owner Profile
- **Name:** Kehinde Afolarin Oyekunle (goes by Kay)
- **Role:** DevOps & SRE Engineer
- **Location:** Middlesbrough, UK (open to remote worldwide)
- **Email:** oyekunlekehinde23@gmail.com
- **LinkedIn:** linkedin.com/in/kehinde-oyekunle-081045227
- **Education:** MSc Cybersecurity - Teesside University (May 2026-2028) | B.Eng Electrical/Electronics - OOU Nigeria (2016-2022)
- **Research Focus:** AI + Cybersecurity (AI-powered threat detection, DevSecOps, automated incident response)

---

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL + pgvector for RAG)
- **Auth:** NextAuth.js + Supabase Auth (admin only)
- **AI Chatbot:** Claude API (primary) + Groq (fallback)
- **RAG:** LangChain + Supabase pgvector
- **Emails:** Resend
- **Styling:** Tailwind CSS + custom CSS variables
- **Hosting:** Vercel
- **Domain:** buildwithkayai.com

---

## Design System
Always follow these design rules strictly:

### Colours
```css
--bg: #02040a
--bg2: #040810
--card: rgba(255,255,255,0.03)
--border: rgba(255,255,255,0.07)
--border-bright: rgba(0,245,255,0.3)
--cyan: #00f5ff
--cyan2: #00c8ff
--green: #00ff88
--purple: #8b5cf6
--pink: #ff2d9b
--gold: #ffd700
--text: #f0f4f8
--muted: rgba(240,244,248,0.4)
```

### Fonts
- **Display/Headings:** Cabinet Grotesk (weights: 400, 700, 800, 900)
- **Monospace/Labels:** JetBrains Mono (weights: 300, 400, 500, 600)
- **Hero headings:** Syne (weights: 700, 800)

### Design Principles
- Dark cyberpunk aesthetic throughout
- Matrix binary rain background (canvas) — cyan colour, NOT green
- Glowing cyan cursor dot on desktop only (hidden on mobile/touch)
- Fixed bottom marquee ticker always visible
- Terminal/command line aesthetic for cards and labels
- Bracket corners on cards (top-left + bottom-right diagonal only)
- All section labels in format: `// SECTION NAME`
- Monospace font for all labels, tags, metadata
- Smooth fade-in animations on scroll

---

## Project Structure
```
buildwithkayai-v2/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              ← Home (Hero + Teaser cards)
│   │   ├── about/
│   │   ├── projects/
│   │   ├── cybersec/
│   │   ├── experience/
│   │   ├── certifications/
│   │   ├── logs/
│   │   │   └── [slug]/           ← Individual log post
│   │   └── contact/
│   ├── admin/
│   │   ├── login/                ← Admin login
│   │   ├── forgot-password/      ← Forgot password
│   │   ├── reset-password/       ← Reset password
│   │   ├── page.tsx              ← Admin dashboard
│   │   ├── logs/
│   │   │   ├── new/
│   │   │   └── [id]/edit/
│   │   ├── subscribers/
│   │   ├── messages/
│   │   ├── documents/
│   │   └── analytics/
│   ├── api/
│   │   ├── chat/
│   │   ├── contact/
│   │   ├── subscribe/
│   │   ├── unsubscribe/
│   │   ├── upload/
│   │   └── auth/
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── portfolio/
│   ├── admin/
│   └── shared/
├── lib/
│   ├── supabase.ts
│   ├── claude.ts
│   ├── groq.ts
│   ├── resend.ts
│   ├── rag.ts
│   └── auth.ts
├── middleware.ts                  ← Protect /admin routes
├── CLAUDE.md                     ← This file
├── .env.local                    ← Never push to GitHub
└── public/
    ├── favicon.png
    └── cv/
```

---

## Database Schema (Supabase)

### Enable pgvector extension first:
```sql
create extension if not exists vector;
```

### Tables:
```sql
-- LOGS (Blog posts)
create table logs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image text,
  tags text[],
  linkedin_url text,
  status text default 'draft' check (status in ('draft', 'published')),
  reading_time integer,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- SUBSCRIBERS
create table subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  subscribed_at timestamp with time zone default now(),
  unsubscribed boolean default false,
  unsubscribed_at timestamp with time zone
);

-- MESSAGES (Contact form)
create table messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  read boolean default false,
  created_at timestamp with time zone default now()
);

-- DOCUMENTS (RAG knowledge base)
create table documents (
  id uuid default gen_random_uuid() primary key,
  title text,
  content text not null,
  embedding vector(1536),
  metadata jsonb,
  doc_type text check (doc_type in ('cv', 'post', 'project', 'note', 'research')),
  created_at timestamp with time zone default now()
);

-- ANALYTICS
create table analytics (
  id uuid default gen_random_uuid() primary key,
  page text,
  event text,
  metadata jsonb,
  created_at timestamp with time zone default now()
);

-- SETTINGS
create table settings (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text,
  updated_at timestamp with time zone default now()
);
```

---

## Environment Variables
```env
ANTHROPIC_API_KEY=
GROQ_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
RESEND_API_KEY=
ADMIN_EMAIL=oyekunlekehinde23@gmail.com
ADMIN_PASSWORD=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

---

## Key Features To Build

### 1. Public Portfolio
- Tab-based navigation (HOME, ABOUT, PROJECTS, CYBER·AI, EXPERIENCE, CERTS, LOGS, CONTACT)
- Matrix binary rain canvas background (cyan, NOT green)
- Hero section with animated stats counters
- Terminal-style teaser cards (staggered, bracket corners diagonal only)
- All existing portfolio sections ported from static site
- AI Co-Pilot floating circle button with "AI" text
- Fixed bottom marquee ticker always visible
- Smart CV download (checks if file exists → downloads or triggers email request)

### 2. LOGS Section
- Grid of blog post cards with cover images
- Each card: image, date, tags, title, excerpt, LinkedIn link
- Individual post pages at /logs/[slug]
- Subscribe button with email capture
- Reading time estimate per post

### 3. Admin Dashboard (/admin)
- Login page — email + password authentication
- Dashboard overview — post count, subscriber count, message count, recent activity
- LOGS manager — create, edit, delete, publish/draft posts
- Rich text editor for post content
- Cover image upload per post
- Subscriber list with CSV export
- Contact messages inbox with mark as read
- RAG document manager — upload CV, paste posts, add notes
- Analytics overview — page views, popular sections
- Settings page — update CV file, social links

### 4. Admin Forgot Password
- "Forgot password?" link on admin login page
- Admin enters their email address
- Supabase sends automatic password reset email via Resend
- Reset link expires after 1 hour for security
- Admin sets new password on /admin/reset-password page
- Success confirmation shown after reset
- Auto-redirect to login page after successful reset

### 5. AI Co-Pilot (Server-side secured)
- API route at /api/chat — Claude API key NEVER exposed to browser
- RAG-powered — searches Kehinde's documents before answering
- Groq as fallback if Claude API is unavailable
- Streaming responses (words appear one by one)
- Conversation memory within session
- Lead capture — asks for email if recruiter seems interested
- Overlay panel UI with bracket corners and terminal aesthetic

### 6. Contact Form
- Fields: Name, email, subject, message
- Saves to Supabase messages table
- Email notification to oyekunlekehinde23@gmail.com via Resend
- Auto-reply email to sender confirming receipt
- Spam protection with rate limiting

### 7. Email Subscriptions
- Subscribe form on LOGS page
- Double opt-in confirmation email
- HTML email template matching site dark design
- Auto-email to all subscribers when new post is published
- Unsubscribe link in every email
- Full subscriber management in admin dashboard

### 8. Analytics
- Track page views per tab/section
- Track AI Co-Pilot conversations (no personal data stored)
- Track CV download attempts
- Track contact form submissions
- Track subscriber signups
- Display as charts in admin dashboard

---

## Build Order
Follow this exact order:

```
PHASE 1 — Foundation
  1. Project structure setup
  2. Design system (Tailwind config, CSS variables, fonts)
  3. Supabase client (lib/supabase.ts)
  4. Base layout (app/layout.tsx)
  5. Navigation component with tab system

PHASE 2 — Public Pages
  6. Home page (Hero + Teaser cards)
  7. About page (bio + journey card + skills + metrics)
  8. Projects page (4 cards + architecture diagram)
  9. Cybersec/AI page (research + 3 feature cards)
  10. Experience page (career timeline)
  11. Certifications page (certs + education + learning bars)
  12. Contact page (form + open to section)
  13. LOGS listing page (post grid + subscribe form)
  14. Individual LOG post page (/logs/[slug])

PHASE 3 — Backend APIs
  15. /api/contact
  16. /api/subscribe
  17. /api/unsubscribe
  18. /api/chat (Claude + Groq + RAG)
  19. /api/upload
  20. /api/analytics

PHASE 4 — Admin Area
  21. Admin middleware (protect all /admin routes)
  22. Admin login page (/admin/login)
  23. Forgot password page (/admin/forgot-password)
  24. Reset password page (/admin/reset-password)
  25. Admin dashboard overview (/admin)
  26. LOGS manager (/admin/logs)
  27. Create new post (/admin/logs/new)
  28. Edit post (/admin/logs/[id]/edit)
  29. Subscriber management (/admin/subscribers)
  30. Messages inbox (/admin/messages)
  31. RAG document manager (/admin/documents)
  32. Analytics dashboard (/admin/analytics)
  33. Settings page (/admin/settings)

PHASE 5 — AI & RAG
  34. LangChain setup (lib/rag.ts)
  35. Document chunking and embedding
  36. Vector search in Supabase pgvector
  37. RAG integration with /api/chat
  38. Streaming responses
  39. Groq fallback configuration

PHASE 6 — Polish & Deploy
  40. SEO metadata for all pages
  41. Sitemap generation
  42. robots.txt
  43. Mobile responsiveness check
  44. Performance optimisation
  45. Add environment variables to Vercel
  46. Deploy to Vercel
  47. Connect buildwithkayai.com domain
  48. Final end-to-end testing
```

---

## Important Rules For Claude Code
1. **Always** use the design system colours — never deviate
2. **Never** expose API keys in client-side code — always use API routes
3. **Always** handle loading, error, and empty states in UI
4. **Always** make every component fully mobile-responsive
5. **Never** use green for the matrix background — strictly cyan (#00f5ff)
6. **Always** use JetBrains Mono for labels, tags, metadata
7. **Always** protect all /admin routes with NextAuth middleware
8. **Always** validate and sanitise all form inputs server and client side
9. **Keep** the terminal/cyberpunk aesthetic consistent throughout
10. **Follow** the build order strictly — do not skip steps
11. **Never** commit .env.local to GitHub
12. **Always** use Supabase service key only in server-side code
13. **Always** show success and error feedback on all form submissions

---

## Current Task
> **PHASE 3 — Backend APIs**
> Build all API routes in this exact order:
> 1. /api/contact — contact form + email notifications via Resend
> 2. /api/subscribe — email subscription with double opt-in
> 3. /api/unsubscribe — unsubscribe handler
> 4. /api/chat — AI chatbot (Claude primary + Groq fallback + RAG search)
> 5. /api/upload — file/image upload to Supabase storage
> 6. /api/analytics — analytics event tracker
>
> All API keys must stay server-side only — never exposed to browser.
> Use lib/supabase.ts, lib/claude.ts, lib/groq.ts, lib/resend.ts already created.
> Handle all errors gracefully and return proper HTTP status codes.