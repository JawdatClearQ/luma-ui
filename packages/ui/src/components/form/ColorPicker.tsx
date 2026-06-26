import { styled, XStack, YStack, Text, type StackProps } from 'tamagui'
import { forwardRef, useCallback, useState, useEffect } from 'react'
import { Platform } from 'react-native'

export interface ColorPickerProps extends StackProps {
  /** Current color value (hex string) */
  value?: string
  /** Change handler */
  onChange?: (color: string) => void
  /** Array of preset color swatches */
  presets?: string[]
  /** Component size */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the picker is disabled */
  isDisabled?: boolean
}

const getSwatchSize = (size: string = 'md') => {
  switch (size) {
    case 'sm':
      return { swatch: 24, fontSize: 12 }
    case 'lg':
      return { swatch: 40, fontSize: 16 }
    default:
      return { swatch: 32, fontSize: 14 }
  }
}

const Swatch = styled(XStack, {
  name: 'ColorSwatch',
  borderRadius: '$md',
  borderWidth: 2,
  borderColor: 'transparent',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    selected: {
      true: {
        borderColor: '$primary500',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  } as const,
})

const HexInput = styled('input', {
  name: 'ColorHexInput',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$md',
  padding: 8,
  fontSize: 14,
  fontFamily: 'monospace',
  backgroundColor: '$background',
  color: '$textPrimary',
  outlineStyle: 'none',
  width: 100,

  hoverStyle: {
    borderColor: '$primary500',
  },

  focusStyle: {
    borderColor: '$primary500',
    outlineStyle: 'none',
  },
})

const DEFAULT_PRESETS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#22c55e',
  '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6',
  '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#000000',
  '#ffffff', '#6b7280', '#9ca3af', '#d1d5db', '#374151',
]

/** A color picker component with preset swatches and hex input. */
export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value = '#3b82f6',
      onChange,
      presets = DEFAULT_PRESETS,
      size = 'md',
      isDisabled = false,
      style,
      ...rest
    },
    ref
  ) => {
    const [hexInput, setHexInput] = useState(value)

    useEffect(() => {
      setHexInput(value)
    }, [value])

    const swatchSize = getSwatchSize(size)

    const handleSwatchPress = useCallback(
      (color: string) => {
        if (!isDisabled) {
          onChange?.(color)
          setHexInput(color)
        }
      },
      [isDisabled, onChange]
    )

    const handleHexChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setHexInput(input)
        if (/^#[0-9a-fA-F]{6}$/.test(input)) {
          onChange?.(input)
        }
      },
      [onChange]
    )

    const handleHexBlur = useCallback(() => {
      if (!/^#[0-9a-fA-F]{6}$/.test(hexInput)) {
        setHexInput(value)
      }
    }, [hexInput, value])

    return (
      <YStack ref={ref} space="$sm" {...rest}>
        <XStack flexWrap="wrap" space="$sm" gap="$sm">
          {presets.map((color) => (
            <Swatch
              key={color}
              selected={value?.toLowerCase() === color.toLowerCase()}
              disabled={isDisabled}
              onPress={() => handleSwatchPress(color)}
              backgroundColor={color}
              width={swatchSize.swatch}
              height={swatchSize.swatch}
              role="button"
              aria-label={`Select color ${color}`}
              aria-selected={value?.toLowerCase() === color.toLowerCase()}
              tabIndex={isDisabled ? -1 : 0}
              borderWidth={color.toLowerCase() === '#ffffff' ? 2 : 0}
              borderColor="$border"
            >
              {value?.toLowerCase() === color.toLowerCase() && (
                <Text
                  color={isLightColor(color) ? '#000000' : '#ffffff'}
                  fontSize={swatchSize.fontSize}
                  fontWeight="bold"
                  selectable={false}
                >
                  ✓
                </Text>
              )}
            </Swatch>
          ))}
        </XStack>
        <XStack alignItems="center" space="$sm">
          <XStack
            width={32}
            height={32}
            backgroundColor={value}
            borderRadius="$md"
            borderWidth={1}
            borderColor="$border"
          />
          <HexInput
            type="text"
            value={hexInput}
            onChange={handleHexChange}
            onBlur={handleHexBlur}
            disabled={isDisabled}
            aria-label="Hex color value"
            maxLength={7}
          />
        </XStack>
      </YStack>
    )
  }
)

ColorPicker.displayName = 'ColorPicker'

function isLightColor(hex: string): boolean {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  return r * 0.299 + g * 0.587 + b * 0.114 > 186
}
