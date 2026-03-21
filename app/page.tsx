import Link from 'next/link'

export default function Landing() {
  return (
    <>
      {/* ambient glows */}
      <div className="g-glow g-glow-1" />
      <div className="g-glow g-glow-2" />
      <div className="g-glow g-glow-3" />

      {/* NAV */}
      <nav className="g-nav">
        <div className="g-nav-inner">
          <Link href="/" className="g-logo">fentanyl</Link>
          <div className="g-nav-center">
            <a href="#features" className="g-navlink">Features</a>
            <a href="#how" className="g-navlink">How it works</a>
          </div>
          <div className="g-nav-end">
            <Link href="/login" className="g-navlink">Sign in</Link>
            <Link href="/signup" className="g-nav-cta">Get started</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="g-hero">
        <div className="g-hero-inner">
          <div className="g-hero-badge">
            <span className="g-pulse" />
            Invite only · Now open
          </div>
          <h1 className="g-h1">
            One link.<br />
            <span className="g-h1-accent">Everything you are.</span>
          </h1>
          <p className="g-hero-sub">
            Your socials, your music, your vibe — one clean link.<br />
            Fully customizable. Exclusively yours.
          </p>
          <div className="g-hero-actions">
            <Link href="/signup" className="g-btn-primary">
              Claim your link
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <Link href="/login" className="g-btn-glass">Sign in</Link>
          </div>
          <p className="g-hero-url">fentanyl.best/<em>yourname</em></p>
        </div>

        {/* Glass profile card */}
        <div className="g-hero-card-wrap">
          <div className="g-profile-glass">
            <div className="g-pg-header">
              <div className="g-pg-avatar">Z</div>
              <div>
                <div className="g-pg-name">zj71</div>
                <div className="g-pg-handle">fentanyl.best/zj71</div>
              </div>
              <div className="g-pg-views">1.2k views</div>
            </div>
            <p className="g-pg-bio">creator. gamer. just vibing.</p>
            <div className="g-pg-badges">
              <span>🎮 Gamer</span>
              <span>⭐ OG</span>
              <span>👑 Founder</span>
            </div>
            <div className="g-pg-links">
              <div className="g-pg-link g-pg-link-accent">
                <span>Discord</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </div>
              <div className="g-pg-link">
                <span>TikTok</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </div>
              <div className="g-pg-link">
                <span>YouTube</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </div>
              <div className="g-pg-link">
                <span>Spotify</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="g-divider-fade" />

      {/* FEATURES */}
      <section className="g-features" id="features">
        <div className="g-section-wrap">
          <div className="g-section-head">
            <h2 className="g-section-h2">Built for how you actually live online.</h2>
            <p className="g-section-sub">One page. Every link. Fully yours.</p>
          </div>

          <div className="g-cards">

            {/* Card 1 — Customize */}
            <div className="g-card g-card-lg">
              <div className="g-card-label">Appearance</div>
              <h3 className="g-card-title">Make it look exactly like you</h3>
              <p className="g-card-body">Background type, accent color, button style, font, music player — every pixel under your control.</p>
              <div className="g-customize-demo">
                <div className="g-demo-colors">
                  {['#a78bfa','#60a5fa','#f472b6','#34d399','#fbbf24','#f87171'].map(c => (
                    <div key={c} className="g-demo-dot" style={{ background: c }} />
                  ))}
                </div>
                <div className="g-demo-btns">
                  <div className="g-demo-btn" style={{ background: '#a78bfa', color: '#fff', border: 'none' }}>Filled</div>
                  <div className="g-demo-btn" style={{ border: '1.5px solid rgba(167,139,250,0.5)', color: 'rgba(167,139,250,0.9)' }}>Outline</div>
                  <div className="g-demo-btn" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)' }}>Glass</div>
                </div>
              </div>
            </div>

            {/* Card 2 — Links */}
            <div className="g-card">
              <div className="g-card-label">Links</div>
              <h3 className="g-card-title">All your platforms, one place</h3>
              <p className="g-card-body">Discord, TikTok, YouTube, X, Instagram, Twitch, Spotify, GitHub — plus custom URLs.</p>
              <div className="g-link-chips">
                {['Discord','TikTok','YouTube','X','Instagram','Spotify','Twitch','GitHub'].map(p => (
                  <span key={p} className="g-chip">{p}</span>
                ))}
              </div>
            </div>

            {/* Card 3 — Music */}
            <div className="g-card">
              <div className="g-card-label">Music</div>
              <h3 className="g-card-title">Let them hear what you're about</h3>
              <p className="g-card-body">Embed Spotify, YouTube, or SoundCloud directly on your profile.</p>
              <div className="g-player">
                <div className="g-player-art" />
                <div className="g-player-info">
                  <div className="g-player-track">Back to Me</div>
                  <div className="g-player-artist">The Marías</div>
                  <div className="g-player-bar"><div className="g-player-prog" /></div>
                </div>
                <div className="g-player-play">▶</div>
              </div>
            </div>

            {/* Card 4 — Badges */}
            <div className="g-card">
              <div className="g-card-label">Identity</div>
              <h3 className="g-card-title">Badges that mean something</h3>
              <p className="g-card-body">OG, Founder, Gamer, Verified — show the world who you are.</p>
              <div className="g-badges">
                {['🔥 OG','👑 Founder','🎮 Gamer','⭐ Star','💜 Donor','🏆 Legend'].map(b => (
                  <span key={b} className="g-badge">{b}</span>
                ))}
              </div>
            </div>

            {/* Card 5 — Views + Invite */}
            <div className="g-card g-card-accent">
              <div className="g-card-label">Analytics</div>
              <h3 className="g-card-title">See who's showing up</h3>
              <p className="g-card-body">Real-time view counter, always on.</p>
              <div className="g-views-number">1,247</div>
              <div className="g-views-sub">views this week</div>
            </div>

            <div className="g-card">
              <div className="g-card-label">Access</div>
              <h3 className="g-card-title">Invite only — by design</h3>
              <p className="g-card-body">Every member is here because someone vouched for them. It keeps the community worth being part of.</p>
              <div className="g-invite-display">
                <span className="g-invite-code">XXXX-XXXX-XXXX</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="g-how" id="how">
        <div className="g-section-wrap">
          <div className="g-section-head">
            <h2 className="g-section-h2">Up in minutes.</h2>
            <p className="g-section-sub">No friction. No setup hell. Just your link, live.</p>
          </div>
          <div className="g-steps">
            {[
              { n:'01', title:'Get an invite', body:'Someone sends you a code. That\'s your ticket in.' },
              { n:'02', title:'Pick your name', body:'Your username is yours forever the moment you register it.' },
              { n:'03', title:'Build your profile', body:'Drop in your links, pick your colors, add your music. Takes 3 minutes.' },
              { n:'04', title:'Share one link', body:'Put it in every bio. It\'s always current. Always live.' },
            ].map((s, i) => (
              <div key={s.n} className="g-step">
                <div className="g-step-num">{s.n}</div>
                <div className="g-step-line" style={{ opacity: i === 3 ? 0 : 1 }} />
                <div className="g-step-content">
                  <div className="g-step-title">{s.title}</div>
                  <div className="g-step-body">{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="g-stats">
        <div className="g-section-wrap">
          <div className="g-stats-glass">
            {[
              { v: '10+',    l: 'Social platforms' },
              { v: '99.9%',  l: 'Uptime' },
              { v: '<2min',  l: 'Setup time' },
              { v: 'Free',   l: 'Always' },
            ].map((s, i, arr) => (
              <>
                <div key={s.v} className="g-stat">
                  <div className="g-stat-val">{s.v}</div>
                  <div className="g-stat-label">{s.l}</div>
                </div>
                {i < arr.length - 1 && <div key={`d${i}`} className="g-stat-sep" />}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="g-cta">
        <div className="g-section-wrap">
          <div className="g-cta-glass">
            <div className="g-cta-glow" />
            <h2 className="g-cta-h2">Your link is waiting.</h2>
            <p className="g-cta-sub">Get an invite and claim your spot on fentanyl.best.</p>
            <Link href="/signup" className="g-btn-primary g-btn-lg">
              Get started
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <p className="g-cta-note">Invite only — it stays that way.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="g-footer">
        <div className="g-section-wrap">
          <div className="g-footer-row">
            <Link href="/" className="g-logo g-footer-logo">fentanyl</Link>
            <div className="g-footer-links">
              <Link href="/signup" className="g-footer-link">Sign up</Link>
              <Link href="/login" className="g-footer-link">Sign in</Link>
              <a href="#" className="g-footer-link">Terms</a>
              <a href="#" className="g-footer-link">Privacy</a>
            </div>
            <span className="g-footer-copy">© 2025 fentanyl.best</span>
          </div>
        </div>
      </footer>
    </>
  )
}
