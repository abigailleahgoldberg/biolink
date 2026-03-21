import Link from 'next/link'

export default function Landing() {
  return (
    <>
      {/* Background gradient mesh */}
      <div className="mesh-bg" />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-wrap">
          <Link href="/" className="brand">fentanyl<span>.best</span></Link>
          <div className="nav-mid">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how" className="nav-link">How it works</a>
          </div>
          <div className="nav-end">
            <Link href="/login" className="nav-link">Sign in</Link>
            <Link href="/signup" className="cta-pill">Get started →</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Invite only · Now accepting
          </div>
          <h1 className="hero-h1">
            Your link.<br />
            <span className="grad-text">Beautifully yours.</span>
          </h1>
          <p className="hero-p">
            One clean link for everything you do online.
            Customize every detail. Share everywhere.
          </p>
          <div className="hero-actions">
            <Link href="/signup" className="btn-solid">Claim your link</Link>
            <Link href="/login" className="btn-outline">Sign in</Link>
          </div>
          <div className="hero-meta">fentanyl.best/<em>yourname</em></div>
        </div>

        {/* Floating card */}
        <div className="float-card-wrap">
          <div className="float-card">
            <div className="fc-top">
              <div className="fc-avatar">Z</div>
              <div className="fc-info">
                <div className="fc-name">zj71</div>
                <div className="fc-url">fentanyl.best/zj71</div>
              </div>
              <div className="fc-views">1,247 views</div>
            </div>
            <p className="fc-bio">creator. gamer. just vibing.</p>
            <div className="fc-tags">
              <span>🎮 Gamer</span>
              <span>⭐ OG</span>
              <span>👑 Founder</span>
            </div>
            <div className="fc-links">
              {['Discord','TikTok','YouTube','Spotify'].map((l, i) => (
                <div key={l} className={`fc-link${i === 0 ? ' fc-link-primary' : ''}`}>{l}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="section-wrap">
          <div className="section-label">What you get</div>
          <h2 className="section-h2">Everything. Nothing extra.</h2>
          <p className="section-sub">Built for people who want their online presence to actually look good.</p>

          <div className="feat-grid">
            {/* Big card */}
            <div className="feat-card feat-big">
              <div className="feat-tag">Customization</div>
              <h3>Every pixel, your call</h3>
              <p>Background type, accent color, button style, font, badges, music — all of it.</p>
              <div className="demo-preview">
                <div className="demo-swatches">
                  {['#a78bfa','#818cf8','#c084fc','#e879f9','#f472b6','#fb7185'].map(c => (
                    <div key={c} style={{ width:28,height:28,borderRadius:8,background:c,flexShrink:0 }} />
                  ))}
                </div>
                <div className="demo-btns">
                  <div style={{ padding:'6px 14px',borderRadius:7,background:'linear-gradient(135deg,#a78bfa,#818cf8)',color:'#fff',fontSize:11,fontWeight:600 }}>Filled</div>
                  <div style={{ padding:'6px 14px',borderRadius:7,border:'1.5px solid rgba(167,139,250,0.5)',color:'rgba(167,139,250,1)',fontSize:11,fontWeight:600 }}>Outline</div>
                  <div style={{ padding:'6px 14px',borderRadius:7,background:'rgba(167,139,250,0.08)',border:'1px solid rgba(167,139,250,0.2)',color:'rgba(167,139,250,0.8)',fontSize:11,fontWeight:600,backdropFilter:'blur(8px)' }}>Glass</div>
                </div>
              </div>
            </div>

            <div className="feat-card">
              <div className="feat-tag">Links</div>
              <h3>All your platforms</h3>
              <p>Discord, TikTok, YouTube, X, Instagram, Twitch, Spotify, GitHub and custom URLs.</p>
              <div className="platform-grid">
                {['D','T','▶','𝕏','♫','Gh','Tw','+'].map((s,i) => (
                  <div key={i} className="platform-icon">{s}</div>
                ))}
              </div>
            </div>

            <div className="feat-card">
              <div className="feat-tag">Music</div>
              <h3>Let them hear you</h3>
              <p>Embed Spotify, YouTube, or SoundCloud right on your profile.</p>
              <div className="mini-player">
                <div className="mini-art" />
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,marginBottom:2}}>Back to Me</div>
                  <div style={{fontSize:11,color:'var(--muted)',marginBottom:8}}>The Marías</div>
                  <div style={{height:2,background:'rgba(255,255,255,0.1)',borderRadius:1}}>
                    <div style={{height:2,width:'55%',background:'var(--accent)',borderRadius:1}} />
                  </div>
                </div>
              </div>
            </div>

            <div className="feat-card feat-purple">
              <div className="feat-tag">Views</div>
              <h3>See who's showing up</h3>
              <p>Real-time view counter on every profile. Zero setup.</p>
              <div className="big-number">1,247</div>
              <div style={{fontSize:12,color:'var(--muted)',marginTop:4}}>views this week</div>
            </div>

            <div className="feat-card">
              <div className="feat-tag">Badges</div>
              <h3>Show who you are</h3>
              <p>OG, Founder, Gamer, Verified and more.</p>
              <div className="badge-row">
                {['🔥 OG','👑 Founder','🎮 Gamer','⭐ Star','💜 Donor'].map(b => (
                  <span key={b} className="badge-tag">{b}</span>
                ))}
              </div>
            </div>

            <div className="feat-card">
              <div className="feat-tag">Access</div>
              <h3>Invite only — always</h3>
              <p>Every member was vouched for. It keeps things worth being part of.</p>
              <div className="invite-box">
                <span className="invite-code">XXXX-XXXX-XXXX</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="section" id="how">
        <div className="section-wrap">
          <div className="section-label">Process</div>
          <h2 className="section-h2">Live in minutes.</h2>
          <div className="steps">
            {[
              ['01','Get invited','Someone vouches for you with an invite code.'],
              ['02','Pick your name','Your username is locked to you the second you register.'],
              ['03','Customize it','Links, colors, music, badges — 3 minutes to something beautiful.'],
              ['04','Share one link','Drop it in every bio. One URL. Always current.'],
            ].map(([n,t,b],i,arr) => (
              <div key={n} className="step">
                <div className="step-num">{n}</div>
                {i < arr.length-1 && <div className="step-connector" />}
                <div className="step-title">{t}</div>
                <div className="step-body">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="section-wrap">
          <div className="stats-row">
            {[
              {v:'10+',l:'Platforms'},
              {v:'99.9%',l:'Uptime'},
              {v:'< 2min',l:'Setup'},
              {v:'Free',l:'Always'},
            ].map((s,i,arr) => (
              <div key={s.v} style={{display:'flex',alignItems:'center',gap:0,flex:1}}>
                <div className="stat">
                  <div className="stat-val">{s.v}</div>
                  <div className="stat-label">{s.l}</div>
                </div>
                {i < arr.length-1 && <div className="stat-div" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="section-wrap">
          <div className="cta-box">
            <div className="cta-glow" />
            <h2 className="cta-h2">Your link is waiting.</h2>
            <p className="cta-p">Grab an invite and make it yours.</p>
            <Link href="/signup" className="btn-solid btn-lg">Get your link →</Link>
            <div className="cta-note">Invite only · stays that way</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="section-wrap">
          <div className="footer-row">
            <Link href="/" className="brand">fentanyl<span>.best</span></Link>
            <div className="footer-links">
              <Link href="/signup" className="footer-link">Sign up</Link>
              <Link href="/login" className="footer-link">Sign in</Link>
              <a href="#" className="footer-link">Terms</a>
              <a href="#" className="footer-link">Privacy</a>
            </div>
            <div className="footer-copy">© 2025 fentanyl.best</div>
          </div>
        </div>
      </footer>
    </>
  )
}
