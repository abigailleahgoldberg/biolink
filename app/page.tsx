'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const SECTIONS = ['hero', 'what', 'how', 'cta'] as const

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const sections = document.querySelectorAll('.fn-snap')
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            setActiveIdx(Array.from(sections).indexOf(e.target))
          }
        })
      },
      { root: containerRef.current, threshold: 0.5 }
    )
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  const scrollTo = (idx: number) => {
    document.querySelectorAll('.fn-snap')[idx]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="fn-bg-glow" />
      {/* NAV */}
      <nav className="fn-nav">
        <Link href="/" className="fn-logo">fentanyl<span>.best</span></Link>
        <div className="fn-nav-right">
          <Link href="/login" className="fn-nav-link">Sign in</Link>
          <Link href="/signup" className="fn-nav-cta">Get started</Link>
        </div>
      </nav>

      {/* Scroll dots */}
      <div className="fn-dots">
        {SECTIONS.map((_, i) => (
          <button key={i} className={`fn-dot${activeIdx === i ? ' fn-dot-active' : ''}`} onClick={() => scrollTo(i)} />
        ))}
      </div>

      {/* Snap container */}
      <div className="fn-container" ref={containerRef}>

        {/* ── 1. HERO ── */}
        <section className="fn-snap fn-hero">
          <div className="fn-center fn-anim">
            <div className="fn-eyebrow">
              <span className="fn-eyebrow-dot" />
              Invite only · Now open
            </div>
            <h1 className="fn-h1">
              One link.<br />
              <em>Everything you are.</em>
            </h1>
            <p className="fn-sub">
              Your socials, your music, your vibe.<br />
              One clean link. Fully customizable.
            </p>
            <div className="fn-actions">
              <Link href="/signup" className="fn-btn-primary">Claim your link</Link>
              <button onClick={() => scrollTo(1)} className="fn-btn-ghost">See more</button>
            </div>
          </div>
          <button className="fn-scroll-hint" onClick={() => scrollTo(1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
            Scroll
          </button>
        </section>

        {/* ── 2. WHAT ── */}
        <section className="fn-snap fn-what">
          <div className="fn-inner fn-anim">
            <span className="fn-label">What it is</span>
            <h2 className="fn-h2">
              One page.<br />
              Your whole<br />
              <em>presence.</em>
            </h2>
            <div className="fn-what-cols">
              <p className="fn-body">
                Change your background, colors, button style, font, and music player. Add every platform you're on. Drop in a track. Show off your badges. It's your page — make it look like you actually built it.
              </p>
              <div className="fn-what-card">
                <div className="fn-card-avatar">Z</div>
                <div className="fn-card-name">zj71</div>
                <div className="fn-card-bio">creator · gamer · just vibing</div>
                <div className="fn-card-badges">
                  <span>🎮 Gamer</span><span>⭐ OG</span><span>👑 Founder</span>
                </div>
                <div className="fn-card-links">
                  <div className="fn-card-link fn-card-link-accent">Discord</div>
                  <div className="fn-card-link">TikTok</div>
                  <div className="fn-card-link">YouTube</div>
                </div>
                <div className="fn-card-views">1,247 views</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. HOW ── */}
        <section className="fn-snap fn-how">
          <div className="fn-inner fn-anim">
            <span className="fn-label">How it works</span>
            <h2 className="fn-h2">Up in minutes.<br /><em>Yours forever.</em></h2>
            <div className="fn-steps">
              {[
                ['01', 'Get an invite', 'Someone vouches for you. That\'s your ticket in.'],
                ['02', 'Claim your name', 'Pick your username. It\'s yours the second you register it.'],
                ['03', 'Build your page', 'Links, colors, music, badges. Takes about 3 minutes.'],
                ['04', 'Share one link', 'Put it everywhere. It stays current. Always live.'],
              ].map(([n, t, b]) => (
                <div key={n} className="fn-step">
                  <div className="fn-step-n">{n}</div>
                  <div className="fn-step-title">{t}</div>
                  <div className="fn-step-body">{b}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. CTA ── */}
        <section className="fn-snap fn-cta">
          <div className="fn-center fn-anim">
            <span className="fn-label">Get started</span>
            <h2 className="fn-cta-h">
              Your link<br />
              is waiting.
            </h2>
            <p className="fn-sub fn-sub-sm">
              Get an invite and claim your spot on fentanyl.best.
            </p>
            <Link href="/signup" className="fn-btn-primary fn-btn-xl">Claim your link →</Link>
            <div className="fn-cta-url">fentanyl.best/<em>yourname</em></div>
          </div>

          {/* Footer inside last section */}
          <footer className="fn-footer">
            <Link href="/" className="fn-logo">fentanyl<span>.best</span></Link>
            <div className="fn-footer-links">
              <Link href="/signup" className="fn-footer-a">Sign up</Link>
              <Link href="/login" className="fn-footer-a">Sign in</Link>
              <a href="#" className="fn-footer-a">Terms</a>
              <a href="#" className="fn-footer-a">Privacy</a>
            </div>
            <div className="fn-footer-copy">© 2025 fentanyl.best</div>
          </footer>
        </section>

      </div>
    </>
  )
}
