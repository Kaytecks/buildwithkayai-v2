import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password required' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )

    // Get stored token
    const { data: setting } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'password_reset_token')
      .single()

    if (!setting) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
    }

    const stored = JSON.parse(setting.value)

    // Validate token and expiry
    if (stored.token !== token) {
      return NextResponse.json({ error: 'Invalid reset token' }, { status: 400 })
    }

    if (Date.now() > stored.expires) {
      return NextResponse.json({ error: 'Reset link has expired' }, { status: 400 })
    }

    // In a real app we'd update the password in the database
    // Since we use env var for password, we update the settings table
    // and the admin should then update their Vercel env var
    await supabase.from('settings').upsert({
      key: 'pending_password_update',
      value: JSON.stringify({
        newPassword: password,
        updatedAt: new Date().toISOString(),
      }),
    })

    // Clear the reset token
    await supabase.from('settings').delete().eq('key', 'password_reset_token')

    // Note: Admin needs to update ADMIN_PASSWORD in Vercel env vars
    // This is a limitation of using env vars for auth
    return NextResponse.json({
      success: true,
      message: 'Password updated. Please update your ADMIN_PASSWORD environment variable in Vercel to match.',
    })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 })
  }
}
