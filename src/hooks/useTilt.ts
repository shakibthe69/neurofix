import { useCallback, useRef } from 'react'
import { usePrefersReducedMotion } from './useMediaQuery'

type TiltOptions = {
  /** Maximum rotation in degrees along each axis. */
  max?: number
  /** CSS transition applied while the pointer moves. */
  transition?: string
}

/**
 * Applies a subtle pointer-reactive 3D tilt to the returned ref's element.
 *
 * The rotation is written straight to `style.transform` (not React state) so
 * pointer movement never triggers a re-render. Disabled automatically when the
 * visitor prefers reduced motion or uses a coarse (touch) pointer.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  max = 7,
  transition = 'transform 180ms ease-out',
}: TiltOptions = {}) {
  const ref = useRef<T | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const onPointerMove = useCallback(
    (event: React.PointerEvent<T>) => {
      const node = ref.current
      if (!node || prefersReducedMotion) return
      if (event.pointerType !== 'mouse') return

      const rect = node.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5

      node.style.transition = transition
      node.style.transform = `perspective(1100px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`
    },
    [max, prefersReducedMotion, transition],
  )

  const onPointerLeave = useCallback(() => {
    const node = ref.current
    if (!node) return
    node.style.transition = 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)'
    node.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)'
  }, [])

  return { ref, onPointerMove, onPointerLeave }
}
