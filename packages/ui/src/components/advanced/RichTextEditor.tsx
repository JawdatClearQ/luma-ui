import { forwardRef, useState, useCallback } from 'react'
import { YStack, XStack, styled, Text, Button, Input } from 'tamagui'

export interface RichTextEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  minHeight?: number
  isDisabled?: boolean
  isReadOnly?: boolean
}

interface ToolbarAction {
  label: string
  action: string
  shortcut?: string
}

const Toolbar = styled(XStack, {
  borderWidth: 1,
  borderColor: '$border',
  borderBottomWidth: 0,
  borderTopLeftRadius: '$md',
  borderTopRightRadius: '$md',
  padding: '$1',
  backgroundColor: '$surface',
  gap: '$1',
  flexWrap: 'wrap' as any,
})

const EditorArea = styled(YStack, {
  borderWidth: 1,
  borderColor: '$border',
  borderBottomLeftRadius: '$md',
  borderBottomRightRadius: '$md',
  padding: '$3',
  minHeight: 200,
  backgroundColor: '$background',
})

const StyledTextArea = styled(Input, {
  borderWidth: 0,
  backgroundColor: 'transparent',
  minHeight: 180,
  height: 'auto' as any,
  multiline: true as any,
  fontFamily: '$mono',
  fontSize: '$sm',
  lineHeight: 1.6,
})

const toolbarActions: ToolbarAction[] = [
  { label: 'B', action: 'bold', shortcut: 'Ctrl+B' },
  { label: 'I', action: 'italic', shortcut: 'Ctrl+I' },
  { label: 'U', action: 'underline', shortcut: 'Ctrl+U' },
  { label: 'H1', action: 'h1' },
  { label: 'H2', action: 'h2' },
  { label: 'Link', action: 'link' },
  { label: 'Code', action: 'code' },
  { label: 'List', action: 'ul' },
  { label: 'OL', action: 'ol' },
]

export const RichTextEditor = forwardRef<HTMLInputElement, RichTextEditorProps>(({
  value = '',
  onChange,
  placeholder = 'Start typing...',
  minHeight = 200,
  isDisabled = false,
  isReadOnly = false,
}, ref) => {
  const [text, setText] = useState(value)

  const handleChange = useCallback((newText: string) => {
    setText(newText)
    onChange?.(newText)
  }, [onChange])

  const handleAction = useCallback((action: string) => {
    const textarea = document?.activeElement as HTMLTextAreaElement
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = text.substring(start, end)
    let newText = text
    let cursorOffset = 0

    switch (action) {
      case 'bold':
        newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end)
        cursorOffset = 2
        break
      case 'italic':
        newText = text.substring(0, start) + `*${selectedText}*` + text.substring(end)
        cursorOffset = 1
        break
      case 'underline':
        newText = text.substring(0, start) + `<u>${selectedText}</u>` + text.substring(end)
        cursorOffset = 3
        break
      case 'h1':
        newText = text.substring(0, start) + `# ${selectedText}\n` + text.substring(end)
        cursorOffset = 2
        break
      case 'h2':
        newText = text.substring(0, start) + `## ${selectedText}\n` + text.substring(end)
        cursorOffset = 3
        break
      case 'link':
        newText = text.substring(0, start) + `[${selectedText}](url)` + text.substring(end)
        break
      case 'code':
        newText = text.substring(0, start) + '`' + selectedText + '`' + text.substring(end)
        cursorOffset = 1
        break
      case 'ul':
        newText = text.substring(0, start) + `- ${selectedText}\n` + text.substring(end)
        cursorOffset = 2
        break
      case 'ol':
        newText = text.substring(0, start) + `1. ${selectedText}\n` + text.substring(end)
        cursorOffset = 3
        break
    }
    handleChange(newText)
  }, [text, handleChange])

  return (
    <YStack>
      <Toolbar>
        {toolbarActions.map((action) => (
          <Button
            key={action.action}
            size="$1"
            variant="ghost"
            onPress={() => handleAction(action.action)}
            disabled={isDisabled || isReadOnly}
            title={action.shortcut}
            aria-label={action.action}
          >
            <Text fontSize="$sm" fontWeight={action.action === 'bold' ? '700' : '400'}>
              {action.label}
            </Text>
          </Button>
        ))}
      </Toolbar>
      <EditorArea style={{ minHeight }}>
        <StyledTextArea
          ref={ref}
          value={text}
          onChangeText={handleChange}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-label="Rich text editor"
          role="textbox"
          aria-multiline="true"
        />
      </EditorArea>
    </YStack>
  )
})

RichTextEditor.displayName = 'RichTextEditor'
