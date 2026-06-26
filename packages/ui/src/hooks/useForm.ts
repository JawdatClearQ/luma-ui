import { useState, useCallback } from 'react'

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setValue = useCallback(
    (key: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [key]: value }))
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    },
    []
  )

  const setError = useCallback((key: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [key]: error }))
  }, [])

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void) => {
      return async (e: any) => {
        if (e?.preventDefault) e.preventDefault()

        if (Object.keys(errors).length > 0) return

        setIsSubmitting(true)
        try {
          await onSubmit(values)
        } finally {
          setIsSubmitting(false)
        }
      }
    },
    [values, errors]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setIsSubmitting(false)
  }, [initialValues])

  const isValid = Object.keys(errors).length === 0

  return { values, errors, setValue, setError, handleSubmit, reset, isValid, isSubmitting }
}
