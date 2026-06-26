import { YStack, styled } from 'tamagui'
import { useState, useRef, useCallback, type ReactNode } from 'react'

export interface ScrollAreaProps {
  children: ReactNode
  height?: number | string
  width?: number | string
  showScrollbar?: 'always' | 'hover' | 'never'
}

const ScrollContainer = styled(YStack, {
  name: 'ScrollArea',
  overflow: 'auto',
  position: 'relative',
})

const ScrollThumb = styled(YStack, {
  name: 'ScrollThumb',
  position: 'absolute',
  right: 2,
  borderRadius: '$full',
  backgroundColor: '$gray400',
  opacity: 0,
  transition: 'opacity 0.2s ease',
})

export function ScrollArea({ children, height, width, showScrollbar = 'hover' }: ScrollAreaProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [scrollInfo, setScrollInfo] = useState({ thumbHeight: 0, thumbTop: 0, ratio: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const ratio = clientHeight / scrollHeight
    const thumbHeight = Math.max(20, ratio * clientHeight)
    const maxTop = clientHeight - thumbHeight
    const thumbTop = ratio < 1 ? (scrollTop / (scrollHeight - clientHeight)) * maxTop : 0
    setScrollInfo({ thumbHeight, thumbTop, ratio })
  }, [])

  const show = showScrollbar === 'always' || (showScrollbar === 'hover' && isHovering)

  return (
    <ScrollContainer
      ref={containerRef}
      height={height}
      width={width}
      onScroll={handleScroll}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      {show && scrollInfo.ratio < 1 && (
        <ScrollThumb
          width={6}
          height={scrollInfo.thumbHeight}
          top={scrollInfo.thumbTop}
          opacity={0.6}
          pointerEvents="none"
        />
      )}
    </ScrollContainer>
  )
}
