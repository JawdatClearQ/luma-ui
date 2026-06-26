import { useRef, useState, useEffect, useCallback } from 'react'

type RefCallback = (node: HTMLElement | null) => void

export function useInfiniteScroll(
  callback: () => Promise<void>,
  options?: { threshold?: number }
) {
  const [isLoading, setIsLoading] = useState(false)
  const sentinelRef = useRef<HTMLElement | null>(null)
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  const ref: RefCallback = useCallback((node) => {
    sentinelRef.current = node
  }, [])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true)
          try {
            await callbackRef.current()
          } finally {
            setIsLoading(false)
          }
        }
      },
      { threshold: options?.threshold ?? 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options?.threshold, isLoading])

  return { sentinelRef: ref, isLoading }
}
