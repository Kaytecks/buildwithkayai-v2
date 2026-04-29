import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(req: NextRequest) {
  try {
    // Only admin can upload
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string || 'image'

    if (!file) {
      return NextResponse.json({ error: 'File required' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const ext = file.name.split('.').pop()
    const filename = `${type}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('buildwithkayai')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      // If bucket doesn't exist, try to create it
      if (error.message.includes('bucket')) {
        await supabaseAdmin.storage.createBucket('buildwithkayai', { public: true })
        const { data: retryData, error: retryError } = await supabaseAdmin.storage
          .from('buildwithkayai')
          .upload(filename, buffer, { contentType: file.type })
        if (retryError) throw retryError
        const { data: urlData } = supabaseAdmin.storage.from('buildwithkayai').getPublicUrl(retryData.path)
        return NextResponse.json({ url: urlData.publicUrl, path: retryData.path })
      }
      throw error
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('buildwithkayai')
      .getPublicUrl(data.path)

    return NextResponse.json({ url: urlData.publicUrl, path: data.path })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
