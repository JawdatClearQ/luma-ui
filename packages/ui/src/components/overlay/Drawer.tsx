import { styled, YStack, XStack, Text, type YStackProps } from 'tamagui'
import { forwardRef, type ReactNode, useEffect, useCallback } from 'react'
import { CloseButton } from '../button/CloseButton'

type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'
type DrawerSize = number | 'sm' | 'md' | 'lg'

export interface DrawerProps extends YStackProps {
  isOpen: boolean
  onClose: () => void
  placement?: DrawerPlacement
  size?: DrawerSize
  title?: string
  children: ReactNode
}

const sizePresets: Record<string, number | string> = {
  sm: 300,
  md: 400,
  lg: 500,
}

const placementStyles: Record<DrawerPlacement, Record<string, any>> = {
  left: {
    top: 0,
    left: 0,
    bottom: 0,
    height: '100%',
  },
  right: {
    top: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  top: {
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
}

const Overlay = styled(YStack, {
  name: 'DrawerOverlay',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '$overlay',
  zIndex: '$modal',
})

const Panel = styled(YStack, {
  name: 'DrawerPanel',
  position: 'fixed',
  zIndex: '$modal',
  backgroundColor: '$background',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 12,
  elevation: 16,
  overflow: 'hidden',
})

export const Drawer = forwardRef<any, DrawerProps>(
  (props: DrawerProps, ref) => {
    const {
      isOpen,
      onClose,
      placement = 'right',
      size = 'md',
      title,
      children,
      ...rest
    } = props

    const p = placement as DrawerPlacement
    const dim = typeof size === 'string' ? (sizePresets[size] ?? 400) : size
    const isHorizontal = p === 'left' || p === 'right'
    const pos = placementStyles[p]

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
      <Overlay onPress={onClose}>
        <Panel
          ref={ref}
          role="dialog"
          aria-modal={true}
          aria-label={title}
          {...pos}
          {...(isHorizontal ? { width: dim } : { height: dim })}
          onPress={(e: any) => e.stopPropagation()}
          {...rest}
        >
          {title && (
            <XStack
              padding="$lg"
              borderBottomWidth={1}
              borderBottomColor="$border"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize={18} fontWeight="600" color="$textPrimary">
                {title}
              </Text>
              <CloseButton onPress={onClose} size="sm" />
            </XStack>
          )}
          <YStack padding="$lg" overflowY="auto" flex={1}>
            {children}
          </YStack>
        </Panel>
      </Overlay>
    )
  }
)

Drawer.displayName = 'Drawer'
