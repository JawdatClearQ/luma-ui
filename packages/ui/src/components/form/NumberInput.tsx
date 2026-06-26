import { styled, XStack, Text, type StackProps, Button } from 'tamagui'
import { forwardRef, useCallback } from 'react'
import { Platform } from 'react-native'
import { Input } from './Input'
import { clamp } from '../../utils'

export interface NumberInputProps extends StackProps {
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Current value */
  value?: number
  /** Change handler */
  onChange?: (value: number) => void
  /** Input size */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the input is disabled */
  isDisabled?: boolean
  /** Whether to show stepper buttons */
  showStepper?: boolean
  /** Whether the input is in an error state */
  error?: boolean
  /** Placeholder text */
  placeholder?: string
}

const StepperButton = styled(Button, {
  name: 'NumberInputStepper',
  width: 32,
  height: '100%',
  padding: 0,
  borderRadius: 0,
  backgroundColor: '$gray50',
  borderWidth: 1,
  borderColor: '$border',
  cursor: 'pointer',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: 0,

  hoverStyle: {
    backgroundColor: '$gray100',
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  } as const,
})

const StepperContainer = styled(XStack, {
  name: 'StepperContainer',
  flexDirection: 'column',
  height: '100%',
  borderLeftWidth: 1,
  borderLeftColor: '$border',
})

/** A number input component with +/- stepper buttons. */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      min = -Infinity,
      max = Infinity,
      step = 1,
      value = 0,
      onChange,
      size = 'md',
      isDisabled = false,
      showStepper = true,
      error = false,
      placeholder,
      style,
      ...rest
    },
    ref
  ) => {
    const handleStep = useCallback(
      (direction: 'up' | 'down') => {
        if (isDisabled) return
        const newVal = direction === 'up' ? value + step : value - step
        onChange?.(clamp(newVal, min, max))
      },
      [isDisabled, value, step, min, max, onChange]
    )

    const handleChange = useCallback(
      (text: string) => {
        const parsed = parseFloat(text)
        if (!isNaN(parsed)) {
          onChange?.(clamp(parsed, min, max))
        } else if (text === '') {
          onChange?.(min === -Infinity ? 0 : min)
        }
      },
      [min, max, onChange]
    )

    return (
      <XStack
        alignItems="center"
        width="100%"
        role="group"
        aria-label="Number input"
        {...rest}
      >
        <Input
          ref={ref}
          type="number"
          value={String(value)}
          onChangeText={handleChange}
          size={size}
          isDisabled={isDisabled}
          error={error}
          placeholder={placeholder}
          aria-valuemin={min === -Infinity ? undefined : min}
          aria-valuemax={max === Infinity ? undefined : max}
          aria-valuenow={value}
          flex={1}
          borderTopRightRadius={showStepper ? 0 : undefined}
          borderBottomRightRadius={showStepper ? 0 : undefined}
        />
        {showStepper && (
          <StepperContainer>
            <StepperButton
              disabled={isDisabled || value >= max}
              onPress={() => handleStep('up')}
              aria-label="Increment value"
              borderTopLeftRadius={0}
              borderTopRightRadius="$md"
              borderBottomWidth={0}
              borderLeftWidth={0}
              flex={1}
            >
              <Text fontSize={12} fontWeight="bold" color="$textSecondary" selectable={false}>
                ▲
              </Text>
            </StepperButton>
            <StepperButton
              disabled={isDisabled || value <= min}
              onPress={() => handleStep('down')}
              aria-label="Decrement value"
              borderBottomLeftRadius={0}
              borderBottomRightRadius="$md"
              borderLeftWidth={0}
              flex={1}
            >
              <Text fontSize={12} fontWeight="bold" color="$textSecondary" selectable={false}>
                ▼
              </Text>
            </StepperButton>
          </StepperContainer>
        )}
      </XStack>
    )
  }
)

NumberInput.displayName = 'NumberInput'
