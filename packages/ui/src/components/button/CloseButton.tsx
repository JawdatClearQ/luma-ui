import { styled, Button, type ButtonProps } from 'tamagui'
import { forwardRef } from 'react'

type CloseSize = 'sm' | 'md' | 'lg'

export interface CloseButtonProps extends Omit<ButtonProps, 'size'> {
  size?: CloseSize
  onPress?: () => void
  ariaLabel?: string
}

const sizeMap: Record<CloseSize, number> = {
  sm: 24,
  md: 32,
  lg: 40,
}

const CloseIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const StyledCloseButton = styled(Button, {
  name: 'CloseButton',
  borderRadius: '$full',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: 0,
  backgroundColor: 'transparent',
  color: '$textSecondary',
  hoverStyle: {
    backgroundColor: '$gray100',
    transform: [{ rotate: '90deg' }],
  },
  pressStyle: {
    backgroundColor: '$gray200',
  },
  focusStyle: {
    borderColor: '$primary400',
    borderWidth: 2,
  },
})

export const CloseButton = forwardRef<any, CloseButtonProps>(
  (props: CloseButtonProps, ref) => {
    const {
      size = 'md',
      onPress,
      ariaLabel = 'Close',
      ...rest
    } = props

    const s = size as CloseSize
    const dim = sizeMap[s]
    const iconSize = Math.round(dim * 0.5)

    return (
      <StyledCloseButton
        ref={ref}
        onPress={onPress}
        aria-label={ariaLabel}
        width={dim}
        height={dim}
        {...rest}
      >
        <CloseIcon size={iconSize} />
      </StyledCloseButton>
    )
  }
)

CloseButton.displayName = 'CloseButton'
