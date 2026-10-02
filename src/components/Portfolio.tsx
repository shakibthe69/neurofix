import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Info, Link2Off } from 'lucide-react'
import { useMemo, useState } from 'react'
import { projectCategories, projects, type Project, type ProjectCategory } from '../data/projects'
import { whatsappLink } from '../data/site'
import { useTilt } from '../hooks/useTilt'
import { cn } from '../lib/utils'
import { ProjectMock } from './ProjectMock'
import { ButtonLink } from './ui/Button'
import { SectionHeading } from './ui/SectionHeading'

type FilterId = ProjectCategory | 'all'

const categoryLabel = (id: ProjectCategory) =>
  projectCategories.find((category) => category.id === id)?.label ?? id

/**
 * A single project card.
 *
 * Kept as its own component so each card owns an independent `useTilt` ref —
 * hooks cannot be called inside a `.map()`.
 */
function ProjectCard({ project }: { project: Project }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLLIElement>({ max: 5 })

  return (
    <motion.li
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="h-full will-change-transform"
    >
      <article className="card card-hover group flex h-full flex-col overflow-hidden">
        {/* Mockup */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <ProjectMock variant={project.mock} />

          <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-ink/80 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
            {project.kind}
          </span>

          <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-ink/80 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand-200 backdrop-blur-md">
            {categoryLabel(project.category)}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-[1.08rem] font-bold leading-snug text-ink">{project.name}</h3>
          <p className="mt-2 text-[0.9rem] leading-relaxed">{project.description}</p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-mist px-2.5 py-1 text-[0.7rem] font-semibold text-slate-600 ring-1 ring-inset ring-ink/[0.05]"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex-1" />

          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-600 transition-colors hover:text-violet-600"
            >
              View Project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <p className="inline-flex items-center gap-2 self-start text-[0.82rem] font-medium text-slate-400">
              <Link2Off className="h-4 w-4" aria-hidden="true" />
              No public link yet
            </p>
          )}
        </div>
      </article>
    </motion.li>
  )
}

export function Portfolio() {
  const [filter, setFilter] = useState<FilterId>('all')

  const visibleProjects = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  )

  const counts = useMemo(
    () =>
      projectCategories.reduce<Record<string, number>>((acc, category) => {
        acc[category.id] =
          category.id === 'all'
            ? projects.length
            : projects.filter((project) => project.category === category.id).length
        return acc
      }, {}),
    [],
  )

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="section-y relative overflow-hidden bg-mist"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Work"
          titleId="portfolio-heading"
          title="Selected Projects"
          description="Explore examples of web and application development work."
        />

        {/* Honesty notice — these are sample builds, not client engagements. */}
        <p className="mx-auto mt-6 flex max-w-2xl items-start gap-2.5 rounded-2xl border border-amber-400/40 bg-amber-50 px-4 py-3 text-[0.85rem] text-amber-900">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          <span>
            The projects below are <strong>sample and concept builds</strong> created to demonstrate
            our approach. They are not completed client engagements.
          </span>
        </p>

        {/* Filters */}
        <div
          role="group"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {projectCategories.map((category) => {
            const isActive = filter === category.id
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilter(category.id)}
                aria-pressed={isActive}
                className={cn(
                  'btn px-4 py-2.5 text-[0.85rem]',
                  isActive
                    ? 'bg-ink text-white shadow-lift'
                    : 'border border-ink/[0.1] bg-white text-body hover:border-ink/25 hover:text-ink',
                )}
              >
                {category.label}
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-[0.68rem] font-bold',
                    isActive ? 'bg-white/15 text-white' : 'bg-mist text-body',
                  )}
                  aria-hidden="true"
                >
                  {counts[category.id] ?? 0}
                </span>
                <span className="sr-only">
                  {counts[category.id] ?? 0} project{counts[category.id] === 1 ? '' : 's'}
                </span>
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </ul>

        {/* Empty state */}
        {visibleProjects.length === 0 && (
          <p className="mt-10 rounded-3xl border border-dashed border-ink/15 bg-white p-10 text-center text-body">
            No projects in this category yet.
          </p>
        )}

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-[0.92rem] text-body">
            Want to see how your project could look? Share your idea and we&rsquo;ll walk you
            through our approach.
          </p>
          <ButtonLink
            href={whatsappLink(
              "Hi Neurofix, I'd like to discuss a project and see how you would approach it.",
            )}
            external
            size="lg"
            srHint="(opens WhatsApp in a new tab)"
          >
            Start a Conversation
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
