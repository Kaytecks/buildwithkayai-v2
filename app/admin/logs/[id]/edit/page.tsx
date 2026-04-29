'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { generateSlug, calculateReadingTime } from '@/lib/auth'

export default function EditLogPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    tags: '',
    linkedin_url: '',
    status: 'draft' as 'draft' | 'published',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/admin/logs/${id}`)
      const data = await res.json()
      if (data.data) {
        setForm({
          title: data.data.title || '',
          slug: data.data.slug || '',
          excerpt: data.data.excerpt || '',
          content: data.data.content || '',
          cover_image: data.data.cover_image || '',
          tags: data.data.tags?.join(', ') || '',
          linkedin_url: data.data.linkedin_url || '',
          status: data.data.status || 'draft',
        })
      }
    } catch {
      setError('Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'log-covers')

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) setForm(prev => ({ ...prev, cover_image: data.url }))
    } catch {
      setError('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async (status: 'draft' | 'published') => {
    if (!form.title || !form.content) {
      setError('Title and content are required')
      return
    }

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`/api/admin/logs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          status,
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
          reading_time: calculateReadingTime(form.content),
        }),
      })

      if (res.ok) {
        setSuccess(status === 'published' ? '✅ Post published!' : '✅ Draft saved!')
        setForm(prev => ({ ...prev, status }))
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to save')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '2px' }}>
        LOADING POST...
      </div>
    )
  }

  return (
    <main style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <div className="s-label">// EDIT POST</div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-1px' }}>
            Edit <span style={{ color: 'var(--cyan)' }}>Log Entry</span>
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link href={`/logs/${form.slug}`} target="_blank" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)' }}>
              VIEW POST ↗
            </span>
          </Link>
          <Link href="/admin/logs" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--muted)' }}>← BACK</span>
          </Link>
        </div>
      </div>

      {/* Current status badge */}
      <div style={{ marginBottom: '24px' }}>
        <span className={`badge badge-${form.status}`} style={{ fontSize: '0.72rem', padding: '5px 14px' }}>
          CURRENT STATUS: {form.status.toUpperCase()}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Title */}
        <div>
          <label className="admin-label">TITLE *</label>
          <input
            className="admin-input"
            type="text"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Post title..."
            style={{ fontSize: '1rem' }}
          />
        </div>

        {/* Slug */}
        <div>
          <label className="admin-label">SLUG</label>
          <input
            className="admin-input"
            type="text"
            value={form.slug}
            onChange={e => setForm({ ...form, slug: e.target.value })}
            placeholder="post-slug"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="admin-label">EXCERPT</label>
          <textarea
            className="admin-input"
            value={form.excerpt}
            onChange={e => setForm({ ...form, excerpt: e.target.value })}
            placeholder="Brief summary..."
            rows={3}
            style={{ resize: 'vertical' }}
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="admin-label">COVER IMAGE</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <input
              className="admin-input"
              type="text"
              value={form.cover_image}
              onChange={e => setForm({ ...form, cover_image: e.target.value })}
              placeholder="Image URL..."
              style={{ flex: 1 }}
            />
            <label style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              padding: '10px 16px', cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem',
              color: 'var(--muted)', whiteSpace: 'nowrap',
            }}>
              {uploading ? 'UPLOADING...' : '↑ UPLOAD'}
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
          </div>
          {form.cover_image && (
            <img src={form.cover_image} alt="Cover" style={{ marginTop: '10px', width: '200px', height: '100px', objectFit: 'cover', border: '1px solid var(--border)' }} />
          )}
        </div>

        {/* Content */}
        <div>
          <label className="admin-label">CONTENT *</label>
          <textarea
            className="admin-input"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            placeholder="Post content..."
            rows={20}
            style={{ resize: 'vertical', lineHeight: 1.8 }}
          />
          {form.content && (
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)', marginTop: '6px' }}>
              ~{calculateReadingTime(form.content)} min read · {form.content.split(' ').length} words
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="admin-label">TAGS (comma separated)</label>
          <input
            className="admin-input"
            type="text"
            value={form.tags}
            onChange={e => setForm({ ...form, tags: e.target.value })}
            placeholder="DevOps, AWS, Career"
          />
        </div>

        {/* LinkedIn URL */}
        <div>
          <label className="admin-label">LINKEDIN POST URL</label>
          <input
            className="admin-input"
            type="url"
            value={form.linkedin_url}
            onChange={e => setForm({ ...form, linkedin_url: e.target.value })}
            placeholder="https://linkedin.com/posts/..."
          />
        </div>

        {error && (
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--pink)', padding: '12px 16px', background: 'rgba(255,45,155,0.06)', border: '1px solid rgba(255,45,155,0.2)' }}>
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--green)', padding: '12px 16px', background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.2)' }}>
            {success}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '10px' }}>
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            style={{
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--muted)', padding: '12px 24px',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem',
              cursor: 'pointer', letterSpacing: '1px',
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? 'SAVING...' : 'SAVE AS DRAFT'}
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            style={{
              background: 'linear-gradient(135deg, var(--cyan), var(--cyan2))',
              color: 'var(--bg)', border: 'none', padding: '12px 28px',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem',
              cursor: 'pointer', fontWeight: 700, letterSpacing: '1px',
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? 'SAVING...' : form.status === 'published' ? 'UPDATE POST →' : 'PUBLISH POST →'}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { main { padding: 20px !important; } }
      `}</style>
    </main>
  )
}
