'use client'
import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { supabase, type Profile, type Link as ProfileLink } from '@/lib/supabase'

// Phosphor icons for social/content
import { DiscordLogo, SpotifyLogo, TwitchLogo, GithubLogo, TwitterLogo, InstagramLogo, TiktokLogo, YoutubeLogo, LinkedinLogo, RedditLogo, TelegramLogo, SnapchatLogo, PinterestLogo, SoundcloudLogo, Envelope, Globe, LinkSimple, GameController, Heart, Gift, Fire, Bug, Trophy, Sparkle, Snowflake, Medal, Shield, Crown, MusicNote, MapPin, Cake, Check, Eye, Megaphone, Timer, ChatText } from '@phosphor-icons/react'

// Lucide icons for announcement
import { Info, AlertTriangle } from 'lucide-react'

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

const ANNOUNCE_COLORS: Record<string, string> = {
  purple: 'rgba(163,151,221,0.15)',
  blue: 'rgba(96,165,250,0.15)',
  green: 'rgba(52,211,153,0.15)',
  red: 'rgba(248,113,113,0.15)',
  orange: 'rgba(251,146,60,0.15)',
  pink: 'rgba(244,114,182,0.15)',
}

const ANNOUNCE_ICON_MAP: Record<string, React.ReactNode> = {
  info: <Info size={16} />,
  warning: <AlertTriangle size={16} />,
  star: <Sparkle size={16} weight="fill" />,
  megaphone: <Megaphone size={16} />,
}

function getAge(birthday: string): number | null {
  if (!birthday) return null
  const b = new Date(birthday)
  const now = new Date()
  let age = now.getFullYear() - b.getFullYear()
  if (now.getMonth() < b.getMonth() || (now.getMonth() === b.getMonth() && now.getDate() < b.getDate())) age--
  return age
}

function parseCustomText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
}

