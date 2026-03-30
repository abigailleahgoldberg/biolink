'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

type Product = {
  id: string
  game: string
  tag: string
  tagColor: string
  status: 'undetected' | 'testing' | 'detected'
  updated: string
  description: string
  features: string[]
  tiers: { label: string; price: string; duration: string }[]
  emoji: string
}

const PRODUCTS: Product[] = [
  {
    id: 'fortnite',
    game: 'Fortnite',
    tag: 'Most Popular',
    tagColor: '#C9BDFE',
    status: 'undetected',
    updated: '2 hours ago',
    description: 'Full-featured cheat menu for current Fortnite. Aimbot, ESP, and misc all in one clean injection.',
    emoji: '⚡',
    features: [
      'Silent Aimbot (bone select, FOV, smoothing)',
      'Player ESP (box, skeleton, distance, health)',
      'Item ESP (floor loot, chests, ammo)',
      'No Recoil / No Spread',
      'Build ESP + Material Counter',
      'Trigger Bot with delay config',
      'Radar Hack (customizable)',
      'Spoofer included',
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
    tag: 'Legacy Build',
    tagColor: '#fb923c',
    status: 'undetected',
    updated: '1 day ago',
    description: 'Built for classic OG Fortnite seasons. Tuned for the old map, old engine, same clean results.',
    emoji: '🔥',
    features: [
      'OG-tuned Silent Aimbot',
      'Full Player + Item ESP',
      'No Recoil / No Spread',
      'Bloom Compensation',
      'Season-accurate loot ESP',
      'Radar + Mini Map overlay',
      'Legacy skin changer support',
      'Spoofer included',
    ],
    tiers: [
      { label: 'Day',   price: '$7',  duration: '24 Hours' },
      { label: 'Week',  price: '$22', duration: '7 Days'   },
      { label: 'Month', price: '$48', duration: '30 Days'  },
    ],
  },
  {
    id: 'cs2',
    game: 'CS2',
    tag: 'High Demand',
    tagColor: '#34d399',
    status: 'undetected',
    updated: '5 hours ago',
    description: 'Precision CS2 cheat built for both rage and legit play. Undetected since launch.',
    emoji: '🎯',
    features: [
      'Rage / Legit Aimbot (separate configs)',
      'RCS (Recoil Control System)',
      'Wallhack / Glow ESP',
      'Radar Hack',
      'Bunny Hop + Auto Strafe',
      'Skin Changer (all skins)',
      'Knife Changer',
      'Spoofer + Anti-ban layer',
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

export default function ShopPage() {
  const [selected, setSelected] = useState<{ [id: string]: number }>({
    fortnite: 1,
    'fortnite-og': 1,
    cs2: 1,
  })

  function selectTier(productId: string, tierIdx: number) {
    setSelected(s => ({ ...s, [productId]: tierIdx }))
  }

  return (
    <div className="shop-page">
      {/* ── NAV ── */}
      <header className="shop-nav-host">
        <nav className="shop-nav">
          <Link href="/" className="shop-nav-logo">
            <Image src="/needle-logo.png" alt="" width={24} height={24}
              style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 5px rgba(163,151,221,0.5))' }} />
            <span>fentanyl<em>.best</em></span>
          </Link>
          <div className="shop-nav-links">
            <Link href="/" className="shop-nav-link">Home</Link>
            <Link href="/shop" className="shop-nav-link active">Shop</Link>
          </div>
          <div className="shop-nav-actions">
            <Link href="/login" className="shop-nav-signin">Sign in</Link>
            <Link href="/signup" className="shop-nav-cta">Get Started</Link>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="shop-hero">
        <div className="shop-hero-bg" />
        <div className="shop-hero-grid" />
        <span className="shop-badge">
          <span className="shop-badge-dot" />
          All cheats currently undetected
        </span>
        <h1 className="shop-h1">
          The <em>cleanest</em><br />cheat shop.
        </h1>
        <p className="shop-p">
          Premium cheats for the games that matter.<br />
          No sketchy sites. No broken menus. Just results.
        </p>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="shop-grid-section">
        <div className="shop-grid">
          {PRODUCTS.map(p => {
            const st = STATUS_CONFIG[p.status]
            const tierIdx = selected[p.id] ?? 1
            const tier = p.tiers[tierIdx]
            return (
              <article key={p.id} className="shop-card">
                {/* Card header */}
                <div className="shop-card-top">
                  <div className="shop-card-game">
                    <span className="shop-card-emoji">{p.emoji}</span>
                    <div>
                      <div className="shop-card-title">{p.game}</div>
                      <span className="shop-tag" style={{ color: p.tagColor, borderColor: `${p.tagColor}33`, background: `${p.tagColor}11` }}>
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <div className="shop-status" style={{ color: st.color, background: st.bg, border: `1px solid ${st.border}` }}>
                    <span className="shop-status-dot" style={{ background: st.color }} />
                    {st.label}
                  </div>
                </div>

                <p className="shop-card-desc">{p.description}</p>

                {/* Features */}
                <ul className="shop-features">
                  {p.features.map(f => (
                    <li key={f} className="shop-feature">
                      <span className="shop-feature-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Updated */}
                <div className="shop-updated">
                  <span className="shop-updated-dot" />
                  Updated {p.updated}
                </div>

                {/* Tier picker */}
                <div className="shop-tiers">
                  {p.tiers.map((t, i) => (
                    <button
                      key={t.label}
                      className={`shop-tier-btn ${tierIdx === i ? 'active' : ''}`}
                      onClick={() => selectTier(p.id, i)}
                    >
                      <span className="shop-tier-label">{t.label}</span>
                      <span className="shop-tier-dur">{t.duration}</span>
                    </button>
                  ))}
                </div>

                {/* Buy */}
                <button className="shop-buy-btn">
                  Purchase for <strong>{tier.price}</strong>
                </button>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="shop-footer">
        <span>© 2025 fentanyl.best — All rights reserved.</span>
        <span>Use responsibly.</span>
      </footer>

      <style>{`
        .shop-page {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* NAV */
        .shop-nav-host {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; justify-content: center;
          padding: 12px 24px 0;
          pointer-events: none;
        }
        .shop-nav {
          pointer-events: auto;
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; max-width: 900px;
          padding: 8px 10px 8px 14px;
          border-radius: 16px;
          background: rgba(7,6,15,0.65);
          backdrop-filter: blur(28px) saturate(160%);
          border: 1px solid var(--border);
          border-top-color: rgba(163,151,221,0.2);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,189,254,0.06);
        }
        .shop-nav-logo {
          display: flex; align-items: center; gap: 8px; text-decoration: none;
        }
        .shop-nav-logo span { font-size: 14px; font-weight: 800; letter-spacing: -.4px; color: #FEFEFF; }
        .shop-nav-logo em  { font-style: normal; color: var(--light); }
        .shop-nav-links { display: flex; align-items: center; gap: 2px; }
        .shop-nav-link {
          font-size: 13px; font-weight: 500; color: var(--muted);
          padding: 6px 12px; border-radius: 8px; transition: color .15s, background .15s;
          text-decoration: none;
        }
        .shop-nav-link:hover, .shop-nav-link.active { color: var(--light); background: rgba(163,151,221,0.08); }
        .shop-nav-actions { display: flex; align-items: center; gap: 6px; }
        .shop-nav-signin { font-size: 13px; font-weight: 500; color: var(--muted); padding: 6px 12px; border-radius: 8px; transition: color .15s; text-decoration: none; }
        .shop-nav-signin:hover { color: var(--light); }
        .shop-nav-cta {
          font-size: 13px; font-weight: 600; color: var(--text);
          padding: 6px 16px; border-radius: 9px;
          background: rgba(163,151,221,0.18); border: 1px solid var(--bdr2);
          transition: all .18s; text-decoration: none;
        }
        .shop-nav-cta:hover { background: rgba(163,151,221,0.28); border-color: rgba(201,189,254,0.45); }

        /* HERO */
        .shop-hero {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 140px 32px 72px;
          position: relative; overflow: hidden;
        }
        .shop-hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 80% 60% at 50% 35%, rgba(163,151,221,0.11) 0%, transparent 65%);
        }
        .shop-hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(163,151,221,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163,151,221,0.035) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent);
        }
        .shop-badge {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 28px;
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--mid);
          background: rgba(163,151,221,0.08); border: 1px solid rgba(163,151,221,0.2);
          padding: 6px 16px; border-radius: 100px; position: relative; z-index: 1;
        }
        .shop-badge-dot {
          width: 5px; height: 5px; border-radius: 50%; background: #4ade80;
          animation: bdot 2s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(74,222,128,0.6);
        }
        @keyframes bdot { 0%,100%{opacity:1} 50%{opacity:.3} }
        .shop-h1 {
          font-size: clamp(48px, 8vw, 96px); font-weight: 900;
          letter-spacing: -4px; line-height: .93; margin-bottom: 20px;
          color: var(--text); position: relative; z-index: 1;
        }
        .shop-h1 em {
          font-style: normal;
          background: linear-gradient(135deg, var(--accent) 0%, var(--light) 50%, var(--mid) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .shop-p {
          font-size: 16px; color: var(--muted); font-weight: 300; line-height: 1.75;
          max-width: 440px; margin-bottom: 0; position: relative; z-index: 1;
        }

        /* GRID */
        .shop-grid-section { padding: 0 24px 80px; max-width: 1100px; margin: 0 auto; }
        .shop-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
        }

        /* CARD */
        .shop-card {
          background: rgba(18,15,34,0.75);
          border: 1px solid rgba(163,151,221,0.13);
          border-radius: 18px; padding: 24px;
          backdrop-filter: blur(12px);
          display: flex; flex-direction: column; gap: 0;
          transition: border-color .2s, transform .2s, box-shadow .2s;
        }
        .shop-card:hover {
          border-color: rgba(163,151,221,0.28);
          transform: translateY(-3px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.45);
        }

        .shop-card-top {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 14px; gap: 10px;
        }
        .shop-card-game { display: flex; align-items: center; gap: 12px; }
        .shop-card-emoji {
          width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; font-size: 22px;
          background: rgba(163,151,221,0.08); border: 1px solid rgba(163,151,221,0.14);
        }
        .shop-card-title { font-size: 17px; font-weight: 800; color: #FEFEFF; letter-spacing: -.3px; margin-bottom: 4px; }
        .shop-tag {
          display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: .8px;
          text-transform: uppercase; padding: 3px 9px; border-radius: 100px; border: 1px solid;
        }

        .shop-status {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: .5px;
          padding: 5px 10px; border-radius: 100px; white-space: nowrap; flex-shrink: 0;
        }
        .shop-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          animation: bdot 2s ease-in-out infinite;
        }

        .shop-card-desc {
          font-size: 13px; color: var(--muted); line-height: 1.65;
          margin-bottom: 18px;
        }

        /* FEATURES */
        .shop-features {
          list-style: none; margin: 0 0 16px; padding: 0;
          display: flex; flex-direction: column; gap: 6px;
          flex: 1;
        }
        .shop-feature {
          display: flex; align-items: center; gap: 9px;
          font-size: 12.5px; color: rgba(254,254,255,0.6); line-height: 1.4;
        }
        .shop-feature-check {
          width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 800;
          background: rgba(163,151,221,0.12); color: var(--light);
        }

        /* UPDATED */
        .shop-updated {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; color: var(--faint); margin-bottom: 18px;
        }
        .shop-updated-dot {
          width: 5px; height: 5px; border-radius: 50%; background: rgba(163,151,221,0.4);
        }

        /* TIERS */
        .shop-tiers {
          display: flex; gap: 8px; margin-bottom: 14px;
        }
        .shop-tier-btn {
          flex: 1; padding: 9px 6px; border-radius: 10px;
          background: rgba(163,151,221,0.05); border: 1px solid rgba(163,151,221,0.12);
          color: var(--muted); cursor: pointer; transition: all .15s;
          display: flex; flex-direction: column; align-items: center; gap: 2px;
        }
        .shop-tier-btn:hover { background: rgba(163,151,221,0.1); border-color: rgba(163,151,221,0.22); color: var(--text); }
        .shop-tier-btn.active {
          background: rgba(163,151,221,0.15); border-color: rgba(163,151,221,0.35);
          color: var(--light);
          box-shadow: 0 0 0 1px rgba(163,151,221,0.2);
        }
        .shop-tier-label { font-size: 13px; font-weight: 700; }
        .shop-tier-dur   { font-size: 10px; opacity: .65; }

        /* BUY */
        .shop-buy-btn {
          width: 100%; padding: 13px;
          border-radius: 11px; border: none; cursor: pointer;
          font-size: 14px; font-weight: 600; color: #fff;
          background: linear-gradient(135deg, var(--deep), var(--accent));
          box-shadow: 0 6px 24px rgba(163,151,221,0.3);
          transition: all .2s;
        }
        .shop-buy-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 32px rgba(163,151,221,0.45);
        }
        .shop-buy-btn strong { font-weight: 800; }

        /* FOOTER */
        .shop-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 40px; border-top: 1px solid rgba(163,151,221,0.08);
          font-size: 12px; color: var(--faint);
        }

        @media (max-width: 900px) { .shop-grid { grid-template-columns: 1fr; } }
        @media (max-width: 600px) {
          .shop-nav-links, .shop-nav-signin { display: none; }
          .shop-hero { padding: 110px 20px 60px; }
          .shop-h1 { letter-spacing: -2.5px; }
          .shop-footer { flex-direction: column; gap: 8px; text-align: center; padding: 20px; }
        }
      `}</style>
    </div>
  )
}
