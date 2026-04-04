'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icons = {
  shield: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  ),
  zap: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  lock: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  refresh: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  key: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5"/>
      <path d="M21 2l-9.6 9.6"/>
      <path d="M15.5 7.5l3 3L22 7l-3-3"/>
    </svg>
  ),
  checkCircle: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  clock: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  users: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  arrowRight: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  arrowDown: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <polyline points="19 12 12 19 5 12"/>
    </svg>
  ),
  eye: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  cpu: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
  externalLink: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  target: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  sliders: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
      <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
      <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/>
      <line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
  ),
  question: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  package: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
}

const TRUST = [
  { icon: Icons.cpu,      label: 'External AI Process — No Injection'       },
  { icon: Icons.shield,   label: 'Bypasses EAC, Arcsenic, Zyron & Vortex'   },
  { icon: Icons.zap,      label: 'Instant Key Delivery'                     },
  { icon: Icons.lock,     label: 'Anonymous Checkout'                       },
  { icon: Icons.refresh,  label: 'Model Updates Included'                   },
]

const PRODUCTS = [
  {
    id: 'fortnite-og',
    game: 'Fortnite OG',
    season: 'Legacy Season · Classic Map',
    badge: 'Legacy Build',
    status: 'undetected' as const,
    updated: '1d ago',
    users: 634,
    desc: 'Built specifically for OG Fortnite private servers. Retrained on OG character models and classic skin datasets. Recoil comp tuned for OG weapon bloom. 100% external — reads your screen, moves your mouse. EAC, Arcsenic, Zyron, and Vortex have nothing to scan.',
    features: [
      'AI Aimbot — model retrained on OG skins & character shapes',
      'Aim Assist — smooth AI correction tuned for OG sensitivity',
      'OG bloom compensation — mouse offsets calibrated per legacy weapon',
      'Movement prediction — calibrated for OG player movement speed',
      'Triggerbot — fires on screen-detected enemy crosshair overlap',
      'Silent Aim — invisible micro-correction before each shot',
      'Mouse recoil compensation — OG spray patterns via mouse only',
      'Adjustable FOV, smoothing & confidence threshold',
      'Bone targeting — head, chest, or body selection',
      'Stream-proof overlay — invisible to all capture software',
      'Low GPU inference mode — runs on older hardware',
      'Config profiles — save & switch setups instantly',
    ],
    tiers: [
      { label: 'Day',   price: '$8',  sub: '24 hours' },
      { label: 'Week',  price: '$25', sub: '7 days'   },
      { label: 'Month', price: '$55', sub: '30 days'  },
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
    icon: Icons.cpu,
    q: 'What makes these AI cheats?',
    a: 'Our software captures your display and runs a YOLOv8 computer vision model on it in real time. When it detects an enemy on-screen it moves your mouse and clicks — that\'s it. No code touches the game process, no DLL, no memory reads. Anti-cheat has nothing to scan.',
  },
  {
    icon: Icons.shield,
    q: 'Will I get banned?',
    a: 'EAC, Arcsenic, Zyron, and Vortex all scan game files, memory, and running processes. Our software does none of that — it runs completely separately, reads only your screen pixels, and acts only through your mouse. There is no footprint for any of them to find.',
  },
  {
    icon: Icons.package,
    q: 'How do I receive and run it?',
    a: 'After purchase a license key lands in your obsidian.best dashboard instantly. Download the external client, enter your key, launch your game — the AI starts reading your screen and assisting your aim. No driver installs, no admin access required.',
  },
  {
    icon: Icons.sliders,
    q: 'Can I configure the AI behavior?',
    a: 'Yes. FOV radius, confidence threshold, smoothing curve, bone target, and trigger delay are all adjustable. Legit and full-send presets are built in — or dial in your own profile and save it.',
  },
]

// ─── SCROLL DOT INDICATOR ────────────────────────────────────────────────────
function ScrollDots({ total, current }: { total: number; current: number }) {
  return (
    <div style={{
      position: 'fixed', right: 24, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 8, zIndex: 50,
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? 8 : 5,
          height: i === current ? 8 : 5,
          borderRadius: '50%',
          background: i === current ? 'var(--accent)' : 'rgba(163,151,221,0.25)',
          boxShadow: i === current ? '0 0 8px rgba(163,151,221,0.6)' : 'none',
          transition: 'all .25s',
        }} />
      ))}
    </div>
  )
}

