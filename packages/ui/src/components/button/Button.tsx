import { styled, Button as TButton, type ButtonProps as TButtonProps, Spinner, Text, XStack } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

export interface ButtonProps extends Omit<TButtonProps, 'variant' | 'size' | 'icon'> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  loadingText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  isDisabled?: boolean
  fullWidth?: boolean
  colorScheme?: ColorScheme
}

const sizeMap: Record<Size, { height: number; px: number; fontSize: number }> = {
  xs: { height: 24, px: 8, fontSize: 12 },
  sm: { height: 32, px: 12, fontSize: 14 },
  md: { height: 40, px: 16, fontSize: 14 },
  lg: { height: 48, px: 24, fontSize: 16 },
  xl: { height: 56, px: 32, fontSize: 18 },
}

const variantStyles: Record<Variant, Record<string, any>> = {
  primary: {
    backgroundColor: '$primary500',
    color: 'white',
    hoverStyle: { backgroundColor: '$primary600' },
    pressStyle: { backgroundColor: '$primary700' },
    focusStyle: { borderColor: '$primary300', borderWidth: 2 },
    disabledStyle: { backgroundColor: '$gray300', color: '$gray500' },
  },
  secondary: {
    backgroundColor: '$secondary500',
    color: 'white',
    hoverStyle: { backgroundColor: '$secondary600' },
    pressStyle: { backgroundColor: '$secondary700' },
    focusStyle: { borderColor: '$secondary300', borderWidth: 2 },
    disabledStyle: { backgroundColor: '$gray300', color: '$gray500' },
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '$border',
    color: '$textPrimary',
    hoverStyle: { backgroundColor: '$gray50' },
    pressStyle: { backgroundColor: '$gray100' },
    focusStyle: { borderColor: '$primary400', borderWidth: 2 },
    disabledStyle: { opacity: 0.4, backgroundColor: 'transparent' },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '$textPrimary',
    hoverStyle: { backgroundColor: '$gray100' },
    pressStyle: { backgroundColor: '$gray200' },
    focusStyle: { backgroundColor: '$gray100' },
    disabledStyle: { opacity: 0.4, backgroundColor: 'transparent' },
  },
  link: {
    backgroundColor: 'transparent',
    color: '$primary500',
    textDecorationLine: 'underline',
    hoverStyle: { color: '$primary600' },
    pressStyle: { color: '$primary700' },
    focusStyle: { outlineColor: '$primary300' },
    disabledStyle: { opacity: 0.4, backgroundColor: 'transparent' },
  },
  danger: {
    backgroundColor: '$error',
    color: 'white',
    hoverStyle: { backgroundColor: '#dc2626' },
    pressStyle: { backgroundColor: '#b91c1c' },
    focusStyle: { borderColor: '#fca5a5', borderWidth: 2 },
    disabledStyle: { backgroundColor: '$gray300', color: '$gray500' },
  },
}

const StyledButton = styled(TButton, {
  name: 'Button',
  fontFamily: '$body',
  fontWeight: '600',
  borderRadius: '$md',
  cursor: 'pointer',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$sm',
  variants: {
    fullWidth: {
      true: { width: '100%' },
    },
  } as const,
})

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
      colorScheme,
      children,
      ...rest
    } = props

    const v = variant as Variant
    const s = size as Size
    const dims = sizeMap[s]
    const styles = variantStyles[v]
    const disabled = isDisabled || isLoading

    return (
      <StyledButton
        ref={ref}
        disabled={disabled}
        fullWidth={fullWidth}
        aria-disabled={disabled}
        aria-busy={isLoading}
        height={dims.height}
        paddingHorizontal={dims.px}
        fontSize={dims.fontSize}
        {...styles}
        {...rest}
        role="button"
      >
        {isLoading ? (
          <XStack gap="$sm" alignItems="center" justifyContent="center">
            <Spinner size="small" color="inherit" />
            {loadingText ? (
              <Text fontSize={dims.fontSize} color="inherit" userSelect="none">
                {loadingText}
              </Text>
            ) : null}
          </XStack>
        ) : (
          <XStack gap="$sm" alignItems="center" justifyContent="center">
            {leftIcon}
            {children && (
              <Text fontSize={dims.fontSize} color="inherit" fontWeight="600" userSelect="none">
                {children}
              </Text>
            )}
            {rightIcon}
          </XStack>
        )}
      </StyledButton>
    )
  }
)

Button.displayName = 'Button'
