import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <>
      {/* ── NAV ── */}
      <header className="cnav-host">
        <nav className="cnav">
          <Link href="/" className="cnav-logo">
            <Image src="/needle-logo.png" alt="fentanyl.best" width={28} height={28} style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(163,151,221,0.6))' }} />
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

      {/* ── 404 HERO ── */}
      <main className="landing-hero">
        <div className="landing-bg" />
        <div className="landing-grid" />

        <div className="landing-badge">
          <span className="landing-badge-dot" style={{ background: '#e91e8c' }} />
          404 · page not found
        </div>

        <h1 className="landing-h1" style={{ fontSize: 'clamp(64px, 14vw, 140px)', letterSpacing: '-4px' }}>
          404
        </h1>

        <p className="landing-p">
          this page doesn&apos;t exist. maybe it never did, maybe it got deleted — either way it&apos;s not here.
        </p>

        <div className="landing-actions">
          <Link href="/" className="btn btn-primary" style={{ padding: '14px 36px', fontSize: 15 }}>
            Go home
          </Link>
          <Link href="/signup" className="btn btn-ghost" style={{ padding: '14px 28px', fontSize: 15 }}>
            Make a page
          </Link>
        </div>
      </main>
    </>
  )
}
