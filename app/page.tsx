import Link from 'next/link'

export default function Landing() {
  return (
    <>
      {/* ── NAV ── */}
      <nav className="gn">
        <div className="gn-inner">
          <div className="gn-left">
            <Link href="/" className="gn-avatar">
              <div className="gn-av-img">f</div>
            </Link>
            <Link href="#" className="gn-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              Features
            </Link>
            <Link href="#" className="gn-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Profiles
            </Link>
            <Link href="#" className="gn-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Premium
            </Link>
          </div>

          <div className="gn-right">
            <Link href="#" className="gn-item">Documentation</Link>
            <Link href="#" className="gn-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              Status
            </Link>
            <Link href="/login" className="gn-user">
              <div className="gn-user-av">Z</div>
              zj71
            </Link>
            <Link href="/login" className="gn-discord">
              <svg width="16" height="12" viewBox="0 0 20 15" fill="currentColor">
                <path d="M16.93 1.24A16.38 16.38 0 0 0 12.82 0c-.18.32-.39.76-.53 1.1a15.18 15.18 0 0 0-4.57 0A11.6 11.6 0 0 0 7.18 0a16.43 16.43 0 0 0-4.12 1.25C.44 4.77-.27 8.2.08 11.58a16.49 16.49 0 0 0 5.04 2.55c.41-.55.77-1.14 1.08-1.76a10.7 10.7 0 0 1-1.7-.81c.14-.1.28-.21.41-.32a11.75 11.75 0 0 0 10.18 0c.13.11.27.22.41.32-.54.32-1.11.59-1.71.82.31.62.67 1.2 1.08 1.75a16.43 16.43 0 0 0 5.05-2.55c.42-4-.72-7.39-2.99-10.34Z"/>
              </svg>
            </Link>
          </div>
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
