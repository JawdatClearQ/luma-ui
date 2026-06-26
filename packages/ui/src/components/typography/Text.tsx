import { styled, Text as TamaguiText, type TextProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'label'

export interface TextComponentProps extends TextProps {
  variant?: TextVariant
  size?: number | string
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  color?: string
  align?: 'left' | 'center' | 'right' | 'justify'
  numberOfLines?: number
  children?: ReactNode
}

const variantConfig: Record<TextVariant, { fontSize: number; fontWeight: string; lineHeight: number }> = {
  h1: { fontSize: 36, fontWeight: '700', lineHeight: 44 },
  h2: { fontSize: 30, fontWeight: '700', lineHeight: 38 },
  h3: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
  h4: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
  h5: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  h6: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  label: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
}

const StyledText = styled(TamaguiText, {
  name: 'Text',
})

export const Text = forwardRef<any, TextComponentProps>(
  ({ variant = 'body', size, weight, color, align, numberOfLines, children, style, ...props }, ref) => {
    const config = variantConfig[variant]
    const webStyle = numberOfLines
      ? {
          display: '-webkit-box',
          WebkitLineClamp: numberOfLines,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden',
        }
      : undefined

    return (
      <StyledText
        ref={ref}
        fontSize={size ?? config.fontSize}
        fontWeight={weight ?? config.fontWeight}
        lineHeight={config.lineHeight}
        color={color ?? '$textPrimary'}
        textAlign={align}
        numberOfLines={numberOfLines}
        style={{ ...webStyle, ...(style as object) }}
        {...props}
      >
        {children}
      </StyledText>
    )
  }
)

Text.displayName = 'Text'
