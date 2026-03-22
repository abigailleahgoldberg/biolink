import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { code, userId } = await req.json()
    if (!code || !userId) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

    // Check code exists, unused, strict one-time
    const { data: invite } = await admin
      .from('invite_codes')
      .select('*')
      .eq('code', code.trim().toUpperCase())
      .is('used_by', null)
      .single()

    if (!invite) return NextResponse.json({ error: 'Invalid or already used invite code.' }, { status: 400 })

    // Atomically mark as used
    const { error } = await admin
      .from('invite_codes')
      .update({ used_by: userId, used_at: new Date().toISOString() })
      .eq('id', invite.id)
      .is('used_by', null) // double-check — prevents race condition reuse

    if (error) return NextResponse.json({ error: 'Code already used.' }, { status: 400 })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
