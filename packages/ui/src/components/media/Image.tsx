import { forwardRef, useState } from 'react'
import { styled, YStack, Image as TamaguiImage, Text } from 'tamagui'
import type { YStackProps } from 'tamagui'

type ResizeMode = 'cover' | 'contain' | 'stretch'

export interface ImageProps extends YStackProps {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  fallback?: React.ReactNode
  lazy?: boolean
  resizeMode?: ResizeMode
  rounded?: boolean | number
  onLoad?: () => void
  onError?: () => void
}

const ImageFrame = styled(YStack, {
  name: 'Image',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: '$gray100',
})

const resizeMap: Record<ResizeMode, any> = {
  cover: 'cover',
  contain: 'contain',
  stretch: 'stretch',
}

export const Image = forwardRef<any, ImageProps>(
  (
    {
      src,
      alt,
      width: w,
      height: h,
      fallback,
      lazy = false,
      resizeMode = 'cover',
      rounded = false,
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const [loaded, setLoaded] = useState(false)
    const [errored, setErrored] = useState(false)
    const borderRadius = typeof rounded === 'number' ? rounded : rounded ? 8 : 0

    if (errored && fallback) {
      return (
        <ImageFrame
          ref={ref}
          width={w}
          height={h}
          borderRadius={borderRadius}
          {...props}
        >
          {fallback}
        </ImageFrame>
      )
    }

    return (
      <ImageFrame
        ref={ref}
        width={w}
        height={h}
        borderRadius={borderRadius}
        {...props}
      >
        {!loaded && !errored && (
          <YStack
            position="absolute"
            inset={0}
            backgroundColor="$gray200"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={20} color="$gray400">○</Text>
          </YStack>
        )}
        <TamaguiImage
          source={{ uri: src }}
          width="100%"
          height="100%"
          resizeMode={resizeMap[resizeMode]}
          opacity={loaded ? 1 : 0}
          onLoad={() => {
            setLoaded(true)
            onLoad?.()
          }}
          onError={() => {
            setErrored(true)
            onError?.()
          }}
          alt={alt}
          loading={lazy ? 'lazy' : undefined}
        />
      </ImageFrame>
    )
  }
)

Image.displayName = 'Image'
