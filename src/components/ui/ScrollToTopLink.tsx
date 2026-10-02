import { ArrowUp } from 'lucide-react'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/utils'

type Props = {
  className?: string
  label?: string
  /** Renders only the icon, for the floating back-to-top button. */
  iconOnly?: boolean
  /**
   * 'solid' is a dark button that stays legible over both the light content
   * sections and the dark footer; 'ghost' suits placement on a dark surface.
   */
  tone?: 'solid' | 'ghost'
}

/** Scrolls the window back to the top, honouring reduced-motion preferences. */
export function ScrollToTopLink({
  className,
  label = 'Back to top',
  iconOnly = false,
  tone = 'ghost',
}: Props) {
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    // `#home` has tabIndex={-1}, so focus can move there without adding it to
    // the tab order — keyboard users continue from the top of the page.
    document.getElementById('home')?.focus?.({ preventScroll: true })
  }

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full transition duration-200',
          tone === 'solid'
            ? 'bg-ink text-white shadow-lift ring-1 ring-white/10 hover:bg-ink-soft'
            : 'border border-white/15 bg-white/[0.06] text-white hover:bg-white/12',
          className,
        )}
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>
    )
  }

  return (
    <button type="button" onClick={handleClick} className={cn('btn btn-ghost-dark btn-lg', className)}>
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  )
}