export default function ShopPage() {
  const [tiers, setTiers] = useState<Record<string, number>>({ fortnite: 1, 'fortnite-og': 1, cs2: 1 })
  const [activeSection, setActiveSection] = useState(0)
  const [discordCount, setDiscordCount] = useState<number | null>(null)
  const totalSections = PRODUCTS.length + 2 // hero + product + faq
  const totalUsers = PRODUCTS.reduce((a, p) => a + p.users, 0)

  useEffect(() => {
    fetch('/api/discord-members')
      .then(r => r.json())
      .then(d => { if (d.count != null) setDiscordCount(d.count) })
      .catch(() => {})
  }, [])

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const el = e.currentTarget
    const sectionHeight = el.clientHeight
    const idx = Math.round(el.scrollTop / sectionHeight)
    setActiveSection(idx)
  }

  return (
    <>
      {/* ── NAV ── */}
      <header className="cnav-host">
        <nav className="cnav">
          <Link href="/" className="cnav-logo">
            <Image src="/needle-logo.png" alt="obsidian.best" width={28} height={28}
              style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(163,151,221,0.6))' }} />
            <span className="cnav-logo-text">obsidian<em>.best</em></span>
          </Link>
          <div className="cnav-links">
            <Link href="/"     className="cnav-link">Home</Link>
            <Link href="/shop" className="cnav-link" style={{ color: 'var(--light)' }}>Shop</Link>
          </div>
          <div className="cnav-actions">
            <Link href="/login"  className="cnav-signin">Sign in</Link>
            <Link href="/signup" className="cnav-cta">Get Access</Link>
          </div>
        </nav>
      </header>

      {/* ── SIDE DOTS ── */}
      <ScrollDots total={totalSections} current={activeSection} />

      {/* ── SNAP SCROLL CONTAINER ── */}
      <main
        onScroll={handleScroll}
        style={{
          position: 'fixed',
          top: 80,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >

        {/* ══ SECTION 0 — HERO ══ */}
        <section style={{
          height: '100%',
          scrollSnapAlign: 'start',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '40px 24px',
        }}>
          {/* bg glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 75% 55% at 50% 40%, rgba(163,151,221,0.12) 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(163,151,221,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(163,151,221,0.035) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
          }} />

          <div className="landing-badge" style={{ position: 'relative', zIndex: 1, marginBottom: 28 }}>
            <span className="landing-badge-dot" style={{ background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.5)' }} />
            {discordCount != null
              ? <>{discordCount.toLocaleString()} members in our Discord</>
              : <>join our Discord</>
            }
          </div>

          <h1 className="landing-h1" style={{ position: 'relative', zIndex: 1, marginBottom: 16 }}>
            obsidian<em>.best</em>
          </h1>
          <p className="landing-p" style={{ margin: '0 auto 20px', position: 'relative', zIndex: 1, maxWidth: 500, textAlign: 'center' }}>
            AI powered external cheat built for OG Fortnite emulators.<br />
            We have the capability to bypass EAC, Arcsenic, Zyron, and Vortex.
          </p>

          {/* tech pills */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 40, position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: 12, fontWeight: 600, color: 'var(--mid)',
              background: 'rgba(163,151,221,0.08)', border: '1px solid rgba(163,151,221,0.2)',
              padding: '7px 16px', borderRadius: 100,
            }}>
              <span style={{ color: 'var(--accent)', display: 'flex' }}>{Icons.cpu}</span>
              Powered by YOLOv8 computer vision
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: 12, fontWeight: 600, color: 'var(--mid)',
              background: 'rgba(163,151,221,0.08)', border: '1px solid rgba(163,151,221,0.2)',
              padding: '7px 16px', borderRadius: 100,
            }}>
              <span style={{ color: 'var(--accent)', display: 'flex' }}>{Icons.externalLink}</span>
              Fully external — zero injection
            </span>
          </div>

          {/* product jump links */}
          <div className="landing-examples" style={{ position: 'relative', zIndex: 1, marginBottom: 48 }}>
            {PRODUCTS.map(p => (
              <a key={p.id} href={`#${p.id}`} className="landing-example">{p.game}</a>
            ))}
          </div>

          {/* trust strip */}
          <div style={{
            position: 'relative', zIndex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap',
            gap: 0,
            border: '1px solid var(--border)', borderRadius: 14,
            background: 'rgba(163,151,221,0.02)', overflow: 'hidden',
          }}>
            {TRUST.map((t, i) => (
              <div key={t.label} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '11px 20px',
                borderRight: i < TRUST.length - 1 ? '1px solid var(--border)' : 'none',
                fontSize: 11, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.3px',
              }}>
                <span style={{ color: 'var(--accent)', display: 'flex' }}>{t.icon}</span>
                {t.label}
              </div>
            ))}
          </div>

          {/* scroll hint */}
          <div style={{
            position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            color: 'var(--faint)', fontSize: 11, fontWeight: 500, letterSpacing: '.5px',
            animation: 'fadeUpDown 2s ease-in-out infinite',
          }}>
            <span>scroll to browse</span>
            <span style={{ color: 'var(--accent)', display: 'flex' }}>{Icons.arrowDown}</span>
          </div>
        </section>

        {/* ══ PRODUCT SECTIONS ══ */}
        {PRODUCTS.map((p, pi) => {
          const st = STATUS[p.status]
          const ti = tiers[p.id] ?? 1
          const tier = p.tiers[ti]
          const isLast = pi === PRODUCTS.length - 1

          return (
            <section
              key={p.id}
              id={p.id}
              style={{
                height: '100%',
                scrollSnapAlign: 'start',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '0 48px',
              }}
            >
              {/* ambient glow per product */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: `radial-gradient(ellipse 60% 50% at ${pi === 0 ? '30%' : pi === 1 ? '70%' : '50%'} 50%, rgba(163,151,221,0.07) 0%, transparent 65%)`,
              }} />

              <div style={{
                position: 'relative', zIndex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 300px',
                gap: 48,
                maxWidth: 1040,
                margin: '0 auto',
                width: '100%',
                alignItems: 'center',
              }}>

                {/* ── LEFT: product info ── */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                  {/* top meta row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '.5px', textTransform: 'uppercase',
                      color: 'var(--mid)', background: 'rgba(163,151,221,0.1)',
                      border: '1px solid rgba(163,151,221,0.2)', padding: '3px 9px', borderRadius: 100,
                    }}>{p.badge}</span>
                    <span style={{ fontSize: 12, color: 'var(--faint)', fontWeight: 500 }}>{p.season}</span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100,
                      color: st.color, background: st.bg, border: `1px solid ${st.border}`,
                    }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%', background: st.color,
                        boxShadow: `0 0 6px ${st.color}80`, animation: 'bdot 2s ease-in-out infinite', flexShrink: 0,
                      }} />
                      {st.label}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--faint)' }}>
                      <span style={{ display: 'flex' }}>{Icons.users}</span>
                      {p.users.toLocaleString()} active
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--faint)' }}>
                      <span style={{ display: 'flex' }}>{Icons.clock}</span>
                      updated {p.updated}
                    </span>
                  </div>

                  {/* big game name */}
                  <h2 style={{
                    fontSize: 'clamp(52px, 7vw, 88px)',
                    fontWeight: 900,
                    letterSpacing: '-3px',
                    color: '#fff',
                    lineHeight: 1,
                    marginBottom: 20,
                  }}>{p.game}</h2>

                  {/* AI badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 11, fontWeight: 700, color: 'var(--light)',
                      background: 'rgba(163,151,221,0.08)', border: '1px solid rgba(163,151,221,0.18)',
                      padding: '4px 10px', borderRadius: 100,
                    }}>
                      <span style={{ display: 'flex', color: 'var(--accent)' }}>{Icons.cpu}</span>
                      AI-Powered · External Process
                    </span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 11, fontWeight: 700, color: 'rgba(74,222,128,0.8)',
                      background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)',
                      padding: '4px 10px', borderRadius: 100,
                    }}>
                      <span style={{ display: 'flex' }}>{Icons.shield}</span>
                      No DLL Injection
                    </span>
                  </div>

                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 28, maxWidth: 520 }}>{p.desc}</p>

                  {/* features grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px 28px' }}>
                    {p.features.map(f => (
                      <div key={f} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 9,
                        fontSize: 13, color: 'rgba(254,254,255,0.58)', lineHeight: 1.5,
                      }}>
                        <span style={{
                          width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          marginTop: 1, background: 'rgba(163,151,221,0.1)', color: 'var(--light)',
                        }}>
                          {Icons.checkCircle}
                        </span>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── RIGHT: purchase panel ── */}
                <div className="card" style={{ padding: '28px 22px', display: 'flex', flexDirection: 'column', gap: 0, alignSelf: 'center' }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase',
                    color: 'var(--faint)', marginBottom: 12,
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <span style={{ color: 'var(--accent)', display: 'flex' }}>{Icons.clock}</span>
                    Select Duration
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                    {p.tiers.map((t, i) => (
                      <button key={t.label}
                        onClick={() => setTiers(s => ({ ...s, [p.id]: i }))}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
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
                        <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-.5px' }}>{t.price}</span>
                      </button>
                    ))}
                  </div>

                  <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />

                  <button
                    className="btn btn-primary btn-full"
                    style={{ padding: '14px 16px', fontSize: 14, borderRadius: 11, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ display: 'flex', opacity: .9 }}>{Icons.zap}</span>
                      Purchase {tier.sub}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <strong style={{ fontSize: 18, fontWeight: 900 }}>{tier.price}</strong>
                      <span style={{ display: 'flex', opacity: .8 }}>{Icons.arrowRight}</span>
                    </span>
                  </button>

                  <p style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    fontSize: 11, color: 'var(--faint)', marginTop: 12, lineHeight: 1.6,
                  }}>
                    <span style={{ display: 'flex' }}>{Icons.lock}</span>
                    Anonymous · Key in your dashboard
                  </p>
                </div>
              </div>

              {/* scroll hint */}
              <div style={{
                position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                color: 'var(--faint)', fontSize: 10, fontWeight: 500, letterSpacing: '.5px',
                animation: 'fadeUpDown 2s ease-in-out infinite',
              }}>
                <span>{isLast ? 'scroll for FAQ' : 'next product'}</span>
                <span style={{ color: 'var(--accent)', display: 'flex' }}>{Icons.arrowDown}</span>
              </div>
            </section>
          )
        })}

        {/* ══ SECTION LAST — FAQ + FOOTER ══ */}
        <section style={{
          height: '100%',
          scrollSnapAlign: 'start',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '0 48px',
        }}>
          <div style={{ maxWidth: 860, margin: '0 auto', width: '100%' }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-.5px', color: '#fff', marginBottom: 24 }}>
              Common questions
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 48 }}>
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

            {/* footer inline */}
            <div style={{
              borderTop: '1px solid var(--border)', paddingTop: 24,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 16, flexWrap: 'wrap',
            }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                <Image src="/needle-logo.png" alt="" width={22} height={22}
                  style={{ objectFit: 'contain', opacity: .55, filter: 'drop-shadow(0 0 4px rgba(163,151,221,0.4))' }} />
                <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-.3px', color: 'rgba(254,254,255,0.35)' }}>
                  obsidian<em style={{ fontStyle: 'normal', color: 'rgba(163,151,221,0.45)' }}>.best</em>
                </span>
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <Link href="/"      style={{ fontSize: 13, color: 'var(--faint)', textDecoration: 'none' }}>Home</Link>
                <Link href="/shop"  style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>Shop</Link>
                <Link href="/login" style={{ fontSize: 13, color: 'var(--faint)', textDecoration: 'none' }}>Sign in</Link>
              </div>
              <span style={{ fontSize: 12, color: 'var(--faint)' }}>© 2025 obsidian.best</span>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        @keyframes fadeUpDown {
          0%, 100% { opacity: .3; transform: translateX(-50%) translateY(0); }
          50%       { opacity: .7; transform: translateX(-50%) translateY(5px); }
        }
        main::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  )
}
