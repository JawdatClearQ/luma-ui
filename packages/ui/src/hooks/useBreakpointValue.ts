import { useMediaQuery } from './useMediaQuery'

const breakpointMap: Record<string, string> = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
}

export function useBreakpointValue<T>(values: Record<string, T>, defaultValue?: T): T {
  const breakpoints = Object.keys(values).sort(
    (a, b) => (breakpointMap[a] ? parseInt(breakpointMap[a].match(/\d+/)![0]) : 0) -
      (breakpointMap[b] ? parseInt(breakpointMap[b].match(/\d+/)![0]) : 0)
  )

  const queries = breakpoints.reduce<Record<string, boolean>>(
    (acc, key) => {
      const mq = breakpointMap[key]
      if (mq) {
        acc[key] = useMediaQuery(mq)
      }
      return acc
    },
    {}
  )

  for (let i = breakpoints.length - 1; i >= 0; i--) {
    const key = breakpoints[i]
    if (queries[key]) {
      return values[key]
    }
  }

  return defaultValue ?? values[breakpoints[0]]
}
