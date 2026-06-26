import { styled, XStack, YStack, Text, type StackProps } from 'tamagui'
import { forwardRef, type ReactNode } from 'react'

export interface StepItem {
  label: string
  description?: string
  icon?: ReactNode
}

type StepOrientation = 'horizontal' | 'vertical'
type StepSize = 'sm' | 'md' | 'lg'

export interface StepperProps extends StackProps {
  steps: StepItem[]
  activeStep: number
  orientation?: StepOrientation
  size?: StepSize
}

const sizeMap = {
  sm: { stepSize: 24, fontSize: 12, descFontSize: 10, gap: 8 },
  md: { stepSize: 32, fontSize: 14, descFontSize: 12, gap: 12 },
  lg: { stepSize: 40, fontSize: 16, descFontSize: 14, gap: 16 },
}

const StepCircle = styled(XStack, {
  name: 'StepCircle',
  borderRadius: '$full',
  justifyContent: 'center',
  alignItems: 'center',
  variants: {
    state: {
      completed: {
        backgroundColor: '$primary500',
        color: 'white',
      },
      active: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '$primary500',
      },
      upcoming: {
        backgroundColor: '$gray200',
        color: '$gray500',
      },
    },
  } as const,
})

const Connector = styled(XStack, {
  name: 'Connector',
  backgroundColor: '$gray200',
  variants: {
    completed: {
      true: { backgroundColor: '$primary500' },
    },
    orientation: {
      horizontal: { width: '$xl', height: 2 },
      vertical: { width: 2, height: '$xl' },
    },
  } as const,
})

export const Stepper = forwardRef<any, StepperProps>(
  (props: StepperProps, ref) => {
    const {
      steps,
      activeStep,
      orientation = 'horizontal',
      size = 'md',
      ...rest
    } = props

    const s = size as StepSize
    const dims = sizeMap[s]
    const Container = orientation === 'vertical' ? YStack : XStack

    return (
      <Container
        ref={ref}
        role="list"
        aria-label="Stepper"
        gap={dims.gap}
        {...(orientation === 'horizontal'
          ? { flexDirection: 'row', alignItems: 'center' }
          : { flexDirection: 'column', alignItems: 'flex-start' })}
        {...rest}
      >
        {steps.map((step, index) => {
          const isCompleted = index < activeStep
          const isActive = index === activeStep
          const isLast = index === steps.length - 1
          const state = isCompleted ? 'completed' : isActive ? 'active' : 'upcoming'

          return (
            <Container
              key={step.label}
              role="listitem"
              gap={dims.gap}
              {...(orientation === 'horizontal'
                ? { flexDirection: 'row', alignItems: 'center' }
                : { flexDirection: 'row', alignItems: 'flex-start' })}
              aria-current={isActive ? 'step' : undefined}
            >
              <StepCircle
                state={state}
                width={dims.stepSize}
                height={dims.stepSize}
              >
                {step.icon || (
                  <Text fontSize={dims.fontSize * 0.75} fontWeight="700" color="inherit">
                    {isCompleted ? '✓' : index + 1}
                  </Text>
                )}
              </StepCircle>
              <YStack gap={2}>
                <Text
                  fontSize={dims.fontSize}
                  fontWeight={isActive ? '600' : '400'}
                  color={isCompleted || isActive ? '$textPrimary' : '$textSecondary'}
                >
                  {step.label}
                </Text>
                {step.description && (
                  <Text
                    fontSize={dims.descFontSize}
                    color="$textTertiary"
                  >
                    {step.description}
                  </Text>
                )}
              </YStack>
              {!isLast && (
                <Connector
                  completed={isCompleted}
                  orientation={orientation}
                />
              )}
            </Container>
          )
        })}
      </Container>
    )
  }
)

Stepper.displayName = 'Stepper'
