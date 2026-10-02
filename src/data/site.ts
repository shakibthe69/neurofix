/**
 * Single source of truth for company details, contact links and navigation.
 * Everything user-facing that is not section copy lives here.
 */

export const site = {
  name: 'Neurofix',
  tagline: 'Your Ideas. Our Code. Real Solutions.',
  industry: 'Software Development and IT Solutions',
  description:
    'Neurofix is a modern software development studio helping startups, entrepreneurs and businesses turn ideas into reliable digital products.',
  location: 'Dhaka, Bangladesh',
  copyrightYear: 2026,
} as const

export const founder = {
  name: 'MD SHAKIB AHMED',
  role: 'Founder & CEO',
  email: 'shakibthe69@gmail.com',
  phoneDisplay: '01701660169',
  phoneHref: 'tel:+8801701660169',
  linkedin: 'https://www.linkedin.com/in/shakib-ahmed-a83bb2434',
  image: '/assets/shakib-ahmed.png',
  imageAlt: 'MD Shakib Ahmed, Founder and CEO of Neurofix',
} as const

/** Phone number in international format, used for every wa.me deep link. */
export const WHATSAPP_NUMBER = '8801701660169'

export const contact = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  email: `mailto:${founder.email}`,
  linkedin: founder.linkedin,
  phone: founder.phoneHref,
} as const

/**
 * Opens WhatsApp with a prefilled message. The number and text are both
 * URL-encoded so the link survives any modern client.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/** Opens the default mail client with a prefilled subject + body. */
export function mailtoLink(subject: string, body: string): string {
  return `mailto:${founder.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export type NavItem = {
  /** Must match a section element id in the page. */
  id: string
  label: string
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

export const assets = {
  logo: '/assets/logo.jpg',
  logoAlt: 'Neurofix company logo',
  founder: founder.image,
} as const
