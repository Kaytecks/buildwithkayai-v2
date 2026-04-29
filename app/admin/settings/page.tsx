'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const [cvStatus, setCvStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.pdf')) {
      setMessage('❌ Please upload a PDF file')
      return
    }

    setCvStatus('uploading')
    setMessage('')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'cv')

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()

      if (data.url) {
        setCvStatus('success')
        setMessage(`✅ CV uploaded successfully! URL: ${data.url}`)
      } else {
        setCvStatus('error')
        setMessage('❌ Upload failed')
      }
    } catch {
      setCvStatus('error')
      setMessage('❌ Upload failed')
    }
  }

  return (
    <main style={{ padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <div className="s-label">// SETTINGS</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px' }}>
          Site <span style={{ color: 'var(--cyan)' }}>Settings</span>
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* CV Upload */}
        <div style={{ border: '1px solid var(--border)', padding: '30px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, var(--cyan), var(--green))' }} />
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '16px' }}>
            // CV MANAGEMENT
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '20px', lineHeight: 1.7 }}>
            Upload your CV PDF. When visitors click "Download CV" on the site, it will automatically download this file. If no file is present, they'll be prompted to email you instead.
          </p>
          <label style={{
            display: 'inline-block', background: 'linear-gradient(135deg, var(--cyan), var(--cyan2))',
            color: 'var(--bg)', padding: '12px 24px',
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem',
            cursor: 'pointer', fontWeight: 700, letterSpacing: '1px',
            opacity: cvStatus === 'uploading' ? 0.7 : 1,
          }}>
            {cvStatus === 'uploading' ? 'UPLOADING...' : '↑ UPLOAD CV PDF'}
            <input type="file" accept=".pdf" onChange={handleCVUpload} style={{ display: 'none' }} />
          </label>
          {message && (
            <div style={{ marginTop: '14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: message.startsWith('✅') ? 'var(--green)' : 'var(--pink)', lineHeight: 1.6 }}>
              {message}
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div style={{ border: '1px solid var(--border)', padding: '30px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, var(--purple), var(--cyan))' }} />
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '16px' }}>
            // PROFILE INFO
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'NAME', value: 'Kehinde Afolarin Oyekunle' },
              { label: 'EMAIL', value: 'oyekunlekehinde23@gmail.com' },
              { label: 'LINKEDIN', value: 'linkedin.com/in/kehinde-oyekunle-081045227' },
              { label: 'WEBSITE', value: 'buildwithkayai.com' },
            ].map((item, i) => (
              <div key={i}>
                <label className="admin-label">{item.label}</label>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem',
                  color: 'var(--muted)', padding: '10px 14px',
                  border: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)',
                }}>{item.value}</div>
              </div>
            ))}
            <p style={{ color: 'var(--muted)', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', marginTop: '8px' }}>
              To update profile info, edit the source code or use Claude Code.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ border: '1px solid var(--border)', padding: '30px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '16px' }}>
            // QUICK LINKS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'View Live Site', href: '/', external: true },
              { label: 'Manage Posts', href: '/admin/logs' },
              { label: 'View Messages', href: '/admin/messages' },
              { label: 'Train AI', href: '/admin/documents' },
              { label: 'Supabase Dashboard', href: 'https://supabase.com', external: true },
              { label: 'Vercel Dashboard', href: 'https://vercel.com', external: true },
            ].map((link, i) => (
              <Link key={i} href={link.href} target={link.external ? '_blank' : undefined} style={{ textDecoration: 'none' }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem',
                  color: 'var(--cyan)', letterSpacing: '1px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 0', borderBottom: '1px solid var(--border)',
                  transition: 'opacity 0.2s', cursor: 'pointer',
                }}>
                  {link.label} {link.external ? '↗' : '→'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { main { padding: 20px !important; } }
      `}</style>
    </main>
  )
}
