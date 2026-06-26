import { forwardRef } from 'react'
import { styled, YStack, XStack, Text, Circle } from 'tamagui'
import type { YStackProps } from 'tamagui'

export interface TimelineItem {
  title: string
  description?: string
  time?: string
  icon?: React.ReactNode
  color?: string
  isActive?: boolean
}

export interface TimelineProps extends YStackProps {
  items: TimelineItem[]
  orientation?: 'vertical' | 'horizontal'
  lineColor?: string
}

const TimelineRoot = styled(YStack, {
  name: 'Timeline',
  gap: 0,
})

const TimelineItemRow = styled(XStack, {
  gap: 12,
})

const TimelineConnector = styled(YStack, {
  width: 2,
  flex: 1,
  alignSelf: 'stretch',
})

const ItemDot = styled(Circle, {
  width: 12,
  height: 12,
  flexShrink: 0,
  borderWidth: 2,
})

export const Timeline = forwardRef<any, TimelineProps>(
  ({ items, orientation = 'vertical', lineColor = '$gray200', ...props }, ref) => {
    return (
      <TimelineRoot ref={ref} {...props}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          const dotColor = item.color || (item.isActive ? '$primary500' : '$gray300')
          const bgColor = item.isActive ? dotColor : 'transparent'

          return (
            <TimelineItemRow key={item.title}>
              <YStack alignItems="center" width={24}>
                {item.icon ? (
                  <Circle
                    width={28}
                    height={28}
                    backgroundColor={item.isActive ? dotColor : '$gray100'}
                    borderWidth={0}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize={12} color={item.isActive ? 'white' : '$textSecondary'}>
                      {item.icon}
                    </Text>
                  </Circle>
                ) : (
                  <ItemDot
                    borderColor={dotColor}
                    backgroundColor={bgColor}
                  />
                )}
                {!isLast && (
                  <TimelineConnector backgroundColor={lineColor} />
                )}
              </YStack>
              <YStack flex={1} paddingBottom={isLast ? 0 : 24} gap={2}>
                <XStack alignItems="center" gap={8}>
                  <Text fontWeight="600" fontSize={14} color="$textPrimary">
                    {item.title}
                  </Text>
                  {item.time && (
                    <Text fontSize={12} color="$textTertiary">
                      {item.time}
                    </Text>
                  )}
                </XStack>
                {item.description && (
                  <Text fontSize={13} color="$textSecondary" lineHeight={18}>
                    {item.description}
                  </Text>
                )}
              </YStack>
            </TimelineItemRow>
          )
        })}
      </TimelineRoot>
    )
  }
)

Timeline.displayName = 'Timeline'
