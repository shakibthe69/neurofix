import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'
import { useForm, type FieldErrors } from 'react-hook-form'
import { budgetOptions, serviceOptions } from '../data/services'
import { contact, founder, mailtoLink, site, whatsappLink } from '../data/site'
import { cn } from '../lib/utils'
import { SectionHeading } from './ui/SectionHeading'

/* ------------------------------------------------------------------ */
/* Form types + helpers                                                */
/* ------------------------------------------------------------------ */

type ContactFormValues = {
  fullName: string
  email: string
  phone: string
  service: string
  budget: string
  details: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
/** Permissive phone check: digits, spaces, +, -, (), 7–20 chars. */
const PHONE_PATTERN = /^[+()\d\s-]{7,20}$/

/** Turns form values into one readable block shared by both delivery methods. */
function composeMessage(values: ContactFormValues): string {
  return [
    'New project enquiry from the Neurofix website',
    '',
    `Name: ${values.fullName}`,
    `Email: ${values.email}`,
    values.phone ? `Phone: ${values.phone}` : null,
    `Service required: ${values.service}`,
    values.budget ? `Project budget: ${values.budget}` : null,
    '',
    'Project details:',
    values.details,
  ]
    .filter((line): line is string => line !== null)
    .join('\n')
}

const firstErrorField = (errors: FieldErrors<ContactFormValues>) =>
  (['fullName', 'email', 'phone', 'service', 'budget', 'details'] as const).find(
    (field) => errors[field],
  )

/* ------------------------------------------------------------------ */
/* Small form building blocks                                          */
/* ------------------------------------------------------------------ */

type FieldShellProps = {
  id: string
  label: string
  required?: boolean
  error?: string
  optional?: boolean
  children: ReactNode
}

function FieldShell({ id, label, required, optional, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="font-normal text-body">(optional)</span>}
        {required && (
          <>
            <span className="field-required" aria-hidden="true" />
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="field-error">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Contact details                                                     */
/* ------------------------------------------------------------------ */

const contactMethods = [
  {
    label: 'Phone / WhatsApp',
    value: founder.phoneDisplay,
    href: contact.whatsapp,
    icon: MessageCircle,
    external: true,
    note: 'Fastest way to reach us',
  },
  {
    label: 'Email',
    value: founder.email,
    href: contact.email,
    icon: Mail,
    external: false,
    note: 'Usually replies within a day',
  },
  {
    label: 'LinkedIn',
    value: 'MD Shakib Ahmed',
    href: contact.linkedin,
    icon: Linkedin,
    external: true,
    note: 'Connect professionally',
  },
] as const

export function Contact() {
  const formId = useId()
  const [status, setStatus] = useState<'idle' | 'working' | 'ready'>('idle')
  const [deliveredVia, setDeliveredVia] = useState<'whatsapp' | 'email' | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      service: '',
      budget: '',
      details: '',
    },
  })

  /**
   * There is no backend on this site, so the form does not "submit" anywhere.
   * Instead it validates the input locally and hands a fully formatted message
   * to the visitor's own WhatsApp or email client — the messages can only ever
   * be sent by the person filling in the form.
   */
  const deliver = async (channel: 'whatsapp' | 'email', values: ContactFormValues) => {
    setStatus('working')
    const message = composeMessage(values)

    // Let the loading state paint before handing off to the external client.
    await new Promise((resolve) => window.setTimeout(resolve, 350))

    if (channel === 'whatsapp') {
      window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = mailtoLink(`Project enquiry — ${values.service}`, message)
    }

    setDeliveredVia(channel)
    setStatus('ready')
  }

  const onInvalid = (formErrors: FieldErrors<ContactFormValues>) => {
    const field = firstErrorField(formErrors)
    if (!field) return
    // Move focus to the first invalid control so keyboard and screen-reader
    // users land exactly where the problem is.
    document.getElementById(`${formId}-${field}`)?.focus()
  }

  const busy = isSubmitting || status === 'working'

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-y relative overflow-hidden bg-mist"
    >
      <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-violet-500/[0.08] blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Get in Touch"
          titleId="contact-heading"
          title="Let's Build Something Great Together"
          description="Have an idea, a project or a business challenge? Let's discuss how Neurofix can help bring your vision to life."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.82fr_1fr] lg:gap-10">
          {/* ---------------- Contact details ---------------- */}
          <div className="space-y-4">
            <ul className="space-y-3">
              {contactMethods.map((method) => {
                const Icon = method.icon
                return (
                  <li key={method.label}>
                    <a
                      href={method.href}
                      {...(method.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="card card-hover group flex items-center gap-4 p-5"
                    >
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient-soft ring-1 ring-inset ring-brand-500/15 transition-transform duration-300 group-hover:scale-105"
                        aria-hidden="true"
                      >
                        <Icon className="h-5 w-5 text-brand-600" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-body">
                          {method.label}
                        </span>
                        <span className="mt-1 block truncate font-bold text-ink">
                          {method.value}
                        </span>
                        <span className="mt-0.5 block text-[0.8rem] text-body">{method.note}</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="card flex items-center gap-4 p-5">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient-soft ring-1 ring-inset ring-brand-500/15"
                aria-hidden="true"
              >
                <MapPin className="h-5 w-5 text-brand-600" />
              </span>
              <span>
                <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-body">
                  Location
                </span>
                <span className="mt-1 block font-bold text-ink">{site.location}</span>
                <span className="mt-0.5 block text-[0.8rem] text-body">
                  Working with clients remotely
                </span>
              </span>
            </div>

            {/* Lightweight location illustration (decorative) */}
            <div className="relative overflow-hidden rounded-3xl border border-ink/[0.07] bg-ink p-6">
              <svg
                viewBox="0 0 320 120"
                role="img"
                aria-label={`Illustration marking ${site.location} as the studio location`}
                className="h-28 w-full"
              >
                <defs>
                  <linearGradient id="mapGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3478F6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#8054F6" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <circle cx="160" cy="60" r="54" fill="url(#mapGlow)" opacity="0.35" />
                <circle cx="160" cy="60" r="54" fill="none" stroke="#5E8CFA" strokeOpacity="0.35" />
                <circle cx="160" cy="60" r="34" fill="none" stroke="#8054F6" strokeOpacity="0.3" />
                <circle cx="160" cy="60" r="5" fill="#ffffff" />
                <circle cx="160" cy="60" r="11" fill="none" stroke="#8FAEFF" strokeOpacity="0.7" />
                <path
                  d="M20 96 C 70 74, 110 104, 160 60 C 210 16, 250 46, 300 24"
                  fill="none"
                  stroke="#5E8CFA"
                  strokeOpacity="0.4"
                  strokeDasharray="4 6"
                />
              </svg>
              <p className="mt-2 text-center text-[0.82rem] text-slate-300">
                Based in {site.location} · available for remote projects worldwide
              </p>
            </div>
          </div>

          {/* ---------------- Form ---------------- */}
          <div className="card p-6 sm:p-8">
            <h3 className="text-display-sm font-bold text-ink">Tell us about your project</h3>
            <p className="mt-2 text-[0.92rem] text-body">
              Fill in the details and send them straight to us through WhatsApp or email.
            </p>

            {/* Transparency: no backend is pretending to receive this. */}
            <p className="mt-4 flex items-start gap-2.5 rounded-2xl border border-brand-500/20 bg-brand-500/[0.06] px-4 py-3 text-[0.82rem] text-slate-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              <span>
                This form has no server behind it. When you continue, your details open in your own
                WhatsApp or email app so <strong>you</strong> send the message. Nothing is stored on
                this website.
              </span>
            </p>

            <form
              className="mt-7 space-y-5"
              noValidate
              onSubmit={handleSubmit(
                (values) => deliver('whatsapp', values),
                onInvalid,
              )}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FieldShell
                  id={`${formId}-fullName`}
                  label="Full Name"
                  required
                  error={errors.fullName?.message}
                >
                  <input
                    id={`${formId}-fullName`}
                    type="text"
                    autoComplete="name"
                    className={cn('field', errors.fullName && 'field-invalid')}
                    placeholder="Your name"
                    aria-invalid={errors.fullName ? true : undefined}
                    aria-describedby={errors.fullName ? `${formId}-fullName-error` : undefined}
                    {...register('fullName', {
                      required: 'Please enter your name.',
                      minLength: { value: 2, message: 'Please enter at least 2 characters.' },
                    })}
                  />
                </FieldShell>

                <FieldShell
                  id={`${formId}-email`}
                  label="Email Address"
                  required
                  error={errors.email?.message}
                >
                  <input
                    id={`${formId}-email`}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    className={cn('field', errors.email && 'field-invalid')}
                    placeholder="you@example.com"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                    {...register('email', {
                      required: 'Please enter your email address.',
                      pattern: {
                        value: EMAIL_PATTERN,
                        message: 'Please enter a valid email address.',
                      },
                    })}
                  />
                </FieldShell>

                <FieldShell
                  id={`${formId}-phone`}
                  label="Phone Number"
                  optional
                  error={errors.phone?.message}
                >
                  <input
                    id={`${formId}-phone`}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className={cn('field', errors.phone && 'field-invalid')}
                    placeholder="+880 1XXX XXXXXX"
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                    {...register('phone', {
                      validate: (value) =>
                        !value || PHONE_PATTERN.test(value.trim())
                          ? true
                          : 'Please enter a valid phone number, or leave this blank.',
                    })}
                  />
                </FieldShell>

                <FieldShell
                  id={`${formId}-service`}
                  label="Service Required"
                  required
                  error={errors.service?.message}
                >
                  <div className="relative">
                    <select
                      id={`${formId}-service`}
                      defaultValue=""
                      className={cn('field appearance-none pr-11', errors.service && 'field-invalid')}
                      aria-invalid={errors.service ? true : undefined}
                      aria-describedby={errors.service ? `${formId}-service-error` : undefined}
                      {...register('service', { required: 'Please choose a service.' })}
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-body"
                      aria-hidden="true"
                    />
                  </div>
                </FieldShell>
              </div>

              <FieldShell
                id={`${formId}-budget`}
                label="Project Budget"
                optional
                error={errors.budget?.message}
              >
                <div className="relative">
                  <select
                    id={`${formId}-budget`}
                    defaultValue=""
                    className="field appearance-none pr-11"
                    {...register('budget')}
                  >
                    <option value="">Prefer not to say</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-body"
                    aria-hidden="true"
                  />
                </div>
              </FieldShell>

              <FieldShell
                id={`${formId}-details`}
                label="Project Details"
                required
                error={errors.details?.message}
              >
                <textarea
                  id={`${formId}-details`}
                  rows={5}
                  className={cn('field resize-y', errors.details && 'field-invalid')}
                  placeholder="What are you building? Share your goals, key features, timeline or anything else that helps."
                  aria-invalid={errors.details ? true : undefined}
                  aria-describedby={errors.details ? `${formId}-details-error` : undefined}
                  {...register('details', {
                    required: 'Please describe your project.',
                    minLength: {
                      value: 20,
                      message: 'Please add a little more detail (at least 20 characters).',
                    },
                  })}
                />
              </FieldShell>

              <p className="text-[0.78rem] leading-relaxed text-body">
                <strong className="font-semibold text-ink">Privacy:</strong> your details are used
                only to reply to this enquiry and are shared with no one else. Removing your data is
                as simple as asking us to delete the conversation.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={busy}
                  className="btn btn-primary btn-lg flex-1"
                  aria-busy={busy}
                >
                  {busy ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Preparing message…
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Send via WhatsApp
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={busy}
                  onClick={handleSubmit(
                    (values) => deliver('email', values),
                    onInvalid,
                  )}
                  className="btn btn-ghost-light btn-lg flex-1"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send via Email
                </button>
              </div>

              {/* ---- Success state ---- */}
              <AnimatePresence>
                {status === 'ready' && deliveredVia && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    role="status"
                    aria-live="polite"
                    className="flex items-start gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-50 px-4 py-3.5"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    <div className="text-[0.88rem] text-emerald-900">
                      <p className="font-semibold">
                        {deliveredVia === 'whatsapp'
                          ? 'Your message is ready in WhatsApp.'
                          : 'Your email draft is ready.'}
                      </p>
                      <p className="mt-1">
                        {deliveredVia === 'whatsapp'
                          ? 'Press send in WhatsApp to deliver it to Neurofix. If the app did not open, '
                          : 'Press send in your email app to deliver it. If nothing opened, '}
                        <a
                          href={deliveredVia === 'whatsapp' ? contact.whatsapp : contact.email}
                          {...(deliveredVia === 'whatsapp'
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="font-semibold underline decoration-emerald-600/40 underline-offset-2 hover:decoration-emerald-600"
                        >
                          use this link
                        </a>{' '}
                        instead.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          reset()
                          setStatus('idle')
                          setDeliveredVia(null)
                        }}
                        className="mt-2.5 text-[0.82rem] font-semibold text-emerald-700 underline decoration-emerald-600/40 underline-offset-2 hover:decoration-emerald-600"
                      >
                        Send another enquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-center text-[0.78rem] text-body">
                Prefer to just message us?{' '}
                <a
                  href={whatsappLink('Hi Neurofix, I have a project I would like to discuss.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-600 underline decoration-brand-500/30 underline-offset-2 hover:decoration-brand-500"
                >
                  Open WhatsApp
                </a>{' '}
                or{' '}
                <a
                  href={contact.email}
                  className="font-semibold text-brand-600 underline decoration-brand-500/30 underline-offset-2 hover:decoration-brand-500"
                >
                  send an email
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
