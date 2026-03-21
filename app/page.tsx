import Link from 'next/link'

const PROFILES = [
  { name: 'zj71',     gradient: 'linear-gradient(135deg,#7857ff,#4f8aff)', views: '1.2k' },
  { name: 'ariadne',  gradient: 'linear-gradient(135deg,#f472b6,#c084fc)', views: '843'  },
  { name: 'kael',     gradient: 'linear-gradient(135deg,#34d399,#3b82f6)', views: '2.1k' },
  { name: 'nyx',      gradient: 'linear-gradient(135deg,#fb923c,#f43f5e)', views: '921'  },
  { name: 'void',     gradient: 'linear-gradient(135deg,#a78bfa,#60a5fa)', views: '1.8k' },
  { name: 'luxe',     gradient: 'linear-gradient(135deg,#facc15,#f97316)', views: '3.4k' },
]

export default function Landing() {
  return (
    <>
      {/* bg glow */}
      <div className="lp-glow" />

      {/* NAV */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <Link href="/" className="lp-brand">fentanyl<span>.</span></Link>
          <div className="lp-nav-right">
            <Link href="/login" className="lp-nav-login">Sign in</Link>
            <Link href="/signup" className="lp-nav-cta">Get started</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <div className="lp-hero-badge">
            <span className="lp-hero-badge-dot" />
            Invite only — now accepting
          </div>
          <h1 className="lp-hero-h1">
            One link.<br />
            <span>Everything you are.</span>
          </h1>
          <p className="lp-hero-sub">
            Your socials, your music, your vibe — all in one place.<br />
            Fully yours. Fully customizable. Invite only.
          </p>
          <div className="lp-hero-actions">
            <Link href="/signup" className="lp-btn-primary">
              Get your link
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/login" className="lp-btn-ghost">Sign in</Link>
          </div>
          <div className="lp-hero-url">fentanyl.best/<span>yourname</span></div>
        </div>
      </section>

      {/* PROFILE CARDS GRID */}
      <section className="lp-profiles">
        <div className="lp-wrap">
          <div className="lp-profiles-label">Real profiles, real people</div>
          <div className="lp-profiles-grid">
            {PROFILES.map(p => (
              <div key={p.name} className="lp-profile-card">
                <div className="lp-profile-avatar" style={{ background: p.gradient }}>
                  {p.name[0].toUpperCase()}
                </div>
                <div className="lp-profile-name">{p.name}</div>
                <div className="lp-profile-views">{p.views} views</div>
                <div className="lp-profile-links">
                  {['Discord', 'TikTok', 'X'].map(l => (
                    <div key={l} className="lp-profile-link-pill">{l}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-features">
        <div className="lp-wrap">
          <div className="lp-features-header">
            <h2 className="lp-section-h2">Everything you need.<br />Nothing you don't.</h2>
            <p className="lp-section-sub">No clutter. No paywalls. Just a clean link that does exactly what you want.</p>
          </div>
          <div className="lp-feat-grid">
            <div className="lp-feat-card lp-feat-large">
              <div className="lp-feat-icon">🎨</div>
              <h3 className="lp-feat-title">Fully yours</h3>
              <p className="lp-feat-desc">Change your background, colors, button style, font, badges, and music player. Every pixel is under your control.</p>
              <div className="lp-feat-preview">
                <div className="lp-preview-color-row">
                  {['#7857ff','#4f8aff','#f472b6','#34d399','#facc15','#fb923c'].map(c => (
                    <div key={c} className="lp-preview-swatch" style={{ background: c }} />
                  ))}
                </div>
                <div className="lp-preview-btn-row">
                  {['Filled', 'Outline', 'Glass'].map((s, i) => (
                    <div key={s} className="lp-preview-btn-style" style={{ opacity: i === 1 ? 1 : 0.4 }}>{s}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lp-feat-card">
              <div className="lp-feat-icon">🔗</div>
              <h3 className="lp-feat-title">All your socials</h3>
              <p className="lp-feat-desc">Discord, TikTok, YouTube, X, Instagram, Twitch, Spotify, GitHub — or any custom URL.</p>
              <div className="lp-social-icons">
                {['discord','tiktok','youtube','twitter','instagram'].map(s => (
                  <div key={s} className="lp-social-icon">{s[0].toUpperCase()}</div>
                ))}
              </div>
            </div>

            <div className="lp-feat-card">
              <div className="lp-feat-icon">🎵</div>
              <h3 className="lp-feat-title">Music player</h3>
              <p className="lp-feat-desc">Embed your Spotify track, YouTube video, or SoundCloud right on your profile.</p>
              <div className="lp-music-mini">
                <div className="lp-music-mini-art" />
                <div>
                  <div className="lp-music-mini-name">Back to Me</div>
                  <div className="lp-music-mini-artist">The Marías</div>
                </div>
                <div className="lp-music-mini-play">▶</div>
              </div>
            </div>

            <div className="lp-feat-card">
              <div className="lp-feat-icon">📊</div>
              <h3 className="lp-feat-title">View counter</h3>
              <p className="lp-feat-desc">See exactly how many people have visited your profile. Real-time, always on.</p>
              <div className="lp-views-demo">
                <div className="lp-views-num">1,247</div>
                <div className="lp-views-label">profile views</div>
              </div>
            </div>

            <div className="lp-feat-card lp-feat-wide">
              <div className="lp-feat-icon">🛡️</div>
              <h3 className="lp-feat-title">Invite only</h3>
              <p className="lp-feat-desc">This isn't for everyone. Invite codes keep the community clean and the profiles worth visiting. An admin panel lets you manage codes, blacklist usernames, and control access.</p>
              <div className="lp-invite-demo">
                <div className="lp-invite-code">STAR-GLAZ-0001</div>
                <div className="lp-invite-label">Invite code</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="lp-stats">
        <div className="lp-wrap">
          <div className="lp-stats-row">
            <div className="lp-stat">
              <div className="lp-stat-num">10<span>+</span></div>
              <div className="lp-stat-label">Social platforms</div>
            </div>
            <div className="lp-stat-divider" />
            <div className="lp-stat">
              <div className="lp-stat-num">99.9<span>%</span></div>
              <div className="lp-stat-label">Uptime</div>
            </div>
            <div className="lp-stat-divider" />
            <div className="lp-stat">
              <div className="lp-stat-num">&lt;2<span>min</span></div>
              <div className="lp-stat-label">Setup time</div>
            </div>
            <div className="lp-stat-divider" />
            <div className="lp-stat">
              <div className="lp-stat-num">100<span>%</span></div>
              <div className="lp-stat-label">Free forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <div className="lp-wrap">
          <div className="lp-cta-box">
            <h2 className="lp-cta-h2">Your link is waiting.</h2>
            <p className="lp-cta-sub">Get an invite code and claim your spot.</p>
            <Link href="/signup" className="lp-btn-primary lp-btn-large">
              Get started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-wrap">
          <div className="lp-footer-inner">
            <div className="lp-brand" style={{ fontSize: 14 }}>fentanyl<span>.</span></div>
            <div className="lp-footer-links">
              <Link href="/login" className="lp-footer-link">Sign in</Link>
              <Link href="/signup" className="lp-footer-link">Sign up</Link>
              <a href="#" className="lp-footer-link">Terms</a>
              <a href="#" className="lp-footer-link">Privacy</a>
            </div>
            <div className="lp-footer-copy">© 2025 fentanyl.best</div>
          </div>
        </div>
      </footer>
    </>
  )
}