function CountdownTimer({ date, label, style: countdownStyle }: { date: string; label: string; style?: string }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const diff = new Date(date).getTime() - now
  if (diff <= 0) return (
    <div className="profile-countdown" style={{ justifyContent: 'center' }}>
      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Timer size={16} /> {label || 'Countdown'} has ended!
      </span>
    </div>
  )
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return (
    <div className="profile-countdown">
      {label && <div style={{ width: '100%', textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{label}</div>}
      {[{ v: d, l: 'Days' }, { v: h, l: 'Hours' }, { v: m, l: 'Min' }, { v: s, l: 'Sec' }].map(u => (
        <div key={u.l} className="profile-countdown-unit">
          <span className="profile-countdown-num">{String(u.v).padStart(2, '0')}</span>
          <span className="profile-countdown-lbl">{u.l}</span>
        </div>
      ))}
    </div>
  )
}

export default function ProfilePage() {
  const params = useParams()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [notFoundFlag, setNotFoundFlag] = useState(false)
  const [githubData, setGithubData] = useState<{ contributions: number } | null>(null)
  const [discordCount, setDiscordCount] = useState<number | null>(null)
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

      // Fetch social data
      if (data.github_enabled && data.github_username) {
        fetch(`https://api.github.com/users/${data.github_username}`)
          .then(r => r.json())
          .then(d => setGithubData({ contributions: d.public_repos || 0 }))
          .catch(() => {})
      }
      if (data.discord_enabled && data.discord_widget) {
        fetch('/api/discord-members')
          .then(r => r.json())
          .then(d => setDiscordCount(d.count))
          .catch(() => {})
      }
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
  const cursorCSS = profile.custom_cursor ? `cursor: url('${profile.custom_cursor}'), auto;` : ''

  const avatarRadius = avatarShape === 'circle' ? '50%' : avatarShape === 'squircle' ? '22%' : '8px'
  const shapeRadius = btnShape === 'pill' ? '100px' : btnShape === 'square' ? '4px' : '12px'

  // Avatar size
  const avatarSizePx = profile.avatar_size === 'small' ? 72 : profile.avatar_size === 'large' ? 104 : 88

  // Avatar border (string-based)
  const avatarBorderCSS = profile.avatar_border === 'solid' ? `3px solid ${accentColor}40`
    : profile.avatar_border === 'glow' ? `3px solid ${accentColor}60`
    : profile.avatar_border === 'gradient' ? `3px solid ${accentColor}`
    : 'none'
  const avatarGlowCSS = (profile.avatar_border === 'glow' || profile.avatar_glow)
    ? `box-shadow: 0 0 20px ${accentColor}40, 0 0 60px ${accentColor}15;` : ''

  // Card border
  const cardBorderCSS = profile.card_border === 'subtle' ? '1px solid rgba(255,255,255,0.08)'
    : profile.card_border === 'accent' ? `1px solid ${accentColor}40`
    : profile.card_border === 'glow' ? `1px solid ${accentColor}60`
    : 'none'

  // Background
  const bgCSS = (() => {
    if (profile.background_type === 'gradient') {
      const from = profile.gradient_from || '#0d0d20'
      const to = profile.gradient_to || '#1a0d2e'
      const dir = profile.gradient_direction || '135'
      return `background: linear-gradient(${dir}deg, ${from}, ${to});`
    }
    if (profile.background_type === 'image') {
      return `background-image: url('${profile.background_value}'); background-size: cover; background-position: center;`
    }
    if (profile.background_type === 'animated') {
      return '' // handled separately
    }
    return `background: ${profile.background_value || '#07060f'};`
  })()

  const animBgCSS = profile.background_type === 'animated' ? (() => {
    const style = profile.animated_bg_style || 'mesh'
    if (style === 'mesh') return 'background: linear-gradient(135deg, #0d0d20, #1a0d2e, #0d1a0d); background-size:400% 400%; animation:animBg 12s ease infinite;'
    if (style === 'aurora') return 'background: linear-gradient(135deg, #0a1628, #1a0d2e, #0d1a2e); background-size:400% 400%; animation:animBg 15s ease infinite;'
    if (style === 'particles') return 'background: #0d0d20;'
    if (style === 'waves') return 'background: linear-gradient(180deg, #0d0d20, #1a0d2e); background-size:200% 200%; animation:animBg 8s ease infinite;'
    return 'background: #0d0d20;'
  })() : ''

  const animClass = animType === 'fade-in' ? 'anim-fade-in' : animType === 'slide-up' ? 'anim-slide-up' : animType === 'scale' ? 'anim-scale' : ''
  const maxW = layoutMode === 'wide' ? 560 : 420
  const alignItems = layoutMode === 'left' ? 'flex-start' : 'center'
  const textAlign = layoutMode === 'left' ? 'left' as const : 'center' as const

  // Button width
  const buttonWidthCSS = profile.button_width === 'full' ? 'width: 100%;' : ''

  // Glassmorphism
  const glassStyle = profile.glassmorphism ? {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: cardBorderCSS !== 'none' ? cardBorderCSS : '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 32,
  } : {}

  // Badge rendering helper
  const badgePosition = profile.badge_position || 'below-name'
  const renderBadges = () => {
    if (!profile.badges?.length) return null
    const badgeSizeMap = { small: 10, medium: 11, large: 13 }
    const fontSize = badgeSizeMap[profile.badge_size || 'medium'] || 11
    return (
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: textAlign === 'center' ? 'center' : 'flex-start', marginBottom: 18 }}>
        {profile.badges.map((b: string) => (
          <span key={b} style={{
            fontSize, fontWeight: 600, padding: '3px 10px', borderRadius: 100,
            background: `${accentColor}18`, border: `1px solid ${accentColor}30`,
            color: profile.badge_monochrome ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.75)',
            cursor: 'default', display: 'inline-flex', alignItems: 'center', gap: 4,
            ...(profile.badge_monochrome ? { filter: 'grayscale(1)' } : {}),
          }} title={b}>
            {BADGE_ICONS[b] || null}
            {b}
          </span>
        ))}
      </div>
    )
  }

  // Social row check
  const hasSocialRow = (profile.discord_enabled && profile.discord_widget) ||
    (profile.twitch_enabled && profile.twitch_username) ||
    (profile.github_enabled && profile.github_username) ||
    (profile.lastfm_enabled && profile.lastfm_username)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Syne:wght@400;500;600;700&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html, body { min-height:100vh; font-family:${fontFamily}; -webkit-font-smoothing:antialiased; ${cursorCSS} }
        a { text-decoration:none; color:inherit; }
        ${profile.background_type === 'animated' ? `
          body { ${animBgCSS} }
          @keyframes animBg { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        ` : `body { ${bgCSS} }`}
        .profile-link {
          display:flex; align-items:center; justify-content:center; gap:10px;
          padding:14px 20px; border-radius:${shapeRadius}; font-size:14px; font-weight:600;
          cursor:pointer; text-decoration:none; transition: transform 0.25s cubic-bezier(0.33,1,0.68,1), box-shadow 0.3s ease, opacity 0.2s;
          position:relative; overflow:hidden;
          ${buttonWidthCSS}
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
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img src={profile.cover_banner} alt="" className="profile-cover" />
          <div className="profile-cover-fade" style={{ background: `linear-gradient(to top, ${profile.background_value || '#07060f'}, transparent)` }} />
        </div>
      )}

      {/* Image overlay */}
      {profile.background_type === 'image' && (profile.overlay_opacity || 0) > 0 && (
        <div style={{ position: 'fixed', inset: 0, background: `rgba(0,0,0,${profile.overlay_opacity / 100})`, pointerEvents: 'none', zIndex: 0 }} />
      )}

      {/* Main Container */}
      <div style={{ minHeight: hasCover ? 'auto' : '100vh', display: 'flex', alignItems: layoutMode === 'left' ? 'flex-start' : 'center', justifyContent: 'center', padding: hasCover ? '0 20px 40px' : '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className={animClass} style={{ width: '100%', maxWidth: maxW, display: 'flex', flexDirection: 'column', alignItems, marginTop: hasCover ? -50 : 0, position: 'relative', ...glassStyle }}>

          {/* Avatar */}
          {profile.avatar_url
            ? <img src={profile.avatar_url} alt={profile.username}
                className={avatarGlowCSS ? 'avatar-glow' : ''}
                style={{
                  width: avatarSizePx, height: avatarSizePx, borderRadius: avatarRadius, objectFit: 'cover',
                  border: avatarBorderCSS,
                  marginBottom: 14,
                  ...(avatarGlowCSS ? { boxShadow: `0 0 20px ${accentColor}40, 0 0 60px ${accentColor}15` } : {}),
                }} />
            : <div style={{ width: avatarSizePx, height: avatarSizePx, borderRadius: avatarRadius, background: 'rgba(255,255,255,0.08)', border: `3px solid ${accentColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 14 }}>
                {(profile.display_name || profile.username)[0].toUpperCase()}
              </div>
          }

          {/* Name Row: display_name + verified + pronouns */}
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

          {/* Badges: below-name position */}
          {badgePosition === 'below-name' && renderBadges()}

          {/* Tagline */}
          {profile.tagline && (
            <div style={{ fontSize: 13, color: `${accentColor}cc`, fontStyle: 'italic', fontWeight: 500, textAlign, marginBottom: 6, ...(profile.text_shadow ? { textShadow: '0 1px 8px rgba(0,0,0,0.4)' } : {}) }}>
              {profile.tagline}
            </div>
          )}

          {/* Availability Status */}
          {profile.availability_status && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span className={`avail-dot ${profile.availability_status}`} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                {profile.current_status || profile.availability_status.charAt(0).toUpperCase() + profile.availability_status.slice(1)}
              </span>
            </div>
          )}

          {/* Currently Playing */}
          {profile.currently_playing_enabled && profile.currently_playing && (
            <div className="profile-meta-pill" style={{ margin: '8px 0' }}>
              <span style={{ color: accentColor }}>&#9654;</span> {profile.currently_playing}
            </div>
          )}

          {/* Bio */}
          {profile.bio && (
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textAlign, marginBottom: 12, maxWidth: 300, lineHeight: 1.6 }}>
              {profile.bio}
            </div>
          )}

          {/* Badges: below-bio position */}
          {badgePosition === 'below-bio' && renderBadges()}

          {/* Location + Website */}
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

          {/* Age */}
          {age !== null && (
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Cake size={14} /> {age} years old
            </div>
          )}

          {/* Announcement Banner */}
          {profile.announcement_enabled && profile.announcement && (
            <div className="profile-announcement" style={{
              marginBottom: 14,
              background: ANNOUNCE_COLORS[profile.announcement_color] || ANNOUNCE_COLORS.purple,
              border: `1px solid ${accentColor}25`,
            }}>
              {ANNOUNCE_ICON_MAP[profile.announcement_icon] || <Megaphone size={16} />}
              {profile.announcement}
            </div>
          )}

          {/* Music Player */}
          {profile.music_url && profile.music_type && (
            <div className="profile-music-wrap" style={{ width: '100%', marginBottom: 14 }}>
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

          {/* Custom Text */}
          {profile.custom_text_enabled && profile.custom_text && (
            <div className="profile-custom-text"
              style={{ textAlign: profile.custom_text_align || 'center' }}
              dangerouslySetInnerHTML={{ __html: parseCustomText(profile.custom_text) }}
            />
          )}

          {/* Countdown Timer */}
          {profile.countdown_enabled && profile.countdown_date && (
            <div style={{ width: '100%', marginBottom: 14 }}>
              <CountdownTimer date={profile.countdown_date} label={profile.countdown_label || ''} style={profile.countdown_style} />
            </div>
          )}

          {/* Badges: above-links position */}
          {badgePosition === 'above-links' && renderBadges()}

          {/* Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginBottom: 20 }}>
            {(profile.links || []).filter((l: ProfileLink) => l.visible !== false).map((link: ProfileLink, idx: number) => {
              // Section headers
              if (link.section === 'header') {
                return <div key={link.id} className="profile-link-header">{link.label}</div>
              }

              const linkColor = link.color || accentColor
              const styleClass = `style-${btnStyle}`
              const hoverClass = hoverEffect !== 'none' ? `hover-${hoverEffect}` : ''

              return (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer"
                  className={`profile-link ${styleClass} ${hoverClass} ${animClass ? `${animClass} anim-delay-${Math.min(idx + 1, 5)}` : ''}`}
                  style={{
                    ...(profile.button_width === 'full' ? { width: '100%' } : {}),
                    ...(link.color ? {
                      ...(btnStyle === 'filled' ? { background: linkColor } : {}),
                      ...(btnStyle === 'outline' ? { borderColor: `${linkColor}60` } : {}),
                      ...(btnStyle === 'neon' ? { borderColor: linkColor, boxShadow: `0 0 10px ${linkColor}, 0 0 40px ${linkColor}25, inset 0 0 10px ${linkColor}15`, textShadow: `0 0 8px ${linkColor}` } : {}),
                      ...(btnStyle === 'soft' ? { background: `${linkColor}20` } : {}),
                    } : {}),
                  }}>
                  {ICON_MAP[link.icon] || <LinkSimple size={18} />}
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Photo Gallery */}
          {profile.photo_gallery_enabled && profile.photo_gallery && profile.photo_gallery.length > 0 && (
            <div className="profile-photo-grid" style={{ width: '100%', marginBottom: 20 }}>
              {profile.photo_gallery.map((url: string, i: number) => (
                <img key={i} src={url} alt="" loading="lazy" />
              ))}
            </div>
          )}

          {/* Social Widgets Row */}
          {hasSocialRow ? (
            <div className="profile-social-row">
              {profile.discord_enabled && profile.discord_widget && (
                <div className="profile-social-chip">
                  <DiscordLogo size={16} weight="fill" style={{ color: '#5865F2' }} />
                  {discordCount !== null ? `${discordCount} online` : 'Discord'}
                </div>
              )}
              {profile.twitch_enabled && profile.twitch_username && (
                <a href={`https://twitch.tv/${profile.twitch_username}`} target="_blank" rel="noreferrer" className="profile-social-chip">
                  <TwitchLogo size={16} weight="fill" style={{ color: '#9146FF' }} />
                  {profile.twitch_username}
                </a>
              )}
              {profile.github_enabled && profile.github_username && (
                <a href={`https://github.com/${profile.github_username}`} target="_blank" rel="noreferrer" className="profile-social-chip">
                  <GithubLogo size={16} weight="fill" />
                  {githubData ? `${githubData.contributions} repos` : profile.github_username}
                </a>
              )}
              {profile.lastfm_enabled && profile.lastfm_username && (
                <a href={`https://last.fm/user/${profile.lastfm_username}`} target="_blank" rel="noreferrer" className="profile-social-chip">
                  <MusicNote size={16} />
                  {profile.lastfm_username}
                </a>
              )}
            </div>
          ) : null}

          {/* Footer */}
          <div className="profile-footer">
            {(profile.show_view_count !== false) && (
              <span className="profile-views"><Eye size={12} /> {(profile.views || profile.view_count || 0).toLocaleString()} views</span>
            )}
            <span className="profile-brand">made with <a href="https://fentanyl.best">fentanyl.best</a></span>
          </div>
        </div>
      </div>
    </>
  )
}
