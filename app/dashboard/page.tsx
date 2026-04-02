'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase, type Profile, type Link as ProfileLink } from '@/lib/supabase'

// Lucide icons for UI/navigation
import { Home, User, Palette, Link2, Music, LayoutGrid, Users, BarChart3, Shield, Settings, Crown, Share2, ChevronUp, ChevronDown, Eye, EyeOff, Pencil, HelpCircle, ExternalLink, LogOut, Trash2, Copy, Plus, Minus, GripVertical, Check, X, Calendar, ArrowUp, ArrowDown, Info, AlertTriangle, Megaphone, Star as StarIcon, Image as ImageIcon, Type, Sparkles, Monitor, Smartphone, Tablet, Globe, MapPin, Download } from 'lucide-react'

// Phosphor icons for features/content
import { DiscordLogo, SpotifyLogo, TwitchLogo, GithubLogo, TwitterLogo, InstagramLogo, TiktokLogo, YoutubeLogo, LinkedinLogo, RedditLogo, TelegramLogo, SnapchatLogo, PinterestLogo, SoundcloudLogo, Gear, Bell, Trophy, Bug, Heart, Gift, Sparkle, Timer, ChatText, Lock, Hash, MusicNote, GameController, Lightning, Fire, Snowflake, Medal, AppleLogo } from '@phosphor-icons/react'

type Section = 'overview' | 'profile' | 'appearance' | 'links' | 'music' | 'social' | 'widgets' | 'analytics' | 'themes' | 'share' | 'badges' | 'settings' | 'premium' | 'admin-invites' | 'admin-users' | 'admin-blacklist'

const BADGE_ICONS: Record<string, React.ReactNode> = {
  staff: <Shield size={22} />,
  helper: <Heart size={22} weight="fill" />,
  premium: <Crown size={22} />,
  verified: <Check size={22} />,
  donor: <Heart size={22} weight="fill" />,
  gifter: <Gift size={22} weight="fill" />,
  og: <Fire size={22} weight="fill" />,
  bughunter: <Bug size={22} weight="fill" />,
  winner: <Trophy size={22} weight="fill" />,
  founder: <Sparkle size={22} weight="fill" />,
  christmas: <Snowflake size={22} weight="fill" />,
  secondplace: <Medal size={22} weight="fill" />,
}

const ALL_BADGES = [
  { id:'staff',      name:'Staff',         desc:'Be a part of the fentanyl.best team.' },
  { id:'helper',     name:'Helper',        desc:'Be active and help users in the community.' },
  { id:'premium',    name:'Premium',       desc:'Purchase the premium package.' },
  { id:'verified',   name:'Verified',      desc:'Purchase or be a known content creator.' },
  { id:'donor',      name:'Donor',         desc:'Donate to fentanyl.best.' },
  { id:'gifter',     name:'Gifter',        desc:'Gift a fentanyl.best product to another user.' },
  { id:'og',         name:'OG',            desc:'Be an early supporter of fentanyl.best.' },
  { id:'bughunter',  name:'Bug Hunter',    desc:'Report a bug to the fentanyl.best team.' },
  { id:'winner',     name:'Winner',        desc:'Win a fentanyl.best event.' },
  { id:'founder',    name:'Founder',       desc:'Exclusive founder badge.' },
  { id:'christmas',  name:'Christmas 2025',desc:'Exclusive badge from the 2025 winter event.' },
  { id:'secondplace',name:'Second Place',  desc:'Get second place in a fentanyl.best event.' },
]
const ACCENT_PRESETS = ['#A397DD','#C9BDFE','#B7AAF3','#9583CB','#60a5fa','#34d399','#f472b6','#fb923c','#facc15','#a78bfa','#22d3ee','#e879f9']
const BG_PRESETS     = ['#07060f','#0a0f1e','#0f0a1a','#0a1a0a','#1a0a0a','#0f0f0f','#0a0a1f','#1a0f0a','#0d1117','#111111','#0c0c14','#15121f']
const FONTS          = ['inter','geist','space-grotesk','outfit','syne']
const SOCIAL_ICONS   = ['discord','twitter','tiktok','youtube','instagram','twitch','spotify','github','steam','telegram','snapchat','reddit','pinterest','linkedin','email','website','custom']
const BTN_STYLES     = ['filled','outline','glass','neon','soft','3d-shadow'] as Profile['button_style'][]
const BTN_SHAPES     = ['rounded','pill','square'] as Profile['button_shape'][]
const HOVER_EFFECTS  = ['none','lift','glow','slide'] as Profile['hover_effect'][]
const AVATAR_SHAPES  = ['circle','squircle','square'] as Profile['avatar_shape'][]
const ANIMATIONS     = ['none','fade-in','slide-up','scale'] as Profile['animation_type'][]
const LAYOUT_MODES   = ['centered','left','wide'] as Profile['layout_mode'][]
const AVAIL_STATUSES = ['','online','away','busy','offline'] as Profile['availability_status'][]
const PLAYER_STYLES  = ['minimal','full','compact'] as Profile['player_style'][]

const THEME_PRESETS = [
  { id:'midnight',    name:'Midnight',       bg:'#07060f',    accent:'#A397DD', btnStyle:'outline' as const, btnShape:'rounded' as const },
  { id:'ocean',       name:'Ocean Deep',     bg:'#0a1628',    accent:'#60a5fa', btnStyle:'glass' as const, btnShape:'pill' as const },
  { id:'forest',      name:'Dark Forest',    bg:'#0a1a0a',    accent:'#34d399', btnStyle:'soft' as const, btnShape:'rounded' as const },
  { id:'rose',        name:'Rose Gold',      bg:'#1a0a0f',    accent:'#f472b6', btnStyle:'neon' as const, btnShape:'pill' as const },
  { id:'sunset',      name:'Sunset',         bg:'#1a0f0a',    accent:'#fb923c', btnStyle:'filled' as const, btnShape:'rounded' as const },
  { id:'cyber',       name:'Cyberpunk',      bg:'#0d0d20',    accent:'#22d3ee', btnStyle:'neon' as const, btnShape:'square' as const },
  { id:'purple',      name:'Purple Haze',    bg:'#0f0a1a',    accent:'#a78bfa', btnStyle:'glass' as const, btnShape:'rounded' as const },
  { id:'monochrome',  name:'Monochrome',     bg:'#111111',    accent:'#888888', btnStyle:'outline' as const, btnShape:'square' as const },
  { id:'aurora',      name:'Aurora',         bg:'#0c1220',    accent:'#34d399', btnStyle:'soft' as const, btnShape:'pill' as const },
  { id:'candy',       name:'Cotton Candy',   bg:'#1a0a1a',    accent:'#e879f9', btnStyle:'soft' as const, btnShape:'pill' as const },
  { id:'gold',        name:'Gold Rush',      bg:'#1a1400',    accent:'#facc15', btnStyle:'3d-shadow' as const, btnShape:'rounded' as const },
  { id:'ice',         name:'Ice Cold',       bg:'#0a1a2a',    accent:'#7dd3fc', btnStyle:'glass' as const, btnShape:'pill' as const },
]

const FONT_FAMILY_MAP: Record<string, string> = {
  'inter': 'Inter',
  'geist': 'Geist',
  'space-grotesk': 'Space Grotesk',
  'outfit': 'Outfit',
  'syne': 'Syne',
}

const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  discord: <DiscordLogo size={16} weight="fill"/>,
  twitter: <TwitterLogo size={16} weight="fill"/>,
  tiktok: <TiktokLogo size={16} weight="fill"/>,
  youtube: <YoutubeLogo size={16} weight="fill"/>,
  instagram: <InstagramLogo size={16} weight="fill"/>,
  twitch: <TwitchLogo size={16} weight="fill"/>,
  spotify: <SpotifyLogo size={16} weight="fill"/>,
  github: <GithubLogo size={16} weight="fill"/>,
  telegram: <TelegramLogo size={16} weight="fill"/>,
  snapchat: <SnapchatLogo size={16} weight="fill"/>,
  reddit: <RedditLogo size={16} weight="fill"/>,
  pinterest: <PinterestLogo size={16} weight="fill"/>,
  linkedin: <LinkedinLogo size={16} weight="fill"/>,
  soundcloud: <SoundcloudLogo size={16} weight="fill"/>,
  email: <Globe size={16}/>,
  website: <Globe size={16}/>,
  custom: <Link2 size={16}/>,
  steam: <GameController size={16} weight="fill"/>,
}

