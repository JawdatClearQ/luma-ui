import { XStack, YStack, type XStackProps } from 'tamagui'
import { forwardRef, type ReactNode, Children } from 'react'

export interface StackProps extends Omit<XStackProps, 'direction'> {
  direction?: 'vertical' | 'horizontal'
  spacing?: number
  divider?: ReactNode
  shouldWrapChildren?: boolean
  children?: ReactNode
}


export const Stack = forwardRef<any, StackProps>(
  ({ direction = 'vertical', spacing = 0, divider, shouldWrapChildren = false, children, ...props }, ref) => {
    const isVertical = direction === 'vertical'
    const StackComponent = isVertical ? YStack : XStack

    const items = Children.toArray(children)
    const hasDivider = divider != null && items.length > 1

    const rendered = hasDivider
      ? items.reduce<ReactNode[]>((acc, child, index) => {
          if (index > 0) {
            acc.push(
              <StackComponent key={`divider-${index}`} flexShrink={0}>
                {divider}
              </StackComponent>
            )
          }
          acc.push(child)
          return acc
        }, [])
      : children

    return (
      <StackComponent ref={ref} gap={spacing} {...props}>
        {rendered}
      </StackComponent>
    )
  }
)

Stack.displayName = 'Stack'
