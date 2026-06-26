import { YStack, Spinner, Text, styled } from 'tamagui'
import { useRef, useEffect, useState, useCallback, type ReactNode } from 'react'

export interface InfiniteScrollProps {
  children: ReactNode
  onLoadMore: () => Promise<void>
  hasMore: boolean
  loader?: ReactNode
  endMessage?: ReactNode
  threshold?: number
}

const Sentinel = styled(YStack, {
  name: 'Sentinel',
  height: 1,
})

export function InfiniteScroll({
  children,
  onLoadMore,
  hasMore,
  loader,
  endMessage,
  threshold = 0.1,
}: InfiniteScrollProps) {
  const isLoadingRef = useRef(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const handleLoadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) return
    isLoadingRef.current = true
    try {
      await onLoadMore()
    } finally {
      isLoadingRef.current = false
    }
  }, [hasMore, onLoadMore])

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoadingRef.current) {
      handleLoadMore()
    }
  }, [isIntersecting, hasMore, handleLoadMore])

  return (
    <YStack>
      {children}
      <Sentinel ref={sentinelRef}>
        {hasMore
          ? loader || <Spinner size="small" padding="$md" />
          : endMessage || <Text color="$gray400" textAlign="center" padding="$md">No more items</Text>}
      </Sentinel>
    </YStack>
  )
}
