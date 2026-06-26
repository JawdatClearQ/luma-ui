import { styled, XStack, YStack, Text, type StackProps } from 'tamagui'
import { forwardRef, useCallback } from 'react'
import { Platform } from 'react-native'

export interface RadioOption {
  label: string
  value: string
}

export interface RadioProps extends StackProps {
  /** Array of radio options */
  options: RadioOption[]
  /** Name attribute for the radio group */
  name: string
  /** Currently selected value */
  value?: string
  /** Change handler */
  onChange?: (value: string) => void
  /** Whether the radio group is disabled */
  isDisabled?: boolean
  /** Layout direction */
  direction?: 'vertical' | 'horizontal'
  /** Radio size */
  size?: 'sm' | 'md' | 'lg'
}

const getRadioSize = (size: string = 'md') => {
  switch (size) {
    case 'sm':
      return { outer: 16, inner: 8, fontSize: 14 }
    case 'lg':
      return { outer: 24, inner: 12, fontSize: 18 }
    default:
      return { outer: 20, inner: 10, fontSize: 16 }
  }
}

const RadioOuter = styled(XStack, {
  name: 'RadioOuter',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: '$border',
  borderRadius: 9999,
  backgroundColor: '$background',
  cursor: 'pointer',
  flexShrink: 0,

  variants: {
    selected: {
      true: {
        borderColor: '$primary500',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    error: {
      true: {
        borderColor: '$error',
      },
    },
  } as const,
})

const RadioInner = styled(XStack, {
  name: 'RadioInner',
  borderRadius: 9999,
  backgroundColor: '$primary500',

  variants: {
    disabled: {
      true: {
        backgroundColor: '$gray400',
      },
    },
  } as const,
})

/** A radio button group component with vertical and horizontal layouts. */
export const Radio = forwardRef<HTMLDivElement, RadioProps>(
  (
    {
      options,
      name,
      value,
      onChange,
      isDisabled = false,
      direction = 'vertical',
      size = 'md',
      style,
      ...rest
    },
    ref
  ) => {
    const radioSize = getRadioSize(size)

    const handlePress = useCallback(
      (optionValue: string) => {
        if (!isDisabled) {
          onChange?.(optionValue)
        }
      },
      [isDisabled, onChange]
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, optionValue: string) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          handlePress(optionValue)
        }
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault()
          const currentIndex = options.findIndex((o) => o.value === optionValue)
          const nextIndex = (currentIndex + 1) % options.length
          onChange?.(options[nextIndex].value)
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault()
          const currentIndex = options.findIndex((o) => o.value === optionValue)
          const prevIndex = (currentIndex - 1 + options.length) % options.length
          onChange?.(options[prevIndex].value)
        }
      },
      [handlePress, options, onChange]
    )

    const Container = direction === 'horizontal' ? XStack : YStack

    return (
      <Container
        ref={ref}
        role="radiogroup"
        aria-label={name}
        space="$md"
        {...rest}
      >
        {options.map((option) => {
          const isSelected = value === option.value
          return (
            <XStack
              key={option.value}
              alignItems="center"
              space="$sm"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isDisabled}
              aria-label={option.label}
              tabIndex={isDisabled ? -1 : 0}
              cursor={isDisabled ? 'not-allowed' : 'pointer'}
              onPress={() => handlePress(option.value)}
              onKeyDown={(e) => handleKeyDown(e, option.value)}
            >
              <RadioOuter
                selected={isSelected}
                disabled={isDisabled}
                width={radioSize.outer}
                height={radioSize.outer}
              >
                {isSelected && (
                  <RadioInner
                    disabled={isDisabled}
                    width={radioSize.inner}
                    height={radioSize.inner}
                  />
                )}
              </RadioOuter>
              <Text
                userSelect="none"
                color="$textPrimary"
                opacity={isDisabled ? 0.5 : 1}
                fontSize={radioSize.fontSize}
              >
                {option.label}
              </Text>
            </XStack>
          )
        })}
      </Container>
    )
  }
)

Radio.displayName = 'Radio'
