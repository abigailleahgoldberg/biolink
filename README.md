# BioLink — Personal Profile Platform

Fully customizable biolink profiles with invite-only auth, real-time dashboard, and public profile pages.

## Features

- **Invite-only signup** — control who can join
- **Full profile customization** — avatar, bio, links, background, colors, fonts, music, badges
- **Public profiles** — `/username` pages with view counter
- **Admin dashboard** — manage invites, users, blacklist
- **Dark theme** — modern, minimal design
- **Responsive** — mobile-first, works everywhere
- **Real-time** — changes save instantly

## Setup

### 1. Create Supabase Project
1. Go to https://supabase.com and sign up (free)
2. Create a new project
3. Copy your project URL and anon key
4. Run the SQL schema in `supabase-schema.sql` in your SQL editor

### 2. Set Environment Variables
Copy `.env.local.example` to `.env.local` and fill in:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000 (dev) or your vercel url (prod)
```

### 3. Install & Run
```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deployment

### Vercel (Recommended)
```bash
vercel
```

Then add your environment variables in Vercel project settings.

## Admin Setup

1. Sign up with an invite code
2. In Supabase, manually set `is_admin = true` on your profile
3. You'll see the Admin tab in the dashboard

## Features

### Profile Customization
- Display name & bio
- Avatar upload (URL)
- Social links (Discord, Twitter, TikTok, YouTube, Instagram, Twitch, Spotify, GitHub, custom)
- Background (solid color, gradient, image, animated)
- Accent color
- Button style (filled, outline, glass)
- Font (Inter, Geist, Space Grotesk)
- Music player (Spotify, YouTube, SoundCloud)
- Badges/tags

### Admin Panel
- Generate invite codes
- View all users & profiles
- Toggle admin status
- Manage username blacklist

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Supabase (Auth + Database)
- CSS Grid & Flexbox
- Responsive design
