'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SetupPage() {
  const [username, setUsername] = useState('')
  const [secret, setSecret]   = useState('')
  const [result, setResult]   = useState<{ success?: boolean; message?: string; invite_code?: string; error?: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function run() {
    if (!username.trim() || !secret.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), secret: secret.trim() }),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({ error: 'Network error' })
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 480 }}>
        <Link href="/" className="auth-brand">
          <Image src="/needle-logo.png" alt="" width={26} height={26} style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(163,151,221,0.6))' }} />
          <span>obsidian<em>.best</em></span>
        </Link>

        <div className="auth-title">Owner Setup</div>
        <div className="auth-sub">Grant yourself admin access and generate your first invite code.</div>

        <div className="auth-form">
          <div className="field">
            <label>Your username</label>
            <input
              className="input"
              placeholder="zj71"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && run()}
            />
          </div>
          <div className="field">
            <label>Setup secret</label>
            <input
              className="input"
              type="password"
              placeholder="secret from your .env"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && run()}
            />
          </div>

          <button
            className="btn btn-primary btn-full"
            style={{ padding: '13px', fontSize: 14 }}
            onClick={run}
            disabled={loading}
          >
            {loading ? 'Running...' : 'Run Setup'}
          </button>
        </div>

        {result && (
          <div style={{ marginTop: 20 }}>
            {result.error ? (
              <div className="err-msg">{result.error}</div>
            ) : (
              <div style={{
                background: 'rgba(34,197,94,0.06)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: 12,
                padding: '20px',
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#4ade80', marginBottom: 12 }}>
                  {result.message}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(254,254,255,0.5)', marginBottom: 6 }}>
                  Your first invite code:
                </div>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: '2px',
                  color: '#C9BDFE',
                  background: 'rgba(163,151,221,0.08)',
                  border: '1px solid rgba(163,151,221,0.2)',
                  borderRadius: 8,
                  padding: '12px 16px',
                  cursor: 'pointer',
                }}
                  onClick={() => navigator.clipboard.writeText(result.invite_code || '')}
                  title="Click to copy"
                >
                  {result.invite_code}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(254,254,255,0.3)', marginTop: 8 }}>
                  Click the code to copy. Share it with someone to let them sign up.
                </div>
                <div style={{ marginTop: 16 }}>
                  <Link href="/dashboard" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: 13 }}>
                    Go to Dashboard →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
