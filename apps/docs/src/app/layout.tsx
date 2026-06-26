import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luma UI - Cross-Platform Component Library',
  description: 'A beautiful, accessible, cross-platform component library for React and React Native. Light up your UI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
