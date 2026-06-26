import { forwardRef } from 'react'
import { styled, YStack } from 'tamagui'
import type { YStackProps } from 'tamagui'

type SkeletonVariant = 'text' | 'circular' | 'rectangular'

export interface SkeletonProps extends YStackProps {
  variant?: SkeletonVariant
  width?: number | string
  height?: number | string
  count?: number
}

const SkeletonBox = styled(YStack, {
  name: 'Skeleton',
  backgroundColor: '$gray200',
  opacity: 0.7,
})

export const Skeleton = forwardRef<any, SkeletonProps>(
  ({ variant = 'text', width, height, count = 1, ...props }, ref) => {
    const isText = variant === 'text'
    const isCircular = variant === 'circular'

    const boxHeight = isText ? 12 : height ?? (isCircular ? 40 : 100)
    const boxWidth = width ?? (isText ? '100%' : isCircular ? 40 : '100%')

    if (isCircular) {
      return (
        <SkeletonBox
          ref={ref}
          width={boxWidth as any}
          height={boxHeight as any}
          borderRadius="$full"
          {...props}
        />
      )
    }

    if (isText && count > 1) {
      return (
        <YStack ref={ref} gap={8} {...props}>
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonBox
              key={i}
              height={boxHeight}
              width={i === count - 1 ? '60%' : '100%'}
              borderRadius="$sm"
            />
          ))}
        </YStack>
      )
    }

    return (
      <SkeletonBox
        ref={ref}
        width={boxWidth as any}
        height={boxHeight as any}
        borderRadius={isText ? '$sm' : '$md'}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
