"use client";

import { styled, XStack, Text, type XStackProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
  onPress?: () => void
}

export interface BreadcrumbProps extends XStackProps {
  items: BreadcrumbItem[]
  separator?: string
  children?: ReactNode
}

export const Breadcrumb = forwardRef<any, BreadcrumbProps>(
  ({ items, separator = '/', ...props }, ref) => {
    return (
      <XStack ref={ref} gap={8} alignItems="center" role="navigation" aria-label="Breadcrumb" {...props}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <XStack key={index} gap={8} alignItems="center">
              <Text
                fontSize={13}
                color={isLast ? '$neutral800' : '$neutral400'}
                fontWeight={isLast ? '500' : '400'}
                onPress={isLast ? undefined : item.onPress}
                cursor={isLast ? 'default' : 'pointer'}
                hoverStyle={isLast ? {} : { color: '$neutral600' }}
                role={isLast ? undefined : 'link'}
              >
                {item.label}
              </Text>
              {!isLast && (
                <Text fontSize={12} color="$neutral300" userSelect="none">
                  {separator}
                </Text>
              )}
            </XStack>
          )
        })}
      </XStack>
    )
  }
)

Breadcrumb.displayName = 'Breadcrumb'
