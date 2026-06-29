"use client";

import React, { type ReactNode } from 'react'
import { YStack, type YStackProps } from 'tamagui'
import { forwardRef } from 'react'

export interface GridProps extends YStackProps {
  columns?: number
  columnGap?: number
  rowGap?: number
  gap?: number
  children?: ReactNode
}

export const Grid = forwardRef<any, GridProps>(
  ({ columns = 2, gap, columnGap, rowGap, children, ...props }, ref) => {
    return (
      <YStack
        ref={ref}
        flexDirection="row"
        flexWrap="wrap"
        gap={gap}
        columnGap={columnGap}
        rowGap={rowGap}
        {...props}
      >
        {React.Children.map(children, (child) => (
          <YStack width={`${100 / columns}%`} padding={gap ? gap / 2 : 0}>
            {child}
          </YStack>
        ))}
      </YStack>
    )
  }
)

Grid.displayName = 'Grid'
