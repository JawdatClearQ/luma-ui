import { styled, XStack, YStack, type StackProps } from 'tamagui'
import { forwardRef, type ReactNode, Children, cloneElement, isValidElement } from 'react'

type Direction = 'horizontal' | 'vertical'
type GroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type GroupVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

export interface ButtonGroupProps extends StackProps {
  children: ReactNode
  isAttached?: boolean
  direction?: Direction
  size?: GroupSize
  variant?: GroupVariant
}

const StyledGroup = styled(XStack, {
  name: 'ButtonGroup',
  alignItems: 'center',
  variants: {
    direction: {
      horizontal: { flexDirection: 'row' },
      vertical: { flexDirection: 'column' },
    },
    attached: {
      true: { gap: 0 },
      false: { gap: '$sm' },
    },
  } as const,
})

export const ButtonGroup = forwardRef<any, ButtonGroupProps>(
  (props: ButtonGroupProps, ref) => {
    const {
      children,
      isAttached = false,
      direction = 'horizontal',
      size,
      variant,
      ...rest
    } = props

    const dir = direction as Direction
    const GroupContainer = dir === 'vertical' ? YStack : StyledGroup

    const count = Children.count(children)

    const attachedChildren = Children.map(children, (child, index) => {
      if (!isValidElement(child)) return child
      const isFirst = index === 0
      const isLast = index === count - 1

      let borderStyle: Record<string, any> = {}
      if (isAttached) {
        if (dir === 'horizontal') {
          borderStyle = {
            borderRadius: 0,
            borderLeftWidth: isFirst ? 1 : 0,
            ...(isFirst && { borderTopLeftRadius: '$md', borderBottomLeftRadius: '$md' }),
            ...(isLast && { borderTopRightRadius: '$md', borderBottomRightRadius: '$md' }),
          }
        } else {
          borderStyle = {
            borderRadius: 0,
            borderTopWidth: isFirst ? 1 : 0,
            ...(isFirst && { borderTopLeftRadius: '$md', borderTopRightRadius: '$md' }),
            ...(isLast && { borderBottomLeftRadius: '$md', borderBottomRightRadius: '$md' }),
          }
        }
      }

      return cloneElement(child, {
        ...(size ? { size } : {}),
        ...(variant ? { variant } : {}),
        ...(isAttached ? { style: { ...(child.props.style || {}), ...borderStyle } } : {}),
      })
    })

    return (
      <GroupContainer
        ref={ref}
        direction={dir}
        attached={isAttached}
        role="group"
        aria-label="Button group"
        {...rest}
      >
        {attachedChildren}
      </GroupContainer>
    )
  }
)

ButtonGroup.displayName = 'ButtonGroup'
