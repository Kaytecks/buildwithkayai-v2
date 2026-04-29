'use client'

export default function CybersecPage() {
  const cards = [
    {
      icon: '🧠',
      title: 'AI-Powered Threat Detection',
      desc: 'Exploring ML models that detect unusual infrastructure behaviour patterns before they escalate — moving from reactive to predictive security posture.',
      tags: ['Machine Learning', 'Anomaly Detection', 'MTTD Reduction'],
    },
    {
      icon: '🔐',
      title: 'DevSecOps — Security by Design',
      desc: 'Embedding security into every stage of the CI/CD pipeline as a continuous, automated process that scales with the infrastructure.',
      tags: ['SAST/DAST', 'CI/CD Security', 'IaC Scanning'],
    },
    {
      icon: '⚡',
      title: 'AI-Augmented Incident Response',
      desc: 'Using AI to automate the first critical minutes of incident response — faster triage, intelligent runbook execution, reduced human error under pressure.',
      tags: ['Automation', 'AI Triage', 'Runbooks'],
    },
  ]

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <section style={{
        padding: '80px 60px',
        background: 'var(--bg2)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* BG glows */}
        <div style={{
          position: 'absolute', top: '-200px', right: '-200px',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-200px', left: '-200px',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(0,245,255,0.05), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="s-label">// RESEARCH FRONTIER</div>
        <h2 className="s-h">Cybersecurity<br /><em>Meets AI</em></h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'start' }}>
          {/* Left — text */}
          <div>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '18px' }}>
              My MSc research sits at the intersection of two of the most critical fields in modern technology — <strong style={{ color: 'var(--text)' }}>Cybersecurity</strong> and <strong style={{ color: 'var(--text)' }}>Artificial Intelligence</strong>.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '18px' }}>
              My goal is to explore how <strong style={{ color: 'var(--text)' }}>AI-powered threat detection, anomaly identification, and automated incident response</strong> can make infrastructure inherently more secure — not just at the perimeter, but from within every layer of the stack.
            </p>

            {/* Research box */}
            <div style={{
              background: 'rgba(139,92,246,0.05)',
              border: '1px solid rgba(139,92,246,0.2)',
              padding: '28px', marginTop: '28px', position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: '-9px', left: '20px',
                background: 'var(--bg2)', padding: '0 10px',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem',
                color: 'var(--purple)', letterSpacing: '3px',
              }}>RESEARCH FOCUS</div>
              <p style={{ color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.8 }}>
                <strong style={{ color: 'var(--text)' }}>Research Direction:</strong> Investigating machine learning models for real-time detection of anomalous infrastructure behaviour in cloud environments — building on hands-on experience with Prometheus, Grafana, and AWS CloudWatch to design AI-augmented monitoring systems that reduce mean time to detect (MTTD) and respond (MTTR) to security incidents.
              </p>
            </div>

            {/* Tech interests */}
            <div style={{ marginTop: '30px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '14px' }}>// TOOLS & TECHNOLOGIES OF INTEREST</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['LangChain', 'RAG', 'Vector Databases', 'SIEM Systems', 'Threat Intelligence', 'ML Pipelines', 'Supabase pgvector', 'Python AI/ML', 'Zero Trust Architecture', 'SOAR'].map((tag, i) => (
                  <span key={i} style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.67rem',
                    border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa',
                    padding: '4px 10px', background: 'rgba(139,92,246,0.05)',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {cards.map((card, i) => (
              <div key={i} style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                padding: '32px', position: 'relative', overflow: 'hidden',
                transition: 'all 0.4s',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(139,92,246,0.3)'
                  ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(139,92,246,0.03)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLDivElement).style.background = 'var(--card)'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, var(--purple), var(--cyan))' }} />
                <div style={{ fontSize: '1.8rem', marginBottom: '14px' }}>{card.icon}</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>{card.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.75 }}>{card.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '14px' }}>
                  {card.tags.map((tag, j) => (
                    <span key={j} style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
                      border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa',
                      padding: '3px 8px', background: 'rgba(139,92,246,0.05)',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section { padding-left: 18px !important; padding-right: 18px !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
