"use client";

import { forwardRef } from 'react'
import { styled, YStack, XStack, Text } from 'tamagui'
import type { YStackProps } from 'tamagui'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom'

export interface ToastProps extends Omit<YStackProps, 'position'> {
  title?: string
  description?: string
  status?: ToastVariant
  isClosable?: boolean
  onClose?: () => void
  duration?: number
}

const variantMap: Record<ToastVariant, { border: string; badge: string; textColor: string; titleColor: string }> = {
  success: { border: '#c4d7b2', badge: '#6f8f4e', textColor: '#4a5e35', titleColor: '#2f3d21' },
  error: { border: '#e0bcb3', badge: '#b86a5a', textColor: '#7a463c', titleColor: '#552f27' },
  warning: { border: '#e8d09e', badge: '#c49b3f', textColor: '#7a6530', titleColor: '#54461f' },
  info: { border: '#d4c5a9', badge: '#8b7355', textColor: '#5c4f3a', titleColor: '#3d3425' },
}

const ToastRoot = styled(YStack, {
  name: 'Toast',
  borderRadius: 12,
  paddingHorizontal: 20,
  paddingVertical: 16,
  backgroundColor: '#fefcf9',
  borderWidth: 1,
  borderColor: '#e8ddd0',
  shadowColor: '#1a1410',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.08,
  shadowRadius: 24,
  gap: 4,
})

export const Toast = forwardRef<any, ToastProps>(
  ({ title, description, status = 'info', isClosable, onClose, ...props }, ref) => {
    const vars = variantMap[status]

    return (
      <ToastRoot
        ref={ref}
        borderLeftWidth={3}
        borderLeftColor={vars.border}
        role="alert"
        {...props}
      >
        <XStack gap={14} alignItems="flex-start">
          <YStack
            width={8}
            height={8}
            borderRadius={9999}
            backgroundColor={vars.badge}
            marginTop={6}
            flexShrink={0}
          />
          <YStack flex={1} gap={3}>
            {title && (
              <Text fontWeight="600" fontSize={14} letterSpacing={0.15} color={vars.titleColor}>
                {title}
              </Text>
            )}
            {description && (
              <Text fontSize={13} color={vars.textColor} lineHeight={20} fontWeight="400">
                {description}
              </Text>
            )}
          </YStack>
          {isClosable && (
            <Text
              fontSize={18}
              fontWeight="300"
              color="#c4b5a0"
              onPress={onClose}
              cursor="pointer"
              aria-label="Close"
              role="button"
              hoverStyle={{ color: '#8b7a64' }}
              selectable={false}
              marginTop={-2}
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
