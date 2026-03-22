'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase, type Profile, type Link as ProfileLink } from '@/lib/supabase'

type AccountTab = 'overview' | 'analytics' | 'badges' | 'settings'
type MainSection = 'account' | 'customize' | 'links' | 'premium' | 'templates'

const ALL_BADGES = [
  { id:'staff',      emoji:'🛡️', name:'Staff',         desc:'Be a part of the fentanyl.best team.',              action:'Staff Only' },
  { id:'helper',     emoji:'🤝', name:'Helper',        desc:'Be active and help users in the community.',        action:'Join Discord' },
  { id:'premium',    emoji:'💎', name:'Premium',       desc:'Purchase the premium package.',                     action:'Purchase' },
  { id:'verified',   emoji:'✅', name:'Verified',      desc:'Purchase or be a known content creator.',           action:'Unlock' },
  { id:'donor',      emoji:'❤️', name:'Donor',         desc:'Donate to fentanyl.best.',                         action:'Donate' },
  { id:'gifter',     emoji:'🎁', name:'Gifter',        desc:'Gift a fentanyl.best product to another user.',    action:'Gift' },
  { id:'og',         emoji:'🔥', name:'OG',            desc:'Be an early supporter of fentanyl.best.',          action:null },
  { id:'bughunter',  emoji:'🐛', name:'Bug Hunter',    desc:'Report a bug to the fentanyl.best team.',          action:'Report' },
  { id:'winner',     emoji:'🏆', name:'Winner',        desc:'Win a fentanyl.best event.',                       action:null },
  { id:'founder',    emoji:'🌌', name:'Founder',       desc:'Exclusive founder badge.',                         action:null },
  { id:'christmas',  emoji:'🎄', name:'Christmas 2025',desc:'Exclusive badge from the 2025 winter event.',      action:null },
  { id:'secondplace',emoji:'🥈', name:'Second Place',  desc:'Get second place in a fentanyl.best event.',       action:null },
]

const ACCENT_PRESETS = ['#A397DD','#C9BDFE','#B7AAF3','#9583CB','#60a5fa','#34d399','#f472b6','#fb923c']
const BG_PRESETS     = ['#07060f','#0a0f1e','#0f0a1a','#0a1a0a','#1a0a0a']
const FONTS          = ['inter','geist','space-grotesk']
const SOCIAL_ICONS   = ['discord','twitter','tiktok','youtube','instagram','twitch','spotify','github','custom']

