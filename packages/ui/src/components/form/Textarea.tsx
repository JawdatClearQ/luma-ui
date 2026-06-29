"use client";

import { styled, TextArea as TTextArea, type TextAreaProps } from 'tamagui'
import { forwardRef } from 'react'

export interface TextareaProps extends TextAreaProps {
  variant?: 'outline' | 'filled' | 'underlined'
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  resize?: 'none' | 'vertical' | 'horizontal'
  minRows?: number
  maxRows?: number
  placeholder?: string
}

const StyledTextarea = styled(TTextArea, {
  name: 'Textarea',
  borderWidth: 1.5,
  borderColor: '$neutral300',
  borderRadius: 8,
  backgroundColor: '$white',
  color: '$neutral900',
  outlineStyle: 'none',
  width: '100%',
  textAlignVertical: 'top',
  fontSize: 15,
  paddingHorizontal: 16,
  paddingVertical: 12,

  hoverStyle: {
    borderColor: '$primary400',
  },

  focusStyle: {
    borderColor: '$primary400',
    borderWidth: 2,
    outlineStyle: 'none',
  },

  variants: {
    size: {
      sm: { fontSize: 13, paddingHorizontal: 12, paddingVertical: 8 },
      md: { fontSize: 15, paddingHorizontal: 16, paddingVertical: 12 },
      lg: { fontSize: 17, paddingHorizontal: 20, paddingVertical: 16 },
    },
    variant: {
      outline: {
        backgroundColor: 'transparent',
        borderColor: '$neutral300',
        focusStyle: {
          borderColor: '$primary400',
          borderWidth: 2,
        },
      },
      filled: {
        backgroundColor: '$neutral50',
        borderColor: 'transparent',
        focusStyle: {
          backgroundColor: '$white',
          borderColor: '$primary400',
        },
      },
      underlined: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 1.5,
        borderColor: '$neutral300',
        paddingHorizontal: 4,
        paddingVertical: 8,
        focusStyle: {
          borderBottomColor: '$primary400',
          borderBottomWidth: 2,
        },
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        backgroundColor: '$neutral50',
        cursor: 'not-allowed',
      },
    },
  } as const,
  defaultVariants: { size: 'md', variant: 'outline' },
})

export const Textarea = forwardRef<any, TextareaProps>(
  (
    {
      variant = 'outline',
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
        onChange={onChange}
        value={value}
        size={size}
        variant={variant}
        borderColor={error ? '$error400' : undefined}
        {...rest}
      />
    )
  }
)

Textarea.displayName = 'Textarea'
