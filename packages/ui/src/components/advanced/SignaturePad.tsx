import { YStack, Button, View, styled } from 'tamagui'
import { useRef, useEffect, useState, useCallback } from 'react'

export interface SignaturePadProps {
  value?: string
  onChange?: (dataUrl: string) => void
  width?: number
  height?: number
  penColor?: string
  penWidth?: number
  clearLabel?: string
}

const PadContainer = styled(YStack, {
  name: 'SignaturePad',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$md',
  overflow: 'hidden',
  position: 'relative',
})

export function SignaturePad({
  value,
  onChange,
  width = 400,
  height = 200,
  penColor = '#000',
  penWidth = 2,
  clearLabel = 'Clear',
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    if (value) {
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0)
      img.src = value
    }
  }, [])

  const getPos = (e: any) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches?.[0]?.clientX ?? e.clientX
    const clientY = e.touches?.[0]?.clientY ?? e.clientY
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  const startDrawing = useCallback(
    (e: any) => {
      setIsDrawing(true)
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const pos = getPos(e)
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    },
    []
  )

  const draw = useCallback(
    (e: any) => {
      if (!isDrawing) return
      e.preventDefault()
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const pos = getPos(e)
      ctx.lineWidth = penWidth
      ctx.lineCap = 'round'
      ctx.strokeStyle = penColor
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    },
    [isDrawing, penColor, penWidth]
  )

  const stopDrawing = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false)
      const canvas = canvasRef.current
      if (canvas && onChange) {
        onChange(canvas.toDataURL())
      }
    }
  }, [isDrawing, onChange])

  const clear = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
    if (onChange) onChange('')
  }, [onChange, width, height])

  return (
    <PadContainer>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ width, height, touchAction: 'none', cursor: 'crosshair' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <Button
        size="$sm"
        variant="outline"
        position="absolute"
        bottom={8}
        right={8}
        onPress={clear}
      >
        {clearLabel}
      </Button>
    </PadContainer>
  )
}
