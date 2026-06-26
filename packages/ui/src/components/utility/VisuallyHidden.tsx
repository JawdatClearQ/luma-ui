import { styled } from '@tamagui/core'
import { type ReactNode } from 'react'

export interface VisuallyHiddenProps {
  children: ReactNode
  as?: any
}

const Hidden = styled('span', {
  name: 'VisuallyHidden',
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
  margin: -1,
  padding: 0,
})

export function VisuallyHidden({ children, as }: VisuallyHiddenProps) {
  return <Hidden tag={as}>{children}</Hidden>
}
