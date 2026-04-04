import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { username, secret } = await req.json()

    // Simple secret check so random people can't hit this
    if (secret !== process.env.SETUP_SECRET) {
      return NextResponse.json({ error: 'Wrong secret' }, { status: 403 })
    }

    // Find the profile
    const { data: profile, error: profileError } = await admin
      .from('profiles')
      .select('id, username, is_admin')
      .eq('username', username.toLowerCase().trim())
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'User not found — make sure you have an account first' }, { status: 404 })
    }

    // Set as admin
    await admin.from('profiles').update({ is_admin: true }).eq('id', profile.id)

    // Generate an invite code
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const rand = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    const code = `OBSD-${rand.slice(0,4)}-${rand.slice(4,8)}`

    await admin.from('invite_codes').insert({
      code,
      created_by: profile.id,
      used_by: null,
      used_at: null,
    })

    return NextResponse.json({
      success: true,
      message: `Done! @${profile.username} is now admin.`,
      invite_code: code,
    })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
