import { styled, YStack, type StackProps } from 'tamagui'
import { forwardRef, useId } from 'react'
import { Platform } from 'react-native'
import { FormLabel } from './FormLabel'
import { FormErrorMessage } from './FormErrorMessage'
import { FormHelperText } from './FormHelperText'

export interface FormControlProps extends StackProps {
  /** Whether the field is in an invalid state */
  isInvalid?: boolean
  /** Whether the field is required */
  isRequired?: boolean
  /** Whether the field is disabled */
  isDisabled?: boolean
  /** Label text for the field */
  label?: string
  /** Error message to display */
  errorMessage?: string
  /** Helper text to display */
  helperText?: string
  /** The form field content */
  children?: React.ReactNode
}

/** A form field wrapper that provides label, error message, and helper text. */
export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  (
    {
      isInvalid = false,
      isRequired = false,
      isDisabled = false,
      label,
      errorMessage,
      helperText,
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const fieldId = useId()

    const renderChildren = () => {
      if (!children) return null
      if (typeof children === 'object' && 'type' in (children as any)) {
        const child = children as React.ReactElement
        return child
      }
      return children
    }

    return (
      <YStack
        ref={ref}
        space="$xs"
        role="group"
        aria-invalid={isInvalid}
        aria-required={isRequired}
        aria-disabled={isDisabled}
        {...rest}
      >
        {label && (
          <FormLabel htmlFor={fieldId} isRequired={isRequired}>
            {label}
          </FormLabel>
        )}
        {children}
        {isInvalid && errorMessage && (
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        )}
        {!isInvalid && helperText && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </YStack>
    )
  }
)

FormControl.displayName = 'FormControl'
