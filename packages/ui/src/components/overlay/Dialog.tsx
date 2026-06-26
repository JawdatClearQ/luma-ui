import { styled, YStack, XStack, Text, Button, type YStackProps } from 'tamagui'
import { forwardRef, useEffect, useCallback } from 'react'

type DialogVariant = 'alert' | 'confirm' | 'prompt'

export interface DialogProps extends YStackProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: DialogVariant
  onConfirm?: () => void
  onCancel?: () => void
  isDestructive?: boolean
}

const Overlay = styled(YStack, {
  name: 'DialogOverlay',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '$overlay',
  zIndex: '$modal',
  justifyContent: 'center',
  alignItems: 'center',
})

const Panel = styled(YStack, {
  name: 'DialogPanel',
  backgroundColor: '$background',
  borderRadius: '$xl',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.15,
  shadowRadius: 30,
  elevation: 16,
  width: '100%',
  maxWidth: 400,
  padding: '$lg',
})

export const Dialog = forwardRef<any, DialogProps>(
  (props: DialogProps, ref) => {
    const {
      isOpen,
      onClose,
      title,
      message,
      confirmLabel = 'Confirm',
      cancelLabel = 'Cancel',
      variant = 'confirm',
      onConfirm,
      onCancel,
      isDestructive = false,
      ...rest
    } = props

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      },
      [onClose]
    )

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      }
    }, [isOpen, handleKeyDown])

    if (!isOpen) return null

    const handleConfirm = () => {
      onConfirm?.()
      onClose()
    }

    const handleCancel = () => {
      onCancel?.()
      onClose()
    }

    return (
      <Overlay
        role="alertdialog"
        aria-modal={true}
        aria-label={title}
        aria-describedby="dialog-message"
      >
        <Panel
          ref={ref}
          onPress={(e: any) => e.stopPropagation()}
          {...rest}
        >
          <YStack gap="$md">
            <Text fontSize={18} fontWeight="600" color="$textPrimary">
              {title}
            </Text>

            <Text id="dialog-message" fontSize={14} color="$textSecondary" lineHeight={20}>
              {message}
            </Text>

            <XStack gap="$sm" justifyContent="flex-end" marginTop="$md">
              {variant === 'alert' ? (
                <Button
                  onPress={handleConfirm}
                  backgroundColor="$primary500"
                  color="white"
                  hoverStyle={{ backgroundColor: '$primary600' }}
                  pressStyle={{ backgroundColor: '$primary700' }}
                >
                  {confirmLabel}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    onPress={handleCancel}
                  >
                    {cancelLabel}
                  </Button>
                  <Button
                    onPress={handleConfirm}
                    {...(isDestructive
                      ? {
                          backgroundColor: '$error',
                          color: 'white',
                          hoverStyle: { backgroundColor: '#dc2626' },
                          pressStyle: { backgroundColor: '#b91c1c' },
                        }
                      : {
                          backgroundColor: '$primary500',
                          color: 'white',
                          hoverStyle: { backgroundColor: '$primary600' },
                          pressStyle: { backgroundColor: '$primary700' },
                        })}
                  >
                    {confirmLabel}
                  </Button>
                </>
              )}
            </XStack>
          </YStack>
        </Panel>
      </Overlay>
    )
  }
)

Dialog.displayName = 'Dialog'
