'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const contactItems = [
    { icon: '📧', label: 'EMAIL', value: 'oyekunlekehinde23@gmail.com', href: 'mailto:oyekunlekehinde23@gmail.com' },
    { icon: '💼', label: 'LINKEDIN', value: 'linkedin.com/in/kehinde-oyekunle', href: 'https://linkedin.com/in/kehinde-oyekunle-081045227' },
    { icon: '🌐', label: 'WEBSITE', value: 'buildwithkayai.com', href: 'https://buildwithkayai.com' },
    { icon: '📍', label: 'LOCATION', value: 'Middlesbrough, UK · Open to Remote Worldwide', href: null },
    { icon: '⏰', label: 'RESPONSE TIME', value: 'Usually within 24 hours', href: null },
  ]

  const openTo = [
    'DevOps / SRE roles worldwide',
    'Cloud Infrastructure contracts',
    'US / EU / Global positions',
    'DevOps projects',
    'Cybersecurity & AI research collaborations',
  ]

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <section style={{ padding: '80px 60px' }}>
        <div className="s-label">// GET IN TOUCH</div>
        <h2 className="s-h">Let's Build <em>Together</em></h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          {/* Left — Contact info + form */}
          <div>
            {/* Contact items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: 'var(--border)', marginBottom: '40px' }}>
              {contactItems.map((item, i) => (
                <div key={i} style={{
                  background: 'var(--bg)', padding: '20px 26px',
                  display: 'flex', alignItems: 'center', gap: '14px',
                  transition: 'background 0.3s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,245,255,0.015)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)'}
                >
                  <div style={{ fontSize: '1.2rem', width: '30px', textAlign: 'center' }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '2px', color: 'var(--muted)', marginBottom: '3px' }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.87rem', color: 'var(--cyan)', textDecoration: 'none' }}>{item.value}</a>
                    ) : (
                      <div style={{ fontSize: '0.87rem' }}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '20px' }}>
              // SEND A MESSAGE
            </div>

            {status === 'success' ? (
              <div style={{
                background: 'rgba(0,255,136,0.05)',
                border: '1px solid rgba(0,255,136,0.2)',
                padding: '24px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>✅</div>
                <div style={{ color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', letterSpacing: '1px' }}>MESSAGE SENT SUCCESSFULLY</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '8px' }}>I'll get back to you within 24 hours.</div>
                <button onClick={() => setStatus('idle')} style={{
                  marginTop: '16px', background: 'none',
                  border: '1px solid var(--border)', color: 'var(--muted)',
                  padding: '8px 16px', cursor: 'pointer',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem',
                }}>SEND ANOTHER</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="admin-label">NAME *</label>
                    <input
                      className="admin-input"
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="admin-label">EMAIL *</label>
                    <input
                      className="admin-input"
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="admin-label">SUBJECT *</label>
                  <input
                    className="admin-input"
                    type="text"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div>
                  <label className="admin-label">MESSAGE *</label>
                  <textarea
                    className="admin-input"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about the opportunity..."
                    required
                    rows={5}
                    style={{ resize: 'vertical' }}
                  />
                </div>
                {status === 'error' && (
                  <div style={{ color: 'var(--pink)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>
                    ⚠️ Something went wrong. Please try again or email directly.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary"
                  style={{ opacity: status === 'loading' ? 0.7 : 1 }}
                >
                  <span>{status === 'loading' ? 'SENDING...' : 'SEND MESSAGE →'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right — Open to */}
          <div>
            <div style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              padding: '35px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, var(--cyan), var(--purple), var(--green))' }} />
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '20px' }}>
                // CURRENTLY OPEN TO
              </div>
              {openTo.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '0.87rem' }}>
                  <span style={{ color: 'var(--green)', fontSize: '0.78rem' }}>✓</span>
                  {item}
                </div>
              ))}

              {/* Download CV */}
              <button
                onClick={() => {
                  fetch('Kehinde_Oyekunle_CV.pdf', { method: 'HEAD' })
                    .then(res => {
                      if (res.ok) {
                        const a = document.createElement('a')
                        a.href = 'Kehinde_Oyekunle_CV.pdf'
                        a.download = 'Kehinde_Oyekunle_CV.pdf'
                        a.click()
                      } else {
                        window.location.href = 'mailto:oyekunlekehinde23@gmail.com?subject=CV Request — Kehinde Oyekunle&body=Hi Kehinde, I would like to request a copy of your CV.'
                      }
                    })
                    .catch(() => {
                      window.location.href = 'mailto:oyekunlekehinde23@gmail.com?subject=CV Request — Kehinde Oyekunle&body=Hi Kehinde, I would like to request a copy of your CV.'
                    })
                }}
                style={{
                  width: '100%', marginTop: '25px',
                  background: 'linear-gradient(135deg, var(--cyan), var(--cyan2))',
                  color: 'var(--bg)', border: 'none',
                  padding: '15px', fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.8rem', cursor: 'pointer',
                  fontWeight: 700, letterSpacing: '2px', transition: 'all 0.3s',
                }}
              >
                ↓ DOWNLOAD MY CV
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section { padding-left: 18px !important; padding-right: 18px !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
