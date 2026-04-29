'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const quickQuestions = [
  'What projects has Kehinde built?',
  'What is his AWS experience?',
  'Is he available for remote work?',
  'What makes him stand out?',
]

export default function AICopilot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text?: string) => {
    const content = text || input.trim()
    if (!content || loading) return

    setInput('')
    setShowQuick(false)
    setLoading(true)

    const userMessage: Message = { role: 'user', content }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!res.ok) throw new Error('Failed')

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let aiContent = ''

      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break
            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                aiContent += parsed.content
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = { role: 'assistant', content: aiContent }
                  return updated
                })
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection error — please try again.',
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <div style={{ position: 'fixed', bottom: '70px', right: '35px', zIndex: 1500 }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: '58px', height: '58px',
            borderRadius: '50%',
            background: 'rgba(0,245,255,0.04)',
            border: '1.5px solid rgba(0,245,255,0.5)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--cyan)', letterSpacing: '1px',
            transition: 'all 0.3s',
            boxShadow: '0 0 20px rgba(0,245,255,0.15)',
            position: 'relative',
          }}
        >
          AI
          <span style={{
            position: 'absolute', inset: '-5px',
            borderRadius: '50%',
            border: '1px solid rgba(0,245,255,0.15)',
            animation: 'pulseDot 2.5s infinite',
          }} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(2,4,10,0.9)',
            backdropFilter: 'blur(14px)',
            zIndex: 2000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {/* Panel */}
          <div style={{
            width: 'min(560px, 92vw)',
            height: 'min(660px, 88vh)',
            background: '#050c18',
            border: '1px solid rgba(0,245,255,0.18)',
            display: 'flex', flexDirection: 'column',
            position: 'relative',
            animation: 'panelIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            {/* Bracket corners */}
            {[
              { top: -1, left: -1, borderTop: '1.5px solid var(--cyan)', borderLeft: '1.5px solid var(--cyan)' },
              { top: -1, right: -1, borderTop: '1.5px solid var(--cyan)', borderRight: '1.5px solid var(--cyan)' },
              { bottom: -1, left: -1, borderBottom: '1.5px solid var(--cyan)', borderLeft: '1.5px solid var(--cyan)' },
              { bottom: -1, right: -1, borderBottom: '1.5px solid var(--cyan)', borderRight: '1.5px solid var(--cyan)' },
            ].map((style, i) => (
              <span key={i} style={{ position: 'absolute', width: '16px', height: '16px', ...style }} />
            ))}

            {/* Header */}
            <div style={{
              padding: '20px 24px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              background: 'rgba(0,245,255,0.02)',
            }}>
              <div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.78rem', fontWeight: 600,
                  color: 'var(--cyan)', letterSpacing: '3px', marginBottom: '5px',
                }}>ASK THE ENGINEER</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.62rem', color: 'var(--muted)',
                  letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '7px',
                }}>
                  <span style={{
                    width: '5px', height: '5px',
                    background: 'var(--green)', borderRadius: '50%',
                    boxShadow: '0 0 6px var(--green)',
                    animation: 'pulse2 2s infinite',
                  }} />
                  AI CO-PILOT ONLINE
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--muted)', cursor: 'pointer',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem', transition: 'color 0.2s',
                }}
              >✕</button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto',
              padding: '20px 24px',
              display: 'flex', flexDirection: 'column', gap: '12px',
            }}>
              {messages.length === 0 && (
                <div style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  padding: '28px 20px', textAlign: 'center', margin: '8px 0',
                }}>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.62rem', letterSpacing: '3px',
                    color: 'var(--cyan)', marginBottom: '12px',
                  }}>PROMPT IDEAS</div>
                  <div style={{ color: 'rgba(240,244,248,0.45)', fontSize: '0.88rem', lineHeight: 1.75 }}>
                    Ask about Kehinde's projects, AWS experience, career journey, availability, or what makes him stand out as an engineer.
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '8px',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  animation: 'msgIn 0.3s ease',
                }}>
                  <div style={{
                    width: '24px', height: '24px',
                    borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.58rem', fontWeight: 700,
                    background: msg.role === 'assistant'
                      ? 'linear-gradient(135deg, var(--cyan), var(--purple))'
                      : 'rgba(0,255,136,0.06)',
                    border: msg.role === 'user' ? '1px solid rgba(0,255,136,0.3)' : 'none',
                    color: msg.role === 'user' ? 'var(--green)' : 'var(--bg)',
                  }}>
                    {msg.role === 'assistant' ? 'AI' : 'K'}
                  </div>
                  <div style={{
                    maxWidth: '82%', padding: '10px 13px',
                    fontSize: '0.82rem', lineHeight: 1.65,
                    background: msg.role === 'assistant'
                      ? 'rgba(0,245,255,0.03)'
                      : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${msg.role === 'assistant'
                      ? 'rgba(0,245,255,0.08)'
                      : 'rgba(255,255,255,0.07)'}`,
                    color: 'var(--text)',
                  }}>
                    {msg.content || (loading && msg.role === 'assistant' && (
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        {[0, 0.2, 0.4].map((delay, j) => (
                          <span key={j} className="typing-dot" style={{ animationDelay: `${delay}s` }} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {loading && messages[messages.length - 1]?.role === 'user' && (
                <div style={{ display: 'flex', gap: '8px', animation: 'msgIn 0.3s ease' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--cyan), var(--purple))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem',
                    fontWeight: 700, color: 'var(--bg)',
                  }}>AI</div>
                  <div style={{
                    padding: '10px 13px',
                    background: 'rgba(0,245,255,0.03)',
                    border: '1px solid rgba(0,245,255,0.08)',
                  }}>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      {[0, 0.2, 0.4].map((delay, j) => (
                        <span key={j} className="typing-dot" style={{ animationDelay: `${delay}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            {showQuick && (
              <div style={{
                padding: '8px 24px',
                display: 'flex', flexWrap: 'wrap', gap: '5px',
                borderTop: '1px solid rgba(255,255,255,0.04)',
              }}>
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(0,245,255,0.14)',
                      color: 'rgba(0,245,255,0.55)',
                      padding: '4px 10px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.62rem', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.target as HTMLButtonElement).style.borderColor = 'var(--cyan)';
                      (e.target as HTMLButtonElement).style.color = 'var(--cyan)'
                    }}
                    onMouseLeave={e => {
                      (e.target as HTMLButtonElement).style.borderColor = 'rgba(0,245,255,0.14)';
                      (e.target as HTMLButtonElement).style.color = 'rgba(0,245,255,0.55)'
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{
              padding: '14px 24px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center',
            }}>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.88rem', color: 'var(--cyan)',
                marginRight: '10px', opacity: 0.6,
              }}>&gt;</span>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask anything..."
                style={{
                  flex: 1, background: 'transparent', border: 'none',
                  color: 'var(--text)',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem',
                  outline: 'none',
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  border: '1px solid rgba(0,245,255,0.4)',
                  background: 'transparent', color: 'var(--cyan)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem', transition: 'all 0.3s',
                  opacity: loading ? 0.5 : 1,
                }}
              >→</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes panelIn { from { opacity: 0; transform: translateY(30px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes msgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse2 { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </>
  )
}
