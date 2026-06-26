import { useState, useCallback } from 'react'

export function useClipboard(timeout = 2000) {
  const [value, setValue] = useState('')
  const [hasCopied, setHasCopied] = useState(false)

  const copy = useCallback(
    (text: string) => {
      if (typeof navigator === 'undefined' || !navigator.clipboard) {
        return
      }

      navigator.clipboard.writeText(text).then(() => {
        setValue(text)
        setHasCopied(true)
        setTimeout(() => setHasCopied(false), timeout)
      })
    },
    [timeout]
  )

  return { copy, value, hasCopied }
}
