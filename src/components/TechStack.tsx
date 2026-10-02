import { motion } from 'framer-motion'
import { techStack } from '../data/tech'
import { fadeUp, revealViewport, staggerParent } from '../lib/motion'
import { SectionHeading } from './ui/SectionHeading'

export function TechStack() {
  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      className="section-y relative overflow-hidden bg-mist"
    >
      <div
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-500/25 to-transparent"
        aria-hidden="true"
      />

      <div className="container-page">
        <SectionHeading
          eyebrow="Our Technology"
          titleId="technology-heading"
          title="Technologies We Work With"
          description="The tools and frameworks we use to design, build and ship digital products."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="mt-14 grid gap-6 lg:grid-cols-2"
        >
          {techStack.map((category, index) => (
            <motion.section
              key={category.id}
              variants={fadeUp}
              aria-labelledby={`tech-${category.id}`}
              className={`gradient-border card p-6 hover:-translate-y-1 sm:p-7 ${
                // The AI & Data group is the odd one out in a 2-column grid
                index === techStack.length - 1 ? 'lg:col-span-2' : ''
              }`}
            >
              <header className="flex flex-wrap items-baseline justify-between gap-2">
                <h3
                  id={`tech-${category.id}`}
                  className="text-[1.05rem] font-bold text-ink"
                >
                  {category.label}
                </h3>
                <p className="text-[0.82rem]">{category.note}</p>
              </header>

              <ul className="mt-5 flex flex-wrap gap-2.5">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <span className="group flex items-center gap-2.5 rounded-2xl border border-ink/[0.08] bg-white px-3.5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-soft">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gradient-soft text-[0.62rem] font-extrabold uppercase text-brand-600 ring-1 ring-inset ring-brand-500/15 transition-colors group-hover:bg-brand-gradient group-hover:text-white group-hover:ring-transparent"
                        aria-hidden="true"
                      >
                        {item.mark}
                      </span>
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-[0.82rem] text-body/80">
          We use the tools that fit each project — not every technology above is used on every
          build.
        </p>
      </div>
    </section>
  )
}
