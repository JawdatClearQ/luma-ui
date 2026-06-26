import { forwardRef, useCallback } from 'react'
import { YStack, XStack, Text, Input } from 'tamagui'
import { Table, type TableProps, type Column } from './Table'

export interface PaginationConfig {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

export interface DataTableProps extends TableProps {
  isSelectable?: boolean
  selectedIds?: Set<string | number>
  onSelectionChange?: (ids: Set<string | number>) => void
  pagination?: PaginationConfig
  onSearch?: (query: string) => void
  loading?: boolean
}

export const DataTable = forwardRef<any, DataTableProps>(
  (
    {
      isSelectable,
      selectedIds = new Set(),
      onSelectionChange,
      pagination,
      onSearch,
      loading,
      columns,
      data,
      ...rest
    },
    ref
  ) => {
    const allSelected =
      data.length > 0 && data.every((row: any) => selectedIds.has(row.id))

    const toggleAll = useCallback(() => {
      if (!onSelectionChange) return
      if (allSelected) {
        onSelectionChange(new Set())
      } else {
        onSelectionChange(new Set(data.map((d: any) => d.id)))
      }
    }, [allSelected, data, onSelectionChange])

    const toggleRow = useCallback(
      (id: string | number) => {
        if (!onSelectionChange) return
        const next = new Set(selectedIds)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        onSelectionChange(next)
      },
      [selectedIds, onSelectionChange]
    )

    const selectCol: Column | null = isSelectable
      ? { key: '_select', label: '', width: 40, sortable: false }
      : null

    const allColumns = selectCol ? [selectCol, ...columns] : columns

    const enhancedData = isSelectable
      ? data.map((row: any) => {
          const checked = selectedIds.has(row.id) ? '✓' : ''
          return { ...row, _select: checked }
        })
      : data

    return (
      <YStack ref={ref} gap="$md">
        {onSearch && (
          <XStack gap="$sm" alignItems="center">
            <Input
              flex={1}
              placeholder="Search..."
              onChangeText={onSearch}
              size="$sm"
            />
            {loading && <Text fontSize={12} color="$textTertiary">Loading...</Text>}
          </XStack>
        )}
        <Table
          columns={allColumns}
          data={enhancedData}
          {...rest}
        />
        {pagination && (
          <XStack justifyContent="center" paddingTop="$sm">
            <XStack gap="$sm" alignItems="center">
              <Text
                fontSize={13}
                color="$textSecondary"
                cursor="pointer"
                hoverStyle={{ opacity: 0.7 }}
                onPress={() => pagination.onPageChange(Math.max(1, pagination.page - 1))}
                aria-label="Previous page"
              >
                ← Prev
              </Text>
              <Text fontSize={13} fontWeight="600" color="$textPrimary">
                {pagination.page} / {Math.ceil(pagination.total / pagination.pageSize)}
              </Text>
              <Text
                fontSize={13}
                color="$textSecondary"
                cursor="pointer"
                hoverStyle={{ opacity: 0.7 }}
                onPress={() => {
                  const maxPage = Math.ceil(pagination.total / pagination.pageSize)
                  pagination.onPageChange(Math.min(maxPage, pagination.page + 1))
                }}
                aria-label="Next page"
              >
                Next →
              </Text>
            </XStack>
          </XStack>
        )}
      </YStack>
    )
  }
)

DataTable.displayName = 'DataTable'
