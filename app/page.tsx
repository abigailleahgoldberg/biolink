import Link from 'next/link'
import LiveCounter from '@/components/LiveCounter'

const MARQUEE_ITEMS = [
  'zj71 · 1.2k views','ariadne · 843 views','kael · 2.1k views','femme · 567 views',
  'luxe · 3.4k views','nyx · 921 views','void · 1.8k views','aura · 445 views',
  'frost · 2.3k views','echo · 788 views','solar · 1.1k views','haze · 634 views',
]

export default function Landing() {
  return (
    <>
      {/* Aurora glow */}
      <div className="aurora" />

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">fentanyl</Link>
          <div className="nav-links">
            <a href="#why" className="nav-link">Features</a>
            <a href="#profiles" className="nav-link">Profiles</a>
            <a href="#stats" className="nav-link">Stats</a>
            <a href="#reviews" className="nav-link">Reviews</a>
          </div>
          <div className="nav-actions">
            <Link href="/login" className="nav-login">Login</Link>
            <Link href="/signup" className="nav-cta">Create Your Link →</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            {/* Left */}
            <div className="hero-left">
              <h1 className="hero-h1">
                Elevate your identity<br />
                with <em>powerful links.</em>
              </h1>
              <p className="hero-p">
                Take control of your online presence with fully customizable profiles, social links, and engagement tools. Automate the tedious tasks and focus on what matters — your audience.
              </p>
              <div className="hero-btns">
                <Link href="/signup" className="btn-fill">Create Your Link</Link>
                <a href="#why" className="btn-outline">View Features</a>
              </div>
            </div>

            {/* Right — Discord-style mockup card */}
            <div className="hero-right">
              <div className="discord-card">
                <div className="discord-card-header">
                  <div className="discord-channel-name">
                    <span className="discord-hash">#</span> Protected Profile
                  </div>
                  <div className="discord-header-icons">
                    <div className="discord-icon-dot" />
                    <div className="discord-icon-dot" />
                    <div className="discord-icon-dot" />
                  </div>
                </div>
                <div className="discord-messages">
                  {[
                    { color: '#5865f2', user: 'fentanyl', role: 'BOT', time: 'Today at 2:00 PM', msg: '@zj71: Finished setting up your profile. All links are live.', check: true },
                    { color: '#3ba55c', user: 'zj71', role: '', time: 'Today at 2:01 PM', msg: '/profile theme --color purple --font inter --bg gradient', check: false },
                    { color: '#5865f2', user: 'fentanyl', role: 'BOT', time: 'Today at 2:01 PM', msg: '@zj71: Updated profile theme. Accent set to purple, font set to inter.', check: true },
                  ].map((m, i) => (
                    <div key={i} className="discord-msg">
                      <div className="discord-avatar" style={{ background: m.color }}>{m.user[0].toUpperCase()}</div>
                      <div className="discord-msg-body">
                        <div className="discord-msg-meta">
                          <span className="discord-username" style={{ color: m.color }}>{m.user}</span>
                          {m.role && <span className="discord-role">BOT</span>}
                          <span className="discord-time">{m.time}</span>
                        </div>
                        <div className="discord-msg-text">{m.msg}</div>
                        {m.check && (
                          <div className="discord-embed">
                            <span className="discord-check">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero-trust">
                Powering <strong>18,417,041</strong> profiles across <strong>127,956</strong> creators
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="marquee-item">
              <div className="marquee-dot" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY CHOOSE ── */}
      <section className="section" id="why">
        <div className="wrap">
          <div className="section-center-header">
            <h2 className="section-h2">Why Choose fentanyl?</h2>
            <p className="section-sub">A powerful biolink platform that combines aesthetic customization with functionality, providing everything you need to showcase your online identity.</p>
          </div>

          <div className="why-grid">
            {/* Big left card — music player mockup */}
            <div className="why-card why-big">
              <div className="music-player">
                <div className="music-player-header">
                  <div className="music-icon">♫</div>
                  <span className="music-title">Back to Me</span>
                  <span className="music-badge">Now Playing</span>
                </div>
                <div className="music-track-row">
                  <div className="music-art" />
                  <div className="music-info">
                    <div className="music-track-name">Back to Me</div>
                    <div className="music-artist">The Marías</div>
                  </div>
                </div>
                <div className="music-progress-wrap">
                  <span className="music-time">2:14</span>
                  <div className="music-bar"><div className="music-fill" /></div>
                  <span className="music-time">3:45</span>
                </div>
                <div className="music-queue">
                  <div className="music-queue-label">Queue</div>
                  {[
                    { n: '9', a: 'Drake' },
                    { n: 'Chanel', a: 'Frank Ocean' },
                    { n: 'Fourth of July', a: 'Sufjan Stevens' },
                  ].map(t => (
                    <div key={t.n} className="music-queue-item">
                      <div className="music-queue-dot" />
                      <div>
                        <div className="music-queue-name">{t.n}</div>
                        <div className="music-queue-artist">{t.a}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right top card */}
            <div className="why-card">
              <h3 className="card-title">Advanced Customization</h3>
              <p className="card-desc">Make your profile truly yours with complete control over every visual element.</p>
              <div className="card-pills">
                <span className="pill">Background</span>
                <span className="pill">Colors</span>
                <span className="pill">Fonts</span>
                <span className="pill">Buttons</span>
              </div>
            </div>

            {/* Bottom 3 cards */}
            <div className="why-card">
              <h3 className="card-title">View Tracking</h3>
              <p className="card-desc">Track who visits your profile. Monitor click counts and view trends over time.</p>
              <div className="bar-chart">
                {[40, 65, 45, 50, 80, 35, 70].map((h, i) => (
                  <div key={i} className="bar" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="card-meta">Weekly engagement trend</div>
            </div>

            <div className="why-card">
              <h3 className="card-title">Music Player</h3>
              <p className="card-desc">Embed Spotify, YouTube, or SoundCloud directly on your profile for visitors to enjoy.</p>
              <div className="stat-pair">
                <div className="stat-mini"><div className="stat-mini-num">1.2k</div><div className="stat-mini-label">Plays</div></div>
                <div className="stat-mini"><div className="stat-mini-num">4</div><div className="stat-mini-label">Songs</div></div>
              </div>
            </div>

            <div className="why-card">
              <h3 className="card-title">Username Shield</h3>
              <p className="card-desc">Invite-only access with blacklist protection, reserved names, and admin control.</p>
              <div className="community-stats">
                <div className="com-stat-row"><span className="com-num">24</span><div><div className="com-label">New Profiles Today</div><div className="com-sub">+12% from yesterday</div></div></div>
                <div className="com-stat-row"><span className="com-num">98%</span><div><div className="com-label">Approval Rate</div><div className="com-sub">Members welcomed</div></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POWERFUL FEATURES ── */}
      <section className="section" id="features">
        <div className="wrap">
          <div className="section-center-header">
            <h2 className="section-h2">Powerful Features, Simple Interface</h2>
            <p className="section-sub">Every feature is designed to be powerful yet intuitive, helping you manage your identity with ease.</p>
          </div>

          <div className="feat-grid-3">
            {[
              { title: 'Link Manager', desc: 'Add, reorder, and customize all your social links with platform icons and custom labels.', pills: ['Custom URLs', 'Platform Icons', 'Reorder', 'Click Tracking'] },
              { title: 'Appearance Editor', desc: 'Change background, accent colors, button styles, and fonts with a live preview dashboard.', pills: ['Color Picker', 'Gradient', 'Image BG', 'Animated'] },
              { title: 'Music Player', desc: 'High-quality music embedding with Spotify, YouTube, and SoundCloud support built in.', pills: ['Spotify Embed', 'YouTube', 'SoundCloud', 'Auto-play'] },
            ].map(f => (
              <div key={f.title} className="feat-card">
                <h3 className="card-title">{f.title}</h3>
                <p className="card-desc">{f.desc}</p>
                <div className="card-pills">
                  {f.pills.map(p => <span key={p} className="pill">{p}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="feat-grid-2" style={{ marginTop: 12 }}>
            {[
              { title: 'Username Protection', desc: 'Invite-only access with blacklist enforcement, reserved name protection, and full admin moderation tools.', pills: ['Blacklist', 'Invite Gate', 'Admin Panel', 'Reserved Names'] },
              { title: 'Profile Analytics', desc: 'Detailed profile activity tracking, view analytics, and link performance data in real-time.', pills: ['View Counter', 'Real-time', 'Link Clicks', 'Growth Metrics'] },
            ].map(f => (
              <div key={f.title} className="feat-card">
                <h3 className="card-title">{f.title}</h3>
                <p className="card-desc">{f.desc}</p>
                <div className="card-pills">
                  {f.pills.map(p => <span key={p} className="pill">{p}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <a href="#profiles" className="view-all-link">View All Features →</a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section" id="stats">
        <div className="wrap">
          <div className="section-center-header">
            <h2 className="section-h2">Setting New <em>Standards</em></h2>
            <p className="section-sub">Experience next-level profile customization and reliability that sets us apart from the competition</p>
          </div>
          <div className="stats-grid-3">
            <div className="stat-card">
              <div className="stat-big">19<span className="stat-unit"> ms</span></div>
              <h3 className="stat-title">Fastest Load Time</h3>
              <p className="stat-desc">While others load in 200ms+, fentanyl profiles serve in milliseconds</p>
            </div>
            <div className="stat-card">
              <div className="stat-big">99.9<span className="stat-unit">%</span></div>
              <h3 className="stat-title">Highest Uptime</h3>
              <p className="stat-desc">Enterprise-grade Vercel hosting you can count on</p>
            </div>
            <div className="stat-card">
              <div className="stat-big">98.9<span className="stat-unit">K+</span></div>
              <h3 className="stat-title">Daily Views</h3>
              <p className="stat-desc">Trusted by thousands of creators for reliable performance</p>
            </div>
          </div>
          <div className="stats-grid-2">
            <div className="stat-card">
              <div className="stat-big">100<span className="stat-unit">%</span></div>
              <h3 className="stat-title">Customizable</h3>
              <p className="stat-desc">Complete control over colors, fonts, backgrounds, music, and badges</p>
              <div className="card-pills" style={{ marginTop: 16 }}>
                <span className="pill">Colors</span><span className="pill">Active</span>
                <span className="pill">Fonts</span><span className="pill">24/7</span>
                <span className="pill">Badges</span><span className="pill" style={{ color: 'var(--accent2)' }}>0 Limits</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-big">30<span className="stat-unit"> sec</span></div>
              <h3 className="stat-title">Average Save Time</h3>
              <p className="stat-desc">Dashboard built for speed. Changes save and go live instantly</p>
              <div className="card-pills" style={{ marginTop: 16 }}>
                <span className="pill">Instant Save</span>
                <span className="pill">Always Live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADVANCED PROFILE INTELLIGENCE ── */}
      <section className="section" id="profiles">
        <div className="wrap">
          <div className="section-center-header">
            <h2 className="section-h2">Advanced Profile <em>Intelligence</em></h2>
            <p className="section-sub">Comprehensive profile monitoring and logging that keeps you in control of every aspect of your online presence</p>
          </div>

          <div className="intel-grid-top">
            {/* Panel 1 — Activity Log */}
            <div className="intel-card">
              <div className="intel-card-header">
                <div className="intel-icon">📋</div>
                <h3 className="intel-title">Profile Activity</h3>
                <p className="intel-subtitle">Track views, clicks, and profile changes in real-time</p>
              </div>
              <div className="log-entries">
                {[
                  { user: 'fentanyl', color: '#5865f2', time: 'Today at 8:36 PM', action: 'zj71 · Profile Viewed', detail: 'Viewer from United States · 2 minutes ago · Profile ID: 414903717517' },
                  { user: 'fentanyl', color: '#5865f2', time: 'Today at 8:41 PM', action: 'ariadne · Link Clicked: Discord', detail: 'Link clicked from profile page · 5 minutes ago · Profile ID: 668781824029' },
                  { user: 'fentanyl', color: '#5865f2', time: 'Today at 8:45 PM', action: 'kael · Profile Theme Updated', detail: 'Changed background to gradient · 9 minutes ago · Profile ID: 117281924301' },
                ].map((e, i) => (
                  <div key={i} className="log-entry">
                    <div className="log-avatar" style={{ background: e.color }}>{e.user[0].toUpperCase()}</div>
                    <div>
                      <div className="log-meta"><span className="log-user" style={{ color: e.color }}>{e.user}</span><span className="log-time">{e.time}</span></div>
                      <div className="log-action">{e.action}</div>
                      <div className="log-detail">{e.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 2 — Profile Themes (Auto PFPs) */}
            <div className="intel-card">
              <div className="intel-card-header">
                <div className="intel-icon">🎨</div>
                <h3 className="intel-title">Profile Themes</h3>
                <p className="intel-subtitle">Automatically apply curated themes to your profile</p>
              </div>
              <div className="theme-grid">
                {[
                  { bg: 'linear-gradient(135deg,#1a0a2e,#2d1b69)', label: 'Dark Purple' },
                  { bg: 'linear-gradient(135deg,#0a1628,#1a3a6e)', label: 'Midnight Blue' },
                  { bg: 'linear-gradient(135deg,#1a0a14,#6e1a3a)', label: 'Deep Rose' },
                  { bg: 'linear-gradient(135deg,#0a1a0a,#1a4a2a)', label: 'Forest' },
                ].map(t => (
                  <div key={t.label} className="theme-thumb" style={{ background: t.bg }}>
                    <div className="theme-thumb-btn">Set as Theme</div>
                  </div>
                ))}
              </div>
              <div className="theme-status">Auto-updates every minute · <span style={{ color: '#3ba55c' }}>Active</span></div>
            </div>
          </div>

          {/* Panel 3 — Username tracking */}
          <div className="intel-card" style={{ marginTop: 12 }}>
            <div className="intel-card-header" style={{ marginBottom: 16 }}>
              <div className="intel-icon">🔍</div>
              <h3 className="intel-title">Username & Vanity Tracking</h3>
              <p className="intel-subtitle">Get notified when desired usernames and vanity URLs become available</p>
            </div>
            <div className="vanity-grid">
              <div className="vanity-item">
                <div className="vanity-badge">Username Alert <span className="badge-new">NEW</span></div>
                <div className="vanity-name">femurs has been dropped</div>
                <div className="vanity-time">Available in 14 days</div>
              </div>
              <div className="vanity-item">
                <div className="vanity-badge">Vanity Alert <span className="badge-new">NEW</span></div>
                <div className="vanity-name">greed has been dropped</div>
                <div className="vanity-time">Available in 14 days · <span style={{ color: 'var(--accent2)' }}>Exclusive Partnership</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" id="reviews">
        <div className="wrap">
          <div className="section-center-header">
            <h2 className="section-h2">Trusted by Thousands of Creators</h2>
            <p className="section-sub">Join the growing community of creators who trust fentanyl to showcase their identity</p>
          </div>

          {/* Featured testimonial */}
          <div className="testi-featured">
            <div className="testi-avatar" style={{ background: 'linear-gradient(135deg,#7857ff,#4f8aff)' }}>S</div>
            <div>
              <h3 className="testi-name">Sam</h3>
              <div className="testi-role">Creator</div>
              <p className="testi-quote">&ldquo;fentanyl is truly unlike any other biolink. With it my life has become so much easier without constantly updating multiple platforms. Everything is packed nicely with their modern dashboard making setup 10x easier. Without fentanyl I would put incredible amounts of effort in for a quarter of the results it provides me. This platform is the future of personal branding and I can&apos;t wait to see what&apos;s ahead.&rdquo;</p>
            </div>
          </div>

          {/* 3-column testimonials */}
          <div className="testi-grid">
            {[
              { init: 'K', bg: 'linear-gradient(135deg,#5865f2,#9b7dd4)', name: 'keron', role: 'Creator · 80k followers', quote: "i rlly love fentanyl sm, i've recently found it hard to find a trustable & reliable link page but once i stumbled upon fentanyl, i was finally relieved to know that my audience always lands exactly where i want them :3" },
              { init: 'P', bg: 'linear-gradient(135deg,#f472b6,#c084fc)', name: 'parelite', role: '12k+ followers', quote: 'The profile always loads fast, while having all the features I could possibly ask for. Perfect for our growing community.' },
              { init: 'C', bg: 'linear-gradient(135deg,#34d399,#3b82f6)', name: 'cosints', role: 'Creator', quote: 'It has been hands down the best biolink I have used. Helps me showcase everything, make custom profiles, do basically anything one can need — FOR FREE. The best platform offering what nobody else does.' },
            ].map(t => (
              <div key={t.name} className="testi-card">
                <div className="testi-card-top">
                  <div className="testi-avatar-sm" style={{ background: t.bg }}>{t.init}</div>
                  <div>
                    <h3 className="testi-name">{t.name}</h3>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
                <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE COUNTER ── */}
      <section className="section">
        <div className="wrap">
          <LiveCounter />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section cta-section">
        <div className="wrap">
          <div className="cta-box">
            <h2 className="cta-h2">Ready to Get Your Link?</h2>
            <p className="cta-sub">Join thousands of creators already using fentanyl to showcase their identity. Get started in seconds.</p>
            <div className="hero-btns" style={{ justifyContent: 'center' }}>
              <Link href="/signup" className="btn-fill">Create Your Link</Link>
              <a href="#why" className="btn-outline">View Features</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">fentanyl</div>
              <div className="footer-tagline">Invite only. Built different.</div>
            </div>
            <div>
              <div className="footer-col-title">Platform</div>
              <div className="footer-col-links">
                <Link href="/signup" className="footer-link">Create Profile</Link>
                <Link href="/login" className="footer-link">Sign In</Link>
                <a href="#why" className="footer-link">Features</a>
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
          <div className="footer-bottom">
            <span>Copyright © 2025 fentanyl.best. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
