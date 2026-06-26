import { forwardRef, useState, useCallback } from 'react'
import { styled, YStack, XStack, Text } from 'tamagui'
import type { YStackProps } from 'tamagui'

export interface TreeNode {
  id: string | number
  label: string
  children?: TreeNode[]
  icon?: React.ReactNode
}

export interface TreeViewProps extends YStackProps {
  data: TreeNode[]
  defaultExpandedIds?: Set<string | number>
  onSelect?: (node: TreeNode) => void
  renderIcon?: (node: TreeNode, isExpanded: boolean) => React.ReactNode
}

const TreeItem = styled(XStack, {
  alignItems: 'center',
  gap: 6,
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderRadius: '$sm',
  cursor: 'pointer',
  hoverStyle: { backgroundColor: '$gray100' },
})

interface TreeNodeRowProps {
  node: TreeNode
  depth: number
  expandedIds: Set<string | number>
  onToggle: (id: string | number) => void
  onSelect?: (node: TreeNode) => void
  renderIcon?: (node: TreeNode, isExpanded: boolean) => React.ReactNode
}

function TreeNodeRow({ node, depth, expandedIds, onToggle, onSelect, renderIcon }: TreeNodeRowProps) {
  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expandedIds.has(node.id)

  const arrow = hasChildren ? (isExpanded ? '▼' : '▶') : null

  return (
    <YStack>
      <TreeItem
        paddingLeft={16 + depth * 20}
        onPress={() => {
          if (hasChildren) onToggle(node.id)
          onSelect?.(node)
        }}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        {hasChildren && (
          <Text fontSize={10} color="$textTertiary" width={12}>
            {arrow}
          </Text>
        )}
        {renderIcon
          ? renderIcon(node, isExpanded)
          : node.icon && <Text fontSize={16}>{node.icon}</Text>}
        <Text fontSize={14} color="$textPrimary" userSelect="none">
          {node.label}
        </Text>
      </TreeItem>
      {hasChildren && isExpanded && (
        <YStack>
          {node.children!.map((child) => (
            <TreeNodeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              onToggle={onToggle}
              onSelect={onSelect}
              renderIcon={renderIcon}
            />
          ))}
        </YStack>
      )}
    </YStack>
  )
}

export const TreeView = forwardRef<any, TreeViewProps>(
  ({ data, defaultExpandedIds = new Set(), onSelect, renderIcon, ...props }, ref) => {
    const [expandedIds, setExpandedIds] = useState<Set<string | number>>(defaultExpandedIds)

    const onToggle = useCallback((id: string | number) => {
      setExpandedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }, [])

    return (
      <YStack ref={ref} role="tree" {...props}>
        {data.map((node) => (
          <TreeNodeRow
            key={node.id}
            node={node}
            depth={0}
            expandedIds={expandedIds}
            onToggle={onToggle}
            onSelect={onSelect}
            renderIcon={renderIcon}
          />
        ))}
      </YStack>
    )
  }
)

TreeView.displayName = 'TreeView'
