'use client'
import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { supabase, type Profile, type Link as ProfileLink } from '@/lib/supabase'

const FONT_MAP: Record<string, string> = {
  'inter': "'Inter', system-ui, sans-serif",
  'geist': "'Geist', system-ui, sans-serif",
  'space-grotesk': "'Space Grotesk', system-ui, sans-serif",
}

const ICON_SVGS: Record<string, string> = {
  discord:   '<svg viewBox="0 0 20 15" fill="currentColor" width="18" height="14"><path d="M16.93 1.24A16.38 16.38 0 0 0 12.82 0c-.18.32-.39.76-.53 1.1a15.18 15.18 0 0 0-4.57 0A11.6 11.6 0 0 0 7.18 0a16.43 16.43 0 0 0-4.12 1.25C.44 4.77-.27 8.2.08 11.58a16.49 16.49 0 0 0 5.04 2.55c.41-.55.77-1.14 1.08-1.76a10.7 10.7 0 0 1-1.7-.81c.14-.1.28-.21.41-.32a11.75 11.75 0 0 0 10.18 0c.13.11.27.22.41.32-.54.32-1.11.59-1.71.82.31.62.67 1.2 1.08 1.75a16.43 16.43 0 0 0 5.05-2.55c.42-4-.72-7.39-2.99-10.34Z"/></svg>',
  twitter:   '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  tiktok:    '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.21 8.21 0 0 0 4.79 1.52V6.75a4.85 4.85 0 0 1-1.02-.06z"/></svg>',
  youtube:   '<svg viewBox="0 0 24 17" fill="currentColor" width="20" height="14"><path d="M23.495 2.656A3.016 3.016 0 0 0 21.37.51C19.505 0 12 0 12 0S4.495 0 2.63.51A3.016 3.016 0 0 0 .505 2.656 31.643 31.643 0 0 0 0 8.5a31.643 31.643 0 0 0 .505 5.844A3.016 3.016 0 0 0 2.63 16.49C4.495 17 12 17 12 17s7.505 0 9.37-.51a3.016 3.016 0 0 0 2.125-2.146A31.643 31.643 0 0 0 24 8.5a31.643 31.643 0 0 0-.505-5.844zM9.545 12.07V4.93L15.818 8.5 9.545 12.07z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  twitch:    '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>',
  spotify:   '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
  github:    '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
  steam:     '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 12-5.373 12-12s-5.372-12-12-12z"/></svg>',
  telegram:  '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
  snapchat:  '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.969-.249.105-.044.192-.066.27-.066a.78.78 0 0 1 .57.236c.133.15.2.347.2.554 0 .39-.259.678-.49.838a2.64 2.64 0 0 1-.789.39c-.166.06-.34.105-.504.15-.272.078-.498.195-.658.345a.713.713 0 0 0-.208.536c.015.174.06.345.12.494.18.479.466.944.777 1.394.257.371.532.72.821 1.042 1.155 1.291 2.394 2.114 2.456 2.153.076.051.122.096.151.136a.615.615 0 0 1 .071.467c-.065.3-.303.514-.624.656-.27.12-.59.199-.93.247-.105.015-.21.028-.314.045-.189.03-.339.103-.458.295a1.28 1.28 0 0 0-.16.504c-.003.034-.01.066-.01.1 0 .045.004.087.016.127-.091.18-.284.36-.599.45a3.9 3.9 0 0 1-.725.116c-.21.016-.42.05-.618.116a4.54 4.54 0 0 0-.504.256c-.29.165-.634.353-1.058.542-.78.347-1.702.536-2.77.555h-.055c-1.068-.019-1.99-.208-2.77-.555-.424-.189-.768-.377-1.058-.542a4.54 4.54 0 0 0-.504-.256 3.78 3.78 0 0 0-.618-.116 3.9 3.9 0 0 1-.725-.116c-.315-.09-.508-.27-.6-.45a.635.635 0 0 1 .017-.127c-.001-.034-.008-.066-.01-.1a1.28 1.28 0 0 0-.161-.504c-.12-.192-.27-.265-.458-.295-.104-.017-.21-.03-.314-.045a3.42 3.42 0 0 1-.93-.247c-.321-.142-.559-.356-.624-.656a.615.615 0 0 1 .071-.467c.029-.04.075-.085.151-.136.063-.04 1.302-.862 2.456-2.153.289-.322.564-.671.821-1.042.311-.45.597-.915.777-1.394.06-.149.105-.32.12-.494a.713.713 0 0 0-.208-.536c-.16-.15-.386-.267-.658-.345a3.86 3.86 0 0 1-.504-.15 2.64 2.64 0 0 1-.789-.39c-.231-.16-.49-.448-.49-.838 0-.207.067-.404.2-.554a.78.78 0 0 1 .57-.236c.078 0 .165.022.27.066.31.129.669.233.969.249.198 0 .326-.045.401-.09a19.68 19.68 0 0 1-.033-.57c-.104-1.628-.23-3.654.299-4.847C7.859 1.069 11.216.793 12.206.793z"/></svg>',
  reddit:    '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>',
  pinterest: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>',
  linkedin:  '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  email:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  website:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  link:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
}

