"use client";

import { forwardRef } from 'react'
import { Circle } from 'tamagui'
import type { YStackProps } from 'tamagui'

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'

export interface SpinnerProps extends YStackProps {
  size?: SpinnerSize
  color?: string
  speed?: number
}

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
}

export const Spinner = forwardRef<any, SpinnerProps>(
  ({ size = 'md', color, speed = 0.8, ...props }, ref) => {
    const dim = sizeMap[size]
    const spinnerColor = color ?? '#8b7355'

    return (
      <Circle
        ref={ref}
        width={dim}
        height={dim}
        borderWidth={Math.max(2, dim * 0.15)}
        borderColor="#ede5d8"
        borderTopColor={spinnerColor}
        role="status"
        aria-label="Loading"
        {...props}
        style={{
          animation: `spin ${speed}s linear infinite`,
          transformOrigin: 'center',
        }}
      />
    )
  }
)

Spinner.displayName = 'Spinner'
