import { styled, Input as TInput, type InputProps as TInputProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'
import { Platform } from 'react-native'
import { XStack } from 'tamagui'

export interface InputProps extends TInputProps {
  /** Input variant */
  variant?: 'outlined' | 'filled' | 'underlined'
  /** Input size */
  size?: 'sm' | 'md' | 'lg'
  /** Icon to show on the left side of the input */
  leftIcon?: ReactNode
  /** Icon to show on the right side of the input */
  rightIcon?: ReactNode
  /** Whether the input is in an error state */
  error?: boolean
  /** Whether the input is disabled */
  isDisabled?: boolean
  /** Whether the input is read-only */
  isReadOnly?: boolean
  /** Placeholder text */
  placeholder?: string
}

const sizeMap = {
  sm: { height: 32, fontSize: 14, px: 8 },
  md: { height: 40, fontSize: 16, px: 12 },
  lg: { height: 48, fontSize: 18, px: 16 },
}

const StyledInput = styled(TInput, {
  name: 'Input',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$md',
  backgroundColor: '$background',
  color: '$textPrimary',
  outlineStyle: 'none',
  width: '100%',

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

const InputContainer = styled(XStack, {
  name: 'InputContainer',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
})

/** A text input component with support for variants, icons, and error states. */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'outlined',
      size = 'md',
      leftIcon,
      rightIcon,
      error = false,
      isDisabled = false,
      isReadOnly = false,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const s = sizeMap[size]

    let variantStyle: Record<string, any> = {
      borderColor: error ? '$error' : '$border',
      backgroundColor: '$background',
    }

    if (variant === 'filled') {
      variantStyle = {
        ...variantStyle,
        backgroundColor: '$gray100',
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
      }
    } else if (variant === 'underlined') {
      variantStyle = {
        ...variantStyle,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderRadius: 0,
      }
    }

    return (
      <InputContainer>
        {leftIcon && (
          <XStack
            position="absolute"
            left={8}
            zIndex="$docked"
            opacity={isDisabled ? 0.6 : 1}
            pointerEvents="none"
          >
            {leftIcon}
          </XStack>
        )}
        <StyledInput
          ref={ref}
          disabled={isDisabled}
          readOnly={isReadOnly}
          placeholder={placeholder}
          aria-invalid={error}
          aria-disabled={isDisabled}
          aria-readonly={isReadOnly}
          paddingLeft={leftIcon ? 36 : s.px}
          paddingRight={rightIcon ? 36 : s.px}
          height={s.height}
          fontSize={s.fontSize}
          {...variantStyle}
          {...rest}
        />
        {rightIcon && (
          <XStack
            position="absolute"
            right={8}
            zIndex="$docked"
            opacity={isDisabled ? 0.6 : 1}
            pointerEvents="none"
          >
            {rightIcon}
          </XStack>
        )}
      </InputContainer>
    )
  }
)

Input.displayName = 'Input'
