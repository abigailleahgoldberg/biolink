import Link from 'next/link'

export default function Landing() {
  return (
    <main className="page">

      {/* bg */}
      <div className="bg-glow" />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-wrap">
          <Link href="/" className="nav-logo">fentanyl<span>.best</span></Link>
          <div className="nav-links">
            <Link href="/login" className="nav-a">Sign in</Link>
            <Link href="/signup" className="nav-btn">Get started</Link>
          </div>
        </div>
      </nav>

      {/* ── SECTION 1 — HERO ── */}
      <section className="s s-hero">
        <div className="s-inner">
          <div className="s-label">Invite only</div>
          <h1 className="hero-h1">
            One link.<br />
            <span className="hero-h1-purple">Everything you are.</span>
          </h1>
          <p className="hero-p">Your socials, your music, your vibe — all in one place.</p>
          <div className="hero-btns">
            <Link href="/signup" className="btn-primary">Claim your link</Link>
            <Link href="/login" className="btn-ghost">Sign in</Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — PROFILE PREVIEW ── */}
      <section className="s s-preview">
        <div className="s-inner s-inner-split">
          <div className="split-text">
            <div className="s-label">Your profile</div>
            <h2 className="s-h2">One page.<br />Fully yours.</h2>
            <p className="s-p">Change your background, colors, font, button style, badges, and music player. Every detail is under your control.</p>
          </div>
          <div className="split-card">
            <div className="profile-card">
              <div className="pc-avatar">Z</div>
              <div className="pc-name">zj71</div>
              <div className="pc-bio">creator · gamer · just vibing</div>
              <div className="pc-badges">
                <span>🎮 Gamer</span>
                <span>⭐ OG</span>
                <span>👑 Founder</span>
              </div>
              <div className="pc-links">
                <div className="pc-link pc-link-fill">Discord</div>
                <div className="pc-link">TikTok</div>
                <div className="pc-link">YouTube</div>
                <div className="pc-link">Spotify</div>
              </div>
              <div className="pc-views">1,247 views</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — FEATURES ── */}
      <section className="s s-features">
        <div className="s-inner">
          <div className="s-label">Features</div>
          <h2 className="s-h2">Everything you need.<br />Nothing you don't.</h2>
          <div className="feat-list">
            {[
              { icon: '🔗', title: 'All your socials', desc: 'Discord, TikTok, YouTube, X, Instagram, Twitch, Spotify, GitHub — plus custom links.' },
              { icon: '🎵', title: 'Music player', desc: 'Embed a Spotify track, YouTube video, or SoundCloud on your profile.' },
              { icon: '🏅', title: 'Badges', desc: 'OG, Founder, Gamer, Verified — show the world who you are.' },
              { icon: '📊', title: 'View counter', desc: 'Real-time view tracking on every profile. Always on, zero setup.' },
              { icon: '🛡️', title: 'Invite only', desc: 'Access controlled by invite codes. Admin tools to manage everything.' },
            ].map(f => (
              <div key={f.title} className="feat-item">
                <div className="feat-icon">{f.icon}</div>
                <div>
                  <div className="feat-title">{f.title}</div>
                  <div className="feat-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — CTA ── */}
      <section className="s s-cta">
        <div className="s-inner s-inner-center">
          <div className="s-label">Get started</div>
          <h2 className="s-h2 s-h2-lg">Your link is waiting.</h2>
          <p className="s-p s-p-center">Get an invite code and claim your spot on fentanyl.best.</p>
          <Link href="/signup" className="btn-primary btn-xl">Claim your link →</Link>
          <div className="cta-url">fentanyl.best/<em>yourname</em></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-wrap">
          <Link href="/" className="nav-logo">fentanyl<span>.best</span></Link>
          <div className="footer-links">
            <Link href="/signup" className="footer-a">Sign up</Link>
            <Link href="/login" className="footer-a">Sign in</Link>
            <a href="#" className="footer-a">Terms</a>
            <a href="#" className="footer-a">Privacy</a>
          </div>
          <div className="footer-copy">© 2025 fentanyl.best</div>
        </div>
      </footer>

    </main>
  )
}
