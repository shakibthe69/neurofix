/**
 * Portfolio entries.
 *
 * IMPORTANT: These are self-initiated concept/demo builds, not client work.
 * `kind` drives the visible "Demo" / "Concept Project" badge on every card so
 * they can never be mistaken for completed client engagements. When real
 * projects are available, add `url` to unlock the "View Project" link.
 */

export type ProjectCategory = 'web' | 'mobile' | 'ui-ux'

export type Project = {
  id: string
  name: string
  description: string
  tags: string[]
  category: ProjectCategory
  /** Visible honesty label shown on the card. */
  kind: 'Demo' | 'Concept Project'
  /** Which abstract UI mockup the card renders (see ProjectMock). */
  mock: 'commerce' | 'dashboard' | 'mobile' | 'booking'
  /** Only present for real, publicly reachable work. */
  url?: string
}

export const projectCategories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ui-ux', label: 'UI/UX' },
]

export const projects: Project[] = [
  {
    id: 'ecommerce-demo',
    name: 'E-commerce Website Demo',
    description:
      'A storefront concept with product listing, filtering, cart flow and a checkout summary.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    category: 'web',
    kind: 'Demo',
    mock: 'commerce',
  },
  {
    id: 'business-dashboard-demo',
    name: 'Business Management Dashboard Demo',
    description:
      'An admin dashboard concept covering KPIs, charts, data tables and role-based navigation.',
    tags: ['React', 'REST APIs', 'Charts'],
    category: 'web',
    kind: 'Demo',
    mock: 'dashboard',
  },
  {
    id: 'mobile-app-ui-demo',
    name: 'Mobile Application UI Demo',
    description:
      'A cross-platform app interface concept with onboarding, feed and profile screens.',
    tags: ['React Native', 'Expo', 'UI/UX'],
    category: 'mobile',
    kind: 'Concept Project',
    mock: 'mobile',
  },
  {
    id: 'clinic-booking-demo',
    name: 'Clinic Appointment Booking Demo',
    description:
      'A booking flow concept with doctor selection, time-slot picking and confirmation steps.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    category: 'ui-ux',
    kind: 'Concept Project',
    mock: 'booking',
  },
]
