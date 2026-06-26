import { useRef, useState, useCallback } from 'react'

type RefCallback = (node: HTMLElement | null) => void

export function useHover() {
  const [isHovered, setIsHovered] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  const ref: RefCallback = useCallback((node) => {
    if (elementRef.current) {
      elementRef.current.removeEventListener('mouseenter', onEnter)
      elementRef.current.removeEventListener('mouseleave', onLeave)
    }

    if (node) {
      node.addEventListener('mouseenter', onEnter)
      node.addEventListener('mouseleave', onLeave)
    }

    elementRef.current = node
  }, [])

  const onEnter = () => setIsHovered(true)
  const onLeave = () => setIsHovered(false)

  return { ref, isHovered }
}
