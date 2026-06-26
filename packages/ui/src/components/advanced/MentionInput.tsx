import { XStack, YStack, Input, Text, Image, styled } from 'tamagui'
import { useState, useRef, useCallback, useEffect } from 'react'

export interface Mention {
  id: string
  label: string
  avatar?: string
}

export interface MentionInputProps {
  value: string
  onChange: (value: string) => void
  mentions: Mention[]
  trigger?: string
  placeholder?: string
}

const MentionDropdown = styled(YStack, {
  position: 'absolute',
  bottom: '100%',
  left: 0,
  backgroundColor: '$surface',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$md',
  zIndex: '$dropdown',
  minWidth: 200,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
})

export function MentionInput({
  value,
  onChange,
  mentions,
  trigger = '@',
  placeholder = 'Type @ to mention...',
}: MentionInputProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [query, setQuery] = useState('')
  const [cursorPos, setCursorPos] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query
    ? mentions.filter((m) => m.label.toLowerCase().includes(query.toLowerCase()))
    : mentions

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleChange = useCallback(
    (text: string) => {
      onChange(text)

      const pos = (inputRef.current as any)?.selectionStart ?? text.length
      setCursorPos(pos)

      const beforeCursor = text.slice(0, pos)
      const triggerIndex = beforeCursor.lastIndexOf(trigger)

      if (triggerIndex >= 0) {
        const afterTrigger = beforeCursor.slice(triggerIndex + trigger.length)
        if (!afterTrigger.includes(' ')) {
          setQuery(afterTrigger)
          setShowMenu(true)
          return
        }
      }

      setShowMenu(false)
    },
    [onChange, trigger]
  )

  const insertMention = (mention: Mention) => {
    const before = value.slice(0, cursorPos)
    const after = value.slice(cursorPos)
    const triggerIndex = before.lastIndexOf(trigger)
    const beforeTrigger = before.slice(0, triggerIndex)
    const newValue = `${beforeTrigger}${trigger}${mention.label} ${after}`
    onChange(newValue)
    setShowMenu(false)
    setQuery('')
    setTimeout(() => {
      const newPos = beforeTrigger.length + trigger.length + mention.label.length + 1
      inputRef.current?.setSelectionRange?.(newPos, newPos)
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showMenu) return

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
      case 'Tab':
        e.preventDefault()
        if (filtered[selectedIndex]) {
          insertMention(filtered[selectedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setShowMenu(false)
        break
    }
  }

  return (
    <YStack position="relative" width="100%">
      <Input
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        width="100%"
        borderRadius="$md"
        multiline
        aria-autocomplete="list"
        aria-expanded={showMenu}
      />

      {showMenu && filtered.length > 0 && (
        <MentionDropdown role="listbox">
          {filtered.map((mention, index) => (
            <XStack
              key={mention.id}
              role="option"
              aria-selected={index === selectedIndex}
              padding="$sm $md"
              gap="$sm"
              alignItems="center"
              cursor="pointer"
              backgroundColor={index === selectedIndex ? '$gray100' : 'transparent'}
              hoverStyle={{ backgroundColor: '$gray50' }}
              onPress={() => insertMention(mention)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {mention.avatar && (
                <Image
                  source={{ uri: mention.avatar }}
                  width={20}
                  height={20}
                  borderRadius="$full"
                />
              )}
              <Text fontSize={14} color="$textPrimary">
                {mention.label}
              </Text>
            </XStack>
          ))}
        </MentionDropdown>
      )}
    </YStack>
  )
}
