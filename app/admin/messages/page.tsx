import { requireAdmin } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import MarkReadButton from './MarkReadButton'

export default async function MessagesPage() {
  await requireAdmin()

  const { data: messages } = await supabaseAdmin
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  const unread = messages?.filter(m => !m.read).length || 0

  return (
    <main style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <div className="s-label">// MESSAGES INBOX</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px' }}>
          Contact <span style={{ color: 'var(--cyan)' }}>Messages</span>
          {unread > 0 && (
            <span style={{
              marginLeft: '14px', background: 'var(--cyan)', color: 'var(--bg)',
              padding: '4px 12px', fontSize: '0.9rem', fontFamily: 'JetBrains Mono, monospace',
              verticalAlign: 'middle',
            }}>{unread} NEW</span>
          )}
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
        {messages && messages.length > 0 ? messages.map((msg) => (
          <div key={msg.id} style={{
            background: msg.read ? 'var(--bg)' : 'rgba(0,245,255,0.02)',
            padding: '24px 28px',
            borderLeft: msg.read ? '3px solid transparent' : '3px solid var(--cyan)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  {!msg.read && <span style={{ width: '6px', height: '6px', background: 'var(--cyan)', borderRadius: '50%' }} />}
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>{msg.name}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)' }}>
                    &lt;{msg.email}&gt;
                  </span>
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--cyan)', letterSpacing: '1px' }}>
                  {msg.subject}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)' }}>
                  {new Date(msg.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                {!msg.read && <MarkReadButton id={msg.id} />}
              </div>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>
              {msg.message}
            </p>
            <div style={{ marginTop: '14px' }}>
              <a
                href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem',
                  color: 'var(--cyan)', textDecoration: 'none', letterSpacing: '1px',
                }}
              >
                REPLY VIA EMAIL →
              </a>
            </div>
          </div>
        )) : (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
            No messages yet
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) { main { padding: 20px !important; } }
      `}</style>
    </main>
  )
}