function getAge(birthday: string): number | null {
  if (!birthday) return null
  const b = new Date(birthday)
  const now = new Date()
  let age = now.getFullYear() - b.getFullYear()
  if (now.getMonth() < b.getMonth() || (now.getMonth() === b.getMonth() && now.getDate() < b.getDate())) age--
  return age
}

function CountdownTimer({ date, label }: { date: string; label: string }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const diff = new Date(date).getTime() - now
  if (diff <= 0) return <div className="widget-card" style={{textAlign:'center',fontSize:13,color:'rgba(255,255,255,0.5)'}}>🎉 {label || 'Countdown'} has ended!</div>
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return (
    <div className="widget-card">
      {label && <div style={{textAlign:'center',fontSize:12,color:'rgba(255,255,255,0.5)',marginBottom:8}}>{label}</div>}
      <div className="countdown-widget">
        {[{v:d,l:'Days'},{v:h,l:'Hours'},{v:m,l:'Min'},{v:s,l:'Sec'}].map(u=>(
          <div key={u.l} className="cd-unit">
            <span className="cd-val">{String(u.v).padStart(2,'0')}</span>
            <span className="cd-label">{u.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const params = useParams()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [notFoundFlag, setNotFoundFlag] = useState(false)
  const username = params?.username as string

  useEffect(() => {
    async function load() {
      if (!username) return
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username.toLowerCase())
        .single()

      if (!data) { setNotFoundFlag(true); return }
      setProfile(data)
      void supabase.rpc('increment_views', { profile_id: data.id })
    }
    load()
  }, [username])

  if (notFoundFlag) notFound()
  if (!profile) return <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,0.3)' }}>Loading...</div>

  const fontFamily = FONT_MAP[profile.font] || FONT_MAP['inter']
  const accentColor = profile.accent_color || '#A397DD'
  const btnStyle = profile.button_style || 'outline'
  const btnShape = profile.button_shape || 'rounded'
  const hoverEffect = profile.hover_effect || 'lift'
  const avatarShape = profile.avatar_shape || 'circle'
  const animType = profile.animation_type || 'none'
  const layoutMode = profile.layout_mode || 'centered'
  const hasCover = !!profile.cover_banner
  const age = profile.show_age && profile.birthday ? getAge(profile.birthday) : null
  const textShadowCSS = profile.text_shadow ? 'text-shadow: 0 2px 12px rgba(0,0,0,0.6);' : ''
  const blurCSS = (profile.blur_amount || 0) > 0 ? `backdrop-filter: blur(${profile.blur_amount}px);` : ''
  const glassCSS = profile.glassmorphism ? 'background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;' : ''
  const cursorCSS = profile.custom_cursor ? `cursor: url('${profile.custom_cursor}'), auto;` : ''

  const avatarRadius = avatarShape === 'circle' ? '50%' : avatarShape === 'squircle' ? '22%' : '8px'
  const shapeRadius = btnShape === 'pill' ? '100px' : btnShape === 'square' ? '4px' : '12px'

  const bg = profile.background_type === 'gradient' ? `background: ${profile.background_value};`
    : profile.background_type === 'image' ? `background-image: url('${profile.background_value}'); background-size: cover; background-position: center;`
    : `background: ${profile.background_value || '#07060f'};`

  const animClass = animType === 'fade-in' ? 'anim-fade-in' : animType === 'slide-up' ? 'anim-slide-up' : animType === 'scale' ? 'anim-scale' : ''
  const maxW = layoutMode === 'wide' ? 560 : 420
  const alignItems = layoutMode === 'left' ? 'flex-start' : 'center'
  const textAlign = layoutMode === 'left' ? 'left' as const : 'center' as const

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html, body { min-height:100vh; font-family:${fontFamily}; -webkit-font-smoothing:antialiased; ${cursorCSS} }
        a { text-decoration:none; color:inherit; }
        ${profile.background_type === 'animated' ? `
          body { background: linear-gradient(135deg, #0d0d20, #1a0d2e, #0d1a0d); background-size:400% 400%; animation:animBg 12s ease infinite; }
          @keyframes animBg { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        ` : `body { ${bg} }`}
        .profile-link {
          display:flex; align-items:center; justify-content:center; gap:10px;
          padding:14px 20px; border-radius:${shapeRadius}; font-size:14px; font-weight:600;
          cursor:pointer; text-decoration:none; transition: transform 0.25s cubic-bezier(0.33,1,0.68,1), box-shadow 0.3s ease, opacity 0.2s;
          position:relative; overflow:hidden;
        }
        .profile-link.style-filled { background:${accentColor}; color:#0a0910; border:none; }
        .profile-link.style-outline { background:transparent; color:#fff; border:2px solid ${accentColor}60; }
        .profile-link.style-glass { background:rgba(255,255,255,0.08); color:#fff; border:1px solid rgba(255,255,255,0.12); backdrop-filter:blur(8px); }
        .profile-link.style-neon { background:transparent; color:#fff; border:2px solid ${accentColor}; box-shadow:0 0 10px ${accentColor}, 0 0 40px rgba(163,151,221,0.15), inset 0 0 10px rgba(163,151,221,0.1); text-shadow:0 0 8px ${accentColor}; }
        .profile-link.style-neon:hover { box-shadow:0 0 20px ${accentColor}, 0 0 60px rgba(163,151,221,0.3), inset 0 0 20px rgba(163,151,221,0.2); }
        .profile-link.style-soft { background:${accentColor}20; color:#fff; border:1px solid ${accentColor}15; }
        .profile-link.style-3d-shadow { background:${accentColor}; color:#0a0910; border:none; box-shadow:0 4px 0 ${accentColor}99, 0 6px 12px rgba(0,0,0,0.3); font-weight:700; }
        .profile-link.style-3d-shadow:hover { transform:translateY(2px); box-shadow:0 2px 0 ${accentColor}99, 0 3px 6px rgba(0,0,0,0.3); }
        .profile-link.hover-lift:hover { transform:translateY(-4px); box-shadow:0 12px 28px rgba(0,0,0,0.25); }
        .profile-link.hover-glow:hover { box-shadow:0 0 20px ${accentColor}66, 0 0 60px ${accentColor}25; }
        .profile-link.hover-slide::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent); transition:left 0.5s ease; }
        .profile-link.hover-slide:hover::before { left:100%; }
        .verified-badge { display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; border-radius:50%; background:linear-gradient(135deg,#3b82f6,#8b5cf6); margin-left:6px; flex-shrink:0; }
        .verified-badge svg { width:12px; height:12px; }
      `}</style>

      {/* Cover Banner */}
      {hasCover && (
        <div className="cover-banner" style={{backgroundImage:`url('${profile.cover_banner}')`}}>
          <div style={{position:'absolute',bottom:0,left:0,right:0,height:80,background:'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'}}/>
        </div>
      )}

      <div style={{ minHeight: hasCover ? 'auto' : '100vh', display:'flex', alignItems: layoutMode === 'left' ? 'flex-start' : 'center', justifyContent:'center', padding: hasCover ? '0 20px 40px' : '40px 20px', ...(blurCSS ? {} : {}) }}>
        <div className={animClass} style={{ width:'100%', maxWidth: maxW, display:'flex', flexDirection:'column', alignItems, marginTop: hasCover ? -50 : 0, position:'relative', ...(glassCSS ? { background:'rgba(255,255,255,0.04)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, padding:32 } : {}) }}>

          {/* Avatar */}
          {profile.avatar_url
            ? <img src={profile.avatar_url} alt={profile.username}
                className={profile.avatar_glow ? 'avatar-glow' : ''}
                style={{
                  width: 90, height: 90, borderRadius: avatarRadius, objectFit:'cover',
                  border: profile.avatar_border !== false ? `3px solid ${accentColor}40` : 'none',
                  marginBottom: 14,
                  ...(textShadowCSS ? {} : {}),
                }} />
            : <div style={{ width:90, height:90, borderRadius: avatarRadius, background:'rgba(255,255,255,0.08)', border:`3px solid ${accentColor}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, marginBottom:14 }}>
                {(profile.display_name || profile.username)[0].toUpperCase()}
              </div>
          }

          {/* Display Name + Verified + Pronouns */}
          <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom: profile.pronouns ? 2 : 6 }}>
            <span style={{ fontSize:22, fontWeight:700, letterSpacing:-0.5, color:'#fff', textAlign, ...(profile.text_shadow ? {textShadow:'0 2px 12px rgba(0,0,0,0.5)'} : {}) }}>
              {profile.display_name || profile.username}
            </span>
            {profile.verified && (
              <span className="verified-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
            )}
            {profile.pronouns && (
              <span style={{ fontSize:12, color:'rgba(255,255,255,0.4)', marginLeft:6 }}>
                {profile.pronouns}
              </span>
            )}
          </div>

          {/* Tagline */}
          {profile.tagline && (
            <div style={{ fontSize:13, color:`${accentColor}cc`, fontWeight:500, textAlign, marginBottom:6, ...(profile.text_shadow ? {textShadow:'0 1px 8px rgba(0,0,0,0.4)'} : {}) }}>
              {profile.tagline}
            </div>
          )}

          {/* Bio */}
          {profile.bio && (
            <div style={{ fontSize:14, color:'rgba(255,255,255,0.6)', textAlign, marginBottom:12, maxWidth:300, lineHeight:1.6 }}>
              {profile.bio}
            </div>
          )}

          {/* Location */}
          {profile.location && (
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', marginBottom:8, display:'flex', alignItems:'center', gap:4 }}>
              📍 {profile.location}
            </div>
          )}

          {/* Availability */}
          {profile.availability_status && (
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
              <span className={`avail-dot ${profile.availability_status}`}/>
              <span style={{ fontSize:12, color:'rgba(255,255,255,0.5)' }}>
                {profile.current_status || profile.availability_status.charAt(0).toUpperCase() + profile.availability_status.slice(1)}
              </span>
            </div>
          )}

          {/* Age */}
          {age !== null && (
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', marginBottom:8 }}>
              🎂 {age} years old
            </div>
          )}

          {/* Badges */}
          {profile.badges?.length > 0 && (
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', justifyContent: textAlign === 'center' ? 'center' : 'flex-start', marginBottom:18 }}>
              {profile.badges.map((b: string) => (
                <span key={b} style={{ fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:100, background:`${accentColor}18`, border:`1px solid ${accentColor}30`, color:'rgba(255,255,255,0.75)', cursor:'default' }}
                  title={b}>
                  {b}
                </span>
              ))}
            </div>
          )}

          {/* Currently Playing / Music Player */}
          {profile.music_url && profile.music_type && (
            <div className="widget-card" style={{ width:'100%', marginBottom:14 }}>
              {profile.music_type === 'spotify' && profile.music_url.includes('spotify.com') ? (
                <iframe
                  src={`https://open.spotify.com/embed/${profile.music_url.replace('https://open.spotify.com/','').replace('?','/embed?')}`}
                  width="100%" height={profile.player_style === 'compact' ? 80 : profile.player_style === 'full' ? 152 : 80}
                  frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  style={{borderRadius:12}} loading="lazy"/>
              ) : (
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', textAlign:'center', padding:8 }}>
                  🎵 Music player
                </div>
              )}
            </div>
          )}

          {/* Announcement Banner */}
          {profile.announcement && (
            <div className="announcement-banner" style={{ marginBottom:14, borderColor:`${accentColor}40` }}>
              📢 {profile.announcement}
            </div>
          )}

          {/* Custom Text */}
          {profile.custom_text && (
            <div className="widget-card" style={{ width:'100%', marginBottom:14, fontSize:13, color:'rgba(255,255,255,0.65)', lineHeight:1.7, textAlign }}>
              {profile.custom_text}
            </div>
          )}

          {/* Countdown Timer */}
          {profile.countdown_date && (
            <div style={{ width:'100%', marginBottom:14 }}>
              <CountdownTimer date={profile.countdown_date} label={profile.countdown_label || ''}/>
            </div>
          )}

          {/* Links */}
          <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%', marginBottom:20 }}>
            {(profile.links || []).filter((l: ProfileLink) => l.visible !== false).map((link: ProfileLink, idx: number) => {
              const icon = ICON_SVGS[link.icon] || ICON_SVGS['link']
              const linkColor = link.color || accentColor
              const styleClass = `style-${btnStyle}`
              const hoverClass = hoverEffect !== 'none' ? `hover-${hoverEffect}` : ''

              return (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer"
                  className={`profile-link ${styleClass} ${hoverClass} ${animClass ? `${animClass} anim-delay-${Math.min(idx+1,5)}` : ''}`}
                  style={link.color ? {
                    ...(btnStyle === 'filled' ? { background: linkColor } : {}),
                    ...(btnStyle === 'outline' ? { borderColor: `${linkColor}60` } : {}),
                    ...(btnStyle === 'neon' ? { borderColor: linkColor, boxShadow: `0 0 10px ${linkColor}, 0 0 40px ${linkColor}25, inset 0 0 10px ${linkColor}15`, textShadow: `0 0 8px ${linkColor}` } : {}),
                    ...(btnStyle === 'soft' ? { background: `${linkColor}20` } : {}),
                  } : {}}>
                  <span dangerouslySetInnerHTML={{ __html: icon }} />
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Photo Gallery */}
          {profile.photo_gallery && profile.photo_gallery.length > 0 && (
            <div className="photo-grid" style={{ width:'100%', marginBottom:20 }}>
              {profile.photo_gallery.map((url: string, i: number) => (
                <img key={i} src={url} alt="" loading="lazy"/>
              ))}
            </div>
          )}

          {/* Social Widgets Row */}
          {(profile.discord_widget || profile.twitch_username || profile.github_username) && (
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', width:'100%', marginBottom:20, justifyContent: textAlign === 'center' ? 'center' : 'flex-start' }}>
              {profile.discord_widget && (
                <a href={`https://discord.gg/${profile.discord_widget}`} target="_blank" rel="noreferrer" className="social-widget">
                  <span dangerouslySetInnerHTML={{ __html: ICON_SVGS.discord }} style={{color:'#5865F2'}} />
                  Discord
                </a>
              )}
              {profile.twitch_username && (
                <a href={`https://twitch.tv/${profile.twitch_username}`} target="_blank" rel="noreferrer" className="social-widget">
                  <span dangerouslySetInnerHTML={{ __html: ICON_SVGS.twitch }} style={{color:'#9146FF'}} />
                  {profile.twitch_username}
                </a>
              )}
              {profile.github_username && (
                <a href={`https://github.com/${profile.github_username}`} target="_blank" rel="noreferrer" className="social-widget">
                  <span dangerouslySetInnerHTML={{ __html: ICON_SVGS.github }} />
                  {profile.github_username}
                </a>
              )}
            </div>
          )}

          {/* Views + Footer */}
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.25)', marginTop:4, display:'flex', alignItems:'center', gap:8 }}>
            <span>{(profile.views || profile.view_count || 0).toLocaleString()} views</span>
            <span>·</span>
            <a href="https://fentanyl.best" style={{color:'rgba(255,255,255,0.2)',transition:'color 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.5)'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.2)'}>
              fentanyl.best
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
