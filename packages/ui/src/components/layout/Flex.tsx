"use client";

import { XStack, YStack } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface FlexProps {
  direction?: 'vertical' | 'horizontal'
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: number
  children?: ReactNode
  [key: string]: any
}

export const Flex = forwardRef<any, FlexProps>(
  ({ direction = 'vertical', align, justify, wrap, gap, children, ...props }, ref) => {
    const isVertical = direction === 'vertical'
    const StackComponent = isVertical ? YStack : XStack

    return (
      <StackComponent
        ref={ref}
        alignItems={align}
        justifyContent={justify}
        flexWrap={wrap}
        gap={gap}
        {...props}
      >
        {children}
      </StackComponent>
    )
  }
)

Flex.displayName = 'Flex'
