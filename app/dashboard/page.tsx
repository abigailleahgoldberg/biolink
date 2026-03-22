'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase, type Profile, type Link as ProfileLink } from '@/lib/supabase'

type AccountTab = 'overview' | 'analytics' | 'badges' | 'settings'
type MainSection = 'account' | 'customize' | 'links'

const BADGE_OPTIONS = [
  { id: 'og', emoji: '🥇', name: 'OG', desc: 'Be an early supporter of fentanyl.best' },
  { id: 'verified', emoji: '✅', name: 'Verified', desc: 'Purchase or be a known content creator.' },
  { id: 'donor', emoji: '💚', name: 'Donor', desc: 'Donate to fentanyl.best.' },
  { id: 'premium', emoji: '💜', name: 'Premium', desc: 'Purchase the premium package.' },
  { id: 'staff', emoji: '🛡️', name: 'Staff', desc: 'Be a part of the fentanyl.best team.' },
  { id: 'winner', emoji: '🏆', name: 'Winner', desc: 'Win a fentanyl.best event.' },
  { id: 'founder', emoji: '🌌', name: 'Founder', desc: 'Exclusive founder badge.' },
  { id: 'bughunter', emoji: '🐛', name: 'Bug Hunter', desc: 'Report a bug to the team.' },
]

