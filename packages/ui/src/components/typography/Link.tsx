import { styled, Text as TamaguiText, type TextProps } from 'tamagui'
import { forwardRef, type ReactNode, useCallback } from 'react'

type LinkVariant = 'underline' | 'button' | 'subtle'

export interface LinkProps extends TextProps {
  href?: string
  isExternal?: boolean
  variant?: LinkVariant
  color?: string
  children?: ReactNode
}

const variantStyles: Record<LinkVariant, React.CSSProperties> = {
  underline: {
    textDecorationLine: 'underline',
    textDecorationColor: 'currentColor',
  },
  button: {
    textDecorationLine: 'none',
    padding: '4px 16px',
    borderRadius: 8,
    cursor: 'pointer',
  },
  subtle: {
    textDecorationLine: 'none',
  },
}

export const Link = forwardRef<any, LinkProps>(
  ({ href, isExternal, variant = 'underline', color, children, style, ...props }, ref) => {
    const baseStyle = variantStyles[variant]

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (href) {
            if (isExternal) {
              window.open(href, '_blank', 'noopener,noreferrer')
            } else {
              window.location.href = href
            }
          }
        }
      },
      [href, isExternal]
    )

    return (
      <TamaguiText
        ref={ref}
        color={color ?? (variant === 'button' ? 'white' : '$primary500')}
        backgroundColor={variant === 'button' ? '$primary500' : undefined}
        style={{
          ...baseStyle,
          ...(style as object),
        }}
        role="link"
        aria-label={isExternal ? `${children} (opens in new tab)` : undefined}
        tabIndex={0}
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        onKeyDown={handleKeyDown}
        hoverStyle={
          variant === 'subtle'
            ? { color: '$primary500', textDecorationLine: 'underline' as any }
            : variant === 'underline'
              ? { opacity: 0.8 }
              : { opacity: 0.9 }
        }
        focusStyle={{
          outlineColor: '$primary500',
          outlineWidth: 2,
          outlineStyle: 'solid' as any,
        }}
        {...props}
      >
        {children}
      </TamaguiText>
    )
  }
)

Link.displayName = 'Link'
