import { YStack, XStack, Text, Input, styled, useMedia } from 'tamagui'
import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react'

export interface Command {
  id: string
  label: string
  icon?: ReactNode
  shortcut?: string
  onSelect: () => void
  group?: string
}

export interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  commands: Command[]
  placeholder?: string
}

const Overlay = styled(YStack, {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '$overlay',
  zIndex: '$modal',
  justifyContent: 'center',
  alignItems: 'center',
})

const Panel = styled(YStack, {
  backgroundColor: '$surface',
  borderRadius: '$lg',
  width: 560,
  maxWidth: '90vw',
  maxHeight: '60vh',
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.2,
  shadowRadius: 24,
  elevation: 8,
})

const CommandItem = styled(XStack, {
  padding: '$sm $md',
  alignItems: 'center',
  gap: '$sm',
  cursor: 'pointer',
  hoverStyle: { backgroundColor: '$gray50' },
})

const Shortcut = styled(Text, {
  fontSize: 12,
  color: '$gray400',
  backgroundColor: '$gray100',
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: '$sm',
})

export function CommandPalette({ isOpen, onClose, commands, placeholder = 'Search commands...' }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((i) => (i + 1) % filtered.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length)
          break
        case 'Enter':
          e.preventDefault()
          if (filtered[selectedIndex]) {
            filtered[selectedIndex].onSelect()
            onClose()
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    },
    [filtered, selectedIndex, onClose]
  )

  if (!isOpen) return null

  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    const group = cmd.group || 'General'
    if (!acc[group]) acc[group] = []
    acc[group].push(cmd)
    return acc
  }, {})

  return (
    <Overlay onPress={onClose}>
      <Panel onKeyDown={handleKeyDown} onPress={(e: any) => e.stopPropagation?.()}>
        <Input
          ref={inputRef}
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          borderWidth={0}
          borderBottomWidth={1}
          borderBottomColor="$border"
          fontSize={16}
          padding="$md"
          borderRadius={0}
        />
        <YStack overflow="auto" padding="$sm">
          {Object.entries(grouped).map(([group, items]) => (
            <YStack key={group}>
              {group !== 'General' && (
                <Text fontSize={11} color="$gray400" padding="$sm" paddingBottom={4} textTransform="uppercase" letterSpacing={1}>
                  {group}
                </Text>
              )}
              {items.map((cmd, index) => {
                const globalIndex = filtered.indexOf(cmd)
                return (
                  <CommandItem
                    key={cmd.id}
                    role="option"
                    aria-selected={globalIndex === selectedIndex}
                    backgroundColor={globalIndex === selectedIndex ? '$gray100' : 'transparent'}
                    onPress={() => {
                      cmd.onSelect()
                      onClose()
                    }}
                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                  >
                    {cmd.icon}
                    <Text flex={1} color="$textPrimary" fontSize={14}>
                      {cmd.label}
                    </Text>
                    {cmd.shortcut && <Shortcut>{cmd.shortcut}</Shortcut>}
                  </CommandItem>
                )
              })}
            </YStack>
          ))}
          {filtered.length === 0 && (
            <Text color="$gray400" padding="$md" textAlign="center">
              No results found
            </Text>
          )}
        </YStack>
      </Panel>
    </Overlay>
  )
}
