"use client";

import { forwardRef } from 'react'
import { styled, YStack, XStack, Text } from 'tamagui'
import type { YStackProps } from 'tamagui'

type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps extends Omit<YStackProps, 'position'> {
  title?: string
  description?: string
  status?: ToastVariant
  isClosable?: boolean
  onClose?: () => void
  duration?: number
}

const variantMap: Record<ToastVariant, { bg: string; iconColor: string; textColor: string }> = {
  success: { bg: '#22c55e', iconColor: 'white', textColor: 'white' },
  error: { bg: '#ef4444', iconColor: 'white', textColor: 'white' },
  warning: { bg: '#f59e0b', iconColor: 'white', textColor: 'white' },
  info: { bg: '#3b82f6', iconColor: 'white', textColor: 'white' },
}

const ToastRoot = styled(YStack, {
  name: 'Toast',
  borderRadius: '$md',
  padding: '$md',
  gap: 4,
  elevation: 5,
})

export const Toast = forwardRef<any, ToastProps>(
  ({ title, description, status = 'info', isClosable, onClose, ...props }, ref) => {
    const vars = variantMap[status]

    return (
      <ToastRoot
        ref={ref}
        backgroundColor={vars.bg}
        role="alert"
        {...props}
      >
        <XStack gap={8} alignItems="flex-start">
          <YStack flex={1} gap={2}>
            {title && (
              <Text fontWeight="600" fontSize={14} color={vars.textColor}>
                {title}
              </Text>
            )}
            {description && (
              <Text fontSize={13} color={vars.textColor} lineHeight={18}>
                {description}
              </Text>
            )}
          </YStack>
          {isClosable && (
            <Text
              fontSize={16}
              fontWeight="700"
              color={vars.textColor}
              onPress={onClose}
              cursor="pointer"
              aria-label="Close"
              role="button"
            >
              ×
            </Text>
          )}
        </XStack>
      </ToastRoot>
    )
  }
)

Toast.displayName = 'Toast'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
