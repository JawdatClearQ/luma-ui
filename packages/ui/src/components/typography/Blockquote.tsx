import { styled, Text as TamaguiText, XStack, YStack, type YStackProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

type BlockquoteVariant = 'simple' | 'with-line' | 'with-icon'

export interface BlockquoteProps extends YStackProps {
  cite?: string
  variant?: BlockquoteVariant
  children?: ReactNode
}

const StyledBlockquote = styled(YStack, {
  name: 'Blockquote',
  padding: '$md',
  borderRadius: '$md',
  backgroundColor: '$gray50',
})

const QuoteText = styled(TamaguiText, {
  name: 'QuoteText',
  color: '$textPrimary',
  fontSize: 16,
  lineHeight: 24,
  fontStyle: 'italic',
})

const CiteText = styled(TamaguiText, {
  name: 'CiteText',
  color: '$textSecondary',
  fontSize: 12,
  lineHeight: 16,
  marginTop: '$sm',
})

export const Blockquote = forwardRef<any, BlockquoteProps>(
  ({ cite, variant = 'with-line', children, style, ...props }, ref) => {
    const isWithLine = variant === 'with-line'
    const isWithIcon = variant === 'with-icon'

    return (
      <StyledBlockquote
        ref={ref}
        style={{
          borderLeftWidth: isWithLine ? 4 : 0,
          borderLeftColor: '#3b82f6',
          paddingLeft: isWithLine ? 16 : undefined,
          ...(style as object),
        }}
        role={'blockquote' as any}
        {...props}
      >
        <XStack gap="$sm">
          {isWithIcon && (
            <TamaguiText
              fontSize={24}
              lineHeight={24}
              color="$primary500"
              aria-hidden={true}
            >
              &ldquo;
            </TamaguiText>
          )}
          <YStack flex={1}>
            <QuoteText>{children}</QuoteText>
            {cite && (
              <CiteText>
                &mdash; {cite}
              </CiteText>
            )}
          </YStack>
        </XStack>
      </StyledBlockquote>
    )
  }
)

Blockquote.displayName = 'Blockquote'
