import { requireAdmin } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import DeleteLogButton from './DeleteLogButton'

export default async function AdminLogsPage() {
  await requireAdmin()

  const { data: logs } = await supabaseAdmin
    .from('logs')
    .select('id, title, slug, status, tags, created_at, reading_time')
    .order('created_at', { ascending: false })

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
          <button style={{
            background: 'linear-gradient(135deg, var(--cyan), var(--cyan2))',
            color: 'var(--bg)', border: 'none', padding: '12px 24px',
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem',
            cursor: 'pointer', fontWeight: 700, letterSpacing: '1px',
          }}>
            + NEW POST
          </button>
        </Link>
      </div>

      {/* Posts Table */}
      <div style={{ border: '1px solid var(--border)' }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 120px 100px 120px 100px',
          padding: '14px 20px', borderBottom: '1px solid var(--border)',
          background: 'rgba(0,245,255,0.02)',
        }}>
          {['TITLE', 'STATUS', 'TAGS', 'DATE', 'ACTIONS'].map((h, i) => (
            <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '2px', color: 'var(--muted)' }}>
              {h}
            </div>
          ))}
        </div>

        {logs && logs.length > 0 ? logs.map((log, i) => (
          <div key={log.id} style={{
            display: 'grid', gridTemplateColumns: '1fr 120px 100px 120px 100px',
            padding: '16px 20px',
            borderBottom: i < logs.length - 1 ? '1px solid var(--border)' : 'none',
            alignItems: 'center', transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,245,255,0.01)'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
          >
            {/* Title */}
            <div>
              <div style={{ fontWeight: 600, marginBottom: '3px' }}>{log.title}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)' }}>
                /{log.slug}
              </div>
            </div>

            {/* Status */}
            <div>
              <span className={`badge badge-${log.status}`}>{log.status.toUpperCase()}</span>
            </div>

            {/* Tags */}
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)' }}>
              {log.tags?.slice(0, 2).join(', ') || '—'}
            </div>

            {/* Date */}
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)' }}>
              {new Date(log.created_at).toLocaleDateString('en-GB')}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link href={`/admin/logs/${log.id}/edit`} style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'none', border: '1px solid var(--border)',
                  color: 'var(--cyan)', padding: '4px 10px',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>EDIT</button>
              </Link>
              <DeleteLogButton id={log.id} />
            </div>
          </div>
        )) : (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
            No posts yet. Create your first post!
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          main { padding: 20px !important; }
          div[style*="repeat(5"] { grid-template-columns: 1fr 80px 80px !important; }
        }
      `}</style>
    </main>
  )
}
