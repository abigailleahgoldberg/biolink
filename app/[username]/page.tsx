'use client'
import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { supabase, type Profile, type Link as ProfileLink } from '@/lib/supabase'

// Phosphor icons for social/content
import { DiscordLogo, SpotifyLogo, TwitchLogo, GithubLogo, TwitterLogo, InstagramLogo, TiktokLogo, YoutubeLogo, LinkedinLogo, RedditLogo, TelegramLogo, SnapchatLogo, PinterestLogo, SoundcloudLogo, Envelope, Globe, LinkSimple, GameController, Heart, Gift, Fire, Bug, Trophy, Sparkle, Snowflake, Medal, Shield, Crown, MusicNote, MapPin, Cake, Check, Eye, Megaphone, Timer, ChatText } from '@phosphor-icons/react'

const FONT_MAP: Record<string, string> = {
  'inter': "'Inter', system-ui, sans-serif",
  'geist': "'Geist', system-ui, sans-serif",
  'space-grotesk': "'Space Grotesk', system-ui, sans-serif",
  'outfit': "'Outfit', system-ui, sans-serif",
  'syne': "'Syne', system-ui, sans-serif",
}

const ICON_MAP: Record<string, React.ReactNode> = {
  discord: <DiscordLogo size={18} weight="fill" />,
  twitter: <TwitterLogo size={18} weight="fill" />,
  tiktok: <TiktokLogo size={18} weight="fill" />,
  youtube: <YoutubeLogo size={18} weight="fill" />,
  instagram: <InstagramLogo size={18} weight="fill" />,
  twitch: <TwitchLogo size={18} weight="fill" />,
  spotify: <SpotifyLogo size={18} weight="fill" />,
  github: <GithubLogo size={18} weight="fill" />,
  steam: <GameController size={18} weight="fill" />,
  telegram: <TelegramLogo size={18} weight="fill" />,
  snapchat: <SnapchatLogo size={18} weight="fill" />,
  reddit: <RedditLogo size={18} weight="fill" />,
  pinterest: <PinterestLogo size={18} weight="fill" />,
  linkedin: <LinkedinLogo size={18} weight="fill" />,
  email: <Envelope size={18} />,
  website: <Globe size={18} />,
  link: <LinkSimple size={18} />,
  custom: <LinkSimple size={18} />,
}

