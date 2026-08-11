'use client'

import { useState } from 'react'

type Project = {
  num: string
  badge: string
  badgeColor: string
  title: string
  desc: string
  kpis: { v: string; l: string }[]
  stack: string[]
  categories: ('DevOps' | 'Security')[]
  links?: { label: string; url: string }[]
  private?: boolean
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'DevOps' | 'Security'>('DevOps')

  const projects: Project[] = [
    {
      num: '01',
      badge: '● LIVE IN PRODUCTION · AWS',
      badgeColor: 'var(--green)',
      title: 'Visitor Management System',
      desc: 'Designed and shipped a full visitor management platform from concept to production, replacing an entirely paper-based process. Built the registration, approval, and notification workflows, and the disaster recovery strategy behind them.',
      kpis: [{ v: '90%', l: 'TIME SAVED' }, { v: '99%', l: 'EFFICIENCY' }, { v: '98%', l: 'ADOPTION' }],
      stack: ['AWS ECS Fargate', 'Terraform', 'Python/Boto3', 'Grafana', 'Prometheus', 'SNS', 'ISO 27001', 'PCI DSS'],
      categories: ['DevOps'],
      private: true,
    },
    {
      num: '02',
      badge: '● LIVE · COMPLIANCE-FIRST DESIGN',
      badgeColor: 'var(--green)',
      title: 'Secure File Share Platform',
      desc: 'Built an internal secure file sharing system inside a regulated data centre, with every transfer meeting ISO 27001 and PCI DSS. Designed the access controls and encryption so there were no compliance gaps to close later.',
      kpis: [{ v: '100%', l: 'COMPLIANT' }, { v: 'ISO', l: 'CERTIFIED' }],
      stack: ['AWS S3', 'IAM Policies', 'Encryption', 'Python', 'PCI DSS', 'VPC'],
      categories: ['DevOps', 'Security'],
      private: true,
    },
    {
      num: '03',
      badge: '● OBSERVABILITY STACK',
      badgeColor: 'var(--cyan)',
      title: 'Infrastructure Monitoring Platform',
      desc: 'Built real-time observability across EC2 and databases with Prometheus and Grafana. Wrote custom alerting that caught anomalies before they became incidents, with zero SLA breaches during my time on it.',
      kpis: [],
      stack: ['Prometheus', 'Grafana', 'CloudWatch', 'EC2', 'RDS', 'Custom Alerting'],
      categories: ['DevOps'],
      private: true,
    },
    {
      num: '04',
      badge: '● INFRASTRUCTURE AS CODE',
      badgeColor: 'var(--cyan)',
      title: 'AWS Infrastructure Automation Suite',
      desc: 'Automated full AWS environment provisioning with Terraform and CloudFormation, cutting setup time in half. Covered VPC, least-privilege IAM, security groups, backup automation, and DR runbooks.',
      kpis: [{ v: '50%', l: 'FASTER SETUP' }],
      stack: ['Terraform', 'CloudFormation', 'VPC', 'IAM', 'Boto3', 'Backup Automation'],
      categories: ['DevOps'],
      private: true,
    },
    {
      num: '05',
      badge: '● HOME LAB · DETECTION ENGINEERING',
      badgeColor: 'var(--green)',
      title: 'SIEM Detection Lab — Active Directory',
      desc: 'Wazuh SIEM monitoring a Windows Server 2022 domain controller and a domain-joined workstation. Added Sysmon process telemetry, file and registry integrity monitoring, and CVE-based vulnerability scanning, then simulated recon and a credential attack from Kali. Wrote five custom detection rules mapped to MITRE ATT&CK, including a canary rule that caught the live brute-force against a decoy account.',
      kpis: [{ v: '4,889', l: 'EVENTS' }, { v: '5', l: 'CUSTOM RULES' }, { v: '173', l: 'CRITICAL CVEs' }],
      stack: ['Wazuh', 'Active Directory', 'Windows Server 2022', 'Sysmon', 'MITRE ATT&CK', 'Detection Engineering', 'Kali Linux', 'VirtualBox'],
      categories: ['Security'],
      links: [
        { label: 'READ THE WRITE-UP →', url: 'https://buildwithkayai.com/logs/siem-detection-lab-active-directory' },
        { label: 'VIEW ON GITHUB →', url: 'https://github.com/Kaytecks/Active-Directory-Siem-Lab' },
      ],
    },
  ]

  const tabs: ('DevOps' | 'Security')[] = ['DevOps', 'Security']
  const countFor = (t: 'DevOps' | 'Security') =>
    projects.filter(p => p.categories.includes(t)).length

  const visible = projects.filter(p => p.categories.includes(filter))




  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <section style={{ padding: '80px 60px' }}>
        <div className="s-label">// WHAT I'VE BUILT</div>
        <h2 className="s-h">Featured <em>Projects</em></h2>

        {/* Filter tabs */}
        <div style={{
          display: 'flex', gap: '4px', marginTop: '28px', marginBottom: '36px',
          borderBottom: '1px solid var(--border)', flexWrap: 'wrap',
        }}>
          {tabs.map(t => {
            const active = filter === t
            const accent = t === 'Security' ? 'var(--green)' : 'var(--cyan)'
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  padding: '10px 18px', position: 'relative',
                  color: active ? accent : 'var(--muted)',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg, #fff)' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)' }}
              >
                {t}
                <span style={{ opacity: 0.5, marginLeft: '7px', fontSize: '0.62rem' }}>{countFor(t)}</span>
                <span style={{
                  position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '2px',
                  background: active ? accent : 'transparent',
                  transition: 'background 0.25s',
                }} />
              </button>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '1px', background: 'var(--border)' }}>
          {visible.map((p, i) => (
            <div key={p.num} style={{
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
                color: 'rgba(0,245,255,0.08)', lineHeight: 1,
                marginBottom: '16px', fontFamily: 'Syne, sans-serif',
              }}>{String(i + 1).padStart(2, '0')}</div>

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

              {p.links && (
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: '14px',
                  marginTop: '20px', paddingTop: '18px',
                  borderTop: '1px solid var(--border)',
                }}>
                  {p.links.map((link, j) => (
                    <a key={j} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.66rem',
                      letterSpacing: '1px', color: 'var(--cyan)', textDecoration: 'none',
                      transition: 'opacity 0.3s',
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.65'}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
                    >{link.label}</a>
                  ))}
                </div>
              )}

              {p.private && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  marginTop: '20px', paddingTop: '18px',
                  borderTop: '1px solid var(--border)',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                  letterSpacing: '1px', color: 'var(--muted)',
                }}>
                  <span style={{ opacity: 0.7 }}>&#128274;</span>
                  PROPRIETARY · COMPANY PROJECT · NOT PUBLICLY AVAILABLE
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities strip */}
      <div style={{
        background: 'var(--bg)', borderTop: '1px solid var(--border)',
        padding: '30px 60px',
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
          letterSpacing: '4px', color: 'var(--muted)', marginBottom: '20px',
        }}>// HOW I WORK</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 22px' }}>
          {['IAM Least Privilege', 'PCI DSS', 'ISO 27001', 'MITRE ATT&CK', 'Detection Engineering', 'Threat Hunting', 'Infrastructure as Code', 'Disaster Recovery'].map((cap, i) => (
            <div key={i} style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem',
              color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span style={{ color: 'var(--green)' }}>✓</span>{cap}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section { padding-left: 18px !important; padding-right: 18px !important; }
          div[style*="repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
          div[style*="padding: 30px 60px"] { padding: 24px 18px !important; }
        }
      `}</style>
    </main>
  )
}
