'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase, type Profile, type Link as ProfileLink } from '@/lib/supabase'

type AccountTab = 'overview' | 'analytics' | 'badges' | 'settings'
type MainSection = 'account' | 'customize' | 'links' | 'premium' | 'templates'

const BADGE_OPTIONS = [
  { id: 'og',         emoji: '🥇', name: 'OG',         desc: 'Be an early supporter of fentanyl.best' },
  { id: 'verified',   emoji: '✅', name: 'Verified',   desc: 'Purchase or be a known content creator.' },
  { id: 'donor',      emoji: '💚', name: 'Donor',      desc: 'Donate to fentanyl.best.' },
  { id: 'premium',    emoji: '💜', name: 'Premium',    desc: 'Purchase the premium package.' },
  { id: 'staff',      emoji: '🛡️', name: 'Staff',      desc: 'Be a part of the fentanyl.best team.' },
  { id: 'winner',     emoji: '🏆', name: 'Winner',     desc: 'Win a fentanyl.best event.' },
  { id: 'founder',    emoji: '🌌', name: 'Founder',    desc: 'Exclusive founder badge.' },
  { id: 'bughunter',  emoji: '🐛', name: 'Bug Hunter', desc: 'Report a bug to the team.' },
]
const ACCENT_PRESETS = ['#A397DD','#C9BDFE','#B7AAF3','#9583CB','#60a5fa','#34d399','#f472b6','#fb923c']
const BG_PRESETS    = ['#07060f','#0a0f1e','#0f0a1a','#0a1a0a','#1a0a0a']
const FONTS         = ['inter','geist','space-grotesk']
const SOCIAL_ICONS  = ['discord','twitter','tiktok','youtube','instagram','twitch','spotify','github','custom']

