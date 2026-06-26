import { styled, YStack, XStack, Text, type YStackProps } from 'tamagui'
import { forwardRef, type ReactNode, useEffect, useCallback } from 'react'

export interface ActionSheetItem {
  label: string
  icon?: ReactNode
  onPress?: () => void
  isDestructive?: boolean
}

export interface ActionSheetProps extends YStackProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  items: ActionSheetItem[]
  cancelLabel?: string
}

const Overlay = styled(YStack, {
  name: 'ActionSheetOverlay',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '$overlay',
  zIndex: '$modal',
  justifyContent: 'flex-end',
})

const Sheet = styled(YStack, {
  name: 'ActionSheet',
  backgroundColor: '$background',
  borderTopLeftRadius: '$xl',
  borderTopRightRadius: '$xl',
  paddingTop: '$md',
  paddingBottom: '$xl',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.1,
  shadowRadius: 12,
  elevation: 16,
})

const ActionItem = styled(XStack, {
  name: 'ActionSheetItem',
  alignItems: 'center',
  gap: '$md',
  padding: '$md',
  cursor: 'pointer',
  hoverStyle: { backgroundColor: '$gray100' },
  pressStyle: { backgroundColor: '$gray200' },
})

const CancelButton = styled(XStack, {
  name: 'ActionSheetCancel',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$md',
  marginTop: '$sm',
  marginHorizontal: '$md',
  backgroundColor: '$gray100',
  borderRadius: '$md',
  cursor: 'pointer',
  fontWeight: '600',
  hoverStyle: { backgroundColor: '$gray200' },
  pressStyle: { backgroundColor: '$gray300' },
})

const Handle = styled(YStack, {
  width: 36,
  height: 4,
  backgroundColor: '$gray300',
  borderRadius: '$full',
  alignSelf: 'center',
  marginBottom: '$md',
})

export const ActionSheet = forwardRef<any, ActionSheetProps>(
  (props: ActionSheetProps, ref) => {
    const {
      isOpen,
      onClose,
      title,
      items,
      cancelLabel = 'Cancel',
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

    return (
      <Overlay
        ref={ref}
        role="dialog"
        aria-modal={true}
        aria-label={title || 'Action sheet'}
        onPress={onClose}
      >
        <Sheet onPress={(e: any) => e.stopPropagation()} {...rest}>
          <Handle />
          {title && (
            <Text
              fontSize={16}
              fontWeight="600"
              color="$textSecondary"
              textAlign="center"
              marginBottom="$sm"
              paddingHorizontal="$md"
            >
              {title}
            </Text>
          )}
          <YStack paddingHorizontal="$md">
            {items.map((item, index) => (
              <ActionItem
                key={item.label}
                role="button"
                tabIndex={0}
                onPress={() => {
                  item.onPress?.()
                  onClose()
                }}
                aria-label={item.label}
              >
                {item.icon && (
                  <Text
                    fontSize={20}
                    color={item.isDestructive ? '$error' : '$textSecondary'}
                  >
                    {item.icon}
                  </Text>
                )}
                <Text
                  fontSize={16}
                  color={item.isDestructive ? '$error' : '$textPrimary'}
                >
                  {item.label}
                </Text>
              </ActionItem>
            ))}
          </YStack>
          <CancelButton onPress={onClose} role="button" tabIndex={0}>
            <Text fontSize={16} fontWeight="600" color="$textPrimary">
              {cancelLabel}
            </Text>
          </CancelButton>
        </Sheet>
      </Overlay>
    )
  }
)

ActionSheet.displayName = 'ActionSheet'
