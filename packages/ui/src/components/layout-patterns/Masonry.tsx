import { YStack, styled } from 'tamagui'
import { useMemo, type ReactNode } from 'react'

export interface MasonryProps {
  columns: number
  gap?: number
  items: ReactNode[]
}

const MasonryContainer = styled(YStack, {
  name: 'Masonry',
  width: '100%',
})

export function Masonry({ columns, gap = 8, items }: MasonryProps) {
  const columnItems = useMemo(() => {
    const cols: ReactNode[][] = Array.from({ length: columns }, () => [])
    items.forEach((item, index) => {
      cols[index % columns].push(item)
    })
    return cols
  }, [columns, items])

  return (
    <MasonryContainer flexDirection="row" gap={gap}>
      {columnItems.map((col, colIndex) => (
        <YStack key={colIndex} flex={1} gap={gap}>
          {col.map((item, itemIndex) => (
            <YStack key={itemIndex}>{item}</YStack>
          ))}
        </YStack>
      ))}
    </MasonryContainer>
  )
}
