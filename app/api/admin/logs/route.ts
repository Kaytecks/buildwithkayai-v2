import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sendNewPostNotification } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { title, slug, excerpt, content, cover_image, tags, linkedin_url, status, reading_time } = body

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Title, slug and content required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('logs')
      .insert({ title, slug, excerpt, content, cover_image, tags, linkedin_url, status, reading_time })
      .select()
      .single()

    if (error) throw error

    // If publishing, notify subscribers
    if (status === 'published') {
      await notifySubscribers({ title, excerpt, slug })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Create log error:', error)
    if (error.code === '23505') {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('logs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: 'Failed' }, { status: 500 })
  return NextResponse.json({ data })
}

async function notifySubscribers({ title, excerpt, slug }: { title: string; excerpt: string; slug: string }) {
  const { data: subscribers } = await supabaseAdmin
    .from('subscribers')
    .select('email')
    .eq('unsubscribed', false)

  if (!subscribers || subscribers.length === 0) return

  const postUrl = `${process.env.NEXTAUTH_URL}/logs/${slug}`

  await Promise.allSettled(
    subscribers.map(sub =>
      sendNewPostNotification({
        email: sub.email,
        postTitle: title,
        postExcerpt: excerpt || '',
        postUrl,
        unsubscribeUrl: `${process.env.NEXTAUTH_URL}/api/unsubscribe?email=${encodeURIComponent(sub.email)}`,
      })
    )
  )
}
