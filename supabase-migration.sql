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
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_size text default 'medium';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS button_width text default 'auto';

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

-- ═══════════════════════════════════════════════════════════════
-- V2 MIGRATION — File uploads, audio, new animations, announcement upgrades
-- ═══════════════════════════════════════════════════════════════

-- ── MUSIC FILE UPLOAD ───────────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS music_file_url text DEFAULT '';

-- ── ANNOUNCEMENT UPGRADES ───────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS announcement_font_size text DEFAULT 'medium';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS announcement_border text DEFAULT 'none';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS announcement_position text DEFAULT 'top';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS announcement_dismissable boolean DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS announcement_expiry timestamptz DEFAULT null;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS announcement_icon text DEFAULT 'info';

-- ── STORAGE BUCKET ──────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies (safe to run multiple times due to IF NOT EXISTS pattern)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can upload to own folder' AND tablename = 'objects') THEN
    CREATE POLICY "Users can upload to own folder"
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (
        bucket_id = 'media'
        AND (storage.foldername(name))[1] IN ('avatars', 'banners', 'gallery', 'backgrounds', 'audio')
        AND (storage.foldername(name))[2] = auth.uid()::text
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own files' AND tablename = 'objects') THEN
    CREATE POLICY "Users can update own files"
      ON storage.objects FOR UPDATE
      TO authenticated
      USING (
        bucket_id = 'media'
        AND (storage.foldername(name))[2] = auth.uid()::text
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete own files' AND tablename = 'objects') THEN
    CREATE POLICY "Users can delete own files"
      ON storage.objects FOR DELETE
      TO authenticated
      USING (
        bucket_id = 'media'
        AND (storage.foldername(name))[2] = auth.uid()::text
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read access for media' AND tablename = 'objects') THEN
    CREATE POLICY "Public read access for media"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'media');
  END IF;
END $$;
