'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Admin() {
  const router = useRouter()
  const [tab, setTab] = useState<'invites'|'users'|'blacklist'>('invites')
  const [loading, setLoading] = useState(true)
  const [invites, setInvites] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [blacklist, setBlacklist] = useState<any[]>([])
  const [newBlacklist, setNewBlacklist] = useState('')
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single()
      if (!profile?.is_admin) { router.push('/dashboard'); return }
      await loadAll()
      setLoading(false)
    }
    check()
  }, [router])

  async function loadAll() {
    const [inv, usr, bl] = await Promise.all([
      supabase.from('invite_codes').select('*').order('created_at', { ascending: false }),
      supabase.from('profiles').select('id,username,display_name,views,is_admin,created_at').order('created_at', { ascending: false }),
      supabase.from('blacklisted_usernames').select('*').order('created_at', { ascending: false }),
    ])
    setInvites(inv.data || [])
    setUsers(usr.data || [])
    setBlacklist(bl.data || [])
  }

  async function generateInvite() {
    setGenerating(true)
    const { data: { user } } = await supabase.auth.getUser()
    const code = Array.from({ length: 12 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]).join('')
    const formatted = `${code.slice(0,4)}-${code.slice(4,8)}-${code.slice(8,12)}`
    await supabase.from('invite_codes').insert({ code: formatted, created_by: user?.id })
    await loadAll()
    setGenerating(false)
  }

  async function revokeInvite(id: string) {
    await supabase.from('invite_codes').delete().eq('id', id)
    await loadAll()
  }

  async function addBlacklist() {
    if (!newBlacklist.trim()) return
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('blacklisted_usernames').insert({ username: newBlacklist.trim().toLowerCase(), added_by: user?.id })
    setNewBlacklist('')
    await loadAll()
  }

  async function removeBlacklist(id: string) {
    await supabase.from('blacklisted_usernames').delete().eq('id', id)
    await loadAll()
  }

  async function toggleAdmin(id: string, current: boolean) {
    await supabase.from('profiles').update({ is_admin: !current }).eq('id', id)
    await loadAll()
  }

  if (loading) return <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)' }}>Loading...</div>

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <div className="dash-logo">Bio<span>Link</span> <span style={{ fontSize:10, color:'var(--accent)', fontWeight:600, letterSpacing:1 }}>ADMIN</span></div>
        <nav className="dash-nav">
          <button className={`dash-link ${tab==='invites'?'active':''}`} onClick={() => setTab('invites')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Invite Codes
          </button>
          <button className={`dash-link ${tab==='users'?'active':''}`} onClick={() => setTab('users')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Users ({users.length})
          </button>
          <button className={`dash-link ${tab==='blacklist'?'active':''}`} onClick={() => setTab('blacklist')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
            Blacklist ({blacklist.length})
          </button>
          <a href="/dashboard" className="dash-link" style={{ marginTop:8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Dashboard
          </a>
        </nav>
      </aside>

      <main className="dash-content">
        {/* ── Invites ── */}
        {tab === 'invites' && (
          <>
            <div className="dash-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <h1 className="dash-title">Invite Codes</h1>
                <p className="dash-sub">{invites.filter(i=>!i.used_by).length} unused · {invites.filter(i=>i.used_by).length} used</p>
              </div>
              <button className="btn btn-primary" onClick={generateInvite} disabled={generating}>
                {generating ? 'Generating...' : '+ Generate Code'}
              </button>
            </div>
            <div className="card" style={{ padding:0, overflow:'hidden' }}>
              <table className="admin-table">
                <thead><tr>
                  <th>Code</th><th>Status</th><th>Created</th><th>Used By</th><th></th>
                </tr></thead>
                <tbody>
                  {invites.map(inv => (
                    <tr key={inv.id}>
                      <td><code style={{ fontFamily:'monospace', fontSize:13, letterSpacing:1 }}>{inv.code}</code></td>
                      <td><span className={`badge-pill ${inv.used_by ? 'badge-red' : 'badge-green'}`}>{inv.used_by ? 'Used' : 'Available'}</span></td>
                      <td style={{ color:'var(--muted)' }}>{new Date(inv.created_at).toLocaleDateString()}</td>
                      <td style={{ color:'var(--muted)' }}>{inv.used_by ? '—' : '—'}</td>
                      <td>
                        {!inv.used_by && (
                          <button className="btn btn-danger" style={{ padding:'4px 12px', fontSize:11 }} onClick={() => revokeInvite(inv.id)}>Revoke</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {!invites.length && <tr><td colSpan={5} style={{ textAlign:'center', color:'var(--muted)', padding:24 }}>No invite codes yet</td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── Users ── */}
        {tab === 'users' && (
          <>
            <div className="dash-header">
              <h1 className="dash-title">Users</h1>
              <p className="dash-sub">{users.length} total accounts</p>
            </div>
            <div className="card" style={{ padding:0, overflow:'hidden' }}>
              <table className="admin-table">
                <thead><tr>
                  <th>Username</th><th>Display Name</th><th>Views</th><th>Joined</th><th>Role</th><th></th>
                </tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td><a href={`/${u.username}`} target="_blank" style={{ color:'var(--accent)' }}>@{u.username}</a></td>
                      <td>{u.display_name || '—'}</td>
                      <td style={{ color:'var(--muted)' }}>{(u.views||0).toLocaleString()}</td>
                      <td style={{ color:'var(--muted)' }}>{new Date(u.created_at).toLocaleDateString()}</td>
                      <td><span className={`badge-pill ${u.is_admin ? 'badge-purple' : 'badge-green'}`}>{u.is_admin ? 'Admin' : 'User'}</span></td>
                      <td>
                        <button className="btn btn-secondary" style={{ padding:'4px 10px', fontSize:11 }} onClick={() => toggleAdmin(u.id, u.is_admin)}>
                          {u.is_admin ? 'Remove Admin' : 'Make Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── Blacklist ── */}
        {tab === 'blacklist' && (
          <>
            <div className="dash-header">
              <h1 className="dash-title">Username Blacklist</h1>
              <p className="dash-sub">Blocked usernames can never be registered</p>
            </div>
            <div className="card" style={{ marginBottom:16 }}>
              <div style={{ display:'flex', gap:10 }}>
                <input className="input" style={{ flex:1 }} value={newBlacklist} onChange={e => setNewBlacklist(e.target.value.toLowerCase())} placeholder="username to block" onKeyDown={e => e.key==='Enter' && addBlacklist()} />
                <button className="btn btn-primary" onClick={addBlacklist}>Block</button>
              </div>
            </div>
            <div className="card" style={{ padding:0, overflow:'hidden' }}>
              <table className="admin-table">
                <thead><tr><th>Username</th><th>Added</th><th></th></tr></thead>
                <tbody>
                  {blacklist.map(b => (
                    <tr key={b.id}>
                      <td><code style={{ fontFamily:'monospace' }}>{b.username}</code></td>
                      <td style={{ color:'var(--muted)' }}>{new Date(b.created_at).toLocaleDateString()}</td>
                      <td><button className="btn btn-danger" style={{ padding:'4px 12px', fontSize:11 }} onClick={() => removeBlacklist(b.id)}>Remove</button></td>
                    </tr>
                  ))}
                  {!blacklist.length && <tr><td colSpan={3} style={{ textAlign:'center', color:'var(--muted)', padding:24 }}>No blacklisted usernames</td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
