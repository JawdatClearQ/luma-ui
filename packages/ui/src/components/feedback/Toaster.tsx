import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { YStack, styled } from 'tamagui'
import { Toast, type ToastVariant } from './Toast'

export interface ToastData {
  id: string
  message: string
  variant: ToastVariant
  duration?: number
}

export interface ToastContextValue {
  toasts: ToastData[]
  addToast: (toast: Omit<ToastData, 'id'>) => string
  removeToast: (id: string) => void
  success: (message: string, duration?: number) => string
  error: (message: string, duration?: number) => string
  warning: (message: string, duration?: number) => string
  info: (message: string, duration?: number) => string
}

const ToastContext = createContext<ToastContextValue | null>(null)

const ToastContainer = styled(YStack, {
  name: 'ToastContainer',
  position: 'fixed',
  top: 16,
  right: 16,
  zIndex: 700,
  gap: 8,
  maxWidth: 400,
})

let toastCounter = 0

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])
  const toastsRef = useRef(toasts)
  toastsRef.current = toasts

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((toast: Omit<ToastData, 'id'>): string => {
    const id = `toast-${++toastCounter}`
    const newToast: ToastData = { ...toast, id, duration: toast.duration ?? 4000 }
    setToasts((prev) => [...prev, newToast])
    return id
  }, [])

  const success = useCallback(
    (message: string, duration?: number) => addToast({ message, variant: 'success', duration }),
    [addToast]
  )
  const error = useCallback(
    (message: string, duration?: number) => addToast({ message, variant: 'error', duration }),
    [addToast]
  )
  const warning = useCallback(
    (message: string, duration?: number) => addToast({ message, variant: 'warning', duration }),
    [addToast]
  )
  const info = useCallback(
    (message: string, duration?: number) => addToast({ message, variant: 'info', duration }),
    [addToast]
  )

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, warning, info }}
    >
      {children}
      <ToastContainer>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            id={t.id}
            message={t.message}
            variant={t.variant}
            duration={t.duration}
            onClose={removeToast}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  )
}

function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx
}

export { ToastProvider as Toaster }
