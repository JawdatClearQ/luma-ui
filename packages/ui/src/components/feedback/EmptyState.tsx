import { forwardRef } from 'react'
import { styled, YStack, Text } from 'tamagui'
import type { YStackProps } from 'tamagui'

export interface EmptyStateProps extends YStackProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: { label: string; onPress: () => void }
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap: Record<string, { iconSize: number; titleSize: number; descSize: number; gap: number }> = {
  sm: { iconSize: 32, titleSize: 14, descSize: 12, gap: 4 },
  md: { iconSize: 48, titleSize: 16, descSize: 13, gap: 8 },
  lg: { iconSize: 64, titleSize: 20, descSize: 14, gap: 12 },
}

export const EmptyState = forwardRef<any, EmptyStateProps>(
  ({ icon, title, description, action, size = 'md', ...props }, ref) => {
    const dims = sizeMap[size]

    return (
      <YStack
        ref={ref}
        alignItems="center"
        justifyContent="center"
        padding="$xl"
        gap={dims.gap}
        {...props}
      >
        {icon ? (
          <Text fontSize={dims.iconSize} opacity={0.4}>
            {icon}
          </Text>
        ) : (
          <Text fontSize={dims.iconSize} color="$gray300" fontWeight="300">
            ○
          </Text>
        )}
        <Text
          fontSize={dims.titleSize}
          fontWeight="600"
          color="$textPrimary"
          textAlign="center"
        >
          {title}
        </Text>
        {description && (
          <Text
            fontSize={dims.descSize}
            color="$textSecondary"
            textAlign="center"
            maxWidth={280}
          >
            {description}
          </Text>
        )}
        {action && (
          <Text
            fontSize={13}
            fontWeight="600"
            color="$primary500"
            cursor="pointer"
            marginTop={4}
            paddingHorizontal={16}
            paddingVertical={8}
            borderRadius="$md"
            backgroundColor="$primary100"
            hoverStyle={{ backgroundColor: '$primary200' }}
            onPress={action.onPress}
            aria-label={action.label}
            role="button"
          >
            {action.label}
          </Text>
        )}
      </YStack>
    )
  }
)

EmptyState.displayName = 'EmptyState'