const BADGE_ICONS: Record<string, React.ReactNode> = {
  staff: <Shield size={14} weight="fill" />,
  helper: <Heart size={14} weight="fill" />,
  premium: <Crown size={14} weight="fill" />,
  verified: <Check size={14} weight="bold" />,
  donor: <Heart size={14} weight="fill" />,
  gifter: <Gift size={14} weight="fill" />,
  og: <Fire size={14} weight="fill" />,
  bughunter: <Bug size={14} weight="fill" />,
  winner: <Trophy size={14} weight="fill" />,
  founder: <Sparkle size={14} weight="fill" />,
  christmas: <Snowflake size={14} weight="fill" />,
  secondplace: <Medal size={14} weight="fill" />,
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
  if (diff <= 0) return (
    <div className="widget-card" style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      <Timer size={16} /> {label || 'Countdown'} has ended!
    </div>
  )
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return (
    <div className="widget-card">
      {label && <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{label}</div>}
      <div className="countdown-widget">
        {[{ v: d, l: 'Days' }, { v: h, l: 'Hours' }, { v: m, l: 'Min' }, { v: s, l: 'Sec' }].map(u => (
          <div key={u.l} className="cd-unit">
            <span className="cd-val">{String(u.v).padStart(2, '0')}</span>
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
  if (!profile) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)' }}>Loading...</div>

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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Syne:wght@400;500;600;700&display=swap');
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

      {/* 1. Cover Banner */}
      {hasCover && (
        <div className="cover-banner" style={{ backgroundImage: `url('${profile.cover_banner}')` }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
        </div>
      )}

      {/* 2. Main Container */}
      <div style={{ minHeight: hasCover ? 'auto' : '100vh', display: 'flex', alignItems: layoutMode === 'left' ? 'flex-start' : 'center', justifyContent: 'center', padding: hasCover ? '0 20px 40px' : '40px 20px' }}>
        <div className={animClass} style={{ width: '100%', maxWidth: maxW, display: 'flex', flexDirection: 'column', alignItems, marginTop: hasCover ? -50 : 0, position: 'relative', ...(glassCSS ? { background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32 } : {}) }}>

          {/* 3. Avatar */}
          {profile.avatar_url
            ? <img src={profile.avatar_url} alt={profile.username}
                className={profile.avatar_glow ? 'avatar-glow' : ''}
                style={{
                  width: 90, height: 90, borderRadius: avatarRadius, objectFit: 'cover',
                  border: profile.avatar_border !== false ? `3px solid ${accentColor}40` : 'none',
                  marginBottom: 14,
                }} />
            : <div style={{ width: 90, height: 90, borderRadius: avatarRadius, background: 'rgba(255,255,255,0.08)', border: `3px solid ${accentColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 14 }}>
                {(profile.display_name || profile.username)[0].toUpperCase()}
              </div>
          }

          {/* 4. Name Row: display_name + verified + pronouns */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: profile.pronouns ? 2 : 6 }}>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: '#fff', textAlign, ...(profile.text_shadow ? { textShadow: '0 2px 12px rgba(0,0,0,0.5)' } : {}) }}>
              {profile.display_name || profile.username}
            </span>
            {profile.verified && (
              <span className="verified-badge">
                <Check size={12} color="white" weight="bold" />
              </span>
            )}
            {profile.pronouns && (
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginLeft: 6 }}>
                {profile.pronouns}
              </span>
            )}
          </div>

          {/* 5. Tagline */}
          {profile.tagline && (
            <div style={{ fontSize: 13, color: `${accentColor}cc`, fontStyle: 'italic', fontWeight: 500, textAlign, marginBottom: 6, ...(profile.text_shadow ? { textShadow: '0 1px 8px rgba(0,0,0,0.4)' } : {}) }}>
              {profile.tagline}
            </div>
          )}

          {/* 6. Availability Status */}
          {profile.availability_status && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span className={`avail-dot ${profile.availability_status}`} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                {profile.current_status || profile.availability_status.charAt(0).toUpperCase() + profile.availability_status.slice(1)}
              </span>
            </div>
          )}

          {/* 7. Bio */}
          {profile.bio && (
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textAlign, marginBottom: 12, maxWidth: 300, lineHeight: 1.6 }}>
              {profile.bio}
            </div>
          )}

          {/* 8. Location + Website */}
          {profile.location && (
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={14} /> {profile.location}
            </div>
          )}
          {profile.website && (
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Globe size={14} />
              <a href={profile.website} target="_blank" rel="noreferrer" style={{ color: `${accentColor}cc`, textDecoration: 'underline', textUnderlineOffset: 2 }}>
                {profile.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </a>
            </div>
          )}

          {/* 9. Age */}
          {age !== null && (
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Cake size={14} /> {age} years old
            </div>
          )}

          {/* 10. Badges */}
          {profile.badges?.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: textAlign === 'center' ? 'center' : 'flex-start', marginBottom: 18 }}>
              {profile.badges.map((b: string) => (
                <span key={b} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: `${accentColor}18`, border: `1px solid ${accentColor}30`, color: 'rgba(255,255,255,0.75)', cursor: 'default', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  title={b}>
                  {BADGE_ICONS[b] || null}
                  {b}
                </span>
              ))}
            </div>
          )}

          {/* 11. Announcement Banner */}
          {profile.announcement && (
            <div className="announcement-banner" style={{ marginBottom: 14, borderColor: `${accentColor}40`, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Megaphone size={16} /> {profile.announcement}
            </div>
          )}

          {/* 12. Music Player */}
          {profile.music_url && profile.music_type && (
            <div className="widget-card" style={{ width: '100%', marginBottom: 14 }}>
              {profile.music_type === 'spotify' && profile.music_url.includes('spotify.com') ? (
                <iframe
                  src={`https://open.spotify.com/embed/${profile.music_url.replace('https://open.spotify.com/', '').replace('?', '/embed?')}`}
                  width="100%" height={profile.player_style === 'compact' ? 80 : profile.player_style === 'full' ? 152 : 80}
                  frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  style={{ borderRadius: 12 }} loading="lazy" />
              ) : (
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <MusicNote size={16} /> Music player
                </div>
              )}
            </div>
          )}

          {/* 13. Custom Text */}
          {profile.custom_text && (
            <div className="widget-card" style={{ width: '100%', marginBottom: 14, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, textAlign }}>
              {profile.custom_text}
            </div>
          )}

          {/* 14. Countdown Timer */}
          {profile.countdown_date && (
            <div style={{ width: '100%', marginBottom: 14 }}>
              <CountdownTimer date={profile.countdown_date} label={profile.countdown_label || ''} />
            </div>
          )}

          {/* 15. Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginBottom: 20 }}>
            {(profile.links || []).filter((l: ProfileLink) => l.visible !== false).map((link: ProfileLink, idx: number) => {
              const linkColor = link.color || accentColor
              const styleClass = `style-${btnStyle}`
              const hoverClass = hoverEffect !== 'none' ? `hover-${hoverEffect}` : ''

              return (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer"
                  className={`profile-link ${styleClass} ${hoverClass} ${animClass ? `${animClass} anim-delay-${Math.min(idx + 1, 5)}` : ''}`}
                  style={link.color ? {
                    ...(btnStyle === 'filled' ? { background: linkColor } : {}),
                    ...(btnStyle === 'outline' ? { borderColor: `${linkColor}60` } : {}),
                    ...(btnStyle === 'neon' ? { borderColor: linkColor, boxShadow: `0 0 10px ${linkColor}, 0 0 40px ${linkColor}25, inset 0 0 10px ${linkColor}15`, textShadow: `0 0 8px ${linkColor}` } : {}),
                    ...(btnStyle === 'soft' ? { background: `${linkColor}20` } : {}),
                  } : {}}>
                  {ICON_MAP[link.icon] || <LinkSimple size={18} />}
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* 16. Photo Gallery */}
          {profile.photo_gallery && profile.photo_gallery.length > 0 && (
            <div className="photo-grid" style={{ width: '100%', marginBottom: 20 }}>
              {profile.photo_gallery.map((url: string, i: number) => (
                <img key={i} src={url} alt="" loading="lazy" />
              ))}
            </div>
          )}

          {/* 17. Social Widgets Row */}
          {(profile.discord_widget || profile.twitch_username || profile.github_username) && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', width: '100%', marginBottom: 20, justifyContent: textAlign === 'center' ? 'center' : 'flex-start' }}>
              {profile.discord_widget && (
                <a href={`https://discord.gg/${profile.discord_widget}`} target="_blank" rel="noreferrer" className="social-widget">
                  <DiscordLogo size={18} weight="fill" style={{ color: '#5865F2' }} />
                  Discord
                </a>
              )}
              {profile.twitch_username && (
                <a href={`https://twitch.tv/${profile.twitch_username}`} target="_blank" rel="noreferrer" className="social-widget">
                  <TwitchLogo size={18} weight="fill" style={{ color: '#9146FF' }} />
                  {profile.twitch_username}
                </a>
              )}
              {profile.github_username && (
                <a href={`https://github.com/${profile.github_username}`} target="_blank" rel="noreferrer" className="social-widget">
                  <GithubLogo size={18} weight="fill" />
                  {profile.github_username}
                </a>
              )}
            </div>
          )}

          {/* 18. View Count + Footer */}
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Eye size={12} /> {(profile.views || profile.view_count || 0).toLocaleString()} views
            </span>
            <span>·</span>
            <a href="https://fentanyl.best" style={{ color: 'rgba(255,255,255,0.2)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}>
              fentanyl.best
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
