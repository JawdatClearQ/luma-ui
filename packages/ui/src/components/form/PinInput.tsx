import { styled, XStack, type StackProps, Input as TInput } from 'tamagui'
import { forwardRef, useCallback, useRef, createRef, useEffect, useImperativeHandle } from 'react'
import { Platform } from 'react-native'

export interface PinInputProps extends StackProps {
  /** Number of input fields */
  length?: number
  /** Current value (concatenated string) */
  value?: string
  /** Change handler */
  onChange?: (value: string) => void
  /** Input type */
  type?: 'numeric' | 'alphanumeric'
  /** Input size */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the input is disabled */
  isDisabled?: boolean
  /** Whether to mask the input (show dots instead of characters) */
  mask?: boolean
  /** Whether the input is in an error state */
  error?: boolean
}

const getSizeStyles = (size: string = 'md') => {
  switch (size) {
    case 'sm':
      return { width: 36, height: 40, fontSize: 18 }
    case 'lg':
      return { width: 52, height: 56, fontSize: 24 }
    default:
      return { width: 44, height: 48, fontSize: 20 }
  }
}

const PinCell = styled(TInput, {
  name: 'PinCell',
  textAlign: 'center',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$md',
  backgroundColor: '$background',
  color: '$textPrimary',
  outlineStyle: 'none',

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
    error: {
      true: {
        borderColor: '$error',
      },
    },
    filled: {
      true: {
        borderColor: '$primary300',
      },
    },
  } as const,
})

/** A PIN/OTP input component with auto-focus and mask support. */
export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(
  (
    {
      length = 4,
      value = '',
      onChange,
      type = 'numeric',
      size = 'md',
      isDisabled = false,
      mask = false,
      error = false,
      style,
      ...rest
    },
    ref
  ) => {
    const inputRefs = useRef<React.RefObject<HTMLInputElement>[]>(
      Array.from({ length }, () => createRef<HTMLInputElement>())
    )
    const sizeStyles = getSizeStyles(size)
    const inputMode = type === 'numeric' ? 'numeric' as const : 'text' as const
    const pattern = type === 'numeric' ? '[0-9]*' : undefined

    const focusInput = useCallback((index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.current?.focus()
      }
    }, [length])

    const handleChange = useCallback(
      (text: string, index: number) => {
        const chars = value.split('')
        // Only take the last character entered (or the first if pasting)
        const lastChar = text.slice(-1)
        if (type === 'numeric' && !/^[0-9]$/.test(lastChar) && lastChar !== '') return
        if (type === 'alphanumeric' && !/^[a-zA-Z0-9]$/.test(lastChar) && lastChar !== '') return

        chars[index] = lastChar
        const newValue = chars.join('')
        onChange?.(newValue)

        // Auto-focus next
        if (lastChar !== '' && index < length - 1) {
          focusInput(index + 1)
        }
      },
      [value, onChange, type, length, focusInput]
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Backspace') {
          if (value[index] === '' || value[index] === undefined) {
            // If current is empty, go back and clear previous
            if (index > 0) {
              const chars = value.split('')
              chars[index - 1] = ''
              onChange?.(chars.join(''))
              focusInput(index - 1)
            }
          } else {
            const chars = value.split('')
            chars[index] = ''
            onChange?.(chars.join(''))
          }
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          focusInput(index - 1)
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          focusInput(index + 1)
        }
      },
      [value, onChange, focusInput]
    )

    const handlePaste = useCallback(
      (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('text').slice(0, length)
        if (type === 'numeric' && !/^[0-9]+$/.test(pasted)) return
        if (type === 'alphanumeric' && !/^[a-zA-Z0-9]+$/.test(pasted)) return
        const chars = value.split('')
        for (let i = 0; i < pasted.length && i < length; i++) {
          chars[i] = pasted[i]
        }
        onChange?.(chars.join(''))
        focusInput(Math.min(pasted.length, length - 1))
      },
      [length, type, value, onChange, focusInput]
    )

    return (
      <XStack
        ref={ref}
        space="$sm"
        role="group"
        aria-label={`Please enter your ${type === 'numeric' ? 'numeric' : ''} code`}
        {...rest}
      >
        {Array.from({ length }, (_, index) => {
          const char = value[index] || ''
          return (
            <PinCell
              key={index}
              ref={inputRefs.current[index]}
              value={mask && char ? '•' : char}
              onChangeText={(text) => handleChange(text, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isDisabled}
              error={error}
              filled={!!char}
              width={sizeStyles.width}
              height={sizeStyles.height}
              fontSize={sizeStyles.fontSize}
              inputMode={inputMode}
              pattern={pattern}
              maxLength={1}
              autoComplete={type === 'numeric' ? 'one-time-code' : undefined}
              aria-label={`Digit ${index + 1}`}
            />
          )
        })}
      </XStack>
    )
  }
)

PinInput.displayName = 'PinInput'
