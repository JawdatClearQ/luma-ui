import { YStack, XStack, Text, styled } from 'tamagui'
import { useState, type ReactNode } from 'react'
import { Collapse } from './Collapse'

export interface AccordionItem {
  title: string
  content: ReactNode
  icon?: ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  type?: 'single' | 'multiple'
  defaultExpanded?: number | number[]
  onChange?: (expanded: number | number[]) => void
}

const AccordionContainer = styled(YStack, {
  name: 'AccordionContainer',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$md',
  overflow: 'hidden',
})

const AccordionHeader = styled(XStack, {
  name: 'AccordionHeader',
  padding: '$md',
  alignItems: 'center',
  gap: '$sm',
  cursor: 'pointer',
  hoverStyle: { backgroundColor: '$gray50' },
})

const AccordionTitle = styled(Text, {
  name: 'AccordionTitle',
  flex: 1,
  fontWeight: '600',
  color: '$textPrimary',
})

const AccordionBody = styled(YStack, {
  name: 'AccordionBody',
  padding: '$md',
  paddingTop: 0,
})

export function Accordion({ items, type = 'single', defaultExpanded, onChange }: AccordionProps) {
  const isSingle = type === 'single'
  const initial = defaultExpanded != null
    ? (Array.isArray(defaultExpanded) ? defaultExpanded : [defaultExpanded])
    : []
  const [expanded, setExpanded] = useState<number[]>(initial)

  const toggle = (index: number) => {
    let next: number[]
    if (isSingle) {
      next = expanded.includes(index) ? [] : [index]
    } else {
      next = expanded.includes(index)
        ? expanded.filter((i) => i !== index)
        : [...expanded, index]
    }
    setExpanded(next)
    if (onChange) {
      onChange(isSingle ? (next[0] ?? -1) : next)
    }
  }

  return (
    <AccordionContainer>
      {items.map((item, index) => {
        const isExpanded = expanded.includes(index)
        return (
          <YStack key={item.title} borderBottomWidth={index < items.length - 1 ? 1 : 0} borderBottomColor="$border">
            <AccordionHeader
              role="button"
              aria-expanded={isExpanded}
              aria-controls={`accordion-content-${index}`}
              onPress={() => toggle(index)}
            >
              {item.icon}
              <AccordionTitle>{item.title}</AccordionTitle>
              <Text color="$gray400">{isExpanded ? '−' : '+'}</Text>
            </AccordionHeader>
            <Collapse isOpen={isExpanded}>
              <AccordionBody id={`accordion-content-${index}`}>
                {item.content}
              </AccordionBody>
            </Collapse>
          </YStack>
        )
      })}
    </AccordionContainer>
  )
}
