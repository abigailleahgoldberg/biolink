'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, type Profile, type Link as ProfileLink } from '@/lib/supabase'

const SECTIONS = ['profile', 'links', 'appearance', 'music'] as const
type Section = typeof SECTIONS[number]

const FONTS = ['inter', 'geist', 'space-grotesk']
const BG_PRESETS = ['#08080c','#0a0f1e','#0f0a0a','#0a1a0a','#1a0a1a']
const ACCENT_PRESETS = ['#A397DD','#C9BDFE','#60a5fa','#34d399','#f472b6','#fb923c','#facc15']
const BADGE_OPTIONS = ['🎮 Gamer','🔥 OG','⭐ Star','👑 Verified','💜 Donor','🏆 Legend','🌌 Founder']
const SOCIAL_ICONS: Record<string, string> = {
  discord: 'discord', twitter: 'twitter', tiktok: 'tiktok',
  youtube: 'youtube', instagram: 'instagram', twitch: 'twitch',
  spotify: 'spotify', github: 'github', custom: 'link'
}

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [section, setSection] = useState<Section>('profile')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  // Editable state
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [links, setLinks] = useState<ProfileLink[]>([])
  const [bgType, setBgType] = useState<Profile['background_type']>('color')
  const [bgValue, setBgValue] = useState('#08080c')
  const [accent, setAccent] = useState('#A397DD')
  const [btnStyle, setBtnStyle] = useState<Profile['button_style']>('outline')
  const [font, setFont] = useState('inter')
  const [badges, setBadges] = useState<string[]>([])
  const [musicUrl, setMusicUrl] = useState('')
  const [musicType, setMusicType] = useState<Profile['music_type']>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (!data) { router.push('/login'); return }
      setProfile(data)
      setDisplayName(data.display_name || '')
      setBio(data.bio || '')
      setAvatarUrl(data.avatar_url || '')
      setLinks(data.links || [])
      setBgType(data.background_type || 'color')
      setBgValue(data.background_value || '#08080c')
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
      display_name: displayName,
      bio, avatar_url: avatarUrl, links,
      background_type: bgType, background_value: bgValue,
      accent_color: accent, button_style: btnStyle, font,
      badges, music_url: musicUrl, music_type: musicType
    }).eq('id', profile.id)
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function addLink() {
    setLinks(l => [...l, { id: crypto.randomUUID(), label: '', url: '', icon: 'custom' }])
  }

  function updateLink(id: string, field: keyof ProfileLink, val: string) {
    setLinks(l => l.map(lnk => lnk.id === id ? { ...lnk, [field]: val } : lnk))
  }

  function removeLink(id: string) {
    setLinks(l => l.filter(lnk => lnk.id !== id))
  }

  function toggleBadge(badge: string) {
    setBadges(b => b.includes(badge) ? b.filter(x => x !== badge) : [...b, badge])
  }

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)' }}>
      Loading...
    </div>
  )

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-logo">Bio<span>Link</span></div>
        <nav className="dash-nav">
          {([
            ['profile',    'Profile',    iconUser],
            ['links',      'Links',      iconLink],
            ['appearance', 'Appearance', iconPaint],
            ['music',      'Music',      iconMusic],
          ] as [Section, string, React.ReactNode][]).map(([s, label, icon]) => (
            <button key={s} className={`dash-link ${section === s ? 'active' : ''}`} onClick={() => setSection(s)}>
              {icon} {label}
            </button>
          ))}
          {profile?.is_admin && (
            <a href="/admin" className="dash-link" style={{ marginTop: 8 }}>
              {iconShield} Admin
            </a>
          )}
        </nav>
        <div style={{ padding: '0 8px 16px', display:'flex', flexDirection:'column', gap:8 }}>
          <a href={`/${profile?.username}`} target="_blank" className="preview-btn">
            {iconExternal} View Profile
          </a>
          <button className="dash-link" onClick={() => { supabase.auth.signOut(); router.push('/') }}>
            {iconLogout} Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="dash-content">
        <div className="dash-header">
          <h1 className="dash-title">
            {section === 'profile' && 'Your Profile'}
            {section === 'links' && 'Links'}
            {section === 'appearance' && 'Appearance'}
            {section === 'music' && 'Music Player'}
          </h1>
          <p className="dash-sub">yourdomain.gg/{profile?.username}</p>
        </div>

        {/* ── Profile ── */}
        {section === 'profile' && (
          <div className="card">
            <div className="editor-section">
              <div className="editor-section-title">Avatar</div>
              <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
                <div style={{ width:64, height:64, borderRadius:'50%', background:'var(--surface2)', border:'2px solid var(--border)', overflow:'hidden', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, color:'var(--faint)' }}>
                  {avatarUrl ? <img src={avatarUrl} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="" /> : '👤'}
                </div>
                <div className="field" style={{ flex:1 }}>
                  <label>Avatar URL</label>
                  <input className="input" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} placeholder="https://..." />
                </div>
              </div>
            </div>

            <div className="editor-section">
              <div className="editor-section-title">Info</div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div className="field">
                  <label>Display Name</label>
                  <input className="input" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your Name" maxLength={32} />
                </div>
                <div className="field">
                  <label>Bio</label>
                  <textarea className="input" value={bio} onChange={e => setBio(e.target.value)} placeholder="Write something about yourself..." rows={3} maxLength={160} style={{ resize:'none' }} />
                  <span style={{ fontSize:11, color:'var(--faint)', textAlign:'right' }}>{bio.length}/160</span>
                </div>
              </div>
            </div>

            <div className="editor-section">
              <div className="editor-section-title">Badges</div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {BADGE_OPTIONS.map(b => (
                  <button key={b} onClick={() => toggleBadge(b)}
                    style={{ padding:'6px 12px', borderRadius:100, fontSize:12, fontWeight:600, cursor:'pointer', border:'1px solid', borderColor: badges.includes(b) ? 'var(--accent)' : 'var(--border)', background: badges.includes(b) ? 'rgba(163,151,221,0.12)' : 'transparent', color: badges.includes(b) ? 'var(--light)' : 'var(--muted)', transition:'all 0.15s' }}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Links ── */}
        {section === 'links' && (
          <div className="card">
            <div className="links-list">
              {links.map(lnk => (
                <div key={lnk.id} className="link-item">
                  <select value={lnk.icon} onChange={e => updateLink(lnk.id, 'icon', e.target.value)}
                    style={{ background:'var(--surface)', border:'none', color:'var(--muted)', fontSize:12, outline:'none', cursor:'pointer' }}>
                    {Object.keys(SOCIAL_ICONS).map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                  <input value={lnk.label} onChange={e => updateLink(lnk.id, 'label', e.target.value)} placeholder="Label" style={{ flex:'0 0 120px' }} />
                  <input value={lnk.url} onChange={e => updateLink(lnk.id, 'url', e.target.value)} placeholder="https://..." />
                  <button onClick={() => removeLink(lnk.id)} style={{ background:'none', border:'none', color:'var(--faint)', cursor:'pointer', fontSize:16, lineHeight:1, padding:'0 4px' }}>×</button>
                </div>
              ))}
              {links.length === 0 && (
                <p style={{ fontSize:13, color:'var(--faint)', textAlign:'center', padding:'20px 0' }}>No links yet. Add one below.</p>
              )}
            </div>
            <button className="btn btn-secondary" style={{ marginTop:12, width:'100%' }} onClick={addLink}>
              + Add Link
            </button>
          </div>
        )}

        {/* ── Appearance ── */}
        {section === 'appearance' && (
          <div className="card">
            <div className="editor-section">
              <div className="editor-section-title">Background</div>
              <div style={{ display:'flex', gap:8, marginBottom:12 }}>
                {(['color','gradient','image','animated'] as Profile['background_type'][]).map(t => (
                  <button key={t} onClick={() => setBgType(t)}
                    style={{ padding:'6px 14px', borderRadius:8, fontSize:12, fontWeight:600, cursor:'pointer', border:'1px solid', borderColor: bgType===t ? 'var(--accent)' : 'var(--border)', background: bgType===t ? 'rgba(163,151,221,0.1)' : 'transparent', color: bgType===t ? 'var(--light)' : 'var(--muted)', transition:'all 0.15s' }}>
                    {t}
                  </button>
                ))}
              </div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
                {BG_PRESETS.map(c => (
                  <button key={c} className={`color-swatch${bgValue===c?' selected':''}`} onClick={() => setBgValue(c)} style={{ background:c }} />
                ))}
                <input type="color" value={bgValue} onChange={e => setBgValue(e.target.value)} style={{ width:32, height:32, borderRadius:8, border:'none', cursor:'pointer', background:'none' }} />
              </div>
              {bgType === 'image' && (
                <input className="input" value={bgValue} onChange={e => setBgValue(e.target.value)} placeholder="Image URL..." style={{ marginTop:8 }} />
              )}
            </div>

            <div className="editor-section">
              <div className="editor-section-title">Accent Color</div>
              <div className="color-row">
                {ACCENT_PRESETS.map(c => (
                  <button key={c} className={`color-swatch${accent===c?' selected':''}`} onClick={() => setAccent(c)} style={{ background:c }} />
                ))}
                <input type="color" value={accent} onChange={e => setAccent(e.target.value)} style={{ width:32, height:32, borderRadius:8, border:'none', cursor:'pointer' }} />
              </div>
            </div>

            <div className="editor-section">
              <div className="editor-section-title">Button Style</div>
              <div style={{ display:'flex', gap:8 }}>
                {(['filled','outline','glass'] as Profile['button_style'][]).map(s => (
                  <button key={s} onClick={() => setBtnStyle(s)}
                    style={{ padding:'8px 18px', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer', border:'1px solid', borderColor: btnStyle===s ? 'var(--accent)' : 'var(--border)', background: btnStyle===s ? 'rgba(163,151,221,0.1)' : 'transparent', color: btnStyle===s ? 'var(--light)' : 'var(--muted)', transition:'all 0.15s' }}>
                    {s.charAt(0).toUpperCase()+s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="editor-section">
              <div className="editor-section-title">Font</div>
              <div style={{ display:'flex', gap:8 }}>
                {FONTS.map(f => (
                  <button key={f} onClick={() => setFont(f)}
                    style={{ padding:'8px 18px', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer', border:'1px solid', borderColor: font===f ? 'var(--accent)' : 'var(--border)', background: font===f ? 'rgba(163,151,221,0.1)' : 'transparent', color: font===f ? 'var(--light)' : 'var(--muted)', fontFamily: f === 'inter' ? 'Inter' : f === 'geist' ? 'Geist' : 'Space Grotesk', transition:'all 0.15s' }}>
                    {f.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Music ── */}
        {section === 'music' && (
          <div className="card">
            <div className="editor-section">
              <div className="editor-section-title">Music Player</div>
              <div style={{ display:'flex', gap:8, marginBottom:14 }}>
                {(['spotify','youtube','soundcloud',null] as Profile['music_type'][]).map(t => (
                  <button key={String(t)} onClick={() => setMusicType(t)}
                    style={{ padding:'6px 14px', borderRadius:8, fontSize:12, fontWeight:600, cursor:'pointer', border:'1px solid', borderColor: musicType===t ? 'var(--accent)' : 'var(--border)', background: musicType===t ? 'rgba(163,151,221,0.1)' : 'transparent', color: musicType===t ? 'var(--light)' : 'var(--muted)', transition:'all 0.15s' }}>
                    {t === null ? 'None' : t.charAt(0).toUpperCase()+t.slice(1)}
                  </button>
                ))}
              </div>
              {musicType && (
                <div className="field">
                  <label>Music URL</label>
                  <input className="input" value={musicUrl} onChange={e => setMusicUrl(e.target.value)}
                    placeholder={musicType === 'spotify' ? 'https://open.spotify.com/track/...' : musicType === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://soundcloud.com/...'} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Save button */}
        <button className="btn btn-primary" style={{ marginTop:20 }} onClick={save} disabled={saving}>
          {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Changes'}
        </button>
      </main>
    </div>
  )
}

// Icons
const iconUser = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const iconLink = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
const iconPaint = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
const iconMusic = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
const iconShield = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const iconExternal = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const iconLogout = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
