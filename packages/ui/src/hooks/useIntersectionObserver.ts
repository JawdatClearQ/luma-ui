import { useRef, useState, useEffect, useCallback } from 'react'

type RefCallback = (node: HTMLElement | null) => void

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const elementRef = useRef<HTMLElement | null>(null)

  const ref: RefCallback = useCallback((node) => {
    elementRef.current = node
  }, [])

  useEffect(() => {
    const el = elementRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(([e]) => {
      setIsIntersecting(e.isIntersecting)
      setEntry(e)
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return { ref, isIntersecting, entry }
}
