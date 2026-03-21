-- Run this in your Supabase SQL editor

-- Profiles table
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text default '',
  bio text default '',
  avatar_url text default '',
  background_type text default 'color',
  background_value text default '#0d0d0f',
  accent_color text default '#A397DD',
  button_style text default 'outline',
  font text default 'inter',
  links jsonb default '[]',
  badges jsonb default '[]',
  music_url text default '',
  music_type text default null,
  views integer default 0,
  is_admin boolean default false,
  created_at timestamptz default now()
);

-- Invite codes table
create table if not exists invite_codes (
  id uuid default gen_random_uuid() primary key,
  code text unique not null,
  created_by uuid references profiles(id),
  used_by uuid references profiles(id) default null,
  used_at timestamptz default null,
  created_at timestamptz default now()
);

-- Blacklisted usernames table (for runtime management)
create table if not exists blacklisted_usernames (
  id uuid default gen_random_uuid() primary key,
  username text unique not null,
  added_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- RLS Policies
alter table profiles enable row level security;
alter table invite_codes enable row level security;
alter table blacklisted_usernames enable row level security;

-- Public can read profiles
create policy "profiles are publicly readable" on profiles
  for select using (true);

-- Users can update their own profile
create policy "users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Invite codes: admins only
create policy "admins can manage invite codes" on invite_codes
  for all using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

-- Anyone can read invite codes to validate them (not see who created them)
create policy "invite codes are readable for validation" on invite_codes
  for select using (true);

-- Function to increment view count
create or replace function increment_views(profile_id uuid)
returns void as $$
  update profiles set views = views + 1 where id = profile_id;
$$ language sql security definer;
