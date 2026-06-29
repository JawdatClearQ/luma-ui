"use client";

import { styled, XStack, Text, type XStackProps } from 'tamagui'
import { forwardRef, useCallback } from 'react'

export interface CheckboxProps extends Omit<XStackProps, 'onChange'> {
  isChecked?: boolean
  onChange?: (checked: boolean) => void
  isIndeterminate?: boolean
  isDisabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  colorScheme?: string
  label?: string
}

const getBoxSize = (size: string = 'md') => {
  switch (size) {
    case 'sm':
      return { width: 16, height: 16, borderRadius: 4, checkSize: 10 }
    case 'lg':
      return { width: 24, height: 24, borderRadius: 6, checkSize: 16 }
    default:
      return { width: 20, height: 20, borderRadius: 4, checkSize: 13 }
  }
}

const CheckboxBox = styled(XStack, {
  name: 'CheckboxBox',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: '$neutral300',
  backgroundColor: '$white',
  flexShrink: 0,

  variants: {
    checked: {
      true: {
        backgroundColor: '$primary500',
        borderColor: '$primary500',
      },
    },
    indeterminate: {
      true: {
        backgroundColor: '$primary500',
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
        borderColor: '$error400',
      },
    },
  } as const,
})

const CheckMark = styled(Text, {
  name: 'CheckMark',
  color: '$white',
  fontWeight: 'bold',
  textAlign: 'center',
  userSelect: 'none',
})

export const Checkbox = forwardRef<any, CheckboxProps>(
  (
    {
      isChecked = false,
      onChange,
      isIndeterminate = false,
      isDisabled = false,
      size = 'md',
      colorScheme,
      label,
      ...rest
    },
    ref
  ) => {
    const boxSize = getBoxSize(size)

    const handlePress = useCallback(() => {
      if (!isDisabled) {
        onChange?.(!isChecked)
      }
    }, [isDisabled, isChecked, onChange])

    return (
      <XStack
        ref={ref}
        alignItems="center"
        gap={8}
        role="checkbox"
        aria-checked={isIndeterminate ? 'mixed' : isChecked}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        opacity={isDisabled ? 0.5 : 1}
        onPress={handlePress}
        {...rest}
      >
        <CheckboxBox
          checked={isChecked && !isIndeterminate}
          indeterminate={isIndeterminate}
          disabled={isDisabled}
          width={boxSize.width}
          height={boxSize.height}
          borderRadius={boxSize.borderRadius as any}
        >
          {isIndeterminate ? (
            <XStack
              width={boxSize.width * 0.6}
              height={2}
              backgroundColor="$white"
              borderRadius={1}
            />
          ) : (
            isChecked && (
              <CheckMark fontSize={boxSize.checkSize} lineHeight={boxSize.height}>
                ✓
              </CheckMark>
            )
          )}
        </CheckboxBox>
        {label && (
          <Text
            userSelect="none"
            color="$neutral800"
            opacity={isDisabled ? 0.5 : 1}
            fontSize={size === 'sm' ? 14 : size === 'lg' ? 17 : 15}
          >
            {label}
          </Text>
        )}
      </XStack>
    )
  }
)

Checkbox.displayName = 'Checkbox'
