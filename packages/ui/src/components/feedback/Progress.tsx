"use client";

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
  sm: { barHeight: 4, circleSize: 48, strokeWidth: 4, fontSize: 11 },
  md: { barHeight: 6, circleSize: 64, strokeWidth: 6, fontSize: 13 },
  lg: { barHeight: 10, circleSize: 80, strokeWidth: 8, fontSize: 15 },
}

const colorMap: Record<ProgressColorScheme, string> = {
  primary: '#8b7355',
  secondary: '#b8a58a',
  success: '#6f8f4e',
  warning: '#c49b3f',
  error: '#b86a5a',
  info: '#7a8fa0',
}

const BarTrack = styled(YStack, {
  backgroundColor: '#ede5d8',
  borderRadius: 9999,
  overflow: 'hidden',
  flex: 1,
})

const BarFill = styled(YStack, {
  borderRadius: 9999,
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
            borderColor="#ede5d8"
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
              <Text fontSize={dims.fontSize} fontWeight="600" color="#3d3425" letterSpacing={0.2}>
                {Math.round(displayValue)}%
              </Text>
            )}
            {isIndeterminate && (
              <Text fontSize={dims.fontSize} color="#b8a58a" letterSpacing={1}>
                ···
              </Text>
            )}
          </Circle>
          {label && (
            <Text fontSize={12} color="#8b7a64" letterSpacing={0.3} fontWeight="500">{label}</Text>
          )}
        </YStack>
      )
    }

    return (
      <YStack ref={ref} gap={6} {...props}>
        {(showLabel || label) && (
          <XStack justifyContent="space-between" alignItems="center">
            {label && (
              <Text fontSize={12} color="#8b7a64" letterSpacing={0.3} fontWeight="500">{label}</Text>
            )}
            {showLabel && !isIndeterminate && (
              <Text fontSize={12} fontWeight="600" color="#5c4f3a" letterSpacing={0.15}>
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
