import type { LucideIcon } from 'lucide-react'
import {
  BrainCircuit,
  LifeBuoy,
  MonitorSmartphone,
  PenTool,
  ServerCog,
  Webhook,
} from 'lucide-react'

export type Service = {
  id: string
  title: string
  description: string
  features: string[]
  icon: LucideIcon
  /** Short prompt used to prefill the WhatsApp "discuss this service" link. */
  whatsappIntent: string
}

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description:
      'Modern, fast and responsive websites that look great and perform even better.',
    features: [
      'Business Websites',
      'E-commerce Platforms',
      'Landing Pages',
      'Custom Web Applications',
      'Dashboard Development',
    ],
    icon: MonitorSmartphone,
    whatsappIntent: 'I would like to discuss a web development project with Neurofix.',
  },
  {
    id: 'app-development',
    title: 'Application Development',
    description:
      'Powerful mobile and desktop applications built for your users and your business.',
    features: [
      'Android and iOS Applications',
      'React Native Development',
      'Cross-platform Applications',
      'API Integration',
      'Maintenance and Support',
    ],
    icon: Webhook,
    whatsappIntent: 'I would like to discuss a mobile application project with Neurofix.',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description:
      'Intuitive, engaging and user-centered interfaces designed to make every interaction meaningful.',
    features: ['Website UI/UX', 'Mobile App Design', 'Wireframing', 'Prototyping', 'Design Systems'],
    icon: PenTool,
    whatsappIntent: 'I would like to discuss UI/UX design work with Neurofix.',
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    description: 'Scalable digital solutions built around your unique business requirements.',
    features: [
      'Business Management Systems',
      'Admin Dashboards',
      'Automation',
      'Database-driven Applications',
      'Custom APIs',
    ],
    icon: ServerCog,
    whatsappIntent: 'I would like to discuss a custom software project with Neurofix.',
  },
  {
    id: 'ai-machine-learning',
    title: 'AI and Machine Learning',
    description:
      'Intelligent technology solutions that help automate processes and extract insights from data.',
    features: [
      'AI Integration',
      'Machine Learning Prototypes',
      'Data Analysis',
      'Computer Vision',
      'Intelligent Automation',
    ],
    icon: BrainCircuit,
    whatsappIntent: 'I would like to discuss an AI or machine learning project with Neurofix.',
  },
  {
    id: 'maintenance-support',
    title: 'Maintenance and Support',
    description:
      'Reliable technical support to keep your digital products secure, updated and running smoothly.',
    features: [
      'Bug Fixes',
      'Performance Optimization',
      'Security Updates',
      'Feature Improvements',
      'Technical Support',
    ],
    icon: LifeBuoy,
    whatsappIntent: 'I would like to discuss maintenance and support for an existing project.',
  },
]

/** Options for the contact form's "Service Required" dropdown. */
export const serviceOptions = [
  ...services.map((service) => service.title),
  'API Development and Integration',
  'Website Maintenance and Support',
  'Something else',
]

/** Selectable project budget ranges — intentionally optional on the form. */
export const budgetOptions = [
  'Not sure yet',
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $5,000',
  '$5,000+',
]
