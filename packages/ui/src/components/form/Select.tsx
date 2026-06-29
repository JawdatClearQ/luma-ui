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
  variant?: 'outline' | 'underlined'
}

const getSizeStyles = (size: string = 'md') => {
  switch (size) {
    case 'sm':
      return { height: 36, fontSize: 14, paddingHorizontal: 12 }
    case 'lg':
      return { height: 56, fontSize: 17, paddingHorizontal: 20 }
    default:
      return { height: 48, fontSize: 15, paddingHorizontal: 16 }
  }
}

const SelectTrigger = styled(XStack, {
  name: 'SelectTrigger',
  borderWidth: 1.5,
  borderColor: '$neutral300',
  borderRadius: 8,
  backgroundColor: '$white',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  hoverStyle: {
    borderColor: '$primary400',
  },

  focusStyle: {
    borderColor: '$primary400',
    borderWidth: 2,
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        backgroundColor: '$neutral50',
      },
    },
    error: {
      true: {
        borderColor: '$error400',
      },
    },
    open: {
      true: {
        borderColor: '$primary400',
        borderWidth: 2,
      },
    },
    variant: {
      outline: {},
      underlined: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 1.5,
        borderColor: '$neutral300',
        paddingHorizontal: 4,
        focusStyle: {
          borderBottomColor: '$primary400',
          borderBottomWidth: 2,
        },
        hoverStyle: {
          borderBottomColor: '$primary400',
        },
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
  backgroundColor: '$white',
  borderWidth: 1,
  borderColor: '$neutral200',
  borderRadius: 8,
  marginTop: 4,
  maxHeight: 250,
  overflow: 'hidden',
  elevation: 8,
  shadowColor: '$black',
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
})

const OptionItem = styled(XStack, {
  name: 'SelectOption',
  paddingHorizontal: 12,
  paddingVertical: 10,
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
      variant = 'outline',
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
          variant={variant}
          onPress={handleToggle}
          height={sizeStyles.height}
          paddingHorizontal={sizeStyles.paddingHorizontal}
        >
          <Text
            color={selectedLabels ? '$neutral900' : '$neutral400'}
            fontSize={sizeStyles.fontSize}
            flex={1}
            numberOfLines={1}
          >
            {selectedLabels || placeholder}
          </Text>
          <XStack gap={4} alignItems="center">
            {isClearable && value && (Array.isArray(value) ? value.length > 0 : value !== '') && (
              <Text
                role="button"
                aria-label="Clear selection"
                color="$neutral500"
                fontSize={14}
                onPress={handleClear}
              >
                ×
              </Text>
            )}
            <Text color="$neutral500" fontSize={10}>
              {isOpen ? '▲' : '▼'}
            </Text>
          </XStack>
        </SelectTrigger>

        {isOpen && (
          <Dropdown ref={listRef} role={'listbox' as any} aria-multiselectable={isMulti}>
            {isSearchable && (
              <XStack borderBottomWidth={1} borderBottomColor="$neutral200" padding={4}>
                <XStack
                  flex={1}
                  padding={8}
                  backgroundColor="transparent"
                >
                  <Text
                    fontSize={14}
                    color="$neutral500"
                    onPress={() => {}}
                  >
                    Search...
                  </Text>
                </XStack>
              </XStack>
            )}
            {filteredOptions.length === 0 ? (
              <OptionItem>
                <Text color="$neutral400">No options found</Text>
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
                    <Text fontSize={sizeStyles.fontSize} color="$neutral800">
                      {option.label}
                    </Text>
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
