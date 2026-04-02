import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type Profile = {
  id: string
  username: string
  display_name: string
  bio: string
  avatar_url: string
  background_type: 'color' | 'gradient' | 'image' | 'animated'
  background_value: string
  accent_color: string
  button_style: 'filled' | 'outline' | 'glass' | 'neon' | 'soft' | '3d-shadow'
  font: string
  links: Link[]
  badges: string[]
  music_url: string
  music_type: 'spotify' | 'youtube' | 'soundcloud' | 'apple-music' | 'upload' | null
  music_volume: number
  views: number
  view_count: number
  is_admin: boolean
  created_at: string

  // Profile fields
  pronouns: string
  location: string
  website: string
  cover_banner: string
  tagline: string
  verified: boolean
  show_age: boolean
  birthday: string
  show_view_count: boolean
  show_join_date: boolean

  // Appearance
  button_shape: 'rounded' | 'pill' | 'square'
  button_width: 'auto' | 'full'
  text_shadow: boolean
  blur_amount: number
  overlay_opacity: number
  glassmorphism: boolean
  card_border: 'none' | 'subtle' | 'accent' | 'glow'
  avatar_shape: 'circle' | 'squircle' | 'square'
  avatar_border: 'none' | 'solid' | 'glow' | 'gradient'
  avatar_glow: boolean
  avatar_size: 'small' | 'medium' | 'large'
  animation_type: 'none' | 'fade-in' | 'slide-up' | 'scale'
  animated_bg_style: 'mesh' | 'aurora' | 'particles' | 'waves' | 'matrix' | 'starfield' | 'gradient-shift' | 'glitch' | 'fireflies'
  custom_cursor: string
  layout_mode: 'centered' | 'left' | 'wide'
  hover_effect: 'lift' | 'glow' | 'slide' | 'none'
  gradient_from: string
  gradient_to: string
  gradient_direction: string

  // Music
  music_autoplay: boolean
  music_loop: boolean
  player_style: 'minimal' | 'full' | 'compact'

  // Social
  discord_widget: string
  discord_enabled: boolean
  spotify_now_playing: boolean
  twitch_username: string
  twitch_enabled: boolean
  github_username: string
  github_enabled: boolean
  lastfm_username: string
  lastfm_enabled: boolean

  // Widgets
  announcement: string
  announcement_enabled: boolean
  announcement_color: string
  announcement_icon: string
  announcement_font_size: 'small' | 'medium' | 'large' | 'xl'
  announcement_border: 'none' | 'solid' | 'dashed' | 'glowing'
  announcement_position: 'top' | 'above-links' | 'below-links'
  announcement_dismissable: boolean
  announcement_expiry: string | null
  music_file_url: string
  countdown_date: string
  countdown_label: string
  countdown_enabled: boolean
  countdown_style: 'minimal' | 'card' | 'glowing'
  currently_playing: string
  currently_playing_enabled: boolean
  custom_text: string
  custom_text_enabled: boolean
  custom_text_align: 'left' | 'center' | 'right'
  photo_gallery: string[]
  photo_gallery_enabled: boolean
  availability_status: 'online' | 'away' | 'busy' | 'offline' | ''
  current_status: string

  // Badges
  badge_size: 'small' | 'medium' | 'large'
  badge_position: 'below-name' | 'below-bio' | 'above-links'
  badge_monochrome: boolean

  // Privacy
  profile_visibility: 'public' | 'unlisted' | 'private'

  // Theme
  theme_preset: string
}

export type Link = {
  id: string
  label: string
  url: string
  icon: string
  color?: string
  visible?: boolean
  section?: string
  thumbnail?: string
  clicks?: number
}
