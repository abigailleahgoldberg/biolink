import Link from 'next/link'

export default function Landing() {
  return (
    <>
      {/* NAV */}
      <nav className="fn-nav">
        <div className="fn-nav-wrap">
          <Link href="/" className="fn-logo">fentanyl<span>.best</span></Link>
          <div className="fn-nav-right">
            <Link href="/login" className="fn-nav-ghost">Sign in</Link>
            <Link href="/signup" className="fn-nav-pill">Claim your link →</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="fn-hero">
        <div className="fn-hero-wrap">
          <div className="fn-hero-eyebrow">
            <span className="fn-dot" />
            Invite only · Now open
          </div>
          <h1 className="fn-hero-h1">
            Your link.<br />
            <em>Your rules.</em>
          </h1>
          <p className="fn-hero-body">
            One URL. Every platform. Fully customizable.
            No ads, no noise, no limits. Just you.
          </p>
          <div className="fn-hero-cta">
            <Link href="/signup" className="fn-cta-main">Get your link</Link>
            <Link href="/login" className="fn-cta-sub">Already have one?</Link>
          </div>
          <div className="fn-url-preview">
            fentanyl.best/<em>yourname</em>
          </div>
        </div>

        {/* Floating profile preview */}
        <div className="fn-hero-preview">
          <div className="fn-preview-card">
            <div className="fn-preview-avatar">
              <div className="fn-preview-av-inner">Z</div>
            </div>
            <div className="fn-preview-name">zj71</div>
            <div className="fn-preview-bio">creator. gamer. just vibing.</div>
            <div className="fn-preview-badges">
              <span>🎮 Gamer</span>
              <span>⭐ OG</span>
              <span>👑 Founder</span>
            </div>
            <div className="fn-preview-links">
              <div className="fn-preview-link fn-link-accent">Discord</div>
              <div className="fn-preview-link">TikTok</div>
              <div className="fn-preview-link">YouTube</div>
            </div>
            <div className="fn-preview-views">1,247 views</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="fn-marquee-wrap">
        <div className="fn-marquee">
          {Array.from({ length: 2 }, (_, outer) => (
            [
              'ariadne · 843 views', 'kael · 2.1k views', 'void · 1.8k views',
              'nyx · 921 views', 'luxe · 3.4k views', 'echo · 788 views',
              'frost · 2.3k views', 'haze · 634 views', 'solar · 1.1k views',
              'zj71 · 1.2k views', 'femme · 567 views', 'aura · 445 views',
            ].map((item, i) => (
              <span key={`${outer}-${i}`} className="fn-marquee-item">
                <span className="fn-marquee-dot" />{item}
              </span>
            ))
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="fn-how">
        <div className="fn-section-wrap">
          <div className="fn-how-grid">
            <div className="fn-how-step">
              <div className="fn-step-num">01</div>
              <div className="fn-step-title">Get an invite</div>
              <div className="fn-step-desc">fentanyl.best is invite only. Get a code from a member or the team and you're in.</div>
            </div>
            <div className="fn-how-step">
              <div className="fn-step-num">02</div>
              <div className="fn-step-title">Claim your username</div>
              <div className="fn-step-desc">Pick a username. It's yours forever. Short, clean, and locked to you the moment you register.</div>
            </div>
            <div className="fn-how-step">
              <div className="fn-step-num">03</div>
              <div className="fn-step-title">Make it yours</div>
              <div className="fn-step-desc">Customize everything — background, colors, links, music, fonts, badges. Your profile looks like you built it.</div>
            </div>
            <div className="fn-how-step">
              <div className="fn-step-num">04</div>
              <div className="fn-step-title">Share one link</div>
              <div className="fn-step-desc">Put it in every bio. One URL. Everything about you — always up to date.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES BENTO */}
      <section className="fn-bento">
        <div className="fn-section-wrap">
          <div className="fn-bento-label">What you get</div>
          <div className="fn-bento-grid">

            {/* 1 — customize */}
            <div className="fn-bento-card fn-bento-tall">
              <div className="fn-bento-head">
                <div className="fn-bento-icon">✦</div>
                <h3>Fully customizable</h3>
              </div>
              <p>Every detail — your way. Colors, backgrounds, fonts, button styles. Build something that actually looks like you.</p>
              <div className="fn-color-swatches">
                {['#e8ff47','#7857ff','#f472b6','#34d399','#f97316','#60a5fa'].map(c => (
                  <div key={c} className="fn-swatch" style={{ background: c }} />
                ))}
              </div>
              <div className="fn-btn-styles">
                <div className="fn-btn-demo fn-btn-filled">Filled</div>
                <div className="fn-btn-demo fn-btn-outlined">Outline</div>
                <div className="fn-btn-demo fn-btn-glassy">Glass</div>
              </div>
            </div>

            {/* 2 — links */}
            <div className="fn-bento-card">
              <div className="fn-bento-head">
                <div className="fn-bento-icon">⊕</div>
                <h3>All your socials</h3>
              </div>
              <p>Every platform. One place. Add Discord, TikTok, YouTube, X, Instagram, Twitch, Spotify, GitHub — or any custom URL.</p>
              <div className="fn-platforms">
                {['D','T','▶','X','♪','Gh'].map((s, i) => (
                  <div key={i} className="fn-platform-chip">{s}</div>
                ))}
              </div>
            </div>

            {/* 3 — music */}
            <div className="fn-bento-card">
              <div className="fn-bento-head">
                <div className="fn-bento-icon">♫</div>
                <h3>Music player</h3>
              </div>
              <p>Embed a Spotify track, YouTube video, or SoundCloud right on your profile.</p>
              <div className="fn-mini-player">
                <div className="fn-mini-art" />
                <div className="fn-mini-info">
                  <div className="fn-mini-track">Back to Me</div>
                  <div className="fn-mini-artist">The Marías</div>
                  <div className="fn-mini-bar"><div className="fn-mini-fill" /></div>
                </div>
              </div>
            </div>

            {/* 4 — badges */}
            <div className="fn-bento-card">
              <div className="fn-bento-head">
                <div className="fn-bento-icon">◈</div>
                <h3>Badges</h3>
              </div>
              <p>Show off who you are. OG, Founder, Gamer, Verified — pick the ones that fit.</p>
              <div className="fn-badge-row">
                {['🔥 OG', '👑 Founder', '🎮 Gamer', '⭐ Star', '💜 Donor', '🏆 Legend'].map(b => (
                  <span key={b} className="fn-badge-chip">{b}</span>
                ))}
              </div>
            </div>

            {/* 5 — views */}
            <div className="fn-bento-card fn-bento-accent">
              <div className="fn-bento-head">
                <div className="fn-bento-icon">↗</div>
                <h3>View counter</h3>
              </div>
              <p>Real-time view count on every profile. Always on, zero setup.</p>
              <div className="fn-views-big">1,247</div>
              <div className="fn-views-sub">profile views this week</div>
            </div>

            {/* 6 — invite only */}
            <div className="fn-bento-card fn-bento-wide">
              <div className="fn-bento-head">
                <div className="fn-bento-icon">⊘</div>
                <h3>Invite only — by design</h3>
              </div>
              <p>We keep it exclusive on purpose. An invite code gets you in. Admin tools let you generate codes, blacklist usernames, and manage who's here.</p>
              <div className="fn-invite-box">
                <span className="fn-invite-code">XXXX-XXXX-XXXX</span>
                <span className="fn-invite-tag">Invite code</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="fn-numbers">
        <div className="fn-section-wrap">
          <div className="fn-numbers-grid">
            <div className="fn-number">
              <div className="fn-number-val">10<span>+</span></div>
              <div className="fn-number-label">Platforms supported</div>
            </div>
            <div className="fn-number">
              <div className="fn-number-val">99.9<span>%</span></div>
              <div className="fn-number-label">Uptime guaranteed</div>
            </div>
            <div className="fn-number">
              <div className="fn-number-val">&lt;2<span>min</span></div>
              <div className="fn-number-label">From invite to live</div>
            </div>
            <div className="fn-number">
              <div className="fn-number-val">∞</div>
              <div className="fn-number-label">Customization options</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fn-final-cta">
        <div className="fn-section-wrap">
          <div className="fn-final-box">
            <div className="fn-final-glow" />
            <h2 className="fn-final-h2">
              One link.<br />
              Make it count.
            </h2>
            <p className="fn-final-sub">Grab an invite code and claim your spot on fentanyl.best.</p>
            <Link href="/signup" className="fn-cta-main fn-cta-xl">Get your link →</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fn-footer">
        <div className="fn-section-wrap">
          <div className="fn-footer-row">
            <Link href="/" className="fn-logo fn-footer-logo">fentanyl<span>.best</span></Link>
            <div className="fn-footer-links">
              <Link href="/signup" className="fn-footer-link">Sign up</Link>
              <Link href="/login" className="fn-footer-link">Sign in</Link>
              <a href="#" className="fn-footer-link">Terms</a>
              <a href="#" className="fn-footer-link">Privacy</a>
            </div>
            <div className="fn-footer-copy">© 2025 fentanyl.best</div>
          </div>
        </div>
      </footer>
    </>
  )
}
