import { styled, YStack, XStack, Text, type StackProps } from 'tamagui'
import { forwardRef, useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { Platform } from 'react-native'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps extends StackProps {
  /** Array of options to display */
  options: SelectOption[]
  /** Placeholder text */
  placeholder?: string
  /** Whether the select is searchable */
  isSearchable?: boolean
  /** Whether multiple options can be selected */
  isMulti?: boolean
  /** Whether the select is disabled */
  isDisabled?: boolean
  /** Whether the select can be cleared */
  isClearable?: boolean
  /** Change handler */
  onChange?: (value: string | string[]) => void
  /** Current value(s) */
  value?: string | string[]
  /** Select size */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the select is in an error state */
  error?: boolean
}

const getSizeStyles = (size: string = 'md') => {
  switch (size) {
    case 'sm':
      return { height: 32, fontSize: 14, paddingHorizontal: 8 }
    case 'lg':
      return { height: 48, fontSize: 18, paddingHorizontal: 16 }
    default:
      return { height: 40, fontSize: 16, paddingHorizontal: 12 }
  }
}

const SelectTrigger = styled(XStack, {
  name: 'SelectTrigger',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$md',
  backgroundColor: '$background',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  width: '100%',

  hoverStyle: {
    borderColor: '$primary500',
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.6,
        backgroundColor: '$gray100',
        cursor: 'not-allowed',
      },
    },
    error: {
      true: {
        borderColor: '$error',
      },
    },
    open: {
      true: {
        borderColor: '$primary500',
      },
    },
  } as const,
})

const Dropdown = styled(YStack, {
  name: 'SelectDropdown',
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: '$dropdown',
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$md',
  marginTop: 4,
  maxHeight: 250,
  overflow: 'hidden',
  elevation: 4,
})

const OptionItem = styled(XStack, {
  name: 'SelectOption',
  paddingHorizontal: '$sm',
  paddingVertical: '$sm',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'space-between',

  hoverStyle: {
    backgroundColor: '$primary50',
  },

  variants: {
    selected: {
      true: {
        backgroundColor: '$primary100',
      },
    },
    active: {
      true: {
        backgroundColor: '$primary50',
      },
    },
  } as const,
})

const SearchInput = styled('input', {
  name: 'SelectSearchInput',
  width: '100%',
  borderWidth: 0,
  outlineStyle: 'none',
  fontSize: 14,
  padding: 8,
  backgroundColor: 'transparent',
  color: '$textPrimary',
  fontFamily: '$body',
})

/** A dropdown select component with search, multi-select, and clearable support. */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      placeholder = 'Select...',
      isSearchable = false,
      isMulti = false,
      isDisabled = false,
      isClearable = false,
      onChange,
      value,
      size = 'md',
      error = false,
      style,
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    const sizeStyles = getSizeStyles(size)

    const filteredOptions = useMemo(
      () =>
        isSearchable && searchTerm
          ? options.filter((opt) =>
              opt.label.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : options,
      [options, isSearchable, searchTerm]
    )

    const selectedLabels = useMemo(() => {
      if (!value) return ''
      if (isMulti && Array.isArray(value)) {
        return value
          .flatMap((v) => options.find((o) => o.value === v)?.label || [])
          .join(', ')
      }
      const singleValue = Array.isArray(value) ? value[0] : value
      return options.find((o) => o.value === singleValue)?.label || ''
    }, [value, options, isMulti])

    const handleToggle = useCallback(() => {
      if (!isDisabled) {
        setIsOpen((prev) => !prev)
        setSearchTerm('')
        setFocusedIndex(-1)
      }
    }, [isDisabled])

    const handleSelect = useCallback(
      (optionValue: string) => {
        if (isMulti && Array.isArray(value)) {
          const newValue = value.includes(optionValue)
            ? value.filter((v) => v !== optionValue)
            : [...value, optionValue]
          onChange?.(newValue)
        } else {
          onChange?.(optionValue)
          setIsOpen(false)
        }
      },
      [isMulti, value, onChange]
    )

    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation()
        onChange?.(isMulti ? [] : '')
      },
      [onChange, isMulti]
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!isOpen) {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault()
            setIsOpen(true)
          }
          return
        }

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            setFocusedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            )
            break
          case 'ArrowUp':
            e.preventDefault()
            setFocusedIndex((prev) =>
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            )
            break
          case 'Enter':
            e.preventDefault()
            if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
              handleSelect(filteredOptions[focusedIndex].value)
            }
            break
          case 'Escape':
            e.preventDefault()
            setIsOpen(false)
            break
        }
      },
      [isOpen, filteredOptions, focusedIndex, handleSelect]
    )

    useEffect(() => {
      if (focusedIndex >= 0 && listRef.current) {
        const items = listRef.current.querySelectorAll('[data-option-index]')
        items[focusedIndex]?.scrollIntoView({ block: 'nearest' })
      }
    }, [focusedIndex])

    useEffect(() => {
      if (isOpen && isSearchable) {
        setTimeout(() => searchInputRef.current?.focus(), 0)
      }
    }, [isOpen, isSearchable])

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
      <YStack ref={containerRef} position="relative" width="100%" {...rest}>
        <SelectTrigger
          ref={ref}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={isDisabled}
          aria-invalid={error}
          tabIndex={isDisabled ? -1 : 0}
          disabled={isDisabled}
          error={error}
          open={isOpen}
          onPress={handleToggle}
          onKeyDown={handleKeyDown}
          height={sizeStyles.height}
          paddingHorizontal={sizeStyles.paddingHorizontal}
        >
          <Text
            color={selectedLabels ? '$textPrimary' : '$textTertiary'}
            fontSize={sizeStyles.fontSize}
            flex={1}
            numberOfLines={1}
          >
            {selectedLabels || placeholder}
          </Text>
          <XStack space="$xs" alignItems="center">
            {isClearable && value && (Array.isArray(value) ? value.length > 0 : value !== '') && (
              <Text
                role="button"
                aria-label="Clear selection"
                cursor="pointer"
                color="$textSecondary"
                fontSize={14}
                onPress={handleClear}
              >
                ×
              </Text>
            )}
            <Text color="$textSecondary" fontSize={12}>
              {isOpen ? '▲' : '▼'}
            </Text>
          </XStack>
        </SelectTrigger>

        {isOpen && (
          <Dropdown ref={listRef} role="listbox" aria-multiselectable={isMulti}>
            {isSearchable && (
              <XStack borderBottomWidth={1} borderBottomColor="$border" padding="$xs">
                <SearchInput
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setFocusedIndex(-1)
                  }}
                  placeholder="Search..."
                  aria-label="Search options"
                />
              </XStack>
            )}
            {filteredOptions.length === 0 ? (
              <OptionItem disabled>
                <Text color="$textTertiary">No options found</Text>
              </OptionItem>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = isMulti
                  ? Array.isArray(value) && value.includes(option.value)
                  : value === option.value
                return (
                  <OptionItem
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    data-option-index={index}
                    selected={isSelected}
                    active={focusedIndex === index}
                    onPress={() => handleSelect(option.value)}
                    onMouseEnter={() => setFocusedIndex(index)}
                  >
                    <Text fontSize={sizeStyles.fontSize}>{option.label}</Text>
                    {isSelected && <Text color="$primary500">✓</Text>}
                  </OptionItem>
                )
              })
            )}
          </Dropdown>
        )}
      </YStack>
    )
  }
)

Select.displayName = 'Select'
