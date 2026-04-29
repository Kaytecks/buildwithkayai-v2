import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    await supabaseAdmin
      .from('subscribers')
      .update({
        unsubscribed: true,
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('email', email)

    // Return a nice HTML page
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Unsubscribed — BuildWithKayAI</title>
          <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet"/>
          <style>
            body { background: #02040a; color: #f0f4f8; font-family: 'JetBrains Mono', monospace;
              display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
            .box { border: 1px solid rgba(0,245,255,0.2); padding: 40px; max-width: 400px; text-align: center; }
            h2 { color: #00f5ff; letter-spacing: 3px; margin-bottom: 16px; font-size: 0.9rem; }
            p { color: rgba(240,244,248,0.5); font-size: 0.8rem; line-height: 1.7; }
            a { color: #00f5ff; text-decoration: none; display: inline-block; margin-top: 20px; font-size: 0.75rem; }
          </style>
        </head>
        <body>
          <div class="box">
            <h2>// UNSUBSCRIBED</h2>
            <p>You've been successfully unsubscribed from Kehinde's LOGS updates.</p>
            <a href="https://buildwithkayai.com">← BACK TO SITE</a>
          </div>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
