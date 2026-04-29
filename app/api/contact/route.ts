import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendContactNotification, sendContactAutoReply } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    // Validate
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Save to Supabase
    const { error: dbError } = await supabaseAdmin
      .from('messages')
      .insert({ name, email, subject, message })

    if (dbError) throw dbError

    // Send emails
    await Promise.allSettled([
      sendContactNotification({ name, email, subject, message }),
      sendContactAutoReply({ name, email }),
    ])

    // Track analytics
    await supabaseAdmin.from('analytics').insert({
      page: 'contact',
      event: 'form_submission',
      metadata: { name, email },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
