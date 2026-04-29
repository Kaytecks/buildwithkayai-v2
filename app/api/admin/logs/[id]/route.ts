import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sendNewPostNotification } from '@/lib/resend'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('logs')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  return NextResponse.json({ data })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { title, slug, excerpt, content, cover_image, tags, linkedin_url, status, reading_time } = body

    // Get current status to detect publish event
    const { data: existing } = await supabaseAdmin
      .from('logs')
      .select('status, slug')
      .eq('id', params.id)
      .single()

    const { data, error } = await supabaseAdmin
      .from('logs')
      .update({
        title, slug, excerpt, content, cover_image,
        tags, linkedin_url, status, reading_time,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    // If newly published (was draft before), notify subscribers
    if (status === 'published' && existing?.status === 'draft') {
      await notifySubscribers({ title, excerpt, slug })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Update log error:', error)
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabaseAdmin
    .from('logs')
    .delete()
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  return NextResponse.json({ success: true })
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
