import { YStack, styled, type YStackProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface StickyProps extends YStackProps {
  children: ReactNode
  top?: number
  bottom?: number
  left?: number
  right?: number
  zIndex?: number
}

const StyledSticky = styled(YStack, {
  name: 'Sticky',
  position: 'sticky',
})

export const Sticky = forwardRef<any, StickyProps>(
  ({ children, top, bottom, left, right, zIndex = 100, ...props }, ref) => {
    return (
      <StyledSticky
        ref={ref}
        top={top}
        bottom={bottom}
        left={left}
        right={right}
        zIndex={zIndex}
        {...props}
      >
        {children}
      </StyledSticky>
    )
  }
)

Sticky.displayName = 'Sticky'
