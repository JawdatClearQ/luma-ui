import { styled, Text, type TextProps } from 'tamagui'
import { forwardRef } from 'react'
import { Platform } from 'react-native'

export interface FormErrorMessageProps extends TextProps {
  /** Error message size */
  size?: 'sm' | 'md' | 'lg'
}

/** A form error message component that renders with error color. */
export const FormErrorMessage = forwardRef<HTMLParagraphElement, FormErrorMessageProps>(
  (
    {
      size = 'sm',
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const fontSize = size === 'sm' ? 12 : size === 'lg' ? 15 : 13

    return (
      <Text
        ref={ref}
        fontSize={fontSize}
        color="$error"
        role="alert"
        aria-live="polite"
        {...rest}
      >
        {children}
      </Text>
    )
  }
)

FormErrorMessage.displayName = 'FormErrorMessage'
