export const fadeIn = {
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

export const slideUp = {
  enter: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: 10 },
}

export const slideDown = {
  enter: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: -10 },
}

export const scale = {
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export const spin = {
  from: { rotate: '0deg' },
  to: { rotate: '360deg' },
}
