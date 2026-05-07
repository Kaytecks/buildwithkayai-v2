import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { data: logs, error } = await supabaseAdmin
      .from('logs')
      .select('id, title, slug, excerpt, cover_image, tags, linkedin_url, created_at, reading_time')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(
      { logs: logs || [] },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    )
  } catch (error) {
    console.error('Public logs error:', error)
    return NextResponse.json({ logs: [] })
  }
}