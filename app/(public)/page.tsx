'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const teaserCards = [
  {
    num: '01 / ABOUT.exe',
    title: 'The Engineer Behind the Code',
    lines: [
      'Started as Youth Corper. Left as DevOps Engineer.',
      '3+ years · AWS · MSc Cybersecurity Student · UK',
    ],
    href: '/about',
    color: 'var(--cyan)',
  },
  {
    num: '02 / PROJECTS.exe',
    title: 'Built From Scratch. Deployed to Prod.',
    lines: [
      'VMS · Secure File Share · AWS Automation',
      '90% time saved · 98% adoption · ISO compliant',
    ],
    href: '/projects',
    color: 'var(--green)',
  },
  {
    num: '03 / CYBER_AI.exe',
    title: 'Where Security Meets Artificial Intelligence',
    lines: [
      'MSc Research · AI-powered threat detection',
      'DevSecOps · Anomaly detection · Cloud security',
    ],
    href: '/cybersec',
    color: 'var(--purple)',
  },
  {
    num: '04 / EXPERIENCE.exe',
    title: 'Career Timeline & Work History',
    lines: [
      'Fringe · Cloud Exchange · Coils Tech · OOU',
      'Team lead · ISO audits · Cloud migrations',
    ],
    href: '/experience',
    color: '#ff6b35',
  },
  {
    num: '05 / CERTIFICATIONS.exe',
    title: 'Credentials, Certs & Education',
    lines: [
      'ISO 27001 · DCCA · NSE 1&2 · CNSS',
      'MSc Cybersecurity · B.Eng Engineering',
    ],
    href: '/certifications',
    color: 'var(--gold)',
  },
  {
    num: '06 / LOGS.exe',
    title: 'Thoughts, Posts & Field Notes',
    lines: [
      'Career journey · Project breakdowns',
      'DevOps insights · Cybersecurity + AI',
    ],
    href: '/logs',
    color: 'var(--pink)',
  },
]

const stats = [
  { target: 3, label: 'YRS EXPERIENCE', suffix: '+' },
  { target: 90, label: '% TIME SAVED', suffix: '%' },
  { target: 98, label: '% ADOPTION', suffix: '%' },
  { target: 6, label: 'TEAM LED', suffix: '' },
]

export default function HomePage() {
  const statsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    statsRef.current.forEach((el, i) => {
      if (!el) return
      const target = stats[i].target
      let current = 0
      const step = target / 60
      const timer = setInterval(() => {
        current = Math.min(current + step, target)
        el.textContent = Math.floor(current).toString()
        if (current >= target) clearInterval(timer)
      }, 18)
    })
  }, [])

  return (
    <main style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 60px 40px',
        position: 'relative',
      }}>
        {/* Big BG text */}
        <div style={{
          position: 'absolute', right: '-30px', top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '22vw', fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(0,245,255,0.035)',
          lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
          letterSpacing: '-10px', fontFamily: 'Syne, sans-serif',
        }}>KO</div>

        <div style={{ maxWidth: '820px', position: 'relative', zIndex: 1 }}>
          {/* Tag */}
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem', color: 'var(--muted)',
            letterSpacing: '3px', marginBottom: '28px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ width: '30px', height: '1px', background: 'var(--cyan)', display: 'inline-block' }} />
            DEVOPS · SRE · MSc Cybersecurity Student · UK
          </div>

          {/* Headline */}
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)',
            fontWeight: 700, color: 'var(--muted)',
            lineHeight: 1.3, marginBottom: '18px', letterSpacing: '-0.5px',
          }}>
            The engineer who builds systems<br />
            <em style={{ fontStyle: 'normal', color: 'var(--text)' }}>that don't break at 3am.</em>
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
            fontWeight: 900, lineHeight: 0.88,
            letterSpacing: '-3px', marginBottom: '30px',
          }}>
            <span style={{ display: 'block', color: 'var(--text)' }}>KEHINDE</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, var(--cyan) 0%, var(--purple) 50%, var(--pink) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>OYEKUNLE</span>
          </h1>

          {/* Description */}
          <p style={{
            color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.8,
            maxWidth: '560px', marginBottom: '50px',
          }}>
            <em style={{ color: 'var(--cyan)', fontStyle: 'normal' }}>MSc Cybersecurity Student</em> at Teesside University. Deploys secure and scalable cloud infrastructure with security. {' '}
            <em style={{ color: 'var(--cyan)', fontStyle: 'normal' }}>Exploring AI + security as the next frontier</em> solutions.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
            <Link href="/projects" style={{ textDecoration: 'none' }}>
              <button className="btn-primary">
                <span>VIEW MY WORK →</span>
              </button>
            </Link>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary">GET IN TOUCH</button>
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  fontSize: '2.8rem', fontWeight: 900, lineHeight: 1,
                  background: 'linear-gradient(135deg, var(--cyan), var(--green))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'Syne, sans-serif',
                }}>
                  <span ref={el => {statsRef.current[i] = el}}>0</span>{stat.suffix}
                </div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem', color: 'var(--muted)',
                  letterSpacing: '2px', marginTop: '4px',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '30px', right: '60px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }} className="hide-mobile">
          <div style={{
            width: '1px', height: '60px',
            background: 'linear-gradient(to bottom, var(--cyan), transparent)',
            animation: 'scrollBar 2s ease infinite',
          }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
            color: 'var(--muted)', letterSpacing: '3px', writingMode: 'vertical-rl',
          }}>SCROLL</span>
        </div>
      </section>

      {/* Terminal Teaser Cards */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 60px 80px' }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
          letterSpacing: '4px', color: 'var(--cyan)', marginBottom: '40px', opacity: 0.6,
        }}>
          // EXPLORE — CLICK ANY SECTION
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {teaserCards.map((card, i) => (
            <Link key={i} href={card.href} style={{ textDecoration: 'none', width: '62%', alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end', display: 'block' }}>
              <div
                className="bracket-card"
                style={{
                  background: 'var(--bg2)',
                  padding: '32px 36px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: `1px solid var(--border)`,
                  display: 'block',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,245,255,0.025)'
                  ;(e.currentTarget as HTMLDivElement).style.transform = i % 2 === 0 ? 'translateX(6px)' : 'translateX(-6px)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = 'var(--bg2)'
                  ;(e.currentTarget as HTMLDivElement).style.transform = 'translateX(0)'
                }}
              >
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.70rem', letterSpacing: '2px',
                  color: card.color, marginBottom: '8px',
                }}>{card.num}</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.9rem', fontWeight: 600,
                  color: 'var(--text)', marginBottom: '10px',
                }}>{card.title}</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.73rem', color: 'var(--muted)',
                  lineHeight: 1.9, marginBottom: '16px',
                }}>
                  {card.lines.map((line, j) => (
                    <div key={j}>
                      <span style={{ opacity: 0.5 }}>&gt; </span>{line}
                    </div>
                  ))}
                </div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.68rem', letterSpacing: '2px',
                  color: 'var(--green)', display: 'inline-flex',
                  alignItems: 'center', gap: '6px',
                }}>[ READ MORE → ]</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes scrollBar {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @media (max-width: 900px) {
          .hide-mobile { display: none !important; }
          a[style*="width: 62%"] { width: 92% !important; }
        }
      `}</style>
    </main>
  )
}
