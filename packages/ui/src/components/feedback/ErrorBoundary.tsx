import { Component, type ErrorInfo, type ReactNode } from 'react'
import { YStack, Text } from 'tamagui'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo)
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return (this.props.fallback as (error: Error, reset: () => void) => ReactNode)(
            this.state.error,
            this.reset
          )
        }
        return this.props.fallback
      }

      return (
        <YStack
          alignItems="center"
          justifyContent="center"
          padding="$xl"
          gap={8}
        >
          <Text fontSize={32}>⚠</Text>
          <Text fontSize={16} fontWeight="600" color="$textPrimary">
            Something went wrong
          </Text>
          <Text fontSize={13} color="$textSecondary" textAlign="center" maxWidth={300}>
            {this.state.error.message}
          </Text>
          <Text
            fontSize={13}
            fontWeight="600"
            color="$primary500"
            cursor="pointer"
            onPress={this.reset}
          >
            Try again
          </Text>
        </YStack>
      )
    }

    return this.props.children
  }
}
