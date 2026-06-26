import { YStack, Text, styled } from 'tamagui'
import { useMemo, type ReactNode } from 'react'

export interface MarkdownProps {
  content: string
  variant?: 'document' | 'chat'
}

const DocumentContainer = styled(YStack, {
  name: 'MarkdownDocument',
  gap: '$md',
})

const ChatContainer = styled(YStack, {
  name: 'MarkdownChat',
  gap: '$xs',
})

function parseMarkdown(content: string): ReactNode[] {
  const lines = content.split('\n')
  const elements: ReactNode[] = []
  let inCodeBlock = false
  let codeContent = ''
  let codeLanguage = ''
  let listItems: string[] = []
  let listOrdered = false
  let key = 0

  const nextKey = () => `md-${key++}`

  const flushList = () => {
    if (listItems.length === 0) return
    const listKey = nextKey()
    elements.push(
      <YStack key={listKey} paddingLeft="$md">
        {listItems.map((item, i) => (
          <Text key={`${listKey}-item-${i}`} fontSize={14} color="$textPrimary" lineHeight={22}>
            {item}
          </Text>
        ))}
      </YStack>
    )
    listItems = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <YStack
            key={nextKey()}
            backgroundColor="$gray100"
            borderRadius="$md"
            padding="$md"
          >
            <Text
              fontFamily="monospace"
              fontSize={13}
              color="$textPrimary"
            >
              {codeContent}
            </Text>
          </YStack>
        )
        codeContent = ''
        codeLanguage = ''
        inCodeBlock = false
      } else {
        flushList()
        codeLanguage = line.slice(3).trim()
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeContent += (codeContent ? '\n' : '') + line
      continue
    }

    if (line.trim() === '') {
      flushList()
      continue
    }

    if (line.match(/^#{1,6}\s/)) {
      flushList()
      const level = line.match(/^#{1,6}/)![0].length
      const text = line.replace(/^#{1,6}\s/, '')
      const fontSize = [24, 20, 18, 16, 14, 12][level - 1]
      elements.push(
        <Text key={nextKey()} fontSize={fontSize} fontWeight="700" color="$textPrimary">
          {text}
        </Text>
      )
      continue
    }

    if (line.match(/^(\d+\.)\s/)) {
      listOrdered = true
      listItems.push(line.replace(/^\d+\.\s/, ''))
      continue
    }

    if (line.match(/^[-*+]\s/)) {
      listOrdered = false
      listItems.push(line.replace(/^[-*+]\s/, ''))
      continue
    }

    if (line.match(/^>\s/)) {
      flushList()
      const text = line.replace(/^>\s/, '')
      elements.push(
        <Text
          key={nextKey()}
          fontSize={14}
          color="$gray600"
          fontStyle="italic"
          paddingLeft="$sm"
        >
          {text}
        </Text>
      )
      continue
    }

    if (line.match(/^---+/)) {
      flushList()
      elements.push(
        <Text key={nextKey()} fontSize={14} color="$textPrimary" lineHeight={22}>
          {line}
        </Text>
      )
      continue
    }

    flushList()

    const rendered = renderInline(line, nextKey)
    elements.push(
      <Text key={nextKey()} fontSize={14} color="$textPrimary" lineHeight={22}>
        {rendered}
      </Text>
    )
  }

  flushList()
  if (inCodeBlock) {
    elements.push(
      <Text key={nextKey()} color="$error" fontSize={14}>
        Unclosed code block
      </Text>
    )
  }

  return elements
}

function renderInline(text: string, parentKey: () => string): ReactNode {
  const parts: ReactNode[] = []
  let remaining = text
  let key = 0

  const nextKey = () => `${parentKey()}-inline-${key++}`

  const regex = /(\*\*(.+?)\*\*|_(.+?)_|`(.+?)`|\[(.+?)\]\((.+?)\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(remaining)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Text key={nextKey()}>{remaining.slice(lastIndex, match.index)}</Text>)
    }

    if (match[2]) {
      parts.push(
        <Text key={nextKey()} fontWeight="700">
          {match[2]}
        </Text>
      )
    } else if (match[3]) {
      parts.push(
        <Text key={nextKey()} fontStyle="italic">
          {match[3]}
        </Text>
      )
    } else if (match[4]) {
      parts.push(
        <Text
          key={nextKey()}
          fontFamily="monospace"
          fontSize={13}
        >
          {match[4]}
        </Text>
      )
    } else if (match[5] && match[6]) {
      parts.push(
        <Text key={nextKey()} color="$primary500" textDecorationLine="underline">
          {match[5]}
        </Text>
      )
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < remaining.length) {
    parts.push(<Text key={nextKey()}>{remaining.slice(lastIndex)}</Text>)
  }

  return parts.length > 0 ? parts : text
}

export function Markdown({ content, variant = 'document' }: MarkdownProps) {
  const parsed = useMemo(() => parseMarkdown(content), [content])
  const Container = variant === 'chat' ? ChatContainer : DocumentContainer
  return <Container>{parsed}</Container>
}
