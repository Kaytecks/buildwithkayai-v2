import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

// Client for public/browser use
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side only — never expose to browser
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Types
export type Log = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  tags: string[] | null
  linkedin_url: string | null
  status: 'draft' | 'published'
  reading_time: number | null
  created_at: string
  updated_at: string
}

export type Subscriber = {
  id: string
  email: string
  subscribed_at: string
  unsubscribed: boolean
  unsubscribed_at: string | null
}

export type Message = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  read: boolean
  created_at: string
}

export type Document = {
  id: string
  title: string | null
  content: string
  embedding: number[] | null
  metadata: Record<string, any> | null
  doc_type: 'cv' | 'post' | 'project' | 'note' | 'research'
  created_at: string
}

export type AnalyticsEvent = {
  id: string
  page: string | null
  event: string | null
  metadata: Record<string, any> | null
  created_at: string
}
