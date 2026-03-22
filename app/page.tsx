import Link from 'next/link'
import Image from 'next/image'

export default function Landing() {
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

      {/* ── HERO ── */}
      <main className="landing-hero">
        <div className="landing-bg" />
        <div className="landing-grid" />

        <div className="landing-badge">
          <span className="landing-badge-dot" />
          Invite only · now open
        </div>

        <h1 className="landing-h1">
          fentanyl<em>.best</em>
        </h1>

        <p className="landing-p">
          the cleanest biolink out. your socials, your music, your whole thing — one link, no noise.
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
          {[
            { label: 'fentanyl.best/zj71', href: '/zj71' },
            { label: 'fentanyl.best/sawyer', href: '/sawyer' },
            { label: 'fentanyl.best/example', href: '/example' },
          ].map(({ label, href }) => (
            <Link key={href} href={href} className="landing-example">{label}</Link>
          ))}
        </div>
      </main>
    </>
  )
}
