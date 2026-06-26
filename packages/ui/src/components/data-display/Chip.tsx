import { styled, YStack, XStack, Text, type XStackProps } from 'tamagui'
import { forwardRef } from 'react'

type ChipVariant = 'solid' | 'outline' | 'subtle'
type ChipColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
type ChipSize = 'sm' | 'md' | 'lg'

export interface ChipProps extends XStackProps {
  variant?: ChipVariant
  colorScheme?: ChipColorScheme
  size?: ChipSize
  isDisabled?: boolean
  onClose?: () => void
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
}

const colorMap: Record<ChipColorScheme, { solid: string; subtle: string; outline: string; text: string }> = {
  primary: { solid: '$primary500', subtle: '$primary100', outline: '$primary500', text: '$primary700' },
  secondary: { solid: '$secondary500', subtle: '$secondary100', outline: '$secondary500', text: '$secondary700' },
  success: { solid: '#22c55e', subtle: '#dcfce7', outline: '#22c55e', text: '#166534' },
  warning: { solid: '#f59e0b', subtle: '#fef3c7', outline: '#f59e0b', text: '#92400e' },
  error: { solid: '#ef4444', subtle: '#fee2e2', outline: '#ef4444', text: '#991b1b' },
  info: { solid: '#3b82f6', subtle: '#dbeafe', outline: '#3b82f6', text: '#1e40af' },
}

const sizeMap: Record<ChipSize, { px: number; py: number; fontSize: number; iconSize: number }> = {
  sm: { px: 8, py: 2, fontSize: 11, iconSize: 12 },
  md: { px: 10, py: 4, fontSize: 13, iconSize: 14 },
  lg: { px: 12, py: 6, fontSize: 14, iconSize: 16 },
}

const ChipFrame = styled(XStack, {
  name: 'Chip',
  borderRadius: '$full',
  alignItems: 'center',
  alignSelf: 'flex-start',
  display: 'inline-flex',
  gap: 4,
})

const CloseButton = styled(YStack, {
  name: 'ChipCloseButton',
  borderRadius: '$full',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  pressStyle: { opacity: 0.7 },
})

export const Chip = forwardRef<any, ChipProps>(
  (
    {
      variant = 'subtle',
      colorScheme = 'primary',
      size: sizeProp = 'md',
      isDisabled = false,
      onClose,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const colors = colorMap[colorScheme]
    const dims = sizeMap[sizeProp]

    const bg =
      variant === 'solid'
        ? colors.solid
        : variant === 'subtle'
        ? colors.subtle
        : 'transparent'

    const border = variant === 'outline' ? { borderWidth: 1, borderColor: colors.outline } : {}
    const textColor = variant === 'solid' ? 'white' : colors.text

    return (
      <ChipFrame
        ref={ref}
        paddingHorizontal={dims.px}
        paddingVertical={dims.py}
        backgroundColor={bg}
        opacity={isDisabled ? 0.5 : 1}
        cursor={isDisabled ? 'not-allowed' : 'default'}
        {...border}
        {...props}
      >
        {leftIcon && (
          <Text fontSize={dims.iconSize} color={textColor}>
            {leftIcon}
          </Text>
        )}
        <Text fontSize={dims.fontSize} fontWeight="500" color={textColor} userSelect="none">
          {children}
        </Text>
        {rightIcon && !onClose && (
          <Text fontSize={dims.iconSize} color={textColor}>
            {rightIcon}
          </Text>
        )}
        {onClose && (
          <CloseButton
            width={dims.fontSize * 1.4}
            height={dims.fontSize * 1.4}
            backgroundColor={variant === 'solid' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}
            onPress={isDisabled ? undefined : onClose}
            aria-label="Close"
            role="button"
            tabIndex={0}
          >
            <Text fontSize={dims.fontSize * 0.7} color={textColor} fontWeight="700">
              ×
            </Text>
          </CloseButton>
        )}
      </ChipFrame>
    )
  }
)

Chip.displayName = 'Chip'


