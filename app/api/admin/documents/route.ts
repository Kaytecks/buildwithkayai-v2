import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { addDocument, getAllDocuments } from '@/lib/rag'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await getAllDocuments()
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { title, content, doc_type } = await req.json()

    if (!content) {
      return NextResponse.json({ error: 'Content required' }, { status: 400 })
    }

    const data = await addDocument({ title, content, docType: doc_type || 'note' })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Add document error:', error)
    return NextResponse.json({ error: 'Failed to add document' }, { status: 500 })
  }
}
