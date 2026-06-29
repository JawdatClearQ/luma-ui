"use client";

import { styled, YStack, Text, type YStackProps } from 'tamagui'
import { forwardRef } from 'react'

type BadgeVariant = 'solid' | 'subtle' | 'outline'
type BadgeColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends YStackProps {
  variant?: BadgeVariant
  colorScheme?: BadgeColorScheme
  size?: BadgeSize
  children: React.ReactNode
}

const colorMap: Record<BadgeColorScheme, { solid: string; subtle: string; outline: string; text: string }> = {
  primary: { solid: '$primary500', subtle: '$primary100', outline: '$primary500', text: '$primary700' },
  secondary: { solid: '$secondary500', subtle: '$secondary100', outline: '$secondary500', text: '$secondary700' },
  success: { solid: '#22c55e', subtle: '#dcfce7', outline: '#22c55e', text: '#166534' },
  warning: { solid: '#f59e0b', subtle: '#fef3c7', outline: '#f59e0b', text: '#92400e' },
  error: { solid: '#ef4444', subtle: '#fee2e2', outline: '#ef4444', text: '#991b1b' },
  info: { solid: '#3b82f6', subtle: '#dbeafe', outline: '#3b82f6', text: '#1e40af' },
}

const sizeMap: Record<BadgeSize, { px: number; py: number; fontSize: number }> = {
  sm: { px: 6, py: 2, fontSize: 10 },
  md: { px: 8, py: 3, fontSize: 12 },
  lg: { px: 10, py: 4, fontSize: 14 },
}

const BadgeFrame = styled(YStack, {
  name: 'Badge',
  borderRadius: '$full',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-start',
  display: 'inline-flex',
})

export const Badge = forwardRef<any, BadgeProps>(
  ({ variant = 'solid', colorScheme = 'primary', size: sizeProp = 'md', children, ...props }, ref) => {
    const colors = colorMap[colorScheme]
    const dims = sizeMap[sizeProp]

    const bg =
      variant === 'solid'
        ? colors.solid
        : variant === 'subtle'
        ? colors.subtle
        : 'transparent'

    const border = variant === 'outline' ? { borderWidth: 1, borderColor: colors.outline } : {}
    const textColor = variant === 'solid' ? 'white' : colors.text

    return (
      <BadgeFrame
        ref={ref}
        paddingHorizontal={dims.px}
        paddingVertical={dims.py}
        backgroundColor={bg}
        {...border}
        {...props}
      >
        <Text fontSize={dims.fontSize} fontWeight="600" color={textColor} lineHeight={dims.fontSize * 1.4}>
          {children}
        </Text>
      </BadgeFrame>
    )
  }
)

Badge.displayName = 'Badge'
