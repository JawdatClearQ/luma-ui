import { useState, useCallback } from 'react'

export interface Toast {
  id: string
  title?: string
  description?: string
  status: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  isClosable?: boolean
}

export interface ToastReturn {
  toast: (options: Omit<Toast, 'id'>) => string
  success: (title: string, description?: string) => string
  error: (title: string, description?: string) => string
  warning: (title: string, description?: string) => string
  info: (title: string, description?: string) => string
  dismiss: (id: string) => void
  dismissAll: () => void
  toasts: Toast[]
}

let toastCount = 0

export function useToast(): ToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((options: Omit<Toast, 'id'>) => {
    const id = `toast-${++toastCount}`
    const newToast: Toast = { ...options, id }
    setToasts((prev) => [...prev, newToast])

    if (options.duration !== 0) {
      const dur = options.duration ?? 5000
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, dur)
    }

    return id
  }, [])

  const success = useCallback(
    (title: string, description?: string) => toast({ title, description, status: 'success' }),
    [toast]
  )

  const error = useCallback(
    (title: string, description?: string) => toast({ title, description, status: 'error' }),
    [toast]
  )

  const warning = useCallback(
    (title: string, description?: string) => toast({ title, description, status: 'warning' }),
    [toast]
  )

  const info = useCallback(
    (title: string, description?: string) => toast({ title, description, status: 'info' }),
    [toast]
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  return { toast, success, error, warning, info, dismiss, dismissAll, toasts }
}
