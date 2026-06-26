import { forwardRef, useEffect, useRef } from 'react'
import { styled, YStack, XStack, Text } from 'tamagui'
import type { YStackProps } from 'tamagui'

type ToastVariant = 'info' | 'success' | 'warning' | 'error'
type ToastPosition = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface ToastProps extends Omit<YStackProps, 'position'> {
  id: string
  message: string
  variant?: ToastVariant
  duration?: number
  onClose?: (id: string) => void
  position?: ToastPosition
}

const variantStyle: Record<ToastVariant, { bg: string; iconColor: string; textColor: string }> = {
  info: { bg: '$primary500', iconColor: 'white', textColor: 'white' },
  success: { bg: '#22c55e', iconColor: 'white', textColor: 'white' },
  warning: { bg: '#f59e0b', iconColor: 'white', textColor: 'white' },
  error: { bg: '#ef4444', iconColor: 'white', textColor: 'white' },
}

const ToastRoot = styled(XStack, {
  name: 'Toast',
  borderRadius: '$md',
  padding: '$sm $md',
  gap: 8,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 12,
  elevation: 5,
  minWidth: 280,
  maxWidth: 400,
})

const CloseBtn = styled(YStack, {
  width: 18,
  height: 18,
  borderRadius: '$full',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  marginLeft: 'auto',
  flexShrink: 0,
  hoverStyle: { opacity: 0.7 },
})

export const Toast = forwardRef<any, ToastProps>(
  ({ id, message, variant = 'info', duration = 4000, onClose, position, ...props }, ref) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const vars = variantStyle[variant]

    useEffect(() => {
      if (duration > 0) {
        timerRef.current = setTimeout(() => onClose?.(id), duration)
      }
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }, [id, duration, onClose])

    return (
      <ToastRoot
        ref={ref}
        backgroundColor={vars.bg}
        role="status"
        aria-live="polite"
        {...props}
      >
        <Text fontSize={14} color={vars.iconColor}>
          {variant === 'info' ? 'ℹ' : variant === 'success' ? '✓' : variant === 'warning' ? '⚠' : '✕'}
        </Text>
        <Text fontSize={14} fontWeight="500" color={vars.textColor} flex={1}>
          {message}
        </Text>
        <CloseBtn
          backgroundColor="rgba(255,255,255,0.2)"
          onPress={() => onClose?.(id)}
          aria-label="Close"
          role="button"
        >
          <Text fontSize={11} fontWeight="700" color={vars.textColor}>
            ×
          </Text>
        </CloseBtn>
      </ToastRoot>
    )
  }
)

Toast.displayName = 'Toast'

export type { ToastVariant, ToastPosition }
