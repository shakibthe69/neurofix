export type TechCategory = {
  id: string
  label: string
  /** One-line note explaining where this group fits in a typical build. */
  note: string
  items: { name: string; /** Short mark shown on the tile. */ mark: string }[]
}

export const techStack: TechCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    note: 'Interfaces, design systems and client-side apps.',
    items: [
      { name: 'HTML5', mark: 'H5' },
      { name: 'CSS3', mark: 'C3' },
      { name: 'JavaScript', mark: 'JS' },
      { name: 'TypeScript', mark: 'TS' },
      { name: 'React', mark: 'Re' },
      { name: 'Next.js', mark: 'N' },
      { name: 'Tailwind CSS', mark: 'Tw' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    note: 'Cross-platform apps shipped to Android and iOS.',
    items: [
      { name: 'React Native', mark: 'RN' },
      { name: 'Expo', mark: 'Ex' },
      { name: 'Flutter', mark: 'Fl' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    note: 'APIs, business logic and integrations.',
    items: [
      { name: 'Node.js', mark: 'No' },
      { name: 'Express.js', mark: 'Ex' },
      { name: 'Spring Boot', mark: 'Sb' },
      { name: 'REST APIs', mark: 'API' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    note: 'Storing and modelling application data.',
    items: [
      { name: 'MySQL', mark: 'My' },
      { name: 'MongoDB', mark: 'Mg' },
      { name: 'PostgreSQL', mark: 'Pg' },
    ],
  },
  {
    id: 'ai-data',
    label: 'AI & Data',
    note: 'Analysis, automation and machine learning.',
    items: [
      { name: 'Python', mark: 'Py' },
      { name: 'TensorFlow', mark: 'Tf' },
      { name: 'Scikit-learn', mark: 'Sk' },
      { name: 'OpenCV', mark: 'Cv' },
    ],
  },
]

/** Short labels that float around the 3D hero scene. */
export const heroTechLabels = ['React', 'Next.js', 'Node.js', 'Flutter', 'Python', 'TypeScript']
