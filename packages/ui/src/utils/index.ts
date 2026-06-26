function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function isTouchDevice(): boolean {
  return typeof window !== 'undefined' && 'ontouchstart' in window
}

function generateId(prefix = 'luma'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`
}
