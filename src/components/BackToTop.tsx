import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { ScrollToTopLink } from './ui/ScrollToTopLink'

/** Floating shortcut that fades in after the visitor has scrolled a screenful. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 700)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-5 z-40 sm:bottom-8 sm:right-8"
        >
          <ScrollToTopLink iconOnly tone="solid" label="Back to top" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
