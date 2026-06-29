"use client";

import { styled, XStack, Text, Button, type XStackProps } from 'tamagui'
import { forwardRef, useMemo } from 'react'

type PageSize = 'sm' | 'md' | 'lg'

export interface PaginationProps extends Omit<XStackProps, 'onChange'> {
  totalPages: number
  currentPage: number
  onChange: (page: number) => void
  siblingCount?: number
  boundaryCount?: number
  size?: PageSize
}

const sizeMap: Record<string, { size: number; fontSize: number; gap: number }> = {
  sm: { size: 32, fontSize: 13, gap: 4 },
  md: { size: 40, fontSize: 14, gap: 6 },
  lg: { size: 48, fontSize: 15, gap: 8 },
}

function getPageNumbers(total: number, current: number, siblings: number, boundaries: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = []
  for (let i = 1; i <= boundaries && i <= total; i++) pages.push(i)
  const leftStart = Math.max(current - siblings, boundaries + 2)
  const rightEnd = Math.min(current + siblings, total - boundaries - 1)
  if (leftStart > boundaries + 2) pages.push('ellipsis')
  for (let i = leftStart; i <= rightEnd; i++) pages.push(i)
  if (rightEnd < total - boundaries - 1) pages.push('ellipsis')
  for (let i = Math.max(total - boundaries + 1, 1); i <= total; i++) pages.push(i)
  return pages
}

const PageButton = styled(Button, {
  name: 'PageButton',
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  backgroundColor: 'transparent',
  color: '$neutral600',
  hoverStyle: { backgroundColor: '$neutral100' },
  variants: {
    active: {
      true: {
        backgroundColor: '$primary500',
        color: '$white',
        hoverStyle: { backgroundColor: '$primary600' },
      },
    },
    disabled: {
      true: {
        opacity: 0.3,
      },
    },
  } as const,
})

const NavButton = styled(Button, {
  name: 'NavButton',
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  backgroundColor: 'transparent',
  color: '$neutral500',
  hoverStyle: { backgroundColor: '$neutral100' },
  disabledStyle: { opacity: 0.3 },
})

export const Pagination = forwardRef<any, PaginationProps>(
  ({ totalPages, currentPage, onChange, siblingCount = 1, boundaryCount = 1, size = 'md', ...rest }, ref) => {
    const dims = sizeMap[size] || sizeMap.md
    const pages = useMemo(
      () => getPageNumbers(totalPages, currentPage, siblingCount, boundaryCount),
      [totalPages, currentPage, siblingCount, boundaryCount]
    )

    return (
      <XStack ref={ref} gap={dims.gap} alignItems="center" role="navigation" aria-label="Pagination" {...rest}>
        <NavButton
          width={dims.size}
          height={dims.size}
          disabled={currentPage <= 1}
          onPress={() => onChange(currentPage - 1)}
          aria-label="Go to previous page"
        >
          <Text fontSize={dims.fontSize}>‹</Text>
        </NavButton>

        {pages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <Text
                key={`ellipsis-${index}`}
                width={dims.size}
                textAlign="center"
                fontSize={dims.fontSize}
                color="$neutral300"
                userSelect="none"
              >
                …
              </Text>
            )
          }
          const isActive = page === currentPage
          return (
            <PageButton
              key={page}
              active={isActive}
              width={dims.size}
              height={dims.size}
              onPress={() => onChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Text fontSize={dims.fontSize} fontWeight={isActive ? '600' : '400'} color="inherit">
                {page}
              </Text>
            </PageButton>
          )
        })}

        <NavButton
          width={dims.size}
          height={dims.size}
          disabled={currentPage >= totalPages}
          onPress={() => onChange(currentPage + 1)}
          aria-label="Go to next page"
        >
          <Text fontSize={dims.fontSize}>›</Text>
        </NavButton>
      </XStack>
    )
  }
)

Pagination.displayName = 'Pagination'
