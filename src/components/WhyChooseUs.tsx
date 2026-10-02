import { motion } from 'framer-motion'
import { whyChooseUs } from '../data/process'
import { fadeUp, revealViewport, staggerParent } from '../lib/motion'
import { SectionHeading } from './ui/SectionHeading'

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="section-y relative overflow-hidden bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Neurofix"
          titleId="why-heading"
          title="Why Work With Us?"
          description="How we work, and what you can expect from us at each stage."
        />

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {whyChooseUs.map((item) => {
            const Icon = item.icon
            return (
              <motion.li key={item.title} variants={fadeUp} className="h-full">
                <div className="group flex h-full flex-col rounded-3xl border border-ink/[0.07] bg-mist p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/25 hover:bg-white hover:shadow-lift">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-600 ring-1 ring-inset ring-ink/[0.06] transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white group-hover:ring-transparent"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[1.02rem] font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed">{item.description}</p>
                </div>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
