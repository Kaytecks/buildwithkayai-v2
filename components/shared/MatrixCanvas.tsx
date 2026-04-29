'use client'

import { useEffect, useRef } from 'react'

export default function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    const isMobile = window.innerWidth < 768

    const handleResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const fontSize = 16
    const cols = Math.floor(W / fontSize)
    const drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -50))
    const chars = '01アイウエオカキクケコ01サシスセソABCDEF0123456789<>{}[]|\\/?!#$%01'
    const speeds = Array.from({ length: cols }, () => 0.3 + Math.random() * 0.5)
    const bright = Array.from({ length: cols }, () => Math.random())

    let frame = 0
    let animId: number

    const draw = () => {
      frame++
      ctx.fillStyle = 'rgba(2,4,10,0.12)'
      ctx.fillRect(0, 0, W, H)

      if (!isMobile) {
        ctx.font = `${fontSize}px JetBrains Mono, monospace`
        drops.forEach((y, i) => {
          const ch = chars[Math.floor(Math.random() * chars.length)]
          const isHead = Math.random() > 0.92
          if (isHead) {
            ctx.fillStyle = 'rgba(200,255,255,0.9)'
          } else {
            const alpha = bright[i] * (0.12 + Math.random() * 0.25)
            ctx.fillStyle = `rgba(0,245,255,${alpha})`
          }
          ctx.fillText(ch, i * fontSize, y * fontSize)
          if (y * fontSize > H && Math.random() > 0.975) drops[i] = 0
          drops[i] += speeds[i]
        })
      }

      // Scan line
      const scanY = (frame * 0.4) % H
      const g = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30)
      g.addColorStop(0, 'rgba(0,245,255,0)')
      g.addColorStop(0.5, 'rgba(0,245,255,0.02)')
      g.addColorStop(1, 'rgba(0,245,255,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, scanY - 30, W, 60)

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.35,
      }}
    />
  )
}
