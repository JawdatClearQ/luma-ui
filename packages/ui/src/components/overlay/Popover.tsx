import { Popover as TPopover, styled, YStack, type YStackProps, type PopoverProps as TPopoverProps } from 'tamagui'
import { forwardRef, type ReactNode, useState } from 'react'

type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface PopoverProps extends Omit<YStackProps, 'onOpenChange'> {
  trigger: ReactNode
  children: ReactNode
  placement?: PopoverPlacement
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const Content = styled(YStack, {
  name: 'PopoverContent',
  backgroundColor: '$background',
  borderRadius: '$md',
  borderWidth: 1,
  borderColor: '$border',
  padding: '$md',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 8,
  minWidth: 160,
})

export const Popover = forwardRef<any, PopoverProps>(
  (props: PopoverProps, ref) => {
    const {
      trigger,
      children,
      placement = 'bottom',
      isOpen: controlledOpen,
      onOpenChange,
      ...rest
    } = props

    const [internalOpen, setInternalOpen] = useState(false)
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen

    const handleOpenChange = (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next)
      onOpenChange?.(next)
    }

    const tamaguiPlacement = placement as PopoverPlacement

    return (
      <TPopover
        open={open}
        onOpenChange={handleOpenChange}
        placement={tamaguiPlacement}
      >
        <TPopover.Trigger asChild>
          {trigger}
        </TPopover.Trigger>

        <TPopover.Content
          ref={ref}
        >
          <Content {...rest}>
            {children}
          </Content>
        </TPopover.Content>
      </TPopover>
    )
  }
)

Popover.displayName = 'Popover'
