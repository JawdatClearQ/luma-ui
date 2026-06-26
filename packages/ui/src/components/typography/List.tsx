import { YStack, styled, type YStackProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

type ListVariant = 'ordered' | 'unordered'

export interface ListProps extends YStackProps {
  variant?: ListVariant
  spacing?: number
  markerColor?: string
  children?: ReactNode
}

const StyledList = styled(YStack, {
  name: 'List',
  paddingLeft: '$lg',
})

export const List = forwardRef<any, ListProps>(
  ({ variant = 'unordered', spacing = 0, children, ...props }, ref) => {
    return (
      <StyledList
        ref={ref}
        gap={spacing}
        role="list"
        aria-label={variant === 'ordered' ? 'ordered list' : 'unordered list'}
        {...props}
      >
        {children}
      </StyledList>
    )
  }
)

List.displayName = 'List'

export interface ListItemProps extends YStackProps {
  children?: ReactNode
}

export const ListItem = forwardRef<any, ListItemProps>(({ children, ...props }, ref) => {
  return (
    <YStack ref={ref} role="listitem" {...props}>
      {children}
    </YStack>
  )
})

ListItem.displayName = 'ListItem'
