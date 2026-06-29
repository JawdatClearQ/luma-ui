"use client";

import { styled, YStack, XStack, Text, type YStackProps } from 'tamagui'
import { forwardRef, useState, useCallback, useRef, useEffect, useMemo } from 'react'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps extends Omit<YStackProps, 'onChange'> {
  options: SelectOption[]
  placeholder?: string
  isSearchable?: boolean
  isMulti?: boolean
  isDisabled?: boolean
  isClearable?: boolean
  onChange?: (value: string | string[]) => void
  value?: string | string[]
  size?: 'sm' | 'md' | 'lg'
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
  width: '100%',

  hoverStyle: {
    borderColor: '$primary500',
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.6,
        backgroundColor: '$gray100',
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
  zIndex: 50,
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

export const Select = forwardRef<any, SelectProps>(
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
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const containerRef = useRef<any>(null)
    const searchInputRef = useRef<any>(null)
    const listRef = useRef<any>(null)

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
      () => {
        onChange?.(isMulti ? [] : '')
      },
      [onChange, isMulti]
    )

    useEffect(() => {
      const handleClickOutside = (e: any) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          setIsOpen(false)
        }
      }
      if (typeof document !== 'undefined') {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
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
          <XStack gap="$xs" alignItems="center">
            {isClearable && value && (Array.isArray(value) ? value.length > 0 : value !== '') && (
              <Text
                role="button"
                aria-label="Clear selection"
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
          <Dropdown ref={listRef} role={'listbox' as any} aria-multiselectable={isMulti}>
            {isSearchable && (
              <XStack borderBottomWidth={1} borderBottomColor="$border" padding="$xs">
                <XStack
                  flex={1}
                  padding="$sm"
                  backgroundColor="transparent"
                >
                  <Text
                    fontSize={14}
                    color="$textSecondary"
                    onPress={() => {}}
                  >
                    Search...
                  </Text>
                </XStack>
              </XStack>
            )}
            {filteredOptions.length === 0 ? (
              <OptionItem>
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
                    selected={isSelected}
                    active={focusedIndex === index}
                    onPress={() => handleSelect(option.value)}
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
