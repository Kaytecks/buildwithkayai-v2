'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useState, useEffect, useCallback } from 'react'

const navItems = [
  { href: '/admin', label: 'DASHBOARD', icon: '⚡' },
  { href: '/admin/logs', label: 'LOGS', icon: '📝' },
  { href: '/admin/messages', label: 'MESSAGES', icon: '📬' },
  { href: '/admin/subscribers', label: 'SUBSCRIBERS', icon: '👥' },
  { href: '/admin/documents', label: 'RAG DOCS', icon: '🧠' },
  { href: '/admin/analytics', label: 'ANALYTICS', icon: '📊' },
  { href: '/admin/settings', label: 'SETTINGS', icon: '⚙️' },
]

const INACTIVITY_TIMEOUT = 30 * 60 * 1000 // 30 minutes

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  // Inactivity logout
  const resetTimer = useCallback(() => {
    if (typeof window === 'undefined') return
    const existing = window.sessionStorage.getItem('inactivity_timer')
    if (existing) clearTimeout(parseInt(existing))
    const timer = window.setTimeout(() => {
      signOut({ callbackUrl: '/admin/login' })
    }, INACTIVITY_TIMEOUT)
    window.sessionStorage.setItem('inactivity_timer', timer.toString())
  }, [])

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'click']
    events.forEach(e => window.addEventListener(e, resetTimer))
    resetTimer()
    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer))
    }
  }, [resetTimer])

  return (
    <>
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, padding: '0 40px', height: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(2,4,10,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        {/* Logo */}
        <Link href="/admin" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--cyan)', letterSpacing: '3px' }}>ADMIN</span>
            <span style={{ color: 'var(--border)', fontSize: '0.8rem' }}>|</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '2px' }}>BUILDWITHKAYAI</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="admin-desktop-nav" style={{ display: 'flex', gap: '4px' }}>
          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <button style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', letterSpacing: '1px', color: isActive ? 'var(--cyan)' : 'var(--muted)', background: isActive ? 'rgba(0,245,255,0.06)' : 'none', border: isActive ? '1px solid rgba(0,245,255,0.2)' : '1px solid transparent', padding: '6px 12px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '0.75rem' }}>{item.icon}</span>
                  {item.label}
                </button>
              </Link>
            )
          })}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" target="_blank" style={{ textDecoration: 'none' }} className="admin-view-site">
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '1px' }}>VIEW SITE →</span>
          </Link>
          <button onClick={() => signOut({ callbackUrl: '/admin/login' })} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', padding: '6px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', cursor: 'pointer', letterSpacing: '1px', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--pink)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--pink)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)' }}
          >LOGOUT</button>
          {/* Mobile hamburger */}
          <button className="admin-hamburger" onClick={() => setMenuOpen(true)} style={{ display: 'none', background: 'none', border: '1px solid var(--border)', color: 'var(--cyan)', padding: '6px 10px', cursor: 'pointer', fontSize: '1rem' }}>☰</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,4,10,0.98)', zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '25px', right: '25px', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
              <button style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', letterSpacing: '2px', color: pathname === item.href ? 'var(--cyan)' : 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>{item.icon}</span>{item.label}
              </button>
            </Link>
          ))}
          <button onClick={() => signOut({ callbackUrl: '/admin/login' })} style={{ marginTop: '20px', background: 'none', border: '1px solid rgba(255,45,155,0.3)', color: 'var(--pink)', padding: '10px 24px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', cursor: 'pointer', letterSpacing: '1px' }}>LOGOUT</button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1100px) {
          nav { padding: 0 18px !important; }
          .admin-desktop-nav { display: none !important; }
          .admin-view-site { display: none !important; }
          .admin-hamburger { display: block !important; }
        }
      `}} />
    </>
  )
}
