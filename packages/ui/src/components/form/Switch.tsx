"use client";

import { styled, XStack, Text, type XStackProps } from 'tamagui'
import { forwardRef, useCallback } from 'react'

export interface SwitchProps extends Omit<XStackProps, 'onChange'> {
  isChecked?: boolean
  onChange?: (checked: boolean) => void
  isDisabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  colorScheme?: string
  label?: string
}

const getSwitchSize = (size: string = 'md') => {
  switch (size) {
    case 'sm':
      return { trackWidth: 36, trackHeight: 20, thumbSize: 16, thumbOffset: 2 }
    case 'lg':
      return { trackWidth: 56, trackHeight: 32, thumbSize: 28, thumbOffset: 2 }
    default:
      return { trackWidth: 44, trackHeight: 24, thumbSize: 20, thumbOffset: 2 }
  }
}

const Track = styled(XStack, {
  name: 'SwitchTrack',
  borderRadius: 9999,
  backgroundColor: '$neutral300',
  alignItems: 'center',
  position: 'relative',

  variants: {
    checked: {
      true: {
        backgroundColor: '$primary500',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
})

const Thumb = styled(XStack, {
  name: 'SwitchThumb',
  borderRadius: 9999,
  backgroundColor: '$white',
  position: 'absolute',
  elevation: 2,
})

export const Switch = forwardRef<any, SwitchProps>(
  (
    {
      isChecked = false,
      onChange,
      isDisabled = false,
      size = 'md',
      colorScheme,
      label,
      ...rest
    },
    ref
  ) => {
    const switchSize = getSwitchSize(size)
    const thumbTranslateX = isChecked
      ? switchSize.trackWidth - switchSize.thumbSize - switchSize.thumbOffset
      : switchSize.thumbOffset

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
        role="switch"
        aria-checked={isChecked}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        opacity={isDisabled ? 0.5 : 1}
        onPress={handlePress}
        {...rest}
      >
        <Track
          checked={isChecked}
          disabled={isDisabled}
          width={switchSize.trackWidth}
          height={switchSize.trackHeight}
          onPress={handlePress}
        >
          <Thumb
            width={switchSize.thumbSize}
            height={switchSize.thumbSize}
            left={thumbTranslateX}
          />
        </Track>
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

Switch.displayName = 'Switch'
