import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'ghostLight' | 'ghostDark' | 'solidDark'
type Size = 'md' | 'lg'

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  ghostLight: 'btn-ghost-light',
  ghostDark: 'btn-ghost-dark',
  solidDark: 'bg-ink text-white hover:bg-ink-soft',
}

const sizeClass: Record<Size, string> = {
  md: 'btn-md',
  lg: 'btn-lg',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>

/** A real `<button>` — use for actions and form submits. */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn('btn', variantClass[variant], sizeClass[size], className)}
      {...rest}
    >
      {children}
    </button>
  )
}

type ButtonLinkProps = CommonProps & {
  href: string
  /** Adds target/rel for external destinations while keeping them accessible. */
  external?: boolean
  /** Screen-reader hint for links that open in a new tab or app. */
  srHint?: string
  'aria-label'?: string
}

/**
 * An `<a>` styled as a button. External links open in a new tab with
 * `noopener noreferrer`, and an optional visually-hidden hint announces the
 * new-context behaviour to screen readers.
 */
export function ButtonLink({
  href,
  external,
  variant = 'primary',
  size = 'md',
  className,
  children,
  srHint,
  ...rest
}: ButtonLinkProps) {
  const relProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <a
      href={href}
      className={cn('btn', variantClass[variant], sizeClass[size], className)}
      {...relProps}
      {...rest}
    >
      {children}
      {srHint && <span className="sr-only">{srHint}</span>}
    </a>
  )
}
