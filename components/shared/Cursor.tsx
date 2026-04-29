'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isMobile) return

    const cursor = cursorRef.current
    if (!cursor) return

    cursor.style.display = 'block'
    document.body.style.cursor = 'none'

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const down = () => cursor.classList.add('click')
    const up = () => cursor.classList.remove('click')

    document.addEventListener('mousemove', move)
    document.addEventListener('mousedown', down)
    document.addEventListener('mouseup', up)

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mousedown', down)
      document.removeEventListener('mouseup', up)
      document.body.style.cursor = 'auto'
    }
  }, [])

  return <div ref={cursorRef} className="cursor" style={{ display: 'none' }} />
}
