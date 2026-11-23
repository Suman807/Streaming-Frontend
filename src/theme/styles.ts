import type { CSSProperties } from 'react'
import type { MotionProps } from 'framer-motion'

/** Shiny headline gradient. Pair with the `animate-shiny` class. */
export const gradientStyle: CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  filter: 'url(#c3-noise)',
}

/** cubic-bezier(.22,1,.36,1) */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Fade + rise when the element scrolls into view. */
export const reveal = (delay = 0, y = 20): MotionProps => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, delay, ease: EASE },
})

export const pillPrimary =
  'group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm px-5 py-3 transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none'

export const pillGhost =
  'inline-flex items-center justify-center gap-2 rounded-full border border-white/15 text-white text-sm font-medium px-5 py-3 transition-colors hover:bg-white/5'

export const pageShell =
  'relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white selection:bg-brand/30'
