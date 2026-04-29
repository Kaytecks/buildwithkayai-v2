'use client'

import { useState, useEffect } from 'react'

type Document = {
  id: string
  title: string
  doc_type: string
  created_at: string
  metadata: any
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', content: '', doc_type: 'note' as string })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    const res = await fetch('/api/admin/documents')
    const data = await res.json()
    setDocuments(data.data || [])
    setLoading(false)
  }

  const handleSave = async () => {
    if (!form.content) {
      setMessage('Content is required')
      return
    }
    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/admin/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setMessage('✅ Document added to AI knowledge base!')
        setForm({ title: '', content: '', doc_type: 'note' })
        fetchDocuments()
      } else {
        setMessage('❌ Failed to add document')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this document from the AI knowledge base?')) return
    await fetch(`/api/admin/documents/${id}`, { method: 'DELETE' })
    fetchDocuments()
  }

  const docTypeColors: Record<string, string> = {
    cv: 'var(--cyan)', post: 'var(--green)', project: 'var(--purple)',
    note: 'var(--gold)', research: 'var(--pink)',
  }

  return (
    <main style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <div className="s-label">// RAG KNOWLEDGE BASE</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px' }}>
          AI <span style={{ color: 'var(--cyan)' }}>Documents</span>
        </h1>
        <p style={{ color: 'var(--muted)', marginTop: '8px', fontSize: '0.88rem', lineHeight: 1.7 }}>
          Add documents here to train your AI Co-Pilot. The more you add, the smarter and more accurate it becomes when answering questions about you.
        </p>
      </div>

      {/* Add Document Form */}
      <div style={{ border: '1px solid var(--border)', padding: '30px', marginBottom: '40px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, var(--cyan), var(--purple))' }} />
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '20px' }}>
          // ADD NEW DOCUMENT
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '12px' }}>
            <div>
              <label className="admin-label">TITLE / DESCRIPTION</label>
              <input
                className="admin-input"
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. My CV, VMS Project Details, Career Story..."
              />
            </div>
            <div>
              <label className="admin-label">TYPE</label>
              <select
                className="admin-input"
                value={form.doc_type}
                onChange={e => setForm({ ...form, doc_type: e.target.value })}
                style={{ cursor: 'pointer' }}
              >
                <option value="cv">CV</option>
                <option value="post">LinkedIn Post</option>
                <option value="project">Project</option>
                <option value="note">Note</option>
                <option value="research">Research</option>
              </select>
            </div>
          </div>

          <div>
            <label className="admin-label">CONTENT (paste your text here)</label>
            <textarea
              className="admin-input"
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              placeholder="Paste your CV, LinkedIn post, project description, or any text you want the AI to know about you..."
              rows={10}
              style={{ resize: 'vertical', lineHeight: 1.8 }}
            />
          </div>

          {message && (
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: message.startsWith('✅') ? 'var(--green)' : 'var(--pink)' }}>
              {message}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              background: 'linear-gradient(135deg, var(--cyan), var(--cyan2))',
              color: 'var(--bg)', border: 'none', padding: '12px 24px',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem',
              cursor: 'pointer', fontWeight: 700, letterSpacing: '1px',
              alignSelf: 'flex-start', opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? 'ADDING TO AI...' : '+ ADD TO KNOWLEDGE BASE'}
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '16px' }}>
        // EXISTING DOCUMENTS ({documents.length})
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
        {loading ? (
          <div style={{ padding: '30px', background: 'var(--bg)', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>
            LOADING...
          </div>
        ) : documents.length > 0 ? documents.map(doc => (
          <div key={doc.id} style={{
            background: 'var(--bg)', padding: '18px 22px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                border: '1px solid', padding: '2px 8px',
                borderColor: `${docTypeColors[doc.doc_type]}44`,
                color: docTypeColors[doc.doc_type],
                background: `${docTypeColors[doc.doc_type]}0a`,
              }}>{doc.doc_type.toUpperCase()}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '2px' }}>{doc.title || 'Untitled'}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)' }}>
                  Added {new Date(doc.created_at).toLocaleDateString('en-GB')}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(doc.id)}
              style={{
                background: 'none', border: '1px solid rgba(255,45,155,0.2)',
                color: 'var(--pink)', padding: '4px 12px',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                cursor: 'pointer',
              }}
            >REMOVE</button>
          </div>
        )) : (
          <div style={{ padding: '40px', background: 'var(--bg)', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
            No documents yet. Add your CV to get started!
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          main { padding: 20px !important; }
          div[style*="1fr 200px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