export default function Dashboard() {
  const router = useRouter()
  const [profile,   setProfile]   = useState<Profile | null>(null)
  const [loading,   setLoading]   = useState(true)
  const [section,   setSection]   = useState<Section>('overview')
  const [acctOpen,  setAcctOpen]  = useState(true)
  const [adminOpen, setAdminOpen] = useState(false)
  const [saving,    setSaving]    = useState(false)
  const [saved,     setSaved]     = useState(false)
  const [msg,       setMsg]       = useState('')

  // profile fields (existing)
  const [displayName, setDisplayName] = useState('')
  const [bio,         setBio]         = useState('')
  const [avatarUrl,   setAvatarUrl]   = useState('')
  const [links,       setLinks]       = useState<ProfileLink[]>([])
  const [bgType,      setBgType]      = useState<Profile['background_type']>('color')
  const [bgValue,     setBgValue]     = useState('#07060f')
  const [accent,      setAccent]      = useState('#A397DD')
  const [btnStyle,    setBtnStyle]    = useState<Profile['button_style']>('outline')
  const [font,        setFont]        = useState('inter')
  const [badges,      setBadges]      = useState<string[]>([])
  const [activeBadges,setActiveBadges]= useState<string[]>([])
  const [musicUrl,    setMusicUrl]    = useState('')
  const [musicType,   setMusicType]   = useState<Profile['music_type']>(null)
  const [monoChrome,  setMonoChrome]  = useState(false)

  // new profile fields
  const [pronouns,    setPronouns]    = useState('')
  const [location,    setLocation]    = useState('')
  const [website,     setWebsite]     = useState('')
  const [coverBanner, setCoverBanner] = useState('')
  const [tagline,     setTagline]     = useState('')
  const [verified,    setVerified]    = useState(false)
  const [showAge,     setShowAge]     = useState(false)
  const [birthday,    setBirthday]    = useState('')

  // appearance
  const [btnShape,    setBtnShape]    = useState<Profile['button_shape']>('rounded')
  const [textShadow,  setTextShadow]  = useState(false)
  const [blurAmount,  setBlurAmount]  = useState(0)
  const [glassmorphism,setGlassmorphism]= useState(false)
  const [avatarShape, setAvatarShape] = useState<Profile['avatar_shape']>('circle')
  const [avatarBorder,setAvatarBorder]= useState(true)
  const [avatarGlow,  setAvatarGlow]  = useState(false)
  const [animationType,setAnimationType]= useState<Profile['animation_type']>('none')
  const [customCursor,setCustomCursor]= useState('')
  const [layoutMode,  setLayoutMode]  = useState<Profile['layout_mode']>('centered')
  const [hoverEffect, setHoverEffect] = useState<Profile['hover_effect']>('lift')

  // music
  const [musicAutoplay,setMusicAutoplay]= useState(false)
  const [musicLoop,   setMusicLoop]   = useState(false)
  const [playerStyle, setPlayerStyle] = useState<Profile['player_style']>('minimal')

  // social
  const [discordWidget, setDiscordWidget] = useState('')
  const [spotifyNP,   setSpotifyNP]   = useState(false)
  const [twitchUser,  setTwitchUser]  = useState('')
  const [githubUser,  setGithubUser]  = useState('')

  // widgets
  const [announcement,setAnnouncement]= useState('')
  const [countdownDate,setCountdownDate]= useState('')
  const [countdownLabel,setCountdownLabel]= useState('')
  const [customText,  setCustomText]  = useState('')
  const [photoGallery,setPhotoGallery]= useState<string[]>([])
  const [availStatus, setAvailStatus] = useState<Profile['availability_status']>('')
  const [currentStatus,setCurrentStatus]= useState('')
  const [newPhotoUrl, setNewPhotoUrl] = useState('')

  // theme
  const [themePreset, setThemePreset] = useState('')

  // settings
  const [sUser, setSUser] = useState('')
  const [sDN,   setSDN]   = useState('')
  const [sBio,  setSBio]  = useState('')
  const [sEmail,setSEmail]= useState('')
  const [sPass, setSPass] = useState('')

  // admin
  const [invites,   setInvites]   = useState<any[]>([])
  const [users,     setUsers]     = useState<any[]>([])
  const [blacklist, setBlacklist] = useState<any[]>([])
  const [newBL,     setNewBL]     = useState('')
  const [generating,setGenerating]= useState(false)

  // --- NEW STATE VARIABLES ---
  const [showViewCount, setShowViewCount] = useState(true)
  const [showJoinDate, setShowJoinDate] = useState(true)
  const [buttonWidth, setButtonWidth] = useState<'auto'|'full'>('auto')
  const [cardBorder, setCardBorder] = useState<'none'|'subtle'|'accent'|'glow'>('none')
  const [avatarSize, setAvatarSize] = useState<'small'|'medium'|'large'>('medium')
  const [overlayOpacity, setOverlayOpacity] = useState(0)
  const [gradientFrom, setGradientFrom] = useState('#0d0d20')
  const [gradientTo, setGradientTo] = useState('#1a0d2e')
  const [gradientDir, setGradientDir] = useState('135')
  const [animatedBgStyle, setAnimatedBgStyle] = useState<'mesh'|'aurora'|'particles'|'waves'>('mesh')
  const [musicVolume, setMusicVolume] = useState(80)
  const [announcementEnabled, setAnnouncementEnabled] = useState(false)
  const [announcementColor, setAnnouncementColor] = useState('purple')
  const [announcementIcon, setAnnouncementIcon] = useState('info')
  const [countdownEnabled, setCountdownEnabled] = useState(false)
  const [countdownStyle, setCountdownStyle] = useState<'minimal'|'card'|'glowing'>('minimal')
  const [currentlyPlaying, setCurrentlyPlaying] = useState('')
  const [currentlyPlayingEnabled, setCurrentlyPlayingEnabled] = useState(false)
  const [customTextEnabled, setCustomTextEnabled] = useState(false)
  const [customTextAlign, setCustomTextAlign] = useState<'left'|'center'|'right'>('center')
  const [photoGalleryEnabled, setPhotoGalleryEnabled] = useState(false)
  const [discordEnabled, setDiscordEnabled] = useState(false)
  const [twitchEnabled, setTwitchEnabled] = useState(false)
  const [githubEnabled, setGithubEnabled] = useState(false)
  const [lastfmUser, setLastfmUser] = useState('')
  const [lastfmEnabled, setLastfmEnabled] = useState(false)
  const [badgeSize, setBadgeSize] = useState<'small'|'medium'|'large'>('medium')
  const [badgePosition, setBadgePosition] = useState<'below-name'|'below-bio'|'above-links'>('below-name')
  const [profileVisibility, setProfileVisibility] = useState<'public'|'unlisted'|'private'>('public')
  const [showCoverPreview, setShowCoverPreview] = useState(false)
  const [avatarBorderType, setAvatarBorderType] = useState<'none'|'solid'|'glow'|'gradient'>('solid')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (!data) { router.push('/login'); return }
      setProfile(data)
      // existing
      setDisplayName(data.display_name||''); setSDN(data.display_name||'')
      setBio(data.bio||''); setSBio(data.bio||'')
      setAvatarUrl(data.avatar_url||''); setSUser(data.username||'')
      setLinks(data.links||[]); setBgType(data.background_type||'color')
      setBgValue(data.background_value||'#07060f'); setAccent(data.accent_color||'#A397DD')
      setBtnStyle(data.button_style||'outline'); setFont(data.font||'inter')
      setBadges(data.badges||[]); setActiveBadges(data.badges||[])
      setMusicUrl(data.music_url||''); setMusicType(data.music_type||null)
      // new fields
      setPronouns(data.pronouns||''); setLocation(data.location||'')
      setWebsite(data.website||''); setCoverBanner(data.cover_banner||'')
      setTagline(data.tagline||''); setVerified(data.verified||false)
      setShowAge(data.show_age||false); setBirthday(data.birthday||'')
      setBtnShape(data.button_shape||'rounded'); setTextShadow(data.text_shadow||false)
      setBlurAmount(data.blur_amount||0); setGlassmorphism(data.glassmorphism||false)
      setAvatarShape(data.avatar_shape||'circle'); setAvatarBorder(data.avatar_border!==false)
      setAvatarGlow(data.avatar_glow||false); setAnimationType(data.animation_type||'none')
      setCustomCursor(data.custom_cursor||''); setLayoutMode(data.layout_mode||'centered')
      setHoverEffect(data.hover_effect||'lift')
      setMusicAutoplay(data.music_autoplay||false); setMusicLoop(data.music_loop||false)
      setPlayerStyle(data.player_style||'minimal')
      setDiscordWidget(data.discord_widget||''); setSpotifyNP(data.spotify_now_playing||false)
      setTwitchUser(data.twitch_username||''); setGithubUser(data.github_username||'')
      setAnnouncement(data.announcement||''); setCountdownDate(data.countdown_date||'')
      setCountdownLabel(data.countdown_label||''); setCustomText(data.custom_text||'')
      setPhotoGallery(data.photo_gallery||[]); setAvailStatus(data.availability_status||'')
      setCurrentStatus(data.current_status||''); setThemePreset(data.theme_preset||'')
      // new fields load
      setShowViewCount(data.show_view_count !== false)
      setShowJoinDate(data.show_join_date !== false)
      setButtonWidth(data.button_width || 'auto')
      setCardBorder(data.card_border || 'none')
      setAvatarSize(data.avatar_size || 'medium')
      setOverlayOpacity(data.overlay_opacity || 0)
      setGradientFrom(data.gradient_from || '#0d0d20')
      setGradientTo(data.gradient_to || '#1a0d2e')
      setGradientDir(data.gradient_direction || '135')
      setAnimatedBgStyle(data.animated_bg_style || 'mesh')
      setMusicVolume(data.music_volume || 80)
      setAnnouncementEnabled(data.announcement_enabled || false)
      setAnnouncementColor(data.announcement_color || 'purple')
      setAnnouncementIcon(data.announcement_icon || 'info')
      setCountdownEnabled(data.countdown_enabled || false)
      setCountdownStyle(data.countdown_style || 'minimal')
      setCurrentlyPlaying(data.currently_playing || '')
      setCurrentlyPlayingEnabled(data.currently_playing_enabled || false)
      setCustomTextEnabled(data.custom_text_enabled || false)
      setCustomTextAlign(data.custom_text_align || 'center')
      setPhotoGalleryEnabled(data.photo_gallery_enabled || false)
      setDiscordEnabled(data.discord_enabled || false)
      setTwitchEnabled(data.twitch_enabled || false)
      setGithubEnabled(data.github_enabled || false)
      setLastfmUser(data.lastfm_username || '')
      setLastfmEnabled(data.lastfm_enabled || false)
      setBadgeSize(data.badge_size || 'medium')
      setBadgePosition(data.badge_position || 'below-name')
      setProfileVisibility(data.profile_visibility || 'public')
      setAvatarBorderType(data.avatar_border === true || data.avatar_border === 'solid' ? 'solid' : data.avatar_border || 'solid')
      if (data.is_admin) loadAdmin()
      setLoading(false)
    }
    load()
  }, [router])

  async function loadAdmin() {
    const [inv, usr, bl] = await Promise.all([
      supabase.from('invite_codes').select('*').order('created_at', { ascending: false }),
      supabase.from('profiles').select('id,username,display_name,view_count,is_admin,created_at').order('created_at', { ascending: false }),
      supabase.from('blacklisted_usernames').select('*').order('created_at', { ascending: false }),
    ])
    setInvites(inv.data||[]); setUsers(usr.data||[]); setBlacklist(bl.data||[])
  }

  async function save(fields?: object) {
    if (!profile) return; setSaving(true)
    const payload = fields || {
      display_name: displayName, bio, avatar_url: avatarUrl, links,
      background_type: bgType, background_value: bgValue,
      accent_color: accent, button_style: btnStyle, font,
      badges: activeBadges, music_url: musicUrl, music_type: musicType,
      pronouns, location, website, cover_banner: coverBanner, tagline,
      verified, show_age: showAge, birthday,
      button_shape: btnShape, text_shadow: textShadow, blur_amount: blurAmount,
      glassmorphism, avatar_shape: avatarShape, avatar_border: avatarBorderType,
      avatar_glow: avatarGlow, animation_type: animationType,
      custom_cursor: customCursor, layout_mode: layoutMode, hover_effect: hoverEffect,
      music_autoplay: musicAutoplay, music_loop: musicLoop, player_style: playerStyle,
      discord_widget: discordWidget, spotify_now_playing: spotifyNP,
      twitch_username: twitchUser, github_username: githubUser,
      announcement, countdown_date: countdownDate, countdown_label: countdownLabel,
      custom_text: customText, photo_gallery: photoGallery,
      availability_status: availStatus, current_status: currentStatus,
      theme_preset: themePreset,
      // new fields
      show_view_count: showViewCount,
      show_join_date: showJoinDate,
      button_width: buttonWidth,
      card_border: cardBorder,
      avatar_size: avatarSize,
      overlay_opacity: overlayOpacity,
      gradient_from: gradientFrom,
      gradient_to: gradientTo,
      gradient_direction: gradientDir,
      animated_bg_style: animatedBgStyle,
      music_volume: musicVolume,
      announcement_enabled: announcementEnabled,
      announcement_color: announcementColor,
      announcement_icon: announcementIcon,
      countdown_enabled: countdownEnabled,
      countdown_style: countdownStyle,
      currently_playing: currentlyPlaying,
      currently_playing_enabled: currentlyPlayingEnabled,
      custom_text_enabled: customTextEnabled,
      custom_text_align: customTextAlign,
      photo_gallery_enabled: photoGalleryEnabled,
      discord_enabled: discordEnabled,
      twitch_enabled: twitchEnabled,
      github_enabled: githubEnabled,
      lastfm_username: lastfmUser,
      lastfm_enabled: lastfmEnabled,
      badge_size: badgeSize,
      badge_position: badgePosition,
      profile_visibility: profileVisibility,
    }
    await supabase.from('profiles').update(payload).eq('id', profile.id)
    setSaving(false); setSaved(true); setTimeout(()=>setSaved(false),2000)
  }

  async function saveSetting(field: string, value: string) {
    if (!profile) return
    if (field==='email') {
      const { error } = await supabase.auth.updateUser({ email: value })
      flash(error ? error.message : 'Confirmation sent to new email.'); return
    }
    if (field==='password') {
      if (value.length < 8) { flash('Password must be 8+ characters.'); return }
      const { error } = await supabase.auth.updateUser({ password: value })
      flash(error ? error.message : 'Password updated!'); setSPass(''); return
    }
    const { error } = await supabase.from('profiles').update({ [field]: value }).eq('id', profile.id)
    if (error) { flash(field==='username'?'Username taken.':'Update failed.'); return }
    setProfile(p => p ? {...p,[field]:value} : p)
    flash('Saved!')
  }

  function flash(m: string) { setMsg(m); setTimeout(()=>setMsg(''),3000) }

  async function generateInvite() {
    setGenerating(true)
    const { data: { user } } = await supabase.auth.getUser()
    const res = await fetch('/api/admin/generate-invite', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ userId: user?.id }),
    })
    if (!res.ok) { const { error } = await res.json(); flash(error||'Failed') }
    await loadAdmin(); setGenerating(false)
  }

  async function revokeInvite(id: string) {
    await supabase.from('invite_codes').delete().eq('id', id); await loadAdmin()
  }

  async function addBlacklist() {
    if (!newBL.trim()) return
    const { data:{user} } = await supabase.auth.getUser()
    await supabase.from('blacklisted_usernames').insert({ username: newBL.trim().toLowerCase(), added_by: user?.id })
    setNewBL(''); await loadAdmin()
  }

  async function removeBlacklist(id: string) {
    await supabase.from('blacklisted_usernames').delete().eq('id', id); await loadAdmin()
  }

  async function toggleAdmin(id: string, cur: boolean) {
    await supabase.from('profiles').update({ is_admin: !cur }).eq('id', id); await loadAdmin()
  }

  function addLink()    { setLinks(l=>[...l,{id:crypto.randomUUID(),label:'',url:'',icon:'custom',visible:true,clicks:0}]) }
  function addSectionHeader() { setLinks(l=>[...l,{id:crypto.randomUUID(),label:'Section',url:'',icon:'custom',visible:true,clicks:0,section:'header'}]) }
  function removeLink(id:string) { setLinks(l=>l.filter(x=>x.id!==id)) }
  function updateLink(id:string, f:keyof ProfileLink, v:any) { setLinks(l=>l.map(x=>x.id===id?{...x,[f]:v}:x)) }
  function toggleActiveBadge(id:string) { setActiveBadges(b=>b.includes(id)?b.filter(x=>x!==id):[...b,id]) }
  function moveLink(idx: number, dir: -1|1) {
    const newLinks = [...links]
    const target = idx + dir
    if (target < 0 || target >= newLinks.length) return
    ;[newLinks[idx], newLinks[target]] = [newLinks[target], newLinks[idx]]
    setLinks(newLinks)
  }
  function addPhoto() {
    if (!newPhotoUrl.trim()) return
    setPhotoGallery(g=>[...g, newPhotoUrl.trim()])
    setNewPhotoUrl('')
  }
  function removePhoto(idx: number) { setPhotoGallery(g=>g.filter((_,i)=>i!==idx)) }
  function applyTheme(t: typeof THEME_PRESETS[0]) {
    setBgType('color'); setBgValue(t.bg); setAccent(t.accent)
    setBtnStyle(t.btnStyle); setBtnShape(t.btnShape); setThemePreset(t.id)
  }

  const isAdmin = profile?.is_admin
  const isAdminSection = section.startsWith('admin-')

  const checks = [
    { label:'Upload An Avatar',   done:!!avatarUrl },
    { label:'Add A Description',  done:!!bio },
    { label:'Add Socials',        done:links.length>0 },
    { label:'Get a profile view', done:(profile?.view_count||0)>0 },
    { label:'Add a cover banner', done:!!coverBanner },
    { label:'Set your tagline',   done:!!tagline },
  ]
  const pct = Math.round((checks.filter(c=>c.done).length/checks.length)*100)

  const saveBtn = <button className="db-cta-btn" onClick={()=>save()} disabled={saving} style={{marginTop:16}}>
    {saved ? <><Check size={14}/> Saved</> : saving ? 'Saving...' : 'Save Changes'}
  </button>

  if (loading) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0e0c1a',color:'rgba(255,255,255,0.3)',fontSize:13,fontFamily:'Inter,sans-serif'}}>
      Loading...
    </div>
  )

  const SIDEBAR_GROUPS = [
    {
      label: 'PROFILE',
      items: [
        { id: 'overview' as Section, name: 'Overview', icon: <Home size={16}/> },
        { id: 'profile' as Section, name: 'Profile', icon: <User size={16}/> },
        { id: 'appearance' as Section, name: 'Appearance', icon: <Palette size={16}/> },
      ],
    },
    {
      label: 'CONTENT',
      items: [
        { id: 'links' as Section, name: 'Links', icon: <Link2 size={16}/> },
        { id: 'music' as Section, name: 'Music', icon: <Music size={16}/> },
        { id: 'widgets' as Section, name: 'Widgets', icon: <LayoutGrid size={16}/> },
      ],
    },
    {
      label: 'SOCIAL',
      items: [
        { id: 'analytics' as Section, name: 'Analytics', icon: <BarChart3 size={16}/> },
        { id: 'badges' as Section, name: 'Badges', icon: <Shield size={16}/> },
        { id: 'social' as Section, name: 'Social', icon: <Users size={16}/> },
      ],
    },
    {
      label: 'ACCOUNT',
      items: [
        { id: 'settings' as Section, name: 'Settings', icon: <Settings size={16}/> },
        { id: 'premium' as Section, name: 'Premium', icon: <Crown size={16}/> },
        { id: 'share' as Section, name: 'Share', icon: <Share2 size={16}/> },
        { id: 'themes' as Section, name: 'Themes', icon: <Sparkles size={16}/> },
      ],
    },
  ]

  return (
    <div className="db-wrap">
      {/* --- SIDEBAR --- */}
      <aside className="db-sidebar">
        <Link href="/" className="db-logo">
          <Image src="/needle-logo.png" alt="" width={24} height={24} style={{objectFit:'contain',filter:'drop-shadow(0 0 5px rgba(163,151,221,0.5))'}}/>
          <span>fentanyl<em>.best</em></span>
        </Link>

        <nav className="db-nav">
          {SIDEBAR_GROUPS.map(group => (
            <div key={group.label}>
              <div className="db-section-group-label">{group.label}</div>
              {group.items.map(item => (
                <button
                  key={item.id}
                  className={`db-ni ${section===item.id?'active':''}`}
                  onClick={()=>setSection(item.id)}
                  style={section===item.id ? {borderLeft:`3px solid var(--dba)`,background:'rgba(163,151,221,0.08)',color:'var(--dba)'} : {borderLeft:'3px solid transparent'}}
                >
                  <span className="db-ni-ico">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          ))}

          {/* Admin section */}
          {isAdmin && <>
            <div className="db-nav-divider"/>
            <button className={`db-ni ${isAdminSection?'active':''}`} onClick={()=>setAdminOpen(o=>!o)}>
              <span className="db-ni-ico"><Shield size={16}/></span>
              <span>Admin</span>
              <span className="db-admin-badge">ADMIN</span>
              <span className="db-ni-chev">{adminOpen?<ChevronUp size={12}/>:<ChevronDown size={12}/>}</span>
            </button>
            {adminOpen && (
              <div className="db-sub">
                {([
                  ['admin-invites',  'Invite Codes'],
                  ['admin-users',    `Users (${users.length})`],
                  ['admin-blacklist',`Blacklist (${blacklist.length})`],
                ] as [Section,string][]).map(([s,label])=>(
                  <button key={s} className={`db-si ${section===s?'active':''}`} onClick={()=>setSection(s)}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </>}
        </nav>

        <div className="db-bot">
          <p className="db-bot-hint">Have a question or need support?</p>
          <a href="#" className="db-bot-btn"><HelpCircle size={14}/> Help Center</a>
          <p className="db-bot-hint" style={{marginTop:12}}>Check out your page</p>
          <a href={`/${profile?.username}`} target="_blank" className="db-bot-btn"><ExternalLink size={13}/> My Page</a>
          <button className="db-share-btn" onClick={()=>{navigator.clipboard.writeText(`https://fentanyl.best/${profile?.username}`);flash('Link copied!')}}>
            <Share2 size={14}/> Share Your Profile
          </button>
          <div className="db-user">
            <div className="db-uav">
              {avatarUrl
                ? <img src={avatarUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}}/>
                : profile?.username?.[0]?.toUpperCase()}
            </div>
            <div className="db-uinfo">
              <div className="db-uname">{profile?.username}</div>
              <div className="db-uuid">UID {(profile?.id||'').slice(0,8).toUpperCase()}</div>
            </div>
            <button className="db-udots" title="Sign out" onClick={()=>{supabase.auth.signOut();router.push('/')}}>
              <LogOut size={14}/>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="db-sidebar-mobile">
        {([
          {s:'overview' as Section, icon:<Home size={14}/>},
          {s:'profile' as Section, icon:<User size={14}/>},
          {s:'appearance' as Section, icon:<Palette size={14}/>},
          {s:'links' as Section, icon:<Link2 size={14}/>},
          {s:'music' as Section, icon:<Music size={14}/>},
          {s:'social' as Section, icon:<Users size={14}/>},
          {s:'widgets' as Section, icon:<LayoutGrid size={14}/>},
          {s:'analytics' as Section, icon:<BarChart3 size={14}/>},
          {s:'themes' as Section, icon:<Sparkles size={14}/>},
          {s:'share' as Section, icon:<Share2 size={14}/>},
        ]).map(item=>(
          <button key={item.s} className={section===item.s?'active':''} onClick={()=>setSection(item.s)}>
            {item.icon}
            {item.s.charAt(0).toUpperCase()+item.s.slice(1)}
          </button>
        ))}
      </div>

      {/* --- MAIN --- */}
      <main className="db-main">
        {msg && <div className="db-flash">{msg}</div>}

        {/* -- OVERVIEW -- */}
        {section==='overview' && <>
          <h1 className="db-h1">Account Overview</h1>
          <div className="db-stat4">
            {[
              {label:'Total Views',  icon:<Eye size={16}/>,       val:String(profile?.view_count||0),  sub:'All-time total'},
              {label:'Links',        icon:<Link2 size={16}/>,     val:String(links.length),            sub:'Active on your page'},
              {label:'Profile Score',icon:<BarChart3 size={16}/>, val:String(Math.min(100,pct+links.length*5+((profile?.view_count||0)>10?20:0))), sub:'Out of 100'},
              {label:'Member Since', icon:<Calendar size={16}/>,  val:profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US',{month:'short',year:'numeric'}) : '--', sub:'Join date'},
            ].map(s=>(
              <div key={s.label} className="db-scard">
                <div className="db-scard-top"><span className="db-slabel">{s.label}</span><span className="db-sico">{s.icon}</span></div>
                <div className="db-sval">{s.val}</div>
                <div className="db-ssub">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="db-card" style={{marginTop:20}}>
            <div className="db-card-h">Profile Completion</div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginTop:14}}>
              <div className="db-prog-t"><div className="db-prog-f" style={{width:`${pct}%`}}/></div>
              <span style={{fontSize:12,color:'var(--dbm)',flexShrink:0}}>{pct}% completed</span>
            </div>
            {pct===100 && (
              <div className="db-complete-msg">
                <Check size={16} style={{color:'#4ade80'}}/>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:'#4ade80'}}>Your profile is complete!</div>
                  <div style={{fontSize:12,color:'var(--dbm)',marginTop:2}}>Discover more features to enhance your experience.</div>
                </div>
              </div>
            )}
            <div className="db-check-row">
              {checks.map(c=>(
                <div key={c.label} className={`db-cpill ${c.done?'done':''}`}>
                  <span className={`db-cico ${c.done?'done':''}`}>{c.done?<Check size={12}/>:'○'}</span>
                  {c.label}
                </div>
              ))}
            </div>
          </div>

          <h2 className="db-h2" style={{marginTop:24,marginBottom:14}}>Quick Links</h2>
          <div className="db-stat4">
            {[
              {label:'Edit Profile',   icon:<User size={16}/>,    cb:()=>setSection('profile')},
              {label:'Add Links',      icon:<Link2 size={16}/>,   cb:()=>setSection('links')},
              {label:'Customize',      icon:<Palette size={16}/>, cb:()=>setSection('appearance')},
              {label:'Browse Themes',  icon:<Sparkles size={16}/>,cb:()=>setSection('themes')},
            ].map(q=>(
              <button key={q.label} className="db-scard" onClick={q.cb} style={{cursor:'pointer',textAlign:'left',border:'none'}}>
                <div className="db-scard-top"><span className="db-slabel">{q.label}</span><span className="db-sico">{q.icon}</span></div>
                <div className="db-ssub" style={{marginTop:8}}>{q.label} &rarr;</div>
              </button>
            ))}
          </div>

          <h2 className="db-h2" style={{marginTop:24,marginBottom:14}}>Recent Activity</h2>
          <div className="db-card">
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px 0',color:'var(--dbf)',fontSize:13}}>
              <Info size={14} style={{marginRight:8}}/>
              No recent activity to display.
            </div>
          </div>
        </>}

        {/* -- PROFILE -- */}
        {section==='profile' && <>
          <h1 className="db-h1">Profile</h1>
          <p style={{fontSize:13,color:'var(--dbm)',marginBottom:24}}>Customize how others see your profile</p>

          {/* Identity */}
          <div className="db-section-divider"><span>IDENTITY</span></div>
          <div className="db-card" style={{marginBottom:14}}>
            <div className="db-sfield" style={{marginBottom:16}}>
              <label style={{display:'flex',alignItems:'center',gap:8}}>
                Cover Banner URL
                <button onClick={()=>setShowCoverPreview(v=>!v)} style={{background:'none',border:'none',color:'var(--dba)',cursor:'pointer',fontSize:12,fontWeight:500}}>
                  {showCoverPreview ? 'Hide Preview' : 'Preview'}
                </button>
              </label>
              <input className="db-sinput" value={coverBanner} onChange={e=>setCoverBanner(e.target.value)} placeholder="https://... (recommended 1200x400)"/>
            </div>
            {showCoverPreview && coverBanner && (
              <div style={{width:'100%',height:120,borderRadius:10,overflow:'hidden',marginBottom:16,background:'rgba(0,0,0,0.2)'}}>
                <img src={coverBanner} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              </div>
            )}
            <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:16}}>
              <div className="db-apreview" style={{width:64,height:64,borderRadius:'50%',overflow:'hidden',background:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                {avatarUrl?<img src={avatarUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}}/>:<User size={22} style={{opacity:0.4}}/>}
              </div>
              <div className="db-sfield" style={{flex:1}}>
                <label>Avatar URL</label>
                <input className="db-sinput" value={avatarUrl} onChange={e=>setAvatarUrl(e.target.value)} placeholder="https://..."/>
              </div>
            </div>
            <div className="db-sfield" style={{marginBottom:12}}>
              <label>Display Name</label>
              <input className="db-sinput" value={displayName} onChange={e=>setDisplayName(e.target.value)} maxLength={32}/>
            </div>
            <div className="db-sfield" style={{marginBottom:12}}>
              <label style={{display:'flex',alignItems:'center',gap:6}}>Username <span style={{fontSize:11,color:'var(--dbf)'}}>(Change in Settings)</span></label>
              <input className="db-sinput" value={profile?.username||''} readOnly style={{opacity:0.5,cursor:'not-allowed',background:'rgba(255,255,255,0.03)'}}/>
            </div>
            <div className="db-sfield" style={{marginBottom:12}}>
              <label>Tagline</label>
              <input className="db-sinput" value={tagline} onChange={e=>setTagline(e.target.value)} placeholder="A short catchy line..." maxLength={80}/>
              <span style={{fontSize:11,color:'var(--dbf)',textAlign:'right',marginTop:3,display:'block'}}>{tagline.length}/80</span>
            </div>
            <div className="db-sfield" style={{marginBottom:12}}>
              <label>Pronouns</label>
              <div style={{display:'flex',gap:8}}>
                <select className="db-sinput" value={['he/him','she/her','they/them','ze/zir',''].includes(pronouns)?pronouns:'custom'} onChange={e=>{
                  if(e.target.value==='custom') setPronouns('')
                  else setPronouns(e.target.value)
                }} style={{flex:1}}>
                  <option value="">Not set</option>
                  <option value="he/him">he/him</option>
                  <option value="she/her">she/her</option>
                  <option value="they/them">they/them</option>
                  <option value="ze/zir">ze/zir</option>
                  <option value="custom">Custom...</option>
                </select>
                {!['he/him','she/her','they/them','ze/zir',''].includes(pronouns) && (
                  <input className="db-sinput" value={pronouns} onChange={e=>setPronouns(e.target.value)} placeholder="Custom pronouns" style={{flex:1}}/>
                )}
              </div>
            </div>
            <div className="db-sfield">
              <label>Bio</label>
              <textarea className="db-sinput" value={bio} onChange={e=>setBio(e.target.value)} rows={3} maxLength={160} style={{resize:'none'}}/>
              <span style={{fontSize:11,color:'var(--dbf)',textAlign:'right',marginTop:3,display:'block'}}>{bio.length}/160</span>
            </div>
          </div>

          {/* Details */}
          <div className="db-section-divider"><span>DETAILS</span></div>
          <div className="db-card" style={{marginBottom:14}}>
            <div className="db-sfield" style={{marginBottom:12}}>
              <label style={{display:'flex',alignItems:'center',gap:6}}><MapPin size={13}/> Location</label>
              <input className="db-sinput" value={location} onChange={e=>setLocation(e.target.value)} placeholder="City, Country"/>
            </div>
            <div className="db-sfield" style={{marginBottom:12}}>
              <label style={{display:'flex',alignItems:'center',gap:6}}><Globe size={13}/> Website</label>
              <input className="db-sinput" value={website} onChange={e=>setWebsite(e.target.value)} placeholder="https://yoursite.com"/>
            </div>
            <div className="db-sfield" style={{marginBottom:12}}>
              <label>Birthday</label>
              <input className="db-sinput" type="date" value={birthday} onChange={e=>setBirthday(e.target.value)}/>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <button className={`db-toggle ${showAge?'on':''}`} onClick={()=>setShowAge(v=>!v)}>
                <span className="db-toggle-thumb"/>
              </button>
              <div>
                <span style={{fontSize:13,color:'var(--dbt)'}}>Show Age on Profile</span>
                <div style={{fontSize:11,color:'var(--dbf)'}}>Display your calculated age publicly</div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="db-section-divider"><span>STATUS</span></div>
          <div className="db-card" style={{marginBottom:14}}>
            <div className="db-sfield" style={{marginBottom:12}}>
              <label>Availability Status</label>
              <select className="db-sinput" value={availStatus} onChange={e=>setAvailStatus(e.target.value as Profile['availability_status'])}>
                {AVAIL_STATUSES.map(s=><option key={s||'none'} value={s}>{s?s.charAt(0).toUpperCase()+s.slice(1):'Hidden'}</option>)}
              </select>
            </div>
            <div className="db-sfield">
              <label>Current Status</label>
              <input className="db-sinput" value={currentStatus} onChange={e=>setCurrentStatus(e.target.value)} placeholder="What are you up to?" maxLength={60}/>
            </div>
          </div>

          {/* Profile Card Options */}
          <div className="db-section-divider"><span>PROFILE CARD OPTIONS</span></div>
          <div className="db-card" style={{marginBottom:14}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <button className={`db-toggle ${verified?'on':''}`} onClick={()=>setVerified(v=>!v)}>
                <span className="db-toggle-thumb"/>
              </button>
              <div>
                <span style={{fontSize:13,color:'var(--dbt)'}}>Verified Badge</span>
                <div style={{fontSize:11,color:'var(--dbf)'}}>Show a verified checkmark on your profile</div>
              </div>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Profile Layout</label>
              <div style={{display:'flex',gap:10}}>
                {LAYOUT_MODES.map(m=>(
                  <button key={m} className={`db-pill ${layoutMode===m?'active':''}`} onClick={()=>setLayoutMode(m)}
                    style={{padding:'12px 20px',flex:1,textAlign:'center'}}>
                    {m.charAt(0).toUpperCase()+m.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="db-toggle-row">
              <div className="db-toggle-info">
                <span className="db-toggle-label">Show view count</span>
                <span className="db-toggle-desc">Display view count on your profile</span>
              </div>
              <button className={`db-toggle ${showViewCount?'on':''}`} onClick={()=>setShowViewCount(v=>!v)}>
                <span className="db-toggle-thumb"/>
              </button>
            </div>
            <div className="db-toggle-row">
              <div className="db-toggle-info">
                <span className="db-toggle-label">Show join date</span>
                <span className="db-toggle-desc">Display when you joined on your profile</span>
              </div>
              <button className={`db-toggle ${showJoinDate?'on':''}`} onClick={()=>setShowJoinDate(v=>!v)}>
                <span className="db-toggle-thumb"/>
              </button>
            </div>
          </div>

          {/* Animations */}
          <div className="db-section-divider"><span>ANIMATIONS</span></div>
          <div className="db-card" style={{marginBottom:14}}>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Page Animation</label>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {ANIMATIONS.map(a=>(
                  <button key={a} className={`db-pill ${animationType===a?'active':''}`} onClick={()=>setAnimationType(a)}>
                    {a==='none'?'None':a.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>
            <div className="db-sfield" style={{marginBottom:16}}>
              <label>Custom Cursor URL</label>
              <input className="db-sinput" value={customCursor} onChange={e=>setCustomCursor(e.target.value)} placeholder="https://... (.png or .cur, leave empty for default)"/>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <button className={`db-toggle ${textShadow?'on':''}`} onClick={()=>setTextShadow(v=>!v)}>
                <span className="db-toggle-thumb"/>
              </button>
              <span style={{fontSize:13,color:'var(--dbt)'}}>Text Shadow</span>
            </div>
          </div>
          {saveBtn}
        </>}

        {/* -- APPEARANCE -- */}
        {section==='appearance' && <>
          <h1 className="db-h1">Appearance</h1>
          <p style={{fontSize:13,color:'var(--dbm)',marginBottom:24}}>Customize the look and feel of your profile</p>

          {/* Background */}
          <div className="db-section-divider"><span>BACKGROUND</span></div>
          <div className="db-card" style={{marginBottom:14}}>
            <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
              {(['color','gradient','image','animated'] as Profile['background_type'][]).map(t=>(
                <button key={t} className={`db-pill ${bgType===t?'active':''}`} onClick={()=>setBgType(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
              ))}
            </div>
            {bgType==='animated' ? (
              <>
                <p style={{fontSize:12,color:'var(--dbm)',marginBottom:14}}>Choose an animated background style for your profile.</p>
                <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
                  {(['mesh','aurora','particles','waves'] as const).map(s=>(
                    <button key={s} className={`db-pill ${animatedBgStyle===s?'active':''}`} onClick={()=>setAnimatedBgStyle(s)}
                      style={{padding:'16px 10px',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
                      <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg, ${accent}40, ${accent}15)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                        {s==='mesh' && <LayoutGrid size={16} style={{color:accent}}/>}
                        {s==='aurora' && <Sparkles size={16} style={{color:accent}}/>}
                        {s==='particles' && <Sparkle size={16} weight="fill" style={{color:accent}}/>}
                        {s==='waves' && <Lightning size={16} weight="fill" style={{color:accent}}/>}
                      </div>
                      {s.charAt(0).toUpperCase()+s.slice(1)}
                    </button>
                  ))}
                </div>
              </>
            ) : bgType==='gradient' ? (
              <>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
                  <div className="db-sfield">
                    <label>From</label>
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      <input type="color" value={gradientFrom} onChange={e=>setGradientFrom(e.target.value)} className="db-cinput"/>
                      <input className="db-sinput" value={gradientFrom} onChange={e=>setGradientFrom(e.target.value)} style={{flex:1}}/>
                    </div>
                  </div>
                  <div className="db-sfield">
                    <label>To</label>
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      <input type="color" value={gradientTo} onChange={e=>setGradientTo(e.target.value)} className="db-cinput"/>
                      <input className="db-sinput" value={gradientTo} onChange={e=>setGradientTo(e.target.value)} style={{flex:1}}/>
                    </div>
                  </div>
                </div>
                <div className="db-sfield" style={{marginBottom:12}}>
                  <label>Direction</label>
                  <select className="db-sinput" value={gradientDir} onChange={e=>setGradientDir(e.target.value)}>
                    <option value="45">45deg</option>
                    <option value="90">90deg</option>
                    <option value="135">135deg (default)</option>
                    <option value="180">180deg</option>
                  </select>
                </div>
                <div style={{height:40,borderRadius:8,background:`linear-gradient(${gradientDir}deg, ${gradientFrom}, ${gradientTo})`,border:'1px solid rgba(255,255,255,0.06)'}}/>
              </>
            ) : bgType==='image' ? (
              <>
                <div className="db-sfield" style={{marginBottom:12}}>
                  <label>Image URL</label>
                  <input className="db-sinput" value={bgValue} onChange={e=>setBgValue(e.target.value)} placeholder="https://..."/>
                </div>
                <div className="db-sfield" style={{marginBottom:12}}>
                  <label>Background Blur ({blurAmount}px)</label>
                  <input type="range" className="db-range" min={0} max={20} value={blurAmount} onChange={e=>setBlurAmount(Number(e.target.value))}/>
                </div>
                <div className="db-sfield">
                  <label>Overlay Opacity ({overlayOpacity}%)</label>
                  <input type="range" className="db-range" min={0} max={80} value={overlayOpacity} onChange={e=>setOverlayOpacity(Number(e.target.value))}/>
                </div>
              </>
            ) : (
              <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',marginBottom:12}}>
                {BG_PRESETS.map(c=><button key={c} className={`db-swatch ${bgValue===c?'sel':''}`} onClick={()=>setBgValue(c)} style={{background:c}}/>)}
                <input type="color" value={bgValue.startsWith('#')?bgValue:'#07060f'} onChange={e=>setBgValue(e.target.value)} className="db-cinput"/>
              </div>
            )}
          </div>

          {/* Accent Color */}
          <div className="db-section-divider"><span>ACCENT COLOR</span></div>
          <div className="db-card" style={{marginBottom:14}}>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',marginBottom:12}}>
              {ACCENT_PRESETS.map(c=><button key={c} className={`db-swatch ${accent===c?'sel':''}`} onClick={()=>setAccent(c)} style={{background:c}}/>)}
              <input type="color" value={accent} onChange={e=>setAccent(e.target.value)} className="db-cinput"/>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:14}}>
              <div style={{width:32,height:32,borderRadius:8,background:accent,border:'2px solid rgba(255,255,255,0.1)'}}/>
              <span style={{fontSize:16,fontWeight:700,color:accent,fontFamily:'inherit'}}>Aa</span>
              <div style={{padding:'4px 14px',borderRadius:6,background:accent,fontSize:12,fontWeight:600,color:'#000'}}>Button</div>
              <span style={{fontSize:12,color:'var(--dbm)'}}>{accent}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="db-section-divider"><span>BUTTONS</span></div>
          <div className="db-card" style={{marginBottom:14}}>
            <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Style</label>
            <div className="btn-preview-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:16}}>
              {BTN_STYLES.map(s=>(
                <button key={s} className={`db-pill ${btnStyle===s?'active':''}`} onClick={()=>setBtnStyle(s)}
                  style={{padding:'10px 8px',textAlign:'center'}}>
                  {s.charAt(0).toUpperCase()+s.slice(1).replace('-',' ')}
                </button>
              ))}
            </div>
            <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Shape</label>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16}}>
              {BTN_SHAPES.map(s=>(
                <button key={s} className={`db-pill ${btnShape===s?'active':''}`} onClick={()=>setBtnShape(s)}>
                  {s.charAt(0).toUpperCase()+s.slice(1)}
                </button>
              ))}
            </div>
            <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Width</label>
            <div style={{display:'flex',gap:8,marginBottom:16}}>
              {(['auto','full'] as const).map(w=>(
                <button key={w} className={`db-pill ${buttonWidth===w?'active':''}`} onClick={()=>setButtonWidth(w)} style={{flex:1,textAlign:'center'}}>
                  {w==='auto'?'Auto':'Full Width'}
                </button>
              ))}
            </div>
            <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Hover Effect</label>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {HOVER_EFFECTS.map(s=>(
                <button key={s} className={`db-pill ${hoverEffect===s?'active':''}`} onClick={()=>setHoverEffect(s)}>
                  {s==='none'?'None':s.charAt(0).toUpperCase()+s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="db-section-divider"><span>TYPOGRAPHY</span></div>
          <div className="db-card" style={{marginBottom:14}}>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {FONTS.map(f=>(
                <button key={f} className={`db-pill ${font===f?'active':''}`} onClick={()=>setFont(f)}
                  style={{fontFamily:FONT_FAMILY_MAP[f]||f}}>
                  {f.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Card */}
          <div className="db-section-divider"><span>PROFILE CARD</span></div>
          <div className="db-card" style={{marginBottom:14}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <button className={`db-toggle ${glassmorphism?'on':''}`} onClick={()=>setGlassmorphism(v=>!v)}>
                <span className="db-toggle-thumb"/>
              </button>
              <span style={{fontSize:13,color:'var(--dbt)'}}>Glassmorphism</span>
            </div>
            {glassmorphism && (
              <div className="db-sfield" style={{marginBottom:14}}>
                <label>Card Blur ({blurAmount}px)</label>
                <input type="range" className="db-range" min={0} max={20} value={blurAmount} onChange={e=>setBlurAmount(Number(e.target.value))}/>
              </div>
            )}
            <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Card Border</label>
            <div style={{display:'flex',gap:8}}>
              {(['none','subtle','accent','glow'] as const).map(b=>(
                <button key={b} className={`db-pill ${cardBorder===b?'active':''}`} onClick={()=>setCardBorder(b)} style={{flex:1,textAlign:'center'}}>
                  {b.charAt(0).toUpperCase()+b.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Avatar */}
          <div className="db-section-divider"><span>AVATAR</span></div>
          <div className="db-card" style={{marginBottom:14}}>
            <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Shape</label>
            <div style={{display:'flex',gap:12,marginBottom:16}}>
              {AVATAR_SHAPES.map(s=>(
                <button key={s} className={`db-pill ${avatarShape===s?'active':''}`} onClick={()=>setAvatarShape(s)}
                  style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,padding:'12px 18px'}}>
                  <div style={{
                    width:28,height:28,background:'var(--dba)',opacity:0.5,
                    borderRadius:s==='circle'?'50%':s==='squircle'?'30%':'4px'
                  }}/>
                  {s.charAt(0).toUpperCase()+s.slice(1)}
                </button>
              ))}
            </div>
            <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Border Type</label>
            <div style={{display:'flex',gap:8,marginBottom:16}}>
              {(['none','solid','glow','gradient'] as const).map(b=>(
                <button key={b} className={`db-pill ${avatarBorderType===b?'active':''}`} onClick={()=>setAvatarBorderType(b)} style={{flex:1,textAlign:'center'}}>
                  {b.charAt(0).toUpperCase()+b.slice(1)}
                </button>
              ))}
            </div>
            <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Size</label>
            <div style={{display:'flex',gap:8,marginBottom:12}}>
              {(['small','medium','large'] as const).map(s=>(
                <button key={s} className={`db-pill ${avatarSize===s?'active':''}`} onClick={()=>setAvatarSize(s)} style={{flex:1,textAlign:'center'}}>
                  {s.charAt(0).toUpperCase()+s.slice(1)}
                </button>
              ))}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <button className={`db-toggle ${avatarGlow?'on':''}`} onClick={()=>setAvatarGlow(v=>!v)}>
                <span className="db-toggle-thumb"/>
              </button>
              <span style={{fontSize:13,color:'var(--dbt)'}}>Glow Effect</span>
            </div>
          </div>
          {saveBtn}
        </>}

        {/* -- LINKS -- */}
        {section==='links' && <>
          <h1 className="db-h1">Links</h1>
          <p style={{fontSize:13,color:'var(--dbm)',marginBottom:24}}>Add and manage links on your profile page. Drag to reorder.</p>
          <div style={{display:'flex',gap:10,marginBottom:16}}>
            <button className="db-cta-btn" onClick={addLink} style={{margin:0}}><Plus size={14}/> Add Link</button>
            <button className="db-outline-btn" onClick={addSectionHeader}><Plus size={14}/> Add Section</button>
          </div>
          <div className="db-card">
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {links.map((lnk,idx)=>(
                lnk.section === 'header' ? (
                  <div key={lnk.id} className="db-lrow" style={{borderStyle:'dashed',opacity:lnk.visible===false?0.4:1}}>
                    <GripVertical size={16} style={{color:'var(--dbf)',flexShrink:0,cursor:'grab'}}/>
                    <div style={{display:'flex',flexDirection:'column',gap:2}}>
                      <button onClick={()=>moveLink(idx,-1)} style={{background:'none',border:'none',color:'var(--dbf)',cursor:'pointer',fontSize:10,lineHeight:1}}><ArrowUp size={12}/></button>
                      <button onClick={()=>moveLink(idx,1)} style={{background:'none',border:'none',color:'var(--dbf)',cursor:'pointer',fontSize:10,lineHeight:1}}><ArrowDown size={12}/></button>
                    </div>
                    <span style={{fontSize:11,color:'var(--dbf)',textTransform:'uppercase',letterSpacing:1,fontWeight:600}}>Section</span>
                    <input value={lnk.label} onChange={e=>updateLink(lnk.id,'label',e.target.value)} placeholder="Section label" className="db-linput db-llabel" style={{flex:1}}/>
                    <button onClick={()=>updateLink(lnk.id,'visible',lnk.visible===false?true:false)}
                      style={{background:'none',border:'none',cursor:'pointer',color:lnk.visible===false?'var(--dbf)':'var(--dba)',fontSize:14}} title="Toggle visibility">
                      {lnk.visible===false?<EyeOff size={14}/>:<Eye size={14}/>}
                    </button>
                    <button onClick={()=>removeLink(lnk.id)} className="db-ldel"><Trash2 size={14}/></button>
                  </div>
                ) : (
                  <div key={lnk.id} className="db-lrow" style={{opacity:lnk.visible===false?0.4:1}}>
                    <GripVertical size={16} style={{color:'var(--dbf)',flexShrink:0,cursor:'grab'}}/>
                    <div style={{display:'flex',flexDirection:'column',gap:2}}>
                      <button onClick={()=>moveLink(idx,-1)} style={{background:'none',border:'none',color:'var(--dbf)',cursor:'pointer',fontSize:10,lineHeight:1}}><ArrowUp size={12}/></button>
                      <button onClick={()=>moveLink(idx,1)} style={{background:'none',border:'none',color:'var(--dbf)',cursor:'pointer',fontSize:10,lineHeight:1}}><ArrowDown size={12}/></button>
                    </div>
                    <span style={{display:'flex',alignItems:'center',color:'var(--dbm)',flexShrink:0}}>{SOCIAL_ICON_MAP[lnk.icon] || <Link2 size={16}/>}</span>
                    <select value={lnk.icon} onChange={e=>updateLink(lnk.id,'icon',e.target.value)} className="db-lsel">
                      {SOCIAL_ICONS.map(k=><option key={k} value={k}>{k}</option>)}
                    </select>
                    <input value={lnk.label} onChange={e=>updateLink(lnk.id,'label',e.target.value)} placeholder="Label" className="db-linput db-llabel"/>
                    <input value={lnk.url} onChange={e=>updateLink(lnk.id,'url',e.target.value)} placeholder="https://..." className="db-linput"/>
                    <input type="color" value={lnk.color||accent} onChange={e=>updateLink(lnk.id,'color',e.target.value)} className="db-cinput" title="Link color"/>
                    {(lnk.clicks||0) > 0 && (
                      <span style={{fontSize:11,color:'var(--dbm)',background:'rgba(255,255,255,0.06)',padding:'2px 8px',borderRadius:10,flexShrink:0}}>{lnk.clicks} clicks</span>
                    )}
                    <button onClick={()=>updateLink(lnk.id,'visible',lnk.visible===false?true:false)}
                      style={{background:'none',border:'none',cursor:'pointer',color:lnk.visible===false?'var(--dbf)':'var(--dba)',fontSize:14}} title="Toggle visibility">
                      {lnk.visible===false?<EyeOff size={14}/>:<Eye size={14}/>}
                    </button>
                    <button onClick={()=>removeLink(lnk.id)} className="db-ldel"><Trash2 size={14}/></button>
                  </div>
                )
              ))}
              {!links.length && <p style={{textAlign:'center',color:'var(--dbf)',padding:'24px 0',fontSize:13}}>No links yet. Add your first link above.</p>}
            </div>
            <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontSize:12,color:'var(--dbf)'}}>{links.length} link{links.length!==1?'s':''} total</span>
              <span style={{fontSize:12,color:'var(--dbf)'}}>{links.reduce((a,l)=>a+(l.clicks||0),0)} total clicks</span>
            </div>
          </div>
          {saveBtn}
        </>}

        {/* -- MUSIC -- */}
        {section==='music' && <>
          <h1 className="db-h1">Music Player</h1>
          <p style={{fontSize:13,color:'var(--dbm)',marginBottom:24}}>Add a music player to your profile</p>

          <div className="db-card" style={{marginBottom:14}}>
            <div className="db-card-h" style={{marginBottom:14}}>Platform</div>
            <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
              {([
                {type: 'spotify' as Profile['music_type'], icon: <SpotifyLogo size={16} weight="fill"/>, label: 'Spotify'},
                {type: 'youtube' as Profile['music_type'], icon: <YoutubeLogo size={16} weight="fill"/>, label: 'YouTube'},
                {type: 'soundcloud' as Profile['music_type'], icon: <SoundcloudLogo size={16} weight="fill"/>, label: 'SoundCloud'},
                {type: 'apple-music' as Profile['music_type'], icon: <AppleLogo size={16} weight="fill"/>, label: 'Apple Music'},
                {type: null as Profile['music_type'], icon: null, label: 'None'},
              ]).map(t=>(
                <button key={String(t.type)} className={`db-pill ${musicType===t.type?'active':''}`} onClick={()=>setMusicType(t.type)}
                  style={{display:'flex',alignItems:'center',gap:6}}>
                  {t.icon}{t.label}
                </button>
              ))}
            </div>
            {musicType && (
              <div className="db-sfield">
                <label>Music URL</label>
                <input className="db-sinput" value={musicUrl} onChange={e=>setMusicUrl(e.target.value)}
                  placeholder={musicType==='spotify'?'https://open.spotify.com/track/...':musicType==='youtube'?'https://youtube.com/watch?v=...':musicType==='apple-music'?'https://music.apple.com/...':'https://soundcloud.com/...'}/>
              </div>
            )}
            {musicType === 'spotify' && musicUrl && musicUrl.includes('spotify.com') && (
              <div style={{marginTop:12}}>
                <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:8,display:'block'}}>Preview</label>
                <iframe src={`https://open.spotify.com/embed/track/${musicUrl.match(/track\/([a-zA-Z0-9]+)/)?.[1]}?utm_source=generator`}
                  width="100%" height={80} frameBorder="0" allow="autoplay; clipboard-write; encrypted-media" style={{borderRadius:12}} loading="lazy"/>
              </div>
            )}
          </div>

          <div className="db-card" style={{marginBottom:14}}>
            <div className="db-card-h" style={{marginBottom:14}}>Player Style</div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:14}}>
              {PLAYER_STYLES.map(s=>(
                <button key={s} className={`db-pill ${playerStyle===s?'active':''}`} onClick={()=>setPlayerStyle(s)}>
                  {s.charAt(0).toUpperCase()+s.slice(1)}
                </button>
              ))}
            </div>
            <div style={{display:'flex',gap:20,flexWrap:'wrap',marginBottom:14}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <button className={`db-toggle ${musicAutoplay?'on':''}`} onClick={()=>setMusicAutoplay(v=>!v)}>
                  <span className="db-toggle-thumb"/>
                </button>
                <span style={{fontSize:13,color:'var(--dbt)'}}>Autoplay</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <button className={`db-toggle ${musicLoop?'on':''}`} onClick={()=>setMusicLoop(v=>!v)}>
                  <span className="db-toggle-thumb"/>
                </button>
                <span style={{fontSize:13,color:'var(--dbt)'}}>Loop</span>
              </div>
            </div>
            <div className="db-sfield">
              <label>Volume ({musicVolume}%)</label>
              <input type="range" className="db-range" min={0} max={100} value={musicVolume} onChange={e=>setMusicVolume(Number(e.target.value))}/>
            </div>
          </div>
          {saveBtn}
        </>}

        {/* -- SOCIAL -- */}
        {section==='social' && <>
          <h1 className="db-h1">Social Integrations</h1>
          <p style={{fontSize:13,color:'var(--dbm)',marginBottom:24}}>Connect your social accounts to display on your profile</p>

          {/* Discord */}
          <div className="db-social-card">
            <div className="db-social-icon-wrap" style={{background:'rgba(88,101,242,0.15)'}}>
              <DiscordLogo size={24} weight="fill" style={{color:'#5865F2'}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:600,color:'#fff',marginBottom:4}}>Discord</div>
              <p style={{fontSize:12,color:'var(--dbm)',marginBottom:10}}>Show member count on profile</p>
              <div className="db-sfield">
                <label>Server ID</label>
                <input className="db-sinput" value={discordWidget} onChange={e=>setDiscordWidget(e.target.value)} placeholder="123456789012345678"/>
              </div>
            </div>
            <button className={`db-toggle ${discordEnabled?'on':''}`} onClick={()=>setDiscordEnabled(v=>!v)}>
              <span className="db-toggle-thumb"/>
            </button>
          </div>

          {/* Spotify */}
          <div className="db-social-card">
            <div className="db-social-icon-wrap" style={{background:'rgba(29,185,84,0.15)'}}>
              <SpotifyLogo size={24} weight="fill" style={{color:'#1db954'}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:600,color:'#fff',marginBottom:4,display:'flex',alignItems:'center',gap:8}}>
                Spotify
                <span style={{fontSize:10,padding:'2px 8px',borderRadius:6,background:'rgba(255,255,255,0.08)',color:'var(--dbm)',fontWeight:500}}>Coming Soon</span>
              </div>
              <p style={{fontSize:12,color:'var(--dbm)',marginBottom:10}}>Show &quot;Now Playing&quot; widget on your profile</p>
              <button className="db-outline-btn" style={{opacity:0.5,cursor:'default',display:'flex',alignItems:'center',gap:6}}>
                <SpotifyLogo size={14} weight="fill"/> Connect Spotify
              </button>
            </div>
            <button className={`db-toggle ${spotifyNP?'on':''}`} onClick={()=>setSpotifyNP(v=>!v)}>
              <span className="db-toggle-thumb"/>
            </button>
          </div>

          {/* Twitch */}
          <div className="db-social-card">
            <div className="db-social-icon-wrap" style={{background:'rgba(145,70,255,0.15)'}}>
              <TwitchLogo size={24} weight="fill" style={{color:'#9146ff'}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:600,color:'#fff',marginBottom:4}}>Twitch</div>
              <p style={{fontSize:12,color:'var(--dbm)',marginBottom:10}}>Show live status on your profile</p>
              <div className="db-sfield">
                <label>Twitch Username</label>
                <input className="db-sinput" value={twitchUser} onChange={e=>setTwitchUser(e.target.value)} placeholder="yourtwitch"/>
              </div>
            </div>
            <button className={`db-toggle ${twitchEnabled?'on':''}`} onClick={()=>setTwitchEnabled(v=>!v)}>
              <span className="db-toggle-thumb"/>
            </button>
          </div>

          {/* GitHub */}
          <div className="db-social-card">
            <div className="db-social-icon-wrap" style={{background:'rgba(255,255,255,0.08)'}}>
              <GithubLogo size={24} weight="fill" style={{color:'#fff'}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:600,color:'#fff',marginBottom:4}}>GitHub</div>
              <p style={{fontSize:12,color:'var(--dbm)',marginBottom:10}}>Display your contribution graph</p>
              <div className="db-sfield">
                <label>GitHub Username</label>
                <input className="db-sinput" value={githubUser} onChange={e=>setGithubUser(e.target.value)} placeholder="yourgithub"/>
              </div>
            </div>
            <button className={`db-toggle ${githubEnabled?'on':''}`} onClick={()=>setGithubEnabled(v=>!v)}>
              <span className="db-toggle-thumb"/>
            </button>
          </div>

          {/* Last.fm */}
          <div className="db-social-card">
            <div className="db-social-icon-wrap" style={{background:'rgba(185,0,0,0.15)'}}>
              <MusicNote size={24} weight="fill" style={{color:'#b90000'}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:600,color:'#fff',marginBottom:4}}>Last.fm</div>
              <p style={{fontSize:12,color:'var(--dbm)',marginBottom:10}}>Show your recent scrobbles</p>
              <div className="db-sfield">
                <label>Last.fm Username</label>
                <input className="db-sinput" value={lastfmUser} onChange={e=>setLastfmUser(e.target.value)} placeholder="yourlastfm"/>
              </div>
            </div>
            <button className={`db-toggle ${lastfmEnabled?'on':''}`} onClick={()=>setLastfmEnabled(v=>!v)}>
              <span className="db-toggle-thumb"/>
            </button>
          </div>

          {saveBtn}
        </>}

        {/* -- WIDGETS -- */}
        {section==='widgets' && <>
          <h1 className="db-h1">Widgets</h1>
          <p style={{fontSize:13,color:'var(--dbm)',marginBottom:24}}>Add interactive widgets to your profile page</p>

          {/* Availability Status (always shown, not collapsible) */}
          <div className="db-card" style={{marginBottom:14}}>
            <div className="db-card-h" style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}><Lightning size={18}/> Availability Status</div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
              {AVAIL_STATUSES.map(s=>(
                <button key={s||'none'} className={`db-pill ${availStatus===s?'active':''}`} onClick={()=>setAvailStatus(s)}>
                  {s ? <><span className={`avail-dot ${s}`} style={{marginRight:6}}/>{s.charAt(0).toUpperCase()+s.slice(1)}</> : 'Hidden'}
                </button>
              ))}
            </div>
            <div className="db-sfield">
              <label>Status Text</label>
              <input className="db-sinput" value={currentStatus} onChange={e=>setCurrentStatus(e.target.value)} placeholder="What are you up to?" maxLength={60}/>
            </div>
          </div>

          {/* Announcement Banner */}
          <div className="db-widget-card-v3">
            <div className="db-widget-header-v3" onClick={()=>setAnnouncementEnabled(v=>!v)}>
              <div className="db-widget-header-left">
                <div className="db-widget-icon"><Megaphone size={16}/></div>
                <span style={{fontSize:15,fontWeight:600,color:'#fff'}}>Announcement Banner</span>
              </div>
              <button className={`db-toggle ${announcementEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setAnnouncementEnabled(v=>!v)}}>
                <span className="db-toggle-thumb"/>
              </button>
            </div>
            {announcementEnabled && (
              <div className="db-widget-body-v3">
                <div className="db-sfield" style={{marginBottom:14}}>
                  <label>Announcement Text</label>
                  <input className="db-sinput" value={announcement} onChange={e=>setAnnouncement(e.target.value)} placeholder="New merch dropping soon!" maxLength={120}/>
                </div>
                <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Color</label>
                <div style={{display:'flex',gap:8,marginBottom:14}}>
                  {[
                    {id:'purple',color:'#a78bfa'},{id:'blue',color:'#60a5fa'},{id:'green',color:'#4ade80'},
                    {id:'red',color:'#f87171'},{id:'orange',color:'#fb923c'},{id:'pink',color:'#f472b6'},
                  ].map(c=>(
                    <button key={c.id} className={`db-swatch ${announcementColor===c.id?'sel':''}`} onClick={()=>setAnnouncementColor(c.id)} style={{background:c.color}}/>
                  ))}
                </div>
                <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Icon</label>
                <div style={{display:'flex',gap:8}}>
                  {[
                    {id:'info',icon:<Info size={16}/>},{id:'warning',icon:<AlertTriangle size={16}/>},
                    {id:'star',icon:<StarIcon size={16}/>},{id:'megaphone',icon:<Megaphone size={16}/>},
                  ].map(i=>(
                    <button key={i.id} className={`db-pill ${announcementIcon===i.id?'active':''}`} onClick={()=>setAnnouncementIcon(i.id)}
                      style={{display:'flex',alignItems:'center',gap:6}}>
                      {i.icon} {i.id.charAt(0).toUpperCase()+i.id.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Countdown Timer */}
          <div className="db-widget-card-v3">
            <div className="db-widget-header-v3" onClick={()=>setCountdownEnabled(v=>!v)}>
              <div className="db-widget-header-left">
                <div className="db-widget-icon"><Timer size={16}/></div>
                <span style={{fontSize:15,fontWeight:600,color:'#fff'}}>Countdown Timer</span>
              </div>
              <button className={`db-toggle ${countdownEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setCountdownEnabled(v=>!v)}}>
                <span className="db-toggle-thumb"/>
              </button>
            </div>
            {countdownEnabled && (
              <div className="db-widget-body-v3">
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
                  <div className="db-sfield">
                    <label>Label</label>
                    <input className="db-sinput" value={countdownLabel} onChange={e=>setCountdownLabel(e.target.value)} placeholder="Launch day"/>
                  </div>
                  <div className="db-sfield">
                    <label>Date & Time</label>
                    <input className="db-sinput" type="datetime-local" value={countdownDate} onChange={e=>setCountdownDate(e.target.value)}/>
                  </div>
                </div>
                <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Style</label>
                <div style={{display:'flex',gap:8}}>
                  {(['minimal','card','glowing'] as const).map(s=>(
                    <button key={s} className={`db-pill ${countdownStyle===s?'active':''}`} onClick={()=>setCountdownStyle(s)} style={{flex:1,textAlign:'center'}}>
                      {s.charAt(0).toUpperCase()+s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Currently Playing */}
          <div className="db-widget-card-v3">
            <div className="db-widget-header-v3" onClick={()=>setCurrentlyPlayingEnabled(v=>!v)}>
              <div className="db-widget-header-left">
                <div className="db-widget-icon"><MusicNote size={16} weight="fill"/></div>
                <span style={{fontSize:15,fontWeight:600,color:'#fff'}}>Currently Playing</span>
              </div>
              <button className={`db-toggle ${currentlyPlayingEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setCurrentlyPlayingEnabled(v=>!v)}}>
                <span className="db-toggle-thumb"/>
              </button>
            </div>
            {currentlyPlayingEnabled && (
              <div className="db-widget-body-v3">
                <div className="db-sfield" style={{marginBottom:12}}>
                  <label>What are you playing/listening to?</label>
                  <input className="db-sinput" value={currentlyPlaying} onChange={e=>setCurrentlyPlaying(e.target.value)} placeholder="Valorant, Minecraft, etc." maxLength={60}/>
                </div>
                {currentlyPlaying && (
                  <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:20,background:'rgba(255,255,255,0.06)',fontSize:13,color:'var(--dbt)'}}>
                    <GameController size={14} weight="fill" style={{color:'var(--dba)'}}/> Playing {currentlyPlaying}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Custom Text Block */}
          <div className="db-widget-card-v3">
            <div className="db-widget-header-v3" onClick={()=>setCustomTextEnabled(v=>!v)}>
              <div className="db-widget-header-left">
                <div className="db-widget-icon"><ChatText size={16}/></div>
                <span style={{fontSize:15,fontWeight:600,color:'#fff'}}>Custom Text Block</span>
              </div>
              <button className={`db-toggle ${customTextEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setCustomTextEnabled(v=>!v)}}>
                <span className="db-toggle-thumb"/>
              </button>
            </div>
            {customTextEnabled && (
              <div className="db-widget-body-v3">
                <div className="db-sfield" style={{marginBottom:12}}>
                  <label>Text Content</label>
                  <textarea className="db-sinput" value={customText} onChange={e=>setCustomText(e.target.value)} rows={3} style={{resize:'none'}} placeholder="Write anything..." maxLength={500}/>
                  <span style={{fontSize:11,color:'var(--dbf)',textAlign:'right',marginTop:3,display:'block'}}>{customText.length}/500</span>
                </div>
                <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Alignment</label>
                <div style={{display:'flex',gap:8}}>
                  {(['left','center','right'] as const).map(a=>(
                    <button key={a} className={`db-pill ${customTextAlign===a?'active':''}`} onClick={()=>setCustomTextAlign(a)} style={{flex:1,textAlign:'center'}}>
                      {a.charAt(0).toUpperCase()+a.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Photo Gallery */}
          <div className="db-widget-card-v3">
            <div className="db-widget-header-v3" onClick={()=>setPhotoGalleryEnabled(v=>!v)}>
              <div className="db-widget-header-left">
                <div className="db-widget-icon"><ImageIcon size={16}/></div>
                <span style={{fontSize:15,fontWeight:600,color:'#fff'}}>Photo Gallery</span>
              </div>
              <button className={`db-toggle ${photoGalleryEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setPhotoGalleryEnabled(v=>!v)}}>
                <span className="db-toggle-thumb"/>
              </button>
            </div>
            {photoGalleryEnabled && (
              <div className="db-widget-body-v3">
                <p style={{fontSize:12,color:'var(--dbm)',marginBottom:12}}>Max 6 photos</p>
                <div className="db-gallery-grid" style={{marginBottom:12}}>
                  {photoGallery.map((url,i)=>(
                    <div key={i} className="db-gallery-item">
                      <img src={url} alt=""/>
                      <button onClick={()=>removePhoto(i)} style={{position:'absolute',top:4,right:4,background:'rgba(0,0,0,0.6)',border:'none',color:'#fff',width:20,height:20,borderRadius:'50%',cursor:'pointer',fontSize:12,display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <X size={12}/>
                      </button>
                    </div>
                  ))}
                  {photoGallery.length < 6 && (
                    <div className="db-gallery-add" onClick={()=>document.getElementById('photo-url-input')?.focus()}>
                      <Plus size={18}/>
                    </div>
                  )}
                </div>
                {photoGallery.length < 6 && (
                  <div style={{display:'flex',gap:8}}>
                    <input id="photo-url-input" className="db-sinput" value={newPhotoUrl} onChange={e=>setNewPhotoUrl(e.target.value)} placeholder="Image URL..." onKeyDown={e=>e.key==='Enter'&&addPhoto()}/>
                    <button className="db-outline-btn" onClick={addPhoto} style={{flexShrink:0}}>Add</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {saveBtn}
        </>}

        {/* -- ANALYTICS -- */}
        {section==='analytics' && <>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}><BarChart3 size={20}/><h1 className="db-h1" style={{marginBottom:0}}>Analytics</h1></div>
          <p style={{fontSize:13,color:'var(--dbm)',marginBottom:24}}>Track your profile performance and engagement.</p>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{fontSize:15,fontWeight:600,color:'var(--dbt)'}}>Time Range</span>
              <span className="db-pill-badge">Updated just now</span>
            </div>
            <div className="db-date-btn"><Calendar size={13}/> Last 14 days</div>
          </div>
          <div className="db-stat4" style={{marginBottom:20}}>
            {[
              {label:'Total Views',        icon:<Eye size={14}/>,        val:String(profile?.view_count||0), sub:'All time'},
              {label:'Today',              icon:<BarChart3 size={14}/>,  val:'0',    sub:'Views today'},
              {label:'This Week',          icon:<BarChart3 size={14}/>,  val:'0',    sub:'Views this week'},
              {label:'This Month',         icon:<BarChart3 size={14}/>,  val:'0',    sub:'Views this month'},
              {label:'Total Link Clicks',  icon:<Link2 size={14}/>,     val:String(links.reduce((a,l)=>a+(l.clicks||0),0)), sub:'All time'},
              {label:'Click Rate',         icon:<BarChart3 size={14}/>,  val:((profile?.view_count||0)>0?((links.reduce((a,l)=>a+(l.clicks||0),0)/(profile?.view_count||1))*100).toFixed(1):'0.0')+'%', sub:'Clicks / views'},
              {label:'Avg Daily Views',    icon:<BarChart3 size={14}/>,  val:'0',    sub:'Last 14 days'},
              {label:'Profile Score',      icon:<StarIcon size={14}/>,   val:String(Math.min(100,pct+links.length*5+((profile?.view_count||0)>10?20:0))), sub:'Out of 100'},
            ].map(s=>(
              <div key={s.label} className="db-scard">
                <div className="db-slabel" style={{marginBottom:8,display:'flex',alignItems:'center',gap:6}}>{s.icon} {s.label}</div>
                <div className="db-sval">{s.val}</div>
                <div className="db-ssub">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="db-2col">
            <div className="db-card">
              <div className="db-card-h" style={{marginBottom:12}}>Profile Views <span style={{color:'var(--dba)'}}>last 14 days</span></div>
              <div className="db-bar-chart" style={{height:160}}>{Array.from({length:14},(_,i)=><div key={i} className="db-bar" style={{height:`${Math.random()*70+5}%`}}/>)}</div>
              <div className="db-chart-ax"><span>14 days ago</span><span>Today</span></div>
            </div>
            <div className="db-card">
              <div className="db-card-h" style={{marginBottom:12}}>Visitor Devices</div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',paddingTop:12}}>
                <div className="db-donut"><div className="db-donut-inner"><span style={{fontSize:11,color:'var(--dbm)'}}>Total</span><span style={{fontSize:11,color:'var(--dbm)',marginTop:2}}>{profile?.view_count||0}</span></div></div>
                <div style={{display:'flex',gap:14,marginTop:14}}>
                  {[{l:'Desktop',c:'#e879f9',icon:<Monitor size={12}/>},{l:'Mobile',c:'#22c55e',icon:<Smartphone size={12}/>},{l:'Tablet',c:'#3b82f6',icon:<Tablet size={12}/>}].map(d=>(
                    <span key={d.l} style={{fontSize:12,color:'var(--dbm)',display:'flex',alignItems:'center',gap:5}}>
                      <span style={{width:7,height:7,borderRadius:'50%',background:d.c,display:'inline-block'}}/>{d.icon} {d.l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <h2 className="db-h2" style={{marginTop:20}}>Top Referrers</h2>
          <div className="db-card" style={{padding:0,overflow:'hidden'}}>
            <table className="db-table">
              <thead><tr><th>Source</th><th>Visits</th><th>%</th></tr></thead>
              <tbody>
                {[{s:'Direct',v:profile?.view_count||0,p:'100%'}].map(r=>(
                  <tr key={r.s}><td>{r.s}</td><td>{r.v}</td><td>{r.p}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="db-h2" style={{marginTop:20}}>Peak Hours</h2>
          <div className="db-card">
            <div className="db-bar-chart" style={{height:100}}>
              {Array.from({length:24},(_,i)=><div key={i} className="db-bar" style={{height:`${Math.random()*80+5}%`}} title={`${i}:00`}/>)}
            </div>
            <div className="db-chart-ax"><span>12am</span><span>12pm</span><span>11pm</span></div>
          </div>
        </>}

        {/* -- THEMES -- */}
        {section==='themes' && <>
          <h1 className="db-h1">Themes</h1>
          <p style={{fontSize:13,color:'var(--dbm)',marginBottom:24}}>Click a theme to instantly apply it to your profile</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:14}}>
            {THEME_PRESETS.map(t=>(
              <div key={t.id} className={`db-theme-card-v3 ${themePreset===t.id?'active':''}`} onClick={()=>applyTheme(t)} style={{position:'relative',cursor:'pointer'}}>
                <div style={{padding:16,borderRadius:10,background:t.bg,border:`1px solid ${themePreset===t.id?t.accent:'rgba(255,255,255,0.06)'}`,transition:'border-color 0.2s'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                    <div style={{width:20,height:20,borderRadius:'50%',background:t.accent,opacity:0.8}}/>
                    <div style={{flex:1,height:4,borderRadius:2,background:t.accent,opacity:0.3}}/>
                  </div>
                  <div style={{width:'100%',height:6,borderRadius:3,background:t.accent,opacity:0.15,marginBottom:4}}/>
                  <div style={{width:'70%',height:6,borderRadius:3,background:t.accent,opacity:0.1}}/>
                </div>
                {themePreset===t.id && (
                  <div style={{position:'absolute',top:8,right:8,background:'var(--dba)',borderRadius:'50%',width:22,height:22,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Check size={14} style={{color:'#fff'}}/>
                  </div>
                )}
                <div style={{fontSize:13,fontWeight:600,color:'var(--dbt)',textAlign:'center',marginTop:8}}>{t.name}</div>
              </div>
            ))}
          </div>
          {saveBtn}
        </>}

        {/* -- SHARE -- */}
        {section==='share' && <>
          <h1 className="db-h1">Share Your Profile</h1>
          <p style={{fontSize:13,color:'var(--dbm)',marginBottom:24}}>Share your profile with friends and followers</p>

          <div className="db-card" style={{marginBottom:14}}>
            <div className="db-card-h" style={{marginBottom:14}}>Profile URL</div>
            <div className="db-url-bar-v3">
              <Globe size={14} style={{color:'var(--dbf)',flexShrink:0}}/>
              <span style={{color:'var(--dbt)',flex:1}}>https://fentanyl.best/{profile?.username}</span>
              <button className="db-outline-btn" style={{flexShrink:0,display:'flex',alignItems:'center',gap:6,padding:'6px 14px'}} onClick={()=>{navigator.clipboard.writeText(`https://fentanyl.best/${profile?.username}`);flash('Link copied!')}}>
                <Copy size={14}/> Copy
              </button>
            </div>
          </div>

          <div className="db-2col">
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              <div className="db-card">
                <div className="db-card-h" style={{marginBottom:14}}>Share on Social</div>
                <div className="db-share-btns">
                  <a href={`https://twitter.com/intent/tweet?text=Check%20out%20my%20profile%20on%20fentanyl.best%2F${profile?.username}`} target="_blank" rel="noreferrer" className="db-outline-btn" style={{display:'flex',alignItems:'center',gap:6}}>
                    <TwitterLogo size={16} weight="fill"/> Share on Twitter
                  </a>
                  <button className="db-outline-btn" style={{display:'flex',alignItems:'center',gap:6}} onClick={()=>{navigator.clipboard.writeText(`https://fentanyl.best/${profile?.username}`);flash('Link copied! Paste in Discord.')}}>
                    <DiscordLogo size={16} weight="fill"/> Share on Discord
                  </button>
                </div>
              </div>

              <div className="db-card">
                <div className="db-card-h" style={{marginBottom:14}}>Embed Code</div>
                <div className="db-embed-code">
                  {`<iframe src="https://fentanyl.best/${profile?.username}" width="400" height="600" frameborder="0"></iframe>`}
                </div>
                <button className="db-outline-btn" style={{marginTop:10,display:'flex',alignItems:'center',gap:6}} onClick={()=>{navigator.clipboard.writeText(`<iframe src="https://fentanyl.best/${profile?.username}" width="400" height="600" frameborder="0"></iframe>`);flash('Embed code copied!')}}>
                  <Copy size={14}/> Copy Embed Code
                </button>
              </div>
            </div>

            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              <div className="db-card">
                <div className="db-card-h" style={{marginBottom:16}}>Profile Card Preview</div>
                <div className="db-profile-preview" style={{margin:'0 auto'}}>
                  {avatarUrl
                    ? <img src={avatarUrl} alt="" style={{width:50,height:50,borderRadius:'50%',objectFit:'cover',border:`2px solid ${accent}40`}}/>
                    : <div style={{width:50,height:50,borderRadius:'50%',background:'rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>{(displayName||profile?.username||'?')[0].toUpperCase()}</div>
                  }
                  <div style={{fontSize:16,fontWeight:700,color:'#fff'}}>{displayName||profile?.username}</div>
                  {tagline && <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',textAlign:'center'}}>{tagline}</div>}
                  <div style={{fontSize:11,color:'rgba(255,255,255,0.3)'}}>fentanyl.best/{profile?.username}</div>
                </div>
              </div>

              <div className="db-card">
                <div className="db-card-h" style={{marginBottom:14}}>QR Code</div>
                <div style={{display:'flex',justifyContent:'center'}}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://fentanyl.best/${profile?.username}`}
                    alt="QR Code"
                    style={{width:180,height:180,borderRadius:8,background:'#fff',padding:8}}
                  />
                </div>
                <div style={{textAlign:'center',fontSize:11,color:'var(--dbf)',marginTop:8}}>fentanyl.best/{profile?.username}</div>
                <div style={{display:'flex',justifyContent:'center',marginTop:12}}>
                  <a href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://fentanyl.best/${profile?.username}`} download={`${profile?.username}-qr.png`} target="_blank" rel="noreferrer" className="db-outline-btn" style={{display:'flex',alignItems:'center',gap:6}}>
                    <Download size={14}/> Download QR
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>}

        {/* -- BADGES -- */}
        {section==='badges' && <>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:24}}>
            <Shield size={20}/>
            <h1 className="db-h1" style={{marginBottom:0}}>All Badges</h1>
          </div>
          <div className="db-badge-grid">
            {ALL_BADGES.map(b=>{
              const owned = badges.includes(b.id)
              return (
                <div key={b.id} className={`db-badge-card ${owned?'owned':''}`}>
                  <span style={{fontSize:24,flexShrink:0,width:38,textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--dba)'}}>
                    {BADGE_ICONS[b.id] || <Shield size={22}/>}
                  </span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:700,color:'var(--dbt)',marginBottom:2}}>{b.name}</div>
                    <div style={{fontSize:12,color:'var(--dbm)',lineHeight:1.4}}>{b.desc}</div>
                  </div>
                  <button className={`db-badge-act ${owned?'owned':''}`}
                    onClick={()=>setBadges(bds=>bds.includes(b.id)?bds.filter(x=>x!==b.id):[...bds,b.id])}>
                    {owned?'Remove':'Add'}
                  </button>
                </div>
              )
            })}
          </div>

          <div style={{marginTop:32}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
              <h2 className="db-h2" style={{margin:0}}>Custom Badges</h2>
              <span className="db-new-pill"><Sparkles size={12}/> New</span>
            </div>
            <p style={{fontSize:13,color:'var(--dbm)',lineHeight:1.6,marginBottom:14}}>
              Custom badges allow you to create your own badges with a custom icon and name.
            </p>
            <div style={{display:'flex',gap:10}}>
              <button className="db-cta-btn">Purchase</button>
              <button className="db-outline-btn">Preview Custom Badge</button>
            </div>
          </div>

          <div style={{marginTop:32}}>
            <h2 className="db-h2" style={{marginBottom:14}}>Badge Settings</h2>
            <div className="db-card">
              <div style={{marginBottom:16}}>
                <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Size</label>
                <div style={{display:'flex',gap:8}}>
                  {(['small','medium','large'] as const).map(s=>(
                    <button key={s} className={`db-pill ${badgeSize===s?'active':''}`} onClick={()=>setBadgeSize(s)} style={{flex:1,textAlign:'center'}}>
                      {s.charAt(0).toUpperCase()+s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:16}}>
                <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Position</label>
                <div style={{display:'flex',gap:8}}>
                  {(['below-name','below-bio','above-links'] as const).map(p=>(
                    <button key={p} className={`db-pill ${badgePosition===p?'active':''}`} onClick={()=>setBadgePosition(p)} style={{flex:1,textAlign:'center'}}>
                      {p.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{display:'flex',gap:32,flexWrap:'wrap'}}>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'flex',alignItems:'center',gap:6}}>
                    Monochrome Badges <Info size={14} style={{color:'var(--dbm)',cursor:'help'}}/>
                  </div>
                  <button className={`db-toggle ${monoChrome?'on':''}`} onClick={()=>setMonoChrome(m=>!m)}>
                    <span className="db-toggle-thumb"/>
                  </button>
                </div>
              </div>
            </div>
            <button className="db-outline-btn" style={{marginTop:14}} onClick={()=>save({badges:activeBadges})} disabled={saving}>
              {saved ? <><Check size={14}/> Saved</> : saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {activeBadges.length>0 && (
            <div style={{marginTop:32}}>
              <h2 className="db-h2" style={{marginBottom:14}}>My Badges</h2>
              <div className="db-mybadges">
                {activeBadges.map(id=>{
                  const b = ALL_BADGES.find(x=>x.id===id)
                  if (!b) return null
                  return (
                    <div key={id} className="db-mybadge">
                      <GripVertical size={16} style={{color:'var(--dbf)',cursor:'grab'}}/>
                      <span style={{fontSize:17,display:'flex',alignItems:'center',color:'var(--dba)'}}>
                        {BADGE_ICONS[b.id] || <Shield size={17}/>}
                      </span>
                      <span style={{fontSize:13,fontWeight:600,color:'var(--dbt)',flex:1}}>{b.name}</span>
                      <button className="db-toggle on" onClick={()=>toggleActiveBadge(b.id)}><span className="db-toggle-thumb"/></button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>}

        {/* -- SETTINGS -- */}
        {section==='settings' && <>
          <h1 className="db-h1-center">Account Settings</h1>
          {msg && <div className="db-flash" style={{marginBottom:16}}>{msg}</div>}

          <div className="db-section-divider"><span>ACCOUNT</span></div>
          <div className="db-settings-card">
            {[
              {label:'Username',     val:sUser, set:setSUser, field:'username',      ph:'yourname',          maxLen:20},
              {label:'Display Name', val:sDN,   set:setSDN,   field:'display_name',  ph:'Your display name', maxLen:32},
              {label:'Bio',          val:sBio,  set:setSBio,  field:'bio',           ph:'Tell people about yourself...', maxLen:160},
            ].map(f=>(
              <div key={f.field} className="db-srow">
                <div className="db-sfield">
                  <label>{f.label}</label>
                  <input className="db-sinput" value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} maxLength={f.maxLen}/>
                </div>
                <button className="db-ssave" onClick={()=>saveSetting(f.field,f.val)}>Save</button>
              </div>
            ))}
          </div>

          <div className="db-section-divider" style={{marginTop:28}}><span>SECURITY</span></div>
          <div className="db-settings-card">
            {[
              {label:'Email Address', val:sEmail, set:setSEmail, field:'email',    type:'email',    ph:'new@email.com'},
              {label:'New Password',  val:sPass,  set:setSPass,  field:'password', type:'password', ph:'8+ characters'},
            ].map(f=>(
              <div key={f.field} className="db-srow">
                <div className="db-sfield">
                  <label>{f.label}</label>
                  <input className="db-sinput" type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}/>
                </div>
                <button className="db-ssave" onClick={()=>saveSetting(f.field,f.val)}>Update</button>
              </div>
            ))}
          </div>

          <div className="db-section-divider" style={{marginTop:28}}><span>CONNECTIONS</span></div>
          <div className="db-settings-card">
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:36,height:36,borderRadius:8,background:'rgba(88,101,242,0.15)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <DiscordLogo size={20} weight="fill" style={{color:'#5865F2'}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600,color:'var(--dbt)'}}>Discord</div>
                <div style={{fontSize:12,color:'var(--dbm)'}}>Link your Discord account</div>
              </div>
              <button className="db-outline-btn" style={{display:'flex',alignItems:'center',gap:6}}>
                <DiscordLogo size={14} weight="fill"/> Connect
              </button>
            </div>
          </div>

          <div className="db-section-divider" style={{marginTop:28}}><span>PRIVACY</span></div>
          <div className="db-settings-card">
            <div style={{marginBottom:16}}>
              <label style={{fontSize:13,fontWeight:600,color:'var(--dbt)',marginBottom:10,display:'block'}}>Profile Visibility</label>
              <div style={{display:'flex',gap:8}}>
                {(['public','unlisted','private'] as const).map(v=>(
                  <button key={v} className={`db-pill ${profileVisibility===v?'active':''}`} onClick={()=>setProfileVisibility(v)} style={{flex:1,textAlign:'center'}}>
                    {v.charAt(0).toUpperCase()+v.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="db-toggle-row">
              <div className="db-toggle-info">
                <span className="db-toggle-label">Email notifications</span>
                <span className="db-toggle-desc">Receive email notifications about your profile</span>
              </div>
              <button className="db-toggle" style={{opacity:0.5,cursor:'default'}}>
                <span className="db-toggle-thumb"/>
              </button>
            </div>
            <div className="db-toggle-row">
              <div className="db-toggle-info">
                <span className="db-toggle-label">Marketing emails</span>
                <span className="db-toggle-desc">Receive updates about new features and promotions</span>
              </div>
              <button className="db-toggle" style={{opacity:0.5,cursor:'default'}}>
                <span className="db-toggle-thumb"/>
              </button>
            </div>
          </div>

          <div className="db-section-divider" style={{marginTop:28}}><span>DANGER ZONE</span></div>
          <div className="db-danger-zone">
            <div style={{display:'flex',gap:10}}>
              <button className="db-outline-btn" style={{display:'flex',alignItems:'center',gap:6}} onClick={()=>{supabase.auth.signOut();router.push('/')}}>
                <LogOut size={14}/> Sign out
              </button>
              <button className="db-outline-btn" style={{borderColor:'rgba(239,68,68,0.25)',color:'#f87171',display:'flex',alignItems:'center',gap:6}}
                onClick={()=>{if(confirm('Delete account? Cannot be undone.')){supabase.auth.signOut();router.push('/')}}}>
                <Trash2 size={14}/> Delete Account
              </button>
            </div>
          </div>
        </>}

        {/* -- PREMIUM -- */}
        {section==='premium' && <>
          <h1 className="db-h1">Premium</h1>
          <p style={{fontSize:13,color:'var(--dbm)',marginBottom:24}}>Unlock advanced features for your profile</p>
          <div className="db-tier-grid">
            {/* Free tier */}
            <div className="db-tier-card" style={{border:'2px solid rgba(255,255,255,0.06)'}}>
              <div style={{fontSize:14,fontWeight:700,color:'var(--dbt)',marginBottom:4}}>Free</div>
              <div style={{fontSize:28,fontWeight:800,color:'var(--dbt)',marginBottom:4}}>$0</div>
              <div style={{fontSize:12,color:'var(--dbm)',marginBottom:20}}>forever</div>
              <div style={{textAlign:'left',fontSize:12,color:'var(--dbm)',display:'flex',flexDirection:'column',gap:8}}>
                {['Custom links','Basic themes','Profile analytics','Music player','Social integrations'].map(f=>(
                  <div key={f} style={{display:'flex',alignItems:'center',gap:6}}><Check size={12} style={{color:'#4ade80'}}/>{f}</div>
                ))}
              </div>
              <div style={{marginTop:20,fontSize:12,color:'var(--dba)',fontWeight:600}}>Current Plan</div>
            </div>
            {/* Pro tier */}
            <div className="db-tier-card" style={{border:'2px solid var(--dba)',position:'relative'}}>
              <span className="db-pill-badge" style={{position:'absolute',top:12,right:12}}>Coming Soon</span>
              <div style={{fontSize:14,fontWeight:700,color:'var(--dba)',marginBottom:4}}>Pro</div>
              <div style={{fontSize:28,fontWeight:800,color:'var(--dbt)',marginBottom:4}}>$5</div>
              <div style={{fontSize:12,color:'var(--dbm)',marginBottom:20}}>per month</div>
              <div style={{textAlign:'left',fontSize:12,color:'var(--dbm)',display:'flex',flexDirection:'column',gap:8}}>
                {['Everything in Free','Custom badges','Priority support','Advanced analytics','Custom domains','Animated backgrounds'].map(f=>(
                  <div key={f} style={{display:'flex',alignItems:'center',gap:6}}><Check size={12} style={{color:'var(--dba)'}}/>{f}</div>
                ))}
              </div>
            </div>
            {/* Elite tier */}
            <div className="db-tier-card" style={{border:'2px solid rgba(255,255,255,0.06)',position:'relative'}}>
              <span className="db-pill-badge" style={{position:'absolute',top:12,right:12}}>Coming Soon</span>
              <div style={{fontSize:14,fontWeight:700,color:'#facc15',marginBottom:4}}>Elite</div>
              <div style={{fontSize:28,fontWeight:800,color:'var(--dbt)',marginBottom:4}}>$15</div>
              <div style={{fontSize:12,color:'var(--dbm)',marginBottom:20}}>per month</div>
              <div style={{textAlign:'left',fontSize:12,color:'var(--dbm)',display:'flex',flexDirection:'column',gap:8}}>
                {['Everything in Pro','Verified badge','API access','White-label embeds','Custom CSS injection','Dedicated support'].map(f=>(
                  <div key={f} style={{display:'flex',alignItems:'center',gap:6}}><Check size={12} style={{color:'#facc15'}}/>{f}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature comparison */}
          <h2 className="db-h2" style={{marginTop:28,marginBottom:14}}>Feature Comparison</h2>
          <div className="db-card" style={{padding:0,overflow:'hidden'}}>
            <table className="db-table">
              <thead>
                <tr><th>Feature</th><th>Free</th><th>Pro</th><th>Elite</th></tr>
              </thead>
              <tbody>
                {[
                  {f:'Custom Links',     free:true, pro:true, elite:true},
                  {f:'Basic Themes',     free:true, pro:true, elite:true},
                  {f:'Analytics',        free:true, pro:true, elite:true},
                  {f:'Music Player',     free:true, pro:true, elite:true},
                  {f:'Custom Badges',    free:false,pro:true, elite:true},
                  {f:'Animated BGs',     free:false,pro:true, elite:true},
                  {f:'Custom Domains',   free:false,pro:true, elite:true},
                  {f:'Priority Support', free:false,pro:true, elite:true},
                  {f:'Verified Badge',   free:false,pro:false,elite:true},
                  {f:'API Access',       free:false,pro:false,elite:true},
                  {f:'Custom CSS',       free:false,pro:false,elite:true},
                ].map(r=>(
                  <tr key={r.f}>
                    <td style={{fontWeight:500}}>{r.f}</td>
                    <td>{r.free ? <Check size={14} style={{color:'#4ade80'}}/> : <X size={14} style={{color:'var(--dbf)'}}/>}</td>
                    <td>{r.pro  ? <Check size={14} style={{color:'var(--dba)'}}/> : <X size={14} style={{color:'var(--dbf)'}}/>}</td>
                    <td>{r.elite? <Check size={14} style={{color:'#facc15'}}/> : <X size={14} style={{color:'var(--dbf)'}}/>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>}

        {/* ===========================
            ADMIN SECTIONS
        =========================== */}

        {/* -- ADMIN: INVITES -- */}
        {section==='admin-invites' && <>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
            <div>
              <h1 className="db-h1" style={{marginBottom:4}}>Invite Codes</h1>
              <p style={{fontSize:13,color:'var(--dbm)'}}>
                {invites.filter(i=>!i.used_by).length} unused · {invites.filter(i=>i.used_by).length} used
              </p>
            </div>
            <button className="db-cta-btn" onClick={generateInvite} disabled={generating}>
              {generating?'Generating...':'+ Generate Code'}
            </button>
          </div>
          <div className="db-card" style={{padding:0,overflow:'hidden'}}>
            <table className="db-table">
              <thead>
                <tr><th>Code</th><th>Status</th><th>Created</th><th>Used By</th><th></th></tr>
              </thead>
              <tbody>
                {invites.map(inv=>(
                  <tr key={inv.id}>
                    <td><code className="db-code">{inv.code}</code></td>
                    <td><span className={`db-status-pill ${inv.used_by?'used':'avail'}`}>{inv.used_by?'Used':'Available'}</span></td>
                    <td style={{color:'var(--dbm)',fontSize:13}}>{new Date(inv.created_at).toLocaleDateString()}</td>
                    <td style={{color:'var(--dbm)',fontSize:13}}>{inv.used_by?inv.used_by.slice(0,8)+'...':'--'}</td>
                    <td>
                      {!inv.used_by && (
                        <button className="db-tbl-btn danger" onClick={()=>revokeInvite(inv.id)}>Revoke</button>
                      )}
                    </td>
                  </tr>
                ))}
                {!invites.length && <tr><td colSpan={5} style={{textAlign:'center',color:'var(--dbf)',padding:'28px'}}>No codes yet</td></tr>}
              </tbody>
            </table>
          </div>
        </>}

        {/* -- ADMIN: USERS -- */}
        {section==='admin-users' && <>
          <h1 className="db-h1" style={{marginBottom:4}}>Users</h1>
          <p style={{fontSize:13,color:'var(--dbm)',marginBottom:24}}>{users.length} total accounts</p>
          <div className="db-card" style={{padding:0,overflow:'hidden'}}>
            <table className="db-table">
              <thead>
                <tr><th>Username</th><th>Display Name</th><th>Views</th><th>Joined</th><th>Role</th><th></th></tr>
              </thead>
              <tbody>
                {users.map(u=>(
                  <tr key={u.id}>
                    <td><a href={`/${u.username}`} target="_blank" style={{color:'var(--dba)',fontWeight:600}}>@{u.username}</a></td>
                    <td style={{color:'var(--dbm)',fontSize:13}}>{u.display_name||'--'}</td>
                    <td style={{color:'var(--dbm)',fontSize:13}}>{(u.view_count||0).toLocaleString()}</td>
                    <td style={{color:'var(--dbm)',fontSize:13}}>{new Date(u.created_at).toLocaleDateString()}</td>
                    <td><span className={`db-status-pill ${u.is_admin?'admin':'user'}`}>{u.is_admin?'Admin':'User'}</span></td>
                    <td><button className="db-tbl-btn" onClick={()=>toggleAdmin(u.id,u.is_admin)}>{u.is_admin?'Remove Admin':'Make Admin'}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>}

        {/* -- ADMIN: BLACKLIST -- */}
        {section==='admin-blacklist' && <>
          <h1 className="db-h1" style={{marginBottom:4}}>Username Blacklist</h1>
          <p style={{fontSize:13,color:'var(--dbm)',marginBottom:24}}>Blocked usernames can never be registered</p>
          <div className="db-card" style={{marginBottom:14}}>
            <div style={{display:'flex',gap:10}}>
              <input className="db-sinput" style={{flex:1}} value={newBL}
                onChange={e=>setNewBL(e.target.value.toLowerCase())}
                placeholder="username to block"
                onKeyDown={e=>e.key==='Enter'&&addBlacklist()}/>
              <button className="db-cta-btn" style={{flexShrink:0}} onClick={addBlacklist}>Block</button>
            </div>
          </div>
          <div className="db-card" style={{padding:0,overflow:'hidden'}}>
            <table className="db-table">
              <thead><tr><th>Username</th><th>Added</th><th></th></tr></thead>
              <tbody>
                {blacklist.map(b=>(
                  <tr key={b.id}>
                    <td><code className="db-code">{b.username}</code></td>
                    <td style={{color:'var(--dbm)',fontSize:13}}>{new Date(b.created_at).toLocaleDateString()}</td>
                    <td><button className="db-tbl-btn danger" onClick={()=>removeBlacklist(b.id)}>Remove</button></td>
                  </tr>
                ))}
                {!blacklist.length && <tr><td colSpan={3} style={{textAlign:'center',color:'var(--dbf)',padding:'28px'}}>No blacklisted usernames</td></tr>}
              </tbody>
            </table>
          </div>
        </>}

      </main>
    </div>
  )
}
