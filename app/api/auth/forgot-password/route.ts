import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM_EMAIL } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Only allow admin email
    if (email !== process.env.ADMIN_EMAIL) {
      // Return success anyway to not reveal if email exists
      return NextResponse.json({ success: true })
    }

    // Generate reset token
    const token = Math.random().toString(36).slice(2) + Date.now().toString(36)
    const resetUrl = `${process.env.NEXTAUTH_URL}/admin/reset-password?token=${token}`

    // Store token in settings table with expiry
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )

    await supabase.from('settings').upsert({
      key: 'password_reset_token',
      value: JSON.stringify({
        token,
        expires: Date.now() + 60 * 60 * 1000, // 1 hour
      }),
    })

    // Send reset email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Password Reset — BuildWithKayAI Admin',
      html: `
        <div style="background:#02040a;color:#f0f4f8;padding:40px;font-family:monospace;">
          <div style="border:1px solid rgba(0,245,255,0.3);padding:30px;max-width:500px;">
            <h2 style="color:#00f5ff;letter-spacing:3px;margin-bottom:20px;font-size:0.9rem;">// PASSWORD RESET</h2>
            <p style="margin-bottom:20px;color:rgba(240,244,248,0.7);">
              You requested a password reset for your BuildWithKayAI admin account.
            </p>
            <a href="${resetUrl}"
               style="display:inline-block;background:#00f5ff;color:#02040a;padding:14px 28px;
                      text-decoration:none;font-weight:700;letter-spacing:2px;font-size:0.85rem;">
              RESET PASSWORD →
            </a>
            <p style="margin-top:24px;color:rgba(240,244,248,0.4);font-size:0.75rem;">
              This link expires in 1 hour. If you didn't request this, ignore this email.
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
