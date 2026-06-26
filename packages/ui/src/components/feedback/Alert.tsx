import { forwardRef, useState } from 'react'
import { styled, YStack, XStack, Text } from 'tamagui'
import type { YStackProps } from 'tamagui'

type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps extends YStackProps {
  variant?: AlertVariant
  title?: string
  children?: React.ReactNode
  isClosable?: boolean
  onClose?: () => void
  icon?: React.ReactNode
}

const variantMap: Record<AlertVariant, { bg: string; border: string; iconColor: string; textColor: string; titleColor: string }> = {
  info: { bg: '$primary100', border: '$primary300', iconColor: '$primary500', textColor: '$primary700', titleColor: '$primary800' },
  success: { bg: '#dcfce7', border: '#86efac', iconColor: '#22c55e', textColor: '#166534', titleColor: '#14532d' },
  warning: { bg: '#fef3c7', border: '#fde68a', iconColor: '#f59e0b', textColor: '#92400e', titleColor: '#78350f' },
  error: { bg: '#fee2e2', border: '#fecaca', iconColor: '#ef4444', textColor: '#991b1b', titleColor: '#7f1d1d' },
}

const AlertRoot = styled(YStack, {
  name: 'Alert',
  borderRadius: '$md',
  borderWidth: 1,
  padding: '$md',
  gap: 4,
})

const CloseButton = styled(YStack, {
  width: 20,
  height: 20,
  borderRadius: '$full',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  hoverStyle: { opacity: 0.7 },
})

export const Alert = forwardRef<any, AlertProps>(
  ({ variant = 'info', title, children, isClosable, onClose, icon, ...props }, ref) => {
    const [hidden, setHidden] = useState(false)
    const vars = variantMap[variant]

    if (hidden) return null

    return (
      <AlertRoot
        ref={ref}
        backgroundColor={vars.bg}
        borderColor={vars.border}
        role="alert"
        {...props}
      >
        <XStack gap={8} alignItems="flex-start">
          {(icon || true) && (
            <Text fontSize={16} color={vars.iconColor} marginTop={1}>
              {icon || defaultIcon(variant)}
            </Text>
          )}
          <YStack flex={1} gap={2}>
            {title && (
              <Text fontWeight="600" fontSize={14} color={vars.titleColor}>
                {title}
              </Text>
            )}
            {children && (
              <Text fontSize={13} color={vars.textColor} lineHeight={18}>
                {children}
              </Text>
            )}
          </YStack>
          {isClosable && (
            <CloseButton
              backgroundColor={vars.border}
              onPress={() => {
                setHidden(true)
                onClose?.()
              }}
              aria-label="Close alert"
              role="button"
              tabIndex={0}
            >
              <Text fontSize={12} fontWeight="700" color={vars.textColor}>
                ×
              </Text>
            </CloseButton>
          )}
        </XStack>
      </AlertRoot>
    )
  }
)

Alert.displayName = 'Alert'

function defaultIcon(variant: AlertVariant): string {
  switch (variant) {
    case 'info': return 'ℹ'
    case 'success': return '✓'
    case 'warning': return '⚠'
    case 'error': return '✕'
  }
}
