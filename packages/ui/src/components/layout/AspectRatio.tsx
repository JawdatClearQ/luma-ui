import { YStack, styled, type YStackProps } from 'tamagui'
import { forwardRef, type ReactNode, useMemo } from 'react'

export interface AspectRatioProps extends YStackProps {
  ratio?: number
  children?: ReactNode
}

const StyledWrapper = styled(YStack, {
  name: 'AspectRatio',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
})

const StyledContent = styled(YStack, {
  name: 'AspectRatioContent',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

export const AspectRatio = forwardRef<any, AspectRatioProps>(
  ({ ratio = 16 / 9, children, style, ...props }, ref) => {
    const paddingBottom = useMemo(() => `${(1 / ratio) * 100}%`, [ratio])

    return (
      <StyledWrapper
        ref={ref}
        style={{ paddingBottom, ...(style as object) }}
        {...props}
      >
        <StyledContent>{children}</StyledContent>
      </StyledWrapper>
    )
  }
)

AspectRatio.displayName = 'AspectRatio'
