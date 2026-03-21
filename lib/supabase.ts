import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
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
  button_style: 'filled' | 'outline' | 'glass'
  font: string
  links: Link[]
  badges: string[]
  music_url: string
  music_type: 'spotify' | 'youtube' | 'soundcloud' | null
  views: number
  is_admin: boolean
  created_at: string
}

export type Link = {
  id: string
  label: string
  url: string
  icon: string
}
