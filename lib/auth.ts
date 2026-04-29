import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

// Get current admin session
export async function getAdminSession() {
  const session = await getServerSession(authOptions)
  return session
}

// Require admin — redirects to login if not authenticated
export async function requireAdmin() {
  const session = await getAdminSession()
  if (!session) {
    redirect('/admin/login')
  }
  return session
}

// Check if user is admin
export function isAdmin(email: string) {
  return email === process.env.ADMIN_EMAIL
}

// Generate random token for password reset etc
export function generateToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Calculate reading time for a post
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
