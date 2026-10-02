import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, MessageCircle, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { navItems, site, whatsappLink } from '../data/site'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { cn } from '../lib/utils'
import { ButtonLink } from './ui/Button'
import { Logo } from './ui/Logo'

const sectionIds = navItems.map((item) => item.id)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(sectionIds)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { scrollY } = useScroll()
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24)
  })

  /** Smooth-scrolls to a section, offset by the sticky navbar height. */
  const goTo = useCallback(
    (id: string) => {
      const target = document.getElementById(id)
      if (!target) return

      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
      // Keep the URL shareable without triggering a second native jump.
      window.history.replaceState(null, '', `#${id}`)
      setMenuOpen(false)
    },
    [prefersReducedMotion],
  )

  // Close the mobile menu on Escape and return focus to the toggle.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  const quoteHref = useMemo(
    () =>
      whatsappLink(
        "Hi Neurofix, I'd like a quote for a project. Here's a short summary of what I need:",
      ),
    [],
  )

  return (
    <>
      <header
        className={cn(
          // `on-dark` gives focus rings a dark offset so they stay visible on
          // the transparent-over-hero and glass states.
          'on-dark fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled ? 'py-2.5' : 'py-4',
        )}
      >
        <div className="container-page">
          <nav
            aria-label="Primary"
            className={cn(
              'flex items-center justify-between gap-4 rounded-2xl px-3 py-2.5 transition-all duration-300 sm:px-4',
              scrolled
                ? 'glass-dark border border-white/10 bg-ink/70 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.9)]'
                : 'border border-transparent bg-transparent',
            )}
          >
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault()
                goTo('home')
              }}
              className="rounded-xl transition-opacity hover:opacity-90"
              aria-label={`${site.name} — back to top`}
            >
              <Logo variant="light" compact />
            </a>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const isActive = activeId === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={(event) => {
                        event.preventDefault()
                        goTo(item.id)
                      }}
                      className={cn(
                        'relative block rounded-full px-4 py-2 text-sm font-medium transition-colors',
                        isActive ? 'text-white' : 'text-slate-300/85 hover:text-white',
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/15"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-2">
              <ButtonLink
                href={quoteHref}
                external
                size="md"
                className="hidden sm:inline-flex"
                aria-label="Get a quote on WhatsApp"
              >
                Get a Quote
              </ButtonLink>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition hover:bg-white/12 lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="on-dark fixed inset-0 z-40 lg:hidden"
          >
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-ink/70 backdrop-blur-sm"
              tabIndex={-1}
            />

            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-3 top-20 overflow-hidden rounded-3xl border border-white/12 bg-ink-soft/95 p-4 shadow-lift backdrop-blur-xl"
            >
              <ul className="flex flex-col">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index + 0.06, duration: 0.28 }}
                  >
                    <a
                      href={`#${item.id}`}
                      aria-current={activeId === item.id ? 'true' : undefined}
                      onClick={(event) => {
                        event.preventDefault()
                        goTo(item.id)
                      }}
                      className={cn(
                        'flex items-center justify-between rounded-2xl px-4 py-3.5 text-[1.05rem] font-semibold transition',
                        activeId === item.id
                          ? 'bg-white/10 text-white'
                          : 'text-slate-200 hover:bg-white/[0.06]',
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full transition-opacity',
                          activeId === item.id
                            ? 'bg-brand-gradient opacity-100'
                            : 'opacity-0',
                        )}
                        aria-hidden="true"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-3 grid gap-2 border-t border-white/10 pt-4">
                <ButtonLink
                  href={quoteHref}
                  external
                  size="lg"
                  className="w-full"
                  srHint="(opens WhatsApp in a new tab)"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Get a Quote on WhatsApp
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
