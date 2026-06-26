import { XStack, YStack, styled, type XStackProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface HeaderProps extends XStackProps {
  children?: ReactNode
  height?: number
  leftContent?: ReactNode
  centerContent?: ReactNode
  rightContent?: ReactNode
}

const HeaderContainer = styled(XStack, {
  name: 'Header',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: '$surface',
  borderBottomWidth: 1,
  borderBottomColor: '$border',
  alignItems: 'center',
  paddingHorizontal: '$md',
  zIndex: '$sticky',
})

const HeaderSection = styled(XStack, {
  name: 'HeaderSection',
  alignItems: 'center',
  flex: 1,
})

export const Header = forwardRef<any, HeaderProps>(
  ({ children, height = 64, leftContent, centerContent, rightContent, ...props }, ref) => {
    return (
      <HeaderContainer ref={ref} height={height} {...props}>
        <HeaderSection justifyContent="flex-start">
          {leftContent}
        </HeaderSection>
        <HeaderSection justifyContent="center">
          {centerContent}
        </HeaderSection>
        <HeaderSection justifyContent="flex-end">
          {rightContent}
        </HeaderSection>
        {children}
      </HeaderContainer>
    )
  }
)

Header.displayName = 'Header'
