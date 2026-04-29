'use client'

import { useRouter } from 'next/navigation'

export default function MarkReadButton({ id }: { id: string }) {
  const router = useRouter()

  const handleMarkRead = async () => {
    await fetch(`/api/admin/messages/${id}/read`, { method: 'PATCH' })
    router.refresh()
  }

  return (
    <button
      onClick={handleMarkRead}
      style={{
        background: 'none', border: '1px solid rgba(0,245,255,0.2)',
        color: 'var(--cyan)', padding: '4px 10px',
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
        cursor: 'pointer', transition: 'all 0.2s',
      }}
    >
      MARK READ
    </button>
  )
}
