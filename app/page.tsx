import Link from 'next/link'

export default function Landing() {
  return (
    <main className="land">
      {/* NAV */}
      <nav className="land-nav">
        <Link href="/" className="land-logo">fentanyl<span>.best</span></Link>
        <div className="land-nav-right">
          <Link href="/login" className="land-nav-a">Sign In</Link>
          <Link href="/signup" className="land-nav-a">Get Started</Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="land-hero">
        <div className="land-badge">
          <span className="land-badge-dot" />
          Invite Only · Now Open
        </div>

        <h1 className="land-h1">
          Your link.<br />
          <span className="land-h1-purple">Your identity.</span>
        </h1>

        <p className="land-p">
          One link. Everything about you — your socials, your<br />
          music, your vibe. Fully yours.
        </p>

        <div className="land-btns">
          <Link href="/signup" className="land-btn-primary">Get Started</Link>
          <Link href="/login" className="land-btn-outline">Sign In</Link>
        </div>

        <div className="land-examples">
          {['fentanyl.best/zj71', 'fentanyl.best/ariadne', 'fentanyl.best/yourname'].map(u => (
            <span key={u} className="land-example">{u}</span>
          ))}
        </div>
      </div>
    </main>
  )
}
