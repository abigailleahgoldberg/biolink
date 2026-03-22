import Link from 'next/link'

export default function Landing() {
  return (
    <>
      {/* ── FROSTED NAV ── */}
      <nav className="glass-nav">
        <div className="glass-nav-inner">
          {/* Left — logo + links */}
          <div className="glass-nav-left">
            <Link href="/" className="glass-logo">
              <div className="glass-logo-icon">f</div>
            </Link>
            <div className="glass-nav-links">
              <a href="#" className="glass-nav-link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                Features
              </a>
              <a href="#" className="glass-nav-link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Profiles
              </a>
              <a href="#" className="glass-nav-link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Premium
              </a>
            </div>
          </div>

          {/* Right — auth + cta */}
          <div className="glass-nav-right">
            <Link href="/login" className="glass-nav-link">Sign in</Link>
            <div className="glass-nav-divider" />
            <Link href="/signup" className="glass-nav-cta">
              Get started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="glass-hamburger" aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <main className="landing-hero">
        <div className="landing-bg" />
        <div className="landing-grid" />

        <div className="landing-badge">
          <span className="landing-badge-dot" />
          Invite Only · Now Open
        </div>

        <h1 className="landing-h1">
          Your link.<br />
          <em>Your identity.</em>
        </h1>

        <p className="landing-p">
          One link. Everything about you — your socials, your music, your vibe. Fully yours.
        </p>

        <div className="landing-actions">
          <Link href="/signup" className="btn btn-primary" style={{ padding: '14px 36px', fontSize: 15 }}>
            Get Started
          </Link>
          <Link href="/login" className="btn btn-ghost" style={{ padding: '14px 28px', fontSize: 15 }}>
            Sign In
          </Link>
        </div>

        <div className="landing-examples" style={{ marginTop: 48 }}>
          {['yourdomain.gg/zj71', 'yourdomain.gg/starglaze', 'yourdomain.gg/username'].map(ex => (
            <span key={ex} className="landing-example">{ex}</span>
          ))}
        </div>
      </main>
    </>
  )
}
