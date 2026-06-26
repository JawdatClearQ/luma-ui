import { XStack, YStack, Input, Text, Spinner, styled } from 'tamagui'
import { useState, useRef, useEffect, useCallback } from 'react'

export interface AutocompleteOption {
  label: string
  value: string
}

export interface AutocompleteProps {
  options: AutocompleteOption[]
  value?: string
  onChange: (value: string, option: AutocompleteOption) => void
  onInputChange?: (input: string) => void
  placeholder?: string
  isLoading?: boolean
  debounceMs?: number
}

const Dropdown = styled(YStack, {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: '$surface',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$md',
  zIndex: '$dropdown',
  maxHeight: 240,
  overflow: 'auto',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
})

export function Autocomplete({
  options,
  value = '',
  onChange,
  onInputChange,
  placeholder = 'Type to search...',
  isLoading = false,
  debounceMs = 300,
}: AutocompleteProps) {
  const [input, setInput] = useState(value)
  const [focused, setFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInput(value)
  }, [value])

  const handleInputChange = useCallback(
    (text: string) => {
      setInput(text)
      clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        onInputChange?.(text)
      }, debounceMs)
    },
    [onInputChange, debounceMs]
  )

  const filtered = input
    ? options.filter((o) => o.label.toLowerCase().includes(input.toLowerCase()))
    : options

  const showDropdown = focused && (filtered.length > 0 || isLoading)

  const handleSelect = (option: AutocompleteOption) => {
    setInput(option.label)
    onChange(option.value, option)
    setFocused(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) {
      if (e.key === 'Enter' && filtered[0]) {
        handleSelect(filtered[0])
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setFocused(false)
        inputRef.current?.blur()
        break
    }
  }

  return (
    <YStack position="relative" width="100%">
      <Input
        ref={inputRef}
        value={input}
        onChangeText={handleInputChange}
        placeholder={placeholder}
        borderRadius="$md"
        width="100%"
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-expanded={!!showDropdown}
      />
      {isLoading && (
        <Spinner size="small" position="absolute" right={12} top={10} color="$gray400" />
      )}
      {showDropdown && (
        <Dropdown role="listbox">
          {isLoading && (
            <XStack padding="$sm $md" justifyContent="center">
              <Spinner size="small" color="$gray400" />
            </XStack>
          )}
          {!isLoading && filtered.length === 0 && (
            <Text padding="$sm $md" color="$gray400" fontSize={14}>
              No options found
            </Text>
          )}
          {!isLoading &&
            filtered.map((option, index) => (
              <XStack
                key={option.value}
                role="option"
                aria-selected={index === selectedIndex}
                padding="$sm $md"
                cursor="pointer"
                backgroundColor={index === selectedIndex ? '$gray100' : 'transparent'}
                hoverStyle={{ backgroundColor: '$gray50' }}
                onPress={() => handleSelect(option)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <Text fontSize={14} color="$textPrimary">
                  {option.label}
                </Text>
              </XStack>
            ))}
        </Dropdown>
      )}
    </YStack>
  )
}
