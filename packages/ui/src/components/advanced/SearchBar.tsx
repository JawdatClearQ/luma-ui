import { XStack, Input, YStack, Text, Spinner, styled } from 'tamagui'
import { useState, useRef, useEffect, type ReactNode } from 'react'

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  suggestions?: string[]
  isLoading?: boolean
}

const SearchContainer = styled(YStack, {
  name: 'SearchBar',
  position: 'relative',
  width: '100%',
})

const SuggestionsList = styled(YStack, {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: '$surface',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$md',
  zIndex: '$dropdown',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
})

const sizeMap = {
  sm: { height: 32, fontSize: 14 },
  md: { height: 40, fontSize: 16 },
  lg: { height: 48, fontSize: 18 },
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search...',
  size = 'md',
  suggestions,
  isLoading = false,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dims = sizeMap[size]

  const showSuggestions = focused && suggestions && suggestions.length > 0

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) {
      if (e.key === 'Enter') onSubmit?.(value)
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, suggestions!.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions) {
          onChange(suggestions[selectedIndex])
        }
        onSubmit?.(value)
        setSelectedIndex(-1)
        break
      case 'Escape':
        e.preventDefault()
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  return (
    <SearchContainer>
      <XStack position="relative" alignItems="center">
        <Input
          ref={inputRef}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          height={dims.height}
          fontSize={dims.fontSize}
          borderRadius="$md"
          width="100%"
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-expanded={!!showSuggestions}
        />
        {isLoading && (
          <Spinner size="small" position="absolute" right={12} color="$gray400" />
        )}
      </XStack>

      {showSuggestions && (
        <SuggestionsList role="listbox">
          {suggestions!.map((suggestion, index) => (
            <XStack
              key={suggestion}
              role="option"
              aria-selected={index === selectedIndex}
              padding="$sm $md"
              cursor="pointer"
              backgroundColor={index === selectedIndex ? '$gray100' : 'transparent'}
              hoverStyle={{ backgroundColor: '$gray50' }}
              onPress={() => {
                onChange(suggestion)
                inputRef.current?.blur()
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <Text fontSize={dims.fontSize} color="$textPrimary">
                {suggestion}
              </Text>
            </XStack>
          ))}
        </SuggestionsList>
      )}
    </SearchContainer>
  )
}
