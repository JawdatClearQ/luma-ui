import { useMemo } from 'react'

export interface QRCodeProps {
  value: string
  size?: number
  color?: string
  bgColor?: string
}

function qrEncode(text: string): boolean[][] {
  const data = Array.from(text).map((c) => c.charCodeAt(0))
  const len = data.length
  const version = 4
  const size = 17 + version * 4
  const moduleCount = size

  const matrix: boolean[][] = Array.from({ length: moduleCount }, () =>
    Array(moduleCount).fill(false)
  )

  function setFinderPattern(row: number, col: number) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        if (row + r < 0 || row + r >= moduleCount || col + c < 0 || col + c >= moduleCount)
          continue
        const isWhite =
          (r >= 0 && r <= 6 && c >= 0 && c <= 6) &&
          !(r >= 1 && r <= 5 && c >= 1 && c <= 5)
        matrix[row + r][col + c] = isWhite
      }
    }
  }

  setFinderPattern(0, 0)
  setFinderPattern(0, moduleCount - 7)
  setFinderPattern(moduleCount - 7, 0)

  const dataBits = data.flatMap((byte) =>
    Array.from({ length: 8 }, (_, i) => (byte >> (7 - i)) & 1)
  )

  for (let i = 0; i < dataBits.length && i < moduleCount * moduleCount; i++) {
    const row = Math.floor(i / moduleCount)
    const col = i % moduleCount
    if (row >= moduleCount || col >= moduleCount) break
    if (!matrix[row][col]) {
      matrix[row][col] = dataBits[i] === 1
    }
  }

  return matrix
}

export function QRCode({
  value,
  size = 200,
  color = '#000000',
  bgColor = '#ffffff',
}: QRCodeProps) {
  const matrix = useMemo(() => qrEncode(String(value)), [value])

  const moduleCount = matrix.length
  const moduleSize = size / moduleCount

  const rects: { x: number; y: number; w: number; h: number }[] = []
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (matrix[row][col]) {
        rects.push({
          x: col * moduleSize,
          y: row * moduleSize,
          w: moduleSize,
          h: moduleSize,
        })
      }
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={size} height={size} fill={bgColor} rx={4} />
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={color} />
      ))}
    </svg>
  )
}
