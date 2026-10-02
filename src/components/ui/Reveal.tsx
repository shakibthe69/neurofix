import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, revealViewport } from '../../lib/motion'
import { cn } from '../../lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Seconds to wait before animating in — used to stagger siblings. */
  delay?: number
  as?: 'div' | 'li' | 'section' | 'span'
}

/**
 * Fades + rises its children into view once. Motion is expressed through
 * Framer Motion variants so `prefers-reduced-motion` is handled globally by
 * the `MotionConfig` in App.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={cn(className)}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </Tag>
  )
}
