"use client";

import { styled, YStack, Text, Image as TamaguiImage, Circle, type XStackProps } from 'tamagui'
import { forwardRef, useState, useMemo } from 'react'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type StatusType = 'online' | 'offline' | 'away' | 'busy'

const sizeMap: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  '2xl': 64,
}

const statusColorMap: Record<StatusType, string> = {
  online: '#5C8A42',
  offline: '#B8B2A4',
  away: '#A8822E',
  busy: '#8B3A4B',
}

export interface AvatarProps extends XStackProps {
  src?: string
  alt: string
  name?: string
  size?: AvatarSize
  showBorder?: boolean
  status?: StatusType
  onError?: () => void
}

const AvatarFrame = styled(YStack, {
  name: 'Avatar',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$full',
  backgroundColor: '$neutral200',
  overflow: 'hidden',
  flexShrink: 0,
})

const StatusDot = styled(Circle, {
  name: 'StatusDot',
  position: 'absolute',
  bottom: 0,
  right: 0,
  borderWidth: 2,
  borderColor: '$white',
  zIndex: 1,
})

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((n) => n.length > 0)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')
}

export const Avatar = forwardRef<any, AvatarProps>(
  ({ src, alt, name, size = 'md', showBorder = false, status, onError, ...props }, ref) => {
    const [imgError, setImgError] = useState(false)
    const dimension = sizeMap[size]
    const hasImg = !!(src && !imgError)
    const initials = useMemo(() => (name ? getInitials(name) : ''), [name])

    const borderStyle = showBorder
      ? { borderWidth: 2, borderColor: '$primary300' }
      : {}

    const statusSize = Math.max(dimension * 0.3, 8)

    return (
      <AvatarFrame
        ref={ref}
        width={dimension}
        height={dimension}
        {...borderStyle}
        {...props}
        role="img"
        aria-label={alt}
      >
        {hasImg ? (
          <TamaguiImage
            source={{ uri: src }}
            width={dimension}
            height={dimension}
            resizeMode="cover"
            onError={() => {
              setImgError(true)
              onError?.()
            }}
            alt={alt}
          />
        ) : (
          <Text
            fontWeight="600"
            color="$neutral700"
            fontSize={dimension * 0.4}
          >
            {initials || '?'}
          </Text>
        )}
        {status && (
          <StatusDot
            width={statusSize}
            height={statusSize}
            backgroundColor={statusColorMap[status]}
          />
        )}
      </AvatarFrame>
    )
  }
)

Avatar.displayName = 'Avatar'
