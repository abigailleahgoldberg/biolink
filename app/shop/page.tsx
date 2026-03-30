'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

// ─── SVG ICON LIBRARY (hand-picked, mixed Lucide / Heroicons / Phosphor styles) ───
const Icons = {
  // Phosphor-style — shield with check
  shield: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  ),
  // Lucide — zap / instant
  zap: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  // Heroicons-style — lock closed
  lock: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  // Phosphor-style — arrows clockwise
  refresh: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  // Lucide — key
  key: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5"/>
      <path d="M21 2l-9.6 9.6"/>
      <path d="M15.5 7.5l3 3L22 7l-3-3"/>
    </svg>
  ),
  // Heroicons-style — check circle
  checkCircle: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  // Lucide — timer / clock
  clock: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  // Phosphor-style — users
  users: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  // Heroicons-style — arrow right
  arrowRight: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  // Lucide — activity / pulse
  activity: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  // Phosphor-style — question mark circle
  question: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  // Lucide — package
  package: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  // Heroicons-style — ban / slash
  ban: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
    </svg>
  ),
}

const TRUST = [
  { icon: Icons.shield,  label: 'HWID Spoofer Included'   },
  { icon: Icons.zap,     label: 'Instant Key Delivery'     },
  { icon: Icons.lock,    label: 'Anonymous Checkout'       },
  { icon: Icons.key,     label: 'License Key in Dashboard' },
  { icon: Icons.refresh, label: 'Free Updates'             },
]

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
      { label: 'Day',   price: '$8',  sub: '24 hours' },
      { label: 'Week',  price: '$25', sub: '7 days'   },
      { label: 'Month', price: '$55', sub: '30 days'  },
    ],
  },
  {
    id: 'fortnite-og',
    game: 'Fortnite OG',
    season: 'Legacy Season · Classic Map',
    status: 'undetected' as const,
    updated: '1d ago',
    users: 634,
    desc: "Tuned for OG Fortnite's old engine. Season-accurate loot ESP, legacy bullet physics, same clean results.",
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
      { label: 'Day',   price: '$7',  sub: '24 hours' },
      { label: 'Week',  price: '$22', sub: '7 days'   },
      { label: 'Month', price: '$48', sub: '30 days'  },
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
      { label: 'Day',   price: '$9',  sub: '24 hours' },
      { label: 'Week',  price: '$28', sub: '7 days'   },
      { label: 'Month', price: '$60', sub: '30 days'  },
    ],
  },
]

const STATUS = {
  undetected: { label: 'Undetected', color: '#4ade80', bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.2)'  },
  testing:    { label: 'Testing',    color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)' },
  detected:   { label: 'Detected',   color: '#f87171', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)'  },
}

const FAQ = [
  {
    icon: Icons.ban,
    q: 'Will I get banned?',
    a: 'All products are currently undetected. HWID spoofer is included in every purchase. We push updates immediately when any detection risk appears.',
  },
  {
    icon: Icons.package,
    q: 'How do I receive my cheat?',
    a: 'A license key is delivered instantly to your fentanyl.best dashboard after purchase. Download link and injection guide included.',
  },
  {
    icon: Icons.question,
    q: 'What games are supported?',
    a: 'Fortnite (current season), Fortnite OG, and CS2. Warzone and Valorant are in testing and coming soon.',
  },
  {
    icon: Icons.refresh,
    q: 'Refund policy?',
    a: 'If a product is detected during your subscription, you get a free extension equal to the downtime. No questions asked.',
  },
]

