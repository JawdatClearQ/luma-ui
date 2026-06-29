"use client";

import { styled, TextArea as TTextArea, type TextAreaProps } from 'tamagui'
import { forwardRef } from 'react'

export interface TextareaProps extends TextAreaProps {
  variant?: 'outlined' | 'filled' | 'underlined'
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  resize?: 'none' | 'vertical' | 'horizontal'
  minRows?: number
  maxRows?: number
  placeholder?: string
}

const getSizeStyles = (size: string = 'md') => {
  switch (size) {
    case 'sm':
      return { fontSize: 14, paddingHorizontal: 8, paddingVertical: 6 }
    case 'lg':
      return { fontSize: 18, paddingHorizontal: 16, paddingVertical: 12 }
    default:
      return { fontSize: 16, paddingHorizontal: 12, paddingVertical: 10 }
  }
}

const StyledTextarea = styled(TTextArea, {
  name: 'Textarea',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$md',
  backgroundColor: '$background',
  color: '$textPrimary',
  outlineStyle: 'none',
  width: '100%',
  textAlignVertical: 'top',

  hoverStyle: {
    borderColor: '$primary500',
  },

  focusStyle: {
    borderColor: '$primary500',
    outlineStyle: 'none',
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.6,
        backgroundColor: '$gray100',
        cursor: 'not-allowed',
      },
    },
  } as const,
})

export const Textarea = forwardRef<any, TextareaProps>(
  (
    {
      variant = 'outlined',
      size = 'md',
      error = false,
      isDisabled = false,
      isReadOnly = false,
      resize = 'vertical',
      minRows = 3,
      maxRows = 10,
      placeholder,
      onChange,
      value,
      ...rest
    },
    ref
  ) => {
    const sizeStyles = getSizeStyles(size)
    const variantStyles: any = { borderWidth: 1, borderColor: error ? '$error' : '$border', backgroundColor: '$background' }

    if (variant === 'filled') {
      variantStyles.backgroundColor = '$gray100'
      variantStyles.borderLeftWidth = 0
      variantStyles.borderRightWidth = 0
      variantStyles.borderTopWidth = 0
    } else if (variant === 'underlined') {
      variantStyles.borderWidth = 0
      variantStyles.borderBottomWidth = 2
      variantStyles.borderRadius = 0
    }

    return (
      <StyledTextarea
        ref={ref}
        disabled={isDisabled}
        readOnly={isReadOnly}
        placeholder={placeholder}
        multiline
        numberOfLines={minRows}
        aria-invalid={error}
        aria-disabled={isDisabled}
        aria-readonly={isReadOnly}
        aria-placeholder={placeholder}
        onChange={(e) => {
          onChange?.(e)
        }}
        value={value}
        fontSize={sizeStyles.fontSize}
        paddingHorizontal={sizeStyles.paddingHorizontal}
        paddingVertical={sizeStyles.paddingVertical}
        borderColor={variantStyles.borderColor}
        backgroundColor={variantStyles.backgroundColor}
        borderBottomWidth={variantStyles.borderBottomWidth}
        borderLeftWidth={variantStyles.borderLeftWidth}
        borderRightWidth={variantStyles.borderRightWidth}
        borderTopWidth={variantStyles.borderTopWidth}
        borderRadius={variantStyles.borderRadius}
        {...rest}
      />
    )
  }
)

Textarea.displayName = 'Textarea'
