"use client";

import { Tooltip as TTooltip, styled, Text, type YStackProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps extends YStackProps {
  label: string
  children: ReactNode
  placement?: TooltipPlacement
  delay?: number
  isDisabled?: boolean
}

const TooltipContent = styled(TTooltip.Content, {
  name: 'TooltipContent',
  backgroundColor: '$gray900',
  borderRadius: '$sm',
  paddingHorizontal: '$sm',
  paddingVertical: '$xs',
  zIndex: 800,
  enterStyle: { opacity: 0, scale: 0.9 } as any,
  exitStyle: { opacity: 0, scale: 0.9 } as any,
})

const TooltipArrow = styled(TTooltip.Arrow, {
  name: 'TooltipArrow',
  backgroundColor: '$gray900',
})

export const Tooltip = forwardRef<any, TooltipProps>(
  (props: TooltipProps, ref) => {
    const {
      label,
      children,
      placement = 'top',
      delay = 300,
      isDisabled = false,
      ...rest
    } = props

    return (
      <TTooltip
        placement={placement}
        delay={delay}
      >
        <TTooltip.Trigger
          ref={ref}
          aria-describedby={isDisabled ? undefined : label}
          cursor={isDisabled ? 'default' : 'pointer'}
        >
          {children}
        </TTooltip.Trigger>

        {!isDisabled && (
          <TooltipContent>
            <TooltipArrow />
            <Text fontSize={12} color="white">
              {label}
            </Text>
          </TooltipContent>
        )}
      </TTooltip>
    )
  }
)

Tooltip.displayName = 'Tooltip'
