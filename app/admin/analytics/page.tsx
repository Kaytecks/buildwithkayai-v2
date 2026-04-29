import { requireAdmin } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export default async function AnalyticsPage() {
  await requireAdmin()

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const [
    { data: events },
    { count: totalViews },
    { count: chatCount },
    { count: contactCount },
    { count: subscribeCount },
    { data: recentEvents },
  ] = await Promise.all([
    supabaseAdmin.from('analytics').select('page, event, created_at').gte('created_at', thirtyDaysAgo.toISOString()),
    supabaseAdmin.from('analytics').select('*', { count: 'exact', head: true }).gte('created_at', thirtyDaysAgo.toISOString()),
    supabaseAdmin.from('analytics').select('*', { count: 'exact', head: true }).eq('page', 'ai-copilot').gte('created_at', thirtyDaysAgo.toISOString()),
    supabaseAdmin.from('analytics').select('*', { count: 'exact', head: true }).eq('page', 'contact').gte('created_at', thirtyDaysAgo.toISOString()),
    supabaseAdmin.from('analytics').select('*', { count: 'exact', head: true }).eq('event', 'subscription').gte('created_at', thirtyDaysAgo.toISOString()),
    supabaseAdmin.from('analytics').select('page, event, created_at').order('created_at', { ascending: false }).limit(20),
  ])

  // Page view breakdown
  const pageViews: Record<string, number> = {}
  events?.forEach(e => {
    if (e.page) pageViews[e.page] = (pageViews[e.page] || 0) + 1
  })

  const topPages = Object.entries(pageViews)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)

  const maxPageViews = topPages[0]?.[1] || 1

  const stats = [
    { label: 'TOTAL EVENTS (30 DAYS)', value: totalViews || 0, color: 'var(--cyan)' },
    { label: 'AI COPILOT CHATS', value: chatCount || 0, color: 'var(--purple)' },
    { label: 'CONTACT FORMS', value: contactCount || 0, color: 'var(--green)' },
    { label: 'NEW SUBSCRIBERS', value: subscribeCount || 0, color: 'var(--gold)' },
  ]

  return (
    <main style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <div className="s-label">// ANALYTICS</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px' }}>
          Site <span style={{ color: 'var(--cyan)' }}>Analytics</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', marginTop: '6px' }}>
          Last 30 days
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border)', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ background: 'var(--bg)', padding: '28px 20px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: stat.color, lineHeight: 1 }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '1px', marginTop: '8px', lineHeight: 1.4 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Top Pages */}
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '16px' }}>
            // TOP PAGES
          </div>
          <div style={{ border: '1px solid var(--border)' }}>
            {topPages.length > 0 ? topPages.map(([page, count], i) => (
              <div key={i} style={{
                padding: '14px 18px',
                borderBottom: i < topPages.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text)' }}>
                    /{page}
                  </span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--cyan)' }}>
                    {count}
                  </span>
                </div>
                {/* Bar */}
                <div style={{ height: '3px', background: 'var(--border)', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    height: '100%', width: `${(count / maxPageViews) * 100}%`,
                    background: 'linear-gradient(90deg, var(--cyan), var(--purple))',
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            )) : (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>
                No data yet
              </div>
            )}
          </div>
        </div>

        {/* Recent Events */}
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '16px' }}>
            // RECENT EVENTS
          </div>
          <div style={{ border: '1px solid var(--border)' }}>
            {recentEvents && recentEvents.length > 0 ? recentEvents.map((event, i) => (
              <div key={i} style={{
                padding: '12px 18px',
                borderBottom: i < recentEvents.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                    color: 'var(--cyan)', border: '1px solid rgba(0,245,255,0.2)',
                    padding: '2px 6px', background: 'rgba(0,245,255,0.04)',
                  }}>{event.page}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: 'var(--muted)' }}>
                    {event.event}
                  </span>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--muted)' }}>
                  {new Date(event.created_at).toLocaleDateString('en-GB')}
                </span>
              </div>
            )) : (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>
                No events yet
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          main { padding: 20px !important; }
          div[style*="repeat(4, 1fr)"] { grid-template-columns: 1fr 1fr !important; }
          div[style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
