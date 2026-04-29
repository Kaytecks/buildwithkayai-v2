'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    if (result?.ok) {
      router.push('/admin')
    } else {
      setStatus('error')
      setError('Invalid email or password')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG glow */}
      <div style={{
        position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(0,245,255,0.04), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '420px', padding: '0 20px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: 'var(--cyan)', marginBottom: '6px' }}>
            BuildWithKayAI
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '3px' }}>
            ADMIN ACCESS
          </div>
        </div>

        {/* Panel */}
        <div style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          padding: '40px', position: 'relative',
        }}>
          {/* Bracket corners */}
          {[
            { top: -1, left: -1, borderTop: '1.5px solid var(--cyan)', borderLeft: '1.5px solid var(--cyan)' },
            { top: -1, right: -1, borderTop: '1.5px solid var(--cyan)', borderRight: '1.5px solid var(--cyan)' },
            { bottom: -1, left: -1, borderBottom: '1.5px solid var(--cyan)', borderLeft: '1.5px solid var(--cyan)' },
            { bottom: -1, right: -1, borderBottom: '1.5px solid var(--cyan)', borderRight: '1.5px solid var(--cyan)' },
          ].map((s, i) => (
            <span key={i} style={{ position: 'absolute', width: '16px', height: '16px', ...s }} />
          ))}

          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '30px' }}>
            // SIGN IN
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label className="admin-label">EMAIL</label>
              <input
                className="admin-input"
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="admin@buildwithkayai.com"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="admin-label">PASSWORD</label>
              <input
                className="admin-input"
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem',
                color: 'var(--pink)', padding: '10px 14px',
                background: 'rgba(255,45,155,0.06)',
                border: '1px solid rgba(255,45,155,0.2)',
              }}>
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: status === 'loading'
                  ? 'rgba(0,245,255,0.4)'
                  : 'linear-gradient(135deg, var(--cyan), var(--cyan2))',
                color: 'var(--bg)', border: 'none',
                padding: '14px', fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.82rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                fontWeight: 700, letterSpacing: '2px', transition: 'all 0.3s',
                marginTop: '8px',
              }}
            >
              {status === 'loading' ? 'SIGNING IN...' : 'SIGN IN →'}
            </button>
          </form>

          {/* Forgot password */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link href="/admin/forgot-password" style={{ textDecoration: 'none' }}>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
                color: 'var(--muted)', letterSpacing: '1px',
                transition: 'color 0.2s', cursor: 'pointer',
              }}>
                Forgot password?
              </span>
            </Link>
          </div>
        </div>

        {/* Back to site */}
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '1px' }}>
              ← BACK TO SITE
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
