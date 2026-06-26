import { type ReactNode, useEffect, useState } from 'react'
import { Platform } from 'react-native'

export interface PortalProps {
  children: ReactNode
  containerId?: string
}

const isWeb = Platform.OS === 'web'

export function Portal({ children, containerId = 'luma-portal' }: PortalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isWeb || !mounted) {
    return <>{children}</>
  }

  let container = document.getElementById(containerId)
  if (!container) {
    container = document.createElement('div')
    container.id = containerId
    container.style.cssText = 'position:fixed;z-index:99999;top:0;left:0;width:100%;height:0;overflow:visible;'
    document.body.appendChild(container)
  }

  const { createPortal } = require('react-dom')
  return createPortal(children, container)
}
