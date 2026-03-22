'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  async function login() {
    setErr(''); setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) return setErr('Wrong email or password.')
    router.push('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link href="/" className="auth-brand">
          <Image src="/needle-logo.png" alt="fentanyl.best" width={52} height={52} style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 14px rgba(163,151,221,0.55))' }} />
        </Link>

        <h1 className="auth-title">Welcome back.</h1>
        <p className="auth-sub">Sign in to your profile.</p>

        <div className="auth-form">
          <div className="field">
            <label>Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              onKeyDown={e => e.key === 'Enter' && login()}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && login()}
            />
          </div>
          {err && <div className="err-msg">{err}</div>}
          <button
            className="btn btn-primary btn-full"
            style={{ padding: '13px', fontSize: 14 }}
            onClick={login}
            disabled={loading || !email || !password}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>

        <div className="auth-footer">
          Don&apos;t have an account? <Link href="/signup">Get an invite</Link>
        </div>
      </div>
    </div>
  )
}
