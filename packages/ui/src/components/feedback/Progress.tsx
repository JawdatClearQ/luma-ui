import { forwardRef } from 'react'
import { styled, YStack, XStack, Text, Circle } from 'tamagui'
import type { YStackProps } from 'tamagui'

type ProgressVariant = 'linear' | 'circular'
type ProgressSize = 'sm' | 'md' | 'lg'
type ProgressColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

export interface ProgressProps extends Omit<YStackProps, 'size'> {
  value?: number
  variant?: ProgressVariant
  size?: ProgressSize
  colorScheme?: ProgressColorScheme
  showLabel?: boolean
  isIndeterminate?: boolean
  label?: string
}

const sizeMap: Record<ProgressSize, { barHeight: number; circleSize: number; strokeWidth: number; fontSize: number }> = {
  sm: { barHeight: 6, circleSize: 48, strokeWidth: 4, fontSize: 11 },
  md: { barHeight: 10, circleSize: 64, strokeWidth: 6, fontSize: 13 },
  lg: { barHeight: 14, circleSize: 80, strokeWidth: 8, fontSize: 15 },
}

const colorMap: Record<ProgressColorScheme, string> = {
  primary: '$primary500',
  secondary: '$secondary500',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
}

const BarTrack = styled(YStack, {
  backgroundColor: '$gray200',
  borderRadius: '$full',
  overflow: 'hidden',
  flex: 1,
})

const BarFill = styled(YStack, {
  borderRadius: '$full',
  height: '100%',
})

export const Progress = forwardRef<any, ProgressProps>(
  (
    {
      value = 0,
      variant = 'linear',
      size = 'md',
      colorScheme = 'primary',
      showLabel = false,
      isIndeterminate = false,
      label,
      ...props
    },
    ref
  ) => {
    const dims = sizeMap[size]
    const accent = colorMap[colorScheme]
    const displayValue = Math.min(100, Math.max(0, value))

    if (variant === 'circular') {
      const r = (dims.circleSize - dims.strokeWidth) / 2
      const circumference = 2 * Math.PI * r
      const offset = isIndeterminate ? 0 : circumference - (displayValue / 100) * circumference

      return (
        <YStack ref={ref} alignItems="center" gap={4} {...props}>
          <Circle
            width={dims.circleSize}
            height={dims.circleSize}
            borderWidth={dims.strokeWidth}
            borderColor="$gray200"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <Circle
              width={dims.circleSize}
              height={dims.circleSize}
              borderWidth={dims.strokeWidth}
              borderColor={accent}
              position="absolute"
              style={{
                borderLeftColor: 'transparent',
                borderBottomColor: 'transparent',
                transform: `rotate(-90deg)`,
                clipPath: `inset(0 ${isIndeterminate ? '50%' : '0'} 0 0)`,
                opacity: isIndeterminate ? 0.6 : 1,
              }}
            />
            {showLabel && !isIndeterminate && (
              <Text fontSize={dims.fontSize} fontWeight="700" color="$textPrimary">
                {Math.round(displayValue)}%
              </Text>
            )}
            {isIndeterminate && (
              <Text fontSize={dims.fontSize} color="$textSecondary">
                ...
              </Text>
            )}
          </Circle>
          {label && (
            <Text fontSize={12} color="$textSecondary">{label}</Text>
          )}
        </YStack>
      )
    }

    return (
      <YStack ref={ref} gap={4} {...props}>
        {(showLabel || label) && (
          <XStack justifyContent="space-between" alignItems="center">
            {label && (
              <Text fontSize={12} color="$textSecondary">{label}</Text>
            )}
            {showLabel && !isIndeterminate && (
              <Text fontSize={12} fontWeight="600" color="$textSecondary">
                {Math.round(displayValue)}%
              </Text>
            )}
          </XStack>
        )}
        <BarTrack height={dims.barHeight}>
          {isIndeterminate ? (
            <BarFill
              width="40%"
              backgroundColor={accent}
              opacity={0.6}
            />
          ) : (
            <BarFill
              width={`${displayValue}%`}
              backgroundColor={accent}
            />
          )}
        </BarTrack>
      </YStack>
    )
  }
)

Progress.displayName = 'Progress'
