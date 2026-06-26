import { XStack, YStack, Text, styled } from 'tamagui'
import { useState, type ReactNode } from 'react'

export interface KanbanItem {
  id: string
  content: ReactNode
}

export interface KanbanColumn {
  id: string
  title: string
  items: KanbanItem[]
}

export interface KanbanProps {
  columns: KanbanColumn[]
  onDragEnd?: (result: { source: { columnId: string; index: number }; destination: { columnId: string; index: number } }) => void
  renderCard?: (item: KanbanItem) => ReactNode
}

const BoardContainer = styled(XStack, {
  name: 'KanbanBoard',
  gap: '$md',
  padding: '$md',
  overflow: 'auto',
  height: '100%',
})

const ColumnContainer = styled(YStack, {
  name: 'KanbanColumn',
  backgroundColor: '$gray50',
  borderRadius: '$lg',
  minWidth: 260,
  maxWidth: 320,
  flex: 1,
})

const ColumnHeader = styled(XStack, {
  padding: '$sm $md',
  borderBottomWidth: 1,
  borderBottomColor: '$border',
})

const CardContainer = styled(YStack, {
  name: 'KanbanCard',
  backgroundColor: '$surface',
  borderRadius: '$md',
  padding: '$md',
  marginHorizontal: '$sm',
  marginBottom: '$sm',
  cursor: 'pointer',
  hoverStyle: { backgroundColor: '$gray50' },
  borderWidth: 1,
  borderColor: '$border',
})

const defaultRenderCard = (item: KanbanItem) => (
  <Text fontSize={14} color="$textPrimary">
    {item.content}
  </Text>
)

function KanbanCard({ item, renderCard }: { item: KanbanItem; renderCard: (item: KanbanItem) => React.ReactNode }) {
  return <>{renderCard(item)}</>
}

function handleDragOver(e: any) {
  e.preventDefault()
}

export function Kanban({
  columns: initialColumns,
  onDragEnd,
  renderCard = defaultRenderCard,
}: KanbanProps) {
  const [columns, setColumns] = useState(initialColumns)
  const [dragItem, setDragItem] = useState<{ columnId: string; index: number } | null>(null)

  const handleDragStart = (columnId: string, index: number) => {
    setDragItem({ columnId, index })
  }

  const handleDrop = (targetColumnId: string, targetIndex: number) => {
    if (!dragItem) return

    const sourceCol = columns.find((c) => c.id === dragItem.columnId)
    const destCol = columns.find((c) => c.id === targetColumnId)
    if (!sourceCol || !destCol) return

    const newColumns = columns.map((col) => {
      if (col.id === sourceCol.id) {
        const newItems = [...col.items]
        const [moved] = newItems.splice(dragItem.index, 1)
        if (sourceCol.id === destCol.id) {
          newItems.splice(targetIndex, 0, moved)
        }
        return { ...col, items: newItems }
      }
      if (col.id === destCol.id && sourceCol.id !== destCol.id) {
        const newItems = [...col.items]
        const [moved] = sourceCol.items
        newItems.splice(targetIndex, 0, moved)
        return { ...col, items: newItems }
      }
      return col
    })

    setColumns(newColumns)

    if (onDragEnd) {
      onDragEnd({
        source: { columnId: dragItem.columnId, index: dragItem.index },
        destination: { columnId: targetColumnId, index: targetIndex },
      })
    }

    setDragItem(null)
  }

  return (
    <BoardContainer>
      {columns.map((column) => (
        <ColumnContainer
          key={column.id}
          onDragOver={handleDragOver}
          onDrop={() => {
            if (dragItem) {
              const dropIndex = column.items.length
              handleDrop(column.id, dropIndex)
            }
          }}
        >
          <ColumnHeader>
            <Text fontWeight="600" fontSize={14} color="$textPrimary">
              {column.title}
            </Text>
            <Text fontSize={12} color="$gray400" marginLeft="$sm">
              ({column.items.length})
            </Text>
          </ColumnHeader>

          <YStack padding="$sm" flex={1} minHeight={100}>
            {column.items.map((item, index) => (
              <CardContainer
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(column.id, index)}
                onDragOver={handleDragOver}
                onDrop={(e: any) => {
                  e.stopPropagation()
                  handleDrop(column.id, index)
                }}
                opacity={
                  dragItem?.columnId === column.id && dragItem?.index === index
                    ? 0.5
                    : 1
                }
              >
                <KanbanCard item={item} renderCard={renderCard} />
              </CardContainer>
            ))}
          </YStack>
        </ColumnContainer>
      ))}
    </BoardContainer>
  )
}
