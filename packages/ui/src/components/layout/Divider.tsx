"use client";

import { XStack, styled, Text, type XStackProps } from 'tamagui'
import { forwardRef } from 'react'

export interface DividerProps extends XStackProps {
  orientation?: 'horizontal' | 'vertical'
  label?: string
  labelPosition?: 'left' | 'center' | 'right'
  variant?: 'default' | 'subtle' | 'luxury'
}

const StyledDividerLine = styled(XStack, {
  name: 'DividerLine',
  backgroundColor: '$neutral200',
})

export const Divider = forwardRef<any, DividerProps>(
  ({ orientation = 'horizontal', label, labelPosition = 'center', variant = 'default', ...props }, ref) => {
    const isHorizontal = orientation === 'horizontal'

    const lineBg =
      variant === 'subtle'
        ? '$neutral100'
        : variant === 'luxury'
        ? '$primary300'
        : '$neutral200'

    const lineHeight = variant === 'subtle' ? 0.5 : 1

    if (label) {
      return (
        <XStack
          ref={ref}
          alignItems="center"
          width={isHorizontal ? '100%' : undefined}
          height={isHorizontal ? undefined : '100%'}
          flexDirection={isHorizontal ? 'row' : 'column'}
          role="separator"
          aria-orientation={orientation}
          {...props}
        >
          {labelPosition === 'left' && (
            <Text color="$neutral500" fontSize="$3" paddingHorizontal="$2">
              {label}
            </Text>
          )}
          <StyledDividerLine flex={1} backgroundColor={lineBg} height={lineHeight} />
          {labelPosition === 'center' && (
            <Text color="$neutral500" fontSize="$3" paddingHorizontal="$2">
              {label}
            </Text>
          )}
          {labelPosition === 'left' && (
            <StyledDividerLine flex={1} backgroundColor={lineBg} height={lineHeight} />
          )}
          {labelPosition === 'right' && (
            <>
              <StyledDividerLine flex={1} backgroundColor={lineBg} height={lineHeight} />
              <Text color="$neutral500" fontSize="$3" paddingHorizontal="$2">
                {label}
              </Text>
            </>
          )}
        </XStack>
      )
    }

    return (
      <StyledDividerLine
        ref={ref}
        height={isHorizontal ? lineHeight : '100%'}
        width={isHorizontal ? '100%' : 1}
        minHeight={isHorizontal ? 1 : undefined}
        minWidth={isHorizontal ? undefined : 1}
        role="separator"
        aria-orientation={orientation}
        backgroundColor={lineBg}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'
