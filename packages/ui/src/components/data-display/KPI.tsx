import { forwardRef } from 'react'
import { styled, YStack, XStack, Text, Progress } from 'tamagui'
import type { YStackProps } from 'tamagui'

type KPIColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

export interface KPIProps extends Omit<YStackProps, 'target'> {
  label: string
  value: string | number
  target?: string | number
  progress?: number
  unit?: string
  icon?: React.ReactNode
  colorScheme?: KPIColorScheme
}

const colorMap: Record<KPIColorScheme, string> = {
  primary: '$primary500',
  secondary: '$secondary500',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
}

const KPICard = styled(YStack, {
  name: 'KPI',
  backgroundColor: '$surface',
  borderRadius: '$lg',
  padding: '$md',
  borderWidth: 1,
  borderColor: '$border',
  gap: 8,
})

export const KPI = forwardRef<any, KPIProps>(
  ({ label, value, target, progress, unit, icon, colorScheme = 'primary', ...props }, ref) => {
    const accent = colorMap[colorScheme]

    return (
      <KPICard ref={ref} {...props}>
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={13} color="$textSecondary" fontWeight="500">
            {label}
          </Text>
          {icon && <Text fontSize={20} color={accent}>{icon}</Text>}
        </XStack>
        <XStack alignItems="baseline" gap={4}>
          <Text fontSize={32} fontWeight="700" color="$textPrimary" letterSpacing={-1}>
            {value}
          </Text>
          {unit && (
            <Text fontSize={14} color="$textSecondary" fontWeight="500">
              {unit}
            </Text>
          )}
        </XStack>
        {(progress !== undefined || target) && (
          <YStack gap={4}>
            {target && (
              <Text fontSize={12} color="$textTertiary">
                Target: {target}
              </Text>
            )}
            {progress !== undefined && (
              <YStack gap={4}>
                <XStack alignItems="center" gap={8}>
                  <YStack
                    flex={1}
                    height={8}
                    backgroundColor="$gray200"
                    borderRadius="$full"
                    overflow="hidden"
                  >
                    <YStack
                      width={`${Math.min(100, Math.max(0, progress))}%`}
                      height="100%"
                      backgroundColor={accent}
                      borderRadius="$full"
                    />
                  </YStack>
                  <Text fontSize={11} fontWeight="600" color="$textSecondary">
                    {Math.round(progress)}%
                  </Text>
                </XStack>
              </YStack>
            )}
          </YStack>
        )}
      </KPICard>
    )
  }
)

KPI.displayName = 'KPI'
