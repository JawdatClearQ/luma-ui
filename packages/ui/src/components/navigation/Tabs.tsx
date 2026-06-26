import { styled, XStack, YStack, Text, type XStackProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  icon?: ReactNode
  isDisabled?: boolean
}

type TabVariant = 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded'
type TabOrientation = 'horizontal' | 'vertical'
type TabSize = 'sm' | 'md' | 'lg'

export interface TabsProps extends Omit<XStackProps, 'onChange'> {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
  variant?: TabVariant
  orientation?: TabOrientation
  size?: TabSize
}

const sizeMap = {
  sm: { fontSize: 12, px: 12, py: 6, gap: 4 },
  md: { fontSize: 14, px: 16, py: 8, gap: 8 },
  lg: { fontSize: 16, px: 20, py: 10, gap: 12 },
}

const TabButton = styled(XStack, {
  name: 'TabButton',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  gap: '$sm',
  borderRadius: '$md',
  transition: 'all 0.2s ease',
  variants: {
    variant: {
      line: {
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
      },
      enclosed: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomWidth: 0,
        borderTopLeftRadius: '$md',
        borderTopRightRadius: '$md',
      },
      'soft-rounded': {
        borderRadius: '$lg',
      },
      'solid-rounded': {
        borderRadius: '$full',
      },
    },
    active: {
      true: {},
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
  (props: TabsProps, ref) => {
    const {
      tabs,
      activeTab,
      onChange,
      variant = 'line',
      orientation = 'horizontal',
      size = 'md',
      ...rest
    } = props

    const v = variant as TabVariant
    const s = size as TabSize
    const dims = sizeMap[s]
    const Container = orientation === 'vertical' ? YStack : XStack

    return (
      <Container
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        gap={dims.gap}
        {...(orientation === 'horizontal' ? { flexDirection: 'row' as const } : { flexDirection: 'column' as const })}
        {...rest}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <TabButton
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-disabled={tab.isDisabled}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.isDisabled}
              active={isActive}
              variant={v}
              paddingHorizontal={dims.px}
              paddingVertical={dims.py}
              onPress={() => {
                if (!tab.isDisabled) onChange(tab.id)
              }}
              {...(isActive
                ? {
                    ...(v === 'line' && {
                      borderBottomColor: '$primary500',
                      color: '$primary500',
                    }),
                    ...(v === 'enclosed' && {
                      backgroundColor: '$background',
                      borderColor: '$border',
                      borderBottomColor: '$background',
                    }),
                    ...(v === 'soft-rounded' && {
                      backgroundColor: '$primary100',
                      color: '$primary700',
                    }),
                    ...(v === 'solid-rounded' && {
                      backgroundColor: '$primary500',
                      color: 'white',
                    }),
                  }
                : {
                    color: '$textSecondary',
                    hoverStyle: {
                      ...(v === 'line' && { borderBottomColor: '$gray300', color: '$textPrimary' }),
                      ...(v !== 'line' && { backgroundColor: '$gray100', color: '$textPrimary' }),
                    },
                  })}
            >
              {tab.icon}
              <Text fontSize={dims.fontSize} fontWeight={isActive ? '600' : '400'} color="inherit" userSelect="none">
                {tab.label}
              </Text>
            </TabButton>
          )
        })}
      </Container>
    )
  }
)

Tabs.displayName = 'Tabs'
