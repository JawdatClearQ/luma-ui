import { forwardRef, useState } from 'react'
import { styled, YStack, XStack, Text } from 'tamagui'
import type { YStackProps } from 'tamagui'

type TableVariant = 'simple' | 'striped' | 'bordered'
type TableSize = 'sm' | 'md' | 'lg'

export interface Column {
  key: string
  label: string
  sortable?: boolean
  width?: number | string
}

export interface TableProps extends YStackProps {
  columns: Column[]
  data: any[]
  onSort?: (key: string) => void
  sortColumn?: string
  sortDirection?: 'asc' | 'desc'
  onRowPress?: (row: any, idx: number) => void
  variant?: TableVariant
  size?: TableSize
}

const sizeMap: Record<TableSize, { p: number; fontSize: number; headerFontSize: number }> = {
  sm: { p: 8, fontSize: 12, headerFontSize: 11 },
  md: { p: 12, fontSize: 14, headerFontSize: 12 },
  lg: { p: 16, fontSize: 16, headerFontSize: 14 },
}

const TableWrapper = styled(YStack, {
  name: 'Table',
  borderRadius: '$md',
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '$border',
})

const ThText = styled(Text, {
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  color: '$textSecondary',
  userSelect: 'none',
})

const TdText = styled(Text, {
  color: '$textPrimary',
})

export const Table = forwardRef<any, TableProps>(
  (
    {
      columns,
      data,
      onSort,
      sortColumn,
      sortDirection,
      onRowPress,
      variant = 'simple',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const dims = sizeMap[size]

    return (
      <TableWrapper ref={ref} {...props}>
        <XStack
          backgroundColor="$gray100"
          borderBottomWidth={1}
          borderBottomColor="$border"
        >
          {columns.map((col) => (
            <XStack
              key={col.key}
              flex={col.width ? undefined : 1}
              width={col.width}
              padding={dims.p}
              gap={4}
              alignItems="center"
              {...(col.sortable ? { onPress: () => onSort?.(col.key), cursor: 'pointer', hoverStyle: { opacity: 0.7 } } : {})}
              role={col.sortable ? 'columnheader' : undefined}
              aria-sort={
                sortColumn === col.key
                  ? sortDirection === 'asc' ? 'ascending' : 'descending'
                  : undefined
              }
            >
              <ThText fontSize={dims.headerFontSize}>{col.label}</ThText>
              {col.sortable && sortColumn === col.key && (
                <Text fontSize={10} color="$textTertiary">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </Text>
              )}
            </XStack>
          ))}
        </XStack>
        {data.map((row, idx) => {
          const bg =
            variant === 'striped' && idx % 2 === 1
              ? '$gray50'
              : 'transparent'
          return (
            <XStack
              key={row.id ?? idx}
              backgroundColor={bg}
              borderBottomWidth={idx < data.length - 1 ? 1 : 0}
              borderBottomColor="$border"
              {...(onRowPress
                ? { onPress: () => onRowPress(row, idx), cursor: 'pointer', hoverStyle: { backgroundColor: '$gray100' } }
                : {})}
            >
              {columns.map((col) => (
                <XStack
                  key={col.key}
                  flex={col.width ? undefined : 1}
                  width={col.width}
                  padding={dims.p}
                  alignItems="center"
                >
                  <TdText fontSize={dims.fontSize}>{row[col.key] ?? '-'}</TdText>
                </XStack>
              ))}
            </XStack>
          )
        })}
      </TableWrapper>
    )
  }
)

Table.displayName = 'Table'
