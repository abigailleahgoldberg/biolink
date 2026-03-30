'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const PRODUCTS = [
  {
    id: 'fortnite',
    game: 'Fortnite',
    season: 'Chapter 6 · Current Season',
    status: 'undetected' as const,
    updated: '2h ago',
    users: 1482,
    desc: 'Full cheat menu for current Fortnite. Silent aimbot, player & item ESP, no recoil — one clean injection.',
    features: [
      'Silent Aimbot — bone select, FOV, smooth',
      'Player ESP — box, skeleton, health, distance',
      'Item ESP — chests, floor loot, ammo, vehicles',
      'Build ESP + Material Counter',
      'No Recoil / No Spread / No Sway',
      'Trigger Bot w/ configurable delay',
      'Radar Hack overlay',
      'HWID Spoofer included',
    ],
    tiers: [
      { label: 'Day',   price: '$8',  sub: '24 hours'  },
      { label: 'Week',  price: '$25', sub: '7 days'    },
      { label: 'Month', price: '$55', sub: '30 days'   },
    ],
  },
  {
    id: 'fortnite-og',
    game: 'Fortnite OG',
    season: 'Legacy Season · Classic Map',
    status: 'undetected' as const,
    updated: '1d ago',
    users: 634,
    desc: "Tuned for OG Fortnite's old engine. Season-accurate loot ESP, legacy bullet physics, same results.",
    features: [
      'OG-tuned Silent Aimbot',
      'Player ESP — OG character models',
      'Season-accurate Loot & Chest ESP',
      'No Recoil + Bloom Compensation',
      'Radar + Mini Map Overlay',
      'Legacy Skin Changer',
      'Low-footprint injection',
      'HWID Spoofer included',
    ],
    tiers: [
      { label: 'Day',   price: '$7',  sub: '24 hours'  },
      { label: 'Week',  price: '$22', sub: '7 days'    },
      { label: 'Month', price: '$48', sub: '30 days'   },
    ],
  },
  {
    id: 'cs2',
    game: 'Counter-Strike 2',
    season: 'CS2 · Current Build',
    status: 'undetected' as const,
    updated: '5h ago',
    users: 2109,
    desc: 'Rage and legit configs. Separate profiles, wallhack, skin changer, bunny hop. Undetected since launch.',
    features: [
      'Rage Aimbot — head lock, auto-fire, RCS',
      'Legit Aimbot — smooth, humanized, FOV',
      'Wallhack / Glow / Chams ESP',
      'Radar Hack — full map positions',
      'Bunny Hop + Auto Strafe',
      'Skin Changer — all weapon skins',
      'Knife + Glove Changer',
      'HWID Spoofer + Anti-ban layer',
    ],
    tiers: [
      { label: 'Day',   price: '$9',  sub: '24 hours'  },
      { label: 'Week',  price: '$28', sub: '7 days'    },
      { label: 'Month', price: '$60', sub: '30 days'   },
    ],
  },
]

