import { useMemo } from 'react'

export function usePagination(
  totalPages: number,
  currentPage: number,
  siblingCount = 1,
  boundaryCount = 1
) {
  const pages = useMemo<(number | 'ellipsis')[]>(() => {
    const total = Math.max(1, totalPages)
    const current = Math.max(1, Math.min(currentPage, total))

    if (total <= boundaryCount * 2 + siblingCount * 2 + 2) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }

    const result: (number | 'ellipsis')[] = []

    for (let i = 1; i <= boundaryCount; i++) {
      result.push(i)
    }

    const leftStart = current - siblingCount
    const rightEnd = current + siblingCount

    if (leftStart > boundaryCount + 1) {
      result.push('ellipsis')
    }

    const rangeStart = Math.max(leftStart, boundaryCount + 1)
    const rangeEnd = Math.min(rightEnd, total - boundaryCount)

    for (let i = rangeStart; i <= rangeEnd; i++) {
      result.push(i)
    }

    if (rightEnd < total - boundaryCount) {
      result.push('ellipsis')
    }

    for (let i = total - boundaryCount + 1; i <= total; i++) {
      result.push(i)
    }

    return result
  }, [totalPages, currentPage, siblingCount, boundaryCount])

  return {
    pages,
    totalPages,
    currentPage,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  }
}
