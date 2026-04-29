import Groq from 'groq-sdk'
import { SYSTEM_PROMPT } from './claude'

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function groqChat(
  messages: { role: 'user' | 'assistant'; content: string }[],
  context?: string
) {
  const systemWithContext = context
    ? `${SYSTEM_PROMPT}\n\nADDITIONAL CONTEXT FROM KEHINDE'S DOCUMENTS:\n${context}`
    : SYSTEM_PROMPT

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 500,
    messages: [
      { role: 'system', content: systemWithContext },
      ...messages,
    ],
    stream: true,
  })

  return response
}
