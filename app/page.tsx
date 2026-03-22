import Link from 'next/link'

export default function Landing() {
  return (
    <>
      {/* ── CENTERED GLASS NAV ── */}
      <header className="cnav-host">
        <nav className="cnav">
          <Link href="/" className="cnav-logo">
            <div className="cnav-logo-mark">f</div>
            <span>fentanyl<em>.best</em></span>
          </Link>

          <div className="cnav-links">
            <Link href="#" className="cnav-link">Features</Link>
            <Link href="#" className="cnav-link">Profiles</Link>
            <Link href="#" className="cnav-link">Premium</Link>
          </div>

          <div className="cnav-actions">
            <Link href="/login" className="cnav-signin">Sign in</Link>
            <Link href="/signup" className="cnav-cta">Get started</Link>
          </div>
        </nav>
      </header>

    <main className="landing-hero" style={{ paddingTop: '72px' }}>
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
