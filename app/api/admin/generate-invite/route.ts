import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 })

    // Verify caller is admin
    const { data: profile } = await admin.from('profiles').select('is_admin').eq('id', userId).single()
    if (!profile?.is_admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

    // Generate code
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const rand = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    const code = `FENT-${rand.slice(0,4)}-${rand.slice(4,8)}`

    const { data, error } = await admin.from('invite_codes').insert({
      code,
      created_by: userId,
      used_by: null,
      used_at: null,
    }).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ code: data })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
