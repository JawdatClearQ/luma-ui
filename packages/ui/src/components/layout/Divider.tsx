import { XStack, styled, Text, type XStackProps } from 'tamagui'
import { forwardRef } from 'react'

export interface DividerProps extends XStackProps {
  orientation?: 'horizontal' | 'vertical'
  label?: string
  labelPosition?: 'left' | 'center' | 'right'
}

const StyledDividerLine = styled(XStack, {
  name: 'DividerLine',
  backgroundColor: '$border',
})

export const Divider = forwardRef<any, DividerProps>(
  ({ orientation = 'horizontal', label, labelPosition = 'center', ...props }, ref) => {
    const isHorizontal = orientation === 'horizontal'

    if (label) {
      return (
        <XStack
          ref={ref}
          alignItems="center"
          width={isHorizontal ? '100%' : undefined}
          height={isHorizontal ? undefined : '100%'}
          flexDirection={isHorizontal ? 'row' : 'column'}
          role="separator"
          aria-orientation={orientation}
          {...props}
        >
          {labelPosition !== 'center' && labelPosition === 'left' && (
            <Text color="$textSecondary" fontSize="$3" paddingHorizontal="$2" whiteSpace="nowrap">
              {label}
            </Text>
          )}
          <StyledDividerLine
            flex={1}
            height={isHorizontal ? 1 : undefined}
            width={isHorizontal ? undefined : 1}
          />
          {labelPosition === 'center' && (
            <Text color="$textSecondary" fontSize="$3" paddingHorizontal="$2" whiteSpace="nowrap">
              {label}
            </Text>
          )}
          {labelPosition === 'left' && (
            <StyledDividerLine
              flex={1}
              height={isHorizontal ? 1 : undefined}
              width={isHorizontal ? undefined : 1}
            />
          )}
          {labelPosition === 'right' && (
            <Text color="$textSecondary" fontSize="$3" paddingHorizontal="$2" whiteSpace="nowrap">
              {label}
            </Text>
          )}
        </XStack>
      )
    }

    return (
      <StyledDividerLine
        ref={ref}
        height={isHorizontal ? 1 : '100%'}
        width={isHorizontal ? '100%' : 1}
        minHeight={isHorizontal ? 1 : undefined}
        minWidth={isHorizontal ? undefined : 1}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'
