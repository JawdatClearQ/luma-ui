"use client";

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
  info: { bg: '#faf6f0', border: '#d4c5a9', iconColor: '#8b7355', textColor: '#5c4f3a', titleColor: '#3d3425' },
  success: { bg: '#f4f6ed', border: '#b8c9a3', iconColor: '#6f8f4e', textColor: '#4a5e35', titleColor: '#2f3d21' },
  warning: { bg: '#fdf6ea', border: '#e8d09e', iconColor: '#c49b3f', textColor: '#7a6530', titleColor: '#54461f' },
  error: { bg: '#fbf0ed', border: '#e0bcb3', iconColor: '#b86a5a', textColor: '#7a463c', titleColor: '#552f27' },
}

const AlertRoot = styled(YStack, {
  name: 'Alert',
  borderRadius: 12,
  borderWidth: 1,
  paddingVertical: 16,
  paddingHorizontal: 20,
  gap: 4,
  shadowColor: '#1a1410',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.04,
  shadowRadius: 8,
})

const CloseButton = styled(YStack, {
  width: 22,
  height: 22,
  borderRadius: 9999,
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  opacity: 0.5,
  hoverStyle: { opacity: 0.85 },
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
        borderLeftWidth={3}
        borderLeftColor={vars.border}
        role="alert"
        {...props}
      >
        <XStack gap={12} alignItems="flex-start">
          {(icon || true) && (
            <Text fontSize={16} color={vars.iconColor} marginTop={2} fontWeight="400">
              {icon || defaultIcon(variant)}
            </Text>
          )}
          <YStack flex={1} gap={4}>
            {title && (
              <Text fontWeight="600" fontSize={14} letterSpacing={0.2} color={vars.titleColor}>
                {title}
              </Text>
            )}
            {children && (
              <Text fontSize={13} color={vars.textColor} lineHeight={20} fontWeight="400">
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
              <Text fontSize={13} fontWeight="500" color={vars.bg} selectable={false}>
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
    case 'info': return 'i'
    case 'success': return '✓'
    case 'warning': return '▲'
    case 'error': return '✕'
  }
}
