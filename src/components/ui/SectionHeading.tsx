import { cn } from '../../lib/utils'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  /** Colour scheme of the section this heading sits in. */
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  /** Optional id applied to the heading for aria-labelledby wiring. */
  titleId?: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'center',
  titleId,
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  const isDark = tone === 'dark'

  return (
    <div
      className={cn(
        'flex flex-col',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <Reveal>
        <span className={cn('eyebrow', isDark && 'eyebrow-dark')}>{eyebrow}</span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          id={titleId}
          className={cn(
            'mt-5 text-display-lg font-extrabold',
            isDark && 'text-white',
            isCenter && 'mx-auto max-w-3xl',
          )}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.14}>
          <p
            className={cn(
              'mt-4 max-w-2xl text-[1.02rem] leading-relaxed',
              isDark ? 'text-slate-300/85' : 'text-body',
              isCenter && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
