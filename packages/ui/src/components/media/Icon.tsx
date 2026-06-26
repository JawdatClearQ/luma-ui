import { forwardRef } from 'react'
import { Text } from 'tamagui'
import type { TextProps } from 'tamagui'

export interface IconProps extends Omit<TextProps, 'size'> {
  name: string
  size?: number | string
  color?: string
  strokeWidth?: number
}

const iconMap: Record<string, string> = {
  chevronDown: '▼',
  chevronUp: '▲',
  chevronLeft: '◀',
  chevronRight: '▶',
  close: '✕',
  check: '✓',
  menu: '☰',
  search: '🔍',
  settings: '⚙',
  user: '👤',
  home: '🏠',
  info: 'ℹ',
  warning: '⚠',
  error: '✕',
  success: '✓',
  mail: '✉',
  bell: '🔔',
  calendar: '📅',
  clock: '🕐',
  heart: '♥',
  star: '★',
  plus: '+',
  minus: '−',
  trash: '🗑',
  edit: '✎',
  upload: '↑',
  download: '↓',
  external: '↗',
  copy: '📋',
  link: '🔗',
  eye: '👁',
  eyeOff: '👁‍🗨',
  arrowUp: '↑',
  arrowDown: '↓',
  arrowLeft: '←',
  arrowRight: '→',
}

export const Icon = forwardRef<any, IconProps>(
  ({ name, size = 20, color, strokeWidth, ...props }, ref) => {
    const glyph = iconMap[name] || '?'

    return (
      <Text
        ref={ref}
        fontSize={size}
        color={color ?? '$textPrimary'}
        {...props}
        aria-hidden={true}
      >
        {glyph}
      </Text>
    )
  }
)

Icon.displayName = 'Icon'
