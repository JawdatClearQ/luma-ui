import { useState, useEffect, useRef } from 'react'

export function useScrollPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0, direction: null as 'up' | 'down' | null })
  const prevY = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const x = window.scrollX
      const y = window.scrollY
      const direction = y > prevY.current ? 'down' : y < prevY.current ? 'up' : position.direction
      prevY.current = y
      setPosition({ x, y, direction })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return position
}
