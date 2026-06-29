"use client";

import { YStack, Text, type YStackProps } from 'tamagui'
import { forwardRef, useId } from 'react'

export interface FormControlProps extends YStackProps {
  isInvalid?: boolean
  isRequired?: boolean
  isDisabled?: boolean
  label?: string
  errorMessage?: string
  helperText?: string
  children?: React.ReactNode
}

export const FormControl = forwardRef<any, FormControlProps>(
  (
    {
      isInvalid = false,
      isRequired = false,
      isDisabled = false,
      label,
      errorMessage,
      helperText,
      children,
      ...rest
    },
    ref
  ) => {
    const fieldId = useId()

    return (
      <YStack
        ref={ref}
        gap="$xs"
        role="group"
        aria-invalid={isInvalid}
        aria-required={isRequired}
        aria-disabled={isDisabled}
        {...rest}
      >
        {label && (
          <YStack flexDirection="row" alignItems="center" gap={4}>
            <Text fontSize={14} fontWeight="500" color="$textPrimary">
              {label}
            </Text>
            {isRequired && (
              <Text fontSize={14} fontWeight="500" color="$error" marginLeft={2}>
                *
              </Text>
            )}
          </YStack>
        )}
        {children}
        {isInvalid && errorMessage && (
          <Text fontSize={12} color="$error" marginTop={2}>
            {errorMessage}
          </Text>
        )}
        {!isInvalid && helperText && (
          <Text fontSize={12} color="$textSecondary" marginTop={2}>
            {helperText}
          </Text>
        )}
      </YStack>
    )
  }
)

FormControl.displayName = 'FormControl'
