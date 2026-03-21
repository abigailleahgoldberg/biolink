import { supabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

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
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  twitch:    '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>',
  spotify:   '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
  github:    '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
  link:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
}

function getBackground(type: string, value: string) {
  if (type === 'gradient') return `background: ${value};`
  if (type === 'image') return `background-image: url('${value}'); background-size: cover; background-position: center;`
  return `background: ${value};`
}

function getMusicEmbed(type: string | null, url: string) {
  if (!type || !url) return ''
  if (type === 'spotify') {
    const match = url.match(/track\/([a-zA-Z0-9]+)/)
    if (match) return `<iframe src="https://open.spotify.com/embed/track/${match[1]}" width="100%" height="80" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" style="border-radius:12px;"></iframe>`
  }
  if (type === 'youtube') {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
    if (match) return `<iframe width="100%" height="80" src="https://www.youtube.com/embed/${match[1]}?autoplay=0" frameborder="0" style="border-radius:12px;"></iframe>`
  }
  return ''
}

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const { data } = await supabaseAdmin.from('profiles').select('display_name,bio,username').eq('username', params.username.toLowerCase()).single()
  if (!data) return { title: 'Not Found' }
  return {
    title: `${data.display_name || data.username} — BioLink`,
    description: data.bio || `Check out ${data.username}'s profile`,
  }
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('username', params.username.toLowerCase())
    .single()

  if (!profile) notFound()

  // Increment view count
  await supabaseAdmin.rpc('increment_views', { profile_id: profile.id })

  const bg = getBackground(profile.background_type, profile.background_value)
  const fontFamily = FONT_MAP[profile.font] || FONT_MAP['inter']
  const accentColor = profile.accent_color || '#A397DD'
  const btnStyle = profile.button_style || 'outline'
  const musicEmbed = getMusicEmbed(profile.music_type, profile.music_url)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html, body { min-height:100vh; font-family:${fontFamily}; -webkit-font-smoothing:antialiased; }
        a { text-decoration:none; color:inherit; }
        ${profile.background_type === 'animated' ? `
          body { background: linear-gradient(135deg, #0d0d20, #1a0d2e, #0d1a0d); background-size:400% 400%; animation:animBg 12s ease infinite; }
          @keyframes animBg { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        ` : `body { ${bg} }`}
      `}</style>

      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 20px' }}>
        <div style={{ width:'100%', maxWidth:420, display:'flex', flexDirection:'column', alignItems:'center' }}>

          {/* Avatar */}
          {profile.avatar_url
            ? <img src={profile.avatar_url} alt={profile.username} style={{ width:90, height:90, borderRadius:'50%', objectFit:'cover', border:`3px solid ${accentColor}40`, marginBottom:14 }} />
            : <div style={{ width:90, height:90, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:`3px solid ${accentColor}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, marginBottom:14 }}>
                {(profile.display_name || profile.username)[0].toUpperCase()}
              </div>
          }

          {/* Name & bio */}
          <div style={{ fontSize:22, fontWeight:700, letterSpacing:-0.5, color:'#fff', marginBottom:6, textAlign:'center', textShadow:'0 2px 12px rgba(0,0,0,0.5)' }}>
            {profile.display_name || profile.username}
          </div>

          {profile.bio && (
            <div style={{ fontSize:14, color:'rgba(255,255,255,0.6)', textAlign:'center', marginBottom:18, maxWidth:300, lineHeight:1.6 }}>
              {profile.bio}
            </div>
          )}

          {/* Badges */}
          {profile.badges?.length > 0 && (
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', justifyContent:'center', marginBottom:18 }}>
              {profile.badges.map((b: string) => (
                <span key={b} style={{ fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:100, background:`${accentColor}18`, border:`1px solid ${accentColor}30`, color:'rgba(255,255,255,0.75)' }}>
                  {b}
                </span>
              ))}
            </div>
          )}

          {/* Music */}
          {musicEmbed && (
            <div style={{ width:'100%', marginBottom:14 }} dangerouslySetInnerHTML={{ __html: musicEmbed }} />
          )}

          {/* Links */}
          <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%', marginBottom:20 }}>
            {(profile.links || []).map((link: { id: string; label: string; url: string; icon: string }) => {
              const icon = ICON_SVGS[link.icon] || ICON_SVGS['link']
              const btnStyles = btnStyle === 'filled'
                ? `background:${accentColor}; color:#0a0910; border:none;`
                : btnStyle === 'glass'
                ? `background:rgba(255,255,255,0.08); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.12); color:#fff;`
                : `background:transparent; border:2px solid ${accentColor}60; color:#fff;`
              return (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer"
                  style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, padding:'14px 20px', borderRadius:12, fontSize:14, fontWeight:600, cursor:'pointer', transition:'transform 0.18s, opacity 0.18s', textDecoration:'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLElement).style.opacity='0.88' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='none'; (e.currentTarget as HTMLElement).style.opacity='1' }}>
                  <style>{`a[data-lid="${link.id}"] { ${btnStyles} }`}</style>
                  <span dangerouslySetInnerHTML={{ __html: icon }} />
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Views */}
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.25)', marginTop:4 }}>
            {(profile.views || 0).toLocaleString()} views
          </div>
        </div>
      </div>
    </>
  )
}
