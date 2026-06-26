import { forwardRef, useEffect } from 'react'
import { styled, YStack, XStack, Text, Image } from 'tamagui'
import type { YStackProps } from 'tamagui'

export interface LightboxImage {
  src: string
  alt: string
}

export interface LightboxProps extends YStackProps {
  isOpen: boolean
  onClose: () => void
  image: LightboxImage | null
  onPrev?: () => void
  onNext?: () => void
  showCaption?: boolean
}

const Overlay = styled(YStack, {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.9)',
  zIndex: 1000,
  alignItems: 'center',
  justifyContent: 'center',
})

const NavButton = styled(YStack, {
  width: 48,
  height: 48,
  borderRadius: '$full',
  backgroundColor: 'rgba(255,255,255,0.15)',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1001,
  hoverStyle: { backgroundColor: 'rgba(255,255,255,0.25)' },
})

const CloseButton = styled(YStack, {
  position: 'absolute',
  top: 16,
  right: 16,
  width: 40,
  height: 40,
  borderRadius: '$full',
  backgroundColor: 'rgba(255,255,255,0.15)',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 1002,
  hoverStyle: { backgroundColor: 'rgba(255,255,255,0.25)' },
})

export const Lightbox = forwardRef<any, LightboxProps>(
  ({ isOpen, onClose, image, onPrev, onNext, showCaption = false, ...props }, ref) => {
    useEffect(() => {
      if (!isOpen) return
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
        if (e.key === 'ArrowLeft') onPrev?.()
        if (e.key === 'ArrowRight') onNext?.()
      }
      window.addEventListener('keydown', handleKey)
      return () => window.removeEventListener('keydown', handleKey)
    }, [isOpen, onClose, onPrev, onNext])

    if (!isOpen || !image) return null

    return (
      <Overlay ref={ref} role="dialog" aria-modal aria-label={image.alt} {...props}>
        <CloseButton onPress={onClose} aria-label="Close lightbox">
          <Text color="white" fontSize={20} fontWeight="300">✕</Text>
        </CloseButton>
        {onPrev && (
          <NavButton left={16} onPress={onPrev} aria-label="Previous image">
            <Text color="white" fontSize={24}>‹</Text>
          </NavButton>
        )}
        {onNext && (
          <NavButton right={16} onPress={onNext} aria-label="Next image">
            <Text color="white" fontSize={24}>›</Text>
          </NavButton>
        )}
        <YStack maxWidth="90%" maxHeight="85%" alignItems="center" gap={8}>
          <Image
            source={{ uri: image.src }}
            width="100%"
            height="100%"
            resizeMode="contain"
            alt={image.alt}
            style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain' }}
          />
          {showCaption && image.alt && (
            <Text color="rgba(255,255,255,0.8)" fontSize={14} textAlign="center">
              {image.alt}
            </Text>
          )}
        </YStack>
      </Overlay>
    )
  }
)

Lightbox.displayName = 'Lightbox'
