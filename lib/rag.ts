import { supabaseAdmin } from './supabase'
import { anthropic } from './claude'

// Generate embeddings using Claude's embedding model
export async function generateEmbedding(text: string): Promise<number[]> {
  // Using OpenAI compatible embeddings via Supabase
  // We'll use a simple approach — chunk and store text for now
  // and use keyword matching as fallback
  return []
}

// Search documents using vector similarity
export async function searchDocuments(
  query: string,
  limit: number = 5
): Promise<string> {
  try {
    // Text-based search as primary approach
    const { data, error } = await supabaseAdmin
      .from('documents')
      .select('content, title, doc_type')
      .textSearch('content', query, {
        type: 'websearch',
        config: 'english',
      })
      .limit(limit)

    if (error || !data || data.length === 0) {
      // Fallback — get all documents and return most relevant
      const { data: allDocs } = await supabaseAdmin
        .from('documents')
        .select('content, title, doc_type')
        .limit(10)

      if (!allDocs || allDocs.length === 0) return ''

      // Simple keyword matching
      const queryWords = query.toLowerCase().split(' ')
      const scored = allDocs.map(doc => {
        const contentLower = doc.content.toLowerCase()
        const score = queryWords.filter(word => contentLower.includes(word)).length
        return { ...doc, score }
      })

      scored.sort((a, b) => b.score - a.score)
      return scored
        .slice(0, 3)
        .map(doc => `[${doc.doc_type?.toUpperCase()}] ${doc.title || ''}\n${doc.content}`)
        .join('\n\n---\n\n')
    }

    return data
      .map(doc => `[${doc.doc_type?.toUpperCase()}] ${doc.title || ''}\n${doc.content}`)
      .join('\n\n---\n\n')
  } catch (error) {
    console.error('RAG search error:', error)
    return ''
  }
}

// Add document to knowledge base
export async function addDocument({
  title,
  content,
  docType,
  metadata,
}: {
  title?: string
  content: string
  docType: 'cv' | 'post' | 'project' | 'note' | 'research'
  metadata?: Record<string, any>
}) {
  // Chunk large documents
  const chunks = chunkText(content, 1000)

  const documents = chunks.map((chunk, index) => ({
    title: chunks.length > 1 ? `${title || docType} (part ${index + 1})` : title,
    content: chunk,
    doc_type: docType,
    metadata: {
      ...metadata,
      chunk_index: index,
      total_chunks: chunks.length,
    },
  }))

  const { data, error } = await supabaseAdmin
    .from('documents')
    .insert(documents)
    .select()

  if (error) throw error
  return data
}

// Chunk text into smaller pieces
function chunkText(text: string, maxChunkSize: number): string[] {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const chunks: string[] = []
  let currentChunk = ''

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim())
      currentChunk = sentence
    } else {
      currentChunk += (currentChunk ? '. ' : '') + sentence
    }
  }

  if (currentChunk.trim()) chunks.push(currentChunk.trim())
  return chunks.length > 0 ? chunks : [text]
}

// Delete document from knowledge base
export async function deleteDocument(id: string) {
  const { error } = await supabaseAdmin
    .from('documents')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Get all documents
export async function getAllDocuments() {
  const { data, error } = await supabaseAdmin
    .from('documents')
    .select('id, title, doc_type, created_at, metadata')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
