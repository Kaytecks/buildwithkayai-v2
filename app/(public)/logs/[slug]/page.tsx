import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

export default async function LogPostPage({ params }: { params: { slug: string } }) {
  const { data: log } = await supabase
    .from('logs')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  if (!log) notFound()

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 60px' }}>
        {/* Back link */}
        <Link href="/logs" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
            color: 'var(--muted)', letterSpacing: '2px',
            marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'color 0.2s', cursor: 'pointer',
          }}>← BACK TO LOGS
          </div>
        </Link>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.63rem', color: 'var(--muted)', letterSpacing: '1px' }}>
            {new Date(log.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}
          </span>
          {log.reading_time && (
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.63rem', color: 'var(--muted)' }}>
              {log.reading_time} MIN READ
            </span>
          )}
          {log.tags?.map((tag: string, i: number) => (
            <span key={i} style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
              border: '1px solid rgba(0,245,255,0.2)', color: 'var(--cyan)',
              padding: '2px 8px', background: 'rgba(0,245,255,0.04)',
            }}>#{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 900, lineHeight: 1.1,
          letterSpacing: '-1px', marginBottom: '30px',
        }}>{log.title}</h1>

        {/* Cover image */}
        {log.cover_image && (
          <img
            src={log.cover_image}
            alt={log.title}
            style={{
              width: '100%', height: '300px', objectFit: 'cover',
              marginBottom: '40px', display: 'block',
              border: '1px solid var(--border)',
            }}
          />
        )}

        {/* Content */}
        <div style={{
          color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.9,
          whiteSpace: 'pre-line',
        }}>
          {log.content}
        </div>

        {/* LinkedIn link */}
        {log.linkedin_url && (
          <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid var(--border)' }}>
            <a href={log.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem',
                color: 'var(--cyan)', letterSpacing: '1px',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
              }}>
                [ VIEW ORIGINAL ON LINKEDIN → ]
              </div>
            </a>
          </div>
        )}

        {/* Back */}
        <div style={{ marginTop: '60px' }}>
          <Link href="/logs" style={{ textDecoration: 'none' }}>
            <button className="btn-secondary">← BACK TO ALL LOGS</button>
          </Link>
        </div>
      </article>

      <style>{`
        @media (max-width: 900px) {
          article { padding: 60px 18px !important; }
        }
      `}</style>
    </main>
  )
}