export default function Dashboard() {
  const router = useRouter()
  const [profile,    setProfile]    = useState<Profile | null>(null)
  const [loading,    setLoading]    = useState(true)
  const [section,    setSection]    = useState<MainSection>('account')
  const [accountTab, setAccountTab] = useState<AccountTab>('overview')
  const [saving,     setSaving]     = useState(false)
  const [saved,      setSaved]      = useState(false)

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

  // settings fields
  const [sUsername,   setSUsername]   = useState('')
  const [sDisplayName,setSDisplayName]= useState('')
  const [sBio,        setSBio]        = useState('')
  const [sEmail,      setSEmail]      = useState('')
  const [sPassword,   setSPassword]   = useState('')
  const [sMsg,        setSMsg]        = useState('')

  // badges settings
  const [monoChrome,  setMonoChrome]  = useState(false)
  const [badgeColor,  setBadgeColor]  = useState('#ffffff')
  const [activeBadges,setActiveBadges]= useState<string[]>([])

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (!data) { router.push('/login'); return }
      setProfile(data); setDisplayName(data.display_name||''); setSDisplayName(data.display_name||'')
      setSUsername(data.username||''); setBio(data.bio||''); setSBio(data.bio||''); setAvatarUrl(data.avatar_url||'')
      setLinks(data.links||[]); setBgType(data.background_type||'color'); setBgValue(data.background_value||'#07060f')
      setAccent(data.accent_color||'#A397DD'); setBtnStyle(data.button_style||'outline')
      setFont(data.font||'inter'); setBadges(data.badges||[]); setActiveBadges(data.badges||[])
      setMusicUrl(data.music_url||''); setMusicType(data.music_type||null); setLoading(false)
    }
    load()
  }, [router])

  async function save() {
    if (!profile) return; setSaving(true)
    await supabase.from('profiles').update({
      display_name: displayName, bio, avatar_url: avatarUrl, links,
      background_type: bgType, background_value: bgValue,
      accent_color: accent, button_style: btnStyle, font,
      badges: activeBadges, music_url: musicUrl, music_type: musicType
    }).eq('id', profile.id)
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  async function saveSetting(field: string, value: string) {
    if (!profile) return
    if (field === 'email') {
      const { error } = await supabase.auth.updateUser({ email: value })
      setSMsg(error ? error.message : 'Check your new email for confirmation.'); setTimeout(()=>setSMsg(''),4000); return
    }
    if (field === 'password') {
      if (value.length < 8) { setSMsg('Password must be 8+ characters.'); return }
      const { error } = await supabase.auth.updateUser({ password: value })
      setSMsg(error ? error.message : 'Password updated!'); setSPassword(''); setTimeout(()=>setSMsg(''),3000); return
    }
    const { error } = await supabase.from('profiles').update({ [field]: value }).eq('id', profile.id)
    if (error) { setSMsg(field==='username'?'Username already taken.':'Failed to update.'); return }
    setProfile(p => p ? { ...p, [field]: value } : p)
    setSMsg(field+' updated!'); setTimeout(()=>setSMsg(''),3000)
  }

  function addLink()    { setLinks(l=>[...l,{id:crypto.randomUUID(),label:'',url:'',icon:'custom'}]) }
  function removeLink(id: string) { setLinks(l=>l.filter(x=>x.id!==id)) }
  function updateLink(id: string, field: keyof ProfileLink, val: string) {
    setLinks(l=>l.map(x=>x.id===id?{...x,[field]:val}:x))
  }
  function toggleActiveBadge(id: string) {
    setActiveBadges(b=>b.includes(id)?b.filter(x=>x!==id):[...b,id])
  }

  const checks = [
    { label:'Upload An Avatar',    done:!!avatarUrl },
    { label:'Add A Description',   done:!!bio },
    { label:'Add Socials',         done:links.length>0 },
    { label:'Get a profile view',  done:(profile?.view_count||0)>0 },
  ]
  const completionPct = Math.round((checks.filter(c=>c.done).length/checks.length)*100)

  if (loading) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0e0c1a',color:'rgba(255,255,255,0.3)',fontSize:13}}>
      Loading...
    </div>
  )

  const Sidebar = (
    <aside className="db-sidebar">
      <Link href="/" className="db-logo">
        <Image src="/needle-logo.png" alt="" width={24} height={24} style={{objectFit:'contain',filter:'drop-shadow(0 0 5px rgba(163,151,221,0.5))'}}/>
        <span>fentanyl<em>.best</em></span>
      </Link>

      <nav className="db-nav">
        <button className={`db-ni ${section==='account'?'active':''}`} onClick={()=>setSection('account')}>
          <span className="db-ni-ico">{IUser}</span><span>Account</span>
          <span className="db-ni-chev">{section==='account'?IChevUp:IChevDn}</span>
        </button>
        {section==='account' && (
          <div className="db-sub">
            {(['overview','analytics','badges','settings'] as AccountTab[]).map(t=>(
              <button key={t} className={`db-si ${accountTab===t?'active':''}`} onClick={()=>setAccountTab(t)}>
                {t.charAt(0).toUpperCase()+t.slice(1)}
              </button>
            ))}
          </div>
        )}
        <button className={`db-ni ${section==='customize'?'active':''}`} onClick={()=>setSection('customize')}>
          <span className="db-ni-ico">{IPaint}</span><span>Customize</span>
        </button>
        <button className={`db-ni ${section==='links'?'active':''}`} onClick={()=>setSection('links')}>
          <span className="db-ni-ico">{ILink}</span><span>Links</span>
        </button>
        <button className={`db-ni ${section==='premium'?'active':''}`} onClick={()=>setSection('premium')}>
          <span className="db-ni-ico">{IStar}</span><span>Premium</span>
          <span className="db-ni-chev">{IChevDn}</span>
        </button>
        <button className={`db-ni ${section==='templates'?'active':''}`} onClick={()=>setSection('templates')}>
          <span className="db-ni-ico">{IGrid}</span><span>Templates</span>
        </button>
        {profile?.is_admin && (
          <a href="/admin" className="db-ni"><span className="db-ni-ico">{IShield}</span><span>Admin</span></a>
        )}
      </nav>

      <div className="db-bot">
        <p className="db-bot-hint">Have a question or need support?</p>
        <a href="#" className="db-bot-btn">{IHelp} Help Center</a>
        <p className="db-bot-hint" style={{marginTop:12}}>Check out your page</p>
        <a href={`/${profile?.username}`} target="_blank" className="db-bot-btn">{IExt} My Page</a>
        <button className="db-share-btn" onClick={()=>navigator.clipboard.writeText(`https://fentanyl.best/${profile?.username}`)}>
          {IShare} Share Your Profile
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
          <button className="db-udots" onClick={()=>{supabase.auth.signOut();router.push('/')}}>⋯</button>
        </div>
      </div>
    </aside>
  )

  return (
    <div className="db-wrap">
      {Sidebar}
      <main className="db-main">

        {/* ══════════════════════════════════
            OVERVIEW
        ══════════════════════════════════ */}
        {section==='account' && accountTab==='overview' && <>
          <h1 className="db-h1">Account Overview</h1>

          {/* 4 stat cards */}
          <div className="db-stat4">
            <div className="db-scard">
              <div className="db-scard-top"><span className="db-slabel">Username</span>{IPencil}</div>
              <div className="db-sval">@{profile?.username}</div>
              <div className="db-ssub">Change available now</div>
            </div>
            <div className="db-scard">
              <div className="db-scard-top"><span className="db-slabel">Display Name</span>{IUserP}</div>
              <div className="db-sval">{profile?.display_name||profile?.username}</div>
              <div className="db-ssub">Shown on your profile</div>
            </div>
            <div className="db-scard">
              <div className="db-scard-top"><span className="db-slabel">Links</span>{ILink}</div>
              <div className="db-sval">{links.length}</div>
              <div className="db-ssub">Active on your page</div>
            </div>
            <div className="db-scard">
              <div className="db-scard-top"><span className="db-slabel">Profile Views</span>{IEye}</div>
              <div className="db-sval">{profile?.view_count||0}</div>
              <div className="db-ssub">All-time total</div>
            </div>
          </div>

          <h2 className="db-h2">Account Statistics</h2>

          <div className="db-2col">
            {/* LEFT */}
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <div className="db-card">
                <div className="db-card-h">Profile Completion</div>
                <div style={{display:'flex',alignItems:'center',gap:12,marginTop:12}}>
                  <div className="db-prog-t"><div className="db-prog-f" style={{width:`${completionPct}%`}}/></div>
                  <span className="db-muted" style={{fontSize:12,flexShrink:0}}>{completionPct}% completed</span>
                </div>
                {completionPct===100 && (
                  <div className="db-complete-msg">
                    <span>✅</span>
                    <div>
                      <div style={{fontSize:14,fontWeight:700,color:'#4ade80'}}>Your profile is complete!</div>
                      <div className="db-muted" style={{fontSize:12,marginTop:2}}>Discover more features to enhance your experience.</div>
                    </div>
                  </div>
                )}
                <div className="db-check-row">
                  {checks.map(c=>(
                    <div key={c.label} className={`db-cpill ${c.done?'done':''}`}>
                      <span className={`db-cico ${c.done?'done':''}`}>{c.done?'✓':'○'}</span>
                      {c.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini analytics */}
              <h2 className="db-h2" style={{margin:'8px 0 10px'}}>
                Account Analytics
                <button className="db-viewmore" onClick={()=>setAccountTab('analytics')}>View More</button>
              </h2>
              <div className="db-2col-eq">
                <div className="db-card">
                  <div className="db-card-h" style={{marginBottom:12}}>Profile Views <span style={{color:'var(--dba)'}}>last 14 days</span></div>
                  <div className="db-bar-chart">
                    {Array.from({length:14},(_,i)=>(
                      <div key={i} className="db-bar" style={{height:`${Math.random()*70+5}%`}}/>
                    ))}
                  </div>
                  <div className="db-chart-ax"><span>14 days ago</span><span>Today</span></div>
                </div>
                <div className="db-card">
                  <div className="db-card-h" style={{marginBottom:12}}>Link Clicks <span style={{color:'var(--dba)'}}>last 14 days</span></div>
                  <div style={{height:100,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:'var(--dbf)'}}>
                    No clicks yet
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <div className="db-card">
                <div className="db-card-h">Manage your account</div>
                <div className="db-muted" style={{fontSize:12,marginBottom:14,marginTop:4}}>Change your email, username and more.</div>
                <div className="db-mlist">
                  {[
                    {ico:IPencil, label:'Change Username',    cb:()=>{ setSection('account');setAccountTab('settings') }},
                    {ico:IChat,   label:'Change Display Name',cb:()=>{ setSection('account');setAccountTab('settings') }},
                    {ico:IRefresh,label:'Manage Aliases',     cb:()=>{}},
                    {ico:IGear,   label:'Account Settings',   cb:()=>{ setSection('account');setAccountTab('settings') }},
                  ].map(item=>(
                    <button key={item.label} className="db-mrow" onClick={item.cb}>
                      <span className="db-mico">{item.ico}</span>
                      <span>{item.label}</span>
                      <span style={{marginLeft:'auto',color:'var(--dbf)',fontSize:16}}>›</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="db-card">
                <div className="db-card-h">Connections</div>
                <div className="db-muted" style={{fontSize:12,marginBottom:12,marginTop:4}}>Link your Discord account to fentanyl.best</div>
                <div className="db-conn-row">
                  <span style={{color:'#7289da',display:'flex'}}>{IDiscord}</span>
                  <span style={{flex:1,fontSize:13,fontWeight:600,color:'var(--dbt)'}}>Discord</span>
                  <button className="db-conn-btn">Connect</button>
                </div>
              </div>
            </div>
          </div>
        </>}

        {/* ══════════════════════════════════
            ANALYTICS
        ══════════════════════════════════ */}
        {section==='account' && accountTab==='analytics' && <>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:6}}>
            {IBarChart}
            <h1 className="db-h1" style={{marginBottom:0}}>Account Analytics</h1>
          </div>
          <p className="db-muted" style={{fontSize:13,marginBottom:24}}>Track your profile performance and see how many people are visiting your profile.</p>

          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <span style={{fontSize:15,fontWeight:600,color:'var(--dbt)'}}>Time Range</span>
              <span className="db-pill-badge">Last updated less than a minute ago</span>
            </div>
            <div className="db-date-btn">{ICal} Last 14 days</div>
          </div>

          <div className="db-stat4" style={{marginBottom:20}}>
            {[
              {label:'Total Link Clicks',val:'0',    sub:'All time'},
              {label:'Click Rate',       val:'0.00%',sub:'Clicks / views'},
              {label:'Profile Views',    val:String(profile?.view_count||0),sub:'All time'},
              {label:'Avg Daily Views',  val:'0',    sub:'Last 14 days'},
            ].map(s=>(
              <div key={s.label} className="db-scard">
                <div className="db-slabel" style={{marginBottom:8}}>{s.label}</div>
                <div className="db-sval">{s.val}</div>
                <div className="db-ssub">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="db-2col">
            <div className="db-card">
              <div className="db-card-h" style={{marginBottom:14}}>Profile Views <span style={{color:'var(--dba)'}}>last 14 days</span></div>
              <div className="db-bar-chart" style={{height:160}}>
                {Array.from({length:14},(_,i)=>(
                  <div key={i} className="db-bar" style={{height:`${Math.random()*70+5}%`}}/>
                ))}
              </div>
              <div className="db-chart-ax"><span>14 days ago</span><span>Today</span></div>
            </div>

            <div className="db-card">
              <div className="db-card-h" style={{marginBottom:14}}>Visitor Devices <span style={{color:'var(--dba)'}}>last 14 days</span></div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',paddingTop:16}}>
                <div className="db-donut">
                  <div className="db-donut-inner">
                    <span className="db-muted" style={{fontSize:12}}>Total</span>
                    <span className="db-muted" style={{fontSize:11,marginTop:2}}>{profile?.view_count||0} visitors</span>
                  </div>
                </div>
                <div style={{display:'flex',gap:14,marginTop:16}}>
                  {[{label:'Desktop',color:'#e879f9'},{label:'Mobile',color:'#22c55e'},{label:'Tablet',color:'#3b82f6'}].map(d=>(
                    <span key={d.label} style={{fontSize:12,color:'var(--dbm)',display:'flex',alignItems:'center',gap:5}}>
                      <span style={{width:8,height:8,borderRadius:'50%',background:d.color,display:'inline-block'}}/>
                      {d.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="db-2col" style={{marginTop:16}}>
            <div className="db-card">
              <div className="db-card-h">Most Clicked Links</div>
              <p className="db-muted" style={{fontSize:13,textAlign:'center',padding:'20px 0'}}>No link clicks yet.</p>
            </div>
            <div className="db-card">
              <div className="db-card-h">Top Referrers</div>
              <p className="db-muted" style={{fontSize:13,textAlign:'center',padding:'20px 0'}}>No referrer data yet.</p>
            </div>
          </div>
        </>}

        {/* ══════════════════════════════════
            BADGES
        ══════════════════════════════════ */}
        {section==='account' && accountTab==='badges' && <>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:24}}>
            <h1 className="db-h1" style={{marginBottom:0}}>All Badges</h1>
            <span style={{color:'var(--dbm)',fontSize:18}}>▾</span>
          </div>

          {/* 3-column badge grid */}
          <div className="db-badge-grid">
            {ALL_BADGES.map(b=>{
              const owned = badges.includes(b.id)
              return (
                <div key={b.id} className={`db-badge-card ${owned?'owned':''}`}>
                  <span style={{fontSize:26,flexShrink:0,width:40,textAlign:'center'}}>{b.emoji}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:700,color:'var(--dbt)',marginBottom:2}}>{b.name}</div>
                    <div style={{fontSize:12,color:'var(--dbm)',lineHeight:1.4}}>{b.desc}</div>
                  </div>
                  {b.action && (
                    <button className={`db-badge-act ${owned?'owned':''}`}
                      onClick={()=>setBadges(bds=>bds.includes(b.id)?bds.filter(x=>x!==b.id):[...bds,b.id])}>
                      {owned ? (b.action==='Purchase'?'Purchased':b.action==='Unlock'?'Unlocked':b.action) : b.action}
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          {/* Custom Badges */}
          <div style={{marginTop:36}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
              <h2 className="db-h2" style={{margin:0}}>Custom Badges</h2>
              <span className="db-new-pill">✨ New</span>
            </div>
            <p className="db-muted" style={{fontSize:13,lineHeight:1.6,marginBottom:16}}>
              Custom badges allow you to create your own badges with a custom icon and name. You can edit your custom badges by using edit credits.
            </p>
            <div style={{display:'flex',gap:10}}>
              <button className="db-cta-btn">Purchase</button>
              <button className="db-outline-btn">Preview Custom Badge</button>
            </div>
          </div>

          {/* Badge Settings */}
          <div style={{marginTop:36}}>
            <h2 className="db-h2" style={{marginBottom:14}}>Badge Settings</h2>
            <div className="db-card">
              <div style={{display:'flex',gap:32,flexWrap:'wrap',alignItems:'flex-start'}}>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
                    <span style={{fontSize:14,fontWeight:600,color:'var(--dbt)'}}>Monochrome Badges</span>
                    <span style={{fontSize:13,color:'var(--dbm)'}}>ⓘ</span>
                  </div>
                  <button className={`db-toggle ${monoChrome?'on':''}`} onClick={()=>setMonoChrome(m=>!m)}>
                    <span className="db-toggle-thumb"/>
                  </button>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:'var(--dbt)',marginBottom:10}}>Badge Color</div>
                  <div className="db-color-row">
                    <input type="color" value={badgeColor} onChange={e=>setBadgeColor(e.target.value)} style={{width:24,height:24,borderRadius:'50%',border:'none',cursor:'pointer',background:'none'}}/>
                    <span style={{fontSize:13,color:'var(--dbt)'}}>{badgeColor}</span>
                    <span style={{color:'var(--dbm)',fontSize:13}}>{IPencil}</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="db-outline-btn" style={{marginTop:14}} onClick={save} disabled={saving}>
              {saved?'✓ Saved':saving?'Saving...':'Save Changes'}
            </button>
          </div>

          {/* My Badges */}
          {activeBadges.length > 0 && (
            <div style={{marginTop:36}}>
              <h2 className="db-h2" style={{marginBottom:14}}>My Badges</h2>
              <div className="db-mybadges">
                {activeBadges.map(id=>{
                  const b = ALL_BADGES.find(x=>x.id===id)
                  if (!b) return null
                  return (
                    <div key={id} className="db-mybadge">
                      <span className="db-drag">⠿</span>
                      <span style={{fontSize:18}}>{b.emoji}</span>
                      <span style={{fontSize:13,fontWeight:600,color:'var(--dbt)',flex:1}}>{b.name}</span>
                      <button className="db-toggle on" onClick={()=>toggleActiveBadge(b.id)}>
                        <span className="db-toggle-thumb"/>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>}

        {/* ══════════════════════════════════
            SETTINGS
        ══════════════════════════════════ */}
        {section==='account' && accountTab==='settings' && <>
          <h1 className="db-h1-center">Account Settings</h1>
          {sMsg && <div className="db-msg">{sMsg}</div>}

          <h2 className="db-h2" style={{marginBottom:16}}>General Information</h2>
          <div className="db-settings-card">
            <div className="db-srow">
              <div className="db-sfield">
                <label>Display Name</label>
                <input className="db-sinput" value={sDisplayName} onChange={e=>setSDisplayName(e.target.value)} placeholder="Your display name" maxLength={32}/>
              </div>
              <button className="db-ssave" onClick={()=>saveSetting('display_name',sDisplayName)}>Save</button>
            </div>
            <div className="db-srow">
              <div className="db-sfield">
                <label>Bio</label>
                <input className="db-sinput" value={sBio} onChange={e=>setSBio(e.target.value)} placeholder="Tell people about yourself..." maxLength={160}/>
              </div>
              <button className="db-ssave" onClick={()=>saveSetting('bio',sBio)}>Save</button>
            </div>
            <div className="db-srow">
              <div className="db-sfield">
                <label>Username</label>
                <input className="db-sinput" value={sUsername} onChange={e=>setSUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/g,''))} placeholder="yourname" maxLength={20}/>
              </div>
              <button className="db-ssave" onClick={()=>saveSetting('username',sUsername)}>Save</button>
            </div>
          </div>

          <h2 className="db-h2" style={{marginTop:32,marginBottom:16}}>Security</h2>
          <div className="db-settings-card">
            <div className="db-srow">
              <div className="db-sfield">
                <label>Email Address</label>
                <input className="db-sinput" type="email" value={sEmail} onChange={e=>setSEmail(e.target.value)} placeholder="new@email.com"/>
              </div>
              <button className="db-ssave" onClick={()=>saveSetting('email',sEmail)}>Update</button>
            </div>
            <div className="db-srow">
              <div className="db-sfield">
                <label>New Password</label>
                <input className="db-sinput" type="password" value={sPassword} onChange={e=>setSPassword(e.target.value)} placeholder="8+ characters"/>
              </div>
              <button className="db-ssave" onClick={()=>saveSetting('password',sPassword)}>Update</button>
            </div>
          </div>

          <h2 className="db-h2" style={{marginTop:32,marginBottom:16}}>Account Actions</h2>
          <div className="db-settings-card">
            <div style={{display:'flex',gap:10}}>
              <button className="db-outline-btn" onClick={()=>{supabase.auth.signOut();router.push('/')}}>Sign out</button>
              <button className="db-outline-btn" style={{borderColor:'rgba(239,68,68,0.3)',color:'#f87171'}}
                onClick={()=>{if(confirm('Delete your account? This cannot be undone.')){supabase.auth.signOut();router.push('/')}}}>
                Delete Account
              </button>
            </div>
          </div>
        </>}

        {/* ══════════════════════════════════
            CUSTOMIZE
        ══════════════════════════════════ */}
        {section==='customize' && <>
          <h1 className="db-h1">Customize</h1>
          <p className="db-muted" style={{marginBottom:24,fontSize:13}}>fentanyl.best/{profile?.username}</p>

          <div className="db-card" style={{marginBottom:16}}>
            <div className="db-card-h" style={{marginBottom:16}}>Profile</div>
            <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:18}}>
              <div className="db-apreview">
                {avatarUrl?<img src={avatarUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}}/>:<span style={{fontSize:22}}>👤</span>}
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
            <div className="db-sfield">
              <label>Bio</label>
              <textarea className="db-sinput" value={bio} onChange={e=>setBio(e.target.value)} rows={3} maxLength={160} placeholder="Write something about yourself..." style={{resize:'none'}}/>
              <span style={{fontSize:11,color:'var(--dbf)',textAlign:'right',marginTop:3,display:'block'}}>{bio.length}/160</span>
            </div>
          </div>

          <div className="db-card" style={{marginBottom:16}}>
            <div className="db-card-h" style={{marginBottom:14}}>Background</div>
            <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
              {(['color','gradient','image'] as Profile['background_type'][]).map(t=>(
                <button key={t} className={`db-pill ${bgType===t?'active':''}`} onClick={()=>setBgType(t)}>{t}</button>
              ))}
            </div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
              {BG_PRESETS.map(c=><button key={c} className={`db-swatch ${bgValue===c?'sel':''}`} onClick={()=>setBgValue(c)} style={{background:c}}/>)}
              <input type="color" value={bgValue} onChange={e=>setBgValue(e.target.value)} className="db-cinput"/>
            </div>
          </div>

          <div className="db-card" style={{marginBottom:16}}>
            <div className="db-card-h" style={{marginBottom:14}}>Accent Color</div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
              {ACCENT_PRESETS.map(c=><button key={c} className={`db-swatch ${accent===c?'sel':''}`} onClick={()=>setAccent(c)} style={{background:c}}/>)}
              <input type="color" value={accent} onChange={e=>setAccent(e.target.value)} className="db-cinput"/>
            </div>
          </div>

          <div className="db-card" style={{marginBottom:16}}>
            <div className="db-card-h" style={{marginBottom:14}}>Button Style</div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {(['filled','outline','glass'] as Profile['button_style'][]).map(s=>(
                <button key={s} className={`db-pill ${btnStyle===s?'active':''}`} onClick={()=>setBtnStyle(s)}>
                  {s.charAt(0).toUpperCase()+s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="db-card" style={{marginBottom:16}}>
            <div className="db-card-h" style={{marginBottom:14}}>Font</div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {FONTS.map(f=>(
                <button key={f} className={`db-pill ${font===f?'active':''}`} onClick={()=>setFont(f)}
                  style={{fontFamily:f==='inter'?'Inter':f==='geist'?'Geist':'Space Grotesk'}}>
                  {f.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="db-card" style={{marginBottom:24}}>
            <div className="db-card-h" style={{marginBottom:14}}>Music Player</div>
            <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
              {(['spotify','youtube','soundcloud',null] as Profile['music_type'][]).map(t=>(
                <button key={String(t)} className={`db-pill ${musicType===t?'active':''}`} onClick={()=>setMusicType(t)}>
                  {t===null?'None':t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>
            {musicType && (
              <div className="db-sfield">
                <label>Music URL</label>
                <input className="db-sinput" value={musicUrl} onChange={e=>setMusicUrl(e.target.value)}
                  placeholder={musicType==='spotify'?'https://open.spotify.com/track/...':musicType==='youtube'?'https://youtube.com/watch?v=...':'https://soundcloud.com/...'}/>
              </div>
            )}
          </div>

          <button className="db-cta-btn" onClick={save} disabled={saving}>
            {saved?'✓ Saved':saving?'Saving...':'Save Changes'}
          </button>
        </>}

        {/* ══════════════════════════════════
            LINKS
        ══════════════════════════════════ */}
        {section==='links' && <>
          <h1 className="db-h1">Links</h1>
          <p className="db-muted" style={{marginBottom:24,fontSize:13}}>Add and manage links on your profile page</p>

          <div className="db-card">
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {links.map(lnk=>(
                <div key={lnk.id} className="db-lrow">
                  <select value={lnk.icon} onChange={e=>updateLink(lnk.id,'icon',e.target.value)} className="db-lsel">
                    {SOCIAL_ICONS.map(k=><option key={k} value={k}>{k}</option>)}
                  </select>
                  <input value={lnk.label} onChange={e=>updateLink(lnk.id,'label',e.target.value)} placeholder="Label" className="db-linput db-llabel"/>
                  <input value={lnk.url} onChange={e=>updateLink(lnk.id,'url',e.target.value)} placeholder="https://..." className="db-linput"/>
                  <button onClick={()=>removeLink(lnk.id)} className="db-ldel"
                    onMouseOver={e=>(e.currentTarget.style.color='#f87171')} onMouseOut={e=>(e.currentTarget.style.color='')}>×</button>
                </div>
              ))}
              {links.length===0 && <p className="db-muted" style={{textAlign:'center',padding:'24px 0',fontSize:13}}>No links yet. Add one below.</p>}
            </div>
            <button className="db-addlink" onClick={addLink}>+ Add Link</button>
          </div>
          <button className="db-cta-btn" style={{marginTop:16}} onClick={save} disabled={saving}>
            {saved?'✓ Saved':saving?'Saving...':'Save Links'}
          </button>
        </>}

        {/* ══════════════════════════════════
            PREMIUM / TEMPLATES
        ══════════════════════════════════ */}
        {section==='premium' && <>
          <h1 className="db-h1">Premium</h1>
          <div className="db-card" style={{textAlign:'center',padding:'48px'}}>
            <div style={{fontSize:40,marginBottom:14}}>💎</div>
            <div style={{fontSize:18,fontWeight:800,color:'var(--dbt)',marginBottom:8}}>Coming Soon</div>
            <div className="db-muted" style={{fontSize:13}}>Premium features are on the way.</div>
          </div>
        </>}
        {section==='templates' && <>
          <h1 className="db-h1">Templates</h1>
          <div className="db-card" style={{textAlign:'center',padding:'48px'}}>
            <div style={{fontSize:40,marginBottom:14}}>🎨</div>
            <div style={{fontSize:18,fontWeight:800,color:'var(--dbt)',marginBottom:8}}>Coming Soon</div>
            <div className="db-muted" style={{fontSize:13}}>Profile templates are being designed.</div>
          </div>
        </>}

      </main>
    </div>
  )
}

// ── Icons ──
const IUser     = <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const ILink     = <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
const IPaint    = <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
const IShield   = <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IStar     = <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
const IGrid     = <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
const IHelp     = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
const IExt      = <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const IShare    = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
const IChevUp   = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
const IChevDn   = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
const IPencil   = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
const IUserP    = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
const IEye      = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const IChat     = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
const IGear     = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
const IRefresh  = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
const IDiscord  = <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.034.055a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.026c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
const IBarChart = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
const ICal      = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
