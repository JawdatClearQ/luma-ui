import { useEffect, useRef } from 'react'

export function useEventListener(
  event: string,
  handler: (...args: any[]) => void,
  options?: AddEventListenerOptions,
  target?: EventTarget
) {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    const el = target ?? (typeof window !== 'undefined' ? window : undefined)
    if (!el) return

    const listener = (e: Event) => handlerRef.current(e)
    el.addEventListener(event, listener, options)
    return () => el.removeEventListener(event, listener, options)
  }, [event, options, target])
}
