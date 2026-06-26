import { XStack, Text, styled } from 'tamagui'
import { forwardRef, Children, cloneElement, useMemo } from 'react'
import type { AvatarProps } from './Avatar'
import type { StackProps } from 'tamagui'

export interface AvatarGroupProps extends StackProps {
  children: React.ReactNode
  max?: number
  spacing?: number
  size?: AvatarProps['size']
}

const OverflowAvatar = styled(XStack, {
  name: 'OverflowAvatar',
  borderRadius: '$full',
  backgroundColor: '$gray200',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderWidth: 2,
  borderColor: '$background',
})

export const AvatarGroup = forwardRef<any, AvatarGroupProps>(
  ({ children, max, spacing = -8, size, ...props }, ref) => {
    const items = Children.toArray(children)
    const visible = max ? items.slice(0, max) : items
    const overflow = max ? Math.max(0, items.length - max) : 0

    const sizedChildren = useMemo(
      () =>
        visible.map((child: any, idx) =>
          cloneElement(child, {
            key: idx,
            size: size || child.props.size,
            showBorder: true,
            style: { zIndex: items.length - idx, marginLeft: idx === 0 ? 0 : spacing },
          })
        ),
      [visible, size, spacing, items.length]
    )

    return (
      <XStack ref={ref} alignItems="center" {...props}>
        {sizedChildren}
        {overflow > 0 && (
          <OverflowAvatar
            width={36}
            height={36}
            marginLeft={spacing}
            zIndex={0}
          >
            <Text fontSize={12} fontWeight="600" color="$gray700">
              +{overflow}
            </Text>
          </OverflowAvatar>
        )}
      </XStack>
    )
  }
)

AvatarGroup.displayName = 'AvatarGroup'
