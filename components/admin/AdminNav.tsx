'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const navItems = [
  { href: '/admin', label: 'DASHBOARD', icon: '⚡' },
  { href: '/admin/logs', label: 'LOGS', icon: '📝' },
  { href: '/admin/messages', label: 'MESSAGES', icon: '📬' },
  { href: '/admin/subscribers', label: 'SUBSCRIBERS', icon: '👥' },
  { href: '/admin/documents', label: 'RAG DOCS', icon: '🧠' },
  { href: '/admin/analytics', label: 'ANALYTICS', icon: '📊' },
  { href: '/admin/settings', label: 'SETTINGS', icon: '⚙️' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000,
      padding: '0 40px', height: '70px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: 'rgba(2,4,10,0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Logo */}
      <Link href="/admin" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--cyan)', letterSpacing: '3px' }}>
            ADMIN
          </span>
          <span style={{ color: 'var(--border)', fontSize: '0.8rem' }}>|</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '2px' }}>
            BUILDWITHKAYAI
          </span>
        </div>
      </Link>

      {/* Nav Items */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {navItems.map(item => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <button style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.68rem', letterSpacing: '1px',
                color: isActive ? 'var(--cyan)' : 'var(--muted)',
                background: isActive ? 'rgba(0,245,255,0.06)' : 'none',
                border: isActive ? '1px solid rgba(0,245,255,0.2)' : '1px solid transparent',
                padding: '6px 12px', cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: '5px',
              }}>
                <span style={{ fontSize: '0.75rem' }}>{item.icon}</span>
                {item.label}
              </button>
            </Link>
          )
        })}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link href="/" target="_blank" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '1px' }}>
            VIEW SITE →
          </span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          style={{
            background: 'none', border: '1px solid var(--border)',
            color: 'var(--muted)', padding: '6px 14px',
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
            cursor: 'pointer', letterSpacing: '1px', transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--pink)'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--pink)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)'
          }}
        >
          LOGOUT
        </button>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          nav { padding: 0 18px !important; }
          nav > div:nth-child(2) { display: none; }
        }
      `}</style>
    </nav>
  )
}
