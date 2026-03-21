import Link from 'next/link'

export default function Landing() {
  return (
    <>
      {/* Aurora */}
      <div className="aurora" />

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-dot" />
            biolink
          </div>
          <div className="nav-links">
            <a href="#why" className="nav-link">Features</a>
            <a href="#profiles" className="nav-link">Profiles</a>
            <a href="#stats" className="nav-link">Stats</a>
            <a href="#testimonials" className="nav-link">Reviews</a>
          </div>
          <div className="nav-actions">
            <Link href="/login" className="nav-signin">Sign In</Link>
            <Link href="/signup" className="nav-cta">Get Started →</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            {/* Left */}
            <div>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                New: Full Profile Customization
              </div>
              <h1 className="hero-h1">
                Elevate your links<br />
                with <em>powerful profiles.</em>
              </h1>
              <p className="hero-p">
                The most customizable biolink platform — built for creators, gamers, and communities. 
                Your socials, your music, your identity. Everything in one link.
              </p>
              <div className="hero-actions">
                <Link href="/signup" className="btn-primary">
                  Get Your Link →
                </Link>
                <Link href="#why" className="btn-secondary">
                  See Features
                </Link>
              </div>
            </div>

            {/* Right — UI mockup panel */}
            <div className="hero-mockup">
              <div className="hero-mockup-glow" />
              <div className="hero-panel">
                <div className="hero-panel-header">
                  <div className="hero-panel-dot green" /><div className="hero-panel-dot yellow" /><div className="hero-panel-dot red" />
                  <span className="hero-panel-title">Profile Editor</span>
                </div>
                <div className="hero-panel-body">
                  <div className="hero-panel-section">
                    <div className="hero-panel-label">DISPLAY NAME</div>
                    <div className="hero-panel-input">zj71</div>
                  </div>
                  <div className="hero-panel-section">
                    <div className="hero-panel-label">BIO</div>
                    <div className="hero-panel-input" style={{opacity:0.6}}>just vibing. creator. gamer.</div>
                  </div>
                  <div className="hero-panel-section">
                    <div className="hero-panel-label">ACCENT COLOR</div>
                    <div style={{display:'flex',gap:6,marginTop:6}}>
                      {['#7c5cfa','#4f8aff','#f472b6','#34d399','#facc15','#fb923c'].map(c => (
                        <div key={c} style={{width:20,height:20,borderRadius:5,background:c,border: c==='#7c5cfa' ? '2px solid white' : '2px solid transparent'}} />
                      ))}
                    </div>
                  </div>
                  <div className="hero-panel-section">
                    <div className="hero-panel-label">BUTTON STYLE</div>
                    <div style={{display:'flex',gap:6,marginTop:6}}>
                      {['Filled','Outline','Glass'].map((s,i) => (
                        <div key={s} style={{padding:'4px 10px',borderRadius:6,fontSize:11,fontWeight:600,border:'1px solid',borderColor:i===1?'rgba(124,92,250,0.6)':'rgba(255,255,255,0.1)',color:i===1?'#bfaaff':'rgba(255,255,255,0.4)',background:i===0?'rgba(124,92,250,0.15)':'transparent'}}>{s}</div>
                      ))}
                    </div>
                  </div>
                  <div className="hero-panel-section">
                    <div className="hero-panel-label">LINKS</div>
                    {[{icon:'🎮',label:'Discord',color:'#5865f2'},{icon:'📱',label:'TikTok',color:'#fff'},{icon:'🎵',label:'Spotify',color:'#1db954'}].map(l => (
                      <div key={l.label} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',marginTop:5,fontSize:12}}>
                        <span>{l.icon}</span>
                        <span style={{flex:1,color:'rgba(255,255,255,0.7)'}}>{l.label}</span>
                        <span style={{fontSize:10,color:'rgba(255,255,255,0.3)'}}>✓ Live</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="proof-bar">
        <div className="wrap">
          <div className="proof-bar-inner">
            <div className="proof-stat">
              <div className="proof-stat-num">Invite<span>-only</span></div>
              <div className="proof-stat-label">Exclusive access</div>
            </div>
            <div className="proof-divider" />
            <div className="proof-stat">
              <div className="proof-stat-num">100<span>%</span></div>
              <div className="proof-stat-label">Customizable</div>
            </div>
            <div className="proof-divider" />
            <div className="proof-stat">
              <div className="proof-stat-num">10<span>+</span></div>
              <div className="proof-stat-label">Social platforms</div>
            </div>
            <div className="proof-divider" />
            <div className="proof-stat">
              <div className="proof-stat-num">1<span>link</span></div>
              <div className="proof-stat-label">For everything</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── WHY CHOOSE ── */}
      <section className="features" id="why">
        <div className="wrap">
          <div className="features-header">
            <p className="features-header-sub">
              A powerful biolink platform that combines aesthetic customization with everything you need to showcase your online identity.
            </p>
            <h2 className="features-header-h">Why Choose BioLink?</h2>
          </div>

          {/* 2+2+2 card layout */}
          <div className="why-grid">
            <div className="why-card why-card-large">
              <div style={{display:'flex',gap:16,marginBottom:16,alignItems:'flex-start'}}>
                <div className="feature-card-icon">🎨</div>
                <div>
                  <div className="feature-card-title">Built to Impress</div>
                  <div className="feature-card-desc">Designed with aesthetics and performance in mind. Your profile looks incredible on every device, every screen.</div>
                </div>
              </div>
              <div className="mini-demo">
                <div className="mini-demo-bar" style={{background:'var(--accent)',width:'85%'}} />
                <div className="mini-demo-bar" style={{background:'rgba(124,92,250,0.3)',width:'60%'}} />
                <div className="mini-demo-bar" style={{background:'rgba(124,92,250,0.15)',width:'40%'}} />
              </div>
              <div className="feature-card-pills" style={{marginTop:14}}>
                <span className="feature-pill">Dark Theme</span>
                <span className="feature-pill">Custom BG</span>
                <span className="feature-pill">Animated</span>
              </div>
            </div>
            <div className="why-card">
              <div className="feature-card-icon">🛡️</div>
              <div className="feature-card-title">Username Protection</div>
              <div className="feature-card-desc">Blacklisted usernames, reserved names, invite-only signup. Your community stays clean.</div>
              <div className="feature-card-pills" style={{marginTop:'auto',paddingTop:14}}>
                <span className="feature-pill">Blacklist</span>
                <span className="feature-pill">Invite Gate</span>
                <span className="feature-pill">Admin Panel</span>
              </div>
            </div>
            <div className="why-card">
              <div className="feature-card-icon">⚡</div>
              <div className="feature-card-title">Instant Setup</div>
              <div className="feature-card-desc">Sign up with your invite code, pick a username, and your profile is live in under 2 minutes.</div>
              <div className="feature-card-pills" style={{marginTop:'auto',paddingTop:14}}>
                <span className="feature-pill">2 Min Setup</span>
                <span className="feature-pill">No Code</span>
                <span className="feature-pill">Instant Live</span>
              </div>
            </div>
            <div className="why-card">
              <div className="feature-card-icon">📈</div>
              <div className="feature-card-title">View Tracking</div>
              <div className="feature-card-desc">See who's visiting your profile. Real-time view counter built into every profile automatically.</div>
              <div className="feature-card-pills" style={{marginTop:'auto',paddingTop:14}}>
                <span className="feature-pill">Real-time</span>
                <span className="feature-pill">Auto-track</span>
                <span className="feature-pill">Always On</span>
              </div>
            </div>
            <div className="why-card" style={{gridColumn:'span 2'}}>
              <div style={{display:'flex',gap:24,alignItems:'flex-start'}}>
                <div>
                  <div className="feature-card-icon">🎵</div>
                  <div className="feature-card-title">Music Player</div>
                  <div className="feature-card-desc">Embed your favorite Spotify track, YouTube video, or SoundCloud directly on your profile. Let visitors vibe with you.</div>
                  <div className="feature-card-pills" style={{marginTop:14}}>
                    <span className="feature-pill">Spotify</span>
                    <span className="feature-pill">YouTube</span>
                    <span className="feature-pill">SoundCloud</span>
                  </div>
                </div>
                <div className="music-demo">
                  <div className="music-demo-track">
                    <div className="music-demo-art" />
                    <div>
                      <div style={{fontSize:12,fontWeight:600,marginBottom:3}}>Your Track</div>
                      <div style={{fontSize:11,color:'var(--muted)'}}>Artist Name</div>
                    </div>
                    <div style={{marginLeft:'auto',color:'var(--accent)'}}>▶</div>
                  </div>
                  <div className="music-demo-bar-wrap">
                    <div className="music-demo-progress" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="features" id="features" style={{paddingTop:0}}>
        <div className="wrap">
          <div className="features-header">
            <p className="features-header-sub">Every feature is designed to be powerful yet simple, giving you complete control over how the world sees you.</p>
            <h2 className="features-header-h">Powerful Features, Simple Interface</h2>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-card-icon">🎨</div>
              <div className="feature-card-title">Appearance</div>
              <div className="feature-card-desc">Change everything. Background type, accent color, button style, font family.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">Color Picker</span>
                <span className="feature-pill">Gradient</span>
                <span className="feature-pill">Image BG</span>
              </div>
              <div className="feature-card-bar" />
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">🔗</div>
              <div className="feature-card-title">Link Manager</div>
              <div className="feature-card-desc">Add, reorder, and customize all your social links with icons and labels.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">Discord</span>
                <span className="feature-pill">TikTok</span>
                <span className="feature-pill">YouTube</span>
                <span className="feature-pill">Custom</span>
              </div>
              <div className="feature-card-bar" style={{background:'linear-gradient(90deg,#4f8aff,rgba(79,138,255,0.1))'}} />
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">🏅</div>
              <div className="feature-card-title">Badges</div>
              <div className="feature-card-desc">Show off who you are. OG, Gamer, Verified, Founder — pick your identity.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">🎮 Gamer</span>
                <span className="feature-pill">⭐ OG</span>
                <span className="feature-pill">👑 Verified</span>
              </div>
              <div className="feature-card-bar" style={{background:'linear-gradient(90deg,#facc15,rgba(250,204,21,0.1))'}} />
            </div>
          </div>
          <div className="feature-grid-2" style={{marginTop:16}}>
            <div className="feature-card">
              <div className="feature-card-icon">🖋️</div>
              <div className="feature-card-title">Fonts & Typography</div>
              <div className="feature-card-desc">Choose your font from curated options that look great on any profile. Inter, Geist, Space Grotesk.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">Inter</span>
                <span className="feature-pill">Geist</span>
                <span className="feature-pill">Space Grotesk</span>
              </div>
              <div className="feature-card-bar" style={{background:'linear-gradient(90deg,#f472b6,rgba(244,114,182,0.1))'}} />
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">🛠️</div>
              <div className="feature-card-title">Admin Tools</div>
              <div className="feature-card-desc">Full admin dashboard. Generate invites, manage users, block usernames, toggle admin roles.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">Invite Codes</span>
                <span className="feature-pill">User List</span>
                <span className="feature-pill">Blacklist</span>
              </div>
              <div className="feature-card-bar" style={{background:'linear-gradient(90deg,#34d399,rgba(52,211,153,0.1))'}} />
            </div>
          </div>
          <div style={{textAlign:'center',marginTop:24}}>
            <Link href="/signup" style={{fontSize:13,color:'var(--accent2)',fontWeight:500}}>View All Features →</Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats" id="stats">
        <div className="wrap">
          <div className="stats-header">
            <h2 className="section-h" style={{textAlign:'center'}}>Setting New <em>Standards</em></h2>
            <p className="section-sub" style={{textAlign:'center',margin:'0 auto'}}>Experience next-level profile customization and reliability that sets us apart.</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-num">∞<span></span></div>
              <div className="stat-label">Customization Options</div>
              <div className="stat-desc">Mix any combination of backgrounds, colors, fonts, and layouts. No two profiles look alike.</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">99.9<span>%</span></div>
              <div className="stat-label">Uptime</div>
              <div className="stat-desc">Enterprise-grade hosting on Vercel. Your profile is always live when people visit.</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">10<span>+</span></div>
              <div className="stat-label">Social Platforms</div>
              <div className="stat-desc">Every platform you're on, in one place. Discord, TikTok, YouTube, Spotify, and more.</div>
            </div>
          </div>
          <div className="stats-grid-2" style={{marginTop:16}}>
            <div className="stat-card">
              <div className="stat-num">100<span>%</span></div>
              <div className="stat-label">Free to Use</div>
              <div className="stat-desc">No paywalls. No premium tiers. Get your invite and the full platform is yours.</div>
              <div className="stat-pills">
                <span className="feature-pill">Free</span>
                <span className="feature-pill">Always</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-num">&lt;2<span>min</span></div>
              <div className="stat-label">Setup Time</div>
              <div className="stat-desc">From invite code to live profile in under 2 minutes. No setup friction.</div>
              <div className="stat-pills">
                <span className="feature-pill">Instant</span>
                <span className="feature-pill">No Code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROFILE INTELLIGENCE ── */}
      <section className="features" id="profiles">
        <div className="wrap">
          <div className="features-header">
            <p className="features-header-sub">Comprehensive customization tools that keep you in full control of how your audience sees you.</p>
            <h2 className="features-header-h">Advanced Profile <em>Intelligence</em></h2>
          </div>

          <div className="intel-grid">
            <div className="intel-card">
              <div className="intel-card-title">Profile Preview</div>
              <div className="intel-demo-profile">
                <div className="intel-avatar">Z</div>
                <div style={{fontWeight:700,fontSize:15,marginBottom:2}}>zj71</div>
                <div style={{fontSize:12,color:'var(--muted)',marginBottom:10}}>just vibing. creator. gamer.</div>
                <div style={{display:'flex',gap:5,marginBottom:12}}>
                  <span style={{fontSize:10,padding:'2px 8px',borderRadius:100,background:'rgba(124,92,250,0.12)',border:'1px solid rgba(124,92,250,0.25)',color:'var(--accent3)'}}>🎮 Gamer</span>
                  <span style={{fontSize:10,padding:'2px 8px',borderRadius:100,background:'rgba(124,92,250,0.12)',border:'1px solid rgba(124,92,250,0.25)',color:'var(--accent3)'}}>⭐ OG</span>
                </div>
                {['Discord','TikTok','YouTube'].map(l => (
                  <div key={l} style={{width:'100%',padding:'9px',borderRadius:8,border:'1.5px solid rgba(124,92,250,0.4)',textAlign:'center',fontSize:12,fontWeight:600,marginBottom:6,color:'white'}}>{l}</div>
                ))}
                <div style={{fontSize:10,color:'var(--faint)',marginTop:6}}>1,247 views</div>
              </div>
            </div>
            <div className="intel-card">
              <div className="intel-card-title">Live Stats Tracking</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:10}}>
                {[
                  {label:'Total Views',val:'1,247',trend:'+12%'},
                  {label:'Link Clicks',val:'384',trend:'+8%'},
                  {label:'Discord Clicks',val:'216',trend:'+23%'},
                  {label:'Profile Age',val:'14 days',trend:'Active'},
                ].map(s => (
                  <div key={s.label} style={{display:'flex',alignItems:'center',padding:'10px 14px',borderRadius:10,background:'rgba(255,255,255,0.03)',border:'1px solid var(--border)'}}>
                    <span style={{flex:1,fontSize:12,color:'var(--muted)'}}>{s.label}</span>
                    <span style={{fontSize:14,fontWeight:700,marginRight:8}}>{s.val}</span>
                    <span style={{fontSize:11,fontWeight:600,color:'#4ade80',background:'rgba(74,222,128,0.1)',padding:'2px 8px',borderRadius:100}}>{s.trend}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="features" id="testimonials" style={{paddingTop:0}}>
        <div className="wrap">
          <div className="features-header">
            <h2 className="features-header-h">What members say.</h2>
          </div>
          <div className="examples-grid">
            <div className="example-card">
              <div className="example-avatar" style={{background:'linear-gradient(135deg,#7c5cfa,#4f8aff)'}}>Z</div>
              <div className="example-name">zj71</div>
              <div className="example-role">🎮 Gamer · ⭐ OG</div>
              <div className="example-quote">"Finally a biolink that actually looks good. Mine goes hard."</div>
            </div>
            <div className="example-card">
              <div className="example-avatar" style={{background:'linear-gradient(135deg,#f472b6,#facc15)'}}>A</div>
              <div className="example-name">ariadne</div>
              <div className="example-role">🔥 Creator · 💜 Donor</div>
              <div className="example-quote">"Had my profile looking perfect in 5 minutes. The music player is insane."</div>
            </div>
            <div className="example-card">
              <div className="example-avatar" style={{background:'linear-gradient(135deg,#34d399,#4f8aff)'}}>K</div>
              <div className="example-name">kael</div>
              <div className="example-role">👑 Verified · 🏆 Legend</div>
              <div className="example-quote">"Invite-only makes it actually feel exclusive. The aesthetic is unmatched."</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="wrap">
          <div className="cta-card">
            <div style={{display:'flex',justifyContent:'center',marginBottom:20}}>
              <div className="section-label"><span className="section-label-dot" />Invite Only</div>
            </div>
            <h2>Get your link.<br /><em>Make it yours.</em></h2>
            <p>One URL. Every platform. Fully yours. Join now with an invite code.</p>
            <div className="cta-actions">
              <Link href="/signup" className="btn-primary" style={{padding:'14px 32px',fontSize:15}}>Get Started →</Link>
              <Link href="/login" className="btn-secondary" style={{padding:'14px 24px',fontSize:15}}>Sign In</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-cols">
            <div>
              <div className="footer-logo" style={{marginBottom:10}}>
                <div className="footer-logo-dot" />biolink
              </div>
              <div className="footer-copy">Invite only. Built different.</div>
            </div>
            <div>
              <div className="footer-col-title">Platform</div>
              <div className="footer-col-links">
                <Link href="/signup" className="footer-link">Sign Up</Link>
                <Link href="/login" className="footer-link">Sign In</Link>
                <Link href="#features" className="footer-link">Features</Link>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Legal</div>
              <div className="footer-col-links">
                <a href="#" className="footer-link">Terms of Service</a>
                <a href="#" className="footer-link">Privacy Policy</a>
              </div>
            </div>
          </div>
          <div style={{borderTop:'1px solid var(--border)',marginTop:32,paddingTop:20,textAlign:'center'}}>
            <div className="footer-copy">Copyright © 2026 BioLink. All Rights Reserved.</div>
          </div>
        </div>
      </footer>
    </>
  )
}
