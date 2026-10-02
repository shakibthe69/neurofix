import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently closest to the top of the viewport.
 *
 * Uses a single IntersectionObserver over the supplied ids, then resolves ties
 * by whichever section starts highest on the page — that keeps the active
 * indicator stable while scrolling in both directions.
 */
export function useScrollSpy(ids: string[], offset = 140): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }

        if (visible.size > 0) {
          // Pick the top-most visible section in document order.
          const next = ids.find((id) => visible.has(id))
          if (next) setActiveId(next)
          return
        }

        // Nothing intersects the band (e.g. in a tall section): fall back to
        // the last section whose top has scrolled past the offset line.
        const scrollY = window.scrollY
        let current = elements[0].id
        for (const el of elements) {
          if (el.offsetTop - offset <= scrollY) current = el.id
        }
        setActiveId(current)
      },
      {
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0, 0.25, 0.5, 1],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, offset])

  return activeId
}
