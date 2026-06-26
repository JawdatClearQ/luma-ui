import { styled, Button, type ButtonProps, Spinner } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

type IconButtonVariant = 'solid' | 'outline' | 'ghost'
type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface IconButtonProps extends Omit<ButtonProps, 'variant' | 'size' | 'icon'> {
  icon: ReactNode
  variant?: IconButtonVariant
  size?: IconButtonSize
  isDisabled?: boolean
  ariaLabel?: string
  isLoading?: boolean
}

const sizeMap: Record<IconButtonSize, { size: number; iconSize: number }> = {
  xs: { size: 24, iconSize: 12 },
  sm: { size: 32, iconSize: 16 },
  md: { size: 40, iconSize: 20 },
  lg: { size: 48, iconSize: 24 },
  xl: { size: 56, iconSize: 28 },
}

const variantStyles: Record<IconButtonVariant, Record<string, any>> = {
  solid: {
    backgroundColor: '$gray100',
    color: '$textPrimary',
    hoverStyle: { backgroundColor: '$gray200' },
    pressStyle: { backgroundColor: '$gray300' },
    focusStyle: { borderColor: '$primary400', borderWidth: 2 },
    disabledStyle: { opacity: 0.4, backgroundColor: '$gray100' },
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
}

const StyledIconButton = styled(Button, {
  name: 'IconButton',
  borderRadius: '$full',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: 0,
})

export const IconButton = forwardRef<any, IconButtonProps>(
  (props: IconButtonProps, ref) => {
    const {
      icon,
      variant = 'ghost',
      size = 'md',
      isDisabled,
      isLoading = false,
      ariaLabel,
      ...rest
    } = props

    const v = variant as IconButtonVariant
    const s = size as IconButtonSize
    const dims = sizeMap[s]
    const styles = variantStyles[v]
    const disabled = isDisabled || isLoading

    return (
      <StyledIconButton
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={ariaLabel || 'Icon button'}
        width={dims.size}
        height={dims.size}
        {...styles}
        {...rest}
      >
        {isLoading ? <Spinner size="small" color="inherit" /> : icon}
      </StyledIconButton>
    )
  }
)

IconButton.displayName = 'IconButton'
