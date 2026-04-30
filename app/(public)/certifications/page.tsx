'use client'

export default function CertificationsPage() {
  const certs = [
    { icon: '🔐', name: 'ISO/IEC 27001:2022 Information Security Associate', org: 'SkillFront', year: '2025' },
    { icon: '🏢', name: 'Data Centre Certified Associate (DCCA)', org: 'Schneider Electric University', year: '2023' },
    { icon: '⚙️', name: 'Graduate Member — GMNSE', org: 'Nigerian Society of Engineers', year: '2022' },
    { icon: '🛡️', name: 'Network Security Expert NSE 1 & NSE 2', org: 'Fortinet', year: '2020' },
    { icon: '🌐', name: 'Certified Network Security Specialist (CNSS)', org: 'ICSI — International Cybersecurity Institute', year: '2020' },
    { icon: '🖥️', name: 'Computer Networking & Network Server Security', org: 'Alison', year: '2020' },
  ]

  const education = [
    {
      icon: '🎓',
      name: 'MSc Cybersecurity',
      org: 'Teesside University, Middlesbrough, UK',
      year: 'May 2026 – Expected Jan 2028',
      yearColor: 'var(--gold)',
      note: 'AI Research Focus',
      border: 'rgba(255,215,0,0.15)',
    },
    {
      icon: '📚',
      name: 'B.Eng Electrical/Electronics Engineering',
      org: 'Olabisi Onabanjo University, Nigeria',
      year: 'November 2016 – January 2022',
      yearColor: 'var(--cyan)',
      border: 'var(--border)',
    },
  ]

  const learning = [
    { icon: '🔐', name: 'MSc Cybersecurity', status: 'In Progress', pct: 20, gradient: 'linear-gradient(90deg, var(--cyan), var(--green))' },
    { icon: '☁️', name: 'AWS Solutions Architect', status: 'Studying', pct: 45, gradient: 'linear-gradient(90deg, var(--gold), #ff6b35)' },
    { icon: '⚓', name: 'Kubernetes CKA', status: 'Studying', pct: 30, gradient: 'linear-gradient(90deg, var(--purple), var(--cyan))' },
    { icon: '🧠', name: 'AI + Security Research', status: 'Exploring', pct: 20, gradient: 'linear-gradient(90deg, var(--pink), var(--purple))' },
  ]

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <section style={{ padding: '80px 60px' }}>
        <div className="s-label">// CREDENTIALS</div>
        <h2 className="s-h">Certifications &<br /><em>Education</em></h2>

        {/* Certifications Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', marginBottom: '60px' }}>
          {certs.map((cert, i) => (
            <div key={i} style={{
              background: 'var(--bg)', padding: '26px',
              display: 'flex', gap: '14px', alignItems: 'flex-start',
              transition: 'background 0.3s', position: 'relative', overflow: 'hidden',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,245,255,0.015)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)'}
            >
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 0, height: '1px', background: 'var(--cyan)', transition: 'width 0.5s' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.width = '100%'}
              />
              <div style={{ fontSize: '1.6rem', flexShrink: 0 }}>{cert.icon}</div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '3px', lineHeight: 1.3 }}>{cert.name}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.64rem', color: 'var(--muted)' }}>{cert.org}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.64rem', color: 'var(--cyan)', marginTop: '4px' }}>{cert.year}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="s-label" style={{ marginBottom: '20px' }}>// EDUCATION</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', marginBottom: '60px' }}>
          {education.map((edu, i) => (
            <div key={i} style={{
              background: 'var(--bg)', padding: '30px',
              display: 'flex', gap: '16px', alignItems: 'flex-start',
              border: `1px solid ${edu.border}`,
            }}>
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>{edu.icon}</div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>{edu.name}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: 'var(--muted)', marginBottom: '6px' }}>{edu.org}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: edu.yearColor }}>{edu.year}</div>
                {edu.note && (
                  <div style={{
                    display: 'inline-block', marginTop: '8px',
                    border: 'none',
                    background: 'rgba(255,215,0,0.08)',
                    padding: '2px 10px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.62rem', color: 'var(--gold)',
                  }}>{edu.note}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning */}
        <div className="s-label" style={{ marginBottom: '20px' }}>// CURRENTLY LEARNING</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border)' }}>
          {learning.map((item, i) => (
            <div key={i} style={{
              background: 'var(--bg)', padding: '26px 20px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                height: '2px', width: `${item.pct}%`,
                background: item.gradient,
                transition: 'width 1.5s ease',
              }} />
              <div style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{item.icon}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>{item.name}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.66rem', color: 'var(--muted)' }}>
                {item.status} · <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>{item.pct}%</em>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section { padding-left: 18px !important; padding-right: 18px !important; }
          div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr 1fr !important; }
          div[style*="repeat(4, 1fr)"] { grid-template-columns: 1fr 1fr !important; }
          div[style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
