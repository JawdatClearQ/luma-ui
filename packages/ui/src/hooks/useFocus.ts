import { useRef, useState, useCallback } from 'react'

type RefCallback = (node: HTMLElement | null) => void

export function useFocus() {
  const [isFocused, setIsFocused] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  const ref: RefCallback = useCallback((node) => {
    if (elementRef.current) {
      elementRef.current.removeEventListener('focusin', onFocus)
      elementRef.current.removeEventListener('focusout', onBlur)
    }

    if (node) {
      node.addEventListener('focusin', onFocus)
      node.addEventListener('focusout', onBlur)
    }

    elementRef.current = node
  }, [])

  const onFocus = () => setIsFocused(true)
  const onBlur = () => setIsFocused(false)

  return { ref, isFocused }
}
