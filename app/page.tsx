import Link from 'next/link'

export default function Landing() {
  return (
    <>
      {/* ── FLOATING NAV — exact greed.best structure ── */}
      <div className="gn-wrap">
        <div className="gn-container">
          {/* glow behind the card */}
          <div className="gn-outer-glow" />

          <div className="gn-card">
            {/* Left — logo + links */}
            <div className="gn-left">
              <Link href="/" className="gn-logo-wrap">
                <div className="gn-logo-glow" />
                <div className="gn-logo">f</div>
              </Link>

              <div className="gn-links">
                <Link href="#" className="gn-link">
                  <svg className="gn-icon" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="14" width="14"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  Features
                </Link>
                <Link href="#" className="gn-link">
                  <svg className="gn-icon" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="14" width="14"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Profiles
                </Link>
                <Link href="#" className="gn-link">
                  <svg className="gn-icon" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="14" width="14"><path d="m208 512-52.38-139.62L16 320l139.62-52.38L208 128l52.38 139.62L400 320l-139.62 52.38zM88 176l-23.57-64.43L0 88l64.43-23.57L88 0l23.57 64.43L176 88l-64.43 23.57zm312 80-31.11-80.89L288 144l80.89-31.11L400 32l31.11 80.89L512 144l-80.89 31.11z"/></svg>
                  Premium
                </Link>
              </div>
            </div>

            {/* Right — docs, status, divider, user, discord */}
            <div className="gn-right">
              <Link href="#" className="gn-link">Documentation</Link>
              <Link href="#" className="gn-link">
                <svg className="gn-icon" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="14" width="14"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
                Status
              </Link>

              <div className="gn-divider" />

              <Link href="/login" className="gn-user">
                <div className="gn-user-av">Z</div>
                <span>zj71</span>
              </Link>

              <Link href="/signup" className="gn-discord-btn">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="16" width="16"><path d="M19.3034 5.33716C17.9344 4.71103 16.4805 4.2547 14.9629 4C14.7719 4.32899 14.5596 4.77471 14.411 5.12492C12.7969 4.89144 11.1944 4.89144 9.60255 5.12492C9.45397 4.77471 9.2311 4.32899 9.05068 4C7.52251 4.2547 6.06861 4.71103 4.70915 5.33716C1.96053 9.39111 1.21766 13.3495 1.5891 17.2549C3.41443 18.5815 5.17612 19.388 6.90701 19.9187C7.33151 19.3456 7.71356 18.73 8.04255 18.0827C7.41641 17.8492 6.82211 17.5627 6.24904 17.2231C6.39762 17.117 6.5462 17.0003 6.68416 16.8835C10.1438 18.4648 13.8911 18.4648 17.3082 16.8835C17.4568 17.0003 17.5948 17.117 17.7434 17.2231C17.1703 17.5627 16.576 17.8492 15.9499 18.0827C16.2789 18.73 16.6609 19.3456 17.0854 19.9187C18.8152 19.388 20.5875 18.5815 22.4033 17.2549C22.8596 12.7341 21.6806 8.80747 19.3034 5.33716Z"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

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
