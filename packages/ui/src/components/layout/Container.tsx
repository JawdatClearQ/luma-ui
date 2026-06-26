import { YStack, styled, type YStackProps } from 'tamagui'
import { forwardRef, type ReactNode, useMemo } from 'react'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl'

const sizeMap: Record<ContainerSize, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

export interface ContainerProps extends YStackProps {
  size?: ContainerSize
  paddingScale?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  children?: ReactNode
}

const StyledContainer = styled(YStack, {
  name: 'Container',
  width: '100%',
  alignSelf: 'center',
})

export const Container = forwardRef<any, ContainerProps>(
  ({ size = 'lg', paddingScale = 4, children, ...props }, ref) => {
    const maxWidth = useMemo(() => sizeMap[size], [size])

    return (
      <StyledContainer
        ref={ref}
        maxWidth={maxWidth}
        padding={paddingScale}
        {...props}
      >
        {children}
      </StyledContainer>
    )
  }
)

Container.displayName = 'Container'
