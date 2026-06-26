import { forwardRef } from 'react'
import { styled, YStack, XStack, Text } from 'tamagui'
import type { YStackProps } from 'tamagui'

export interface StatProps extends YStackProps {
  label: string
  value: string | number
  trend?: { value: string | number; isUpward?: boolean; isDownward?: boolean }
  icon?: React.ReactNode
  format?: (val: string | number) => string
}

const StatCard = styled(YStack, {
  name: 'Stat',
  backgroundColor: '$surface',
  borderRadius: '$lg',
  padding: '$md',
  borderWidth: 1,
  borderColor: '$border',
  gap: 4,
})

export const Stat = forwardRef<any, StatProps>(
  ({ label, value, trend, icon, format, ...props }, ref) => {
    const displayValue = format ? format(value) : value

    return (
      <StatCard ref={ref} {...props}>
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={13} color="$textSecondary" fontWeight="500">
            {label}
          </Text>
          {icon && <Text fontSize={20}>{icon}</Text>}
        </XStack>
        <XStack alignItems="baseline" gap={6}>
          <Text fontSize={28} fontWeight="700" color="$textPrimary" letterSpacing={-0.5}>
            {displayValue}
          </Text>
          {trend && (
            <XStack alignItems="center" gap={2}>
              <Text
                fontSize={13}
                fontWeight="600"
                color={
                  trend.isUpward
                    ? '#22c55e'
                    : trend.isDownward
                    ? '#ef4444'
                    : '$textSecondary'
                }
              >
                {trend.isUpward ? '↑' : trend.isDownward ? '↓' : '→'}
              </Text>
              <Text
                fontSize={13}
                fontWeight="500"
                color={
                  trend.isUpward
                    ? '#22c55e'
                    : trend.isDownward
                    ? '#ef4444'
                    : '$textSecondary'
                }
              >
                {trend.value}
              </Text>
            </XStack>
          )}
        </XStack>
      </StatCard>
    )
  }
)

Stat.displayName = 'Stat'
