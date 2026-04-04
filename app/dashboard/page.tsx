'use client'
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase, type Profile, type Link as ProfileLink } from '@/lib/supabase'
import FileUpload from '@/components/FileUpload'

// Lucide icons
import {
  Home, User, Palette, Link2, Music, LayoutGrid, Users, BarChart3,
  Shield, Settings, Crown, Share2, ChevronDown, ChevronRight, Eye, EyeOff,
  ExternalLink, LogOut, Trash2, Copy, Plus, GripVertical, Check, X,
  Calendar, ArrowUp, ArrowDown, Info, AlertTriangle, Megaphone, Star as StarIcon,
  Image as ImageIcon, Type, Sparkles, Monitor, Smartphone, Tablet, Globe, MapPin,
  Search, Bell, Layers, Grid3X3, Award, FileText, FolderOpen, HardDrive,
  Paintbrush, Frame, Wand2, Bold, Italic, MousePointer2, Brush
} from 'lucide-react'

// Phosphor icons
import {
  DiscordLogo, SpotifyLogo, TwitchLogo, GithubLogo, TwitterLogo,
  InstagramLogo, TiktokLogo, YoutubeLogo, LinkedinLogo, RedditLogo,
  TelegramLogo, SnapchatLogo, PinterestLogo, SoundcloudLogo,
  Gear, Trophy, Bug, Heart, Gift, Sparkle, Timer, ChatText, Lock,
  Hash, MusicNote, GameController, Lightning, Fire, Snowflake, Medal,
  AppleLogo, FacebookLogo, MastodonLogo, PaypalLogo, PatreonLogo,
  GameController as GameCtrl, Sword, Cube
} from '@phosphor-icons/react'

// Recharts
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts'

// ═══════════════════════════════════════════════════
// TYPES & CONSTANTS
// ═══════════════════════════════════════════════════

type Section =
  | 'overview' | 'customize' | 'layout' | 'decoration' | 'badges' | 'templates'
  | 'links' | 'assets'
  | 'settings' | 'notifications' | 'premium'
  | 'admin-invites' | 'admin-users' | 'admin-blacklist'

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
  { id:'staff', name:'Staff', desc:'Be a part of the team.' },
  { id:'helper', name:'Helper', desc:'Be active and help users in the community.' },
  { id:'premium', name:'Premium', desc:'Purchase the premium package.' },
  { id:'verified', name:'Verified', desc:'Purchase or be a known content creator.' },
  { id:'donor', name:'Donor', desc:'Donate to the platform.' },
  { id:'gifter', name:'Gifter', desc:'Gift a product to another user.' },
  { id:'og', name:'OG', desc:'Be an early supporter.' },
  { id:'bughunter', name:'Bug Hunter', desc:'Report a bug to the team.' },
  { id:'winner', name:'Winner', desc:'Win an event.' },
  { id:'founder', name:'Founder', desc:'Exclusive founder badge.' },
  { id:'christmas', name:'Christmas 2025', desc:'Exclusive badge from the 2025 winter event.' },
  { id:'secondplace', name:'Second Place', desc:'Get second place in an event.' },
]

const ACCENT_PRESETS = ['#e91e8c','#ff2d9b','#A397DD','#C9BDFE','#60a5fa','#34d399','#f472b6','#fb923c','#facc15','#a78bfa','#22d3ee','#e879f9']
const BG_PRESETS = ['#0a0a0a','#07060f','#0a0f1e','#0f0a1a','#0a1a0a','#1a0a0a','#0f0f0f','#0a0a1f','#1a0f0a','#0d1117','#111111','#0c0c14']
const FONTS = ['inter','geist','space-grotesk','outfit','syne']
const SOCIAL_ICONS = ['discord','twitter','tiktok','youtube','instagram','twitch','spotify','github','steam','telegram','snapchat','reddit','pinterest','linkedin','email','website','custom']
const BTN_STYLES = ['filled','outline','glass','neon','soft','3d-shadow'] as Profile['button_style'][]
const BTN_SHAPES = ['rounded','pill','square'] as Profile['button_shape'][]
const HOVER_EFFECTS = ['none','lift','glow','slide'] as Profile['hover_effect'][]
const AVATAR_SHAPES = ['circle','squircle','square'] as Profile['avatar_shape'][]
const ANIMATIONS = ['none','fade-in','slide-up','scale'] as Profile['animation_type'][]
const LAYOUT_MODES = ['centered','left','wide'] as Profile['layout_mode'][]
const AVAIL_STATUSES = ['','online','away','busy','offline'] as Profile['availability_status'][]
const PLAYER_STYLES = ['minimal','full','compact'] as Profile['player_style'][]

const THEME_PRESETS = [
  { id:'midnight', name:'Midnight', bg:'#07060f', accent:'#A397DD', btnStyle:'outline' as const, btnShape:'rounded' as const },
  { id:'ocean', name:'Ocean Deep', bg:'#0a1628', accent:'#60a5fa', btnStyle:'glass' as const, btnShape:'pill' as const },
  { id:'forest', name:'Dark Forest', bg:'#0a1a0a', accent:'#34d399', btnStyle:'soft' as const, btnShape:'rounded' as const },
  { id:'rose', name:'Rose Gold', bg:'#1a0a0f', accent:'#f472b6', btnStyle:'neon' as const, btnShape:'pill' as const },
  { id:'sunset', name:'Sunset', bg:'#1a0f0a', accent:'#fb923c', btnStyle:'filled' as const, btnShape:'rounded' as const },
  { id:'cyber', name:'Cyberpunk', bg:'#0d0d20', accent:'#22d3ee', btnStyle:'neon' as const, btnShape:'square' as const },
  { id:'purple', name:'Purple Haze', bg:'#0f0a1a', accent:'#a78bfa', btnStyle:'glass' as const, btnShape:'rounded' as const },
  { id:'monochrome', name:'Monochrome', bg:'#111111', accent:'#888888', btnStyle:'outline' as const, btnShape:'square' as const },
  { id:'aurora', name:'Aurora', bg:'#0c1220', accent:'#34d399', btnStyle:'soft' as const, btnShape:'pill' as const },
  { id:'candy', name:'Cotton Candy', bg:'#1a0a1a', accent:'#e879f9', btnStyle:'soft' as const, btnShape:'pill' as const },
  { id:'gold', name:'Gold Rush', bg:'#1a1400', accent:'#facc15', btnStyle:'3d-shadow' as const, btnShape:'rounded' as const },
  { id:'ice', name:'Ice Cold', bg:'#0a1a2a', accent:'#7dd3fc', btnStyle:'glass' as const, btnShape:'pill' as const },
]

