"use client";

import { styled, XStack, Text, type XStackProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

export interface BreadcrumbProps extends XStackProps {
  items: BreadcrumbItem[]
  separator?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { fontSize: 12, gap: 4 },
  md: { fontSize: 14, gap: 8 },
  lg: { fontSize: 16, gap: 12 },
}

const StyledBreadcrumb = styled(XStack, {
  name: 'Breadcrumb',
  alignItems: 'center',
  flexWrap: 'wrap',
})

export const Breadcrumb = forwardRef<any, BreadcrumbProps>(
  (props: BreadcrumbProps, ref) => {
    const {
      items,
      separator = '/',
      size = 'md',
      ...rest
    } = props

    const s = size as keyof typeof sizeMap
    const dims = sizeMap[s]

    return (
      <StyledBreadcrumb
        ref={ref}
        gap={dims.gap}
        aria-label="Breadcrumb"
        role="navigation"
        {...rest}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <XStack key={item.label} gap={dims.gap} alignItems="center">
              {item.icon}
              {item.href && !isLast ? (
                <Text
                  // @ts-ignore
                  href={item.href}
                  fontSize={dims.fontSize}
                  color="$primary500"
                  textDecorationLine="none"
                  // @ts-ignore
                  hoverStyle={{ textDecorationLine: 'underline', color: '$primary600' }}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </Text>
              ) : (
                <Text
                  fontSize={dims.fontSize}
                  color={isLast ? '$textPrimary' : '$textSecondary'}
                  fontWeight={isLast ? '600' : '400'}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </Text>
              )}
              {!isLast && (
                <Text fontSize={dims.fontSize} color="$textTertiary" aria-hidden={true}>
                  {separator}
                </Text>
              )}
            </XStack>
          )
        })}
      </StyledBreadcrumb>
    )
  }
)

Breadcrumb.displayName = 'Breadcrumb'
