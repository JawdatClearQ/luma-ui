import { XStack, YStack, styled } from 'tamagui'
import { useState, useRef, useCallback, type ReactNode } from 'react'

export interface SplitPaneProps {
  left: ReactNode
  right: ReactNode
  defaultSize?: number
  minSize?: number
  maxSize?: number
  direction?: 'horizontal' | 'vertical'
}

const ResizeHandle = styled(YStack, {
  name: 'ResizeHandle',
  backgroundColor: '$border',
  hoverStyle: { backgroundColor: '$primary500' },
  zIndex: 10,
})

export function SplitPane({
  left,
  right,
  defaultSize = 300,
  minSize = 100,
  maxSize = 800,
  direction = 'horizontal',
}: SplitPaneProps) {
  const [splitSize, setSplitSize] = useState(defaultSize)
  const dragging = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const isHorizontal = direction === 'horizontal'

  const handleMouseDown = useCallback(() => {
    dragging.current = true
    document.body.style.cursor = isHorizontal ? 'col-resize' : 'row-resize'
    document.body.style.userSelect = 'none'
  }, [isHorizontal])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      let newSize: number
      if (isHorizontal) {
        newSize = e.clientX - rect.left
      } else {
        newSize = e.clientY - rect.top
      }
      newSize = Math.max(minSize, Math.min(maxSize, newSize))
      setSplitSize(newSize)
    },
    [minSize, maxSize, isHorizontal]
  )

  const handleMouseUp = useCallback(() => {
    dragging.current = false
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [])

  const Container = isHorizontal ? XStack : YStack

  return (
    <Container
      ref={containerRef}
      width="100%"
      height="100%"
      onMouseMove={handleMouseMove as any}
      onMouseUp={handleMouseUp as any}
      onMouseLeave={handleMouseUp as any}
    >
      <Container flex={1} style={isHorizontal ? { width: splitSize } : { height: splitSize }}>
        {left}
      </Container>
      <ResizeHandle
        cursor={isHorizontal ? 'col-resize' : 'row-resize'}
        onMouseDown={handleMouseDown}
        {...(isHorizontal
          ? { width: 4, height: '100%', cursor: 'col-resize' }
          : { height: 4, width: '100%', cursor: 'row-resize' })}
      />
      <Container flex={1}>{right}</Container>
    </Container>
  )
}