export default function Dashboard() {
  const router = useRouter()
  const [profile,    setProfile]    = useState<Profile | null>(null)
  const [loading,    setLoading]    = useState(true)
  const [section,    setSection]    = useState<MainSection>('account')
  const [accountTab, setAccountTab] = useState<AccountTab>('overview')
  const [saving,     setSaving]     = useState(false)
  const [saved,      setSaved]      = useState(false)
  const [premOpen,   setPremOpen]   = useState(false)

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
  const [musicUrl,    setMusicUrl]    = useState('')
  const [musicType,   setMusicType]   = useState<Profile['music_type']>(null)
  const [newUsername, setNewUsername] = useState('')
  const [newDisplayName, setNewDisplayName] = useState('')
  const [newEmail,    setNewEmail]    = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [settingsMsg, setSettingsMsg] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (!data) { router.push('/login'); return }
      setProfile(data)
      setDisplayName(data.display_name || '')
      setNewDisplayName(data.display_name || '')
      setNewUsername(data.username || '')
      setBio(data.bio || '')
      setAvatarUrl(data.avatar_url || '')
      setLinks(data.links || [])
      setBgType(data.background_type || 'color')
      setBgValue(data.background_value || '#07060f')
      setAccent(data.accent_color || '#A397DD')
      setBtnStyle(data.button_style || 'outline')
      setFont(data.font || 'inter')
      setBadges(data.badges || [])
      setMusicUrl(data.music_url || '')
      setMusicType(data.music_type || null)
      setLoading(false)
    }
    load()
  }, [router])

  async function save() {
    if (!profile) return; setSaving(true)
    await supabase.from('profiles').update({
      display_name: displayName, bio, avatar_url: avatarUrl, links,
      background_type: bgType, background_value: bgValue,
      accent_color: accent, button_style: btnStyle, font,
      badges, music_url: musicUrl, music_type: musicType
    }).eq('id', profile.id)
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  async function saveUsername() {
    if (!profile || !newUsername.trim()) return
    const { error } = await supabase.from('profiles').update({ username: newUsername.toLowerCase() }).eq('id', profile.id)
    if (error) setSettingsMsg('Username already taken.')
    else { setProfile(p => p ? { ...p, username: newUsername.toLowerCase() } : p); setSettingsMsg('Username updated!') }
    setTimeout(() => setSettingsMsg(''), 3000)
  }
  async function saveDisplayName() {
    if (!profile) return
    await supabase.from('profiles').update({ display_name: newDisplayName }).eq('id', profile.id)
    setProfile(p => p ? { ...p, display_name: newDisplayName } : p)
    setSettingsMsg('Display name updated!'); setTimeout(() => setSettingsMsg(''), 3000)
  }
  async function updateEmail() {
    if (!newEmail) return
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    setSettingsMsg(error ? error.message : 'Check your new email for confirmation.')
    setTimeout(() => setSettingsMsg(''), 4000)
  }
  async function updatePassword() {
    if (!newPassword || newPassword.length < 8) { setSettingsMsg('Password must be 8+ characters.'); return }
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setSettingsMsg(error ? error.message : 'Password updated!'); setNewPassword('')
    setTimeout(() => setSettingsMsg(''), 3000)
  }

  function addLink()    { setLinks(l => [...l, { id: crypto.randomUUID(), label: '', url: '', icon: 'custom' }]) }
  function removeLink(id: string) { setLinks(l => l.filter(lnk => lnk.id !== id)) }
  function updateLink(id: string, field: keyof ProfileLink, val: string) {
    setLinks(l => l.map(lnk => lnk.id === id ? { ...lnk, [field]: val } : lnk))
  }
  function toggleBadge(id: string) { setBadges(b => b.includes(id) ? b.filter(x => x !== id) : [...b, id]) }

  const checks = [
    { label: 'Upload An Avatar',       done: !!avatarUrl },
    { label: 'Add A Description',      done: !!bio },
    { label: 'Add Socials',            done: links.length > 0 },
    { label: 'Choose Accent Color',    done: accent !== '#A397DD' },
    { label: 'Get your first profile view', done: (profile?.view_count || 0) > 0 },
  ]
  const completionPct = Math.round((checks.filter(c => c.done).length / checks.length) * 100)

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0e0c1a', color:'rgba(255,255,255,0.3)', fontSize:13 }}>
      Loading...
    </div>
  )

  const sidebarNav = (
    <aside className="db-sidebar">
      {/* Logo */}
      <Link href="/" className="db-logo">
        <Image src="/needle-logo.png" alt="" width={26} height={26} style={{ objectFit:'contain', filter:'drop-shadow(0 0 5px rgba(163,151,221,0.5))' }} />
        <span>fentanyl<em>.best</em></span>
      </Link>

      {/* Nav */}
      <nav className="db-nav">
        {/* Account */}
        <button className={`db-navitem ${section==='account'?'active':''}`} onClick={() => setSection('account')}>
          <span className="db-navitem-icon">{IcoUser}</span>
          <span>Account</span>
          <span className="db-navitem-chevron">{section==='account' ? IcoChevUp : IcoChevDown}</span>
        </button>
        {section==='account' && (
          <div className="db-subnav">
            {(['overview','analytics','badges','settings'] as AccountTab[]).map(t => (
              <button key={t} className={`db-subitem ${accountTab===t?'active':''}`}
                onClick={() => setAccountTab(t)}>
                {t.charAt(0).toUpperCase()+t.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Customize */}
        <button className={`db-navitem ${section==='customize'?'active':''}`} onClick={() => setSection('customize')}>
          <span className="db-navitem-icon">{IcoPaint}</span>
          <span>Customize</span>
        </button>

        {/* Links */}
        <button className={`db-navitem ${section==='links'?'active':''}`} onClick={() => setSection('links')}>
          <span className="db-navitem-icon">{IcoLink}</span>
          <span>Links</span>
        </button>

        {/* Premium */}
        <button className={`db-navitem ${section==='premium'?'active':''}`} onClick={() => { setSection('premium'); setPremOpen(p=>!p) }}>
          <span className="db-navitem-icon">{IcoStar}</span>
          <span>Premium</span>
          <span className="db-navitem-chevron">{premOpen ? IcoChevUp : IcoChevDown}</span>
        </button>

        {/* Templates */}
        <button className={`db-navitem ${section==='templates'?'active':''}`} onClick={() => setSection('templates')}>
          <span className="db-navitem-icon">{IcoGrid}</span>
          <span>Templates</span>
        </button>
      </nav>

      {/* Bottom */}
      <div className="db-sidebar-bottom">
        <p className="db-sidebar-hint">Have a question or need support?</p>
        <a href="#" className="db-sidebar-btn">{IcoHelp} Help Center</a>
        <p className="db-sidebar-hint" style={{marginTop:10}}>Check out your page</p>
        <a href={`/${profile?.username}`} target="_blank" className="db-sidebar-btn">{IcoExternal} My Page</a>
        <button className="db-share-btn" onClick={() => {
          navigator.clipboard.writeText(`https://fentanyl.best/${profile?.username}`)
        }}>
          {IcoShare} Share Your Profile
        </button>

        {/* User chip */}
        <div className="db-user-chip">
          <div className="db-user-avatar">
            {avatarUrl
              ? <img src={avatarUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} />
              : <span>{profile?.username?.[0]?.toUpperCase()}</span>
            }
          </div>
          <div className="db-user-info">
            <div className="db-user-name">{profile?.username}</div>
            <div className="db-user-uid">UID {String(profile?.id || '').slice(0,6).toUpperCase()}</div>
          </div>
          <button className="db-user-dots" onClick={() => { supabase.auth.signOut(); router.push('/') }} title="Sign out">⋯</button>
        </div>
      </div>
    </aside>
  )

  return (
    <div className="db-layout">
      {sidebarNav}
      <main className="db-main">

        {/* ══ ACCOUNT: OVERVIEW ══ */}
        {section==='account' && accountTab==='overview' && <>
          <div className="db-page-header">
            <h1 className="db-page-title">Account Overview</h1>
          </div>

          {/* 4 stat cards */}
          <div className="db-stat-row">
            <div className="db-stat-card">
              <div className="db-stat-top">
                <span className="db-stat-label">Username</span>
                <span className="db-stat-icon">{IcoPencil}</span>
              </div>
              <div className="db-stat-val">@{profile?.username}</div>
              <div className="db-stat-sub">Change available now</div>
            </div>
            <div className="db-stat-card">
              <div className="db-stat-top">
                <span className="db-stat-label">Display Name</span>
                <span className="db-stat-icon">{IcoUserPlus}</span>
              </div>
              <div className="db-stat-val">{profile?.display_name || profile?.username}</div>
              <div className="db-stat-sub">Shown on your profile</div>
            </div>
            <div className="db-stat-card">
              <div className="db-stat-top">
                <span className="db-stat-label">Links</span>
                <span className="db-stat-icon">{IcoLink}</span>
              </div>
              <div className="db-stat-val">{links.length}</div>
              <div className="db-stat-sub">Active on your page</div>
            </div>
            <div className="db-stat-card">
              <div className="db-stat-top">
                <span className="db-stat-label">Profile Views</span>
                <span className="db-stat-icon">{IcoEye}</span>
              </div>
              <div className="db-stat-val">{profile?.view_count || 0}</div>
              <div className="db-stat-sub">All-time total</div>
            </div>
          </div>

          <h2 className="db-section-heading">Account Statistics</h2>

          <div className="db-two-col">
            {/* LEFT: completion */}
            <div className="db-card">
              <h3 className="db-card-title">Profile Completion</h3>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:6}}>
                <div className="db-prog-track">
                  <div className="db-prog-fill" style={{width:`${completionPct}%`}} />
                </div>
                <span style={{fontSize:11,color:'var(--db-muted)',flexShrink:0}}>{completionPct}% completed</span>
              </div>

              {completionPct === 100
                ? <div style={{display:'flex',alignItems:'center',gap:10,margin:'16px 0',padding:'12px 14px',background:'rgba(34,197,94,0.07)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:10}}>
                    <span style={{fontSize:18}}>✅</span>
                    <div>
                      <div style={{fontSize:14,fontWeight:700,color:'#4ade80'}}>Your profile is complete!</div>
                      <div style={{fontSize:12,color:'var(--db-muted)',marginTop:2}}>Discover more features to enhance your experience.</div>
                    </div>
                  </div>
                : null
              }

              <div className="db-check-grid">
                {checks.map(c => (
                  <div key={c.label} className={`db-check-pill ${c.done?'done':''}`}>
                    <span className="db-check-icon">{c.done ? '✓' : '○'}</span>
                    {c.label}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT column */}
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {/* Manage */}
              <div className="db-card">
                <h3 className="db-card-title">Manage your account</h3>
                <p className="db-card-sub">Change your email, username and more.</p>
                <div className="db-manage-list">
                  {[
                    { icon: IcoPencil,  label: 'Change Username',     action: () => setAccountTab('settings') },
                    { icon: IcoChat,    label: 'Change Display Name',  action: () => setAccountTab('settings') },
                    { icon: IcoGear,    label: 'Account Settings',     action: () => setAccountTab('settings') },
                    { icon: IcoShield,  label: 'Badges',               action: () => setAccountTab('badges') },
                  ].map(item => (
                    <button key={item.label} className="db-manage-row" onClick={item.action}>
                      <span className="db-manage-icon">{item.icon}</span>
                      <span>{item.label}</span>
                      <span className="db-manage-arrow">›</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Connections */}
              <div className="db-card">
                <h3 className="db-card-title">Connections</h3>
                <p className="db-card-sub">Link your Discord account to fentanyl.best</p>
                <div className="db-connection-row">
                  <span className="db-connection-icon">{IcoDiscord}</span>
                  <span style={{fontSize:13,fontWeight:600,color:'var(--db-text)',flex:1}}>Discord</span>
                  <button className="db-connect-btn">Connect</button>
                </div>
              </div>
            </div>
          </div>

          {/* Mini analytics preview */}
          <h2 className="db-section-heading" style={{marginTop:32}}>
            Account Analytics
            <button className="db-view-more" onClick={() => setAccountTab('analytics')}>View More</button>
          </h2>
          <div className="db-two-col">
            <div className="db-card">
              <div className="db-card-title">Profile Views <span className="db-accent-text">last 14 days</span></div>
              <div className="db-mini-chart">
                {Array.from({length:14},(_,i)=>(
                  <div key={i} className="db-chart-bar" style={{height:`${Math.random()*70+10}%`}} />
                ))}
              </div>
              <div className="db-chart-axis"><span>14 days ago</span><span>Today</span></div>
            </div>
            <div className="db-card">
              <div className="db-card-title">Link Clicks <span className="db-accent-text">last 14 days</span></div>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:120,fontSize:13,color:'var(--db-faint)'}}>
                No link clicks yet. Start sharing your profile!
              </div>
            </div>
          </div>
        </>}

        {/* ══ ACCOUNT: ANALYTICS ══ */}
        {section==='account' && accountTab==='analytics' && <>
          <div className="db-page-header-row">
            <div>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                {IcoBarChart}
                <h1 className="db-page-title" style={{marginBottom:0}}>Account Analytics</h1>
              </div>
              <p className="db-page-sub">Track your profile performance and see how many people are visiting your profile.</p>
            </div>
          </div>

          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{fontSize:14,fontWeight:600,color:'var(--db-text)'}}>Time Range</span>
              <span className="db-badge-pill">Last updated less than a minute ago</span>
            </div>
            <div className="db-date-select">{IcoCal} Last 14 days</div>
          </div>

          <div className="db-stat-row">
            {[
              { label:'Total Link Clicks',  val:'0',   sub:'All time' },
              { label:'Click Rate',         val:'0%',  sub:'Clicks / views' },
              { label:'Profile Views',      val:String(profile?.view_count||0), sub:'All time' },
              { label:'Avg Daily Views',    val:'0',   sub:'Last 14 days' },
            ].map(s=>(
              <div key={s.label} className="db-stat-card">
                <div className="db-stat-label">{s.label}</div>
                <div className="db-stat-val">{s.val}</div>
                <div className="db-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="db-two-col" style={{marginTop:16}}>
            <div className="db-card">
              <div className="db-card-title">Profile Views <span className="db-accent-text">last 14 days</span></div>
              <div className="db-mini-chart" style={{height:150}}>
                {Array.from({length:14},(_,i)=>(
                  <div key={i} className="db-chart-bar" style={{height:`${Math.random()*70+5}%`}} />
                ))}
              </div>
              <div className="db-chart-axis"><span>14 days ago</span><span>Today</span></div>
            </div>
            <div className="db-card">
              <div className="db-card-title">Visitor Devices <span className="db-accent-text">last 14 days</span></div>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:150,flexDirection:'column',gap:8}}>
                <div style={{width:80,height:80,borderRadius:'50%',border:'12px solid rgba(163,151,221,0.3)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                  <span style={{fontSize:10,color:'var(--db-faint)'}}>Total</span>
                  <span style={{fontSize:12,color:'var(--db-muted)'}}>{profile?.view_count||0}</span>
                </div>
                <div style={{display:'flex',gap:12,marginTop:8}}>
                  {['Desktop','Mobile','Tablet'].map(d=>(
                    <span key={d} style={{fontSize:11,color:'var(--db-faint)',display:'flex',alignItems:'center',gap:4}}>
                      <span style={{width:7,height:7,borderRadius:'50%',background:'var(--db-accent)',display:'inline-block'}} />{d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="db-two-col" style={{marginTop:16}}>
            <div className="db-card">
              <div className="db-card-title">Most Clicked Links</div>
              <p style={{fontSize:13,color:'var(--db-faint)',textAlign:'center',padding:'20px 0'}}>No link clicks yet.</p>
            </div>
            <div className="db-card">
              <div className="db-card-title">Top Referrers</div>
              <p style={{fontSize:13,color:'var(--db-faint)',textAlign:'center',padding:'20px 0'}}>No referrer data yet.</p>
            </div>
          </div>
        </>}

        {/* ══ ACCOUNT: BADGES ══ */}
        {section==='account' && accountTab==='badges' && <>
          <div className="db-page-header">
            <h1 className="db-page-title">Badges</h1>
            <p className="db-page-sub">Earn and display badges on your profile</p>
          </div>
          <div className="db-badge-list">
            {BADGE_OPTIONS.map(b => {
              const owned = badges.includes(b.id)
              return (
                <div key={b.id} className={`db-badge-row ${owned?'owned':''}`}>
                  <span style={{fontSize:22,width:36,textAlign:'center',flexShrink:0}}>{b.emoji}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:owned?'var(--db-light)':'var(--db-text)'}}>{b.name}</div>
                    <div style={{fontSize:11,color:'var(--db-faint)',marginTop:2}}>{b.desc}</div>
                  </div>
                  <button className={`db-badge-btn ${owned?'active':''}`} onClick={() => toggleBadge(b.id)}>
                    {owned ? 'Remove' : 'Add'}
                  </button>
                </div>
              )
            })}
          </div>
          {badges.length > 0 && (
            <div style={{marginTop:16}}>
              <button className="db-primary-btn" onClick={save} disabled={saving}>
                {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Badge Settings'}
              </button>
            </div>
          )}
        </>}

        {/* ══ ACCOUNT: SETTINGS ══ */}
        {section==='account' && accountTab==='settings' && <>
          <div className="db-page-header">
            <h1 className="db-page-title">Account Settings</h1>
          </div>
          {settingsMsg && <div className="db-msg">{settingsMsg}</div>}

          <div className="db-card" style={{marginBottom:16}}>
            <h3 className="db-card-title">General Information</h3>
            <p className="db-card-sub">Update your public-facing info.</p>
            <div className="db-settings-rows">
              <div className="db-settings-row">
                <div style={{flex:1}}>
                  <div className="db-settings-label">Username</div>
                  <input className="db-settings-input" value={newUsername} onChange={e=>setNewUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/g,''))} maxLength={20} />
                </div>
                <button className="db-settings-save" onClick={saveUsername}>Save</button>
              </div>
              <div className="db-settings-row">
                <div style={{flex:1}}>
                  <div className="db-settings-label">Display Name</div>
                  <input className="db-settings-input" value={newDisplayName} onChange={e=>setNewDisplayName(e.target.value)} maxLength={32} />
                </div>
                <button className="db-settings-save" onClick={saveDisplayName}>Save</button>
              </div>
            </div>
          </div>

          <div className="db-card" style={{marginBottom:16}}>
            <h3 className="db-card-title">Security</h3>
            <div className="db-settings-rows">
              <div className="db-settings-row">
                <div style={{flex:1}}>
                  <div className="db-settings-label">Email Address</div>
                  <input className="db-settings-input" type="email" value={newEmail} onChange={e=>setNewEmail(e.target.value)} placeholder="new@email.com" />
                </div>
                <button className="db-settings-save" onClick={updateEmail}>Update</button>
              </div>
              <div className="db-settings-row">
                <div style={{flex:1}}>
                  <div className="db-settings-label">Password</div>
                  <input className="db-settings-input" type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="New password (8+ chars)" />
                </div>
                <button className="db-settings-save" onClick={updatePassword}>Update</button>
              </div>
            </div>
          </div>

          <div className="db-card">
            <h3 className="db-card-title">Account Actions</h3>
            <div style={{display:'flex',gap:10,marginTop:12}}>
              <button className="db-danger-btn" onClick={() => { if (confirm('Sign out?')) { supabase.auth.signOut(); router.push('/') } }}>
                Sign Out
              </button>
              <button className="db-danger-btn" style={{borderColor:'rgba(239,68,68,0.3)',color:'#f87171'}} onClick={() => {
                if (confirm('Delete your account? This cannot be undone.')) { supabase.auth.signOut(); router.push('/') }
              }}>
                Delete Account
              </button>
            </div>
          </div>
        </>}

        {/* ══ CUSTOMIZE ══ */}
        {section==='customize' && <>
          <div className="db-page-header">
            <h1 className="db-page-title">Customize</h1>
            <p className="db-page-sub">fentanyl.best/{profile?.username}</p>
          </div>
          <div className="db-card" style={{marginBottom:16}}>
            <h3 className="db-card-title">Profile Info</h3>
            <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:20}}>
              <div className="db-avatar-preview">
                {avatarUrl ? <img src={avatarUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} /> : <span style={{fontSize:22}}>👤</span>}
              </div>
              <div className="db-field" style={{flex:1}}>
                <label>Avatar URL</label>
                <input className="db-input" value={avatarUrl} onChange={e=>setAvatarUrl(e.target.value)} placeholder="https://..." />
              </div>
            </div>
            <div className="db-field" style={{marginBottom:12}}>
              <label>Display Name</label>
              <input className="db-input" value={displayName} onChange={e=>setDisplayName(e.target.value)} maxLength={32} />
            </div>
            <div className="db-field">
              <label>Bio</label>
              <textarea className="db-input" value={bio} onChange={e=>setBio(e.target.value)} rows={3} maxLength={160} placeholder="Write something about yourself..." />
              <span className="db-char-count">{bio.length}/160</span>
            </div>
          </div>

          <div className="db-card" style={{marginBottom:16}}>
            <h3 className="db-card-title">Background</h3>
            <div className="db-pill-row" style={{marginBottom:12}}>
              {(['color','gradient','image'] as Profile['background_type'][]).map(t=>(
                <button key={t} className={`db-pill ${bgType===t?'active':''}`} onClick={()=>setBgType(t)}>{t}</button>
              ))}
            </div>
            <div className="db-swatch-row">
              {BG_PRESETS.map(c=>(
                <button key={c} className={`db-swatch ${bgValue===c?'selected':''}`} onClick={()=>setBgValue(c)} style={{background:c}} />
              ))}
              <input type="color" value={bgValue} onChange={e=>setBgValue(e.target.value)} className="db-color-input" />
            </div>
          </div>

          <div className="db-card" style={{marginBottom:16}}>
            <h3 className="db-card-title">Accent Color</h3>
            <div className="db-swatch-row">
              {ACCENT_PRESETS.map(c=>(
                <button key={c} className={`db-swatch ${accent===c?'selected':''}`} onClick={()=>setAccent(c)} style={{background:c}} />
              ))}
              <input type="color" value={accent} onChange={e=>setAccent(e.target.value)} className="db-color-input" />
            </div>
          </div>

          <div className="db-card" style={{marginBottom:16}}>
            <h3 className="db-card-title">Button Style</h3>
            <div className="db-pill-row">
              {(['filled','outline','glass'] as Profile['button_style'][]).map(s=>(
                <button key={s} className={`db-pill ${btnStyle===s?'active':''}`} onClick={()=>setBtnStyle(s)}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
              ))}
            </div>
          </div>

          <div className="db-card" style={{marginBottom:16}}>
            <h3 className="db-card-title">Font</h3>
            <div className="db-pill-row">
              {FONTS.map(f=>(
                <button key={f} className={`db-pill ${font===f?'active':''}`} onClick={()=>setFont(f)}
                  style={{fontFamily:f==='inter'?'Inter':f==='geist'?'Geist':'Space Grotesk'}}>
                  {f.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="db-card" style={{marginBottom:20}}>
            <h3 className="db-card-title">Music Player</h3>
            <div className="db-pill-row" style={{marginBottom:12}}>
              {(['spotify','youtube','soundcloud',null] as Profile['music_type'][]).map(t=>(
                <button key={String(t)} className={`db-pill ${musicType===t?'active':''}`} onClick={()=>setMusicType(t)}>
                  {t===null?'None':t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>
            {musicType && (
              <div className="db-field">
                <label>Music URL</label>
                <input className="db-input" value={musicUrl} onChange={e=>setMusicUrl(e.target.value)}
                  placeholder={musicType==='spotify'?'https://open.spotify.com/track/...':musicType==='youtube'?'https://youtube.com/watch?v=...':'https://soundcloud.com/...'} />
              </div>
            )}
          </div>

          <button className="db-primary-btn" onClick={save} disabled={saving}>
            {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Changes'}
          </button>
        </>}

        {/* ══ LINKS ══ */}
        {section==='links' && <>
          <div className="db-page-header">
            <h1 className="db-page-title">Links</h1>
            <p className="db-page-sub">Add and manage links on your profile page</p>
          </div>
          <div className="db-card">
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {links.map(lnk=>(
                <div key={lnk.id} className="db-link-row">
                  <select value={lnk.icon} onChange={e=>updateLink(lnk.id,'icon',e.target.value)} className="db-link-select">
                    {SOCIAL_ICONS.map(k=><option key={k} value={k}>{k}</option>)}
                  </select>
                  <input value={lnk.label} onChange={e=>updateLink(lnk.id,'label',e.target.value)} placeholder="Label" className="db-link-input db-link-label" />
                  <input value={lnk.url} onChange={e=>updateLink(lnk.id,'url',e.target.value)} placeholder="https://..." className="db-link-input" />
                  <button onClick={()=>removeLink(lnk.id)} className="db-link-del">×</button>
                </div>
              ))}
              {links.length===0 && (
                <p style={{fontSize:13,color:'var(--db-faint)',textAlign:'center',padding:'24px 0'}}>No links yet. Add one below.</p>
              )}
            </div>
            <button className="db-add-link-btn" onClick={addLink}>+ Add Link</button>
          </div>
          <button className="db-primary-btn" style={{marginTop:16}} onClick={save} disabled={saving}>
            {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Links'}
          </button>
        </>}

        {/* ══ PREMIUM ══ */}
        {section==='premium' && <>
          <div className="db-page-header">
            <h1 className="db-page-title">Premium</h1>
            <p className="db-page-sub">Unlock advanced features for your profile</p>
          </div>
          <div className="db-card" style={{textAlign:'center',padding:'40px'}}>
            <div style={{fontSize:36,marginBottom:12}}>💜</div>
            <div style={{fontSize:18,fontWeight:800,color:'var(--db-text)',marginBottom:8}}>Coming Soon</div>
            <div style={{fontSize:13,color:'var(--db-faint)'}}>Premium features are on the way. Stay tuned.</div>
          </div>
        </>}

        {/* ══ TEMPLATES ══ */}
        {section==='templates' && <>
          <div className="db-page-header">
            <h1 className="db-page-title">Templates</h1>
            <p className="db-page-sub">Choose a template for your profile page</p>
          </div>
          <div className="db-card" style={{textAlign:'center',padding:'40px'}}>
            <div style={{fontSize:36,marginBottom:12}}>🎨</div>
            <div style={{fontSize:18,fontWeight:800,color:'var(--db-text)',marginBottom:8}}>Coming Soon</div>
            <div style={{fontSize:13,color:'var(--db-faint)'}}>Profile templates are being designed. Check back soon.</div>
          </div>
        </>}

      </main>
    </div>
  )
}

// Icons
const IcoUser     = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IcoLink     = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
const IcoPaint    = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
const IcoShield   = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IcoStar     = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
const IcoGrid     = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
const IcoHelp     = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
const IcoExternal = <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const IcoShare    = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
const IcoChevUp   = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
const IcoChevDown = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
const IcoPencil   = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
const IcoUserPlus = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
const IcoEye      = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const IcoChat     = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
const IcoGear     = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
const IcoDiscord  = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.034.055a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.026c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
const IcoBarChart = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
const IcoCal      = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