const FONT_FAMILY_MAP: Record<string, string> = {
  'inter': 'Inter', 'geist': 'Geist', 'space-grotesk': 'Space Grotesk', 'outfit': 'Outfit', 'syne': 'Syne',
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

// Social platforms for Layout section
const ALL_PLATFORMS = [
  { id:'discord', name:'Discord', icon:<DiscordLogo size={20} weight="fill"/> },
  { id:'twitter', name:'Twitter/X', icon:<TwitterLogo size={20} weight="fill"/> },
  { id:'tiktok', name:'TikTok', icon:<TiktokLogo size={20} weight="fill"/> },
  { id:'youtube', name:'YouTube', icon:<YoutubeLogo size={20} weight="fill"/> },
  { id:'instagram', name:'Instagram', icon:<InstagramLogo size={20} weight="fill"/> },
  { id:'twitch', name:'Twitch', icon:<TwitchLogo size={20} weight="fill"/> },
  { id:'spotify', name:'Spotify', icon:<SpotifyLogo size={20} weight="fill"/> },
  { id:'github', name:'GitHub', icon:<GithubLogo size={20} weight="fill"/> },
  { id:'steam', name:'Steam', icon:<GameController size={20} weight="fill"/> },
  { id:'telegram', name:'Telegram', icon:<TelegramLogo size={20} weight="fill"/> },
  { id:'snapchat', name:'Snapchat', icon:<SnapchatLogo size={20} weight="fill"/> },
  { id:'reddit', name:'Reddit', icon:<RedditLogo size={20} weight="fill"/> },
  { id:'pinterest', name:'Pinterest', icon:<PinterestLogo size={20} weight="fill"/> },
  { id:'linkedin', name:'LinkedIn', icon:<LinkedinLogo size={20} weight="fill"/> },
  { id:'email', name:'Email', icon:<Globe size={20}/> },
  { id:'website', name:'Website', icon:<Globe size={20}/> },
  { id:'soundcloud', name:'SoundCloud', icon:<SoundcloudLogo size={20} weight="fill"/> },
  { id:'lastfm', name:'Last.fm', icon:<MusicNote size={20} weight="fill"/> },
  { id:'kick', name:'Kick', icon:<Lightning size={20} weight="fill"/> },
  { id:'bluesky', name:'Bluesky', icon:<Globe size={20}/> },
  { id:'threads', name:'Threads', icon:<Hash size={20}/> },
  { id:'mastodon', name:'Mastodon', icon:<MastodonLogo size={20} weight="fill"/> },
  { id:'facebook', name:'Facebook', icon:<FacebookLogo size={20} weight="fill"/> },
  { id:'tumblr', name:'Tumblr', icon:<Type size={20}/> },
  { id:'paypal', name:'PayPal', icon:<PaypalLogo size={20} weight="fill"/> },
  { id:'cashapp', name:'Cash App', icon:<Globe size={20}/> },
  { id:'venmo', name:'Venmo', icon:<Globe size={20}/> },
  { id:'patreon', name:'Patreon', icon:<PatreonLogo size={20} weight="fill"/> },
  { id:'kofi', name:'Ko-fi', icon:<Heart size={20} weight="fill"/> },
  { id:'onlyfans', name:'OnlyFans', icon:<Lock size={20}/> },
  { id:'fansly', name:'Fansly', icon:<Heart size={20}/> },
  { id:'throne', name:'Throne', icon:<Crown size={20}/> },
  { id:'amazon', name:'Amazon Wishlist', icon:<Gift size={20}/> },
  { id:'xbox', name:'Xbox', icon:<GameCtrl size={20} weight="fill"/> },
  { id:'playstation', name:'PlayStation', icon:<GameCtrl size={20} weight="fill"/> },
  { id:'nintendo', name:'Nintendo', icon:<GameCtrl size={20} weight="fill"/> },
  { id:'riot', name:'Riot Games', icon:<Sword size={20}/> },
  { id:'valorant', name:'Valorant', icon:<Sword size={20}/> },
  { id:'fortnite', name:'Fortnite', icon:<GameCtrl size={20} weight="fill"/> },
  { id:'minecraft', name:'Minecraft', icon:<Cube size={20}/> },
  { id:'roblox', name:'Roblox', icon:<Cube size={20} weight="fill"/> },
  { id:'letterboxd', name:'Letterboxd', icon:<StarIcon size={20}/> },
  { id:'goodreads', name:'Goodreads', icon:<FileText size={20}/> },
  { id:'chess', name:'Chess.com', icon:<Grid3X3 size={20}/> },
  { id:'duolingo', name:'Duolingo', icon:<Globe size={20}/> },
  { id:'medium', name:'Medium', icon:<FileText size={20}/> },
  { id:'substack', name:'Substack', icon:<FileText size={20}/> },
  { id:'producthunt', name:'ProductHunt', icon:<Sparkle size={20} weight="fill"/> },
]

const ANIMATED_BG_OPTIONS = [
  { id:'mesh' as const, label:'Mesh' },
  { id:'aurora' as const, label:'Aurora' },
  { id:'particles' as const, label:'Particles' },
  { id:'waves' as const, label:'Waves' },
  { id:'matrix' as const, label:'Matrix' },
  { id:'starfield' as const, label:'Starfield' },
  { id:'gradient-shift' as const, label:'Gradient Shift' },
  { id:'glitch' as const, label:'Glitch' },
  { id:'fireflies' as const, label:'Fireflies' },
]

// ═══════════════════════════════════════════════════
// BREADCRUMB MAP
// ═══════════════════════════════════════════════════
const BREADCRUMBS: Record<Section, string[]> = {
  'overview': ['Dashboard', 'Customization', 'Overview'],
  'customize': ['Dashboard', 'Customization', 'Customize'],
  'layout': ['Dashboard', 'Customization', 'Layout'],
  'decoration': ['Dashboard', 'Customization', 'Decoration'],
  'badges': ['Dashboard', 'Customization', 'Badges'],
  'templates': ['Dashboard', 'Customization', 'Templates'],
  'links': ['Dashboard', 'Content', 'Links'],
  'assets': ['Dashboard', 'Content', 'Assets'],
  'settings': ['Dashboard', 'Account', 'Settings'],
  'notifications': ['Dashboard', 'Account', 'Notifications'],
  'premium': ['Dashboard', 'Account', 'Premium'],
  'admin-invites': ['Dashboard', 'Admin', 'Invites'],
  'admin-users': ['Dashboard', 'Admin', 'Users'],
  'admin-blacklist': ['Dashboard', 'Admin', 'Blacklist'],
}

// ═══════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [section, setSection] = useState<Section>('overview')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [msg, setMsg] = useState('')
  const [sidebarSearch, setSidebarSearch] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Collapsible sidebar sections
  const [customizationOpen, setCustomizationOpen] = useState(true)
  const [contentOpen, setContentOpen] = useState(true)
  const [accountOpen, setAccountOpen] = useState(true)
  const [adminOpen, setAdminOpen] = useState(false)

  // profile fields
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [links, setLinks] = useState<ProfileLink[]>([])
  const [bgType, setBgType] = useState<Profile['background_type']>('color')
  const [bgValue, setBgValue] = useState('#07060f')
  const [accent, setAccent] = useState('#A397DD')
  const [btnStyle, setBtnStyle] = useState<Profile['button_style']>('outline')
  const [font, setFont] = useState('inter')
  const [badges, setBadges] = useState<string[]>([])
  const [activeBadges, setActiveBadges] = useState<string[]>([])
  const [musicUrl, setMusicUrl] = useState('')
  const [musicType, setMusicType] = useState<Profile['music_type']>(null)
  const [monoChrome, setMonoChrome] = useState(false)

  // profile
  const [pronouns, setPronouns] = useState('')
  const [location, setLocation] = useState('')
  const [website, setWebsite] = useState('')
  const [coverBanner, setCoverBanner] = useState('')
  const [tagline, setTagline] = useState('')
  const [verified, setVerified] = useState(false)
  const [showAge, setShowAge] = useState(false)
  const [birthday, setBirthday] = useState('')

  // appearance
  const [btnShape, setBtnShape] = useState<Profile['button_shape']>('rounded')
  const [textShadow, setTextShadow] = useState(false)
  const [blurAmount, setBlurAmount] = useState(0)
  const [glassmorphism, setGlassmorphism] = useState(false)
  const [avatarShape, setAvatarShape] = useState<Profile['avatar_shape']>('circle')
  const [avatarBorder, setAvatarBorder] = useState(true)
  const [avatarGlow, setAvatarGlow] = useState(false)
  const [animationType, setAnimationType] = useState<Profile['animation_type']>('none')
  const [customCursor, setCustomCursor] = useState('')
  const [layoutMode, setLayoutMode] = useState<Profile['layout_mode']>('centered')
  const [hoverEffect, setHoverEffect] = useState<Profile['hover_effect']>('lift')

  // music
  const [musicAutoplay, setMusicAutoplay] = useState(false)
  const [musicLoop, setMusicLoop] = useState(false)
  const [playerStyle, setPlayerStyle] = useState<Profile['player_style']>('minimal')

  // social
  const [discordWidget, setDiscordWidget] = useState('')
  const [spotifyNP, setSpotifyNP] = useState(false)
  const [twitchUser, setTwitchUser] = useState('')
  const [githubUser, setGithubUser] = useState('')

  // widgets
  const [announcement, setAnnouncement] = useState('')
  const [countdownDate, setCountdownDate] = useState('')
  const [countdownLabel, setCountdownLabel] = useState('')
  const [customText, setCustomText] = useState('')
  const [photoGallery, setPhotoGallery] = useState<string[]>([])
  const [availStatus, setAvailStatus] = useState<Profile['availability_status']>('')
  const [currentStatus, setCurrentStatus] = useState('')
  const [newPhotoUrl, setNewPhotoUrl] = useState('')

  // theme
  const [themePreset, setThemePreset] = useState('')

  // settings
  const [sUser, setSUser] = useState('')
  const [sDN, setSDN] = useState('')
  const [sBio, setSBio] = useState('')
  const [sEmail, setSEmail] = useState('')
  const [sPass, setSPass] = useState('')

  // admin
  const [invites, setInvites] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [blacklist, setBlacklist] = useState<any[]>([])
  const [newBL, setNewBL] = useState('')
  const [generating, setGenerating] = useState(false)

  // extended state
  const [showViewCount, setShowViewCount] = useState(true)
  const [showJoinDate, setShowJoinDate] = useState(true)
  const [buttonWidth, setButtonWidth] = useState<'auto'|'full'>('auto')
  const [cardBorder, setCardBorder] = useState<'none'|'subtle'|'accent'|'glow'>('none')
  const [avatarSize, setAvatarSize] = useState<'small'|'medium'|'large'>('medium')
  const [overlayOpacity, setOverlayOpacity] = useState(0)
  const [gradientFrom, setGradientFrom] = useState('#0d0d20')
  const [gradientTo, setGradientTo] = useState('#1a0d2e')
  const [gradientDir, setGradientDir] = useState('135')
  const [animatedBgStyle, setAnimatedBgStyle] = useState<Profile['animated_bg_style']>('mesh')
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
  const [announcementFontSize, setAnnouncementFontSize] = useState<'small'|'medium'|'large'|'xl'>('medium')
  const [announcementBorder, setAnnouncementBorder] = useState<'none'|'solid'|'dashed'|'glowing'>('none')
  const [announcementPosition, setAnnouncementPosition] = useState<'top'|'above-links'|'below-links'>('top')
  const [announcementDismissable, setAnnouncementDismissable] = useState(false)
  const [announcementExpiry, setAnnouncementExpiry] = useState('')
  const [musicFileUrl, setMusicFileUrl] = useState('')

  // New: analytics time range
  const [analyticsRange, setAnalyticsRange] = useState<'24h'|'7d'|'14d'|'30d'|'all'>('7d')
  const [analyticsCumulative, setAnalyticsCumulative] = useState(false)

  // New: template tabs
  const [templateTab, setTemplateTab] = useState<'all'|'my'|'favorites'>('all')

  // New: decoration tab
  const [decorationTab, setDecorationTab] = useState<'frames'|'backgrounds'|'effects'>('frames')

  // New: assets tab
  const [assetsTab, setAssetsTab] = useState<'avatars'|'backgrounds'|'banners'|'icons'|'cursors'|'audios'|'fonts'>('avatars')

  // New: social platform toggles for Layout section
  const [enabledPlatforms, setEnabledPlatforms] = useState<Record<string, boolean>>({})
  const [platformValues, setPlatformValues] = useState<Record<string, string>>({})

  // New: link add mode
  const [showAddLink, setShowAddLink] = useState(false)
  const [linkSearchQuery, setLinkSearchQuery] = useState('')

  // New: badge glow
  const [badgeGlow, setBadgeGlow] = useState(false)

  // ═══════════════════════════════════════
  // DATA LOADING
  // ═══════════════════════════════════════

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (!data) { router.push('/login'); return }
      setProfile(data)
      setDisplayName(data.display_name||''); setSDN(data.display_name||'')
      setBio(data.bio||''); setSBio(data.bio||'')
      setAvatarUrl(data.avatar_url||''); setSUser(data.username||'')
      setLinks(data.links||[]); setBgType(data.background_type||'color')
      setBgValue(data.background_value||'#07060f'); setAccent(data.accent_color||'#A397DD')
      setBtnStyle(data.button_style||'outline'); setFont(data.font||'inter')
      setBadges(data.badges||[]); setActiveBadges(data.badges||[])
      setMusicUrl(data.music_url||''); setMusicType(data.music_type||null)
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
      setAnnouncementFontSize(data.announcement_font_size || 'medium')
      setAnnouncementBorder(data.announcement_border || 'none')
      setAnnouncementPosition(data.announcement_position || 'top')
      setAnnouncementDismissable(data.announcement_dismissable || false)
      setAnnouncementExpiry(data.announcement_expiry || '')
      setMusicFileUrl(data.music_file_url || '')
      setMonoChrome(data.badge_monochrome || false)
      if (data.is_admin) loadAdmin()
      setLoading(false)
    }
    load()
  }, [router])

  // ═══════════════════════════════════════
  // SAVE / ADMIN FUNCTIONS
  // ═══════════════════════════════════════

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
      announcement_font_size: announcementFontSize,
      announcement_border: announcementBorder,
      announcement_position: announcementPosition,
      announcement_dismissable: announcementDismissable,
      announcement_expiry: announcementExpiry || null,
      music_file_url: musicFileUrl,
      badge_monochrome: monoChrome,
    }
    const { error } = await supabase.from('profiles').update(payload).eq('id', profile.id)
    setSaving(false)
    if (error) { flash('Save failed: ' + error.message); return }
    setSaved(true); setTimeout(()=>setSaved(false),2000)
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

  function addLink() { setLinks(l=>[...l,{id:crypto.randomUUID(),label:'',url:'',icon:'custom',visible:true,clicks:0}]) }
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
    setPhotoGallery(g=>[...g, newPhotoUrl.trim()]); setNewPhotoUrl('')
  }
  function removePhoto(idx: number) { setPhotoGallery(g=>g.filter((_,i)=>i!==idx)) }
  function applyTheme(t: typeof THEME_PRESETS[0]) {
    setBgType('color'); setBgValue(t.bg); setAccent(t.accent)
    setBtnStyle(t.btnStyle); setBtnShape(t.btnShape); setThemePreset(t.id)
  }

  function addLinkWithPlatform(platformId: string) {
    const platform = ALL_PLATFORMS.find(p => p.id === platformId)
    setLinks(l => [...l, {
      id: crypto.randomUUID(),
      label: platform?.name || '',
      url: '',
      icon: platformId,
      visible: true,
      clicks: 0,
    }])
    setShowAddLink(false)
    setLinkSearchQuery('')
  }

  const isAdmin = profile?.is_admin
  const isAdminSection = section.startsWith('admin-')
  const totalClicks = links.reduce((a,l) => a+(l.clicks||0), 0)
  const activeLinks = links.filter(l => l.visible !== false).length

  // Mock analytics data
  const chartData = useMemo(() => {
    const days = analyticsRange === '24h' ? 24 : analyticsRange === '7d' ? 7 : analyticsRange === '14d' ? 14 : analyticsRange === '30d' ? 30 : 90
    let cumulative = 0
    return Array.from({ length: days }, (_, i) => {
      const val = Math.floor(Math.random() * 20) + 1
      cumulative += val
      return {
        name: analyticsRange === '24h' ? `${i}:00` : `Day ${i+1}`,
        views: analyticsCumulative ? cumulative : val,
        clicks: analyticsCumulative ? Math.floor(cumulative * 0.3) : Math.floor(val * 0.3),
      }
    })
  }, [analyticsRange, analyticsCumulative])

  const deviceData = [
    { name: 'Desktop', value: 62, color: '#e91e8c' },
    { name: 'Mobile', value: 31, color: '#ff2d9b' },
    { name: 'Tablet', value: 7, color: '#2a1520' },
  ]

  // Sidebar nav items
  const NAV_SECTIONS = [
    {
      label: 'Customization',
      open: customizationOpen,
      toggle: () => setCustomizationOpen(v => !v),
      items: [
        { id: 'overview' as Section, name: 'Overview', icon: <Home size={16}/> },
        { id: 'customize' as Section, name: 'Customize', icon: <Paintbrush size={16}/> },
        { id: 'layout' as Section, name: 'Layout', icon: <Layers size={16}/> },
        { id: 'decoration' as Section, name: 'Decoration', icon: <Frame size={16}/> },
        { id: 'badges' as Section, name: 'Badges', icon: <Award size={16}/> },
        { id: 'templates' as Section, name: 'Templates', icon: <Grid3X3 size={16}/> },
      ],
    },
    {
      label: 'Content',
      open: contentOpen,
      toggle: () => setContentOpen(v => !v),
      items: [
        { id: 'links' as Section, name: 'Links', icon: <Link2 size={16}/> },
        { id: 'assets' as Section, name: 'Assets', icon: <FolderOpen size={16}/> },
      ],
    },
    {
      label: 'Account',
      open: accountOpen,
      toggle: () => setAccountOpen(v => !v),
      items: [
        { id: 'settings' as Section, name: 'Settings', icon: <Settings size={16}/> },
        { id: 'notifications' as Section, name: 'Notifications', icon: <Bell size={16}/> },
        { id: 'premium' as Section, name: 'Premium', icon: <Crown size={16}/> },
      ],
    },
  ]

  // Filter nav items by search
  const filteredNav = NAV_SECTIONS.map(group => ({
    ...group,
    items: sidebarSearch
      ? group.items.filter(i => i.name.toLowerCase().includes(sidebarSearch.toLowerCase()))
      : group.items,
  })).filter(g => g.items.length > 0)

  // ═══════════════════════════════════════
  // HELPERS
  // ═══════════════════════════════════════

  const SectionHeader = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="hg-section-header">
      <span className="hg-section-icon">{icon}</span>
      <span>{label}</span>
    </div>
  )

  const SaveButton = () => (
    <div className="hg-save-bar">
      <button className="hg-btn-primary hg-save-btn" onClick={()=>save()} disabled={saving}>
        {saved ? <><Check size={14}/> Saved</> : saving ? <><span className="hg-spinner"/> Saving...</> : 'Save Changes'}
      </button>
    </div>
  )

  // ═══════════════════════════════════════
  // LOADING
  // ═══════════════════════════════════════

  if (loading) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0a0a0a',color:'#555',fontSize:13,fontFamily:'Inter,sans-serif'}}>
      <span className="hg-spinner" style={{marginRight:8}}/> Loading...
    </div>
  )

  // ═══════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════

  return (
    <div className="hg-wrap">
      {/* ═══ SIDEBAR ═══ */}
      <aside className={`hg-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Logo */}
        <Link href="/" className="hg-logo">
          <Image src="/needle-logo.png" alt="" width={24} height={24} style={{objectFit:'contain',filter:'brightness(1.2)'}}/>
          <span className="hg-logo-text">obsidian</span>
        </Link>

        {/* Search */}
        <div className="hg-search">
          <Search size={14} className="hg-search-icon"/>
          <input
            placeholder="Search..."
            value={sidebarSearch}
            onChange={e => setSidebarSearch(e.target.value)}
            className="hg-search-input"
          />
        </div>

        {/* AI Assistant Button */}
        <button className="hg-ai-btn">
          <Wand2 size={14}/>
          <span>AI Assistant</span>
        </button>

        {/* Nav */}
        <nav className="hg-nav">
          {filteredNav.map(group => (
            <div key={group.label} className="hg-nav-group">
              <button className="hg-nav-group-label" onClick={group.toggle}>
                {group.open ? <ChevronDown size={12}/> : <ChevronRight size={12}/>}
                <span>{group.label}</span>
              </button>
              {(group.open || sidebarSearch) && group.items.map(item => (
                <button
                  key={item.id}
                  className={`hg-nav-item ${section===item.id ? 'active' : ''}`}
                  onClick={() => { setSection(item.id); setMobileMenuOpen(false) }}
                >
                  <span className="hg-nav-icon">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          ))}

          {/* Admin */}
          {isAdmin && (
            <div className="hg-nav-group">
              <button className="hg-nav-group-label" onClick={() => setAdminOpen(v=>!v)}>
                {adminOpen ? <ChevronDown size={12}/> : <ChevronRight size={12}/>}
                <span>Admin</span>
                <span className="hg-admin-badge">ADMIN</span>
              </button>
              {adminOpen && (
                <>
                  {([
                    { id: 'admin-users' as Section, name: 'Users', icon: <Users size={16}/> },
                    { id: 'admin-invites' as Section, name: 'Invites', icon: <Gift size={16}/> },
                    { id: 'admin-blacklist' as Section, name: 'Blacklist', icon: <Shield size={16}/> },
                  ]).map(item => (
                    <button
                      key={item.id}
                      className={`hg-nav-item ${section===item.id ? 'active' : ''}`}
                      onClick={() => { setSection(item.id); setMobileMenuOpen(false) }}
                    >
                      <span className="hg-nav-icon">{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </nav>

        {/* Bottom */}
        <div className="hg-sidebar-bottom">
          <div className="hg-bottom-icons">
            <a href={`/${profile?.username}`} target="_blank" title="View Profile" className="hg-bottom-icon-btn">
              <ExternalLink size={16}/>
            </a>
            <button className="hg-bottom-icon-btn" title="Apps" onClick={() => setSection('assets')}>
              <LayoutGrid size={16}/>
            </button>
            <button className="hg-bottom-icon-btn hg-status-online" title="Online">
              <span className="hg-green-dot"/>
            </button>
            <button className="hg-bottom-icon-btn" title="Share" onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/${profile?.username}`)
              flash('Link copied!')
            }}>
              <Share2 size={16}/>
            </button>
          </div>
          <div className="hg-user-card">
            <div className="hg-user-avatar">
              {avatarUrl
                ? <img src={avatarUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}}/>
                : <span>{profile?.username?.[0]?.toUpperCase()}</span>
              }
            </div>
            <div className="hg-user-info">
              <div className="hg-user-name">{profile?.username}</div>
              <div className="hg-user-uid">UID {(profile?.id||'').slice(0,8).toUpperCase()}</div>
            </div>
            <button className="hg-user-logout" title="Sign out" onClick={()=>{supabase.auth.signOut();router.push('/')}}>
              <LogOut size={14}/>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile hamburger */}
      <button className="hg-mobile-toggle" onClick={() => setMobileMenuOpen(v=>!v)}>
        {mobileMenuOpen ? <X size={20}/> : <LayoutGrid size={20}/>}
      </button>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="hg-main">
        {/* Top bar */}
        <div className="hg-topbar">
          <div className="hg-breadcrumb">
            {(BREADCRUMBS[section] || []).map((crumb, i, arr) => (
              <span key={i}>
                <span className={i === arr.length - 1 ? 'hg-bc-active' : 'hg-bc-dim'}>{crumb}</span>
                {i < arr.length - 1 && <span className="hg-bc-sep">/</span>}
              </span>
            ))}
          </div>
          <button className="hg-bell-btn" onClick={() => setSection('notifications')}>
            <Bell size={18}/>
          </button>
        </div>

        {/* Flash message */}
        {msg && <div className="hg-flash">{msg}</div>}

        {/* ═══════════════════════════════════
            1. OVERVIEW
        ═══════════════════════════════════ */}
        {section === 'overview' && (
          <div className="hg-page">
            <h1 className="hg-page-title">Overview</h1>

            {/* Stat cards */}
            <div className="hg-stats-row">
              {[
                { label: 'Username', value: `@${profile?.username}`, icon: <User size={18}/> },
                { label: 'UID', value: (profile?.id||'').slice(0,8).toUpperCase(), icon: <Hash size={18}/> },
                { label: 'Profile Views', value: String(profile?.view_count||0), icon: <Eye size={18}/> },
                { label: 'Link Clicks', value: String(totalClicks), icon: <Link2 size={18}/> },
                { label: 'Visitors Today', value: '0', icon: <BarChart3 size={18}/> },
              ].map(s => (
                <div key={s.label} className="hg-stat-card">
                  <div className="hg-stat-icon">{s.icon}</div>
                  <div className="hg-stat-value">{s.value}</div>
                  <div className="hg-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Analytics Chart */}
            <div className="hg-card" style={{marginTop:20}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
                <h3 className="hg-card-title">Analytics</h3>
                <div style={{display:'flex',gap:6,alignItems:'center'}}>
                  {(['24h','7d','14d','30d','all'] as const).map(r => (
                    <button key={r} className={`hg-pill ${analyticsRange===r?'active':''}`} onClick={()=>setAnalyticsRange(r)}>
                      {r === 'all' ? 'All' : r}
                    </button>
                  ))}
                  <span style={{width:1,height:16,background:'#2a1520',margin:'0 4px'}}/>
                  <button className={`hg-pill ${!analyticsCumulative?'active':''}`} onClick={()=>setAnalyticsCumulative(false)}>Daily</button>
                  <button className={`hg-pill ${analyticsCumulative?'active':''}`} onClick={()=>setAnalyticsCumulative(true)}>Cumulative</button>
                </div>
              </div>
              <div style={{width:'100%',height:260}}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e91e8c" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#e91e8c" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#555" fontSize={11} tickLine={false} axisLine={false}/>
                    <YAxis stroke="#555" fontSize={11} tickLine={false} axisLine={false}/>
                    <Tooltip
                      contentStyle={{background:'#110d10',border:'1px solid #2a1520',borderRadius:8,fontSize:12,color:'#fff'}}
                    />
                    <Area type="monotone" dataKey="views" stroke="#e91e8c" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Second row: Devices, Countries, Top Links */}
            <div className="hg-grid-3" style={{marginTop:20}}>
              {/* Visitor Devices */}
              <div className="hg-card">
                <h3 className="hg-card-title">Visitor Devices</h3>
                <div style={{display:'flex',justifyContent:'center',padding:'16px 0'}}>
                  <PieChart width={160} height={160}>
                    <Pie data={deviceData} cx={80} cy={80} innerRadius={50} outerRadius={70} dataKey="value" stroke="none">
                      {deviceData.map((entry, i) => <Cell key={i} fill={entry.color}/>)}
                    </Pie>
                  </PieChart>
                </div>
                <div style={{display:'flex',justifyContent:'center',gap:16}}>
                  {deviceData.map(d => (
                    <span key={d.name} style={{fontSize:11,color:'#888',display:'flex',alignItems:'center',gap:4}}>
                      <span style={{width:8,height:8,borderRadius:'50%',background:d.color}}/>
                      {d.name} {d.value}%
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Countries */}
              <div className="hg-card">
                <h3 className="hg-card-title">Top Countries</h3>
                <div style={{display:'flex',flexDirection:'column',gap:10,paddingTop:12}}>
                  {[
                    { country: 'United States', pct: 45 },
                    { country: 'United Kingdom', pct: 18 },
                    { country: 'Germany', pct: 12 },
                    { country: 'Canada', pct: 8 },
                    { country: 'Other', pct: 17 },
                  ].map(c => (
                    <div key={c.country}>
                      <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:4}}>
                        <span style={{color:'#fff'}}>{c.country}</span>
                        <span style={{color:'#888'}}>{c.pct}%</span>
                      </div>
                      <div style={{height:4,borderRadius:2,background:'#1a1020'}}>
                        <div style={{height:'100%',borderRadius:2,background:'#e91e8c',width:`${c.pct}%`,transition:'width 0.3s'}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Clicked Links */}
              <div className="hg-card">
                <h3 className="hg-card-title">Top Clicked Links</h3>
                <div style={{display:'flex',flexDirection:'column',gap:8,paddingTop:12}}>
                  {links.filter(l => (l.clicks||0) > 0).sort((a,b) => (b.clicks||0) - (a.clicks||0)).slice(0,5).map(l => (
                    <div key={l.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'1px solid #1a1020'}}>
                      <span style={{color:'#888'}}>{SOCIAL_ICON_MAP[l.icon] || <Link2 size={14}/>}</span>
                      <span style={{flex:1,fontSize:13,color:'#fff'}}>{l.label || l.url}</span>
                      <span style={{fontSize:12,color:'#e91e8c',fontWeight:600}}>{l.clicks}</span>
                    </div>
                  ))}
                  {links.filter(l => (l.clicks||0) > 0).length === 0 && (
                    <p style={{textAlign:'center',color:'#555',fontSize:13,padding:'20px 0'}}>No click data yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Feedback */}
            <div className="hg-card" style={{marginTop:20}}>
              <h3 className="hg-card-title">Profile Feedback</h3>
              <div style={{display:'flex',alignItems:'center',gap:24,padding:'16px 0'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:24}}>&#128077;</span>
                  <span style={{fontSize:20,fontWeight:700,color:'#fff'}}>0</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:24}}>&#128078;</span>
                  <span style={{fontSize:20,fontWeight:700,color:'#fff'}}>0</span>
                </div>
              </div>
              <p style={{fontSize:13,color:'#555'}}>No feedback comments yet.</p>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════
            2. CUSTOMIZE
        ═══════════════════════════════════ */}
        {section === 'customize' && (
          <div className="hg-page">
            <h1 className="hg-page-title">Customize</h1>

            {/* Upload Manager Cards */}
            <div className="hg-grid-4" style={{marginBottom:24}}>
              {[
                { label: 'Avatar', preview: avatarUrl, bucket: 'media', path: `avatars/${profile?.id}`, accept: 'image/*', maxMB: 2, set: setAvatarUrl },
                { label: 'Background', preview: bgValue.startsWith('http') ? bgValue : '', bucket: 'media', path: `backgrounds/${profile?.id}`, accept: 'image/*', maxMB: 5, set: (url: string) => { setBgType('image'); setBgValue(url) } },
                { label: 'Audio', preview: musicFileUrl, bucket: 'media', path: `audio/${profile?.id}`, accept: 'audio/mpeg,audio/wav,audio/ogg,audio/mp3', maxMB: 15, set: (url: string) => { setMusicFileUrl(url); setMusicUrl(url); setMusicType('upload') }, previewType: 'audio' as const },
                { label: 'Cursor', preview: customCursor, bucket: 'media', path: `cursors/${profile?.id}`, accept: 'image/png,image/x-icon,.cur', maxMB: 1, set: setCustomCursor },
              ].map(item => (
                <div key={item.label} className="hg-card" style={{padding:16}}>
                  <div style={{fontSize:13,fontWeight:600,color:'#fff',marginBottom:10}}>{item.label}</div>
                  {item.preview && item.label !== 'Audio' && item.label !== 'Cursor' && (
                    <div style={{width:'100%',height:80,borderRadius:6,overflow:'hidden',marginBottom:8,background:'#1a1020'}}>
                      <img src={item.preview} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                    </div>
                  )}
                  {item.preview && item.label === 'Audio' && (
                    <audio controls src={item.preview} style={{width:'100%',marginBottom:8,borderRadius:6,height:32}}/>
                  )}
                  {profile && <FileUpload
                    bucket={item.bucket}
                    path={item.path}
                    accept={item.accept}
                    maxSizeMB={item.maxMB}
                    maxDurationSec={item.label === 'Audio' ? 300 : undefined}
                    label={`Upload ${item.label}`}
                    onUpload={item.set}
                  />}
                </div>
              ))}
            </div>

            {/* General */}
            <SectionHeader icon={<User size={14}/>} label="GENERAL"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div className="hg-field">
                <label>Display Name</label>
                <input className="hg-input" value={displayName} onChange={e=>setDisplayName(e.target.value)} maxLength={32}/>
              </div>
              <div className="hg-field">
                <label>Bio</label>
                <textarea className="hg-input" value={bio} onChange={e=>setBio(e.target.value)} rows={3} maxLength={160} style={{resize:'none'}}/>
                <span className="hg-char-count">{bio.length}/160</span>
              </div>
              <div className="hg-field-row">
                <div className="hg-field" style={{flex:1}}>
                  <label>Pronouns</label>
                  <select className="hg-input" value={['he/him','she/her','they/them','ze/zir',''].includes(pronouns)?pronouns:'custom'} onChange={e=>{
                    if(e.target.value==='custom') setPronouns('')
                    else setPronouns(e.target.value)
                  }}>
                    <option value="">Not set</option>
                    <option value="he/him">he/him</option>
                    <option value="she/her">she/her</option>
                    <option value="they/them">they/them</option>
                    <option value="ze/zir">ze/zir</option>
                    <option value="custom">Custom...</option>
                  </select>
                </div>
                {!['he/him','she/her','they/them','ze/zir',''].includes(pronouns) && (
                  <div className="hg-field" style={{flex:1}}>
                    <label>Custom</label>
                    <input className="hg-input" value={pronouns} onChange={e=>setPronouns(e.target.value)} placeholder="Custom pronouns"/>
                  </div>
                )}
              </div>
              <div className="hg-field-row">
                <div className="hg-field" style={{flex:1}}>
                  <label>Location</label>
                  <input className="hg-input" value={location} onChange={e=>setLocation(e.target.value)} placeholder="City, Country"/>
                </div>
                <div className="hg-field" style={{flex:1}}>
                  <label>Website</label>
                  <input className="hg-input" value={website} onChange={e=>setWebsite(e.target.value)} placeholder="https://yoursite.com"/>
                </div>
              </div>
              <div className="hg-field">
                <label>Tagline</label>
                <input className="hg-input" value={tagline} onChange={e=>setTagline(e.target.value)} placeholder="A short catchy line..." maxLength={80}/>
              </div>
              <div className="hg-field-row">
                <div className="hg-field" style={{flex:1}}>
                  <label>Birthday</label>
                  <input className="hg-input" type="date" value={birthday} onChange={e=>setBirthday(e.target.value)}/>
                </div>
                <div className="hg-field" style={{flex:1}}>
                  <label>Availability</label>
                  <select className="hg-input" value={availStatus} onChange={e=>setAvailStatus(e.target.value as Profile['availability_status'])}>
                    {AVAIL_STATUSES.map(s=><option key={s||'none'} value={s}>{s?s.charAt(0).toUpperCase()+s.slice(1):'Hidden'}</option>)}
                  </select>
                </div>
              </div>
              <div className="hg-field">
                <label>Current Status</label>
                <input className="hg-input" value={currentStatus} onChange={e=>setCurrentStatus(e.target.value)} placeholder="What are you up to?" maxLength={60}/>
              </div>
            </div>

            {/* Color */}
            <SectionHeader icon={<Palette size={14}/>} label="COLOR"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div className="hg-field">
                <label>Accent Color</label>
                <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center'}}>
                  {ACCENT_PRESETS.map(c=>(
                    <button key={c} className={`hg-swatch ${accent===c?'active':''}`} style={{background:c}} onClick={()=>setAccent(c)}/>
                  ))}
                  <input type="color" value={accent} onChange={e=>setAccent(e.target.value)} className="hg-color-input"/>
                </div>
              </div>
              <div className="hg-field">
                <label>Background Type</label>
                <div style={{display:'flex',gap:8}}>
                  {(['color','gradient','image','animated'] as Profile['background_type'][]).map(t=>(
                    <button key={t} className={`hg-pill ${bgType===t?'active':''}`} onClick={()=>setBgType(t)} style={{flex:1}}>
                      {t.charAt(0).toUpperCase()+t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {bgType === 'color' && (
                <div className="hg-field">
                  <label>Background Color</label>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center'}}>
                    {BG_PRESETS.map(c=>(
                      <button key={c} className={`hg-swatch ${bgValue===c?'active':''}`} style={{background:c}} onClick={()=>setBgValue(c)}/>
                    ))}
                    <input type="color" value={bgValue.startsWith('#')?bgValue:'#0a0a0a'} onChange={e=>setBgValue(e.target.value)} className="hg-color-input"/>
                  </div>
                </div>
              )}
              {bgType === 'gradient' && (
                <>
                  <div className="hg-field-row">
                    <div className="hg-field" style={{flex:1}}>
                      <label>From</label>
                      <div style={{display:'flex',gap:8,alignItems:'center'}}>
                        <input type="color" value={gradientFrom} onChange={e=>setGradientFrom(e.target.value)} className="hg-color-input"/>
                        <input className="hg-input" value={gradientFrom} onChange={e=>setGradientFrom(e.target.value)} style={{flex:1}}/>
                      </div>
                    </div>
                    <div className="hg-field" style={{flex:1}}>
                      <label>To</label>
                      <div style={{display:'flex',gap:8,alignItems:'center'}}>
                        <input type="color" value={gradientTo} onChange={e=>setGradientTo(e.target.value)} className="hg-color-input"/>
                        <input className="hg-input" value={gradientTo} onChange={e=>setGradientTo(e.target.value)} style={{flex:1}}/>
                      </div>
                    </div>
                  </div>
                  <div className="hg-field">
                    <label>Direction</label>
                    <select className="hg-input" value={gradientDir} onChange={e=>setGradientDir(e.target.value)}>
                      <option value="45">45deg</option><option value="90">90deg</option>
                      <option value="135">135deg</option><option value="180">180deg</option>
                    </select>
                  </div>
                  <div style={{height:40,borderRadius:8,background:`linear-gradient(${gradientDir}deg, ${gradientFrom}, ${gradientTo})`,border:'1px solid #2a1520'}}/>
                </>
              )}
              {bgType === 'image' && (
                <>
                  {profile && <FileUpload bucket="media" path={`backgrounds/${profile.id}`} accept="image/*" maxSizeMB={5}
                    label="Upload Background Image" preview={bgValue.startsWith('http') ? bgValue : ''} previewType="image"
                    onUpload={(url) => setBgValue(url)} />}
                  <div className="hg-field" style={{marginTop:8}}>
                    <label>Or paste URL</label>
                    <input className="hg-input" value={bgValue} onChange={e=>setBgValue(e.target.value)} placeholder="https://..."/>
                  </div>
                  <div className="hg-field">
                    <label>Blur ({blurAmount}px)</label>
                    <input type="range" className="hg-range" min={0} max={20} value={blurAmount} onChange={e=>setBlurAmount(Number(e.target.value))}/>
                  </div>
                  <div className="hg-field">
                    <label>Overlay Opacity ({overlayOpacity}%)</label>
                    <input type="range" className="hg-range" min={0} max={80} value={overlayOpacity} onChange={e=>setOverlayOpacity(Number(e.target.value))}/>
                  </div>
                </>
              )}
            </div>

            {/* Animated Background */}
            {bgType === 'animated' && (
              <>
                <SectionHeader icon={<Sparkles size={14}/>} label="ANIMATED BACKGROUND"/>
                <div className="hg-card" style={{marginBottom:20}}>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
                    {ANIMATED_BG_OPTIONS.map(s=>(
                      <button key={s.id} className={`hg-pill ${animatedBgStyle===s.id?'active':''}`}
                        onClick={()=>setAnimatedBgStyle(s.id)} style={{padding:'14px 10px',textAlign:'center'}}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Typography */}
            <SectionHeader icon={<Type size={14}/>} label="TYPOGRAPHY"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {FONTS.map(f=>(
                  <button key={f} className={`hg-pill ${font===f?'active':''}`} onClick={()=>setFont(f)} style={{fontFamily:FONT_FAMILY_MAP[f]||f}}>
                    {f.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Border */}
            <SectionHeader icon={<Frame size={14}/>} label="BORDER"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div className="hg-field">
                <label>Card Border Style</label>
                <div style={{display:'flex',gap:8}}>
                  {(['none','subtle','accent','glow'] as const).map(b=>(
                    <button key={b} className={`hg-pill ${cardBorder===b?'active':''}`} onClick={()=>setCardBorder(b)} style={{flex:1}}>{b.charAt(0).toUpperCase()+b.slice(1)}</button>
                  ))}
                </div>
              </div>
              <div className="hg-field">
                <label>Button Style</label>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
                  {BTN_STYLES.map(s=>(
                    <button key={s} className={`hg-pill ${btnStyle===s?'active':''}`} onClick={()=>setBtnStyle(s)}>{s.charAt(0).toUpperCase()+s.slice(1).replace('-',' ')}</button>
                  ))}
                </div>
              </div>
              <div className="hg-field">
                <label>Button Shape</label>
                <div style={{display:'flex',gap:8}}>
                  {BTN_SHAPES.map(s=>(
                    <button key={s} className={`hg-pill ${btnShape===s?'active':''}`} onClick={()=>setBtnShape(s)} style={{flex:1}}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
                  ))}
                </div>
              </div>
              <div className="hg-field">
                <label>Button Width</label>
                <div style={{display:'flex',gap:8}}>
                  {(['auto','full'] as const).map(w=>(
                    <button key={w} className={`hg-pill ${buttonWidth===w?'active':''}`} onClick={()=>setButtonWidth(w)} style={{flex:1}}>{w==='auto'?'Auto':'Full Width'}</button>
                  ))}
                </div>
              </div>
              <div className="hg-field">
                <label>Hover Effect</label>
                <div style={{display:'flex',gap:8}}>
                  {HOVER_EFFECTS.map(s=>(
                    <button key={s} className={`hg-pill ${hoverEffect===s?'active':''}`} onClick={()=>setHoverEffect(s)} style={{flex:1}}>{s==='none'?'None':s.charAt(0).toUpperCase()+s.slice(1)}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Avatar */}
            <SectionHeader icon={<User size={14}/>} label="AVATAR"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div className="hg-field">
                <label>Shape</label>
                <div style={{display:'flex',gap:8}}>
                  {AVATAR_SHAPES.map(s=>(
                    <button key={s} className={`hg-pill ${avatarShape===s?'active':''}`} onClick={()=>setAvatarShape(s)} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:6,padding:'12px'}}>
                      <div style={{width:24,height:24,background:'#e91e8c',opacity:0.5,borderRadius:s==='circle'?'50%':s==='squircle'?'30%':'4px'}}/>
                      {s.charAt(0).toUpperCase()+s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="hg-field">
                <label>Border Type</label>
                <div style={{display:'flex',gap:8}}>
                  {(['none','solid','glow','gradient'] as const).map(b=>(
                    <button key={b} className={`hg-pill ${avatarBorderType===b?'active':''}`} onClick={()=>setAvatarBorderType(b)} style={{flex:1}}>{b.charAt(0).toUpperCase()+b.slice(1)}</button>
                  ))}
                </div>
              </div>
              <div className="hg-toggle-row">
                <div>
                  <div className="hg-toggle-label">Glow Effect</div>
                  <div className="hg-toggle-desc">Add a glow around your avatar</div>
                </div>
                <button className={`hg-toggle ${avatarGlow?'on':''}`} onClick={()=>setAvatarGlow(v=>!v)}><span className="hg-toggle-thumb"/></button>
              </div>
              <div className="hg-field">
                <label>Size</label>
                <div style={{display:'flex',gap:8}}>
                  {(['small','medium','large'] as const).map(s=>(
                    <button key={s} className={`hg-pill ${avatarSize===s?'active':''}`} onClick={()=>setAvatarSize(s)} style={{flex:1}}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Effects */}
            <SectionHeader icon={<Sparkles size={14}/>} label="EFFECTS"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div className="hg-toggle-row">
                <div>
                  <div className="hg-toggle-label">Text Shadow</div>
                </div>
                <button className={`hg-toggle ${textShadow?'on':''}`} onClick={()=>setTextShadow(v=>!v)}><span className="hg-toggle-thumb"/></button>
              </div>
              <div className="hg-toggle-row">
                <div>
                  <div className="hg-toggle-label">Glassmorphism</div>
                </div>
                <button className={`hg-toggle ${glassmorphism?'on':''}`} onClick={()=>setGlassmorphism(v=>!v)}><span className="hg-toggle-thumb"/></button>
              </div>
              {glassmorphism && (
                <div className="hg-field">
                  <label>Blur Amount ({blurAmount}px)</label>
                  <input type="range" className="hg-range" min={0} max={20} value={blurAmount} onChange={e=>setBlurAmount(Number(e.target.value))}/>
                </div>
              )}
              <div className="hg-field">
                <label>Overlay Opacity ({overlayOpacity}%)</label>
                <input type="range" className="hg-range" min={0} max={80} value={overlayOpacity} onChange={e=>setOverlayOpacity(Number(e.target.value))}/>
              </div>
            </div>

            {/* Layout */}
            <SectionHeader icon={<Layers size={14}/>} label="LAYOUT"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div className="hg-field">
                <label>Layout Mode</label>
                <div style={{display:'flex',gap:8}}>
                  {LAYOUT_MODES.map(m=>(
                    <button key={m} className={`hg-pill ${layoutMode===m?'active':''}`} onClick={()=>setLayoutMode(m)} style={{flex:1}}>{m.charAt(0).toUpperCase()+m.slice(1)}</button>
                  ))}
                </div>
              </div>
              <div className="hg-field">
                <label>Animation Type</label>
                <div style={{display:'flex',gap:8}}>
                  {ANIMATIONS.map(a=>(
                    <button key={a} className={`hg-pill ${animationType===a?'active':''}`} onClick={()=>setAnimationType(a)} style={{flex:1}}>
                      {a==='none'?'None':a.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* About Me */}
            <SectionHeader icon={<FileText size={14}/>} label="ABOUT ME"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div className="hg-field">
                <div style={{display:'flex',gap:6,marginBottom:8}}>
                  <button className="hg-toolbar-btn" title="Bold"><Bold size={14}/></button>
                  <button className="hg-toolbar-btn" title="Italic"><Italic size={14}/></button>
                </div>
                <textarea className="hg-input" value={bio} onChange={e=>setBio(e.target.value)} rows={4} maxLength={160} style={{resize:'none'}}/>
                <span className="hg-char-count">{bio.length}/160</span>
              </div>
            </div>

            {/* Cursor */}
            <SectionHeader icon={<MousePointer2 size={14}/>} label="CURSOR"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div className="hg-field">
                <label>Custom Cursor URL</label>
                <input className="hg-input" value={customCursor} onChange={e=>setCustomCursor(e.target.value)} placeholder="https://... (.png or .cur)"/>
              </div>
            </div>

            {/* Music */}
            <SectionHeader icon={<Music size={14}/>} label="MUSIC"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div className="hg-field">
                <label>Platform</label>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {([
                    {type:'spotify' as const, icon:<SpotifyLogo size={14} weight="fill"/>, label:'Spotify'},
                    {type:'youtube' as const, icon:<YoutubeLogo size={14} weight="fill"/>, label:'YouTube'},
                    {type:'soundcloud' as const, icon:<SoundcloudLogo size={14} weight="fill"/>, label:'SoundCloud'},
                    {type:'apple-music' as const, icon:<AppleLogo size={14} weight="fill"/>, label:'Apple Music'},
                    {type:'upload' as const, icon:<MusicNote size={14} weight="fill"/>, label:'Upload'},
                    {type:null, icon:null, label:'None'},
                  ] as {type: Profile['music_type']; icon: React.ReactNode; label: string}[]).map(t=>(
                    <button key={String(t.type)} className={`hg-pill ${musicType===t.type?'active':''}`} onClick={()=>setMusicType(t.type)} style={{display:'flex',alignItems:'center',gap:4}}>
                      {t.icon}{t.label}
                    </button>
                  ))}
                </div>
              </div>
              {musicType && musicType !== 'upload' && (
                <div className="hg-field">
                  <label>Music URL</label>
                  <input className="hg-input" value={musicUrl} onChange={e=>setMusicUrl(e.target.value)} placeholder="Paste music URL..."/>
                </div>
              )}
              {musicType === 'upload' && profile && (
                <FileUpload bucket="media" path={`audio/${profile.id}`} accept="audio/mpeg,audio/wav,audio/ogg,audio/mp3" maxSizeMB={15} maxDurationSec={300}
                  label="Upload Audio (MP3/WAV/OGG, max 5 min)" preview={musicFileUrl} previewType="audio"
                  onUpload={(url) => { setMusicFileUrl(url); setMusicUrl(url) }} />
              )}
              <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
                <div className="hg-toggle-row" style={{flex:1}}>
                  <span style={{fontSize:13,color:'#fff'}}>Autoplay</span>
                  <button className={`hg-toggle ${musicAutoplay?'on':''}`} onClick={()=>setMusicAutoplay(v=>!v)}><span className="hg-toggle-thumb"/></button>
                </div>
                <div className="hg-toggle-row" style={{flex:1}}>
                  <span style={{fontSize:13,color:'#fff'}}>Loop</span>
                  <button className={`hg-toggle ${musicLoop?'on':''}`} onClick={()=>setMusicLoop(v=>!v)}><span className="hg-toggle-thumb"/></button>
                </div>
              </div>
              <div className="hg-field">
                <label>Volume ({musicVolume}%)</label>
                <input type="range" className="hg-range" min={0} max={100} value={musicVolume} onChange={e=>setMusicVolume(Number(e.target.value))}/>
              </div>
              <div className="hg-field">
                <label>Player Style</label>
                <div style={{display:'flex',gap:8}}>
                  {PLAYER_STYLES.map(s=>(
                    <button key={s} className={`hg-pill ${playerStyle===s?'active':''}`} onClick={()=>setPlayerStyle(s)} style={{flex:1}}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Widgets */}
            <SectionHeader icon={<LayoutGrid size={14}/>} label="WIDGETS"/>
            <div className="hg-card" style={{marginBottom:20}}>
              {/* Announcement */}
              <div className="hg-widget-row">
                <div className="hg-widget-header" onClick={()=>setAnnouncementEnabled(v=>!v)}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <Megaphone size={16} style={{color:'#e91e8c'}}/>
                    <span style={{fontWeight:600,color:'#fff'}}>Announcement Banner</span>
                  </div>
                  <button className={`hg-toggle ${announcementEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setAnnouncementEnabled(v=>!v)}}><span className="hg-toggle-thumb"/></button>
                </div>
                {announcementEnabled && (
                  <div style={{paddingTop:12}}>
                    <div className="hg-field">
                      <label>Text</label>
                      <input className="hg-input" value={announcement} onChange={e=>setAnnouncement(e.target.value)} maxLength={120} placeholder="New merch dropping soon!"/>
                    </div>
                    <div className="hg-field">
                      <label>Color</label>
                      <div style={{display:'flex',gap:6}}>
                        {[{id:'purple',c:'#a78bfa'},{id:'blue',c:'#60a5fa'},{id:'green',c:'#4ade80'},{id:'red',c:'#f87171'},{id:'orange',c:'#fb923c'},{id:'pink',c:'#f472b6'}].map(c=>(
                          <button key={c.id} className={`hg-swatch ${announcementColor===c.id?'active':''}`} style={{background:c.c}} onClick={()=>setAnnouncementColor(c.id)}/>
                        ))}
                      </div>
                    </div>
                    <div className="hg-field">
                      <label>Icon</label>
                      <div style={{display:'flex',gap:6}}>
                        {[{id:'info',icon:<Info size={14}/>},{id:'warning',icon:<AlertTriangle size={14}/>},{id:'star',icon:<StarIcon size={14}/>},{id:'megaphone',icon:<Megaphone size={14}/>}].map(i=>(
                          <button key={i.id} className={`hg-pill ${announcementIcon===i.id?'active':''}`} onClick={()=>setAnnouncementIcon(i.id)} style={{display:'flex',alignItems:'center',gap:4}}>{i.icon}{i.id}</button>
                        ))}
                      </div>
                    </div>
                    <div className="hg-field-row">
                      <div className="hg-field" style={{flex:1}}>
                        <label>Font Size</label>
                        <div style={{display:'flex',gap:6}}>
                          {(['small','medium','large','xl'] as const).map(s=>(
                            <button key={s} className={`hg-pill ${announcementFontSize===s?'active':''}`} onClick={()=>setAnnouncementFontSize(s)} style={{flex:1}}>{s==='xl'?'XL':s.charAt(0).toUpperCase()+s.slice(1)}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hg-field">
                      <label>Border</label>
                      <div style={{display:'flex',gap:6}}>
                        {(['none','solid','dashed','glowing'] as const).map(b=>(
                          <button key={b} className={`hg-pill ${announcementBorder===b?'active':''}`} onClick={()=>setAnnouncementBorder(b)} style={{flex:1}}>{b.charAt(0).toUpperCase()+b.slice(1)}</button>
                        ))}
                      </div>
                    </div>
                    <div className="hg-field">
                      <label>Position</label>
                      <div style={{display:'flex',gap:6}}>
                        {([{id:'top' as const,label:'Top'},{id:'above-links' as const,label:'Above Links'},{id:'below-links' as const,label:'Below Links'}]).map(p=>(
                          <button key={p.id} className={`hg-pill ${announcementPosition===p.id?'active':''}`} onClick={()=>setAnnouncementPosition(p.id)} style={{flex:1}}>{p.label}</button>
                        ))}
                      </div>
                    </div>
                    <div className="hg-toggle-row">
                      <span style={{fontSize:13,color:'#fff'}}>Dismissable</span>
                      <button className={`hg-toggle ${announcementDismissable?'on':''}`} onClick={()=>setAnnouncementDismissable(v=>!v)}><span className="hg-toggle-thumb"/></button>
                    </div>
                    <div className="hg-field">
                      <label>Expiry Date (optional)</label>
                      <input className="hg-input" type="datetime-local" value={announcementExpiry} onChange={e=>setAnnouncementExpiry(e.target.value)}/>
                    </div>
                  </div>
                )}
              </div>

              {/* Countdown */}
              <div className="hg-widget-row" style={{marginTop:12}}>
                <div className="hg-widget-header" onClick={()=>setCountdownEnabled(v=>!v)}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <Timer size={16} style={{color:'#e91e8c'}}/>
                    <span style={{fontWeight:600,color:'#fff'}}>Countdown Timer</span>
                  </div>
                  <button className={`hg-toggle ${countdownEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setCountdownEnabled(v=>!v)}}><span className="hg-toggle-thumb"/></button>
                </div>
                {countdownEnabled && (
                  <div style={{paddingTop:12}}>
                    <div className="hg-field-row">
                      <div className="hg-field" style={{flex:1}}>
                        <label>Label</label>
                        <input className="hg-input" value={countdownLabel} onChange={e=>setCountdownLabel(e.target.value)} placeholder="Launch day"/>
                      </div>
                      <div className="hg-field" style={{flex:1}}>
                        <label>Date & Time</label>
                        <input className="hg-input" type="datetime-local" value={countdownDate} onChange={e=>setCountdownDate(e.target.value)}/>
                      </div>
                    </div>
                    <div className="hg-field">
                      <label>Style</label>
                      <div style={{display:'flex',gap:6}}>
                        {(['minimal','card','glowing'] as const).map(s=>(
                          <button key={s} className={`hg-pill ${countdownStyle===s?'active':''}`} onClick={()=>setCountdownStyle(s)} style={{flex:1}}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Currently Playing */}
              <div className="hg-widget-row" style={{marginTop:12}}>
                <div className="hg-widget-header" onClick={()=>setCurrentlyPlayingEnabled(v=>!v)}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <GameController size={16} weight="fill" style={{color:'#e91e8c'}}/>
                    <span style={{fontWeight:600,color:'#fff'}}>Currently Playing</span>
                  </div>
                  <button className={`hg-toggle ${currentlyPlayingEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setCurrentlyPlayingEnabled(v=>!v)}}><span className="hg-toggle-thumb"/></button>
                </div>
                {currentlyPlayingEnabled && (
                  <div style={{paddingTop:12}}>
                    <div className="hg-field">
                      <label>What are you playing?</label>
                      <input className="hg-input" value={currentlyPlaying} onChange={e=>setCurrentlyPlaying(e.target.value)} placeholder="Valorant, Minecraft..." maxLength={60}/>
                    </div>
                  </div>
                )}
              </div>

              {/* Custom Text */}
              <div className="hg-widget-row" style={{marginTop:12}}>
                <div className="hg-widget-header" onClick={()=>setCustomTextEnabled(v=>!v)}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <ChatText size={16} style={{color:'#e91e8c'}}/>
                    <span style={{fontWeight:600,color:'#fff'}}>Custom Text Block</span>
                  </div>
                  <button className={`hg-toggle ${customTextEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setCustomTextEnabled(v=>!v)}}><span className="hg-toggle-thumb"/></button>
                </div>
                {customTextEnabled && (
                  <div style={{paddingTop:12}}>
                    <div className="hg-field">
                      <label>Text</label>
                      <textarea className="hg-input" value={customText} onChange={e=>setCustomText(e.target.value)} rows={3} style={{resize:'none'}} maxLength={500}/>
                      <span className="hg-char-count">{customText.length}/500</span>
                    </div>
                    <div className="hg-field">
                      <label>Alignment</label>
                      <div style={{display:'flex',gap:6}}>
                        {(['left','center','right'] as const).map(a=>(
                          <button key={a} className={`hg-pill ${customTextAlign===a?'active':''}`} onClick={()=>setCustomTextAlign(a)} style={{flex:1}}>{a.charAt(0).toUpperCase()+a.slice(1)}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Photo Gallery */}
              <div className="hg-widget-row" style={{marginTop:12}}>
                <div className="hg-widget-header" onClick={()=>setPhotoGalleryEnabled(v=>!v)}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <ImageIcon size={16} style={{color:'#e91e8c'}}/>
                    <span style={{fontWeight:600,color:'#fff'}}>Photo Gallery</span>
                  </div>
                  <button className={`hg-toggle ${photoGalleryEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setPhotoGalleryEnabled(v=>!v)}}><span className="hg-toggle-thumb"/></button>
                </div>
                {photoGalleryEnabled && (
                  <div style={{paddingTop:12}}>
                    <div className="hg-grid-4" style={{marginBottom:12}}>
                      {photoGallery.map((url,i)=>(
                        <div key={i} style={{position:'relative',borderRadius:6,overflow:'hidden',aspectRatio:'1',background:'#1a1020'}}>
                          <img src={url} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                          <button onClick={()=>removePhoto(i)} style={{position:'absolute',top:4,right:4,background:'rgba(0,0,0,0.7)',border:'none',color:'#fff',width:20,height:20,borderRadius:'50%',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <X size={12}/>
                          </button>
                        </div>
                      ))}
                    </div>
                    {photoGallery.length < 10 && profile && (
                      <>
                        <FileUpload bucket="media" path={`gallery/${profile.id}`} accept="image/*" maxSizeMB={5}
                          label="Upload Photos" multiple maxFiles={10 - photoGallery.length}
                          onUpload={(url) => setPhotoGallery(g=>[...g, url])}
                          onMultiUpload={(urls) => setPhotoGallery(g=>[...g, ...urls].slice(0, 10))} />
                        <div style={{display:'flex',gap:8,marginTop:8}}>
                          <input className="hg-input" value={newPhotoUrl} onChange={e=>setNewPhotoUrl(e.target.value)} placeholder="Or paste image URL..." onKeyDown={e=>e.key==='Enter'&&addPhoto()} style={{flex:1}}/>
                          <button className="hg-btn-secondary" onClick={addPhoto}>Add</button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Social Integrations (Discord, Twitch, GitHub, Last.fm) */}
              <div className="hg-widget-row" style={{marginTop:12}}>
                <div className="hg-widget-header" onClick={()=>setDiscordEnabled(v=>!v)}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <DiscordLogo size={16} weight="fill" style={{color:'#5865F2'}}/>
                    <span style={{fontWeight:600,color:'#fff'}}>Discord Widget</span>
                  </div>
                  <button className={`hg-toggle ${discordEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setDiscordEnabled(v=>!v)}}><span className="hg-toggle-thumb"/></button>
                </div>
                {discordEnabled && (
                  <div style={{paddingTop:12}}>
                    <div className="hg-field">
                      <label>Server ID</label>
                      <input className="hg-input" value={discordWidget} onChange={e=>setDiscordWidget(e.target.value)} placeholder="123456789012345678"/>
                    </div>
                  </div>
                )}
              </div>
              <div className="hg-widget-row" style={{marginTop:12}}>
                <div className="hg-widget-header" onClick={()=>setTwitchEnabled(v=>!v)}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <TwitchLogo size={16} weight="fill" style={{color:'#9146ff'}}/>
                    <span style={{fontWeight:600,color:'#fff'}}>Twitch</span>
                  </div>
                  <button className={`hg-toggle ${twitchEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setTwitchEnabled(v=>!v)}}><span className="hg-toggle-thumb"/></button>
                </div>
                {twitchEnabled && (
                  <div style={{paddingTop:12}}>
                    <div className="hg-field">
                      <label>Username</label>
                      <input className="hg-input" value={twitchUser} onChange={e=>setTwitchUser(e.target.value)} placeholder="yourtwitch"/>
                    </div>
                  </div>
                )}
              </div>
              <div className="hg-widget-row" style={{marginTop:12}}>
                <div className="hg-widget-header" onClick={()=>setGithubEnabled(v=>!v)}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <GithubLogo size={16} weight="fill" style={{color:'#fff'}}/>
                    <span style={{fontWeight:600,color:'#fff'}}>GitHub</span>
                  </div>
                  <button className={`hg-toggle ${githubEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setGithubEnabled(v=>!v)}}><span className="hg-toggle-thumb"/></button>
                </div>
                {githubEnabled && (
                  <div style={{paddingTop:12}}>
                    <div className="hg-field">
                      <label>Username</label>
                      <input className="hg-input" value={githubUser} onChange={e=>setGithubUser(e.target.value)} placeholder="yourgithub"/>
                    </div>
                  </div>
                )}
              </div>
              <div className="hg-widget-row" style={{marginTop:12}}>
                <div className="hg-widget-header" onClick={()=>setLastfmEnabled(v=>!v)}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <MusicNote size={16} weight="fill" style={{color:'#b90000'}}/>
                    <span style={{fontWeight:600,color:'#fff'}}>Last.fm</span>
                  </div>
                  <button className={`hg-toggle ${lastfmEnabled?'on':''}`} onClick={e=>{e.stopPropagation();setLastfmEnabled(v=>!v)}}><span className="hg-toggle-thumb"/></button>
                </div>
                {lastfmEnabled && (
                  <div style={{paddingTop:12}}>
                    <div className="hg-field">
                      <label>Username</label>
                      <input className="hg-input" value={lastfmUser} onChange={e=>setLastfmUser(e.target.value)} placeholder="yourlastfm"/>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Live Preview */}
            <SectionHeader icon={<Eye size={14}/>} label="PREVIEW"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div className="hg-preview-card" style={{background:bgType==='color'?bgValue:bgType==='gradient'?`linear-gradient(${gradientDir}deg, ${gradientFrom}, ${gradientTo})`:'#0a0a0a'}}>
                <div className="hg-preview-avatar" style={{borderRadius:avatarShape==='circle'?'50%':avatarShape==='squircle'?'30%':'8px',borderColor:accent}}>
                  {avatarUrl ? <img src={avatarUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'inherit'}}/> : <User size={24} style={{color:'#555'}}/>}
                </div>
                <div style={{fontSize:16,fontWeight:700,color:'#fff'}}>{displayName || profile?.username}</div>
                {tagline && <div style={{fontSize:11,color:'#888'}}>{tagline}</div>}
                {bio && <div style={{fontSize:11,color:'#666',maxWidth:200,textAlign:'center'}}>{bio}</div>}
              </div>
            </div>

            <SaveButton />
          </div>
        )}

        {/* ═══════════════════════════════════
            3. LAYOUT
        ═══════════════════════════════════ */}
        {section === 'layout' && (
          <div className="hg-page">
            <h1 className="hg-page-title">Layout</h1>

            {/* Theme Presets */}
            <SectionHeader icon={<Grid3X3 size={14}/>} label="THEME PRESETS"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:28}}>
              {THEME_PRESETS.map(t => (
                <div key={t.id} className={`hg-theme-card ${themePreset===t.id?'active':''}`} onClick={()=>applyTheme(t)}>
                  <div style={{padding:14,borderRadius:8,background:t.bg,border:`1px solid ${themePreset===t.id?t.accent:'#2a1520'}`,transition:'border-color 0.2s'}}>
                    <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}>
                      <div style={{width:16,height:16,borderRadius:'50%',background:t.accent}}/>
                      <div style={{flex:1,height:3,borderRadius:2,background:t.accent,opacity:0.3}}/>
                    </div>
                    <div style={{width:'100%',height:4,borderRadius:2,background:t.accent,opacity:0.15,marginBottom:3}}/>
                    <div style={{width:'70%',height:4,borderRadius:2,background:t.accent,opacity:0.1}}/>
                  </div>
                  {themePreset===t.id && (
                    <div style={{position:'absolute',top:6,right:6,background:'#e91e8c',borderRadius:'50%',width:20,height:20,display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <Check size={12} style={{color:'#fff'}}/>
                    </div>
                  )}
                  <div style={{fontSize:12,fontWeight:600,color:'#fff',textAlign:'center',marginTop:6}}>{t.name}</div>
                </div>
              ))}
            </div>

            {/* Social Integration Grid */}
            <SectionHeader icon={<Users size={14}/>} label="SOCIAL INTEGRATION"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
              {ALL_PLATFORMS.map(p => {
                const enabled = enabledPlatforms[p.id] || false
                return (
                  <div key={p.id} className={`hg-platform-card ${enabled?'active':''}`}>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                      <span style={{color:enabled?'#e91e8c':'#888'}}>{p.icon}</span>
                      <span style={{fontSize:12,fontWeight:600,color:'#fff',flex:1}}>{p.name}</span>
                      <button className={`hg-toggle-sm ${enabled?'on':''}`} onClick={()=>setEnabledPlatforms(ep=>({...ep,[p.id]:!ep[p.id]}))}>
                        <span className="hg-toggle-thumb-sm"/>
                      </button>
                    </div>
                    {enabled && (
                      <input className="hg-input" style={{fontSize:11,padding:'4px 8px'}} value={platformValues[p.id]||''} onChange={e=>setPlatformValues(pv=>({...pv,[p.id]:e.target.value}))} placeholder={`${p.name} URL/username`}/>
                    )}
                  </div>
                )
              })}
            </div>

            <SaveButton />
          </div>
        )}

        {/* ═══════════════════════════════════
            4. DECORATION
        ═══════════════════════════════════ */}
        {section === 'decoration' && (
          <div className="hg-page">
            <h1 className="hg-page-title">Decoration</h1>

            <div className="hg-tabs">
              {(['frames','backgrounds','effects'] as const).map(tab => (
                <button key={tab} className={`hg-tab ${decorationTab===tab?'active':''}`} onClick={()=>setDecorationTab(tab)}>
                  {tab.charAt(0).toUpperCase()+tab.slice(1)}
                </button>
              ))}
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginTop:20}}>
              {Array.from({length:12}).map((_,i) => (
                <div key={i} className="hg-decoration-card">
                  <div style={{width:'100%',aspectRatio:'1',borderRadius:8,background:'linear-gradient(135deg, #1a1020, #2a1520)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Frame size={24} style={{color:'#555'}}/>
                  </div>
                  <div style={{fontSize:11,color:'#555',marginTop:6,textAlign:'center'}}>Frame {i+1}</div>
                </div>
              ))}
            </div>
            <div style={{textAlign:'center',padding:'32px 0',color:'#555',fontSize:13}}>
              No decorations available yet. Check back soon!
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════
            5. BADGES
        ═══════════════════════════════════ */}
        {section === 'badges' && (
          <div className="hg-page">
            <h1 className="hg-page-title">Badges</h1>

            {/* Badge Grid */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12,marginBottom:28}}>
              {ALL_BADGES.map(b => {
                const active = activeBadges.includes(b.id)
                return (
                  <div key={b.id} className={`hg-badge-card ${active?'active':''}`} onClick={()=>toggleActiveBadge(b.id)}>
                    <span style={{fontSize:22,color:active?'#e91e8c':'#888',display:'flex',alignItems:'center'}}>
                      {BADGE_ICONS[b.id] || <Shield size={22}/>}
                    </span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:600,color:'#fff'}}>{b.name}</div>
                      <div style={{fontSize:12,color:'#888'}}>{b.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Badge Settings */}
            <SectionHeader icon={<Settings size={14}/>} label="BADGE SETTINGS"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div className="hg-field">
                <label>Size</label>
                <div style={{display:'flex',gap:8}}>
                  {(['small','medium','large'] as const).map(s=>(
                    <button key={s} className={`hg-pill ${badgeSize===s?'active':''}`} onClick={()=>setBadgeSize(s)} style={{flex:1}}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
                  ))}
                </div>
              </div>
              <div className="hg-field">
                <label>Position</label>
                <div style={{display:'flex',gap:8}}>
                  {(['below-name','below-bio','above-links'] as const).map(p=>(
                    <button key={p} className={`hg-pill ${badgePosition===p?'active':''}`} onClick={()=>setBadgePosition(p)} style={{flex:1}}>
                      {p.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div className="hg-toggle-row">
                <span style={{fontSize:13,color:'#fff'}}>Monochrome</span>
                <button className={`hg-toggle ${monoChrome?'on':''}`} onClick={()=>setMonoChrome(v=>!v)}><span className="hg-toggle-thumb"/></button>
              </div>
              <div className="hg-toggle-row">
                <span style={{fontSize:13,color:'#fff'}}>Glow</span>
                <button className={`hg-toggle ${badgeGlow?'on':''}`} onClick={()=>setBadgeGlow(v=>!v)}><span className="hg-toggle-thumb"/></button>
              </div>
            </div>

            <SaveButton />
          </div>
        )}

        {/* ═══════════════════════════════════
            6. TEMPLATES
        ═══════════════════════════════════ */}
        {section === 'templates' && (
          <div className="hg-page">
            <h1 className="hg-page-title">Templates</h1>

            <div className="hg-tabs">
              {(['all','my','favorites'] as const).map(tab => (
                <button key={tab} className={`hg-tab ${templateTab===tab?'active':''}`} onClick={()=>setTemplateTab(tab)}>
                  {tab === 'all' ? 'All Templates' : tab === 'my' ? 'My Templates' : 'Favorites'}
                </button>
              ))}
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginTop:20}}>
              {[
                { name:'Midnight Glow', author:'obsidian', uses:234, premium:false },
                { name:'Neon Dreams', author:'obsidian', uses:189, premium:true },
                { name:'Soft Pastel', author:'obsidian', uses:156, premium:false },
                { name:'Dark Matter', author:'obsidian', uses:312, premium:true },
                { name:'Cyber Punk', author:'obsidian', uses:98, premium:false },
                { name:'Aurora Borealis', author:'obsidian', uses:267, premium:true },
              ].map((t,i) => (
                <div key={i} className="hg-template-card">
                  <div style={{width:'100%',height:140,borderRadius:8,background:`linear-gradient(135deg, ${['#e91e8c20','#60a5fa20','#34d39920','#a78bfa20','#22d3ee20','#f472b620'][i]}, #110d10)`,marginBottom:12,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Grid3X3 size={32} style={{color:'#555'}}/>
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div>
                      <div style={{fontSize:14,fontWeight:600,color:'#fff'}}>{t.name}</div>
                      <div style={{fontSize:11,color:'#888'}}>by {t.author} · {t.uses} uses</div>
                    </div>
                    <span className={`hg-badge-pill ${t.premium?'premium':'free'}`}>{t.premium?'Premium':'Free'}</span>
                  </div>
                  <button className="hg-btn-primary" style={{width:'100%',marginTop:10,fontSize:12}}>Use Template</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════
            7. LINKS
        ═══════════════════════════════════ */}
        {section === 'links' && (
          <div className="hg-page">
            <h1 className="hg-page-title">Links</h1>

            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
              <span style={{fontSize:13,color:'#888'}}>{activeLinks} active links / {links.length} total</span>
              <button className="hg-btn-primary" onClick={()=>setShowAddLink(true)}><Plus size={14}/> Add Link</button>
            </div>

            {/* Add Link Modal */}
            {showAddLink && (
              <div className="hg-card" style={{marginBottom:20}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                  <span style={{fontSize:15,fontWeight:600,color:'#fff'}}>Add Link</span>
                  <button onClick={()=>{setShowAddLink(false);setLinkSearchQuery('')}} style={{background:'none',border:'none',color:'#888',cursor:'pointer'}}><X size={16}/></button>
                </div>
                <input className="hg-input" value={linkSearchQuery} onChange={e=>setLinkSearchQuery(e.target.value)} placeholder="Search platforms..." style={{marginBottom:12}}/>
                <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:8,maxHeight:280,overflowY:'auto'}}>
                  {ALL_PLATFORMS.filter(p => !linkSearchQuery || p.name.toLowerCase().includes(linkSearchQuery.toLowerCase())).map(p => (
                    <button key={p.id} className="hg-platform-pick" onClick={()=>addLinkWithPlatform(p.id)}>
                      <span style={{color:'#888'}}>{p.icon}</span>
                      <span style={{fontSize:10,color:'#888',marginTop:4}}>{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Link List */}
            <div className="hg-card">
              {links.map((lnk,idx) => (
                <div key={lnk.id} className="hg-link-row" style={{opacity:lnk.visible===false?0.4:1}}>
                  <GripVertical size={14} style={{color:'#555',cursor:'grab',flexShrink:0}}/>
                  <div style={{display:'flex',flexDirection:'column',gap:1}}>
                    <button onClick={()=>moveLink(idx,-1)} style={{background:'none',border:'none',color:'#555',cursor:'pointer',lineHeight:1}}><ArrowUp size={11}/></button>
                    <button onClick={()=>moveLink(idx,1)} style={{background:'none',border:'none',color:'#555',cursor:'pointer',lineHeight:1}}><ArrowDown size={11}/></button>
                  </div>
                  {lnk.section === 'header' ? (
                    <>
                      <span style={{fontSize:10,color:'#555',textTransform:'uppercase',letterSpacing:1,fontWeight:600}}>Section</span>
                      <input className="hg-input" value={lnk.label} onChange={e=>updateLink(lnk.id,'label',e.target.value)} placeholder="Section label" style={{flex:1,fontSize:12}}/>
                    </>
                  ) : (
                    <>
                      <span style={{color:'#888',display:'flex',alignItems:'center'}}>{SOCIAL_ICON_MAP[lnk.icon] || <Link2 size={14}/>}</span>
                      <select value={lnk.icon} onChange={e=>updateLink(lnk.id,'icon',e.target.value)} className="hg-input" style={{width:80,fontSize:11,padding:'4px 6px'}}>
                        {SOCIAL_ICONS.map(k=><option key={k} value={k}>{k}</option>)}
                      </select>
                      <input className="hg-input" value={lnk.label} onChange={e=>updateLink(lnk.id,'label',e.target.value)} placeholder="Label" style={{flex:1,fontSize:12}}/>
                      <input className="hg-input" value={lnk.url} onChange={e=>updateLink(lnk.id,'url',e.target.value)} placeholder="https://..." style={{flex:2,fontSize:12}}/>
                      <input type="color" value={lnk.color||accent} onChange={e=>updateLink(lnk.id,'color',e.target.value)} className="hg-color-input"/>
                      {(lnk.clicks||0) > 0 && <span style={{fontSize:10,color:'#888',background:'#1a1020',padding:'2px 6px',borderRadius:6}}>{lnk.clicks}</span>}
                    </>
                  )}
                  <button onClick={()=>updateLink(lnk.id,'visible',lnk.visible===false?true:false)}
                    style={{background:'none',border:'none',cursor:'pointer',color:lnk.visible===false?'#555':'#e91e8c'}}>
                    {lnk.visible===false?<EyeOff size={14}/>:<Eye size={14}/>}
                  </button>
                  <button onClick={()=>removeLink(lnk.id)} style={{background:'none',border:'none',cursor:'pointer',color:'#f87171'}}><Trash2 size={14}/></button>
                </div>
              ))}
              {!links.length && <p style={{textAlign:'center',color:'#555',padding:'32px 0',fontSize:13}}>No links yet. Add your first link above.</p>}
            </div>

            <SaveButton />
          </div>
        )}

        {/* ═══════════════════════════════════
            8. ASSETS
        ═══════════════════════════════════ */}
        {section === 'assets' && (
          <div className="hg-page">
            <h1 className="hg-page-title">Assets</h1>

            <div className="hg-tabs" style={{marginBottom:20}}>
              {(['avatars','backgrounds','banners','icons','cursors','audios','fonts'] as const).map(tab => (
                <button key={tab} className={`hg-tab ${assetsTab===tab?'active':''}`} onClick={()=>setAssetsTab(tab)}>
                  {tab.charAt(0).toUpperCase()+tab.slice(1)}
                </button>
              ))}
            </div>

            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <div style={{display:'flex',gap:8,flex:1,maxWidth:300}}>
                <div className="hg-search" style={{flex:1}}>
                  <Search size={14} className="hg-search-icon"/>
                  <input placeholder="Search assets..." className="hg-search-input"/>
                </div>
              </div>
              <button className="hg-btn-primary"><Plus size={14}/> Upload</button>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
              {/* Empty state */}
            </div>
            <div style={{textAlign:'center',padding:'48px 0'}}>
              <HardDrive size={40} style={{color:'#555',marginBottom:12}}/>
              <div style={{fontSize:15,fontWeight:600,color:'#888',marginBottom:4}}>No assets yet</div>
              <div style={{fontSize:13,color:'#555'}}>Upload {assetsTab} to get started</div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════
            9. SETTINGS
        ═══════════════════════════════════ */}
        {section === 'settings' && (
          <div className="hg-page">
            <h1 className="hg-page-title">Settings</h1>

            <SectionHeader icon={<User size={14}/>} label="PROFILE"/>
            <div className="hg-card" style={{marginBottom:20}}>
              {[
                { label:'Username', val:sUser, set:setSUser, field:'username', ph:'yourname', maxLen:20 },
                { label:'Display Name', val:sDN, set:setSDN, field:'display_name', ph:'Your display name', maxLen:32 },
              ].map(f=>(
                <div key={f.field} style={{display:'flex',gap:10,alignItems:'flex-end',marginBottom:12}}>
                  <div className="hg-field" style={{flex:1,marginBottom:0}}>
                    <label>{f.label}</label>
                    <input className="hg-input" value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} maxLength={f.maxLen}/>
                  </div>
                  <button className="hg-btn-secondary" onClick={()=>saveSetting(f.field,f.val)} style={{height:36}}>Save</button>
                </div>
              ))}
            </div>

            <SectionHeader icon={<Lock size={14}/>} label="SECURITY"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div style={{display:'flex',gap:10,alignItems:'flex-end',marginBottom:12}}>
                <div className="hg-field" style={{flex:1,marginBottom:0}}>
                  <label>Email Address</label>
                  <input className="hg-input" type="email" value={sEmail} onChange={e=>setSEmail(e.target.value)} placeholder="new@email.com"/>
                </div>
                <button className="hg-btn-secondary" onClick={()=>saveSetting('email',sEmail)} style={{height:36}}>Update</button>
              </div>
              <div style={{display:'flex',gap:10,alignItems:'flex-end',marginBottom:12}}>
                <div className="hg-field" style={{flex:1,marginBottom:0}}>
                  <label>New Password</label>
                  <input className="hg-input" type="password" value={sPass} onChange={e=>setSPass(e.target.value)} placeholder="8+ characters"/>
                </div>
                <button className="hg-btn-secondary" onClick={()=>saveSetting('password',sPass)} style={{height:36}}>Update</button>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8,padding:'10px 0',opacity:0.5}}>
                <Lock size={14} style={{color:'#888'}}/>
                <span style={{fontSize:13,color:'#888'}}>Two-Factor Authentication</span>
                <span className="hg-badge-pill" style={{background:'#2a1520',color:'#e91e8c'}}>Coming Soon</span>
              </div>
            </div>

            <SectionHeader icon={<Eye size={14}/>} label="PRIVACY"/>
            <div className="hg-card" style={{marginBottom:20}}>
              <div className="hg-field">
                <label>Profile Visibility</label>
                <div style={{display:'flex',gap:8}}>
                  {(['public','unlisted','private'] as const).map(v=>(
                    <button key={v} className={`hg-pill ${profileVisibility===v?'active':''}`} onClick={()=>setProfileVisibility(v)} style={{flex:1}}>
                      {v.charAt(0).toUpperCase()+v.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <SectionHeader icon={<AlertTriangle size={14}/>} label="DANGER ZONE"/>
            <div className="hg-card hg-danger-card">
              <div style={{display:'flex',gap:10}}>
                <button className="hg-btn-secondary" onClick={()=>{supabase.auth.signOut();router.push('/')}} style={{display:'flex',alignItems:'center',gap:6}}>
                  <LogOut size={14}/> Sign out
                </button>
                <button className="hg-btn-danger" onClick={()=>{if(confirm('Delete account? Cannot be undone.')){supabase.auth.signOut();router.push('/')}}}>
                  <Trash2 size={14}/> Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════
            10. NOTIFICATIONS
        ═══════════════════════════════════ */}
        {section === 'notifications' && (
          <div className="hg-page">
            <h1 className="hg-page-title">Notifications</h1>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'80px 0'}}>
              <Bell size={48} style={{color:'#555',marginBottom:16}}/>
              <div style={{fontSize:16,fontWeight:600,color:'#888',marginBottom:4}}>No notifications yet</div>
              <div style={{fontSize:13,color:'#555'}}>You&apos;ll see notifications here when something happens</div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════
            11. PREMIUM
        ═══════════════════════════════════ */}
        {section === 'premium' && (
          <div className="hg-page">
            <h1 className="hg-page-title">Premium</h1>

            <div className="hg-tier-grid">
              <div className="hg-tier-card">
                <div style={{fontSize:14,fontWeight:700,color:'#fff',marginBottom:4}}>Free</div>
                <div style={{fontSize:32,fontWeight:800,color:'#fff'}}>$0</div>
                <div style={{fontSize:12,color:'#888',marginBottom:20}}>forever</div>
                <div style={{display:'flex',flexDirection:'column',gap:8,fontSize:12,color:'#888'}}>
                  {['Custom links','Basic themes','Profile analytics','Music player','Social integrations'].map(f=>(
                    <div key={f} style={{display:'flex',alignItems:'center',gap:6}}><Check size={12} style={{color:'#4ade80'}}/>{f}</div>
                  ))}
                </div>
                <div style={{marginTop:20,fontSize:12,color:'#e91e8c',fontWeight:600}}>Current Plan</div>
              </div>
              <div className="hg-tier-card hg-tier-featured">
                <div style={{fontSize:14,fontWeight:700,color:'#e91e8c',marginBottom:4}}>Premium</div>
                <div style={{fontSize:32,fontWeight:800,color:'#fff'}}>$5</div>
                <div style={{fontSize:12,color:'#888',marginBottom:20}}>per month</div>
                <div style={{display:'flex',flexDirection:'column',gap:8,fontSize:12,color:'#888'}}>
                  {['Everything in Free','Custom badges','Priority support','Advanced analytics','Custom domains','Animated backgrounds'].map(f=>(
                    <div key={f} style={{display:'flex',alignItems:'center',gap:6}}><Check size={12} style={{color:'#e91e8c'}}/>{f}</div>
                  ))}
                </div>
                <button className="hg-btn-primary" style={{width:'100%',marginTop:20}}>Upgrade</button>
              </div>
              <div className="hg-tier-card">
                <div style={{fontSize:14,fontWeight:700,color:'#facc15',marginBottom:4}}>Elite</div>
                <div style={{fontSize:32,fontWeight:800,color:'#fff'}}>$15</div>
                <div style={{fontSize:12,color:'#888',marginBottom:20}}>per month</div>
                <div style={{display:'flex',flexDirection:'column',gap:8,fontSize:12,color:'#888'}}>
                  {['Everything in Premium','Verified badge','API access','Custom CSS','Dedicated support'].map(f=>(
                    <div key={f} style={{display:'flex',alignItems:'center',gap:6}}><Check size={12} style={{color:'#facc15'}}/>{f}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature comparison */}
            <h2 style={{fontSize:16,fontWeight:700,color:'#fff',marginTop:28,marginBottom:14}}>Feature Comparison</h2>
            <div className="hg-card" style={{padding:0,overflow:'hidden'}}>
              <table className="hg-table">
                <thead><tr><th>Feature</th><th>Free</th><th>Premium</th><th>Elite</th></tr></thead>
                <tbody>
                  {[
                    {f:'Custom Links',free:true,pro:true,elite:true},
                    {f:'Basic Themes',free:true,pro:true,elite:true},
                    {f:'Analytics',free:true,pro:true,elite:true},
                    {f:'Custom Badges',free:false,pro:true,elite:true},
                    {f:'Animated BGs',free:false,pro:true,elite:true},
                    {f:'Verified Badge',free:false,pro:false,elite:true},
                    {f:'Custom CSS',free:false,pro:false,elite:true},
                  ].map(r=>(
                    <tr key={r.f}>
                      <td style={{fontWeight:500}}>{r.f}</td>
                      <td>{r.free ? <Check size={14} style={{color:'#4ade80'}}/> : <X size={14} style={{color:'#555'}}/>}</td>
                      <td>{r.pro ? <Check size={14} style={{color:'#e91e8c'}}/> : <X size={14} style={{color:'#555'}}/>}</td>
                      <td>{r.elite ? <Check size={14} style={{color:'#facc15'}}/> : <X size={14} style={{color:'#555'}}/>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════
            12. ADMIN SECTIONS
        ═══════════════════════════════════ */}

        {/* Admin: Invites */}
        {section === 'admin-invites' && (
          <div className="hg-page">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
              <div>
                <h1 className="hg-page-title" style={{marginBottom:4}}>Invite Codes</h1>
                <p style={{fontSize:13,color:'#888'}}>{invites.filter(i=>!i.used_by).length} unused · {invites.filter(i=>i.used_by).length} used</p>
              </div>
              <button className="hg-btn-primary" onClick={generateInvite} disabled={generating}>
                {generating?'Generating...':'+ Generate Code'}
              </button>
            </div>
            <div className="hg-card" style={{padding:0,overflow:'hidden'}}>
              <table className="hg-table">
                <thead><tr><th>Code</th><th>Status</th><th>Created</th><th>Used By</th><th></th></tr></thead>
                <tbody>
                  {invites.map(inv=>(
                    <tr key={inv.id}>
                      <td><code style={{background:'#1a1020',padding:'2px 8px',borderRadius:4,fontSize:12,color:'#e91e8c'}}>{inv.code}</code></td>
                      <td><span className={`hg-status-pill ${inv.used_by?'used':'avail'}`}>{inv.used_by?'Used':'Available'}</span></td>
                      <td style={{color:'#888',fontSize:13}}>{new Date(inv.created_at).toLocaleDateString()}</td>
                      <td style={{color:'#888',fontSize:13}}>{inv.used_by?inv.used_by.slice(0,8)+'...':'--'}</td>
                      <td>{!inv.used_by && <button className="hg-btn-danger" style={{fontSize:11,padding:'4px 10px'}} onClick={()=>revokeInvite(inv.id)}>Revoke</button>}</td>
                    </tr>
                  ))}
                  {!invites.length && <tr><td colSpan={5} style={{textAlign:'center',color:'#555',padding:28}}>No codes yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Admin: Users */}
        {section === 'admin-users' && (
          <div className="hg-page">
            <h1 className="hg-page-title" style={{marginBottom:4}}>Users</h1>
            <p style={{fontSize:13,color:'#888',marginBottom:24}}>{users.length} total accounts</p>
            <div className="hg-card" style={{padding:0,overflow:'hidden'}}>
              <table className="hg-table">
                <thead><tr><th>Username</th><th>Display Name</th><th>Views</th><th>Joined</th><th>Role</th><th></th></tr></thead>
                <tbody>
                  {users.map(u=>(
                    <tr key={u.id}>
                      <td><a href={`/${u.username}`} target="_blank" style={{color:'#e91e8c',fontWeight:600}}>@{u.username}</a></td>
                      <td style={{color:'#888',fontSize:13}}>{u.display_name||'--'}</td>
                      <td style={{color:'#888',fontSize:13}}>{(u.view_count||0).toLocaleString()}</td>
                      <td style={{color:'#888',fontSize:13}}>{new Date(u.created_at).toLocaleDateString()}</td>
                      <td><span className={`hg-status-pill ${u.is_admin?'admin':'user'}`}>{u.is_admin?'Admin':'User'}</span></td>
                      <td><button className="hg-btn-secondary" style={{fontSize:11,padding:'4px 10px'}} onClick={()=>toggleAdmin(u.id,u.is_admin)}>{u.is_admin?'Remove Admin':'Make Admin'}</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Admin: Blacklist */}
        {section === 'admin-blacklist' && (
          <div className="hg-page">
            <h1 className="hg-page-title" style={{marginBottom:4}}>Username Blacklist</h1>
            <p style={{fontSize:13,color:'#888',marginBottom:24}}>Blocked usernames can never be registered</p>
            <div className="hg-card" style={{marginBottom:14}}>
              <div style={{display:'flex',gap:10}}>
                <input className="hg-input" style={{flex:1}} value={newBL} onChange={e=>setNewBL(e.target.value.toLowerCase())} placeholder="username to block" onKeyDown={e=>e.key==='Enter'&&addBlacklist()}/>
                <button className="hg-btn-primary" onClick={addBlacklist}>Block</button>
              </div>
            </div>
            <div className="hg-card" style={{padding:0,overflow:'hidden'}}>
              <table className="hg-table">
                <thead><tr><th>Username</th><th>Added</th><th></th></tr></thead>
                <tbody>
                  {blacklist.map(b=>(
                    <tr key={b.id}>
                      <td><code style={{background:'#1a1020',padding:'2px 8px',borderRadius:4,fontSize:12,color:'#e91e8c'}}>{b.username}</code></td>
                      <td style={{color:'#888',fontSize:13}}>{new Date(b.created_at).toLocaleDateString()}</td>
                      <td><button className="hg-btn-danger" style={{fontSize:11,padding:'4px 10px'}} onClick={()=>removeBlacklist(b.id)}>Remove</button></td>
                    </tr>
                  ))}
                  {!blacklist.length && <tr><td colSpan={3} style={{textAlign:'center',color:'#555',padding:28}}>No blacklisted usernames</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
