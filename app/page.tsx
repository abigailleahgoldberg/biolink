import Link from 'next/link'
import LiveCounter from '../components/LiveCounter'

export default function Landing() {
  const marqueeItems = [
    'zj71 · 1.2k views', 'ariadne · 843 views', 'kael · 2.1k views',
    'nova · 1.8k views', 'hex · 956 views', 'drift · 3.2k views',
    'vale · 1.4k views', 'onyx · 2.7k views', 'sage · 1.1k views',
    'flux · 4.0k views', 'echo · 1.9k views', 'rune · 2.3k views',
  ]

  return (
    <>
      <div className="aurora" />

      {/* NAV */}
      <nav className="nav">
        <span className="nav-logo">fentanyl</span>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#profiles">Profiles</a>
          <a href="#stats">Stats</a>
          <a href="#reviews">Reviews</a>
        </div>
        <div className="nav-right">
          <Link href="/login" className="nav-login">Login</Link>
          <Link href="/signup" className="btn-primary">Create Your Link →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div>
              <h1>Elevate your identity with powerful links.</h1>
              <p>Take control of your online presence with fully customizable profiles, social links, and engagement tools. Automate the tedious tasks and focus on what matters — your audience.</p>
              <div className="hero-buttons">
                <Link href="/signup" className="btn-primary">Create Your Link</Link>
                <a href="#features" className="btn-outline">View Features</a>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-header">
                <span className="shield">✦</span>
                Protected Profile
              </div>
              <div className="hero-card-body">
                <div className="log-entry">
                  <div className="log-avatar">Z</div>
                  <span className="log-user">zj71</span>
                  <span className="log-action">set up their profile</span>
                  <span className="log-time">Today at 2:00 PM</span>
                </div>
                <div className="log-entry">
                  <div className="log-avatar">A</div>
                  <span className="log-user">ariadne</span>
                  <span className="log-action">added 3 new links</span>
                  <span className="log-time">Today at 2:01 PM</span>
                </div>
                <div className="log-entry">
                  <div className="log-avatar">K</div>
                  <span className="log-user">kael</span>
                  <span className="log-action">updated their bio</span>
                  <span className="log-time">Today at 2:03 PM</span>
                </div>
                <div className="log-entry">
                  <div className="log-avatar">N</div>
                  <span className="log-user">nova</span>
                  <span className="log-action">changed theme to midnight</span>
                  <span className="log-time">Today at 2:05 PM</span>
                </div>
                <div className="log-entry">
                  <div className="log-avatar">H</div>
                  <span className="log-user">hex</span>
                  <span className="log-action">connected Spotify</span>
                  <span className="log-time">Today at 2:07 PM</span>
                </div>
              </div>
              <div className="hero-stat">
                Powering <strong>18,417,041</strong> profiles across <strong>127,956</strong> creators
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span className="marquee-pill" key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE */}
      <section className="section" id="features">
        <div className="container">
          <p className="section-label">Why Choose fentanyl?</p>
          <h2>Why Choose fentanyl?</h2>
          <p className="section-sub">A powerful biolink platform that combines aesthetic customization with functionality, providing everything you need to showcase your online identity.</p>

          <div className="why-grid">
            {/* Big left card — music player */}
            <div className="card card-big">
              <div className="card-title">Now Playing</div>
              <div className="card-desc">Embed your favorite tracks directly on your profile for visitors to enjoy.</div>
              <div className="music-player">
                <div className="music-now">NOW PLAYING</div>
                <div className="music-track-main">
                  <div className="music-art" />
                  <div className="music-info">
                    <h4>Back to Me</h4>
                    <p>The Marías</p>
                    <div className="music-controls">
                      <span>⏮</span>
                      <div className="play-btn">▶</div>
                      <span>⏭</span>
                    </div>
                  </div>
                </div>
                <div className="music-progress">
                  <div className="music-bar"><div className="music-bar-fill" /></div>
                  <div className="music-times">
                    <span>2:14</span>
                    <span>3:45</span>
                  </div>
                </div>
                <div className="music-queue">
                  <div className="queue-item">
                    <div className="queue-art queue-art-1" />
                    <span className="queue-title">Softly</span>
                    <span className="queue-artist">· Clairo</span>
                  </div>
                  <div className="queue-item">
                    <div className="queue-art queue-art-2" />
                    <span className="queue-title">Pink + White</span>
                    <span className="queue-artist">· Frank Ocean</span>
                  </div>
                  <div className="queue-item">
                    <div className="queue-art queue-art-3" />
                    <span className="queue-title">Ivy</span>
                    <span className="queue-artist">· Frank Ocean</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top right card */}
            <div className="card">
              <div className="card-title">Advanced Customization</div>
              <div className="card-desc">Make your profile truly yours with complete control over every visual element.</div>
              <div className="sub-buttons">
                <span className="sub-btn">Background</span>
                <span className="sub-btn">Colors</span>
                <span className="sub-btn">Fonts</span>
                <span className="sub-btn">Buttons</span>
              </div>
            </div>
          </div>

          <div className="why-bottom">
            {/* View Tracking */}
            <div className="card">
              <div className="card-title">View Tracking</div>
              <div className="card-desc">Track who visits your profile. Monitor click counts and view trends.</div>
              <div className="analytics-bars">
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </div>
            </div>

            {/* Music Player */}
            <div className="card">
              <div className="card-title">Music Player</div>
              <div className="card-desc">Embed Spotify, YouTube, or SoundCloud on your profile.</div>
              <div className="card-stats">
                <div>
                  <div className="card-stat-val">1.2k</div>
                  <div className="card-stat-label">Plays</div>
                </div>
                <div>
                  <div className="card-stat-val">4</div>
                  <div className="card-stat-label">Songs</div>
                </div>
              </div>
            </div>

            {/* Username Shield */}
            <div className="card">
              <div className="card-title">Username Shield</div>
              <div className="card-desc">Invite-only with blacklist protection and admin control.</div>
              <div className="shield-stats">
                <div className="shield-stat">
                  <div className="shield-stat-main">24 New Profiles Today</div>
                  <div className="shield-stat-sub">+12% from yesterday</div>
                </div>
                <div className="shield-stat">
                  <div className="shield-stat-main">98% Approval Rate</div>
                  <div className="shield-stat-sub">Members welcomed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POWERFUL FEATURES */}
      <section className="section">
        <div className="container">
          <p className="section-label">Features</p>
          <h2>Powerful Features, Simple Interface</h2>
          <p className="section-sub">Every feature is designed to be powerful yet intuitive, giving you complete control over your profile.</p>

          <div className="features-grid-top">
            <div className="card">
              <div className="card-title">Link Manager</div>
              <div className="card-desc">Organize and manage all your important links in one place with drag-and-drop simplicity.</div>
              <div className="feature-pills">
                <span className="feature-pill">Custom URLs</span>
                <span className="feature-pill">Platform Icons</span>
                <span className="feature-pill">Reorder</span>
                <span className="feature-pill">Click Tracking</span>
              </div>
            </div>
            <div className="card">
              <div className="card-title">Appearance Editor</div>
              <div className="card-desc">Customize every visual detail of your profile with an intuitive design editor.</div>
              <div className="feature-pills">
                <span className="feature-pill">Color Picker</span>
                <span className="feature-pill">Gradient</span>
                <span className="feature-pill">Image BG</span>
                <span className="feature-pill">Animated</span>
              </div>
            </div>
            <div className="card">
              <div className="card-title">Music Player</div>
              <div className="card-desc">Add your favorite tracks to your profile with support for all major platforms.</div>
              <div className="feature-pills">
                <span className="feature-pill">Spotify Embed</span>
                <span className="feature-pill">YouTube</span>
                <span className="feature-pill">SoundCloud</span>
                <span className="feature-pill">Auto-play</span>
              </div>
            </div>
          </div>

          <div className="features-grid-bottom">
            <div className="card">
              <div className="card-title">Username Protection</div>
              <div className="card-desc">Advanced tools to protect and manage username availability across the platform.</div>
              <div className="feature-pills">
                <span className="feature-pill">Blacklist</span>
                <span className="feature-pill">Invite Gate</span>
                <span className="feature-pill">Admin Panel</span>
                <span className="feature-pill">Reserved Names</span>
              </div>
            </div>
            <div className="card">
              <div className="card-title">Profile Analytics</div>
              <div className="card-desc">Deep insights into your profile performance with real-time data visualization.</div>
              <div className="feature-pills">
                <span className="feature-pill">View Counter</span>
                <span className="feature-pill">Real-time</span>
                <span className="feature-pill">Link Clicks</span>
                <span className="feature-pill">Growth Metrics</span>
              </div>
            </div>
          </div>

          <div className="view-all">
            <a href="#features">View All Features →</a>
          </div>
        </div>
      </section>

      {/* SETTING NEW STANDARDS */}
      <section className="section" id="stats">
        <div className="container">
          <p className="section-label">Statistics</p>
          <h2>Setting New Standards</h2>
          <p className="section-sub">Experience next-level profile customization and reliability that sets us apart from the competition.</p>

          <div className="stats-grid-top">
            <div className="stat-card">
              <div className="stat-number">&lt; 2<span className="unit"> sec</span></div>
              <div className="stat-label">Instant Setup</div>
              <div className="stat-desc">From invite to live profile in seconds</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99.9<span className="unit"> %</span></div>
              <div className="stat-label">Uptime</div>
              <div className="stat-desc">Enterprise Vercel hosting always live</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10K<span className="unit">+</span></div>
              <div className="stat-label">Active Profiles</div>
              <div className="stat-desc">Creators trust fentanyl</div>
            </div>
          </div>

          <div className="stats-grid-bottom">
            <div className="stat-card">
              <div className="stat-number">100<span className="unit"> %</span></div>
              <div className="stat-label">Customizable</div>
              <div className="stat-desc">Colors, fonts, backgrounds, music, badges</div>
              <div className="stat-pills">
                <span className="feature-pill">Colors</span>
                <span className="feature-pill">Active</span>
                <span className="feature-pill">Fonts</span>
                <span className="feature-pill">24/7</span>
                <span className="feature-pill">Badges</span>
                <span className="feature-pill">0</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">30<span className="unit"> sec</span></div>
              <div className="stat-label">Average Save Time</div>
              <div className="stat-desc">Dashboard built for speed</div>
              <div className="stat-pills">
                <span className="feature-pill">Support Hours 24/7</span>
                <span className="feature-pill">Team Size 5+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANCED PROFILE INTELLIGENCE */}
      <section className="section" id="profiles">
        <div className="container">
          <p className="section-label">Intelligence</p>
          <h2>Advanced Profile Intelligence</h2>
          <p className="section-sub">Comprehensive profile monitoring that keeps you in control of your online presence.</p>

          <div className="intel-grid">
            {/* Profile Activity */}
            <div className="intel-card">
              <div className="intel-card-header">Profile Activity</div>
              <div className="intel-card-body">
                <div className="log-entry">
                  <div className="log-avatar">Z</div>
                  <span className="log-user">zj71</span>
                  <span className="log-action">updated bio</span>
                  <span className="log-time">2:14 PM</span>
                </div>
                <div className="log-entry">
                  <div className="log-avatar">A</div>
                  <span className="log-user">ariadne</span>
                  <span className="log-action">added link</span>
                  <span className="log-time">2:12 PM</span>
                </div>
                <div className="log-entry">
                  <div className="log-avatar">K</div>
                  <span className="log-user">kael</span>
                  <span className="log-action">changed theme</span>
                  <span className="log-time">2:10 PM</span>
                </div>
                <div className="log-entry">
                  <div className="log-avatar">D</div>
                  <span className="log-user">drift</span>
                  <span className="log-action">set avatar</span>
                  <span className="log-time">2:08 PM</span>
                </div>
                <div className="log-entry">
                  <div className="log-avatar">V</div>
                  <span className="log-user">vale</span>
                  <span className="log-action">joined platform</span>
                  <span className="log-time">2:05 PM</span>
                </div>
              </div>
            </div>

            {/* Profile Themes */}
            <div className="intel-card">
              <div className="intel-card-header">Profile Themes</div>
              <div className="theme-grid">
                <div className="theme-thumb theme-thumb-1">
                  <span className="theme-set-btn">Set as Theme</span>
                </div>
                <div className="theme-thumb theme-thumb-2">
                  <span className="theme-set-btn">Set as Theme</span>
                </div>
                <div className="theme-thumb theme-thumb-3">
                  <span className="theme-set-btn">Set as Theme</span>
                </div>
                <div className="theme-thumb theme-thumb-4">
                  <span className="theme-set-btn">Set as Theme</span>
                </div>
              </div>
            </div>

            {/* Username & Vanity Tracking */}
            <div className="intel-card">
              <div className="intel-card-header">Username &amp; Vanity Tracking</div>
              <div className="intel-card-body">
                <div className="alert-item">
                  <div className="alert-title">Username Alert<span className="alert-badge">NEW</span></div>
                  <div className="alert-desc">zj71 has been claimed</div>
                  <div className="alert-meta">Available in 14 days</div>
                </div>
                <div className="alert-item">
                  <div className="alert-title">Vanity Alert<span className="alert-badge">NEW</span></div>
                  <div className="alert-desc">/kael has been dropped</div>
                  <div className="alert-meta">Available Now · Invite Only</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" id="reviews">
        <div className="container">
          <p className="section-label">Reviews</p>
          <h2>Trusted by Thousands of Creators</h2>
          <p className="section-sub">See what creators are saying about their experience with fentanyl.</p>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">S</div>
                <div>
                  <div className="testimonial-name">Sam</div>
                  <div className="testimonial-role">Creator</div>
                </div>
              </div>
              <div className="testimonial-quote">
                &ldquo;I&apos;ve tried every biolink platform out there and nothing comes close to fentanyl. The customization options are insane — I can match my profile to my brand perfectly. The music player is a game changer for my audience, and the analytics help me understand exactly who&apos;s visiting. Best decision I made for my online presence.&rdquo;
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">K</div>
                <div>
                  <div className="testimonial-name">keron</div>
                  <div className="testimonial-role">Creator · 80k followers</div>
                </div>
              </div>
              <div className="testimonial-quote">
                &ldquo;The invite-only system keeps the platform exclusive and the username protection means my brand is always safe. Highly recommend for serious creators.&rdquo;
              </div>
            </div>
          </div>

          <div className="testimonials-row">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">P</div>
                <div>
                  <div className="testimonial-name">parelite</div>
                  <div className="testimonial-role">12k+ followers</div>
                </div>
              </div>
              <div className="testimonial-quote">
                &ldquo;Clean design, fast setup, great analytics. Everything I need in one link.&rdquo;
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">C</div>
                <div>
                  <div className="testimonial-name">cosints</div>
                  <div className="testimonial-role">Creator</div>
                </div>
              </div>
              <div className="testimonial-quote">
                &ldquo;Switched from Linktree and never looked back. The theme customization and embedded music player make my profile actually stand out. Plus the real-time analytics are genuinely useful.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE COUNTER */}
      <LiveCounter />

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Your Link?</h2>
          <p>Join thousands of creators who trust fentanyl for their online identity.</p>
          <div className="cta-buttons">
            <Link href="/signup" className="btn-primary">Create Your Link →</Link>
            <a href="#features" className="btn-outline">Learn More</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>fentanyl</h3>
              <p>The most powerful biolink platform for creators who demand complete control over their online identity.</p>
            </div>
            <div className="footer-col">
              <h4>Platform</h4>
              <a href="/signup">Create Profile</a>
              <a href="/login">Sign In</a>
              <a href="#features">Features</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div>
          </div>
          <div className="footer-copy">
            © 2026 fentanyl. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}
