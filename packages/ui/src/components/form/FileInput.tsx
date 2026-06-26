import { styled, XStack, YStack, Text, type StackProps } from 'tamagui'
import { forwardRef, useState, useCallback, useRef } from 'react'
import { Platform } from 'react-native'

export interface FileInputProps extends StackProps {
  /** Accepted file types (e.g. ".pdf,.jpg,.png") */
  accept?: string
  /** Whether multiple files can be selected */
  multiple?: boolean
  /** Maximum file size in bytes */
  maxSize?: number
  /** Drop handler */
  onDrop?: (files: File[]) => void
  /** Whether the input is disabled */
  isDisabled?: boolean
  /** Text to show when dragging files over */
  dragActiveText?: string
  /** Change handler for file selection */
  onChange?: (files: File[]) => void
}

const DropZone = styled(YStack, {
  name: 'DropZone',
  borderWidth: 2,
  borderColor: '$border',
  borderStyle: 'dashed',
  borderRadius: '$lg',
  padding: '$xl',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: '$background',
  minHeight: 150,

  hoverStyle: {
    borderColor: '$primary400',
    backgroundColor: '$primary50',
  },

  variants: {
    dragActive: {
      true: {
        borderColor: '$primary500',
        backgroundColor: '$primary50',
        borderStyle: 'solid',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        hoverStyle: {
          borderColor: '$border',
          backgroundColor: '$background',
        },
      },
    },
    error: {
      true: {
        borderColor: '$error',
      },
    },
  } as const,
})

const HiddenInput = styled('input', {
  name: 'HiddenFileInput',
  display: 'none',
})

const FileTag = styled(XStack, {
  name: 'FileTag',
  paddingHorizontal: '$sm',
  paddingVertical: 2,
  backgroundColor: '$gray100',
  borderRadius: '$sm',
  alignItems: 'center',
  space: '$xs',
})

/** A file upload component with drag-and-drop support. */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      accept,
      multiple = false,
      maxSize,
      onDrop,
      isDisabled = false,
      dragActiveText = 'Drop files here',
      onChange,
      style,
      ...rest
    },
    ref
  ) => {
    const [dragActive, setDragActive] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDrag = useCallback(
      (e: React.DragEvent) => {
        if (isDisabled) return
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
          setDragActive(true)
        } else if (e.type === 'dragleave') {
          setDragActive(false)
        }
      },
      [isDisabled]
    )

    const validateFiles = useCallback(
      (fileList: File[]): File[] => {
        const valid: File[] = []
        for (const file of fileList) {
          if (maxSize && file.size > maxSize) {
            setError(`File "${file.name}" exceeds maximum size of ${(maxSize / 1024 / 1024).toFixed(1)}MB`)
            continue
          }
          valid.push(file)
        }
        return valid
      },
      [maxSize]
    )

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        if (isDisabled) return
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        setError(null)

        const fileList = Array.from(e.dataTransfer.files)
        const validFiles = validateFiles(fileList)
        if (validFiles.length > 0) {
          setFiles(validFiles)
          onDrop?.(validFiles)
          onChange?.(validFiles)
        }
      },
      [isDisabled, validateFiles, onDrop, onChange]
    )

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        const fileList = Array.from(e.target.files || [])
        const validFiles = validateFiles(fileList)
        if (validFiles.length > 0) {
          setFiles(validFiles)
          onChange?.(validFiles)
        }
      },
      [validateFiles, onChange]
    )

    const handleClick = useCallback(() => {
      if (!isDisabled) {
        inputRef.current?.click()
      }
    }, [isDisabled])

    return (
      <YStack ref={ref} width="100%" space="$sm" {...rest}>
        <DropZone
          dragActive={dragActive}
          disabled={isDisabled}
          error={!!error}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onPress={handleClick}
          role="button"
          aria-label={dragActive ? dragActiveText : 'Click or drag files to upload'}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
        >
          <HiddenInput
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            disabled={isDisabled}
            aria-hidden
          />
          {dragActive ? (
            <>
              <Text fontSize={24} color="$primary500" selectable={false}>↑</Text>
              <Text color="$primary500" fontWeight="500" marginTop="$xs">
                {dragActiveText}
              </Text>
            </>
          ) : (
            <>
              <Text fontSize={24} color="$textSecondary" selectable={false}>↑</Text>
              <Text color="$textSecondary" marginTop="$xs">
                Drag & drop files here, or click to browse
              </Text>
              <Text color="$textTertiary" fontSize={12} marginTop="$xs">
                {accept ? `Accepted: ${accept}` : 'All files accepted'}
                {maxSize && ` — Max: ${(maxSize / 1024 / 1024).toFixed(0)}MB`}
              </Text>
            </>
          )}
        </DropZone>

        {error && (
          <Text color="$error" fontSize={14}>
            {error}
          </Text>
        )}

        {files.length > 0 && (
          <YStack space="$xs">
            {files.map((file, index) => (
              <FileTag key={file.name}>
                <Text fontSize={13} color="$textPrimary" flex={1} numberOfLines={1}>
                  {file.name}
                </Text>
                <Text fontSize={11} color="$textSecondary">
                  {(file.size / 1024).toFixed(1)} KB
                </Text>
              </FileTag>
            ))}
          </YStack>
        )}
      </YStack>
    )
  }
)

FileInput.displayName = 'FileInput'
