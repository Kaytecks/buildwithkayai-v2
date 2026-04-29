'use client'

export default function AboutPage() {
  const journey = [
    { dot: '#ff6b35', title: 'Network Engineer Intern', sub: 'OOU ICT · 2020–2022', tag: 'FOUNDATION' },
    { dot: 'var(--purple)', title: 'DevOps Volunteer · USA', sub: 'Coils Tech · 2022', tag: 'GLOBAL EXPOSURE' },
    { dot: 'var(--cyan)', title: 'Corper → DevOps Engineer', sub: 'Cloud Exchange · 2022–2025', tag: '3 YEAR GROWTH' },
    { dot: 'var(--green)', title: 'DevOps & SRE Engineer', sub: 'Fringe Infrastructure · 2025–2026', tag: 'VMS · SECURE FILE SHARE' },
    { dot: 'var(--gold)', title: 'MSc Cybersecurity · UK', sub: 'Teesside University · May 2026', tag: 'ENROLLED · AI RESEARCH', tagColor: 'var(--gold)', tagBorder: 'rgba(255,215,0,0.3)' },
  ]

  const skills = [
    { icon: '⚡', name: 'DEVOPS & AUTOMATION', tags: ['Terraform', 'Jenkins', 'GitHub Actions', 'Ansible', 'CI/CD', 'CloudFormation'], type: 'c' },
    { icon: '☁️', name: 'CLOUD PLATFORMS', tags: ['AWS ECS/Fargate', 'EC2', 'S3/SNS', 'IAM/VPC', 'Azure', 'CloudWatch'], type: 'g' },
    { icon: '🐳', name: 'CONTAINERS & ORCHESTRATION', tags: ['Docker', 'Kubernetes', 'EKS', 'Microservices'], type: 'p' },
    { icon: '🔐', name: 'SECURITY & COMPLIANCE', tags: ['ISO 27001', 'ISO 22301', 'PCI DSS', 'SAST/DAST', 'NACLs', 'Encryption'], type: 'o' },
    { icon: '📊', name: 'MONITORING & OBSERVABILITY', tags: ['Prometheus', 'Grafana', 'CloudWatch', 'Alerting'], type: 'c' },
    { icon: '🐍', name: 'SCRIPTING & DEVELOPMENT', tags: ['Python', 'Boto3', 'Bash', 'YAML/JSON', 'SQL', 'SHELL'], type: 'g' },
  ]

  const metrics = [
    { value: '90', suffix: '%', label: 'PROCESSING TIME CUT', desc: 'VMS automated manual approval', type: 'mc' },
    { value: '98', suffix: '%', label: 'USER ADOPTION RATE', desc: 'Organisation-wide acceptance', type: 'mg' },
    { value: '99', suffix: '%', label: 'EFFICIENCY GAIN', desc: 'Workflow automation result', type: 'mc' },
    { value: '50', suffix: '%', label: 'FASTER PROVISIONING', desc: 'Terraform IaC improvement', type: 'mg' },
  ]

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      {/* About Section */}
      <section style={{ padding: '80px 60px' }}>
        <div className="s-label">// ABOUT ME</div>
        <h2 className="s-h">The Engineer<br />Behind the <em>Code</em></h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* Text */}
          <div>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '18px' }}>
              I'm <strong style={{ color: 'var(--text)' }}>Kehinde Afolarin Oyekunle</strong> — a DevOps & Site Reliability Engineer who started as a <strong style={{ color: 'var(--text)' }}>Youth Corper</strong> walking into a Data Centre in Lagos with nothing but curiosity and a hunger to learn.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '18px' }}>
              3+ years later, I had built production systems from scratch, passed ISO audits, automated infrastructure, deployed applications used by entire organisations daily, and led a team of 6 engineers.
            </p>
            <div style={{
              background: 'rgba(0,245,255,0.04)',
              borderLeft: '2px solid var(--cyan)',
              padding: '16px 20px', margin: '24px 0',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem', color: 'var(--cyan)', lineHeight: 1.7,
            }}>
              "Security and infrastructure are not two separate conversations. Every deployment decision is a security decision."
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '18px' }}>
              Now based in <strong style={{ color: 'var(--text)' }}>Middlesbrough, UK</strong>, I'm pursuing an <strong style={{ color: 'var(--text)' }}>MSc in Cybersecurity</strong> at Teesside University — exploring the intersection of <strong style={{ color: 'var(--text)' }}>AI and Cybersecurity</strong> as my research focus.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.9 }}>
              I'm actively seeking <strong style={{ color: 'var(--text)' }}>remote DevOps, SRE, or Cloud Infrastructure</strong> opportunities with global companies — contractor, freelance, or full-time.
            </p>
          </div>

          {/* Journey Card */}
          <div style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            overflow: 'hidden', position: 'sticky', top: '90px',
          }}>
            <div style={{
              padding: '18px 24px', borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <div style={{ display: 'flex', gap: '5px' }}>
                {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                  <div key={i} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />
                ))}
              </div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.63rem', color: 'var(--muted)', letterSpacing: '2px', marginLeft: '4px' }}>
                CAREER_JOURNEY.LOG
              </span>
            </div>
            <div style={{ padding: '24px' }}>
              {journey.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: '24px', position: 'relative' }}>
                  {i < journey.length - 1 && (
                    <div style={{
                      position: 'absolute', left: '4px', top: '14px',
                      bottom: '-14px', width: '1px', background: 'var(--border)',
                    }} />
                  )}
                  <div style={{
                    width: '9px', height: '9px', borderRadius: '50%',
                    background: step.dot, boxShadow: `0 0 8px ${step.dot}`,
                    flexShrink: 0, marginTop: '4px',
                  }} />
                  <div>
                    <h4 style={{ fontSize: '0.84rem', fontWeight: 700, marginBottom: '2px' }}>{step.title}</h4>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.66rem', color: 'var(--muted)' }}>{step.sub}</p>
                    <span style={{
                      display: 'inline-block',
                      border: `1px solid ${step.tagBorder || 'rgba(0,245,255,0.2)'}`,
                      color: step.tagColor || 'var(--cyan)',
                      padding: '2px 7px', fontSize: '0.6rem', marginTop: '5px',
                      fontFamily: 'JetBrains Mono, monospace',
                      background: step.tagColor ? 'rgba(255,215,0,0.05)' : 'rgba(0,245,255,0.05)',
                    }}>{step.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {metrics.map((m, i) => (
            <div key={i} style={{
              padding: '50px 20px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              transition: 'background 0.4s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,245,255,0.02)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '2px' }}>
                <span style={{
                  fontSize: '3.5rem', fontWeight: 900, fontFamily: 'Syne, sans-serif',
                  background: m.type === 'mc'
                    ? 'linear-gradient(135deg, var(--cyan), var(--cyan2))'
                    : 'linear-gradient(135deg, var(--green), var(--cyan))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{m.value}</span>
                <span style={{
                  fontSize: '1.8rem', fontWeight: 900, fontFamily: 'Syne, sans-serif',
                  background: m.type === 'mc'
                    ? 'linear-gradient(135deg, var(--cyan), var(--cyan2))'
                    : 'linear-gradient(135deg, var(--green), var(--cyan))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{m.suffix}</span>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '2px', color: 'var(--muted)', marginTop: '10px' }}>{m.label}</div>
              <div style={{ fontSize: '0.73rem', color: 'rgba(240,244,248,0.25)', marginTop: '5px' }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <section style={{ padding: '80px 60px' }}>
        <div className="s-label">// TECHNICAL ARSENAL</div>
        <h2 className="s-h">Skills & <em>Stack</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)' }}>
          {skills.map((skill, i) => (
            <div key={i} style={{
              background: 'var(--bg)', padding: '30px',
              transition: 'background 0.3s', position: 'relative', overflow: 'hidden',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,245,255,0.015)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)'}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{skill.icon}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.66rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '12px' }}>{skill.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {skill.tags.map((tag, j) => (
                  <span key={j} className={`sk-tag ${skill.type}`}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section { padding-left: 18px !important; padding-right: 18px !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 40px !important; }
          div[style*="repeat(4, 1fr)"] { grid-template-columns: 1fr 1fr !important; }
          div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  )
}
