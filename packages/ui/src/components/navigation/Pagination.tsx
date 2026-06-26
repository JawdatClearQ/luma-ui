import { styled, XStack, Text, Button, type StackProps } from 'tamagui'
import { forwardRef, useMemo } from 'react'
import { range } from '../../utils'

type PageSize = 'sm' | 'md' | 'lg'
type PageVariant = 'outline' | 'solid' | 'ghost'

export interface PaginationProps extends StackProps {
  totalPages: number
  currentPage: number
  onChange: (page: number) => void
  siblingCount?: number
  boundaryCount?: number
  size?: PageSize
  variant?: PageVariant
}

const sizeMap = {
  sm: { size: 28, fontSize: 12, gap: 2 },
  md: { size: 36, fontSize: 14, gap: 4 },
  lg: { size: 44, fontSize: 16, gap: 6 },
}

function getPageNumbers(
  total: number,
  current: number,
  siblings: number,
  boundaries: number
): (number | 'ellipsis')[] {
  const totalNumbers = siblings * 2 + boundaries * 2 + 5
  if (totalNumbers >= total) return range(1, total)

  const pages: (number | 'ellipsis')[] = []
  const leftBoundary = boundaries
  const rightBoundary = total - boundaries + 1
  const leftRange = Math.max(current - siblings, boundaries + 2)
  const rightRange = Math.min(current + siblings, total - boundaries - 1)

  for (let i = 1; i <= boundaries; i++) pages.push(i)
  if (leftRange > boundaries + 2) pages.push('ellipsis')
  for (let i = leftRange; i <= rightRange; i++) pages.push(i)
  if (rightRange < total - boundaries - 1) pages.push('ellipsis')
  for (let i = total - boundaries + 1; i <= total; i++) pages.push(i)

  return pages
}

const PageButton = styled(Button, {
  name: 'PageButton',
  borderRadius: '$md',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: 0,
  variants: {
    variant: {
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$border',
        color: '$textPrimary',
        hoverStyle: { backgroundColor: '$gray50' },
      },
      solid: {
        backgroundColor: 'transparent',
        color: '$textPrimary',
        hoverStyle: { backgroundColor: '$gray100' },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$textPrimary',
        hoverStyle: { backgroundColor: '$gray100' },
      },
    },
    active: {
      true: {
        backgroundColor: '$primary500',
        color: 'white',
        hoverStyle: { backgroundColor: '$primary600' },
      },
    },
    disabled: {
      true: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
    },
  } as const,
})

const NavButton = styled(Button, {
  name: 'NavButton',
  borderRadius: '$md',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: 0,
  backgroundColor: 'transparent',
  color: '$textPrimary',
  hoverStyle: { backgroundColor: '$gray100' },
  disabledStyle: { opacity: 0.3, cursor: 'not-allowed' },
})

export const Pagination = forwardRef<any, PaginationProps>(
  (props: PaginationProps, ref) => {
    const {
      totalPages,
      currentPage,
      onChange,
      siblingCount = 1,
      boundaryCount = 1,
      size = 'md',
      variant = 'outline',
      ...rest
    } = props

    const s = size as PageSize
    const v = variant as PageVariant
    const dims = sizeMap[s]
    const pages = useMemo(
      () => getPageNumbers(totalPages, currentPage, siblingCount, boundaryCount),
      [totalPages, currentPage, siblingCount, boundaryCount]
    )

    return (
      <XStack
        ref={ref}
        gap={dims.gap}
        alignItems="center"
        role="navigation"
        aria-label="Pagination"
        {...rest}
      >
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
                color="$textTertiary"
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
              variant={v}
              active={isActive}
              width={dims.size}
              height={dims.size}
              onPress={() => onChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Text fontSize={dims.fontSize} fontWeight={isActive ? '700' : '400'} color="inherit">
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
