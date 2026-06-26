import { styled, YStack, XStack, Text, Button, type YStackProps } from 'tamagui'
import { forwardRef, type ReactNode, useState, useRef, useEffect, useCallback } from 'react'

type DropdownPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface DropdownItem {
  label: string
  icon?: ReactNode
  onSelect?: () => void
  isDisabled?: boolean
  divider?: boolean
}

export interface DropdownMenuProps extends YStackProps {
  trigger: ReactNode
  items: DropdownItem[]
  placement?: DropdownPlacement
}

const MenuContainer = styled(YStack, {
  name: 'DropdownMenu',
  position: 'absolute',
  zIndex: '$dropdown',
  backgroundColor: '$background',
  borderRadius: '$md',
  borderWidth: 1,
  borderColor: '$border',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 8,
  minWidth: 180,
  padding: '$xs',
})

const MenuItem = styled(XStack, {
  name: 'DropdownMenuItem',
  alignItems: 'center',
  gap: '$sm',
  padding: '$sm',
  borderRadius: '$sm',
  cursor: 'pointer',
  hoverStyle: { backgroundColor: '$gray100' },
  pressStyle: { backgroundColor: '$gray200' },
  variants: {
    disabled: {
      true: {
        opacity: 0.4,
        cursor: 'not-allowed',
        hoverStyle: {},
        pressStyle: {},
      },
    },
  } as const,
})

const Divider = styled(YStack, {
  height: 1,
  backgroundColor: '$border',
  marginVertical: '$xs',
})

const TriggerWrapper = styled(YStack, {
  cursor: 'pointer',
  position: 'relative',
})

const placementOffsets: Record<DropdownPlacement, Record<string, any>> = {
  bottom: { top: '100%', left: 0, marginTop: 4 },
  top: { bottom: '100%', left: 0, marginBottom: 4 },
  left: { right: '100%', top: 0, marginRight: 4 },
  right: { left: '100%', top: 0, marginLeft: 4 },
}

export const DropdownMenu = forwardRef<any, DropdownMenuProps>(
  (props: DropdownMenuProps, ref) => {
    const {
      trigger,
      items,
      placement = 'bottom',
      ...rest
    } = props

    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLDivElement>(null)

    const close = useCallback(() => setIsOpen(false), [])

    const handleToggle = () => setIsOpen((prev) => !prev)

    const handleSelect = (item: DropdownItem) => {
      if (item.isDisabled) return
      item.onSelect?.()
      close()
    }

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node)
        ) {
          close()
        }
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close()
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [isOpen, close])

    const p = placement as DropdownPlacement

    return (
      <TriggerWrapper ref={triggerRef} {...rest}>
        <div onClick={handleToggle} onKeyDown={(e) => e.key === 'Enter' && handleToggle()} role="button" tabIndex={0} aria-haspopup="true" aria-expanded={isOpen}>
          {trigger}
        </div>

        {isOpen && (
          <MenuContainer
            ref={menuRef}
            role="menu"
            {...placementOffsets[p]}
          >
            {items.map((item, index) => (
              <div key={item.label}>
                {item.divider && <Divider />}
                <MenuItem
                  role="menuitem"
                  aria-disabled={item.isDisabled}
                  disabled={item.isDisabled}
                  onPress={() => handleSelect(item)}
                >
                  {item.icon && <Text fontSize={16}>{item.icon}</Text>}
                  <Text fontSize={14} color="$textPrimary" userSelect="none">
                    {item.label}
                  </Text>
                </MenuItem>
              </div>
            ))}
          </MenuContainer>
        )}
      </TriggerWrapper>
    )
  }
)

DropdownMenu.displayName = 'DropdownMenu'
