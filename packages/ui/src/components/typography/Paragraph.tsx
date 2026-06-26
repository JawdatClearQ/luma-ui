import { styled, Text as TamaguiText, type TextProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface ParagraphProps extends TextProps {
  size?: 'sm' | 'md' | 'lg'
  indent?: boolean
  lead?: boolean
  children?: ReactNode
}

const sizeConfig = {
  sm: { fontSize: 14, lineHeight: 20 },
  md: { fontSize: 16, lineHeight: 24 },
  lg: { fontSize: 18, lineHeight: 28 },
}

const StyledParagraph = styled(TamaguiText, {
  name: 'Paragraph',
  color: '$textPrimary',
})

export const Paragraph = forwardRef<any, ParagraphProps>(
  ({ size = 'md', indent, lead, children, style, ...props }, ref) => {
    const config = sizeConfig[size]

    return (
      <StyledParagraph
        ref={ref}
        fontSize={config.fontSize}
        lineHeight={lead ? config.lineHeight * 1.5 : config.lineHeight}
        style={{
          paddingLeft: indent ? 24 : undefined,
          ...(style as object),
        }}
        {...props}
      >
        {children}
      </StyledParagraph>
    )
  }
)

Paragraph.displayName = 'Paragraph'
