import { YStack, styled, type YStackProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface BoxProps extends YStackProps {
  children?: ReactNode
}

const StyledBox = styled(YStack, {
  name: 'Box',
})

export const Box = forwardRef<any, BoxProps>(({ children, ...props }, ref) => {
  return (
    <StyledBox ref={ref} {...props}>
      {children}
    </StyledBox>
  )
})

Box.displayName = 'Box'
