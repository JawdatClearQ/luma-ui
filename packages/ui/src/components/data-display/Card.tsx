"use client";

import { styled, YStack, type YStackProps } from 'tamagui'
import { forwardRef, createContext, useContext } from 'react'

type CardVariant = 'elevated' | 'outlined' | 'flat'
type CardSize = 'sm' | 'md' | 'lg'

export interface CardProps extends YStackProps {
  variant?: CardVariant
  size?: CardSize
  children: React.ReactNode
  onPress?: () => void
}

const CardContext = createContext<{ size: CardSize }>({ size: 'md' })

const sizeMap: Record<CardSize, { p: number; borderRadius: number }> = {
  sm: { p: 20, borderRadius: 8 },
  md: { p: 32, borderRadius: 12 },
  lg: { p: 40, borderRadius: 16 },
}

const CardRoot = styled(YStack, {
  name: 'Card',
  backgroundColor: '$white',
  borderWidth: 1,
  borderColor: '$neutral200',
  variants: {
    variant: {
      elevated: {
        shadowColor: '$neutral900',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 24,
        borderWidth: 0,
        hoverStyle: {
          shadowOpacity: 0.08,
          shadowRadius: 32,
        },
      },
      outlined: {
        shadowOpacity: 0,
        borderWidth: 1.5,
        borderColor: '$neutral200',
        hoverStyle: {
          borderColor: '$primary300',
        },
      },
      flat: {
        shadowOpacity: 0,
        borderWidth: 0,
        backgroundColor: '$neutral50',
      },
    },
  } as const,
  defaultVariants: { variant: 'elevated' },
})

export const Card = forwardRef<any, CardProps>(
  ({ variant = 'elevated', size = 'md', children, onPress, ...props }, ref) => {
    const dims = sizeMap[size]

    return (
      <CardContext.Provider value={{ size }}>
        <CardRoot
          ref={ref}
          padding={dims.p}
          borderRadius={dims.borderRadius}
          variant={variant}
          {...(onPress ? { onPress, cursor: 'pointer' } : {})}
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
;(Card as any).Header = CardHeader

const CardBody = forwardRef<any, CardSubProps>(({ children, ...props }, ref) => {
  return (
    <YStack ref={ref} flex={1} gap={12} {...props}>
      {children}
    </YStack>
  )
})
CardBody.displayName = 'Card.Body'
;(Card as any).Body = CardBody

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
;(Card as any).Footer = CardFooter
