import { cn } from '../../lib/utils'
import { assets, site } from '../../data/site'

type LogoProps = {
  /** Renders light text for dark backgrounds and vice versa. */
  variant?: 'dark' | 'light'
  className?: string
  /** Hides the wordmark on very small screens when set. */
  compact?: boolean
}

/**
 * Lockup of the supplied Neurofix mark plus the company name.
 *
 * The source logo is a wide 1408x768 JPEG on a light background, so it sits in
 * a rounded white tile. That keeps it legible over both the dark hero and the
 * light sections without recolouring or distorting it.
 */
export function Logo({ variant = 'dark', className, compact = false }: LogoProps) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-[0_4px_14px_-6px_rgba(8,13,25,0.5)] ring-1 ring-black/10">
        <img
          src={assets.logo}
          alt=""
          width={1408}
          height={768}
          className="h-full w-full object-contain"
          decoding="async"
        />
      </span>
      <span className={cn('flex flex-col leading-none', compact && 'hidden sm:flex')}>
        <span
          className={cn(
            'text-[1.05rem] font-extrabold tracking-tight',
            variant === 'dark' ? 'text-ink' : 'text-white',
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            'mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em]',
            variant === 'dark' ? 'text-body' : 'text-brand-200/80',
          )}
        >
          Software Studio
        </span>
      </span>
    </span>
  )
}
