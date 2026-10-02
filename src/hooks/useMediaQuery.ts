import { useEffect, useState } from 'react'

/**
 * Subscribes to a CSS media query. Returns `false` during the first render so
 * the server/prerender pass and hydration stay consistent.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)

    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True on tablet/desktop widths where the richer layout is available. */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}

/** True when the visitor asked the OS to reduce motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
