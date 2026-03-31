import { NextResponse } from 'next/server'

export const revalidate = 60 // cache for 60 seconds

export async function GET() {
  try {
    const res = await fetch(
      'https://discord.com/api/v10/guilds/1384979421231976658/widget.json',
      { next: { revalidate: 60 } }
    )

    if (!res.ok) {
      return NextResponse.json({ count: null, error: 'widget_disabled' }, { status: 200 })
    }

    const data = await res.json()
    // presence_count = online members, which is what Discord widget exposes
    return NextResponse.json({ count: data.presence_count ?? null })
  } catch {
    return NextResponse.json({ count: null, error: 'fetch_failed' }, { status: 200 })
  }
}
