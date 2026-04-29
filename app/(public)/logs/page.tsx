import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import SubscribeForm from './SubscribeForm'

export const revalidate = 60 // revalidate every 60 seconds

export default async function LogsPage() {
  const { data: logs } = await supabase
    .from('logs')
    .select('id, title, slug, excerpt, cover_image, tags, linkedin_url, created_at, reading_time')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <section style={{ padding: '80px 60px' }}>
        <div className="s-label">// FIELD NOTES</div>
        <h2 className="s-h">LOGS <em>& Posts</em></h2>

        <p style={{ color: 'var(--muted)', maxWidth: '560px', marginBottom: '50px', lineHeight: 1.8 }}>
          Thoughts, breakdowns, and lessons from the field. Career reflections, project deep-dives, and everything at the intersection of DevOps, cybersecurity, and AI.
        </p>

        {/* Subscribe */}
        <SubscribeForm />

        {/* Posts Grid */}
        {logs && logs.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border)', marginTop: '60px' }}>
            {logs.map((log) => (
              <div key={log.id} style={{
                background: 'var(--bg)', overflow: 'hidden',
                transition: 'background 0.3s', position: 'relative',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,245,255,0.01)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)'}
              >
                {/* Cover Image */}
                {log.cover_image ? (
                  <img
                    src={log.cover_image}
                    alt={log.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', borderBottom: '1px solid var(--border)' }}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '200px',
                    background: 'linear-gradient(135deg, rgba(0,245,255,0.05), rgba(139,92,246,0.05))',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
                    color: 'var(--muted)', letterSpacing: '2px',
                  }}>
                    BUILDWITHKAYAI.COM
                  </div>
                )}

                <div style={{ padding: '28px' }}>
                  {/* Meta */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.63rem', color: 'var(--muted)', letterSpacing: '1px' }}>
                      {new Date(log.created_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase()}
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

                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 800, marginBottom: '10px', lineHeight: 1.3 }}>
                    {log.title}
                  </h3>

                  {log.excerpt && (
                    <p style={{ color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.7, marginBottom: '18px' }}>
                      {log.excerpt}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Link href={`/logs/${log.slug}`} style={{ textDecoration: 'none' }}>
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem',
                        color: 'var(--cyan)', letterSpacing: '1px',
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        transition: 'gap 0.2s',
                      }}>[ READ POST → ]</span>
                    </Link>
                    {log.linkedin_url && (
                      <a href={log.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <span style={{
                          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem',
                          color: 'var(--muted)', letterSpacing: '1px',
                        }}>[ LINKEDIN → ]</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            border: '1px solid var(--border)', padding: '60px',
            textAlign: 'center', marginTop: '60px',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px', opacity: 0.3 }}>📝</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '2px' }}>
              FIRST LOG COMING SOON
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '10px' }}>
              Subscribe below to be notified when the first post drops.
            </div>
          </div>
        )}
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          section { padding-left: 18px !important; padding-right: 18px !important; }
          div[style*="repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}} />
    </main>
  )
}
