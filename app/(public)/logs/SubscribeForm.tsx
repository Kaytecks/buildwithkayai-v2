'use client'

import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      padding: '30px',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: '500px',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, var(--cyan), var(--purple))' }} />
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--cyan)', marginBottom: '8px' }}>
        // SUBSCRIBE TO LOGS
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '20px', lineHeight: 1.6 }}>
        Get notified when Kehinde publishes new posts — no spam, unsubscribe anytime.
      </p>

      {status === 'success' ? (
        <div style={{ color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem' }}>
          ✅ Check your email to confirm your subscription!
        </div>
      ) : (
        <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="admin-input"
            style={{ flex: 1 }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              background: 'var(--cyan)', color: 'var(--bg)',
              border: 'none', padding: '10px 20px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem', cursor: 'pointer',
              fontWeight: 700, letterSpacing: '1px',
              opacity: status === 'loading' ? 0.7 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {status === 'loading' ? '...' : 'SUBSCRIBE →'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <div style={{ color: 'var(--pink)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', marginTop: '8px' }}>
          Something went wrong. Please try again.
        </div>
      )}
    </div>
  )
}
