import { styled, XStack, Text, type StackProps } from 'tamagui'
import { forwardRef, useCallback } from 'react'
import { Platform } from 'react-native'

export interface SwitchProps extends StackProps {
  /** Whether the switch is on */
  isChecked?: boolean
  /** Change handler */
  onChange?: (checked: boolean) => void
  /** Whether the switch is disabled */
  isDisabled?: boolean
  /** Switch size */
  size?: 'sm' | 'md' | 'lg'
  /** Color scheme for the switch when active */
  colorScheme?: string
  /** Label text for the switch */
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
  backgroundColor: '$gray300',
  cursor: 'pointer',
  alignItems: 'center',
  position: 'relative',
  transition: 'background-color 0.2s ease',

  variants: {
    checked: {
      true: {
        backgroundColor: '$primary500',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  } as const,
})

const Thumb = styled(XStack, {
  name: 'SwitchThumb',
  borderRadius: 9999,
  backgroundColor: 'white',
  position: 'absolute',
  elevation: 2,
  transition: 'transform 0.2s ease',

  variants: {
    checked: {
      true: {
        transform: [{ translateX: 0 }],
      },
    },
  } as const,
})

/** A toggle switch component with smooth animation and label support. */
export const Switch = forwardRef<HTMLDivElement, SwitchProps>(
  (
    {
      isChecked = false,
      onChange,
      isDisabled = false,
      size = 'md',
      colorScheme,
      label,
      style,
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

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          handlePress()
        }
      },
      [handlePress]
    )

    return (
      <XStack
        ref={ref}
        alignItems="center"
        space="$sm"
        role="switch"
        aria-checked={isChecked}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        onPress={handlePress}
        onKeyDown={handleKeyDown}
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
            checked={isChecked}
            width={switchSize.thumbSize}
            height={switchSize.thumbSize}
            left={thumbTranslateX}
          />
        </Track>
        {label && (
          <Text
            userSelect="none"
            color="$textPrimary"
            opacity={isDisabled ? 0.5 : 1}
            fontSize={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
          >
            {label}
          </Text>
        )}
      </XStack>
    )
  }
)

Switch.displayName = 'Switch'
