import { styled, YStack, Text, type YStackProps } from 'tamagui'
import { forwardRef, createContext, useContext } from 'react'

type CardVariant = 'elevated' | 'outlined' | 'filled'
type CardSize = 'sm' | 'md' | 'lg'

export interface CardProps extends YStackProps {
  variant?: CardVariant
  size?: CardSize
  children: React.ReactNode
  onPress?: () => void
}

const CardContext = createContext<{ size: CardSize }>({ size: 'md' })

const sizeMap: Record<CardSize, { p: number; borderRadius: number }> = {
  sm: { p: 12, borderRadius: 8 },
  md: { p: 16, borderRadius: 12 },
  lg: { p: 24, borderRadius: 16 },
}

const CardRoot = styled(YStack, {
  name: 'Card',
  backgroundColor: '$surface',
  borderWidth: 0,
})

export const Card = forwardRef<any, CardProps>(
  ({ variant = 'elevated', size = 'md', children, onPress, ...props }, ref) => {
    const dims = sizeMap[size]

    const variantStyle =
      variant === 'elevated'
        ? { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }
        : variant === 'outlined'
        ? { borderWidth: 1, borderColor: '$border' }
        : { backgroundColor: '$gray100' }

    return (
      <CardContext.Provider value={{ size }}>
        <CardRoot
          ref={ref}
          padding={dims.p}
          borderRadius={dims.borderRadius}
          {...variantStyle}
          {...(onPress ? { onPress, cursor: 'pointer', hoverStyle: { opacity: 0.95 } } : {})}
          {...props}
        >
          {children}
        </CardRoot>
      </CardContext.Provider>
    )
  }
)

Card.displayName = 'Card'

export interface CardSubProps extends YStackProps {
  children: React.ReactNode
}

const CardHeader = forwardRef<any, CardSubProps>(({ children, ...props }, ref) => {
  const { size } = useContext(CardContext)
  const gap = size === 'sm' ? 4 : size === 'md' ? 8 : 12
  return (
    <YStack ref={ref} gap={gap} {...props}>
      {children}
    </YStack>
  )
})
CardHeader.displayName = 'Card.Header'
Card.Header = CardHeader

const CardBody = forwardRef<any, CardSubProps>(({ children, ...props }, ref) => {
  return (
    <YStack ref={ref} flex={1} {...props}>
      {children}
    </YStack>
  )
})
CardBody.displayName = 'Card.Body'
Card.Body = CardBody

const CardFooter = forwardRef<any, CardSubProps>(({ children, ...props }, ref) => {
  const { size } = useContext(CardContext)
  const gap = size === 'sm' ? 4 : size === 'md' ? 8 : 12
  return (
    <YStack ref={ref} gap={gap} marginTop="auto" {...props}>
      {children}
    </YStack>
  )
})
CardFooter.displayName = 'Card.Footer'
Card.Footer = CardFooter
