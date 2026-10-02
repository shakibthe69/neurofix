import { useEffect, useState } from 'react'

/**
 * Reports whether the browser can actually create a WebGL context.
 * Starts as `null` (unknown) so callers can render a neutral placeholder
 * instead of flashing the fallback before detection finishes.
 */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null)

  useEffect(() => {
    let ok = false
    try {
      const canvas = document.createElement('canvas')
      ok = Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext('webgl2') || canvas.getContext('webgl')),
      )
    } catch {
      ok = false
    }
    setSupported(ok)
  }, [])

  return supported
}
