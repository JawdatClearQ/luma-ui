import { styled, Text, type TextProps } from 'tamagui'
import { forwardRef } from 'react'
import { Platform } from 'react-native'
import { XStack } from 'tamagui'

export interface FormLabelProps extends TextProps {
  /** ID of the element this label is for */
  htmlFor?: string
  /** Whether the field is required (shows asterisk) */
  isRequired?: boolean
  /** Label size */
  size?: 'sm' | 'md' | 'lg'
}

const RequiredIndicator = styled(Text, {
  name: 'RequiredIndicator',
  color: '$error',
  marginLeft: 2,
})

/** An accessible form label component with required indicator support. */
export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  (
    {
      htmlFor,
      isRequired = false,
      size = 'md',
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const fontSize = size === 'sm' ? 13 : size === 'lg' ? 17 : 15

    return (
      <XStack
        ref={ref}
        as="label"
        htmlFor={htmlFor}
        alignItems="center"
        {...rest}
      >
        <Text
          fontSize={fontSize}
          fontWeight="500"
          color="$textPrimary"
          userSelect="none"
          aria-required={isRequired}
        >
          {children}
        </Text>
        {isRequired && (
          <RequiredIndicator
            fontSize={fontSize}
            fontWeight="500"
            aria-label="required"
          >
            *
          </RequiredIndicator>
        )}
      </XStack>
    )
  }
)

FormLabel.displayName = 'FormLabel'
