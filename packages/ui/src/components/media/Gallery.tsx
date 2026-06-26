import { forwardRef } from 'react'
import { styled, YStack, Image, Text } from 'tamagui'
import type { YStackProps } from 'tamagui'

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

export interface GalleryProps extends YStackProps {
  images: GalleryImage[]
  columns?: number
  gap?: number
  onImageClick?: (image: GalleryImage, index: number) => void
}

const GalleryGrid = styled(YStack, {
  name: 'Gallery',
  flexWrap: 'wrap',
  flexDirection: 'row',
})

const ImageContainer = styled(YStack, {
  overflow: 'hidden',
  borderRadius: '$md',
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: '$gray100',
  hoverStyle: { opacity: 0.9 },
})

export const Gallery = forwardRef<any, GalleryProps>(
  ({ images, columns = 3, gap = 8, onImageClick, ...props }, ref) => {
    const colWidth = `${100 / columns}%`

    return (
      <GalleryGrid ref={ref} gap={gap} {...props}>
        {images.map((img, idx) => (
          <ImageContainer
            key={img.src}
            width={colWidth}
            padding={gap / 2}
            onPress={() => onImageClick?.(img, idx)}
            role="button"
            aria-label={img.alt}
          >
            <YStack aspectRatio={1} width="100%">
              <Image
                source={{ uri: img.src }}
                width="100%"
                height="100%"
                resizeMode="cover"
                alt={img.alt}
              />
            </YStack>
            {img.caption && (
              <YStack
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                backgroundColor="rgba(0,0,0,0.6)"
                padding="$sm"
              >
                <Text fontSize={12} color="white" numberOfLines={1}>
                  {img.caption}
                </Text>
              </YStack>
            )}
          </ImageContainer>
        ))}
      </GalleryGrid>
    )
  }
)

Gallery.displayName = 'Gallery'
