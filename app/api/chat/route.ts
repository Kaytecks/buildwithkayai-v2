import { NextRequest, NextResponse } from 'next/server'
import { groqChat } from '@/lib/groq'
import { streamChat } from '@/lib/claude'
import { searchDocuments } from '@/lib/rag'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages required' }, { status: 400 })
    }

    // RAG search
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop()
    let context = ''
    if (lastUserMessage) {
      context = await searchDocuments(lastUserMessage.content, 3)
    }

    // Track analytics
    try {
      await supabaseAdmin.from('analytics').insert({
        page: 'ai-copilot',
        event: 'chat_message',
        metadata: { message_count: messages.length },
      })
    } catch {}

    const encoder = new TextEncoder()

    // Try Groq first (free, fast)
    try {
      const groqStream = await groqChat(messages, context)

      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of groqStream) {
              const content = chunk.choices[0]?.delta?.content || ''
              if (content) {
                const data = JSON.stringify({ content })
                controller.enqueue(encoder.encode(`data: ${data}\n\n`))
              }
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()
          } catch (err) {
            controller.error(err)
          }
        },
      })

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    } catch (groqError) {
      console.log('Groq failed, trying Claude fallback...')

      // Claude as fallback
      const stream = await streamChat(messages, context)

      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const event of stream) {
              if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
                const data = JSON.stringify({ content: event.delta.text })
                controller.enqueue(encoder.encode(`data: ${data}\n\n`))
              }
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()
          } catch (err) {
            controller.error(err)
          }
        },
      })

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}