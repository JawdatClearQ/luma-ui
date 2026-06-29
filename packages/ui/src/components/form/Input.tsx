"use client";

import React, { forwardRef } from 'react';
import { Input as TamaguiInput, styled, InputProps as TamaguiInputProps } from 'tamagui';

export interface InputProps extends TamaguiInputProps {
  placeholder?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'unstyled';
}

const StyledInput = styled(TamaguiInput, {
  name: 'LumaInput',
  variants: {
    size: {
      sm: { height: 32, fontSize: '$sm', px: '$2' },
      md: { height: 40, fontSize: '$md', px: '$3' },
      lg: { height: 48, fontSize: '$lg', px: '$4' },
    },
    variant: {
      outline: {
        borderWidth: 1,
        borderColor: '$gray8',
        backgroundColor: 'transparent',
        focusStyle: { borderColor: '$blue10', borderWidth: 2 },
      },
      filled: {
        borderWidth: 0,
        backgroundColor: '$gray5',
        focusStyle: { backgroundColor: '$gray6' },
      },
      unstyled: {
        borderWidth: 0,
        backgroundColor: 'transparent',
      },
    },
  } as const,
  defaultVariants: { size: 'md', variant: 'outline' },
});

export const Input = forwardRef<any, InputProps>(
  ({ placeholder, isInvalid, isDisabled, size = 'md', variant = 'outline', ...rest }, ref) => {
    const { dangerouslySetInnerHTML, ...safeProps } = rest as any;
    return (
      <StyledInput
        ref={ref}
        placeholder={placeholder}
        size={size}
        variant={variant}
        disabled={isDisabled}
        borderColor={isInvalid ? '$red10' : undefined}
        opacity={isDisabled ? 0.5 : 1}
        {...safeProps}
      />
    );
  }
);
Input.displayName = 'LumaInput';
