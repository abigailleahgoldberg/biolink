import Link from 'next/link'

export default function Landing() {
  return (
    <>
      {/* ── NAV ── */}
      <header className="cnav-host">
        <nav className="cnav">
          <Link href="/" className="cnav-logo">
            <div className="cnav-logo-mark">f</div>
            <span className="cnav-logo-text">fentanyl<em>.best</em></span>
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

      {/* ── HERO ── */}
      <main className="landing-hero">
        <div className="landing-bg" />
        <div className="landing-grid" />

        <div className="landing-badge">
          <span className="landing-badge-dot" />
          Invite only · now open
        </div>

        <h1 className="landing-h1">
          Your link.<br />
          <em>Your vibe.</em>
        </h1>

        <p className="landing-p">
          Stop sending five links. One URL, everything about you — socials, music, whatever you're into. Make it look like you actually built it.
        </p>

        <div className="landing-actions">
          <Link href="/signup" className="btn btn-primary" style={{ padding: '14px 36px', fontSize: 15 }}>
            Claim your link
          </Link>
          <Link href="/login" className="btn btn-ghost" style={{ padding: '14px 28px', fontSize: 15 }}>
            Sign in
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
