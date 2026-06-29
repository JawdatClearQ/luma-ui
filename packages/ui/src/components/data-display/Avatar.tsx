"use client";

import { styled, YStack, XStack, Text, Image as TamaguiImage, Circle, type XStackProps } from 'tamagui'
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
  online: '#22c55e',
  offline: '#9ca3af',
  away: '#f59e0b',
  busy: '#ef4444',
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
  backgroundColor: '$gray200',
  overflow: 'hidden',
  flexShrink: 0,
})

const StatusDot = styled(Circle, {
  name: 'StatusDot',
  position: 'absolute',
  bottom: 0,
  right: 0,
  borderWidth: 2,
  borderColor: '$background',
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
      ? { borderWidth: 2, borderColor: '$border' }
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
            color="$gray700"
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
