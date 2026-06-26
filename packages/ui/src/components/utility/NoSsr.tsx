import { useEffect, useState, type ReactNode } from 'react'

export interface NoSsrProps {
  children: ReactNode
  fallback?: ReactNode
}

export function NoSsr({ children, fallback = null }: NoSsrProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return <>{mounted ? children : fallback}</>
}
