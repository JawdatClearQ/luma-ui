import { YStack, styled, type YStackProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface FooterProps extends YStackProps {
  children?: ReactNode
  height?: number
}

const FooterContainer = styled(YStack, {
  name: 'Footer',
  backgroundColor: '$surface',
  borderTopWidth: 1,
  borderTopColor: '$border',
  padding: '$md',
})

export const Footer = forwardRef<any, FooterProps>(
  ({ children, height, ...props }, ref) => {
    return (
      <FooterContainer ref={ref} height={height} {...props}>
        {children}
      </FooterContainer>
    )
  }
)

Footer.displayName = 'Footer'
