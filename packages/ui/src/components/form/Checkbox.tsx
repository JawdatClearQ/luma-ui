import { styled, XStack, Text, type StackProps } from 'tamagui'
import { forwardRef, useCallback, useEffect } from 'react'
import { Platform } from 'react-native'
import { useAnimationState } from 'tamagui'

export interface CheckboxProps extends StackProps {
  /** Whether the checkbox is checked */
  isChecked?: boolean
  /** Change handler */
  onChange?: (checked: boolean) => void
  /** Whether the checkbox is in an indeterminate state */
  isIndeterminate?: boolean
  /** Whether the checkbox is disabled */
  isDisabled?: boolean
  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg'
  /** Color scheme for the checkbox */
  colorScheme?: string
  /** Label text for the checkbox */
  label?: string
}

const getBoxSize = (size: string = 'md') => {
  switch (size) {
    case 'sm':
      return { width: 16, height: 16, borderRadius: 3, checkSize: 10 }
    case 'lg':
      return { width: 24, height: 24, borderRadius: 5, checkSize: 16 }
    default:
      return { width: 20, height: 20, borderRadius: 4, checkSize: 13 }
  }
}

const CheckboxBox = styled(XStack, {
  name: 'CheckboxBox',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: '$border',
  backgroundColor: '$background',
  cursor: 'pointer',
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

const CheckMark = styled(Text, {
  name: 'CheckMark',
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  userSelect: 'none',
})

/** An animated checkbox component with indeterminate state support. */
export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      isChecked = false,
      onChange,
      isIndeterminate = false,
      isDisabled = false,
      size = 'md',
      colorScheme,
      label,
      style,
      ...rest
    },
    ref
  ) => {
    const boxSize = getBoxSize(size)
    const animationState = useAnimationState({
      checked: {
        opacity: 1,
        scale: 1,
      },
      unchecked: {
        opacity: 0,
        scale: 0,
      },
    })

    useEffect(() => {
      if (isChecked || isIndeterminate) {
        animationState.current = 'checked'
      } else {
        animationState.current = 'unchecked'
      }
    }, [isChecked, isIndeterminate, animationState])

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
        role="checkbox"
        aria-checked={isIndeterminate ? 'mixed' : isChecked}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        onPress={handlePress}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <CheckboxBox
          checked={isChecked && !isIndeterminate}
          indeterminate={isIndeterminate}
          disabled={isDisabled}
          animation="fast"
          width={boxSize.width}
          height={boxSize.height}
          borderRadius={boxSize.borderRadius as any}
        >
          {isIndeterminate ? (
            <XStack
              width={boxSize.width * 0.6}
              height={2}
              backgroundColor="white"
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

Checkbox.displayName = 'Checkbox'