export default function ShopPage() {
  const [tiers, setTiers] = useState<Record<string, number>>({ fortnite: 1, 'fortnite-og': 1, cs2: 1 })
  const totalUsers = PRODUCTS.reduce((a, p) => a + p.users, 0)

  return (
    <>
      {/* ── NAV — exact biolink nav ── */}
      <header className="cnav-host">
        <nav className="cnav">
          <Link href="/" className="cnav-logo">
            <Image
              src="/needle-logo.png" alt="fentanyl.best" width={28} height={28}
              style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(163,151,221,0.6))' }}
            />
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
      </header>

      <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 80 }}>

        {/* ── HERO ── */}
        <section style={{ textAlign: 'center', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 75% 55% at 50% 30%, rgba(163,151,221,0.1) 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(163,151,221,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(163,151,221,0.035) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent)',
          }} />

          <div className="landing-badge" style={{ position: 'relative', zIndex: 1, marginBottom: 32 }}>
            <span className="landing-badge-dot" style={{ background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.5)' }} />
            {totalUsers.toLocaleString()} users active &nbsp;·&nbsp; all products undetected
          </div>

          <h1 className="landing-h1" style={{ position: 'relative', zIndex: 1 }}>
            The cheat shop<br /><em>built clean.</em>
          </h1>
          <p className="landing-p" style={{ margin: '0 auto 40px', position: 'relative', zIndex: 1 }}>
            Premium cheats for Fortnite and CS2.<br />
            No sketchy menus. No neon nonsense. Just results.
          </p>

          <div className="landing-examples" style={{ position: 'relative', zIndex: 1 }}>
            {PRODUCTS.map(p => (
              <a key={p.id} href={`#${p.id}`} className="landing-example">{p.game}</a>
            ))}
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap',
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
          background: 'rgba(163,151,221,0.02)',
        }}>
          {TRUST.map((t, i) => (
            <div key={t.label} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '13px 28px',
              borderRight: i < TRUST.length - 1 ? '1px solid var(--border)' : 'none',
              fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.3px',
            }}>
              <span style={{ color: 'var(--accent)', display: 'flex' }}>{t.icon}</span>
              {t.label}
            </div>
          ))}
        </div>

        {/* ── PRODUCTS ── */}
        <section style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px 80px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {PRODUCTS.map(p => {
            const st = STATUS[p.status]
            const ti = tiers[p.id] ?? 1
            const tier = p.tiers[ti]
            return (
              <div key={p.id} id={p.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>

                {/* Header bar */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 22px',
                  borderBottom: '1px solid var(--border)',
                  background: 'rgba(163,151,221,0.025)',
                  flexWrap: 'wrap', gap: 10,
                }}>
                  <div>
                    <span style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: '-.4px', marginRight: 10 }}>{p.game}</span>
                    <span style={{ fontSize: 11, color: 'var(--faint)', fontWeight: 500 }}>{p.season}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    {/* active users */}
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      fontSize: 11, fontWeight: 600, color: 'var(--muted)',
                      background: 'rgba(163,151,221,0.06)', border: '1px solid var(--border)',
                      padding: '4px 12px', borderRadius: 100,
                    }}>
                      <span style={{ color: 'var(--accent)', display: 'flex' }}>{Icons.users}</span>
                      {p.users.toLocaleString()} active
                    </span>
                    {/* status */}
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 100,
                      color: st.color, background: st.bg, border: `1px solid ${st.border}`,
                    }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%', background: st.color,
                        boxShadow: `0 0 6px ${st.color}80`,
                        animation: 'bdot 2s ease-in-out infinite',
                        flexShrink: 0,
                      }} />
                      {st.label}
                    </span>
                    {/* updated */}
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--faint)' }}>
                      <span style={{ display: 'flex', color: 'var(--faint)' }}>{Icons.clock}</span>
                      {p.updated}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px' }}>

                  {/* Left — desc + features */}
                  <div style={{ padding: '22px 24px', borderRight: '1px solid var(--border)' }}>
                    <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 20 }}>{p.desc}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 18px' }}>
                      {p.features.map(f => (
                        <div key={f} style={{
                          display: 'flex', alignItems: 'flex-start', gap: 8,
                          fontSize: 12.5, color: 'rgba(254,254,255,0.52)', lineHeight: 1.45,
                        }}>
                          <span style={{
                            width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginTop: 1,
                            background: 'rgba(163,151,221,0.1)', color: 'var(--light)',
                          }}>
                            {Icons.checkCircle}
                          </span>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right — tier + buy */}
                  <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '1.2px',
                      textTransform: 'uppercase', color: 'var(--faint)',
                      marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <span style={{ color: 'var(--accent)', display: 'flex' }}>{Icons.clock}</span>
                      Select Duration
                    </span>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
                      {p.tiers.map((t, i) => (
                        <button key={t.label}
                          onClick={() => setTiers(s => ({ ...s, [p.id]: i }))}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '11px 14px', borderRadius: 10, cursor: 'pointer',
                            background: ti === i ? 'rgba(163,151,221,0.12)' : 'rgba(163,151,221,0.03)',
                            border: ti === i ? '1px solid rgba(163,151,221,0.32)' : '1px solid var(--border)',
                            color: ti === i ? 'var(--light)' : 'var(--muted)',
                            transition: 'all .15s', fontFamily: 'inherit',
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                            <span style={{ fontSize: 13, fontWeight: 700 }}>{t.label}</span>
                            <span style={{ fontSize: 10, opacity: .55 }}>{t.sub}</span>
                          </div>
                          <span style={{ fontSize: 19, fontWeight: 900, letterSpacing: '-.5px' }}>{t.price}</span>
                        </button>
                      ))}
                    </div>

                    <div style={{ height: 1, background: 'var(--border)', marginBottom: 14 }} />

                    <button
                      className="btn btn-primary btn-full"
                      style={{ padding: '13px 16px', fontSize: 14, borderRadius: 11, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ display: 'flex', opacity: .9 }}>{Icons.zap}</span>
                        Purchase {tier.sub}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <strong style={{ fontSize: 17, fontWeight: 900 }}>{tier.price}</strong>
                        <span style={{ display: 'flex', opacity: .8 }}>{Icons.arrowRight}</span>
                      </span>
                    </button>

                    <p style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      fontSize: 11, color: 'var(--faint)', marginTop: 10, lineHeight: 1.6,
                    }}>
                      <span style={{ display: 'flex', color: 'var(--faint)' }}>{Icons.lock}</span>
                      Anonymous · Key in your dashboard
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        {/* ── FAQ ── */}
        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.5px', color: '#fff', marginBottom: 18 }}>
            Common questions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {FAQ.map(f => (
              <div key={f.q} className="card" style={{ padding: '20px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
                  <span style={{ color: 'var(--accent)', display: 'flex' }}>{f.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{f.q}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER — exact biolink footer structure ── */}
        <footer style={{
          borderTop: '1px solid var(--border)',
          padding: '28px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, flexWrap: 'wrap',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <Image
              src="/needle-logo.png" alt="" width={22} height={22}
              style={{ objectFit: 'contain', opacity: .55, filter: 'drop-shadow(0 0 4px rgba(163,151,221,0.4))' }}
            />
            <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-.3px', color: 'rgba(254,254,255,0.35)' }}>
              fentanyl<em style={{ fontStyle: 'normal', color: 'rgba(163,151,221,0.45)' }}>.best</em>
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Link href="/"      style={{ fontSize: 13, color: 'var(--faint)', textDecoration: 'none' }}>Home</Link>
            <Link href="/shop"  style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>Shop</Link>
            <Link href="/login" style={{ fontSize: 13, color: 'var(--faint)', textDecoration: 'none' }}>Sign in</Link>
          </div>

          <span style={{ fontSize: 12, color: 'var(--faint)' }}>
            © 2025 fentanyl.best
          </span>
        </footer>

      </div>
    </>
  )
}
