import { styled, Text, type TextProps } from 'tamagui'
import { forwardRef } from 'react'

export interface SkipNavProps {
  contentId: string
  label?: string
}

const StyledSkipLink = styled(Text, {
  name: 'SkipNav',
  position: 'absolute',
  top: '-100%',
  left: 0,
  zIndex: '$skipLink',
  padding: '$md',
  backgroundColor: '$primary500',
  color: 'white',
  fontSize: 14,
  fontWeight: '600',
  cursor: 'pointer',
  textDecorationLine: 'none',
  outlineOffset: 2,
  transition: 'top 0.1s ease',
  hoverStyle: { top: 0 },
  focusStyle: { top: 0 },
})

export const SkipNav = forwardRef<any, SkipNavProps>(
  (props: SkipNavProps, ref) => {
    const { contentId, label = 'Skip to main content' } = props

    const handlePress = () => {
      if (typeof document === 'undefined') return
      const el = document.getElementById(contentId)
      if (el) {
        el.setAttribute('tabindex', '-1')
        el.focus()
        el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true })
      }
    }

    return (
      <StyledSkipLink
        ref={ref}
        role="link"
        aria-label={label}
        tabIndex={0}
        onPress={handlePress}
      >
        {label}
      </StyledSkipLink>
    )
  }
)

SkipNav.displayName = 'SkipNav'
