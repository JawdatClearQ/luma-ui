import { forwardRef } from 'react'
import { styled, YStack, Text } from 'tamagui'
import type { YStackProps } from 'tamagui'

type ResultVariant = 'success' | 'error' | 'warning' | 'info'

export interface ResultProps extends YStackProps {
  variant?: ResultVariant
  title: string
  description?: string
  extra?: React.ReactNode
  icon?: React.ReactNode
}

const variantMap: Record<ResultVariant, { bg: string; iconColor: string; icon: string }> = {
  success: { bg: '#dcfce7', iconColor: '#22c55e', icon: '✓' },
  error: { bg: '#fee2e2', iconColor: '#ef4444', icon: '✕' },
  warning: { bg: '#fef3c7', iconColor: '#f59e0b', icon: '⚠' },
  info: { bg: '#dbeafe', iconColor: '#3b82f6', icon: 'ℹ' },
}

const ResultRoot = styled(YStack, {
  name: 'Result',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$2xl',
  gap: 12,
})

export const Result = forwardRef<any, ResultProps>(
  ({ variant = 'info', title, description, extra, icon, ...props }, ref) => {
    const vars = variantMap[variant]

    return (
      <ResultRoot ref={ref} {...props}>
        <YStack
          width={64}
          height={64}
          borderRadius="$full"
          backgroundColor={vars.bg}
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={28} color={vars.iconColor}>
            {icon || vars.icon}
          </Text>
        </YStack>
        <Text fontSize={18} fontWeight="700" color="$textPrimary" textAlign="center">
          {title}
        </Text>
        {description && (
          <Text fontSize={14} color="$textSecondary" textAlign="center" maxWidth={360} lineHeight={20}>
            {description}
          </Text>
        )}
        {extra && (
          <YStack marginTop={8}>
            {extra}
          </YStack>
        )}
      </ResultRoot>
    )
  }
)

Result.displayName = 'Result'
