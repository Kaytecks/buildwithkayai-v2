'use client'
import { requireAdmin } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export default async function SubscribersPage() {
  await requireAdmin()

  const { data: subscribers } = await supabaseAdmin
    .from('subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false })

  const active = subscribers?.filter(s => !s.unsubscribed) || []
  const inactive = subscribers?.filter(s => s.unsubscribed) || []

  return (
    <main style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <div className="s-label">// SUBSCRIBERS</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px' }}>
          Email <span style={{ color: 'var(--cyan)' }}>Subscribers</span>
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', marginBottom: '40px' }}>
        {[
          { label: 'TOTAL', value: subscribers?.length || 0, color: 'var(--cyan)' },
          { label: 'ACTIVE', value: active.length, color: 'var(--green)' },
          { label: 'UNSUBSCRIBED', value: inactive.length, color: 'var(--muted)' },
        ].map((stat, i) => (
          <div key={i} style={{ background: 'var(--bg)', padding: '24px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: stat.color }}>{stat.value}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '2px', marginTop: '6px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Subscribers Table */}
      <div style={{ border: '1px solid var(--border)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', background: 'rgba(0,245,255,0.02)', display: 'grid', gridTemplateColumns: '1fr 140px 140px 80px' }}>
          {['EMAIL', 'SUBSCRIBED', 'STATUS', ''].map((h, i) => (
            <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '2px', color: 'var(--muted)' }}>{h}</div>
          ))}
        </div>

        {subscribers && subscribers.length > 0 ? subscribers.map((sub, i) => (
          <div key={sub.id} style={{
            display: 'grid', gridTemplateColumns: '1fr 140px 140px 80px',
            padding: '14px 20px', borderBottom: i < subscribers.length - 1 ? '1px solid var(--border)' : 'none',
            alignItems: 'center',
          }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem' }}>{sub.email}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)' }}>
              {new Date(sub.subscribed_at).toLocaleDateString('en-GB')}
            </div>
            <div>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                padding: '3px 10px', border: '1px solid',
                borderColor: sub.unsubscribed ? 'var(--border)' : 'rgba(0,255,136,0.3)',
                color: sub.unsubscribed ? 'var(--muted)' : 'var(--green)',
                background: sub.unsubscribed ? 'transparent' : 'rgba(0,255,136,0.06)',
              }}>
                {sub.unsubscribed ? 'UNSUBSCRIBED' : 'ACTIVE'}
              </span>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)' }}>
              {sub.unsubscribed && sub.unsubscribed_at
                ? new Date(sub.unsubscribed_at).toLocaleDateString('en-GB')
                : '—'}
            </div>
          </div>
        )) : (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
            No subscribers yet
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          main { padding: 20px !important; }
          div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr 1fr 1fr !important; }
        }
      `}</style>
    </main>
  )
}
