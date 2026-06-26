import { styled, XStack, YStack, Text, Button, type StackProps } from 'tamagui'
import { forwardRef, useCallback, useState, useMemo } from 'react'
import { Platform } from 'react-native'

export interface DatePickerProps extends StackProps {
  /** Currently selected date */
  value?: Date
  /** Change handler */
  onChange?: (date: Date) => void
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Locale string for date formatting */
  locale?: string
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const CalendarHeader = styled(XStack, {
  name: 'DatePickerHeader',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: '$sm',
})

const NavButton = styled(Button, {
  name: 'DatePickerNavButton',
  backgroundColor: 'transparent',
  padding: '$sm',
  borderRadius: '$sm',
  cursor: 'pointer',
  minWidth: 0,

  hoverStyle: {
    backgroundColor: '$gray100',
  },
})

const DayGrid = styled(YStack, {
  name: 'DayGrid',
  space: 2,
})

const DayRow = styled(XStack, {
  name: 'DayRow',
  space: 2,
  justifyContent: 'space-around',
})

const DayHeader = styled(Text, {
  name: 'DayHeader',
  textAlign: 'center',
  fontSize: 12,
  color: '$textSecondary',
  fontWeight: '600',
  width: 36,
  paddingVertical: 4,
})

const DayCell = styled(XStack, {
  name: 'DayCell',
  width: 36,
  height: 36,
  borderRadius: '$full',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  hoverStyle: {
    backgroundColor: '$primary100',
  },

  variants: {
    today: {
      true: {
        borderWidth: 1,
        borderColor: '$primary500',
      },
    },
    selected: {
      true: {
        backgroundColor: '$primary500',
      },
    },
    outsideMonth: {
      true: {
        opacity: 0.3,
      },
    },
    disabled: {
      true: {
        opacity: 0.3,
        cursor: 'not-allowed',
      },
    },
  } as const,
})

/** A simple date picker component with a calendar grid view. */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      minDate,
      maxDate,
      locale = 'en-US',
      style,
      ...rest
    },
    ref
  ) => {
    const today = useMemo(() => new Date(), [])
    const [viewDate, setViewDate] = useState(value || today)

    const currentMonth = viewDate.getMonth()
    const currentYear = viewDate.getFullYear()

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

    const calendarDays = useMemo(() => {
      const days: (number | null)[] = []
      const totalCells = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7

      for (let i = 0; i < totalCells; i++) {
        if (i < firstDayOfWeek) {
          days.push(daysInPrevMonth - firstDayOfWeek + i + 1)
        } else if (i < firstDayOfWeek + daysInMonth) {
          days.push(i - firstDayOfWeek + 1)
        } else {
          days.push(i - firstDayOfWeek - daysInMonth + 1)
        }
      }
      return days
    }, [firstDayOfWeek, daysInMonth, daysInPrevMonth])

    const weeks = useMemo(() => {
      const result: (number | null)[][] = []
      for (let i = 0; i < calendarDays.length; i += 7) {
        result.push(calendarDays.slice(i, i + 7))
      }
      return result
    }, [calendarDays])

    const isDisabled = useCallback(
      (day: number, isCurrentMonth: boolean) => {
        if (!isCurrentMonth) return true
        const date = new Date(currentYear, currentMonth, day)
        if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true
        if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true
        return false
      },
      [currentYear, currentMonth, minDate, maxDate]
    )

    const isSelected = useCallback(
      (day: number) => {
        if (!value) return false
        return (
          value.getDate() === day &&
          value.getMonth() === currentMonth &&
          value.getFullYear() === currentYear
        )
      },
      [value, currentMonth, currentYear]
    )

    const isToday = useCallback(
      (day: number) => {
        return (
          today.getDate() === day &&
          today.getMonth() === currentMonth &&
          today.getFullYear() === currentYear
        )
      },
      [today, currentMonth, currentYear]
    )

    const handleDayPress = useCallback(
      (day: number, isCurrentMonth: boolean) => {
        if (!isCurrentMonth || isDisabled(day, true)) return
        const newDate = new Date(currentYear, currentMonth, day)
        onChange?.(newDate)
      },
      [currentYear, currentMonth, onChange, isDisabled]
    )

    const navigate = useCallback(
      (direction: 'prev' | 'next') => {
        setViewDate((prev) => {
          const newDate = new Date(prev)
          newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
          return newDate
        })
      },
      []
    )

    return (
      <YStack
        ref={ref}
        backgroundColor="$background"
        borderRadius="$md"
        borderWidth={1}
        borderColor="$border"
        padding="$md"
        role="group"
        aria-label="Date picker"
        {...rest}
      >
        <CalendarHeader>
          <NavButton
            onPress={() => navigate('prev')}
            aria-label="Previous month"
          >
            <Text selectable={false}>◀</Text>
          </NavButton>
          <Text fontWeight="600" fontSize={16} userSelect="none">
            {MONTHS[currentMonth]} {currentYear}
          </Text>
          <NavButton
            onPress={() => navigate('next')}
            aria-label="Next month"
          >
            <Text selectable={false}>▶</Text>
          </NavButton>
        </CalendarHeader>

        <DayGrid>
          <DayRow>
            {DAYS_OF_WEEK.map((day) => (
              <DayHeader key={day}>{day}</DayHeader>
            ))}
          </DayRow>

          {weeks.map((week, weekIndex) => (
            <DayRow key={weekIndex}>
              {week.map((day, dayIndex) => {
                if (day === null) return <DayCell key={`empty-${weekIndex}-${dayIndex}`} />
                const cellIndex = weekIndex * 7 + dayIndex
                const isCurrentMonth = cellIndex >= firstDayOfWeek && cellIndex < firstDayOfWeek + daysInMonth
                const disabled = isDisabled(day as number, isCurrentMonth)
                const selected = isSelected(day as number)
                const todayFlag = isToday(day as number)

                return (
                  <DayCell
                    key={`day-${cellIndex}`}
                    today={todayFlag}
                    selected={selected}
                    outsideMonth={!isCurrentMonth}
                    disabled={disabled}
                    onPress={() => handleDayPress(day as number, isCurrentMonth)}
                    role="gridcell"
                    aria-label={`${MONTHS[currentMonth]} ${day}, ${currentYear}`}
                    aria-selected={selected}
                    aria-disabled={disabled}
                    tabIndex={disabled ? -1 : 0}
                  >
                    <Text
                      color={selected ? 'white' : '$textPrimary'}
                      fontSize={14}
                      fontWeight={selected ? '600' : '400'}
                      userSelect="none"
                    >
                      {day}
                    </Text>
                  </DayCell>
                )
              })}
            </DayRow>
          ))}
        </DayGrid>
      </YStack>
    )
  }
)

DatePicker.displayName = 'DatePicker'
