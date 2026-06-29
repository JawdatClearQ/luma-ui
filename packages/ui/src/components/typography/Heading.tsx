"use client";

import { styled, Text as TamaguiText, type TextProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface HeadingProps extends TextProps {
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'eyebrow'
  size?: number
  weight?: string
  color?: string
  align?: 'left' | 'center' | 'right' | 'justify'
  children?: ReactNode
}

const StyledHeading = styled(TamaguiText, {
  name: 'Heading',
  fontFamily: '$heading',
  color: '$neutral900',
  letterSpacing: -0.5,

  variants: {
    variant: {
      display: {
        fontFamily: '$heading',
        fontSize: 64,
        fontWeight: '300',
        lineHeight: 1.1,
        letterSpacing: -1,
        color: '$neutral900',
      },
      h1: { fontSize: 48, fontWeight: '400', lineHeight: 1.2, letterSpacing: -0.5 },
      h2: { fontSize: 36, fontWeight: '400', lineHeight: 1.2, letterSpacing: -0.3 },
      h3: { fontSize: 28, fontWeight: '500', lineHeight: 1.3 },
      h4: { fontSize: 20, fontWeight: '500', lineHeight: 1.4 },
      eyebrow: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: '$primary600',
        fontFamily: '$body',
      },
    },
  } as const,
  defaultVariants: { variant: 'h1' },
})

export const Heading = forwardRef<any, HeadingProps>(
  ({ variant = 'h1', size, weight, color, align, children, ...props }, ref) => {
    return (
      <StyledHeading
        ref={ref}
        variant={variant}
        fontSize={size}
        fontWeight={weight}
        color={color}
        textAlign={align}
        {...props}
      >
        {children}
      </StyledHeading>
    )
  }
)

Heading.displayName = 'Heading'
