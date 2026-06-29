"use client";

import { styled, Text as TamaguiText, type TextProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface HeadingProps extends TextProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: number
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  color?: string
  align?: 'left' | 'center' | 'right' | 'justify'
  truncate?: boolean
  children?: ReactNode
}

const levelConfig: Record<number, { fontSize: number; lineHeight: number }> = {
  1: { fontSize: 36, lineHeight: 44 },
  2: { fontSize: 30, lineHeight: 38 },
  3: { fontSize: 24, lineHeight: 32 },
  4: { fontSize: 20, lineHeight: 28 },
  5: { fontSize: 16, lineHeight: 24 },
  6: { fontSize: 14, lineHeight: 20 },
}

const StyledHeading = styled(TamaguiText, {
  name: 'Heading',
  fontWeight: '600',
  color: '$textPrimary',
})

export const Heading = forwardRef<any, HeadingProps>(
  ({ level = 1, size, weight, color, align, truncate, children, ...props }, ref) => {
    const config = levelConfig[level]

    return (
      <StyledHeading
        ref={ref}
        fontSize={size ?? config.fontSize}
        fontWeight={weight ?? '600'}
        lineHeight={config.lineHeight}
        color={color ?? '$textPrimary'}
        textAlign={align}
        {...props}
      >
        {children}
      </StyledHeading>
    )
  }
)

Heading.displayName = 'Heading'
