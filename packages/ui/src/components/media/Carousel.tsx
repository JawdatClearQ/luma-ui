import { forwardRef, useState, useCallback, useEffect, useRef } from 'react'
import { styled, YStack, XStack, Text } from 'tamagui'
import type { YStackProps } from 'tamagui'

export interface CarouselProps extends Omit<YStackProps, 'onChange'> {
  items: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
  showArrows?: boolean
  showIndicators?: boolean
  loop?: boolean
  onChange?: (index: number) => void
}

const ArrowButton = styled(YStack, {
  width: 36,
  height: 36,
  borderRadius: '$full',
  backgroundColor: 'rgba(0,0,0,0.5)',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2,
  hoverStyle: { backgroundColor: 'rgba(0,0,0,0.7)' },
})

const Dot = styled(YStack, {
  width: 8,
  height: 8,
  borderRadius: '$full',
  cursor: 'pointer',
  transition: 'all 0.2s',
})

export const Carousel = forwardRef<any, CarouselProps>(
  (
    {
      items,
      autoPlay = false,
      interval = 3000,
      showArrows = true,
      showIndicators = true,
      loop = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const [current, setCurrent] = useState(0)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const goTo = useCallback(
      (idx: number) => {
        const next = loop
          ? ((idx % items.length) + items.length) % items.length
          : Math.max(0, Math.min(idx, items.length - 1))
        setCurrent(next)
        onChange?.(next)
      },
      [items.length, loop, onChange]
    )

    const next = useCallback(() => goTo(current + 1), [current, goTo])
    const prev = useCallback(() => goTo(current - 1), [current, goTo])

    useEffect(() => {
      if (!autoPlay || items.length <= 1) return
      timerRef.current = setInterval(next, interval)
      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }, [autoPlay, interval, next, items.length])

    const hasPrev = loop || current > 0
    const hasNext = loop || current < items.length - 1

    return (
      <YStack ref={ref} position="relative" overflow="hidden" borderRadius="$md" {...props}>
        <YStack width="100%" height="100%" position="relative">
          {items[current]}
        </YStack>
        {showArrows && items.length > 1 && hasPrev && (
          <ArrowButton left={8} onPress={prev} aria-label="Previous slide">
            <Text color="white" fontSize={16}>‹</Text>
          </ArrowButton>
        )}
        {showArrows && items.length > 1 && hasNext && (
          <ArrowButton right={8} onPress={next} aria-label="Next slide">
            <Text color="white" fontSize={16}>›</Text>
          </ArrowButton>
        )}
        {showIndicators && items.length > 1 && (
          <XStack
            position="absolute"
            bottom={8}
            left="50%"
            transform="translateX(-50%)"
            gap={6}
            zIndex={2}
          >
            {items.map((_, idx) => (
              <Dot
                key={`carousel-item-${idx}`}
                width={idx === current ? 20 : 8}
                backgroundColor={idx === current ? 'white' : 'rgba(255,255,255,0.5)'}
                onPress={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </XStack>
        )}
      </YStack>
    )
  }
)

Carousel.displayName = 'Carousel'
