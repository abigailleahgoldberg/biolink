'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

type Product = {
  id: string
  game: string
  subtitle: string
  tag: string
  tagColor: string
  status: 'undetected' | 'testing' | 'detected'
  updated: string
  description: string
  features: string[]
  tiers: { label: string; price: string; duration: string }[]
  accentA: string
  accentB: string
  espColor: string
  players: number
}

const PRODUCTS: Product[] = [
  {
    id: 'fortnite',
    game: 'Fortnite',
    subtitle: 'Chapter 6 — Current Season',
    tag: '🔥 Most Popular',
    tagColor: '#C9BDFE',
    status: 'undetected',
    updated: '2 hours ago',
    description: 'Full cheat menu for current Fortnite. Silent aimbot, full ESP, and misc in one clean DLL injection. Works on all input methods.',
    accentA: '#6366f1',
    accentB: '#a855f7',
    espColor: '#a855f7',
    players: 1482,
    features: [
      'Silent Aimbot — bone select, FOV slider, smooth factor',
      'Player ESP — box, skeleton, health bar, distance',
      'Item ESP — chests, floor loot, ammo, vehicles',
      'Build ESP + Material Counter',
      'No Recoil / No Spread / No Sway',
      'Trigger Bot w/ configurable delay',
      'Radar Hack — mini map overlay',
      'Spoofer included (HWID)',
    ],
    tiers: [
      { label: 'Day',   price: '$8',  duration: '24 Hours' },
      { label: 'Week',  price: '$25', duration: '7 Days'   },
      { label: 'Month', price: '$55', duration: '30 Days'  },
    ],
  },
  {
    id: 'fortnite-og',
    game: 'Fortnite OG',
    subtitle: 'Legacy Season — Classic Map',
    tag: '⚡ Legacy Build',
    tagColor: '#fb923c',
    status: 'undetected',
    updated: '1 day ago',
    description: 'Tuned for OG Fortnite\'s old engine and classic map. Same elite features, season-accurate loot tables and legacy engine support.',
    accentA: '#f97316',
    accentB: '#eab308',
    espColor: '#f97316',
    players: 634,
    features: [
      'OG-tuned Silent Aimbot — legacy bullet physics',
      'Full Player ESP — OG character models',
      'Season-accurate Loot ESP',
      'No Recoil / Bloom Compensation',
      'Radar + Mini Map Overlay',
      'Legacy Skin Changer support',
      'Low-footprint injection method',
      'Spoofer included (HWID)',
    ],
    tiers: [
      { label: 'Day',   price: '$7',  duration: '24 Hours' },
      { label: 'Week',  price: '$22', duration: '7 Days'   },
      { label: 'Month', price: '$48', duration: '30 Days'  },
    ],
  },
  {
    id: 'cs2',
    game: 'Counter-Strike 2',
    subtitle: 'CS2 — Current Build',
    tag: '🎯 High Demand',
    tagColor: '#34d399',
    status: 'undetected',
    updated: '5 hours ago',
    description: 'Precision CS2 cheat built for rage and legit play. Separate config profiles. Undetected continuously since launch.',
    accentA: '#10b981',
    accentB: '#3b82f6',
    espColor: '#10b981',
    players: 2109,
    features: [
      'Rage Aimbot — head lock, auto-fire, RCS',
      'Legit Aimbot — smooth, humanized, FOV limited',
      'Wallhack / Glow / Chams ESP',
      'Radar Hack — full map enemy positions',
      'Bunny Hop + Auto Strafe',
      'Skin Changer — all weapon skins',
      'Knife Changer + Glove Changer',
      'Spoofer + Anti-ban layer included',
    ],
    tiers: [
      { label: 'Day',   price: '$9',  duration: '24 Hours' },
      { label: 'Week',  price: '$28', duration: '7 Days'   },
      { label: 'Month', price: '$60', duration: '30 Days'  },
    ],
  },
]

const STATUS_CONFIG = {
  undetected: { label: 'Undetected', color: '#4ade80', bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.22)' },
  testing:    { label: 'Testing',    color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.22)' },
  detected:   { label: 'Detected',   color: '#f87171', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.22)'  },
}

