import { useState, useEffect, useCallback } from 'react'

export function useColorMode() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const stored = window.localStorage.getItem('color-mode') as 'light' | 'dark' | null
    if (stored) {
      setColorMode(stored)
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setColorMode(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-color-mode', colorMode)
  }, [colorMode])

  const toggle = useCallback(() => {
    setColorMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('color-mode', next)
      }
      return next
    })
  }, [])

  const setMode = useCallback((mode: 'light' | 'dark') => {
    setColorMode(mode)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('color-mode', mode)
    }
  }, [])

  return { colorMode, toggle, setColorMode: setMode }
}
