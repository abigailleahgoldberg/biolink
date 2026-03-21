import Link from 'next/link'

export default function Landing() {
  return (
    <>
      {/* Aurora background glow */}
      <div className="aurora" />

      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-dot" />
            BioLink
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#examples" className="nav-link">Examples</a>
            <a href="#stats" className="nav-link">Stats</a>
          </div>
          <div className="nav-actions">
            <Link href="/login" className="nav-signin">Sign In</Link>
            <Link href="/signup" className="nav-cta">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Invite Only — Now Accepting
              </div>
              <h1 className="hero-h1">
                Your link.<br />
                <em>Your identity.</em>
              </h1>
              <p className="hero-p">
                One link. Everything about you — your socials, your music, your vibe.
                Fully customizable. Fully yours.
              </p>
              <div className="hero-actions">
                <Link href="/signup" className="btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  Get Your Link
                </Link>
                <Link href="/login" className="btn-secondary">
                  Sign In
                </Link>
              </div>
            </div>

            {/* Profile preview mockup */}
            <div className="hero-mockup">
              <div className="hero-mockup-glow" />
              <div className="profile-preview">
                <div className="profile-preview-avatar">Z</div>
                <div className="profile-preview-name">zj71</div>
                <div className="profile-preview-bio">just vibing. creator. gamer.</div>
                <div className="profile-preview-badges">
                  <span className="profile-preview-badge">🎮 Gamer</span>
                  <span className="profile-preview-badge">⭐ OG</span>
                  <span className="profile-preview-badge">👑 Founder</span>
                </div>
                <div className="profile-preview-links">
                  <div className="profile-preview-link filled">
                    <svg width="14" height="14" viewBox="0 0 20 15" fill="currentColor"><path d="M16.93 1.24A16.38 16.38 0 0 0 12.82 0c-.18.32-.39.76-.53 1.1a15.18 15.18 0 0 0-4.57 0A11.6 11.6 0 0 0 7.18 0a16.43 16.43 0 0 0-4.12 1.25C.44 4.77-.27 8.2.08 11.58a16.49 16.49 0 0 0 5.04 2.55c.41-.55.77-1.14 1.08-1.76a10.7 10.7 0 0 1-1.7-.81c.14-.1.28-.21.41-.32a11.75 11.75 0 0 0 10.18 0c.13.11.27.22.41.32-.54.32-1.11.59-1.71.82.31.62.67 1.2 1.08 1.75a16.43 16.43 0 0 0 5.05-2.55c.42-4-.72-7.39-2.99-10.34Z"/></svg>
                    Discord
                  </div>
                  <div className="profile-preview-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Twitter / X
                  </div>
                  <div className="profile-preview-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.21 8.21 0 0 0 4.79 1.52V6.75a4.85 4.85 0 0 1-1.02-.06z"/></svg>
                    TikTok
                  </div>
                </div>
                <div className="profile-preview-views">1,247 views</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof bar */}
      <div className="proof-bar">
        <div className="wrap">
          <div className="proof-bar-inner">
            <div className="proof-stat">
              <div className="proof-stat-num">∞<span>+</span></div>
              <div className="proof-stat-label">Customization options</div>
            </div>
            <div className="proof-divider" />
            <div className="proof-stat">
              <div className="proof-stat-num">100<span>%</span></div>
              <div className="proof-stat-label">Free to join</div>
            </div>
            <div className="proof-divider" />
            <div className="proof-stat">
              <div className="proof-stat-num">1<span> link</span></div>
              <div className="proof-stat-label">For everything you do</div>
            </div>
            <div className="proof-divider" />
            <div className="proof-stat">
              <div className="proof-stat-num">Invite<span> only</span></div>
              <div className="proof-stat-label">Exclusive access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="features" id="features">
        <div className="wrap">
          <div className="features-header">
            <div style={{ display:'flex', justifyContent:'center' }}>
              <div className="section-label"><span className="section-label-dot" />What You Get</div>
            </div>
            <h2 className="section-h" style={{ textAlign:'center', margin:'0 auto 14px' }}>
              Everything you need.<br /><em>Nothing you don't.</em>
            </h2>
            <p className="section-sub" style={{ textAlign:'center', margin:'0 auto' }}>
              Your biolink is more than a page. It's your identity online — customized exactly how you want it.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-card-icon">🎨</div>
              <div className="feature-card-title">Full Appearance Control</div>
              <div className="feature-card-desc">Change your background, accent color, button style, and font. Make it look exactly like you.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">Solid Color</span>
                <span className="feature-pill">Gradient</span>
                <span className="feature-pill">Animated</span>
                <span className="feature-pill">Image BG</span>
              </div>
              <div className="feature-card-bar" />
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">🔗</div>
              <div className="feature-card-title">Social Links</div>
              <div className="feature-card-desc">Add all your platforms. Discord, X, TikTok, YouTube, Instagram, Twitch, Spotify, GitHub, or custom.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">Discord</span>
                <span className="feature-pill">TikTok</span>
                <span className="feature-pill">YouTube</span>
                <span className="feature-pill">Custom</span>
              </div>
              <div className="feature-card-bar" style={{ background:'linear-gradient(90deg,#4f8aff,rgba(79,138,255,0.1))' }} />
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">🎵</div>
              <div className="feature-card-title">Music Player</div>
              <div className="feature-card-desc">Embed your Spotify track, YouTube video, or SoundCloud directly on your profile.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">Spotify</span>
                <span className="feature-pill">YouTube</span>
                <span className="feature-pill">SoundCloud</span>
              </div>
              <div className="feature-card-bar" style={{ background:'linear-gradient(90deg,#1db954,rgba(29,185,84,0.1))' }} />
            </div>
          </div>

          <div className="feature-grid-2">
            <div className="feature-card">
              <div className="feature-card-icon">🏅</div>
              <div className="feature-card-title">Badges & Identity</div>
              <div className="feature-card-desc">Show off badges on your profile. OG, Gamer, Founder, Verified — pick what fits you.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">🎮 Gamer</span>
                <span className="feature-pill">🔥 OG</span>
                <span className="feature-pill">👑 Verified</span>
                <span className="feature-pill">⭐ Star</span>
              </div>
              <div className="feature-card-bar" style={{ background:'linear-gradient(90deg,#facc15,rgba(250,204,21,0.1))' }} />
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">📊</div>
              <div className="feature-card-title">View Counter</div>
              <div className="feature-card-desc">See how many people have visited your profile. Real-time view tracking built in.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">Real-time</span>
                <span className="feature-pill">Always On</span>
                <span className="feature-pill">Auto-track</span>
              </div>
              <div className="feature-card-bar" style={{ background:'linear-gradient(90deg,#f472b6,rgba(244,114,182,0.1))' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats" id="stats">
        <div className="wrap">
          <div className="stats-header">
            <div style={{ display:'flex', justifyContent:'center', marginBottom:16 }}>
              <div className="section-label"><span className="section-label-dot" />By The Numbers</div>
            </div>
            <h2 className="section-h" style={{ textAlign:'center' }}>Built to <em>perform.</em></h2>
            <p className="section-sub" style={{ textAlign:'center', margin:'0 auto' }}>Fast, clean, and always available for your audience.</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-num">7<span>+</span></div>
              <div className="stat-label">Button Styles</div>
              <div className="stat-desc">Filled, outline, glass, and more. Mix and match to nail your look.</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">10<span>+</span></div>
              <div className="stat-label">Social Platforms</div>
              <div className="stat-desc">Every major platform supported. Plus custom links for anything else.</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">100<span>%</span></div>
              <div className="stat-label">Customizable</div>
              <div className="stat-desc">Colors, fonts, backgrounds, music, badges — all yours to control.</div>
              <div className="stat-pills">
                <span className="feature-pill">Colors</span>
                <span className="feature-pill">Fonts</span>
                <span className="feature-pill">BG</span>
              </div>
            </div>
          </div>
          <div className="stats-grid-2" style={{ marginTop:16 }}>
            <div className="stat-card">
              <div className="stat-num">∞</div>
              <div className="stat-label">No Limits</div>
              <div className="stat-desc">Add as many links as you want. No paywalls, no restrictions.</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">1<span>link</span></div>
              <div className="stat-label">Everything in One Place</div>
              <div className="stat-desc">Share one URL. Let it do all the work.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Examples */}
      <section className="examples" id="examples">
        <div className="wrap">
          <div className="examples-header">
            <div style={{ display:'flex', justifyContent:'center', marginBottom:16 }}>
              <div className="section-label"><span className="section-label-dot" />Real Profiles</div>
            </div>
            <h2 className="section-h" style={{ textAlign:'center' }}>See what people <em>build.</em></h2>
            <p className="section-sub" style={{ textAlign:'center', margin:'0 auto' }}>
              Every profile is unique. Here's what members are creating.
            </p>
          </div>
          <div className="examples-grid">
            <div className="example-card">
              <div className="example-avatar" style={{ background:'linear-gradient(135deg,#7c5cfa,#4f8aff)' }}>Z</div>
              <div className="example-name">zj71</div>
              <div className="example-role">🎮 Gamer · ⭐ OG</div>
              <div className="example-quote">"Finally a biolink that actually looks good. Mine goes hard."</div>
            </div>
            <div className="example-card">
              <div className="example-avatar" style={{ background:'linear-gradient(135deg,#f472b6,#facc15)' }}>A</div>
              <div className="example-name">ariadne</div>
              <div className="example-role">🔥 Creator · 💜 Donor</div>
              <div className="example-quote">"Got my invite and had my profile looking perfect in 5 minutes."</div>
            </div>
            <div className="example-card">
              <div className="example-avatar" style={{ background:'linear-gradient(135deg,#34d399,#4f8aff)' }}>K</div>
              <div className="example-name">kael</div>
              <div className="example-role">👑 Verified · 🏆 Legend</div>
              <div className="example-quote">"Invite-only makes it actually feel exclusive. Love it."</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="wrap">
          <div className="cta-card">
            <div style={{ display:'flex', justifyContent:'center', marginBottom:20 }}>
              <div className="section-label"><span className="section-label-dot" />Ready?</div>
            </div>
            <h2>Get your link.<br /><em>Make it yours.</em></h2>
            <p>Invite-only. One link. Fully customized. Your entire online presence — in one place.</p>
            <div className="cta-actions">
              <Link href="/signup" className="btn-primary" style={{ padding:'14px 32px', fontSize:15 }}>
                Get Started
              </Link>
              <Link href="/login" className="btn-secondary" style={{ padding:'14px 24px', fontSize:15 }}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-inner">
            <div className="footer-logo">
              <div className="footer-logo-dot" />
              BioLink
            </div>
            <div className="footer-links">
              <Link href="/login" className="footer-link">Sign In</Link>
              <Link href="/signup" className="footer-link">Sign Up</Link>
            </div>
            <div className="footer-copy">Invite only. Built different.</div>
          </div>
        </div>
      </footer>
    </>
  )
}
