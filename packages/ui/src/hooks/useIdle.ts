import { useState, useEffect, useRef } from 'react'

export function useIdle(timeout = 60000): boolean {
  const [isIdle, setIsIdle] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reset = () => {
      setIsIdle(false)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setIsIdle(true), timeout)
    }

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click']
    events.forEach((e) => window.addEventListener(e, reset))

    reset()

    return () => {
      clearTimeout(timerRef.current)
      events.forEach((e) => window.removeEventListener(e, reset))
    }
  }, [timeout])

  return isIdle
}