// Fake ESP overlay art — pure CSS/SVG, no external images needed
function EspPreview({ accentA, accentB, espColor, game }: { accentA: string; accentB: string; espColor: string; game: string }) {
  const isCS = game.includes('Counter')
  return (
    <div className="esp-preview" style={{ background: `linear-gradient(135deg, ${accentA}22 0%, ${accentB}11 100%)` }}>
      {/* Background grid */}
      <div className="esp-grid" style={{ backgroundImage: `linear-gradient(${espColor}18 1px, transparent 1px), linear-gradient(90deg, ${espColor}18 1px, transparent 1px)` }} />

      {/* Simulated enemy ESP boxes */}
      {isCS ? (
        <>
          {/* CS2 style — tighter boxes, headshot ring */}
          <div className="esp-box cs-box" style={{ border: `1.5px solid ${espColor}`, left: '18%', top: '28%', width: 38, height: 70 }}>
            <div className="esp-label" style={{ color: espColor }}>ENEMY<br /><span style={{ color: '#f87171' }}>94HP</span></div>
            <div className="esp-head-ring" style={{ border: `1.5px solid ${espColor}`, top: -14, left: '50%', transform: 'translateX(-50%)' }} />
            <div className="esp-corner tl" style={{ borderColor: espColor }} />
            <div className="esp-corner tr" style={{ borderColor: espColor }} />
            <div className="esp-corner bl" style={{ borderColor: espColor }} />
            <div className="esp-corner br" style={{ borderColor: espColor }} />
          </div>
          <div className="esp-box cs-box" style={{ border: `1.5px solid ${espColor}cc`, left: '62%', top: '22%', width: 30, height: 58 }}>
            <div className="esp-label" style={{ color: `${espColor}cc` }}>ENEMY<br /><span style={{ color: '#fbbf24' }}>61HP</span></div>
            <div className="esp-head-ring" style={{ border: `1.5px solid ${espColor}cc`, top: -12, left: '50%', transform: 'translateX(-50%)' }} />
            <div className="esp-corner tl" style={{ borderColor: `${espColor}cc` }} />
            <div className="esp-corner tr" style={{ borderColor: `${espColor}cc` }} />
            <div className="esp-corner bl" style={{ borderColor: `${espColor}cc` }} />
            <div className="esp-corner br" style={{ borderColor: `${espColor}cc` }} />
          </div>
          {/* Crosshair */}
          <div className="cs-crosshair" style={{ '--ch-color': espColor } as React.CSSProperties} />
          {/* Radar blip */}
          <div className="radar-mini" style={{ borderColor: `${espColor}44` }}>
            <div className="radar-blip" style={{ background: espColor, left: '30%', top: '40%' }} />
            <div className="radar-blip" style={{ background: espColor, left: '70%', top: '25%' }} />
            <div className="radar-blip" style={{ background: '#4ade80', left: '50%', top: '55%' }} />
          </div>
        </>
      ) : (
        <>
          {/* Fortnite style — wider boxes, build ESP */}
          <div className="esp-box fn-box" style={{ border: `1.5px solid ${espColor}`, left: '12%', top: '20%', width: 50, height: 88 }}>
            <div className="esp-label fn-label" style={{ color: espColor }}>ENEMY · 48m<br /><span style={{ color: '#f87171' }}>●●●●○ 80HP</span></div>
            <div className="esp-corner tl" style={{ borderColor: espColor }} />
            <div className="esp-corner tr" style={{ borderColor: espColor }} />
            <div className="esp-corner bl" style={{ borderColor: espColor }} />
            <div className="esp-corner br" style={{ borderColor: espColor }} />
            <div className="esp-skeleton" style={{ borderColor: `${espColor}88` }} />
          </div>
          <div className="esp-box fn-box" style={{ border: `1.5px solid ${espColor}99`, left: '65%', top: '15%', width: 38, height: 66 }}>
            <div className="esp-label fn-label" style={{ color: `${espColor}99` }}>ENEMY · 92m<br /><span style={{ color: '#fbbf24' }}>●●●○○ 60HP</span></div>
            <div className="esp-corner tl" style={{ borderColor: `${espColor}99` }} />
            <div className="esp-corner tr" style={{ borderColor: `${espColor}99` }} />
            <div className="esp-corner bl" style={{ borderColor: `${espColor}99` }} />
            <div className="esp-corner br" style={{ borderColor: `${espColor}99` }} />
          </div>
          {/* Chest ESP */}
          <div className="fn-chest" style={{ borderColor: '#fbbf24', left: '42%', top: '62%' }}>
            <span style={{ fontSize: 9, color: '#fbbf24', fontWeight: 700 }}>CHEST</span>
          </div>
          <div className="fn-chest" style={{ borderColor: '#fbbf24aa', left: '75%', top: '55%' }}>
            <span style={{ fontSize: 9, color: '#fbbf24aa', fontWeight: 700 }}>CHEST</span>
          </div>
          {/* Aimbot FOV circle */}
          <div className="fn-fov" style={{ borderColor: `${espColor}66` }} />
        </>
      )}

      {/* HUD top bar */}
      <div className="esp-hud-bar" style={{ borderBottomColor: `${espColor}33` }}>
        <span className="esp-hud-tag" style={{ color: espColor, background: `${espColor}18`, borderColor: `${espColor}33` }}>
          fentanyl.best
        </span>
        <span className="esp-hud-stat" style={{ color: espColor }}>
          ● INJECTED
        </span>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const [selected, setSelected] = useState<{ [id: string]: number }>({ fortnite: 1, 'fortnite-og': 1, cs2: 1 })

  return (
    <div className="shop-page">
      {/* ── NAV ── */}
      <header className="shop-nav-host">
        <nav className="shop-nav">
          <Link href="/" className="shop-nav-logo">
            <Image src="/needle-logo.png" alt="" width={22} height={22}
              style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 5px rgba(163,151,221,0.5))' }} />
            <span>fentanyl<em>.best</em></span>
          </Link>
          <div className="shop-nav-links">
            <Link href="/" className="shop-nav-link">Home</Link>
            <Link href="/shop" className="shop-nav-link active">Shop</Link>
          </div>
          <div className="shop-nav-actions">
            <Link href="/login" className="shop-nav-signin">Sign in</Link>
            <Link href="/signup" className="shop-nav-cta">Get Access</Link>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="shop-hero">
        <div className="shop-hero-bg" />
        <div className="shop-hero-grid" />

        <div className="hero-live-bar">
          <span className="hero-live-dot" />
          <span className="hero-live-txt">
            {(PRODUCTS.reduce((a, p) => a + p.players, 0)).toLocaleString()} users currently active
          </span>
          <span className="hero-live-sep">·</span>
          <span className="hero-live-txt">All products undetected</span>
        </div>

        <h1 className="shop-h1">
          Cheat shop.<br />
          <em>Built different.</em>
        </h1>
        <p className="shop-p">
          Premium cheats for Fortnite and CS2. No sketchy menus, no 2009 UIs.<br />
          Clean injection. Clean interface. Clean wins.
        </p>

        <div className="hero-games">
          {PRODUCTS.map(p => (
            <a key={p.id} href={`#${p.id}`} className="hero-game-pill" style={{ '--pa': p.accentA, '--pb': p.accentB } as React.CSSProperties}>
              {p.game}
            </a>
          ))}
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="trust-bar">
        {[
          { icon: '🛡️', label: 'HWID Spoofer Included' },
          { icon: '⚡', label: 'Instant Delivery' },
          { icon: '🔒', label: 'Anonymous Checkout' },
          { icon: '📦', label: 'License Key via Dashboard' },
          { icon: '🔄', label: 'Free Updates' },
        ].map(t => (
          <div key={t.label} className="trust-item">
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </div>
        ))}
      </div>

      {/* ── PRODUCT CARDS ── */}
      <section className="shop-cards-section">
        {PRODUCTS.map(p => {
          const st = STATUS_CONFIG[p.status]
          const tierIdx = selected[p.id] ?? 1
          const tier = p.tiers[tierIdx]
          return (
            <article key={p.id} id={p.id} className="shop-card">
              {/* Visual preview panel */}
              <div className="shop-card-visual">
                <EspPreview accentA={p.accentA} accentB={p.accentB} espColor={p.espColor} game={p.game} />
                <div className="shop-card-visual-footer">
                  <span className="shop-status" style={{ color: st.color, background: st.bg, border: `1px solid ${st.border}` }}>
                    <span className="shop-status-dot" style={{ background: st.color }} />{st.label}
                  </span>
                  <span className="shop-updated">Updated {p.updated}</span>
                </div>
              </div>

              {/* Info panel */}
              <div className="shop-card-info">
                <div className="shop-card-head">
                  <div>
                    <div className="shop-card-title">{p.game}</div>
                    <div className="shop-card-subtitle">{p.subtitle}</div>
                  </div>
                  <span className="shop-tag" style={{ color: p.tagColor, borderColor: `${p.tagColor}44`, background: `${p.tagColor}15` }}>
                    {p.tag}
                  </span>
                </div>

                <p className="shop-card-desc">{p.description}</p>

                <div className="shop-active-users">
                  <span className="shop-active-dot" style={{ background: p.accentA }} />
                  <span style={{ color: 'rgba(254,254,255,0.5)', fontSize: 12 }}>
                    <strong style={{ color: p.tagColor }}>{p.players.toLocaleString()}</strong> users running this cheat right now
                  </span>
                </div>

                <div className="features-grid">
                  {p.features.map(f => (
                    <div key={f} className="feature-item">
                      <span className="feature-check" style={{ background: `${p.accentA}22`, color: p.accentA }}>✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="shop-divider" />

                {/* Tier selector */}
                <div className="tier-label">Select Duration</div>
                <div className="shop-tiers">
                  {p.tiers.map((t, i) => (
                    <button
                      key={t.label}
                      className={`shop-tier-btn ${tierIdx === i ? 'active' : ''}`}
                      style={tierIdx === i ? { borderColor: p.accentA, background: `${p.accentA}22`, color: '#fff' } : {}}
                      onClick={() => setSelected(s => ({ ...s, [p.id]: i }))}
                    >
                      <span className="tier-dur">{t.duration}</span>
                      <span className="tier-price">{t.price}</span>
                    </button>
                  ))}
                </div>

                <button className="shop-buy-btn" style={{ background: `linear-gradient(135deg, ${p.accentA}, ${p.accentB})` }}>
                  <span>Purchase {tier.duration}</span>
                  <strong>{tier.price}</strong>
                </button>

                <div className="shop-card-footer-note">
                  🔒 Anonymous checkout · License key delivered instantly to your dashboard
                </div>
              </div>
            </article>
          )
        })}
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <h2 className="faq-title">Common Questions</h2>
        <div className="faq-grid">
          {[
            { q: 'Will I get banned?', a: 'All cheats are currently undetected. We update immediately when any detection risk is identified. HWID spoofer is included in every purchase.' },
            { q: 'How do I get my cheat?', a: 'After purchase, a license key is delivered directly to your fentanyl.best dashboard. Download link and injection guide included.' },
            { q: 'What games are supported?', a: 'Currently Fortnite (current season), Fortnite OG, and CS2. More titles coming soon — Warzone, Rust, and Valorant in testing.' },
            { q: 'Do you offer refunds?', a: 'If a cheat is detected within your subscription period, you get a free extension equal to the downtime. No questions asked.' },
          ].map(f => (
            <div key={f.q} className="faq-card">
              <div className="faq-q">{f.q}</div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="shop-footer">
        <Link href="/" className="shop-nav-logo" style={{ textDecoration: 'none' }}>
          <Image src="/needle-logo.png" alt="" width={18} height={18} style={{ objectFit: 'contain', opacity: 0.6 }} />
          <span style={{ fontSize: 13, color: 'rgba(254,254,255,0.3)', fontWeight: 700 }}>fentanyl<em style={{ fontStyle: 'normal', color: 'rgba(163,151,221,0.5)' }}>.best</em></span>
        </Link>
        <span style={{ fontSize: 12, color: 'rgba(254,254,255,0.2)' }}>© 2025 fentanyl.best — Use responsibly.</span>
      </footer>

      <style>{`
        .shop-page {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── NAV ── */
        .shop-nav-host {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; justify-content: center;
          padding: 12px 24px 0; pointer-events: none;
        }
        .shop-nav {
          pointer-events: auto;
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; max-width: 1000px; padding: 8px 10px 8px 14px;
          border-radius: 16px;
          background: rgba(7,6,15,0.72); backdrop-filter: blur(28px) saturate(160%);
          border: 1px solid var(--border); border-top-color: rgba(163,151,221,0.2);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,189,254,0.06);
        }
        .shop-nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
        .shop-nav-logo span { font-size: 14px; font-weight: 800; letter-spacing: -.4px; color: #FEFEFF; }
        .shop-nav-logo em { font-style: normal; color: var(--light); }
        .shop-nav-links { display: flex; gap: 2px; }
        .shop-nav-link { font-size: 13px; font-weight: 500; color: var(--muted); padding: 6px 12px; border-radius: 8px; transition: all .15s; text-decoration: none; }
        .shop-nav-link:hover, .shop-nav-link.active { color: var(--light); background: rgba(163,151,221,0.08); }
        .shop-nav-actions { display: flex; gap: 6px; align-items: center; }
        .shop-nav-signin { font-size: 13px; font-weight: 500; color: var(--muted); padding: 6px 12px; border-radius: 8px; text-decoration: none; transition: color .15s; }
        .shop-nav-signin:hover { color: var(--light); }
        .shop-nav-cta { font-size: 13px; font-weight: 600; color: #fff; padding: 6px 16px; border-radius: 9px; background: rgba(163,151,221,0.2); border: 1px solid var(--bdr2); transition: all .18s; text-decoration: none; }
        .shop-nav-cta:hover { background: rgba(163,151,221,0.3); }

        /* ── HERO ── */
        .shop-hero {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 148px 32px 64px; position: relative; overflow: hidden;
        }
        .shop-hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 80% 60% at 50% 35%, rgba(163,151,221,0.1) 0%, transparent 65%);
        }
        .shop-hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(163,151,221,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(163,151,221,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent);
        }
        .hero-live-bar {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 28px;
          font-size: 12px; font-weight: 600; color: var(--mid);
          background: rgba(163,151,221,0.07); border: 1px solid rgba(163,151,221,0.18);
          padding: 7px 18px; border-radius: 100px; position: relative; z-index: 1;
        }
        .hero-live-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
          box-shadow: 0 0 8px rgba(74,222,128,0.7);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(0.8)} }
        .hero-live-txt { color: rgba(254,254,255,0.55); }
        .hero-live-sep { color: rgba(163,151,221,0.3); }
        .shop-h1 {
          font-size: clamp(52px, 8.5vw, 100px); font-weight: 900;
          letter-spacing: -4px; line-height: .92; margin-bottom: 22px;
          color: var(--text); position: relative; z-index: 1;
        }
        .shop-h1 em {
          font-style: normal;
          background: linear-gradient(135deg, var(--accent) 0%, var(--light) 50%, var(--mid) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .shop-p {
          font-size: 16px; color: var(--muted); font-weight: 300; line-height: 1.75;
          max-width: 500px; margin-bottom: 32px; position: relative; z-index: 1;
        }
        .hero-games {
          display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
          position: relative; z-index: 1;
        }
        .hero-game-pill {
          font-size: 13px; font-weight: 600; padding: 8px 20px; border-radius: 100px;
          background: linear-gradient(135deg, var(--pa), var(--pb));
          color: #fff; text-decoration: none; opacity: .85;
          transition: opacity .2s, transform .2s;
        }
        .hero-game-pill:hover { opacity: 1; transform: translateY(-2px); }

        /* ── TRUST BAR ── */
        .trust-bar {
          display: flex; align-items: center; justify-content: center; gap: 0;
          border-top: 1px solid rgba(163,151,221,0.08);
          border-bottom: 1px solid rgba(163,151,221,0.08);
          padding: 14px 24px; flex-wrap: wrap;
          background: rgba(163,151,221,0.02);
        }
        .trust-item {
          display: flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 600; color: rgba(254,254,255,0.45);
          letter-spacing: .3px; padding: 6px 20px;
          border-right: 1px solid rgba(163,151,221,0.1);
        }
        .trust-item:last-child { border-right: none; }

        /* ── PRODUCT CARDS ── */
        .shop-cards-section {
          display: flex; flex-direction: column; gap: 32px;
          padding: 56px 24px 80px; max-width: 1060px; margin: 0 auto;
        }
        .shop-card {
          display: grid; grid-template-columns: 420px 1fr; gap: 0;
          background: rgba(14,12,26,0.85); border: 1px solid rgba(163,151,221,0.14);
          border-radius: 20px; overflow: hidden;
          transition: border-color .25s, box-shadow .25s, transform .25s;
          backdrop-filter: blur(12px);
        }
        .shop-card:hover {
          border-color: rgba(163,151,221,0.28);
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
          transform: translateY(-2px);
        }
        .shop-card:nth-child(even) { grid-template-columns: 1fr 420px; }
        .shop-card:nth-child(even) .shop-card-visual { order: 2; }
        .shop-card:nth-child(even) .shop-card-info { order: 1; }

        /* ESP PREVIEW */
        .shop-card-visual {
          position: relative; display: flex; flex-direction: column;
          border-right: 1px solid rgba(163,151,221,0.1);
        }
        .shop-card:nth-child(even) .shop-card-visual {
          border-right: none; border-left: 1px solid rgba(163,151,221,0.1);
        }
        .esp-preview {
          flex: 1; position: relative; overflow: hidden; min-height: 280px;
        }
        .esp-grid {
          position: absolute; inset: 0;
          background-size: 32px 32px;
          opacity: .6;
        }
        .esp-box {
          position: absolute; border-radius: 2px;
        }
        .esp-label {
          position: absolute; top: -38px; left: 0; font-size: 9px; font-weight: 700;
          white-space: nowrap; line-height: 1.5; letter-spacing: .3px;
        }
        .fn-label { top: -44px; }
        .esp-head-ring {
          position: absolute; width: 18px; height: 18px; border-radius: 50%;
        }
        .esp-corner {
          position: absolute; width: 8px; height: 8px; border-style: solid; border-color: transparent;
        }
        .esp-corner.tl { top: -1px; left: -1px; border-top-width: 2px; border-left-width: 2px; }
        .esp-corner.tr { top: -1px; right: -1px; border-top-width: 2px; border-right-width: 2px; }
        .esp-corner.bl { bottom: -1px; left: -1px; border-bottom-width: 2px; border-left-width: 2px; }
        .esp-corner.br { bottom: -1px; right: -1px; border-bottom-width: 2px; border-right-width: 2px; }
        .esp-skeleton {
          position: absolute; inset: 10px 40%; border-left: 1px solid;
        }
        .cs-crosshair {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 20px; height: 20px;
        }
        .cs-crosshair::before, .cs-crosshair::after {
          content: ''; position: absolute; background: var(--ch-color);
        }
        .cs-crosshair::before { width: 8px; height: 1.5px; top: 50%; left: 0; transform: translateY(-50%); box-shadow: 12px 0 0 var(--ch-color); }
        .cs-crosshair::after  { height: 8px; width: 1.5px; left: 50%; top: 0; transform: translateX(-50%); box-shadow: 0 12px 0 var(--ch-color); }
        .radar-mini {
          position: absolute; bottom: 14px; right: 14px;
          width: 52px; height: 52px; border-radius: 50%; border: 1px solid;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
        }
        .radar-blip {
          position: absolute; width: 5px; height: 5px; border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .fn-chest {
          position: absolute; border: 1px solid; border-radius: 3px;
          padding: 2px 6px; background: rgba(0,0,0,0.4);
        }
        .fn-fov {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 120px; height: 120px; border-radius: 50%; border: 1px dashed;
          pointer-events: none;
        }
        .esp-hud-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 8px 12px; border-bottom: 1px solid;
          background: rgba(0,0,0,0.45); backdrop-filter: blur(8px);
          position: absolute; top: 0; left: 0; right: 0;
        }
        .esp-hud-tag {
          font-size: 9px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;
          padding: 2px 8px; border-radius: 4px; border: 1px solid;
        }
        .esp-hud-stat { font-size: 9px; font-weight: 700; letter-spacing: 1px; }
        .shop-card-visual-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 14px;
          background: rgba(0,0,0,0.35); border-top: 1px solid rgba(163,151,221,0.08);
        }
        .shop-status {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 100px;
        }
        .shop-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        .shop-updated { font-size: 11px; color: rgba(254,254,255,0.3); }

        /* INFO PANEL */
        .shop-card-info { padding: 28px 32px; display: flex; flex-direction: column; gap: 0; }
        .shop-card-head {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 10px; gap: 12px;
        }
        .shop-card-title { font-size: 24px; font-weight: 900; letter-spacing: -.6px; color: #fff; margin-bottom: 3px; }
        .shop-card-subtitle { font-size: 12px; color: rgba(254,254,255,0.35); font-weight: 500; }
        .shop-tag {
          font-size: 11px; font-weight: 700; letter-spacing: .5px;
          padding: 5px 12px; border-radius: 100px; border: 1px solid;
          white-space: nowrap; flex-shrink: 0;
        }
        .shop-card-desc { font-size: 13.5px; color: var(--muted); line-height: 1.7; margin-bottom: 14px; }
        .shop-active-users {
          display: flex; align-items: center; gap: 8px; margin-bottom: 18px;
        }
        .shop-active-dot { width: 6px; height: 6px; border-radius: 50%; animation: pulse 2s ease-in-out infinite; flex-shrink: 0; }

        /* FEATURES */
        .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 22px; }
        .feature-item { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: rgba(254,254,255,0.55); line-height: 1.4; }
        .feature-check { width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 800; margin-top: 1px; }

        .shop-divider { height: 1px; background: rgba(163,151,221,0.08); margin-bottom: 18px; }
        .tier-label { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: rgba(254,254,255,0.35); margin-bottom: 10px; }

        /* TIERS */
        .shop-tiers { display: flex; gap: 8px; margin-bottom: 14px; }
        .shop-tier-btn {
          flex: 1; padding: 12px 8px; border-radius: 11px;
          background: rgba(163,151,221,0.04); border: 1px solid rgba(163,151,221,0.1);
          color: var(--muted); cursor: pointer; transition: all .15s;
          display: flex; flex-direction: column; align-items: center; gap: 4px;
        }
        .shop-tier-btn:hover { background: rgba(163,151,221,0.09); color: var(--text); }
        .tier-dur { font-size: 11px; font-weight: 600; }
        .tier-price { font-size: 18px; font-weight: 900; letter-spacing: -.5px; }

        /* BUY */
        .shop-buy-btn {
          width: 100%; padding: 15px; border-radius: 12px; border: none; cursor: pointer;
          font-size: 15px; font-weight: 700; color: #fff;
          box-shadow: 0 8px 28px rgba(0,0,0,0.35);
          transition: all .2s; display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 10px;
        }
        .shop-buy-btn:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 14px 40px rgba(0,0,0,0.4); }
        .shop-buy-btn strong { font-size: 20px; font-weight: 900; }
        .shop-card-footer-note { font-size: 11px; color: rgba(254,254,255,0.28); text-align: center; }

        /* ── FAQ ── */
        .faq-section { max-width: 900px; margin: 0 auto; padding: 0 24px 80px; }
        .faq-title {
          font-size: 28px; font-weight: 900; letter-spacing: -.6px;
          color: #fff; text-align: center; margin-bottom: 32px;
        }
        .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .faq-card {
          background: rgba(14,12,26,0.8); border: 1px solid rgba(163,151,221,0.1);
          border-radius: 14px; padding: 22px 24px;
        }
        .faq-q { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .faq-a { font-size: 13px; color: var(--muted); line-height: 1.7; }

        /* ── FOOTER ── */
        .shop-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 40px; border-top: 1px solid rgba(163,151,221,0.07);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 860px) {
          .shop-card, .shop-card:nth-child(even) {
            grid-template-columns: 1fr;
          }
          .shop-card:nth-child(even) .shop-card-visual,
          .shop-card:nth-child(even) .shop-card-info { order: unset; }
          .shop-card:nth-child(even) .shop-card-visual { border-left: none; border-bottom: 1px solid rgba(163,151,221,0.1); }
          .shop-card-visual { border-right: none; border-bottom: 1px solid rgba(163,151,221,0.1); }
          .faq-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
          .trust-item { border-right: none; }
        }
        @media (max-width: 600px) {
          .shop-nav-links, .shop-nav-signin { display: none; }
          .shop-h1 { letter-spacing: -2.5px; }
          .shop-card-info { padding: 20px 18px; }
          .shop-footer { flex-direction: column; gap: 8px; padding: 18px; }
        }
      `}</style>
    </div>
  )
}
