'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = () => {
    fetch('/api/admin/logs')
      .then(r => r.json())
      .then(data => { setLogs(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/admin/logs/${id}`, { method: 'DELETE' })
    fetchLogs()
  }

  return (
    <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
          <div className="s-label">// LOGS MANAGER</div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px' }}>
            All <span style={{ color: 'var(--cyan)' }}>Posts</span>
          </h1>
        </div>
        <Link href="/admin/logs/new" style={{ textDecoration: 'none' }}>
          <button style={{ background: 'linear-gradient(135deg, var(--cyan), var(--cyan2))', color: 'var(--bg)', border: 'none', padding: '12px 24px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 700, letterSpacing: '1px' }}>
            + NEW POST
          </button>
        </Link>
      </div>

      <div style={{ border: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 120px 100px', padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'rgba(0,245,255,0.02)' }}>
          {['TITLE', 'STATUS', 'TAGS', 'DATE', 'ACTIONS'].map((h, i) => (
            <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '2px', color: 'var(--muted)' }}>{h}</div>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>LOADING...</div>
        ) : logs.length > 0 ? logs.map((log, i) => (
          <div key={log.id} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 120px 100px', padding: '16px 20px', borderBottom: i < logs.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,245,255,0.01)'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
          >
            <div>
              <div style={{ fontWeight: 600, marginBottom: '3px' }}>{log.title}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)' }}>/{log.slug}</div>
            </div>
            <div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', padding: '3px 10px', border: '1px solid', borderColor: log.status === 'published' ? 'rgba(0,255,136,0.3)' : 'var(--border)', color: log.status === 'published' ? 'var(--green)' : 'var(--muted)', background: log.status === 'published' ? 'rgba(0,255,136,0.06)' : 'transparent' }}>
                {log.status.toUpperCase()}
              </span>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)' }}>
              {log.tags?.slice(0, 2).join(', ') || '—'}
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)' }}>
              {new Date(log.created_at).toLocaleDateString('en-GB')}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link href={`/admin/logs/${log.id}/edit`} style={{ textDecoration: 'none' }}>
                <button style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--cyan)', padding: '4px 10px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', cursor: 'pointer' }}>EDIT</button>
              </Link>
              <button onClick={() => handleDelete(log.id)} style={{ background: 'none', border: '1px solid rgba(255,45,155,0.3)', color: 'var(--pink)', padding: '4px 10px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', cursor: 'pointer' }}>DEL</button>
            </div>
          </div>
        )) : (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>No posts yet. Create your first post!</div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          main { padding: 20px !important; }
          div[style*="repeat(5"] { grid-template-columns: 1fr 80px 80px !important; }
        }
      `}} />
    </main>
  )
}
