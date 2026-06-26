import { styled, Text as TamaguiText, type TextProps } from 'tamagui'
import { forwardRef, type ReactNode, useMemo } from 'react'

export interface HeadingProps extends TextProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: number | string
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  color?: string
  align?: 'left' | 'center' | 'right' | 'justify'
  truncate?: boolean
  children?: ReactNode
}

const levelConfig = {
  1: { fontSize: 36, lineHeight: 44, tag: 'h1' as const },
  2: { fontSize: 30, lineHeight: 38, tag: 'h2' as const },
  3: { fontSize: 24, lineHeight: 32, tag: 'h3' as const },
  4: { fontSize: 20, lineHeight: 28, tag: 'h4' as const },
  5: { fontSize: 16, lineHeight: 24, tag: 'h5' as const },
  6: { fontSize: 14, lineHeight: 20, tag: 'h6' as const },
}

const StyledHeading = styled(TamaguiText, {
  name: 'Heading',
  fontWeight: '600',
  color: '$textPrimary',
})

export const Heading = forwardRef<any, HeadingProps>(
  ({ level = 1, size, weight, color, align, truncate, children, ...props }, ref) => {
    const config = levelConfig[level]

    const truncateStyle = useMemo(
      () =>
        truncate
          ? {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap' as const,
            }
          : undefined,
      [truncate]
    )

    return (
      <StyledHeading
        ref={ref}
        fontSize={size ?? config.fontSize}
        fontWeight={weight ?? '600'}
        lineHeight={config.lineHeight}
        color={color ?? '$textPrimary'}
        textAlign={align}
        style={truncateStyle}
        {...props}
      >
        {children}
      </StyledHeading>
    )
  }
)

Heading.displayName = 'Heading'
