import { YStack, XStack, styled, type YStackProps } from 'tamagui'
import { forwardRef, useState, useEffect, type ReactNode } from 'react'

export interface SidebarProps extends YStackProps {
  children: ReactNode
  isOpen?: boolean
  onToggle?: () => void
  width?: number
  breakpoint?: number
}

const SidebarContainer = styled(YStack, {
  name: 'Sidebar',
  backgroundColor: '$surface',
  borderRightWidth: 1,
  borderRightColor: '$border',
  height: '100%',
  overflow: 'auto',
  transition: 'width 0.3s ease, transform 0.3s ease',
})

const Overlay = styled(YStack, {
  name: 'SidebarOverlay',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '$overlay',
  zIndex: 90,
})

export const Sidebar = forwardRef<any, SidebarProps>(
  ({ children, isOpen = true, onToggle, width = 280, breakpoint = 768, ...props }, ref) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      if (typeof window === 'undefined') return
      const check = () => setIsMobile(window.innerWidth < breakpoint)
      check()
      window.addEventListener('resize', check)
      return () => window.removeEventListener('resize', check)
    }, [breakpoint])

    const showSidebar = isMobile ? isOpen : true
    const sidebarWidth = isMobile ? (isOpen ? width : 0) : width

    if (isMobile && !isOpen) {
      return null
    }

    return (
      <>
        {isMobile && isOpen && <Overlay onPress={onToggle} />}
        <SidebarContainer
          ref={ref}
          width={sidebarWidth}
          position={isMobile ? 'fixed' : 'relative'}
          left={0}
          top={0}
          zIndex={isMobile ? 100 : 1}
          {...props}
        >
          {children}
        </SidebarContainer>
      </>
    )
  }
)

Sidebar.displayName = 'Sidebar'
