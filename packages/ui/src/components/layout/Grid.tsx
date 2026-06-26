import { View, type ViewProps } from 'tamagui'
import { forwardRef, type ReactNode, useMemo } from 'react'

type ResponsiveValue = number | { sm?: number; md?: number; lg?: number; xl?: number }

export interface GridProps extends ViewProps {
  columns?: ResponsiveValue
  columnGap?: number
  rowGap?: number
  gap?: number
  children?: ReactNode
}

function toCssColumns(columns?: ResponsiveValue): string | undefined {
  if (!columns) return undefined
  if (typeof columns === 'number') return `repeat(${columns}, 1fr)`
  const parts: string[] = []
  if (columns.sm) parts.push(`(min-width: 640px) repeat(${columns.sm}, 1fr)`)
  if (columns.md) parts.push(`(min-width: 768px) repeat(${columns.md}, 1fr)`)
  if (columns.lg) parts.push(`(min-width: 1024px) repeat(${columns.lg}, 1fr)`)
  if (columns.xl) parts.push(`(min-width: 1280px) repeat(${columns.xl}, 1fr)`)
  return parts.join(', ')
}

export const Grid = forwardRef<any, GridProps>(
  ({ columns, gap, columnGap, rowGap, children, style, ...props }, ref) => {
    const gridStyle = useMemo(() => {
      const base: Record<string, any> = {
        display: 'grid',
        gap,
        columnGap,
        rowGap,
      }

      if (typeof columns === 'number') {
        base.gridTemplateColumns = `repeat(${columns}, 1fr)`
      } else if (columns) {
        const baseCol = columns.sm ?? columns.md ?? columns.lg ?? columns.xl ?? 1
        base.gridTemplateColumns = `repeat(${baseCol}, 1fr)`
      }

      return { ...base, ...(style as Record<string, any>) }
    }, [columns, gap, columnGap, rowGap, style])

    return (
      <View ref={ref} style={gridStyle} {...props}>
        {children}
      </View>
    )
  }
)

Grid.displayName = 'Grid'
