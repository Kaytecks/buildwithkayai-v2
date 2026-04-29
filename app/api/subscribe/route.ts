import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendSubscriptionConfirmation } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Check if already subscribed
    const { data: existing } = await supabaseAdmin
      .from('subscribers')
      .select('id, unsubscribed')
      .eq('email', email)
      .single()

    if (existing && !existing.unsubscribed) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }

    // If previously unsubscribed, resubscribe
    if (existing && existing.unsubscribed) {
      await supabaseAdmin
        .from('subscribers')
        .update({ unsubscribed: false, unsubscribed_at: null })
        .eq('email', email)
    } else {
      // New subscriber
      await supabaseAdmin
        .from('subscribers')
        .insert({ email })
    }

    // Send confirmation email
    const confirmUrl = `${process.env.NEXTAUTH_URL}/api/confirm-subscription?email=${encodeURIComponent(email)}`
    await sendSubscriptionConfirmation({ email, confirmUrl })

    // Track analytics
    await supabaseAdmin.from('analytics').insert({
      page: 'logs',
      event: 'subscription',
      metadata: { email },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
