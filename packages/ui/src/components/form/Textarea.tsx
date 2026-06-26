import { styled, TextArea as TTextArea, type TextAreaProps, type StackProps } from 'tamagui'
import { forwardRef, useCallback, useRef, useEffect } from 'react'
import { Platform } from 'react-native'

export interface TextareaProps extends TextAreaProps {
  /** Textarea variant */
  variant?: 'outlined' | 'filled' | 'underlined'
  /** Input size */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the textarea is in an error state */
  error?: boolean
  /** Whether the textarea is disabled */
  isDisabled?: boolean
  /** Whether the textarea is read-only */
  isReadOnly?: boolean
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal'
  /** Minimum number of visible rows */
  minRows?: number
  /** Maximum number of visible rows */
  maxRows?: number
  /** Placeholder text */
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

/** A multi-line text input component with auto-resize support. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      style,
      ...rest
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const resolvedRef = (ref || textareaRef) as React.RefObject<HTMLTextAreaElement>

    const autoResize = useCallback(() => {
      const el = resolvedRef.current
      if (!el || resize === 'none' || resize === 'horizontal') return
      el.style.height = 'auto'
      const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 20
      const minHeight = lineHeight * minRows
      const maxHeight = lineHeight * maxRows
      const scrollHeight = el.scrollHeight
      el.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`
    }, [minRows, maxRows, resize, resolvedRef])

    useEffect(() => {
      autoResize()
    }, [value, autoResize])

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
        ref={resolvedRef}
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
          autoResize()
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
