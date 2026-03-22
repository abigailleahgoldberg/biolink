import Link from 'next/link'

export default function Landing() {
  return (
    <main className="land">
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
          One link. Everything about you — your socials, your music, your vibe. Fully yours.
        </p>

        <div className="land-btns">
          <Link href="/signup" className="land-btn-primary">Get Started</Link>
          <Link href="/login" className="land-btn-secondary">Sign In</Link>
        </div>

        <div className="land-urls">
          {['yourdomain.gg/zj71', 'yourdomain.gg/starglaze', 'yourdomain.gg/username'].map(u => (
            <span key={u} className="land-url">{u}</span>
          ))}
        </div>

      </div>
    </main>
  )
}
