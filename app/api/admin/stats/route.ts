import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [
    { count: postCount },
    { count: subscriberCount },
    { count: messageCount },
    { count: unreadCount },
    { data: recentLogs },
    { data: recentMessages },
  ] = await Promise.all([
    supabaseAdmin.from('logs').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('subscribers').select('*', { count: 'exact', head: true }).eq('unsubscribed', false),
    supabaseAdmin.from('messages').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('messages').select('*', { count: 'exact', head: true }).eq('read', false),
    supabaseAdmin.from('logs').select('id,title,status,created_at').order('created_at',{ascending:false}).limit(5),
    supabaseAdmin.from('messages').select('id,name,email,subject,read,created_at').order('created_at',{ascending:false}).limit(5),
  ])

  return NextResponse.json({ postCount, subscriberCount, messageCount, unreadCount, recentLogs: recentLogs||[], recentMessages: recentMessages||[] })
}
