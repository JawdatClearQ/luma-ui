"use client";

import { styled, XStack, YStack, Text, type XStackProps } from 'tamagui'
import { forwardRef, useCallback } from 'react'

export interface RadioOption {
  label: string
  value: string
}

export interface RadioProps extends Omit<XStackProps, 'onChange' | 'direction'> {
  options: RadioOption[]
  name: string
  value?: string
  onChange?: (value: string) => void
  isDisabled?: boolean
  direction?: 'vertical' | 'horizontal'
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

export const Radio = forwardRef<any, RadioProps>(
  (
    {
      options,
      name,
      value,
      onChange,
      isDisabled = false,
      direction = 'vertical',
      size = 'md',
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

    const Container = direction === 'horizontal' ? XStack : YStack

    return (
      <Container
        ref={ref}
        role="radiogroup"
        aria-label={name}
        gap="$md"
        {...rest}
      >
        {options.map((option) => {
          const isSelected = value === option.value
          return (
            <XStack
              key={option.value}
              alignItems="center"
              gap="$sm"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isDisabled}
              aria-label={option.label}
              tabIndex={isDisabled ? -1 : 0}
              opacity={isDisabled ? 0.5 : 1}
              onPress={() => handlePress(option.value)}
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
