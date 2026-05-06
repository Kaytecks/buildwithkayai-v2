'use client'

import { useState, useEffect } from 'react'

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const stats = [
    { label: 'TOTAL EVENTS (30 DAYS)', value: data?.totalViews || 0, color: 'var(--cyan)' },
    { label: 'AI COPILOT CHATS', value: data?.chatCount || 0, color: 'var(--purple)' },
    { label: 'CONTACT FORMS', value: data?.contactCount || 0, color: 'var(--green)' },
    { label: 'NEW SUBSCRIBERS', value: data?.subscribeCount || 0, color: 'var(--gold)' },
  ]

  const topPages = data?.topPages || []
  const recentEvents = data?.recentEvents || []
  const maxPageViews = topPages[0]?.[1] || 1

  return (
    <main style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <div className="s-label">// ANALYTICS</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px' }}>
          Site <span style={{ color: 'var(--cyan)' }}>Analytics</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', marginTop: '6px' }}>Last 30 days</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border)', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ background: 'var(--bg)', padding: '28px 20px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: stat.color, lineHeight: 1 }}>
              {loading ? '...' : stat.value}
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '1px', marginTop: '8px', lineHeight: 1.4 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '16px' }}>// TOP PAGES</div>
          <div style={{ border: '1px solid var(--border)' }}>
            {loading ? (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>LOADING...</div>
            ) : topPages.length > 0 ? topPages.map(([page, count]: [string, number], i: number) => (
              <div key={i} style={{ padding: '14px 18px', borderBottom: i < topPages.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text)' }}>/{page}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--cyan)' }}>{count}</span>
                </div>
                <div style={{ height: '3px', background: 'var(--border)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${(count / maxPageViews) * 100}%`, background: 'linear-gradient(90deg, var(--cyan), var(--purple))' }} />
                </div>
              </div>
            )) : (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>No data yet</div>
            )}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '16px' }}>// RECENT EVENTS</div>
          <div style={{ border: '1px solid var(--border)' }}>
            {loading ? (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>LOADING...</div>
            ) : recentEvents.length > 0 ? recentEvents.map((event: any, i: number) => (
              <div key={i} style={{ padding: '12px 18px', borderBottom: i < recentEvents.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--cyan)', border: '1px solid rgba(0,245,255,0.2)', padding: '2px 6px', background: 'rgba(0,245,255,0.04)' }}>{event.page}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: 'var(--muted)' }}>{event.event}</span>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--muted)' }}>{new Date(event.created_at).toLocaleDateString('en-GB')}</span>
              </div>
            )) : (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>No events yet</div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          main { padding: 20px !important; }
          div[style*="repeat(4, 1fr)"] { grid-template-columns: 1fr 1fr !important; }
          div[style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}} />
    </main>
  )
}
