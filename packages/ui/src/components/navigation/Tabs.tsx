"use client";

import { styled, XStack, YStack, Text, type XStackProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  icon?: ReactNode
  isDisabled?: boolean
}

export interface TabsProps extends Omit<XStackProps, 'onChange'> {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
  variant?: 'line' | 'enclosed'
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap: Record<string, { fontSize: number; px: number; py: number; gap: number }> = {
  sm: { fontSize: 13, px: 16, py: 8, gap: 4 },
  md: { fontSize: 14, px: 20, py: 10, gap: 8 },
  lg: { fontSize: 15, px: 24, py: 12, gap: 12 },
}

const TabButton = styled(XStack, {
  name: 'TabButton',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  gap: 8,
  borderRadius: 6,

  variants: {
    variant: {
      line: {
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        borderRadius: 0,
      },
      enclosed: {
        borderWidth: 1,
        borderColor: 'transparent',
      },
    },
    active: {
      true: {
        color: '$primary600',
      },
    },
    disabled: {
      true: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
    },
  } as const,
})

export const Tabs = forwardRef<any, TabsProps>(
  ({ tabs, activeTab, onChange, variant = 'line', size = 'md', ...props }, ref) => {
    const dims = sizeMap[size] || sizeMap.md

    return (
      <XStack ref={ref} gap={dims.gap} role="tablist" {...props}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <TabButton
              key={tab.id}
              variant={variant}
              active={isActive}
              disabled={tab.isDisabled}
              paddingHorizontal={dims.px}
              paddingVertical={dims.py}
              onPress={() => !tab.isDisabled && onChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              aria-disabled={tab.isDisabled}
              borderBottomColor={isActive && variant === 'line' ? '$primary500' : 'transparent'}
              backgroundColor={isActive && variant === 'enclosed' ? '$white' : 'transparent'}
              borderColor={isActive && variant === 'enclosed' ? '$neutral200' : 'transparent'}
              borderBottomWidth={isActive && variant === 'enclosed' ? 0 : variant === 'line' ? 2 : 0}
            >
              {tab.icon && (
                <Text fontSize={dims.fontSize} color={isActive ? '$primary500' : '$neutral400'}>
                  {tab.icon}
                </Text>
              )}
              <Text
                fontSize={dims.fontSize}
                fontWeight={isActive ? '500' : '400'}
                color={isActive ? '$primary600' : '$neutral500'}
                userSelect="none"
              >
                {tab.label}
              </Text>
            </TabButton>
          )
        })}
      </XStack>
    )
  }
)

Tabs.displayName = 'Tabs'
