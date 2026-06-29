"use client";

import { forwardRef } from 'react'
import { Input as TamaguiInput, styled, type InputProps as TamaguiInputProps } from 'tamagui'

export interface InputProps extends TamaguiInputProps {
  placeholder?: string
  isInvalid?: boolean
  isDisabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled' | 'unstyled' | 'underlined'
}

const StyledInput = styled(TamaguiInput, {
  name: 'LumaInput',
  height: 48,
  borderRadius: 8,
  borderWidth: 1.5,
  borderColor: '$neutral300',
  backgroundColor: '$white',
  color: '$neutral900',
  fontSize: 15,
  paddingHorizontal: 16,
  placeholderTextColor: '$neutral400',

  focusStyle: {
    borderColor: '$primary400',
    borderWidth: 2,
  },

  variants: {
    size: {
      sm: { height: 36, fontSize: 13, paddingHorizontal: 12 },
      md: { height: 48, fontSize: 15, paddingHorizontal: 16 },
      lg: { height: 56, fontSize: 17, paddingHorizontal: 20 },
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
      unstyled: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
      },
      underlined: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 1.5,
        borderColor: '$neutral300',
        paddingHorizontal: 4,
        focusStyle: {
          borderBottomColor: '$primary400',
          borderBottomWidth: 2,
        },
      },
    },
  } as const,
  defaultVariants: { size: 'md', variant: 'outline' },
})

export const Input = forwardRef<any, InputProps>(
  ({ placeholder, isInvalid, isDisabled, size = 'md', variant = 'outline', ...rest }, ref) => {
    const { dangerouslySetInnerHTML, ...safeProps } = rest as any
    return (
      <StyledInput
        ref={ref}
        placeholder={placeholder}
        size={size}
        variant={variant}
        disabled={isDisabled}
        borderColor={isInvalid ? '$error400' : undefined}
        opacity={isDisabled ? 0.5 : 1}
        {...safeProps}
      />
    )
  }
)
Input.displayName = 'LumaInput'
