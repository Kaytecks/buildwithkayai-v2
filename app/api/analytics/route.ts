import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { page, event, metadata } = await req.json()

    if (!page || !event) {
      return NextResponse.json({ error: 'Page and event required' }, { status: 400 })
    }

    await supabaseAdmin.from('analytics').insert({
      page,
      event,
      metadata: metadata || {},
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    // Admin only
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')

    const since = new Date()
    since.setDate(since.getDate() - days)

    const { data } = await supabaseAdmin
      .from('analytics')
      .select('*')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: false })

    // Aggregate by page and event
    const summary: Record<string, number> = {}
    data?.forEach(item => {
      const key = `${item.page}:${item.event}`
      summary[key] = (summary[key] || 0) + 1
    })

    return NextResponse.json({ data, summary, total: data?.length || 0 })
  } catch (error) {
    console.error('Analytics GET error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
