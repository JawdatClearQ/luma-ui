"use client";

import { styled, Text as TamaguiText, YStack, type TextProps, type YStackProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface CodeProps extends TextProps {
  variant?: 'inline' | 'block'
  language?: string
  children?: ReactNode
}

const InlineCode = styled(TamaguiText, {
  name: 'InlineCode',
  fontFamily: 'monospace',
  backgroundColor: '$gray50',
  color: '$gray800',
  borderRadius: 4,
  paddingHorizontal: 4,
  paddingVertical: 1,
  fontSize: 14,
})

const BlockCode = styled(YStack, {
  name: 'BlockCode',
  backgroundColor: '$gray50',
  borderRadius: 8,
  padding: 16,
})

const CodeText = styled(TamaguiText, {
  name: 'CodeText',
  fontFamily: 'monospace',
  fontSize: 14,
  lineHeight: 20,
  color: '$gray800',
})

export const Code = forwardRef<any, CodeProps>(
  ({ variant = 'inline', language, children, ...props }, ref) => {
    if (variant === 'block') {
      return (
        <BlockCode
          ref={ref}
          role={'code' as any}
          aria-label={language ? `code block: ${language}` : 'code block'}
          {...(props as YStackProps)}
        >
          <CodeText>{children}</CodeText>
        </BlockCode>
      )
    }

    return (
      <InlineCode ref={ref} role={'code' as any} {...props}>
        {children}
      </InlineCode>
    )
  }
)

Code.displayName = 'Code'
