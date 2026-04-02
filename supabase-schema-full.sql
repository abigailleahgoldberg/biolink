-- ═══════════════════════════════════════════════════════════════
-- fentanyl.best — COMPLETE DATABASE SCHEMA
-- Run this once on a fresh Supabase project to set up everything.
-- ═══════════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════════════════════════
-- TABLE: profiles
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  display_name text DEFAULT '',
  bio text DEFAULT '',
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),

  -- Counters
  views integer DEFAULT 0,
  view_count integer DEFAULT 0,

  -- Admin
  is_admin boolean DEFAULT false,

  -- Links & badges (JSON)
  links jsonb DEFAULT '[]'::jsonb,
  badges jsonb DEFAULT '[]'::jsonb,

  -- Background
  background_type text DEFAULT 'color',       -- color | gradient | image | animated
  background_value text DEFAULT '#07060f',
  gradient_from text DEFAULT '',
  gradient_to text DEFAULT '',
  gradient_direction text DEFAULT '135',
  overlay_opacity integer DEFAULT 0,
  animated_bg_style text DEFAULT 'mesh',      -- mesh | aurora | particles | waves | matrix | starfield | gradient-shift | glitch | fireflies

  -- Colors & style
  accent_color text DEFAULT '#A397DD',
  font text DEFAULT 'inter',
  button_style text DEFAULT 'outline',        -- filled | outline | glass | neon | soft | 3d-shadow
  button_shape text DEFAULT 'rounded',        -- rounded | pill | square
  button_width text DEFAULT 'auto',           -- auto | full
  hover_effect text DEFAULT 'lift',           -- lift | glow | slide | none

  -- Typography & effects
  text_shadow boolean DEFAULT false,
  glassmorphism boolean DEFAULT false,
  blur_amount integer DEFAULT 0,
  card_border text DEFAULT 'none',            -- none | subtle | accent | glow
  custom_cursor text DEFAULT '',

  -- Layout & animation
  layout_mode text DEFAULT 'centered',        -- centered | left | wide
  animation_type text DEFAULT 'none',         -- none | fade-in | slide-up | scale

  -- Avatar
  avatar_shape text DEFAULT 'circle',         -- circle | squircle | square
  avatar_border text DEFAULT 'solid',         -- none | solid | glow | gradient
  avatar_glow boolean DEFAULT false,
  avatar_size text DEFAULT 'medium',          -- small | medium | large

  -- Profile identity
  pronouns text DEFAULT '',
  location text DEFAULT '',
  website text DEFAULT '',
  cover_banner text DEFAULT '',
  tagline text DEFAULT '',
  birthday text DEFAULT '',
  verified boolean DEFAULT false,
  show_age boolean DEFAULT false,
  show_view_count boolean DEFAULT true,
  show_join_date boolean DEFAULT true,

  -- Availability
  availability_status text DEFAULT '',        -- online | away | busy | offline | ''
  current_status text DEFAULT '',

  -- Music
  music_url text DEFAULT '',
  music_type text DEFAULT '',                 -- spotify | youtube | soundcloud | apple-music | upload | null
  music_file_url text DEFAULT '',             -- stores uploaded audio URL
  music_autoplay boolean DEFAULT false,
  music_loop boolean DEFAULT false,
  music_volume integer DEFAULT 80,
  player_style text DEFAULT 'minimal',        -- minimal | full | compact

  -- Social integrations
  discord_widget text DEFAULT '',
  discord_enabled boolean DEFAULT false,
  spotify_now_playing boolean DEFAULT false,
  twitch_username text DEFAULT '',
  twitch_enabled boolean DEFAULT false,
  github_username text DEFAULT '',
  github_enabled boolean DEFAULT false,
  lastfm_username text DEFAULT '',
  lastfm_enabled boolean DEFAULT false,

  -- Widgets
  announcement text DEFAULT '',
  announcement_enabled boolean DEFAULT false,
  announcement_color text DEFAULT 'purple',
  announcement_icon text DEFAULT 'info',
  announcement_font_size text DEFAULT 'medium',   -- small | medium | large | xl
  announcement_border text DEFAULT 'none',        -- none | solid | dashed | glowing
  announcement_position text DEFAULT 'top',       -- top | above-links | below-links
  announcement_dismissable boolean DEFAULT false,
  announcement_expiry timestamptz DEFAULT null,
  countdown_date text DEFAULT '',
  countdown_label text DEFAULT '',
  countdown_enabled boolean DEFAULT false,
  countdown_style text DEFAULT 'minimal',     -- minimal | card | glowing
  currently_playing text DEFAULT '',
  currently_playing_enabled boolean DEFAULT false,
  custom_text text DEFAULT '',
  custom_text_enabled boolean DEFAULT false,
  custom_text_align text DEFAULT 'center',    -- left | center | right
  photo_gallery jsonb DEFAULT '[]'::jsonb,
  photo_gallery_enabled boolean DEFAULT false,

  -- Badges
  badge_size text DEFAULT 'medium',           -- small | medium | large
  badge_position text DEFAULT 'below-name',   -- below-name | below-bio | above-links
  badge_monochrome boolean DEFAULT false,

  -- Privacy
  profile_visibility text DEFAULT 'public',   -- public | unlisted | private

  -- Theme
  theme_preset text DEFAULT ''
);

