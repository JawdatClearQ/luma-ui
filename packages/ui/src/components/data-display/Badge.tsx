"use client";

import { styled, YStack, Text, type YStackProps } from 'tamagui'
import { forwardRef } from 'react'

type BadgeVariant = 'solid' | 'subtle' | 'outline' | 'luxury'
type BadgeColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends YStackProps {
  variant?: BadgeVariant
  colorScheme?: BadgeColorScheme
  size?: BadgeSize
  children: React.ReactNode
}

const colorMap: Record<BadgeColorScheme, { solid: string; subtle: string; outline: string; text: string }> = {
  primary: { solid: '$primary500', subtle: '$primary50', outline: '$primary400', text: '$primary700' },
  secondary: { solid: '$secondary500', subtle: '$secondary50', outline: '$secondary400', text: '$secondary700' },
  success: { solid: '$success500', subtle: '$success50', outline: '$success400', text: '$primary700' },
  warning: { solid: '$warning500', subtle: '$warning50', outline: '$warning400', text: '$primary700' },
  error: { solid: '$error500', subtle: '$error50', outline: '$error400', text: '$primary700' },
  info: { solid: '$primary500', subtle: '$primary50', outline: '$primary300', text: '$primary700' },
}

const sizeMap: Record<BadgeSize, { px: number; py: number; fontSize: number }> = {
  sm: { px: 8, py: 2, fontSize: 10 },
  md: { px: 10, py: 4, fontSize: 12 },
  lg: { px: 14, py: 6, fontSize: 14 },
}

const BadgeFrame = styled(YStack, {
  name: 'Badge',
  borderRadius: 4,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-start',
})

export const Badge = forwardRef<any, BadgeProps>(
  ({ variant = 'solid', colorScheme = 'primary', size: sizeProp = 'md', children, ...props }, ref) => {
    const colors = colorMap[colorScheme]
    const dims = sizeMap[sizeProp]

    const bg = variant === 'solid'
      ? colors.solid
      : variant === 'luxury'
      ? '$black'
      : variant === 'subtle'
      ? colors.subtle
      : 'transparent'

    const border = variant === 'outline'
      ? { borderWidth: 1, borderColor: colors.outline }
      : variant === 'luxury'
      ? { borderWidth: 1, borderColor: '$primary500', borderRadius: 2 }
      : {}

    const textColor = variant === 'solid'
      ? '$white'
      : variant === 'luxury'
      ? '$primary300'
      : colors.text

    return (
      <BadgeFrame
        ref={ref}
        paddingHorizontal={dims.px}
        paddingVertical={dims.py}
        backgroundColor={bg}
        {...border}
        {...props}
      >
        <Text
          fontSize={dims.fontSize}
          fontWeight="500"
          color={textColor}
          letterSpacing={variant === 'luxury' ? 1 : 0}
        >
          {children}
        </Text>
      </BadgeFrame>
    )
  }
)

Badge.displayName = 'Badge'
