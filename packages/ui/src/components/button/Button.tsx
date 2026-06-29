"use client";

import { styled, Button as TButton, Spinner, Text, XStack } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'luxury'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  loadingText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  isDisabled?: boolean
  fullWidth?: boolean
  children?: ReactNode
  onPress?: () => void
  [key: string]: any
}

const sizeMap: Record<string, { height: number; px: number; fontSize: number; borderRadius: number; letterSpacing?: number }> = {
  xs: { height: 36, px: 20, fontSize: 13, borderRadius: 6 },
  sm: { height: 36, px: 20, fontSize: 13, borderRadius: 6 },
  md: { height: 44, px: 28, fontSize: 14, borderRadius: 8 },
  lg: { height: 52, px: 36, fontSize: 15, borderRadius: 10 },
  xl: { height: 60, px: 44, fontSize: 16, borderRadius: 12, letterSpacing: 1 },
}

const StyledButton = styled(TButton, {
  name: 'Button',
  fontFamily: '$body',
  fontWeight: '500',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
  variants: {
    fullWidth: {
      true: { width: '100%' },
    },
  } as const,
})

const variantStyles: Record<string, Record<string, any>> = {
  primary: {
    backgroundColor: '$primary500',
    color: '$white',
    borderWidth: 0,
    hoverStyle: {
      backgroundColor: '$primary600',
    },
    pressStyle: {
      backgroundColor: '$primary700',
    },
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '$primary500',
    color: '$primary700',
    hoverStyle: {
      backgroundColor: '$primary50',
      borderColor: '$primary600',
    },
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '$neutral300',
    color: '$neutral700',
    hoverStyle: {
      backgroundColor: '$neutral50',
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '$neutral700',
    hoverStyle: {
      backgroundColor: '$neutral100',
    },
  },
  danger: {
    backgroundColor: '$error500',
    color: '$white',
    borderWidth: 0,
    hoverStyle: {
      backgroundColor: '$error600',
    },
  },
  luxury: {
    backgroundColor: '$black',
    color: '$primary300',
    borderWidth: 1,
    borderColor: '$primary500',
    hoverStyle: {
      backgroundColor: '$neutral800',
      borderColor: '$primary400',
    },
  },
}

export const Button = forwardRef<any, ButtonProps>(
  (props: ButtonProps, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      isDisabled,
      fullWidth,
      children,
      ...rest
    } = props

    const v = variant as Variant
    const s = size as Size
    const dims = sizeMap[s] || sizeMap.md
    const styles = variantStyles[v] || variantStyles.primary
    const disabled = isDisabled || isLoading

    const isLuxury = v === 'luxury'

    return (
      <StyledButton
        ref={ref}
        disabled={disabled}
        fullWidth={fullWidth}
        height={dims.height}
        paddingHorizontal={dims.px}
        fontSize={dims.fontSize}
        borderRadius={dims.borderRadius}
        letterSpacing={isLuxury ? 1.5 : dims.letterSpacing}
        {...styles}
        {...rest}
      >
        {isLoading ? (
          <XStack gap="$sm" alignItems="center" justifyContent="center">
            <Spinner size="small" color="inherit" />
            {loadingText && (
              <Text fontSize={dims.fontSize} color="inherit">
                {loadingText}
              </Text>
            )}
          </XStack>
        ) : (
          <XStack gap={8} alignItems="center" justifyContent="center">
            {leftIcon}
            <Text
              fontSize={dims.fontSize}
              color="inherit"
              fontWeight={isLuxury ? '500' : '600'}
              letterSpacing={isLuxury ? 1.5 : 0}
              textTransform={isLuxury ? 'uppercase' : 'none'}
              userSelect="none"
            >
              {children}
            </Text>
            {rightIcon}
          </XStack>
        )}
      </StyledButton>
    )
  }
)

Button.displayName = 'Button'
