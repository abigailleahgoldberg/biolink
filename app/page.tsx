import Link from 'next/link'

export default function Landing() {
  return (
    <>
      {/* Aurora */}
      <div className="aurora" />

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-dot" />
            fentanyl
          </div>
          <div className="nav-links">
            <a href="#why" className="nav-link">Features</a>
            <a href="#profiles" className="nav-link">Profiles</a>
            <a href="#stats" className="nav-link">Stats</a>
            <a href="#testimonials" className="nav-link">Reviews</a>
          </div>
          <div className="nav-actions">
            <Link href="/login" className="nav-signin">Login with Discord</Link>
            <Link href="/signup" className="nav-cta">Get Your Link →</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            {/* Left */}
            <div>
              <h1 className="hero-h1">
                Elevate your identity with <em>powerful links.</em>
              </h1>
              <p className="hero-p">
                Take control of your online presence with fully customizable profiles, social links, and engagement tools. Automate the tedious tasks and focus on what matters — your audience.
              </p>
              <div className="hero-actions">
                <Link href="/signup" className="btn-primary">
                  Create Your Link
                </Link>
                <a href="#why" className="btn-secondary">
                  View Features
                </a>
              </div>
            </div>

            {/* Right — Protected Profile mockup */}
            <div className="hero-mockup">
              <div className="hero-mockup-glow" />
              <div className="hero-panel">
                <div className="hero-panel-header">
                  <span className="hero-panel-label">Protected Profile</span>
                  <span className="hero-panel-url">fentanyl.best/zj71</span>
                </div>
                <div className="hero-panel-body">
                  {[
                    { user: 'zj71', action: 'set up their profile', time: '2 min ago', color: '#7857ff' },
                    { user: 'ariadne', action: 'added 3 new links', time: '5 min ago', color: '#f472b6' },
                    { user: 'kael', action: 'updated their theme', time: '8 min ago', color: '#4f8aff' },
                    { user: 'femme', action: 'joined the platform', time: '12 min ago', color: '#34d399' },
                  ].map((entry, i) => (
                    <div key={i} className="hero-log-entry">
                      <div className="hero-log-avatar" style={{ background: entry.color }}>
                        {entry.user[0].toUpperCase()}
                      </div>
                      <div className="hero-log-content">
                        <span className="hero-log-user">{entry.user}</span>
                        <span className="hero-log-action"> · {entry.action}</span>
                      </div>
                      <span className="hero-log-time">{entry.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {[...Array(2)].map((_, set) => (
            <div key={set} className="marquee-set">
              {[
                { name: 'zj71', views: '1.2k views' },
                { name: 'ariadne', views: '843 views' },
                { name: 'kael', views: '2.1k views' },
                { name: 'femme', views: '567 views' },
                { name: 'cosints', views: '1.8k views' },
                { name: 'parelite', views: '934 views' },
                { name: 'sam', views: '2.4k views' },
                { name: 'keron', views: '1.5k views' },
              ].map((p, i) => (
                <div key={i} className="marquee-item">
                  <div className="marquee-dot" />
                  <span className="marquee-name">{p.name}</span>
                  <span className="marquee-views">· {p.views}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY CHOOSE ── */}
      <section className="features" id="why">
        <div className="wrap">
          <div className="features-header">
            <p className="features-header-sub">
              A powerful biolink platform that combines aesthetic customization with functionality, providing everything you need to showcase your online identity.
            </p>
            <h2 className="features-header-h">Why Choose fentanyl?</h2>
          </div>

          <div className="why-grid">
            {/* Big left card — Music Player mockup */}
            <div className="why-card why-card-large">
              <div className="feature-card-icon">🎵</div>
              <div className="feature-card-title">Now Playing</div>
              <div className="feature-card-desc">Embed your favorite tracks directly on your profile. Let visitors vibe with you.</div>
              <div className="music-player-demo">
                <div className="music-now-playing">
                  <div className="music-art" />
                  <div className="music-info">
                    <div className="music-track-name">Back to Me</div>
                    <div className="music-artist-name">ARIADNE</div>
                  </div>
                  <div className="music-controls">
                    <span>⏮</span>
                    <span className="music-play">▶</span>
                    <span>⏭</span>
                  </div>
                </div>
                <div className="music-progress-bar">
                  <div className="music-progress-fill" />
                </div>
                <div className="music-time">
                  <span>1:24</span>
                  <span>3:47</span>
                </div>
                <div className="music-queue-label">Up Next</div>
                {[
                  { track: 'Midnight Drive', artist: 'kael', dur: '4:12' },
                  { track: 'Neon Lights', artist: 'femme', dur: '3:28' },
                  { track: 'Echoes', artist: 'zj71', dur: '5:01' },
                ].map((q, i) => (
                  <div key={i} className="music-queue-item">
                    <div className="music-queue-art" />
                    <div className="music-queue-info">
                      <div className="music-queue-track">{q.track}</div>
                      <div className="music-queue-artist">{q.artist}</div>
                    </div>
                    <span className="music-queue-dur">{q.dur}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right top card */}
            <div className="why-card">
              <div className="feature-card-icon">🎨</div>
              <div className="feature-card-title">Full Customization</div>
              <div className="feature-card-desc">Make your profile truly yours with complete control over every visual element.</div>
              <div className="feature-card-pills" style={{ marginTop: 'auto', paddingTop: 14 }}>
                <span className="feature-pill">Background</span>
                <span className="feature-pill">Colors</span>
                <span className="feature-pill">Fonts</span>
                <span className="feature-pill">Buttons</span>
              </div>
            </div>

            {/* Bottom 3 cards */}
            <div className="why-card">
              <div className="feature-card-icon">📈</div>
              <div className="feature-card-title">View Tracking</div>
              <div className="feature-card-desc">Track who visits your profile. Monitor click counts, view trends, and link performance.</div>
              <div className="mini-bars">
                {[85, 60, 45, 72, 55, 90, 68].map((h, i) => (
                  <div key={i} className="mini-bar" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="mini-bars-label">Weekly views trend</div>
            </div>

            <div className="why-card">
              <div className="feature-card-icon">🎵</div>
              <div className="feature-card-title">Music Player</div>
              <div className="feature-card-desc">Embed Spotify, YouTube, or SoundCloud directly on your profile.</div>
              <div className="why-stats-row">
                <div className="why-stat-item">
                  <div className="why-stat-val">1.2k</div>
                  <div className="why-stat-lbl">Plays</div>
                </div>
                <div className="why-stat-item">
                  <div className="why-stat-val">4</div>
                  <div className="why-stat-lbl">Songs</div>
                </div>
              </div>
            </div>

            <div className="why-card">
              <div className="feature-card-icon">🛡️</div>
              <div className="feature-card-title">Username Shield</div>
              <div className="feature-card-desc">Invite-only access with blacklist protection, reserved names, and admin control.</div>
              <div className="shield-stats">
                <div className="shield-stat-row">
                  <span>24 New profiles today</span>
                </div>
                <div className="shield-stat-row muted">
                  <span>+12% from yesterday</span>
                </div>
                <div className="shield-stat-row accent">
                  <span>98% Approval Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="features" id="features" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="features-header">
            <p className="features-header-sub">Every feature is designed to be powerful yet intuitive, giving you complete control over your profile.</p>
            <h2 className="features-header-h">Powerful Features, Simple Interface</h2>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-card-icon">🔗</div>
              <div className="feature-card-title">Link Manager</div>
              <div className="feature-card-desc">Add, reorder, and customize all your social links with icons and labels.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">Discord</span>
                <span className="feature-pill">TikTok</span>
                <span className="feature-pill">YouTube</span>
                <span className="feature-pill">Instagram</span>
                <span className="feature-pill">Custom</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">🎨</div>
              <div className="feature-card-title">Appearance Editor</div>
              <div className="feature-card-desc">Change background, accent colors, button styles, and fonts with live preview.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">Color Picker</span>
                <span className="feature-pill">Gradient</span>
                <span className="feature-pill">Image BG</span>
                <span className="feature-pill">Animated</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">🎵</div>
              <div className="feature-card-title">Music Player</div>
              <div className="feature-card-desc">High-quality music embedding with Spotify, YouTube, and SoundCloud support.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">Spotify Embed</span>
                <span className="feature-pill">YouTube</span>
                <span className="feature-pill">Auto-play</span>
              </div>
            </div>
          </div>
          <div className="feature-grid-2" style={{ marginTop: 16 }}>
            <div className="feature-card">
              <div className="feature-card-icon">🛡️</div>
              <div className="feature-card-title">Username Protection</div>
              <div className="feature-card-desc">Invite-only access with blacklist enforcement and admin moderation tools.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">Blacklist</span>
                <span className="feature-pill">Invite Gate</span>
                <span className="feature-pill">Admin Panel</span>
                <span className="feature-pill">Reserved Names</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">📊</div>
              <div className="feature-card-title">Profile Analytics</div>
              <div className="feature-card-desc">Detailed profile activity tracking and view analytics.</div>
              <div className="feature-card-pills">
                <span className="feature-pill">View Counter</span>
                <span className="feature-pill">Real-time</span>
                <span className="feature-pill">Link Clicks</span>
                <span className="feature-pill">Growth Metrics</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link href="/signup" style={{ fontSize: 13, color: 'var(--accent2)', fontWeight: 500 }}>View All Features →</Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats" id="stats">
        <div className="wrap">
          <div className="stats-header">
            <h2 className="section-h" style={{ textAlign: 'center' }}>Setting New <em>Standards</em></h2>
            <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto' }}>Experience next-level profile customization and reliability that sets us apart.</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-num">&lt; 2<span> sec</span></div>
              <div className="stat-label">Instant Setup</div>
              <div className="stat-desc">From invite code to live profile in under 2 seconds. No friction.</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">99.9<span>%</span></div>
              <div className="stat-label">Uptime</div>
              <div className="stat-desc">Enterprise-grade Vercel hosting. Your profile is always live.</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">10<span>K+</span></div>
              <div className="stat-label">Active Profiles</div>
              <div className="stat-desc">Thousands of creators trust fentanyl for their online identity.</div>
            </div>
          </div>
          <div className="stats-grid-2" style={{ marginTop: 16 }}>
            <div className="stat-card">
              <div className="stat-num">100<span>%</span></div>
              <div className="stat-label">Customizable</div>
              <div className="stat-desc">Colors, fonts, backgrounds, music, badges — all yours to control.</div>
              <div className="stat-pills">
                <span className="feature-pill">Colors</span>
                <span className="feature-pill">Fonts</span>
                <span className="feature-pill">BG</span>
                <span className="feature-pill">Music</span>
                <span className="feature-pill">Badges</span>
                <span className="feature-pill">Active</span>
                <span className="feature-pill">Always On</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-num">30<span> sec</span></div>
              <div className="stat-label">Average Save Time</div>
              <div className="stat-desc">Our dashboard is built for speed. Changes go live instantly.</div>
              <div className="stat-pills">
                <span className="feature-pill">Instant Save</span>
                <span className="feature-pill">Always Live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROFILE INTELLIGENCE ── */}
      <section className="features" id="profiles">
        <div className="wrap">
          <div className="features-header">
            <p className="features-header-sub">Comprehensive profile monitoring and customization that keeps you in control of your online presence.</p>
            <h2 className="features-header-h">Advanced Profile <em>Intelligence</em></h2>
          </div>

          <div className="intel-grid-3">
            {/* Profile Activity */}
            <div className="intel-card">
              <div className="intel-card-title">Profile Activity</div>
              <div className="intel-log-list">
                {[
                  { user: 'zj71', action: 'Profile Viewed', time: '2 minutes ago', color: '#7857ff' },
                  { user: 'ariadne', action: 'Link Clicked: Discord', time: '5 minutes ago', color: '#f472b6' },
                  { user: 'kael', action: 'Profile Viewed', time: '8 minutes ago', color: '#4f8aff' },
                  { user: 'femme', action: 'Theme Changed', time: '12 minutes ago', color: '#34d399' },
                ].map((entry, i) => (
                  <div key={i} className="intel-log-entry">
                    <div className="intel-log-avatar" style={{ background: entry.color }}>{entry.user[0].toUpperCase()}</div>
                    <div className="intel-log-info">
                      <span className="intel-log-user">{entry.user}</span>
                      <span className="intel-log-action"> · {entry.action}</span>
                    </div>
                    <span className="intel-log-time">{entry.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Themes */}
            <div className="intel-card">
              <div className="intel-card-title">Profile Themes</div>
              <div className="theme-grid">
                {[
                  { bg: 'linear-gradient(135deg, #1a1035, #2d1b69)', accent: '#7857ff', name: 'Purple Haze' },
                  { bg: 'linear-gradient(135deg, #0a1628, #1a2d5a)', accent: '#4f8aff', name: 'Ocean Blue' },
                  { bg: 'linear-gradient(135deg, #0a1a10, #1a3d2a)', accent: '#34d399', name: 'Forest' },
                  { bg: 'linear-gradient(135deg, #1a0a1a, #3d1a3d)', accent: '#f472b6', name: 'Rose' },
                ].map((theme, i) => (
                  <div key={i} className="theme-preview" style={{ background: theme.bg }}>
                    <div className="theme-preview-avatar" style={{ background: theme.accent }} />
                    <div className="theme-preview-lines">
                      <div className="theme-line" style={{ width: '60%', background: 'rgba(255,255,255,0.3)' }} />
                      <div className="theme-line" style={{ width: '40%', background: 'rgba(255,255,255,0.15)' }} />
                    </div>
                    <div className="theme-preview-btn" style={{ borderColor: theme.accent, color: theme.accent }}>Set as Theme</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Username & Vanity Tracking */}
            <div className="intel-card">
              <div className="intel-card-title">Username & Vanity Tracking</div>
              <div className="vanity-alerts">
                <div className="vanity-alert">
                  <div className="vanity-alert-header">
                    <span>Username Alert</span>
                    <span className="vanity-badge-new">NEW</span>
                  </div>
                  <div className="vanity-alert-body">zj71 has been claimed</div>
                  <div className="vanity-alert-meta">Available in 14 days</div>
                </div>
                <div className="vanity-alert">
                  <div className="vanity-alert-header">
                    <span>Vanity Alert</span>
                    <span className="vanity-badge-new">NEW</span>
                  </div>
                  <div className="vanity-alert-body">/kael has been dropped</div>
                  <div className="vanity-alert-meta accent">Available Now · Invite Only</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="features" id="testimonials" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="features-header" style={{ textAlign: 'center' }}>
            <h2 className="features-header-h">Trusted by Thousands of Creators</h2>
            <p className="features-header-sub" style={{ margin: '0 auto' }}>Join the growing community of creators who trust fentanyl to showcase their identity.</p>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card testimonial-featured">
              <div className="testimonial-top">
                <div className="example-avatar" style={{ background: 'linear-gradient(135deg,#7857ff,#4f8aff)' }}>S</div>
                <div>
                  <div className="example-name">Sam</div>
                  <div className="example-role">Creator</div>
                </div>
              </div>
              <div className="example-quote">&ldquo;fentanyl is truly unlike any other biolink. With it my life has become so much easier without constantly updating multiple platforms. Everything is packed nicely with their modern dashboard making setup 10x easier. Without fentanyl I would put incredible effort in for a quarter of the results.&rdquo;</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-top">
                <div className="example-avatar" style={{ background: 'linear-gradient(135deg,#f472b6,#facc15)' }}>K</div>
                <div>
                  <div className="example-name">keron</div>
                  <div className="example-role">Creator · 80k followers</div>
                </div>
              </div>
              <div className="example-quote">&ldquo;i rlly love fentanyl sm, i&apos;ve recently found it hard to find a trustable & reliable link page but once i stumbled upon fentanyl, i was finally relieved to know that my audience always lands exactly where i want them&rdquo;</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-top">
                <div className="example-avatar" style={{ background: 'linear-gradient(135deg,#34d399,#4f8aff)' }}>P</div>
                <div>
                  <div className="example-name">parelite</div>
                  <div className="example-role">12k+ followers</div>
                </div>
              </div>
              <div className="example-quote">&ldquo;The profile always loads fast, while having all the features I could possibly ask for. Perfect for our growing community.&rdquo;</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-top">
                <div className="example-avatar" style={{ background: 'linear-gradient(135deg,#facc15,#fb923c)' }}>C</div>
                <div>
                  <div className="example-name">cosints</div>
                  <div className="example-role">Creator</div>
                </div>
              </div>
              <div className="example-quote">&ldquo;It has been hands down the best biolink I have used, helps me showcase everything, make custom profiles, do basically anything one can need, FOR FREE&rdquo;</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE COUNTERS ── */}
      <section className="counters-section">
        <div className="wrap">
          <div className="counters-grid">
            <div className="counter-item">
              <div className="counter-num">10,847</div>
              <div className="counter-label">Active Profiles</div>
            </div>
            <div className="counter-item">
              <div className="counter-num">2,431,209</div>
              <div className="counter-label">Total Views</div>
            </div>
            <div className="counter-item">
              <div className="counter-num">847,392</div>
              <div className="counter-label">Links Clicked</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="wrap">
          <div className="cta-card">
            <h2>Ready to Get Your Link?</h2>
            <p>Join thousands of creators already using fentanyl to showcase their identity. Get started in seconds.</p>
            <div className="cta-actions">
              <Link href="/signup" className="btn-primary" style={{ padding: '14px 32px', fontSize: 15 }}>Create Your Link</Link>
              <a href="#why" className="btn-secondary" style={{ padding: '14px 24px', fontSize: 15 }}>View Features</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-cols">
            <div>
              <div className="footer-logo" style={{ marginBottom: 10 }}>
                <div className="footer-logo-dot" />fentanyl
              </div>
              <div className="footer-copy">Invite only. Built different.</div>
            </div>
            <div>
              <div className="footer-col-title">Platform</div>
              <div className="footer-col-links">
                <Link href="/signup" className="footer-link">Create Profile</Link>
                <Link href="/login" className="footer-link">Sign In</Link>
                <a href="#features" className="footer-link">Features</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Legal</div>
              <div className="footer-col-links">
                <a href="#" className="footer-link">Terms</a>
                <a href="#" className="footer-link">Privacy</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', marginTop: 32, paddingTop: 20, textAlign: 'center' }}>
            <div className="footer-copy">Copyright © 2025 fentanyl.best. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </>
  )
}
