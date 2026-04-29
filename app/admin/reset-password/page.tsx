'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [form, setForm] = useState({ password: '', confirm: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: form.password }),
      })

      if (res.ok) {
        setStatus('success')
        setTimeout(() => router.push('/admin/login'), 3000)
      } else {
        const data = await res.json()
        setError(data.error || 'Reset failed. Link may have expired.')
        setStatus('error')
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (!token) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⚠️</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: 'var(--pink)', letterSpacing: '2px', marginBottom: '10px' }}>
            INVALID RESET LINK
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
            This password reset link is invalid or has expired.
          </p>
          <Link href="/admin/forgot-password" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'linear-gradient(135deg, var(--cyan), var(--cyan2))',
              color: 'var(--bg)', border: 'none', padding: '12px 24px',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem',
              cursor: 'pointer', fontWeight: 700, letterSpacing: '1px',
            }}>
              REQUEST NEW LINK →
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '0 20px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: 'var(--cyan)', marginBottom: '6px' }}>
            BuildWithKayAI
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '3px' }}>
            SET NEW PASSWORD
          </div>
        </div>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '40px', position: 'relative' }}>
          {/* Bracket corners */}
          {[
            { top: -1, left: -1, borderTop: '1.5px solid var(--cyan)', borderLeft: '1.5px solid var(--cyan)' },
            { top: -1, right: -1, borderTop: '1.5px solid var(--cyan)', borderRight: '1.5px solid var(--cyan)' },
            { bottom: -1, left: -1, borderBottom: '1.5px solid var(--cyan)', borderLeft: '1.5px solid var(--cyan)' },
            { bottom: -1, right: -1, borderBottom: '1.5px solid var(--cyan)', borderRight: '1.5px solid var(--cyan)' },
          ].map((s, i) => (
            <span key={i} style={{ position: 'absolute', width: '16px', height: '16px', ...s }} />
          ))}

          {status === 'success' ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>✅</div>
              <div style={{ color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '10px' }}>
                PASSWORD UPDATED
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                Your password has been reset successfully. Redirecting to login...
              </p>
            </div>
          ) : (
            <>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '24px' }}>
                // NEW PASSWORD
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label className="admin-label">NEW PASSWORD</label>
                  <input
                    className="admin-input"
                    type="password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="Min. 8 characters"
                    required
                    minLength={8}
                  />
                </div>
                <div>
                  <label className="admin-label">CONFIRM PASSWORD</label>
                  <input
                    className="admin-input"
                    type="password"
                    value={form.confirm}
                    onChange={e => setForm({ ...form, confirm: e.target.value })}
                    placeholder="Repeat your password"
                    required
                  />
                </div>

                {/* Password strength indicator */}
                {form.password && (
                  <div>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                      {[1, 2, 3, 4].map(level => {
                        const strength = form.password.length >= 8 ? (
                          /[A-Z]/.test(form.password) ? (
                            /[0-9]/.test(form.password) ? (
                              /[^a-zA-Z0-9]/.test(form.password) ? 4 : 3
                            ) : 2
                          ) : 1
                        ) : 0
                        return (
                          <div key={level} style={{
                            flex: 1, height: '3px',
                            background: level <= strength
                              ? strength >= 3 ? 'var(--green)' : strength >= 2 ? 'var(--gold)' : 'var(--pink)'
                              : 'var(--border)',
                            transition: 'background 0.3s',
                          }} />
                        )
                      })}
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--muted)' }}>
                      {form.password.length < 8 ? 'TOO SHORT' :
                        /[^a-zA-Z0-9]/.test(form.password) ? 'STRONG ✓' :
                        /[0-9]/.test(form.password) ? 'GOOD' :
                        /[A-Z]/.test(form.password) ? 'FAIR' : 'WEAK'}
                    </div>
                  </div>
                )}

                {error && (
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem',
                    color: 'var(--pink)', padding: '10px 14px',
                    background: 'rgba(255,45,155,0.06)',
                    border: '1px solid rgba(255,45,155,0.2)',
                  }}>⚠️ {error}</div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    background: 'linear-gradient(135deg, var(--cyan), var(--cyan2))',
                    color: 'var(--bg)', border: 'none', padding: '14px',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    fontWeight: 700, letterSpacing: '2px',
                    opacity: status === 'loading' ? 0.7 : 1,
                    marginTop: '8px',
                  }}
                >
                  {status === 'loading' ? 'UPDATING...' : 'SET NEW PASSWORD →'}
                </button>
              </form>
            </>
          )}

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
