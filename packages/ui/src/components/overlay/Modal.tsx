"use client";

import { styled, YStack, XStack, Text, Button, type YStackProps, type XStackProps } from 'tamagui'
import { forwardRef, type ReactNode, useEffect, useCallback } from 'react'
import { CloseButton } from '../button/CloseButton'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps extends YStackProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: ModalSize
  children: ReactNode
  closeOnOverlayClick?: boolean
  isCentered?: boolean
}

const sizeMap: Record<ModalSize, { width: string | number; maxWidth: string | number }> = {
  sm: { width: '100%', maxWidth: 400 },
  md: { width: '100%', maxWidth: 560 },
  lg: { width: '100%', maxWidth: 720 },
  xl: { width: '100%', maxWidth: 960 },
  full: { width: '100%', maxWidth: '100%' },
}

const Overlay = styled(YStack, {
  name: 'ModalOverlay',
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
  name: 'ModalPanel',
  backgroundColor: '$background',
  borderRadius: '$xl',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.15,
  shadowRadius: 30,
  elevation: 16,
  maxHeight: '85vh',
  overflow: 'hidden',
})

export const Modal = forwardRef<any, ModalProps>(
  (props: ModalProps, ref) => {
    const {
      isOpen,
      onClose,
      title,
      size = 'md',
      children,
      closeOnOverlayClick = true,
      isCentered = true,
      ...rest
    } = props

    const s = size as ModalSize
    const dims = sizeMap[s]

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
        aria-label={title}
        onPress={closeOnOverlayClick ? onClose : undefined}
      >
        <Panel
          width={dims.width}
          maxWidth={dims.maxWidth}
          {...(isCentered && { alignSelf: 'center' })}
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
          <YStack padding="$lg" overflowY="auto">
            {children}
          </YStack>
        </Panel>
      </Overlay>
    )
  }
)

Modal.displayName = 'Modal'
