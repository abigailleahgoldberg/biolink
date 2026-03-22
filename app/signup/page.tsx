'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { validateUsername } from '@/lib/blacklist'

export default function Signup() {
  const router = useRouter()
  const [step, setStep] = useState<'invite' | 'account'>('invite')
  const [invite, setInvite] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  async function checkInvite() {
    setErr(''); setLoading(true)
    const { data } = await supabase
      .from('invite_codes')
      .select('*')
      .eq('code', invite.trim().toUpperCase())
      .is('used_by', null)
      .single()
    setLoading(false)
    if (!data) return setErr('That code is invalid or already used.')
    setStep('account')
  }

  async function createAccount() {
    setErr(''); setLoading(true)

    const usernameErr = validateUsername(username)
    if (usernameErr) { setLoading(false); return setErr(usernameErr) }

    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username.toLowerCase())
      .single()
    if (existing) { setLoading(false); return setErr('That username is taken.') }

    const { data: auth, error: authErr } = await supabase.auth.signUp({ email, password })
    if (authErr || !auth.user) { setLoading(false); return setErr(authErr?.message || 'Signup failed.') }

    const { error: profileErr } = await supabase.from('profiles').insert({
      id: auth.user.id,
      username: username.toLowerCase(),
      display_name: username,
    })
    if (profileErr) { setLoading(false); return setErr('Failed to create profile.') }

    await supabase.from('invite_codes')
      .update({ used_by: auth.user.id, used_at: new Date().toISOString() })
      .eq('code', invite.trim().toUpperCase())

    setLoading(false)
    router.push('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link href="/" className="auth-brand">
          <Image src="/needle-logo.png" alt="fentanyl.best" width={52} height={52} style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 14px rgba(163,151,221,0.55))' }} />
        </Link>

        {step === 'invite' ? (
          <>
            <h1 className="auth-title">Got an invite?</h1>
            <p className="auth-sub">This is invite-only. Drop your code below.</p>
            <div className="auth-form">
              <div className="field">
                <label>Invite Code</label>
                <input
                  className="input"
                  value={invite}
                  onChange={e => setInvite(e.target.value.toUpperCase())}
                  placeholder="FENT-XXXX-0000"
                  style={{ textTransform: 'uppercase', letterSpacing: 3, fontFamily: 'monospace', fontSize: 15, textAlign: 'center' }}
                  onKeyDown={e => e.key === 'Enter' && checkInvite()}
                />
              </div>
              {err && <div className="err-msg">{err}</div>}
              <button
                className="btn btn-primary btn-full"
                style={{ padding: '13px', fontSize: 14 }}
                onClick={checkInvite}
                disabled={loading || !invite.trim()}
              >
                {loading ? 'Checking...' : 'Continue'}
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="auth-title">Claim your link.</h1>
            <p className="auth-sub">Pick your username. This is your identity.</p>
            <div className="auth-form">
              <div className="field">
                <label>Username</label>
                <input
                  className="input"
                  value={username}
                  onChange={e => setUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                  placeholder="yourname"
                  maxLength={20}
                />
                {username && (
                  <span style={{ fontSize: 11, color: 'var(--accent)', marginTop: 2 }}>
                    fentanyl.best/{username.toLowerCase()}
                  </span>
                )}
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="8+ characters"
                />
              </div>
              {err && <div className="err-msg">{err}</div>}
              <button
                className="btn btn-primary btn-full"
                style={{ padding: '13px', fontSize: 14 }}
                onClick={createAccount}
                disabled={loading || !username || !email || !password}
              >
                {loading ? 'Creating...' : 'Create account'}
              </button>
            </div>
          </>
        )}

        <div className="auth-footer">
          Already have an account? <Link href="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