const ACCENT_PRESETS = ['#A397DD','#C9BDFE','#B7AAF3','#9583CB','#60a5fa','#34d399','#f472b6','#fb923c']
const BG_PRESETS = ['#07060f','#0a0f1e','#0f0a1a','#0a1a0a','#1a0a0a']
const FONTS = ['inter', 'geist', 'space-grotesk']
const SOCIAL_ICONS = ['discord','twitter','tiktok','youtube','instagram','twitch','spotify','github','custom']

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [section, setSection] = useState<MainSection>('account')
  const [accountTab, setAccountTab] = useState<AccountTab>('overview')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Profile fields
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
  const [musicUrl, setMusicUrl] = useState('')
  const [musicType, setMusicType] = useState<Profile['music_type']>(null)

  // Settings fields
  const [newUsername, setNewUsername] = useState('')
  const [newDisplayName, setNewDisplayName] = useState('')
  const [newEmail, setNewEmail] = useState('')
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
    if (!profile) return
    setSaving(true)
    await supabase.from('profiles').update({
      display_name: displayName, bio, avatar_url: avatarUrl, links,
      background_type: bgType, background_value: bgValue,
      accent_color: accent, button_style: btnStyle, font,
      badges, music_url: musicUrl, music_type: musicType
    }).eq('id', profile.id)
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
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
    setSettingsMsg(error ? error.message : 'Password updated!')
    setNewPassword('')
    setTimeout(() => setSettingsMsg(''), 3000)
  }

  function addLink() { setLinks(l => [...l, { id: crypto.randomUUID(), label: '', url: '', icon: 'custom' }]) }
  function updateLink(id: string, field: keyof ProfileLink, val: string) { setLinks(l => l.map(lnk => lnk.id === id ? { ...lnk, [field]: val } : lnk)) }
  function removeLink(id: string) { setLinks(l => l.filter(lnk => lnk.id !== id)) }
  function toggleBadge(id: string) { setBadges(b => b.includes(id) ? b.filter(x => x !== id) : [...b, id]) }

  // Profile completion
  const checks = [
    { label: 'Upload an avatar', done: !!avatarUrl },
    { label: 'Add a bio', done: !!bio },
    { label: 'Add your first link', done: links.length > 0 },
    { label: 'Choose an accent color', done: accent !== '#A397DD' },
    { label: 'Get your first profile view', done: (profile?.view_count || 0) > 0 },
  ]
  const completionPct = Math.round((checks.filter(c => c.done).length / checks.length) * 100)

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', color:'var(--muted)', fontSize:14 }}>
      Loading...
    </div>
  )

  return (
    <div className="dash-layout">
      {/* ── SIDEBAR ── */}
      <aside className="dash-sidebar">
        <Link href="/" className="dash-brand">
          <Image src="/needle-logo.png" alt="" width={20} height={20} style={{ objectFit:'contain', filter:'drop-shadow(0 0 4px rgba(163,151,221,0.5))' }} />
          <span>fentanyl<em>.best</em></span>
        </Link>

        <nav className="dash-nav">
          {/* Account with sub-items */}
          <button className={`dash-link ${section==='account'?'active':''}`} onClick={() => setSection('account')}>
            {icoUser} Account
          </button>
          {section === 'account' && (
            <div className="dash-subnav">
              {(['overview','analytics','badges','settings'] as AccountTab[]).map(t => (
                <button key={t} className={`dash-sublink ${accountTab===t?'active':''}`} onClick={() => setAccountTab(t)}>
                  {t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>
          )}

          <button className={`dash-link ${section==='customize'?'active':''}`} onClick={() => setSection('customize')}>
            {icoPaint} Customize
          </button>
          <button className={`dash-link ${section==='links'?'active':''}`} onClick={() => setSection('links')}>
            {icoLink} Links
          </button>

          {profile?.is_admin && (
            <a href="/admin" className="dash-link">{icoShield} Admin</a>
          )}
        </nav>

        <div className="dash-sidebar-footer">
          <a href={`/${profile?.username}`} target="_blank" className="dash-footer-btn">
            {icoExternal} My Page
          </a>
          <button className="dash-footer-btn" onClick={() => { supabase.auth.signOut(); router.push('/') }}>
            {icoLogout} Sign out
          </button>
          <div className="dash-user-chip">
            <div className="dash-user-avatar">
              {avatarUrl ? <img src={avatarUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} /> : profile?.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:'var(--text)'}}>{profile?.username}</div>
              <div style={{fontSize:10,color:'var(--faint)'}}>fentanyl.best/{profile?.username}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="dash-content">

        {/* ════ ACCOUNT ════ */}
        {section === 'account' && accountTab === 'overview' && (
          <>
            <div className="dash-header">
              <h1 className="dash-title">Account Overview</h1>
            </div>

            {/* Stat cards */}
            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-label">Username {icoEdit}</div>
                <div className="stat-val">@{profile?.username}</div>
                <div className="stat-hint">Your public handle</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Display Name</div>
                <div className="stat-val">{profile?.display_name || profile?.username}</div>
                <div className="stat-hint">Shown on your profile</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Profile Views {icoEye}</div>
                <div className="stat-val">{profile?.view_count || 0}</div>
                <div className="stat-hint">Total all-time views</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Links</div>
                <div className="stat-val">{links.length}</div>
                <div className="stat-hint">Active on your page</div>
              </div>
            </div>

            {/* Profile completion + manage panel */}
            <div className="overview-grid">
              <div className="card">
                <div className="editor-section-title" style={{marginBottom:14}}>Profile Completion</div>
                <div className="completion-bar-track">
                  <div className="completion-bar-fill" style={{width:`${completionPct}%`}} />
                </div>
                <div style={{fontSize:11,color:'var(--muted)',textAlign:'right',marginTop:5,marginBottom:16}}>{completionPct}% complete</div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  {checks.map(c => (
                    <div key={c.label} className={`completion-item ${c.done?'done':''}`}>
                      <span className="completion-dot">{c.done ? '✓' : '○'}</span>
                      {c.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="editor-section-title" style={{marginBottom:14}}>Manage your account</div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  {[
                    { label: 'Change Username', action: () => setAccountTab('settings') },
                    { label: 'Change Display Name', action: () => setAccountTab('settings') },
                    { label: 'Account Settings', action: () => setAccountTab('settings') },
                    { label: 'Badges', action: () => setAccountTab('badges') },
                  ].map(item => (
                    <button key={item.label} className="manage-btn" onClick={item.action}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {section === 'account' && accountTab === 'analytics' && (
          <>
            <div className="dash-header">
              <h1 className="dash-title">Analytics</h1>
              <p className="dash-sub">Track your profile performance</p>
            </div>
            <div className="stat-grid">
              {[
                { label: 'Total Link Clicks', val: '0', hint: 'All time' },
                { label: 'Click Rate', val: '0.00%', hint: 'Links clicked / views' },
                { label: 'Profile Views', val: String(profile?.view_count || 0), hint: 'All time' },
                { label: 'Avg Daily Views', val: '0', hint: 'Last 14 days' },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-val">{s.val}</div>
                  <div className="stat-hint">{s.hint}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{marginTop:16}}>
              <div className="editor-section-title" style={{marginBottom:12}}>Profile Views</div>
              <div style={{height:120,display:'flex',alignItems:'flex-end',gap:4}}>
                {Array.from({length:14},(_,i)=>(
                  <div key={i} style={{flex:1,background:'rgba(163,151,221,0.12)',borderRadius:4,height:`${Math.random()*60+10}%`,minHeight:4}} />
                ))}
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:10,color:'var(--faint)'}}>
                <span>14 days ago</span><span>Today</span>
              </div>
            </div>
            <div className="overview-grid" style={{marginTop:16}}>
              <div className="card">
                <div className="editor-section-title" style={{marginBottom:10}}>Most Clicked Links</div>
                <p style={{fontSize:13,color:'var(--faint)',textAlign:'center',padding:'16px 0'}}>No clicks yet — share your page to get started.</p>
              </div>
              <div className="card">
                <div className="editor-section-title" style={{marginBottom:10}}>Top Referrers</div>
                <p style={{fontSize:13,color:'var(--faint)',textAlign:'center',padding:'16px 0'}}>No referrer data yet.</p>
              </div>
            </div>
          </>
        )}

        {section === 'account' && accountTab === 'badges' && (
          <>
            <div className="dash-header">
              <h1 className="dash-title">Badges</h1>
              <p className="dash-sub">Earn and display badges on your profile</p>
            </div>
            <div className="badge-grid">
              {BADGE_OPTIONS.map(b => {
                const owned = badges.includes(b.id)
                return (
                  <div key={b.id} className={`badge-card ${owned?'owned':''}`}>
                    <div className="badge-emoji">{b.emoji}</div>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:owned?'var(--light)':'var(--text)'}}>{b.name}</div>
                      <div style={{fontSize:11,color:'var(--faint)',marginTop:2}}>{b.desc}</div>
                    </div>
                    <button
                      className={`badge-action-btn ${owned?'active':''}`}
                      onClick={() => toggleBadge(b.id)}
                    >
                      {owned ? 'Remove' : 'Add'}
                    </button>
                  </div>
                )
              })}
            </div>
            {badges.length > 0 && (
              <div className="card" style={{marginTop:16}}>
                <div className="editor-section-title" style={{marginBottom:12}}>Active Badges</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {badges.map(id => {
                    const b = BADGE_OPTIONS.find(x => x.id === id)
                    return b ? (
                      <span key={id} style={{padding:'4px 12px',borderRadius:100,fontSize:12,fontWeight:600,background:'rgba(163,151,221,0.12)',border:'1px solid rgba(163,151,221,0.25)',color:'var(--light)'}}>
                        {b.emoji} {b.name}
                      </span>
                    ) : null
                  })}
                </div>
                <button className="btn btn-primary" style={{marginTop:14,padding:'10px 24px',fontSize:13}} onClick={save} disabled={saving}>
                  {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Badge Settings'}
                </button>
              </div>
            )}
          </>
        )}

        {section === 'account' && accountTab === 'settings' && (
          <>
            <div className="dash-header">
              <h1 className="dash-title">Account Settings</h1>
            </div>
            {settingsMsg && <div className="err-msg" style={{marginBottom:16,color:'var(--light)',background:'rgba(163,151,221,0.08)',borderColor:'rgba(163,151,221,0.2)'}}>{settingsMsg}</div>}

            <div className="card" style={{marginBottom:16}}>
              <div className="editor-section-title" style={{marginBottom:14}}>General Information</div>
              <div style={{display:'flex',flexDirection:'column',gap:14}}>
                <div style={{display:'flex',gap:10,alignItems:'flex-end'}}>
                  <div className="field" style={{flex:1}}>
                    <label>Username</label>
                    <input className="input" value={newUsername} onChange={e=>setNewUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/g,''))} maxLength={20} />
                  </div>
                  <button className="btn btn-secondary" style={{padding:'10px 16px',fontSize:13,flexShrink:0}} onClick={saveUsername}>Save</button>
                </div>
                <div style={{display:'flex',gap:10,alignItems:'flex-end'}}>
                  <div className="field" style={{flex:1}}>
                    <label>Display Name</label>
                    <input className="input" value={newDisplayName} onChange={e=>setNewDisplayName(e.target.value)} maxLength={32} />
                  </div>
                  <button className="btn btn-secondary" style={{padding:'10px 16px',fontSize:13,flexShrink:0}} onClick={saveDisplayName}>Save</button>
                </div>
              </div>
            </div>

            <div className="card" style={{marginBottom:16}}>
              <div className="editor-section-title" style={{marginBottom:14}}>Security</div>
              <div style={{display:'flex',flexDirection:'column',gap:14}}>
                <div style={{display:'flex',gap:10,alignItems:'flex-end'}}>
                  <div className="field" style={{flex:1}}>
                    <label>New Email</label>
                    <input className="input" type="email" value={newEmail} onChange={e=>setNewEmail(e.target.value)} placeholder="new@email.com" />
                  </div>
                  <button className="btn btn-secondary" style={{padding:'10px 16px',fontSize:13,flexShrink:0}} onClick={updateEmail}>Update</button>
                </div>
                <div style={{display:'flex',gap:10,alignItems:'flex-end'}}>
                  <div className="field" style={{flex:1}}>
                    <label>New Password</label>
                    <input className="input" type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="8+ characters" />
                  </div>
                  <button className="btn btn-secondary" style={{padding:'10px 16px',fontSize:13,flexShrink:0}} onClick={updatePassword}>Update</button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="editor-section-title" style={{marginBottom:14}}>Account Actions</div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                <button className="btn btn-secondary btn-full" style={{padding:'12px',justifyContent:'center'}} onClick={() => { supabase.auth.signOut(); router.push('/') }}>
                  Sign out
                </button>
                <button className="btn btn-danger btn-full" style={{padding:'12px',justifyContent:'center'}} onClick={async () => {
                  if (confirm('Delete your account? This cannot be undone.')) {
                    await supabase.auth.signOut()
                    router.push('/')
                  }
                }}>
                  Delete account
                </button>
              </div>
            </div>
          </>
        )}

        {/* ════ CUSTOMIZE ════ */}
        {section === 'customize' && (
          <>
            <div className="dash-header">
              <h1 className="dash-title">Customize</h1>
              <p className="dash-sub">fentanyl.best/{profile?.username}</p>
            </div>
            <div className="card" style={{marginBottom:16}}>
              <div className="editor-section">
                <div className="editor-section-title">Avatar</div>
                <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:16}}>
                  <div style={{width:64,height:64,borderRadius:'50%',background:'var(--surface)',border:'2px solid var(--border)',overflow:'hidden',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,color:'var(--faint)'}}>
                    {avatarUrl ? <img src={avatarUrl} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="" /> : '👤'}
                  </div>
                  <div className="field" style={{flex:1}}>
                    <label>Avatar URL</label>
                    <input className="input" value={avatarUrl} onChange={e=>setAvatarUrl(e.target.value)} placeholder="https://..." />
                  </div>
                </div>
              </div>
              <div className="editor-section">
                <div className="editor-section-title">Display Name</div>
                <input className="input" value={displayName} onChange={e=>setDisplayName(e.target.value)} placeholder="Your Name" maxLength={32} />
              </div>
              <div className="editor-section">
                <div className="editor-section-title">Bio</div>
                <textarea className="input" value={bio} onChange={e=>setBio(e.target.value)} placeholder="Write something about yourself..." rows={3} maxLength={160} />
                <span style={{fontSize:11,color:'var(--faint)',textAlign:'right',display:'block',marginTop:4}}>{bio.length}/160</span>
              </div>
            </div>

            <div className="card" style={{marginBottom:16}}>
              <div className="editor-section">
                <div className="editor-section-title">Background</div>
                <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
                  {(['color','gradient','image'] as Profile['background_type'][]).map(t=>(
                    <button key={t} className={`style-pill ${bgType===t?'active':''}`} onClick={()=>setBgType(t)}>{t}</button>
                  ))}
                </div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:10}}>
                  {BG_PRESETS.map(c=>(
                    <button key={c} className={`color-swatch ${bgValue===c?'selected':''}`} onClick={()=>setBgValue(c)} style={{background:c}} />
                  ))}
                  <input type="color" value={bgValue} onChange={e=>setBgValue(e.target.value)} style={{width:32,height:32,borderRadius:8,border:'none',cursor:'pointer'}} />
                </div>
              </div>
              <div className="editor-section">
                <div className="editor-section-title">Accent Color</div>
                <div className="color-row">
                  {ACCENT_PRESETS.map(c=>(
                    <button key={c} className={`color-swatch ${accent===c?'selected':''}`} onClick={()=>setAccent(c)} style={{background:c}} />
                  ))}
                  <input type="color" value={accent} onChange={e=>setAccent(e.target.value)} style={{width:32,height:32,borderRadius:8,border:'none',cursor:'pointer'}} />
                </div>
              </div>
              <div className="editor-section">
                <div className="editor-section-title">Button Style</div>
                <div style={{display:'flex',gap:8}}>
                  {(['filled','outline','glass'] as Profile['button_style'][]).map(s=>(
                    <button key={s} className={`style-pill ${btnStyle===s?'active':''}`} onClick={()=>setBtnStyle(s)}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="editor-section">
                <div className="editor-section-title">Font</div>
                <div style={{display:'flex',gap:8}}>
                  {FONTS.map(f=>(
                    <button key={f} className={`style-pill ${font===f?'active':''}`} onClick={()=>setFont(f)} style={{fontFamily:f==='inter'?'Inter':f==='geist'?'Geist':'Space Grotesk'}}>
                      {f.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Music */}
            <div className="card" style={{marginBottom:16}}>
              <div className="editor-section">
                <div className="editor-section-title">Music Player</div>
                <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>
                  {(['spotify','youtube','soundcloud',null] as Profile['music_type'][]).map(t=>(
                    <button key={String(t)} className={`style-pill ${musicType===t?'active':''}`} onClick={()=>setMusicType(t)}>
                      {t===null?'None':t.charAt(0).toUpperCase()+t.slice(1)}
                    </button>
                  ))}
                </div>
                {musicType && (
                  <div className="field">
                    <label>Music URL</label>
                    <input className="input" value={musicUrl} onChange={e=>setMusicUrl(e.target.value)}
                      placeholder={musicType==='spotify'?'https://open.spotify.com/track/...':musicType==='youtube'?'https://youtube.com/watch?v=...':'https://soundcloud.com/...'} />
                  </div>
                )}
              </div>
            </div>

            <button className="btn btn-primary" style={{padding:'12px 32px',fontSize:14}} onClick={save} disabled={saving}>
              {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Changes'}
            </button>
          </>
        )}

        {/* ════ LINKS ════ */}
        {section === 'links' && (
          <>
            <div className="dash-header">
              <h1 className="dash-title">Links</h1>
              <p className="dash-sub">Add links to your profile page</p>
            </div>
            <div className="card">
              <div className="links-list">
                {links.map(lnk=>(
                  <div key={lnk.id} className="link-item">
                    <select value={lnk.icon} onChange={e=>updateLink(lnk.id,'icon',e.target.value)}
                      style={{background:'var(--surface)',border:'1px solid var(--border)',color:'var(--muted)',fontSize:12,outline:'none',cursor:'pointer',borderRadius:8,padding:'4px 8px'}}>
                      {SOCIAL_ICONS.map(k=><option key={k} value={k}>{k}</option>)}
                    </select>
                    <input value={lnk.label} onChange={e=>updateLink(lnk.id,'label',e.target.value)} placeholder="Label" style={{flex:'0 0 130px'}} />
                    <input value={lnk.url} onChange={e=>updateLink(lnk.id,'url',e.target.value)} placeholder="https://..." />
                    <button onClick={()=>removeLink(lnk.id)} style={{background:'none',border:'none',color:'var(--faint)',cursor:'pointer',fontSize:18,lineHeight:1,padding:'0 4px',transition:'color .15s'}}
                      onMouseOver={e=>(e.currentTarget.style.color='#f87171')} onMouseOut={e=>(e.currentTarget.style.color='var(--faint)')}>×</button>
                  </div>
                ))}
                {links.length===0 && (
                  <p style={{fontSize:13,color:'var(--faint)',textAlign:'center',padding:'24px 0'}}>No links yet. Add one below.</p>
                )}
              </div>
              <button className="btn btn-secondary" style={{marginTop:12,width:'100%',justifyContent:'center',padding:'10px'}} onClick={addLink}>
                + Add Link
              </button>
            </div>
            <button className="btn btn-primary" style={{marginTop:16,padding:'12px 32px',fontSize:14}} onClick={save} disabled={saving}>
              {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Links'}
            </button>
          </>
        )}

      </main>
    </div>
  )
}

// Icons
const icoUser = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const icoLink = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
const icoPaint = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
const icoShield = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const icoExternal = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const icoLogout = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
const icoEdit = <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:4,opacity:.5}}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
const icoEye = <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:4,opacity:.5}}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
