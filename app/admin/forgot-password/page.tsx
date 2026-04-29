'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: 'var(--cyan)', marginBottom: '6px' }}>
            BuildWithKayAI
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '3px' }}>
            RESET PASSWORD
          </div>
        </div>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '40px', position: 'relative' }}>
          {[
            { top: -1, left: -1, borderTop: '1.5px solid var(--cyan)', borderLeft: '1.5px solid var(--cyan)' },
            { top: -1, right: -1, borderTop: '1.5px solid var(--cyan)', borderRight: '1.5px solid var(--cyan)' },
            { bottom: -1, left: -1, borderBottom: '1.5px solid var(--cyan)', borderLeft: '1.5px solid var(--cyan)' },
            { bottom: -1, right: -1, borderBottom: '1.5px solid var(--cyan)', borderRight: '1.5px solid var(--cyan)' },
          ].map((s, i) => (
            <span key={i} style={{ position: 'absolute', width: '16px', height: '16px', ...s }} />
          ))}

          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '20px' }}>
            // FORGOT PASSWORD
          </div>

          {status === 'success' ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📧</div>
              <div style={{ color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '10px' }}>
                RESET LINK SENT
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                Check your email for a password reset link. It expires in 1 hour.
              </p>
            </div>
          ) : (
            <>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Enter your admin email address and we'll send you a password reset link.
              </p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="admin-label">ADMIN EMAIL</label>
                  <input
                    className="admin-input"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="oyekunlekehinde23@gmail.com"
                    required
                  />
                </div>
                {status === 'error' && (
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--pink)' }}>
                    ⚠️ Something went wrong. Please try again.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    background: 'linear-gradient(135deg, var(--cyan), var(--cyan2))',
                    color: 'var(--bg)', border: 'none', padding: '13px',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem',
                    cursor: 'pointer', fontWeight: 700, letterSpacing: '2px',
                    opacity: status === 'loading' ? 0.7 : 1,
                  }}
                >
                  {status === 'loading' ? 'SENDING...' : 'SEND RESET LINK →'}
                </button>
              </form>
            </>
          )}

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/admin/login" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)' }}>
                ← BACK TO LOGIN
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
