import { styled, XStack, YStack, Text, type StackProps } from 'tamagui'
import { forwardRef, useCallback, useRef, useState, useEffect, useMemo } from 'react'
import { Platform } from 'react-native'
import { clamp } from '../../utils'

export interface SliderProps extends StackProps {
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Current value (single value or [min, max] for range) */
  value?: number | [number, number]
  /** Change handler */
  onChange?: (value: number | [number, number]) => void
  /** Whether the slider is disabled */
  isDisabled?: boolean
  /** Slider orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Function to format the tooltip value */
  formatTooltip?: (value: number) => string
  /** Whether to show tooltips */
  showTooltip?: boolean
}

const Track = styled(XStack, {
  name: 'SliderTrack',
  backgroundColor: '$gray200',
  borderRadius: 9999,
  position: 'relative',
  cursor: 'pointer',

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    orientation: {
      horizontal: {
        height: 6,
        width: '100%',
      },
      vertical: {
        width: 6,
        height: '100%',
        minHeight: 100,
      },
    },
  } as const,
})

const FilledTrack = styled(XStack, {
  name: 'SliderFilledTrack',
  backgroundColor: '$primary500',
  borderRadius: 9999,
  position: 'absolute',
})

const Thumb = styled(XStack, {
  name: 'SliderThumb',
  backgroundColor: 'white',
  borderRadius: 9999,
  borderWidth: 2,
  borderColor: '$primary500',
  position: 'absolute',
  elevation: 2,
  cursor: 'grab',
  zIndex: 1,

  hoverStyle: {
    transform: [{ scale: 1.1 }],
  },

  variants: {
    active: {
      true: {
        cursor: 'grabbing',
        transform: [{ scale: 1.15 }],
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        borderColor: '$gray400',
      },
    },
    orientation: {
      horizontal: {
        width: 20,
        height: 20,
        top: -7,
      },
      vertical: {
        width: 20,
        height: 20,
        left: -7,
      },
    },
  } as const,
})

const Tooltip = styled(XStack, {
  name: 'SliderTooltip',
  position: 'absolute',
  backgroundColor: '$gray900',
  paddingHorizontal: '$sm',
  paddingVertical: 2,
  borderRadius: '$sm',
  zIndex: 10,
  pointerEvents: 'none',
})

/** A range slider component supporting single and range (two thumbs) values. */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value = 0,
      onChange,
      isDisabled = false,
      orientation = 'horizontal',
      formatTooltip = (v) => String(v),
      showTooltip = false,
      style,
      ...rest
    },
    ref
  ) => {
    const isRange = Array.isArray(value)
    const trackRef = useRef<HTMLDivElement>(null)
    const [activeThumb, setActiveThumb] = useState<0 | 1 | null>(null)
    const [hoveredThumb, setHoveredThumb] = useState<0 | 1 | null>(null)

    const getPercent = useCallback(
      (val: number) => ((val - min) / (max - min)) * 100,
      [min, max]
    )

    const getValueFromPosition = useCallback(
      (clientPos: number) => {
        const track = trackRef.current
        if (!track) return min
        const rect = track.getBoundingClientRect()
        const rawPos =
          orientation === 'horizontal'
            ? (clientPos - rect.left) / rect.width
            : 1 - (clientPos - rect.top) / rect.height
        const clamped = clamp(rawPos * 100, 0, 100)
        const steps = Math.round((clamped / 100) * ((max - min) / step))
        return clamp(min + steps * step, min, max)
      },
      [min, max, step, orientation]
    )

    const handleMouseDown = useCallback(
      (e: React.MouseEvent, thumbIndex?: 0 | 1) => {
        if (isDisabled) return
        e.preventDefault()
        if (thumbIndex !== undefined) {
          setActiveThumb(thumbIndex)
        } else {
          const newVal = getValueFromPosition(
            orientation === 'horizontal' ? e.clientX : e.clientY
          )
          if (isRange) {
            const [v1, v2] = value as [number, number]
            const closerToStart = Math.abs(newVal - v1) <= Math.abs(newVal - v2)
            const newValue: [number, number] = closerToStart
              ? [Math.min(newVal, v2), v2]
              : [v1, Math.max(v1, newVal)]
            onChange?.(newValue)
            setActiveThumb(closerToStart ? 0 : 1)
          } else {
            onChange?.(newVal)
          }
        }
      },
      [isDisabled, getValueFromPosition, isRange, value, onChange, orientation]
    )

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (activeThumb === null || !trackRef.current) return
        const newVal = getValueFromPosition(
          orientation === 'horizontal' ? e.clientX : e.clientY
        )
        if (isRange) {
          const [v1, v2] = value as [number, number]
          const newValue: [number, number] =
            activeThumb === 0
              ? [Math.min(newVal, v2), v2]
              : [v1, Math.max(v1, newVal)]
          onChange?.(newValue)
        } else {
          onChange?.(newVal)
        }
      }

      const handleMouseUp = () => {
        setActiveThumb(null)
      }

      if (activeThumb !== null) {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
      }

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }, [activeThumb, getValueFromPosition, isRange, value, onChange, orientation])

    const currentValues = useMemo(() => {
      if (isRange) return value as [number, number]
      return [value as number, value as number]
    }, [value, isRange])

    const firstPercent = getPercent(currentValues[0])
    const secondPercent = isRange ? getPercent(currentValues[1]) : firstPercent

    const rangeStart = Math.min(firstPercent, secondPercent)
    const rangeEnd = Math.max(firstPercent, secondPercent)
    const rangeWidth = rangeEnd - rangeStart

    return (
      <YStack
        ref={ref}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={isRange ? currentValues[0] : (value as number)}
        aria-disabled={isDisabled}
        aria-orientation={orientation}
        width={orientation === 'horizontal' ? '100%' : 'auto'}
        height={orientation === 'vertical' ? 200 : 'auto'}
        {...rest}
      >
        <Track
          ref={trackRef}
          disabled={isDisabled}
          orientation={orientation}
          onMouseDown={(e) => handleMouseDown(e)}
        >
          <FilledTrack
            left={`${rangeStart}%`}
            width={`${rangeWidth}%`}
            height="100%"
            borderRadius={9999}
          />
          {currentValues.map((val, index) => {
            const isFirst = index === 0
            const thumbPos = getPercent(val)
            return (
              <Thumb
                key={`thumb-${index}`}
                active={activeThumb === index}
                disabled={isDisabled}
                orientation={orientation}
                left={orientation === 'horizontal' ? `${thumbPos}%` : 'auto'}
                bottom={orientation === 'vertical' ? `${thumbPos}%` : 'auto'}
                style={{
                  transform: orientation === 'horizontal'
                    ? `translateX(-${thumbPos === 0 ? 0 : 50}%)`
                    : `translateY(${thumbPos === 0 ? 0 : 50}%)`,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  handleMouseDown(e, index as 0 | 1)
                }}
                onMouseEnter={() => setHoveredThumb(index as 0 | 1)}
                onMouseLeave={() => setHoveredThumb(null)}
                aria-label={`Thumb ${index + 1}`}
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={val}
                tabIndex={isDisabled ? -1 : 0}
              />
            )
          })}
        </Track>
      </YStack>
    )
  }
)

Slider.displayName = 'Slider'
