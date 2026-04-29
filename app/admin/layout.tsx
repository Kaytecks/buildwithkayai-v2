import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Allow access to login, forgot-password and reset-password without session
  // Middleware handles the rest

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)', fontFamily: 'Cabinet Grotesk, sans-serif' }}>
      {session && <AdminNav />}
      <div style={{ paddingTop: session ? '70px' : '0' }}>
        {children}
      </div>
    </div>
  )
}
