import { XStack, YStack, Input, Text, styled } from 'tamagui'
import { useState, useRef, type ReactNode } from 'react'

export interface ComboboxOption {
  label: string
  value: string
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  isDisabled?: boolean
  isReadOnly?: boolean
  error?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  size?: 'sm' | 'md' | 'lg'
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

export function Combobox({
  options,
  value = '',
  onChange,
  placeholder = 'Select...',
  isDisabled = false,
  isReadOnly = false,
  error = false,
  leftIcon,
  rightIcon,
  size = 'md',
}: ComboboxProps) {
  const [input, setInput] = useState(() => {
    const opt = options.find((o) => o.value === value)
    return opt?.label || ''
  })
  const [focused, setFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = input
    ? options.filter((o) => o.label.toLowerCase().includes(input.toLowerCase()))
    : options

  const showDropdown = focused && !isReadOnly && !isDisabled

  const handleSelect = (option: ComboboxOption) => {
    setInput(option.label)
    onChange(option.value)
    setFocused(false)
    inputRef.current?.blur()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return

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
      <XStack position="relative" alignItems="center">
        {leftIcon && (
          <XStack position="absolute" left={8} zIndex="$docked" pointerEvents="none">
            {leftIcon}
          </XStack>
        )}
        <Input
          ref={inputRef}
          value={input}
          onChangeText={setInput}
          placeholder={placeholder}
          borderRadius="$md"
          width="100%"
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-invalid={error}
          paddingLeft={leftIcon ? 36 : 12}
          paddingRight={36}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-expanded={!!showDropdown}
        />
        <XStack position="absolute" right={8} zIndex="$docked" pointerEvents="none">
          {rightIcon || (
            <Text color="$gray400" fontSize={10}>
              ▼
            </Text>
          )}
        </XStack>
      </XStack>

      {showDropdown && (
        <Dropdown role="listbox">
          {filtered.length === 0 ? (
            <Text padding="$sm $md" color="$gray400" fontSize={14}>
              No options found
            </Text>
          ) : (
            filtered.map((option, index) => (
              <XStack
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                padding="$sm $md"
                cursor="pointer"
                backgroundColor={
                  option.value === value
                    ? '$primary50'
                    : index === selectedIndex
                    ? '$gray100'
                    : 'transparent'
                }
                hoverStyle={{ backgroundColor: '$gray50' }}
                onPress={() => handleSelect(option)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <Text fontSize={14} color="$textPrimary">
                  {option.label}
                </Text>
              </XStack>
            ))
          )}
        </Dropdown>
      )}
    </YStack>
  )
}
