import { styled, Button, type ButtonProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

type FABPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
type FABSize = 'sm' | 'md' | 'lg'

export interface FloatingActionButtonProps extends Omit<ButtonProps, 'size' | 'position' | 'icon'> {
  icon: ReactNode
  position?: FABPosition
  size?: FABSize
  onPress?: () => void
}

const sizeMap: Record<FABSize, number> = {
  sm: 44,
  md: 56,
  lg: 68,
}

const positionMap: Record<FABPosition, { bottom?: number; top?: number; right?: number; left?: number }> = {
  'bottom-right': { bottom: 24, right: 24 },
  'bottom-left': { bottom: 24, left: 24 },
  'top-right': { top: 24, right: 24 },
  'top-left': { top: 24, left: 24 },
}

const StyledFAB = styled(Button, {
  name: 'FloatingActionButton',
  position: 'fixed',
  borderRadius: '$full',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: 0,
  zIndex: '$sticky',
  backgroundColor: '$primary500',
  color: 'white',
  shadowColor: '$primary500',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.35,
  shadowRadius: 8,
  elevation: 8,
  hoverStyle: {
    backgroundColor: '$primary600',
    shadowOpacity: 0.45,
    elevation: 12,
  },
  pressStyle: {
    backgroundColor: '$primary700',
    shadowOpacity: 0.25,
    elevation: 4,
  },
  focusStyle: {
    borderColor: '$primary300',
    borderWidth: 2,
  },
})

export const FloatingActionButton = forwardRef<any, FloatingActionButtonProps>(
  (props: FloatingActionButtonProps, ref) => {
    const {
      icon,
      position = 'bottom-right',
      size = 'md',
      onPress,
      ...rest
    } = props

    const s = size as FABSize
    const pos = position as FABPosition
    const dim = sizeMap[s]
    const positionStyle = positionMap[pos]

    return (
      <StyledFAB
        ref={ref}
        onPress={onPress}
        width={dim}
        height={dim}
        aria-label="Floating action button"
        role="button"
        {...positionStyle}
        {...rest}
      >
        {icon}
      </StyledFAB>
    )
  }
)

FloatingActionButton.displayName = 'FloatingActionButton'
