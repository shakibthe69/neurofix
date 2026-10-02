import { motion } from 'framer-motion'
import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useWebGLSupport } from '../../hooks/useWebGLSupport'
import { Hero3DFallback, Hero3DSkeleton } from './Hero3DFallback'

/**
 * Three.js + the scene graph are ~500KB combined, so they are split out of the
 * main bundle and only fetched once this component is near the viewport.
 */
const Hero3DScene = lazy(() => import('./Hero3DScene'))

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const webglSupported = useWebGLSupport()
  const isSmallScreen = useMediaQuery('(max-width: 767px)')

  // Defer the 3D chunk until the hero is actually on screen. It usually is,
  // but this keeps the initial JavaScript payload small on slow connections.
  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Screen-reader description of the decorative 3D composition.
  const sceneLabel =
    'Animated 3D illustration of a laptop and smartphone displaying Neurofix website and mobile application interfaces, surrounded by floating geometric shapes.'

  return (
    <div ref={containerRef} className="relative">
      {/* Soft brand halo behind the scene */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gradient-soft blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="relative"
      >
        {webglSupported === false ? (
          <Hero3DFallback />
        ) : !shouldLoad || webglSupported === null ? (
          <Hero3DSkeleton />
        ) : (
          <Suspense fallback={<Hero3DSkeleton />}>
            <div
              className="relative mx-auto aspect-square w-full max-w-[620px]"
              role="img"
              aria-label={sceneLabel}
            >
              <Hero3DScene quality={isSmallScreen ? 'low' : 'high'} />
            </div>
          </Suspense>
        )}
      </motion.div>
    </div>
  )
}
