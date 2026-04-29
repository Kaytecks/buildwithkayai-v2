'use client'

import { useRouter } from 'next/navigation'

export default function DeleteLogButton({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return

    await fetch(`/api/admin/logs/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        background: 'none', border: '1px solid rgba(255,45,155,0.3)',
        color: 'var(--pink)', padding: '4px 10px',
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
        cursor: 'pointer', transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,45,155,0.08)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'none'
      }}
    >DEL</button>
  )
}
