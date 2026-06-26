import { YStack, styled } from 'tamagui'
import { useState, useEffect, useRef, type ReactNode } from 'react'

export interface CollapseProps {
  isOpen: boolean
  children: ReactNode
  duration?: number
}

const CollapseContainer = styled(YStack, {
  name: 'Collapse',
  overflow: 'hidden',
})

export function Collapse({ isOpen, children, duration = 300 }: CollapseProps) {
  const [height, setHeight] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    setIsAnimating(true)
    const fullHeight = el.scrollHeight

    if (isOpen) {
      setHeight(fullHeight)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeight(fullHeight)
        })
      })
    } else {
      setHeight(0)
    }

    const timer = setTimeout(() => {
      setIsAnimating(false)
      if (isOpen) {
        setHeight(0)
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [isOpen, duration])

  return (
    <CollapseContainer
      style={{
        height: isAnimating ? height : isOpen ? 'auto' : 0,
        transition: `height ${duration}ms ease`,
      }}
    >
      <YStack ref={contentRef}>{children}</YStack>
    </CollapseContainer>
  )
}