-- Index for fast username lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

-- ═══════════════════════════════════════════════════════════════
-- TABLE: invite_codes
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS invite_codes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  code text UNIQUE NOT NULL,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  used_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  used_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_invite_codes_code ON invite_codes(code);

-- ═══════════════════════════════════════════════════════════════
-- TABLE: blacklisted_usernames
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS blacklisted_usernames (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username text UNIQUE NOT NULL,
  added_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blacklisted_username ON blacklisted_usernames(username);

-- ═══════════════════════════════════════════════════════════════
-- TABLE: page_views (for analytics)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  viewed_at timestamptz DEFAULT now(),
  referrer text DEFAULT '',
  device text DEFAULT '',          -- desktop | mobile | tablet
  country text DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_page_views_profile ON page_views(profile_id);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(viewed_at);

-- ═══════════════════════════════════════════════════════════════
-- TABLE: link_clicks (for link analytics)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS link_clicks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  link_id text NOT NULL,
  clicked_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_link_clicks_profile ON link_clicks(profile_id);

-- ═══════════════════════════════════════════════════════════════
-- FUNCTIONS
-- ═══════════════════════════════════════════════════════════════

-- Increment view count
CREATE OR REPLACE FUNCTION increment_views(profile_id uuid)
RETURNS void AS $$
  UPDATE profiles
  SET view_count = view_count + 1,
      views = COALESCE(views, 0) + 1
  WHERE id = profile_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.id::text),
    COALESCE(NEW.raw_user_meta_data->>'display_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: create profile on auth signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Helper function for running migrations (used by /api/migrate)
CREATE OR REPLACE FUNCTION run_migration(sql text)
RETURNS void AS $$
BEGIN
  EXECUTE sql;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blacklisted_usernames ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_clicks ENABLE ROW LEVEL SECURITY;

-- ── profiles ──

-- Anyone can read profiles (public pages)
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile (signup)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can delete their own profile
CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = id);

-- ── invite_codes ──

-- Anyone authenticated can read invite codes (for admin panel)
CREATE POLICY "Authenticated users can read invite codes"
  ON invite_codes FOR SELECT
  TO authenticated
  USING (true);

-- Admins can insert invite codes (enforced at API level)
CREATE POLICY "Authenticated users can insert invite codes"
  ON invite_codes FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admins can update invite codes (mark as used)
CREATE POLICY "Authenticated users can update invite codes"
  ON invite_codes FOR UPDATE
  TO authenticated
  USING (true);

-- Admins can delete invite codes
CREATE POLICY "Authenticated users can delete invite codes"
  ON invite_codes FOR DELETE
  TO authenticated
  USING (true);

-- ── blacklisted_usernames ──

-- Authenticated users can read blacklist
CREATE POLICY "Authenticated users can read blacklist"
  ON blacklisted_usernames FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can manage blacklist (admin enforced at API level)
CREATE POLICY "Authenticated users can insert blacklist"
  ON blacklisted_usernames FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blacklist"
  ON blacklisted_usernames FOR DELETE
  TO authenticated
  USING (true);

-- ── page_views ──

-- Anyone can insert page views (profile visitors)
CREATE POLICY "Anyone can insert page views"
  ON page_views FOR INSERT
  WITH CHECK (true);

-- Profile owners can read their own views
CREATE POLICY "Users can read own page views"
  ON page_views FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

-- ── link_clicks ──

-- Anyone can insert link clicks
CREATE POLICY "Anyone can insert link clicks"
  ON link_clicks FOR INSERT
  WITH CHECK (true);

-- Profile owners can read their own clicks
CREATE POLICY "Users can read own link clicks"
  ON link_clicks FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

-- ═══════════════════════════════════════════════════════════════
-- STORAGE BUCKETS
-- ═══════════════════════════════════════════════════════════════

-- Create public media bucket for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload to own folder"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'media'
    AND (storage.foldername(name))[1] IN ('avatars', 'banners', 'gallery', 'backgrounds', 'audio')
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

-- Allow authenticated users to update/overwrite their own files
CREATE POLICY "Users can update own files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'media'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

-- Allow authenticated users to delete their own files
CREATE POLICY "Users can delete own files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'media'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

-- Anyone can read files in the public media bucket
CREATE POLICY "Public read access for media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

-- ═══════════════════════════════════════════════════════════════
-- DONE
-- ═══════════════════════════════════════════════════════════════