const STATUS = {
  undetected: { label: 'Undetected', color: '#4ade80', bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.2)'  },
  testing:    { label: 'Testing',    color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
  detected:   { label: 'Detected',   color: '#f87171', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.2)'  },
}

export default function ShopPage() {
  const [tiers, setTiers] = useState<Record<string, number>>({ fortnite: 1, 'fortnite-og': 1, cs2: 1 })
  const totalUsers = PRODUCTS.reduce((a, p) => a + p.users, 0)

  return (
    <>
      {/* NAV — identical glass nav from main site */}
      <div className="cnav-host">
        <nav className="cnav">
          <Link href="/" className="cnav-logo">
            <div className="cnav-logo-mark">f</div>
            <span className="cnav-logo-text">fentanyl<em>.best</em></span>
          </Link>
          <div className="cnav-links">
            <Link href="/" className="cnav-link">Home</Link>
            <Link href="/shop" className="cnav-link" style={{ color: 'var(--light)' }}>Shop</Link>
          </div>
          <div className="cnav-actions">
            <Link href="/login"  className="cnav-signin">Sign in</Link>
            <Link href="/signup" className="cnav-cta">Get Access</Link>
          </div>
        </nav>
      </div>

      <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 80 }}>

        {/* HERO */}
        <section style={{ textAlign: 'center', padding: '72px 24px 56px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 55% at 50% 30%, rgba(163,151,221,0.1) 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(163,151,221,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(163,151,221,0.035) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent)',
          }} />

          {/* Live badge */}
          <div className="landing-badge" style={{ marginBottom: 28, position: 'relative', zIndex: 1 }}>
            <span className="landing-badge-dot" style={{ background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.6)' }} />
            {totalUsers.toLocaleString()} users active · all products undetected
          </div>

          <h1 className="landing-h1" style={{ position: 'relative', zIndex: 1 }}>
            The cheat shop<br /><em>built clean.</em>
          </h1>
          <p className="landing-p" style={{ margin: '0 auto 40px', position: 'relative', zIndex: 1 }}>
            Premium cheats for Fortnite and CS2.<br />
            No sketchy menus. No neon nonsense. Just results.
          </p>

          {/* Game jump links */}
          <div className="landing-examples" style={{ position: 'relative', zIndex: 1 }}>
            {PRODUCTS.map(p => (
              <a key={p.id} href={`#${p.id}`} className="landing-example">{p.game}</a>
            ))}
          </div>
        </section>

        {/* TRUST STRIP */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap', gap: 0,
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
          background: 'rgba(163,151,221,0.02)',
        }}>
          {['🛡️  HWID Spoofer Included', '⚡  Instant Key Delivery', '🔒  Anonymous Checkout', '🔄  Free Updates'].map((t, i, arr) => (
            <div key={t} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '13px 28px',
              borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.3px',
            }}>
              {t}
            </div>
          ))}
        </div>

        {/* PRODUCT CARDS */}
        <section style={{ maxWidth: 820, margin: '0 auto', padding: '60px 24px 80px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {PRODUCTS.map(p => {
            const st = STATUS[p.status]
            const ti = tiers[p.id] ?? 1
            const tier = p.tiers[ti]
            return (
              <div key={p.id} id={p.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>

                {/* Card header bar */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '18px 24px',
                  borderBottom: '1px solid var(--border)',
                  background: 'rgba(163,151,221,0.03)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-.4px' }}>{p.game}</span>
                      <span style={{ fontSize: 11, color: 'var(--faint)', fontWeight: 500 }}>{p.season}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* active users pill */}
                    <span style={{
                      fontSize: 11, fontWeight: 600, color: 'var(--muted)',
                      background: 'rgba(163,151,221,0.06)', border: '1px solid var(--border)',
                      padding: '4px 12px', borderRadius: 100,
                    }}>
                      {p.users.toLocaleString()} active
                    </span>
                    {/* status pill */}
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 100,
                      color: st.color, background: st.bg, border: `1px solid ${st.border}`,
                    }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%', background: st.color,
                        boxShadow: `0 0 6px ${st.color}`,
                        animation: 'bdot 2s ease-in-out infinite',
                      }} />
                      {st.label}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--faint)' }}>Updated {p.updated}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 0 }}>
                  {/* Left — description + features */}
                  <div style={{ padding: '22px 24px', borderRight: '1px solid var(--border)' }}>
                    <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 16px' }}>
                      {p.features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: 'rgba(254,254,255,0.55)', lineHeight: 1.45 }}>
                          <span style={{
                            width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 9, fontWeight: 800, marginTop: 1,
                            background: 'rgba(163,151,221,0.12)', color: 'var(--light)',
                          }}>✓</span>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right — tier picker + buy */}
                  <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--faint)' }}>
                      Select Duration
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {p.tiers.map((t, i) => (
                        <button key={t.label}
                          onClick={() => setTiers(s => ({ ...s, [p.id]: i }))}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '11px 14px', borderRadius: 10, cursor: 'pointer',
                            background: ti === i ? 'rgba(163,151,221,0.14)' : 'rgba(163,151,221,0.04)',
                            border: ti === i ? '1px solid rgba(163,151,221,0.35)' : '1px solid var(--border)',
                            color: ti === i ? 'var(--light)' : 'var(--muted)',
                            transition: 'all .15s', fontFamily: 'inherit',
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                            <span style={{ fontSize: 13, fontWeight: 700 }}>{t.label}</span>
                            <span style={{ fontSize: 10, opacity: .6 }}>{t.sub}</span>
                          </div>
                          <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-.5px' }}>{t.price}</span>
                        </button>
                      ))}
                    </div>

                    <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />

                    <button className="btn btn-primary btn-full" style={{ padding: '13px', fontSize: 14, borderRadius: 11, justifyContent: 'space-between' }}>
                      <span>Purchase {tier.sub}</span>
                      <strong style={{ fontSize: 17 }}>{tier.price}</strong>
                    </button>

                    <p style={{ fontSize: 11, color: 'var(--faint)', textAlign: 'center', lineHeight: 1.6 }}>
                      🔒 Anonymous · Key in your dashboard
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px 80px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.5px', color: '#fff', marginBottom: 20 }}>
            Common questions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { q: 'Will I get banned?', a: 'All products are currently undetected. HWID spoofer is included in every purchase. We update immediately when any detection risk appears.' },
              { q: 'How do I receive my cheat?', a: 'A license key is delivered instantly to your fentanyl.best dashboard after purchase. Download link and injection guide included.' },
              { q: 'What games are supported?', a: 'Fortnite (current season), Fortnite OG, and CS2. Warzone and Valorant are in testing and coming soon.' },
              { q: 'Refund policy?', a: 'If a product is detected within your subscription period, you get a free extension equal to the downtime. No questions asked.' },
            ].map(f => (
              <div key={f.q} className="card" style={{ padding: '20px 22px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{f.q}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 40px', borderTop: '1px solid var(--border)',
          fontSize: 12, color: 'var(--faint)',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none' }}>
            <div className="cnav-logo-mark" style={{ width: 20, height: 20, fontSize: 10 }}>f</div>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(254,254,255,0.3)' }}>
              fentanyl<em style={{ fontStyle: 'normal', color: 'rgba(163,151,221,0.5)' }}>.best</em>
            </span>
          </Link>
          <span>© 2025 fentanyl.best — Use responsibly.</span>
        </footer>
      </div>
    </>
  )
}
