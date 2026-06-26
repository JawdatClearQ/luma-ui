import { useState, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value)
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, JSON.stringify(value))
        } catch {
          // quota exceeded or private browsing
        }
      }
    },
    [key]
  )

  return [storedValue, setValue]
}
