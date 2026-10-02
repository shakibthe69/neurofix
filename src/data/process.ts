import type { LucideIcon } from 'lucide-react'
import { CalendarCheck, Code2, LifeBuoy, Rocket, ShieldCheck, Sparkles, Users } from 'lucide-react'

export type ProcessStep = {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Planning',
    description:
      'We understand your goals, requirements and vision to create a clear project plan.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Design & Development',
    description:
      'We design and develop your solution with modern technologies and a user-focused approach.',
    icon: Code2,
  },
  {
    number: '03',
    title: 'Testing & Review',
    description:
      'We test functionality, responsiveness, usability and performance, and refine the product based on feedback.',
    icon: CalendarCheck,
  },
  {
    number: '04',
    title: 'Launch & Support',
    description:
      'We help deploy your product and provide agreed maintenance and technical support.',
    icon: Rocket,
  },
]

export type Principle = {
  title: string
  description: string
  icon: LucideIcon
}

/** Key principles shown in the About section. */
export const principles: Principle[] = [
  {
    title: 'On-Time Delivery',
    description: 'We respect your time and deliver according to agreed project schedules.',
    icon: CalendarCheck,
  },
  {
    title: 'Clean & Scalable Code',
    description: 'We build with performance, maintainability and future growth in mind.',
    icon: Code2,
  },
  {
    title: 'Dedicated Support',
    description:
      "We're with you throughout development and after launch, based on the agreed support plan.",
    icon: LifeBuoy,
  },
]

/** Feature blocks for the "Why Work With Us?" section. */
export const whyChooseUs: Principle[] = [
  {
    title: 'Tailored Solutions',
    description: 'Products designed around your business needs.',
    icon: Sparkles,
  },
  {
    title: 'Modern Technologies',
    description: 'Thoughtful use of suitable modern tools and frameworks.',
    icon: Code2,
  },
  {
    title: 'Transparent Communication',
    description: 'Clear discussions, project updates and agreed deliverables.',
    icon: Users,
  },
  {
    title: 'Ongoing Support',
    description: 'Maintenance and assistance based on your service agreement.',
    icon: ShieldCheck,
  },
]
