import { ArrowUp, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react'
import { services } from '../data/services'
import { contact, founder, navItems, site, whatsappLink } from '../data/site'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { Logo } from './ui/Logo'

const year = site.copyrightYear

export function Footer() {
  const prefersReducedMotion = usePrefersReducedMotion()

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    document.getElementById('home')?.focus?.({ preventScroll: true })
  }

  return (
    <footer className="on-dark relative isolate overflow-hidden bg-ink pt-16 text-slate-400">
      <div className="absolute inset-0 -z-10 bg-grid-overlay opacity-40" aria-hidden="true" />
      <div
        className="absolute -left-32 top-0 -z-10 h-[320px] w-[320px] rounded-full bg-brand-500/15 blur-[130px]"
        aria-hidden="true"
      />

      <div className="container-page">
        <div className="grid gap-12 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed">{site.description}</p>
            <p className="mt-4 text-[0.86rem] font-semibold text-brand-200">{site.tagline}</p>

            {/* Only profiles that actually exist are linked here. */}
            <ul className="mt-6 flex items-center gap-2.5">
              <li>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Neurofix founder on LinkedIn (opens in a new tab)"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-slate-300 transition hover:border-white/30 hover:text-white"
                >
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink('Hi Neurofix, I would like to discuss a project.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message Neurofix on WhatsApp (opens in a new tab)"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-slate-300 transition hover:border-white/30 hover:text-white"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={contact.email}
                  aria-label={`Email Neurofix at ${founder.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-slate-300 transition hover:border-white/30 hover:text-white"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-labelledby="footer-nav-heading">
            <h2
              id="footer-nav-heading"
              className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white"
            >
              Quick Links
            </h2>
            <ul className="mt-5 space-y-3 text-[0.92rem]">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="transition-colors hover:text-white focus-visible:ring-offset-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-labelledby="footer-services-heading">
            <h2
              id="footer-services-heading"
              className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white"
            >
              Services
            </h2>
            <ul className="mt-5 space-y-3 text-[0.92rem]">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="transition-colors hover:text-white focus-visible:ring-offset-ink"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2
              id="footer-contact-heading"
              className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white"
            >
              Get in Touch
            </h2>
            <ul className="mt-5 space-y-4 text-[0.92rem]">
              <li>
                <a
                  href={contact.email}
                  className="flex items-start gap-3 transition-colors hover:text-white focus-visible:ring-offset-ink"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                  <span className="break-all">{founder.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-white focus-visible:ring-offset-ink"
                >
                  <MessageCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-300"
                    aria-hidden="true"
                  />
                  <span>
                    {founder.phoneDisplay}
                    <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-white focus-visible:ring-offset-ink"
                >
                  <Linkedin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                  <span>
                    MD Shakib Ahmed
                    <span className="sr-only"> on LinkedIn (opens in a new tab)</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                <span>{site.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-gradient opacity-60" aria-hidden="true" />

        <div className="flex flex-col items-center justify-between gap-5 py-7 sm:flex-row">
          <p className="text-center text-[0.84rem] sm:text-left">
            © {year} {site.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={backToTop}
            className="btn border border-white/12 bg-white/[0.04] px-5 py-2.5 text-slate-200 hover:border-white/30 hover:text-white"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
