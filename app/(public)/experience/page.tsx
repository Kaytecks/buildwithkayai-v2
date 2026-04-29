export { experienceMetadata as metadata } from '@/lib/metadata'

export default function ExperiencePage() {
  const timeline = [
    {
      dates: 'AUG 2025\nAPR 2026',
      dot: 'var(--green)',
      company: 'FRINGE INFRASTRUCTURE LTD · LAGOS, NIGERIA',
      role: 'DevOps & Site Reliability Engineer',
      desc: 'Built and deployed VMS and Secure File Share from concept to production. Led incident response, designed DR strategies, built observability stacks, maintained ISO/PCI DSS compliance. Reduced processing time by 90%, achieved 98% adoption.',
      tags: ['AWS', 'Terraform', 'Python', 'Grafana', 'ISO 27001', 'PCI DSS'],
    },
    {
      dates: 'DEC 2022\nJUL 2025',
      dot: 'var(--cyan)',
      company: 'CLOUD EXCHANGE DATA CENTRE · LAGOS, NIGERIA',
      role: 'DevOps Engineer (Started as NYSC Corps Member)',
      desc: 'Joined as a Youth Corper and grew into a full DevOps Engineer over 3 years. Managed AWS infrastructure, built CI/CD pipelines, containerised with Docker/Kubernetes, led ISO 27001 & 22301 audits, led team of 6 engineers. Terraform reduced provisioning by 50%.',
      tags: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'ISO 27001'],
    },
    {
      dates: 'FEB 2022\nOCT 2022',
      dot: 'var(--purple)',
      company: 'COILS TECH · UNITED STATES (REMOTE)',
      role: 'DevOps Engineer (Volunteer)',
      desc: 'Managed enterprise AWS infrastructure, conducted cloud security audits, supported on-prem to cloud migrations, and automated operational tasks with Python and Bash.',
      tags: ['AWS', 'IAM', 'Python', 'Bash'],
    },
    {
      dates: 'JUN 2020\nOCT 2022',
      dot: '#ff6b35',
      company: 'OLABISI ONABANJO UNIVERSITY ICT · NIGERIA',
      role: 'Network Engineer Intern',
      desc: 'Designed and maintained campus-wide network infrastructure for thousands of users. Managed routers, switches, wireless access points and monitored base stations for uninterrupted connectivity.',
      tags: ['Networking', 'Routers', 'Switches', 'IP Management'],
    },
  ]

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <section style={{ padding: '80px 60px' }}>
        <div className="s-label">// WORK HISTORY</div>
        <h2 className="s-h">Career <em>Timeline</em></h2>

        <div style={{ maxWidth: '780px' }}>
          {timeline.map((item, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '110px 1fr',
              gap: '35px',
              marginBottom: '50px',
              position: 'relative',
            }}>
              {/* Vertical line */}
              {i < timeline.length - 1 && (
                <div style={{
                  position: 'absolute', left: '109px', top: '8px',
                  bottom: '-40px', width: '1px', background: 'var(--border)',
                }} />
              )}

              {/* Date */}
              <div style={{ textAlign: 'right', paddingTop: '3px' }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.66rem', color: 'var(--muted)',
                  letterSpacing: '1px', lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                }}>{item.dates}</div>
              </div>

              {/* Dot */}
              <div style={{
                position: 'absolute', left: '103px', top: '4px',
                width: '14px', height: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: item.dot, boxShadow: `0 0 10px ${item.dot}`,
                }} />
              </div>

              {/* Content */}
              <div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.66rem', letterSpacing: '2px',
                  color: 'var(--cyan)', marginBottom: '4px',
                }}>{item.company}</div>
                <div style={{
                  fontFamily: 'Syne, sans-serif', fontSize: '1.1rem',
                  fontWeight: 800, marginBottom: '7px',
                }}>{item.role}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.75 }}>
                  {item.desc}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
                  {item.tags.map((tag, j) => (
                    <span key={j} style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                      border: '1px solid var(--border)', color: 'var(--muted)', padding: '2px 7px',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section { padding-left: 18px !important; padding-right: 18px !important; }
          div[style*="gridTemplateColumns: 110px"] { grid-template-columns: 80px 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </main>
  )
}
