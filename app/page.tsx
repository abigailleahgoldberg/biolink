import Link from 'next/link'

export default function Landing() {
  return (
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
  )
}
