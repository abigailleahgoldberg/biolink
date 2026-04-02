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
  music_type: 'spotify' | 'youtube' | 'soundcloud' | null
  views: number
  view_count: number
  is_admin: boolean
  created_at: string

  // New profile fields
  pronouns: string
  location: string
  website: string
  cover_banner: string
  tagline: string
  verified: boolean
  show_age: boolean
  birthday: string

  // Appearance
  button_shape: 'rounded' | 'pill' | 'square'
  text_shadow: boolean
  blur_amount: number
  glassmorphism: boolean
  avatar_shape: 'circle' | 'squircle' | 'square'
  avatar_border: boolean
  avatar_glow: boolean
  animation_type: 'none' | 'fade-in' | 'slide-up' | 'scale'
  custom_cursor: string
  layout_mode: 'centered' | 'left' | 'wide'
  hover_effect: 'lift' | 'glow' | 'slide' | 'none'

  // Music
  music_autoplay: boolean
  music_loop: boolean
  player_style: 'minimal' | 'full' | 'compact'

  // Social
  discord_widget: string
  spotify_now_playing: boolean
  twitch_username: string
  github_username: string

  // Widgets
  announcement: string
  countdown_date: string
  countdown_label: string
  custom_text: string
  photo_gallery: string[]
  availability_status: 'online' | 'away' | 'busy' | 'offline' | ''
  current_status: string

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
