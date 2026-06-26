import { styled, Text, type TextProps } from 'tamagui'
import { forwardRef } from 'react'
import { Platform } from 'react-native'

export interface FormHelperTextProps extends TextProps {
  /** Helper text size */
  size?: 'sm' | 'md' | 'lg'
}

/** A form helper text component that renders with secondary text color. */
export const FormHelperText = forwardRef<HTMLParagraphElement, FormHelperTextProps>(
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
        color="$textSecondary"
        role="note"
        {...rest}
      >
        {children}
      </Text>
    )
  }
)

FormHelperText.displayName = 'FormHelperText'
