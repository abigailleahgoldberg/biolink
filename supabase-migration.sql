-- ============================================================
-- fentanyl.best — Full Migration
-- Run this in your Supabase SQL editor (Dashboard → SQL Editor)
-- Safe to run multiple times (uses ALTER TABLE IF NOT EXISTS pattern)
-- ============================================================

-- Fix views column name (schema uses 'views', code uses 'view_count')
-- Add view_count as an alias column if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS view_count integer default 0;
-- Sync existing views data into view_count
UPDATE profiles SET view_count = views WHERE view_count = 0 AND views > 0;

-- ── PROFILE FIELDS ──────────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS pronouns text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS website text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS cover_banner text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tagline text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS verified boolean default false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_age boolean default false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS birthday text default '';

-- ── APPEARANCE ──────────────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS button_shape text default 'rounded';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS text_shadow boolean default false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS blur_amount integer default 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS glassmorphism boolean default false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_shape text default 'circle';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_border boolean default true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_glow boolean default false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS animation_type text default 'none';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_cursor text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS layout_mode text default 'centered';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS hover_effect text default 'lift';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS card_border text default 'subtle';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS btn_width text default 'auto';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS overlay_opacity integer default 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS gradient_from text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS gradient_to text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS gradient_direction text default '135deg';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS animated_bg_style text default 'mesh';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS accent_glow_color text default '';

-- ── MUSIC ────────────────────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS music_autoplay boolean default false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS music_loop boolean default false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS player_style text default 'minimal';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS music_volume integer default 80;

-- ── SOCIAL WIDGETS ──────────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS discord_widget text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS spotify_now_playing boolean default false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS twitch_username text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS github_username text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS lastfm_username text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS steam_username text default '';

-- ── WIDGETS ──────────────────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS announcement text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS announcement_color text default 'purple';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS announcement_enabled boolean default false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS countdown_date text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS countdown_label text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS countdown_enabled boolean default false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_text text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_text_enabled boolean default false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_text_align text default 'left';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS photo_gallery jsonb default '[]';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS photo_gallery_enabled boolean default false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS availability_status text default '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS current_status text default '';

-- ── BADGE SETTINGS ──────────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS badge_size text default 'medium';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS badge_position text default 'below-bio';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS badge_monochrome boolean default false;

-- ── THEME ────────────────────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS theme_preset text default '';

-- ── PRIVACY / SETTINGS ──────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_view_count boolean default true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_join_date boolean default false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_visibility text default 'public';

-- ── Fix increment_views function to use view_count ──────────
CREATE OR REPLACE FUNCTION increment_views(profile_id uuid)
RETURNS void AS $$
  UPDATE profiles SET view_count = view_count + 1, views = views + 1 WHERE id = profile_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- ── RLS: allow blacklist select for admin check ──────────────
DROP POLICY IF EXISTS "admins can manage blacklist" ON blacklisted_usernames;
CREATE POLICY "admins can manage blacklist" ON blacklisted_usernames
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );
