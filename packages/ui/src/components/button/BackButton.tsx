import { styled, Button, type ButtonProps } from 'tamagui'
import { forwardRef } from 'react'

type BackSize = 'sm' | 'md' | 'lg'

export interface BackButtonProps extends Omit<ButtonProps, 'size'> {
  onPress?: () => void
  size?: BackSize
  ariaLabel?: string
}

const sizeMap: Record<BackSize, number> = {
  sm: 24,
  md: 32,
  lg: 40,
}

const ArrowLeftIcon = ({ size }: { size: number }) => (
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
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const StyledBackButton = styled(Button, {
  name: 'BackButton',
  borderRadius: '$full',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: 0,
  backgroundColor: 'transparent',
  color: '$textSecondary',
  hoverStyle: {
    backgroundColor: '$gray100',
  },
  pressStyle: {
    backgroundColor: '$gray200',
  },
  focusStyle: {
    borderColor: '$primary400',
    borderWidth: 2,
  },
})

export const BackButton = forwardRef<any, BackButtonProps>(
  (props: BackButtonProps, ref) => {
    const {
      onPress,
      size = 'md',
      ariaLabel = 'Go back',
      ...rest
    } = props

    const s = size as BackSize
    const dim = sizeMap[s]
    const iconSize = Math.round(dim * 0.5)

    return (
      <StyledBackButton
        ref={ref}
        onPress={onPress}
        aria-label={ariaLabel}
        width={dim}
        height={dim}
        {...rest}
      >
        <ArrowLeftIcon size={iconSize} />
      </StyledBackButton>
    )
  }
)

BackButton.displayName = 'BackButton'
