import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const [
    { data: events },
    { count: totalViews },
    { count: chatCount },
    { count: contactCount },
    { count: subscribeCount },
    { data: recentEvents },
  ] = await Promise.all([
    supabaseAdmin.from('analytics').select('page, event, created_at').gte('created_at', thirtyDaysAgo.toISOString()),
    supabaseAdmin.from('analytics').select('*', { count: 'exact', head: true }).gte('created_at', thirtyDaysAgo.toISOString()),
    supabaseAdmin.from('analytics').select('*', { count: 'exact', head: true }).eq('page', 'ai-copilot').gte('created_at', thirtyDaysAgo.toISOString()),
    supabaseAdmin.from('analytics').select('*', { count: 'exact', head: true }).eq('page', 'contact').gte('created_at', thirtyDaysAgo.toISOString()),
    supabaseAdmin.from('analytics').select('*', { count: 'exact', head: true }).eq('event', 'subscription').gte('created_at', thirtyDaysAgo.toISOString()),
    supabaseAdmin.from('analytics').select('page, event, created_at').order('created_at', { ascending: false }).limit(20),
  ])

  const pageViews: Record<string, number> = {}
  events?.forEach(e => {
    if (e.page) pageViews[e.page] = (pageViews[e.page] || 0) + 1
  })

  const topPages = Object.entries(pageViews).sort(([, a], [, b]) => b - a).slice(0, 8)

  return NextResponse.json({
    totalViews, chatCount, contactCount, subscribeCount,
    topPages, recentEvents: recentEvents || [],
  })
}
