'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const tabs = [
  { id: 'home', label: 'HOME', href: '/' },
  { id: 'about', label: 'ABOUT', href: '/about' },
  { id: 'projects', label: 'PROJECTS', href: '/projects' },
  { id: 'cybersec', label: 'CYBER·AI', href: '/cybersec' },
  { id: 'experience', label: 'EXPERIENCE', href: '/experience' },
  { id: 'certifications', label: 'CERTS', href: '/certifications' },
  { id: 'logs', label: 'LOGS', href: '/logs' },
  { id: 'contact', label: 'CONTACT', href: '/contact' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isAdmin = pathname?.startsWith('/admin')
  if (isAdmin) return null

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        padding: '0 60px', height: '70px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(2,4,10,0.8)',
          backdropFilter: 'blur(30px)',
          zIndex: -1,
          borderBottom: '1px solid var(--border)',
        }} />

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, cursor: 'pointer' }}>
            <span style={{
              fontFamily: 'Syne, sans-serif', fontSize: '1rem',
              fontWeight: 800, color: 'var(--cyan)', letterSpacing: '1px',
            }}>BuildWithKayAI</span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem',
              color: 'var(--muted)', letterSpacing: '3px', marginTop: '2px',
            }}>BUILDWITHKAYAI.COM</span>
          </div>
        </Link>

        {/* Desktop tabs */}
        <ul style={{ display: 'flex', gap: 0, listStyle: 'none' }} className="desktop-nav">
          {tabs.map(tab => {
            const isActive = pathname === tab.href || (tab.href !== '/' && pathname?.startsWith(tab.href))
            return (
              <li key={tab.id}>
                <Link href={tab.href} style={{ textDecoration: 'none' }}>
                  <button style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.72rem',
                    letterSpacing: '1.5px',
                    color: isActive ? 'var(--cyan)' : 'var(--muted)',
                    cursor: 'pointer',
                    padding: '10px 14px',
                    transition: 'color 0.3s',
                    position: 'relative',
                    border: 'none',
                    background: 'none',
                    borderBottom: isActive ? '1px solid var(--cyan)' : '1px solid transparent',
                  }}>
                    {tab.label}
                  </button>
                </Link>
              </li>
            )
          })}
        </ul>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="mobile-menu-btn"
            style={{
              background: 'none', border: 'none',
              color: 'var(--cyan)', cursor: 'pointer',
              fontSize: '1.2rem', padding: '4px',
            }}
          >
            ☰
          </button>

          {/* CV Button */}
          <button
            onClick={downloadCV}
            style={{
              background: 'transparent',
              border: '1px solid var(--cyan)',
              color: 'var(--cyan)',
              padding: '9px 18px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.72rem',
              cursor: 'pointer',
              letterSpacing: '1px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.background = 'var(--cyan)';
              (e.target as HTMLButtonElement).style.color = 'var(--bg)'
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.background = 'transparent';
              (e.target as HTMLButtonElement).style.color = 'var(--cyan)'
            }}
          >
            ↓ CV
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(2,4,10,0.98)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute', top: '25px', right: '25px',
              background: 'none', border: 'none',
              color: 'var(--muted)', cursor: 'pointer', fontSize: '1.2rem',
            }}
          >
            ✕
          </button>
          {tabs.map(tab => (
            <Link key={tab.id} href={tab.href} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
              <button style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem', letterSpacing: '3px',
                color: pathname === tab.href ? 'var(--cyan)' : 'var(--muted)',
                cursor: 'pointer', padding: '10px 20px',
                border: 'none', background: 'none',
                transition: 'color 0.3s',
              }}>
                {tab.label}
              </button>
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 901px) {
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          nav { padding: 0 18px !important; }
        }
      `}</style>
    </>
  )
}

function downloadCV() {
  fetch('Kehinde_Oyekunle_CV.pdf', { method: 'HEAD' })
    .then(res => {
      if (res.ok) {
        const a = document.createElement('a')
        a.href = 'Kehinde_Oyekunle_CV.pdf'
        a.download = 'Kehinde_Oyekunle_CV.pdf'
        a.click()
      } else {
        window.location.href = 'mailto:oyekunlekehinde23@gmail.com?subject=CV Request — Kehinde Oyekunle&body=Hi Kehinde, I visited your portfolio buildwithkayai.com and would like to request a copy of your CV.'
      }
    })
    .catch(() => {
      window.location.href = 'mailto:oyekunlekehinde23@gmail.com?subject=CV Request — Kehinde Oyekunle&body=Hi Kehinde, I visited your portfolio buildwithkayai.com and would like to request a copy of your CV.'
    })
}
