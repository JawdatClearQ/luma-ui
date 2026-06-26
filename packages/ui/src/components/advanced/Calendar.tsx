import { XStack, YStack, Text, Button, styled } from 'tamagui'
import { useState, useMemo } from 'react'

export interface CalendarProps {
  value?: Date
  onChange?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  locale?: string
}

const CalendarContainer = styled(YStack, {
  name: 'Calendar',
  backgroundColor: '$surface',
  borderRadius: '$lg',
  borderWidth: 1,
  borderColor: '$border',
  overflow: 'hidden',
  width: 280,
})

const DayCell = styled(Button, {
  name: 'DayCell',
  width: 36,
  height: 36,
  padding: 0,
  borderRadius: '$full',
  backgroundColor: 'transparent',
  color: '$textPrimary',
  fontSize: 14,
  justifyContent: 'center',
  alignItems: 'center',
})

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function Calendar({
  value,
  onChange,
  minDate,
  maxDate,
  locale,
}: CalendarProps) {
  const today = new Date()
  const [viewDate, setViewDate] = useState(value || today)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()

  const weeks = useMemo(() => {
    const days: (number | null)[][] = []
    let week: (number | null)[] = []

    for (let i = 0; i < firstDayOfWeek; i++) {
      week.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day)
      if (week.length === 7) {
        days.push(week)
        week = []
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null)
      }
      days.push(week)
    }

    return days
  }, [year, month, daysInMonth, firstDayOfWeek])

  const isDisabled = (day: number) => {
    const date = new Date(year, month, day)
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const isSelected = (day: number) => {
    if (!value) return false
    return (
      value.getDate() === day &&
      value.getMonth() === month &&
      value.getFullYear() === year
    )
  }

  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    )
  }

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const canGoPrev = !minDate || new Date(year, month - 1, 1) >= minDate
  const canGoNext = !maxDate || new Date(year, month + 1, 1) <= maxDate

  return (
    <CalendarContainer>
      <XStack padding="$sm" justifyContent="space-between" alignItems="center">
        <Button
          size="$sm"
          variant="outlined"
          onPress={prevMonth}
          disabled={!canGoPrev}
          opacity={canGoPrev ? 1 : 0.3}
        >
          ‹
        </Button>
        <Text fontWeight="600" fontSize={14} color="$textPrimary">
          {monthNames[month]} {year}
        </Text>
        <Button
          size="$sm"
          variant="outlined"
          onPress={nextMonth}
          disabled={!canGoNext}
          opacity={canGoNext ? 1 : 0.3}
        >
          ›
        </Button>
      </XStack>

      <XStack padding="$sm" paddingTop={0} justifyContent="space-around">
        {dayNames.map((name) => (
          <Text key={name} width={36} textAlign="center" fontSize={11} color="$gray400" fontWeight="600">
            {name}
          </Text>
        ))}
      </XStack>

      <YStack padding="$sm" paddingTop={0}>
        {weeks.map((week, wi) => (
          <XStack key={wi} justifyContent="space-around">
            {week.map((day, di) => {
              if (day === null) return <YStack key={`e-${di}`} width={36} height={36} />

              const disabled = isDisabled(day)
              const selected = isSelected(day)
              const todayMatch = isToday(day)

              return (
                <DayCell
                  key={day}
                  disabled={disabled}
                  backgroundColor={
                    selected ? '$primary500' : todayMatch ? '$primary50' : 'transparent'
                  }
                  color={selected ? 'white' : disabled ? '$gray300' : '$textPrimary'}
                  fontWeight={todayMatch && !selected ? '600' : '400'}
                  onPress={() => {
                    if (!disabled && onChange) {
                      onChange(new Date(year, month, day))
                    }
                  }}
                >
                  {day}
                </DayCell>
              )
            })}
          </XStack>
        ))}
      </YStack>
    </CalendarContainer>
  )
}
