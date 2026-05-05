'use client'

export default function ProjectsPage() {
  const projects = [
    {
      num: '01',
      badge: '● LIVE IN PRODUCTION · AWS',
      badgeColor: 'var(--green)',
      title: 'Visitor Management System',
      desc: 'End-to-end automated web application built from concept to production. Eliminated all paper-based manual processes. Automated registration, approval workflows, and notifications. Full Disaster Recovery strategy included.',
      kpis: [{ v: '90%', l: 'TIME SAVED' }, { v: '99%', l: 'EFFICIENCY' }, { v: '98%', l: 'ADOPTION' }],
      stack: ['AWS ECS Fargate', 'Terraform', 'Python/Boto3', 'Grafana', 'Prometheus', 'SNS', 'ISO 27001', 'PCI DSS'],
    },
    {
      num: '02',
      badge: '● LIVE · COMPLIANCE-FIRST DESIGN',
      badgeColor: 'var(--green)',
      title: 'Secure File Share Platform',
      desc: 'Internal secure file sharing system built within a regulated data centre. Designed with security at its core — every file transfer meets ISO and PCI DSS standards with zero tolerance for compliance gaps.',
      kpis: [{ v: '100%', l: 'COMPLIANT' }, { v: 'ISO', l: 'CERTIFIED' }],
      stack: ['AWS S3', 'IAM Policies', 'Encryption', 'Python', 'PCI DSS', 'VPC'],
    },
    {
      num: '03',
      badge: '● OBSERVABILITY STACK',
      badgeColor: 'var(--cyan)',
      title: 'Infrastructure Monitoring Platform',
      desc: 'Full real-time observability using Prometheus and Grafana for EC2 and database performance. Custom alerting to detect anomalies before they become incidents. Zero SLA breaches during tenure.',
      kpis: [],
      stack: ['Prometheus', 'Grafana', 'CloudWatch', 'EC2', 'RDS', 'Custom Alerting'],
    },
    {
      num: '04',
      badge: '● INFRASTRUCTURE AS CODE',
      badgeColor: 'var(--cyan)',
      title: 'AWS Infrastructure Automation Suite',
      desc: 'Automated full AWS environment provisioning with Terraform and CloudFormation. Cut setup time by 50%. Includes VPC, IAM least-privilege, security groups, backup automation and DR runbooks.',
      kpis: [{ v: '50%', l: 'FASTER SETUP' }],
      stack: ['Terraform', 'CloudFormation', 'VPC', 'IAM', 'Boto3', 'Backup Automation'],
    },
  ]

  const archCols = [
    { label: 'CLIENT', items: ['Web Portal', 'Mobile'], type: 'ac' },
    { label: 'COMPUTE', items: ['ECS Fargate', 'EC2'], type: 'ag' },
    { label: 'MESSAGING', items: ['AWS SNS', 'SQS'], type: 'ap' },
    { label: 'STORAGE', items: ['S3 Buckets', 'RDS'], type: 'ao' },
    { label: 'OBSERVABILITY', items: ['Prometheus', 'Grafana'], type: 'ac' },
  ]

  const archColors: Record<string, string> = {
    ac: 'var(--cyan)', ag: 'var(--green)', ap: '#a78bfa', ao: '#ff8c6b',
  }

  const archBorders: Record<string, string> = {
    ac: 'rgba(0,245,255,0.2)', ag: 'rgba(0,255,136,0.2)',
    ap: 'rgba(139,92,246,0.3)', ao: 'rgba(255,107,53,0.3)',
  }

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <section style={{ padding: '80px 60px' }}>
        <div className="s-label">// WHAT I'VE BUILT</div>
        <h2 className="s-h">Featured <em>Projects</em></h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '1px', background: 'var(--border)' }}>
          {projects.map((p, i) => (
            <div key={i} style={{
              background: 'var(--bg)', padding: '42px',
              position: 'relative', overflow: 'hidden',
              transition: 'background 0.4s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,245,255,0.015)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)'}
            >
              {/* Hover sweep */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
                opacity: 0, transition: 'opacity 0.3s',
              }} />

              <div style={{
                fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900,
                color: 'rgba(0,245,255,0.05)', lineHeight: 1,
                marginBottom: '16px', fontFamily: 'Syne, sans-serif',
              }}>{p.num}</div>

              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                letterSpacing: '2px', color: p.badgeColor,
                marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '7px',
              }}>{p.badge}</div>

              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                fontWeight: 800, letterSpacing: '-0.3px',
                marginBottom: '10px', lineHeight: 1.2,
              }}>{p.title}</h3>

              <p style={{ color: 'var(--muted)', fontSize: '0.87rem', lineHeight: 1.75, marginBottom: '20px' }}>
                {p.desc}
              </p>

              {p.kpis.length > 0 && (
                <div style={{
                  display: 'flex', gap: '20px',
                  padding: '16px 0',
                  borderTop: '1px solid var(--border)',
                  borderBottom: '1px solid var(--border)',
                  marginBottom: '20px',
                }}>
                  {p.kpis.map((kpi, j) => (
                    <div key={j}>
                      <div style={{
                        fontSize: '1.4rem', fontWeight: 900,
                        background: 'linear-gradient(135deg, var(--cyan), var(--green))',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text', fontFamily: 'Syne, sans-serif',
                      }}>{kpi.v}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '1px' }}>{kpi.l}</div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {p.stack.map((tag, j) => (
                  <span key={j} style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
                    color: 'var(--muted)', border: '1px solid var(--border)',
                    padding: '3px 8px', transition: 'all 0.3s',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Diagram */}
      <div style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '50px 60px' }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
          letterSpacing: '4px', color: 'var(--muted)', marginBottom: '32px',
        }}>// VMS ARCHITECTURE · AWS PRODUCTION ENVIRONMENT</div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
          position: 'relative',
        }}>
          {/* Connection line */}
          <div style={{
            position: 'absolute', top: '50%', left: '5%', right: '5%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.15), rgba(139,92,246,0.15), rgba(0,255,136,0.15), transparent)',
          }} />

          {archCols.map((col, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '0 6px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.56rem', letterSpacing: '2px', color: 'var(--muted)', marginBottom: '8px', textAlign: 'center' }}>
                {col.label}
              </div>
              {col.items.map((item, j) => (
                <div key={j} style={{
                  width: '100%', padding: '9px 6px', textAlign: 'center',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.63rem',
                  border: `1px solid ${archBorders[col.type]}`,
                  color: archColors[col.type],
                  background: `${archColors[col.type]}08`,
                  transition: 'all 0.3s', cursor: 'default',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
          {['IAM Least Privilege', 'PCI DSS Compliant', 'ISO 27001 Aligned', 'DR Strategy Implemented', 'Terraform Provisioned', 'Backup Automated'].map((badge, i) => (
            <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: 'var(--green)' }}>✓</span>{badge}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section { padding-left: 18px !important; padding-right: 18px !important; }
          div[style*="repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
          div[style*="repeat(5, 1fr)"] { grid-template-columns: repeat(3, 1fr) !important; }
          div[style*="padding: 50px 60px"] { padding: 30px 18px !important; }
        }
      `}</style>
    </main>
  )
}
