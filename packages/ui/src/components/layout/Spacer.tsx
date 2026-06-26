import { View, styled, type ViewProps } from 'tamagui'
import { forwardRef } from 'react'

export interface SpacerProps extends ViewProps {
  size?: number
}

const StyledSpacer = styled(View, {
  name: 'Spacer',
  flex: 1,
  alignSelf: 'stretch',
})

export const Spacer = forwardRef<any, SpacerProps>(({ size, style, ...props }, ref) => {
  return (
    <StyledSpacer
      ref={ref}
      style={{
        flexBasis: size,
        flexGrow: size ? 0 : 1,
        flexShrink: size ? 0 : 1,
        ...(style as object),
      }}
      {...props}
    />
  )
})

Spacer.displayName = 'Spacer'
