import { motion } from 'framer-motion'
import { processSteps } from '../data/process'
import { fadeUp, revealViewport, staggerParent } from '../lib/motion'
import { SectionHeading } from './ui/SectionHeading'

/**
 * Four-step process.
 *
 * Desktop: a horizontal timeline whose connecting line and marker dots are
 * drawn with CSS, with each step revealed in sequence as it scrolls into view.
 * Mobile: the same markup stacks into a vertical timeline with the line running
 * down the left edge.
 */
export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="section-y relative overflow-hidden bg-white"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Process"
          titleId="process-heading"
          title="Simple Steps to Get Started"
          description="We keep the process transparent and collaborative, so you always know what's happening at every step."
        />

        <div className="relative mt-16">
          {/* ---- Connector: horizontal on desktop, vertical on mobile ---- */}
          <div
            className="absolute left-[27px] top-3 bottom-3 w-px bg-gradient-to-b from-brand-500/40 via-violet-500/35 to-transparent md:left-0 md:right-0 md:top-[27px] md:bottom-auto md:h-px md:w-auto md:bg-gradient-to-r md:from-transparent md:via-brand-500/40 md:to-transparent"
            aria-hidden="true"
          />

          <motion.ol
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="grid gap-10 md:grid-cols-4 md:gap-6"
          >
            {processSteps.map((step) => {
              const Icon = step.icon
              return (
                <motion.li
                  key={step.number}
                  variants={fadeUp}
                  className="group relative flex gap-5 md:block"
                >
                  {/* Marker */}
                  <span
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-[0_14px_34px_-14px_rgba(52,120,246,0.85)] transition-transform duration-300 group-hover:scale-105"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="absolute -right-1.5 -top-1.5 rounded-full border-2 border-white bg-ink px-1.5 py-0.5 text-[0.58rem] font-bold text-white">
                      {step.number}
                    </span>
                  </span>

                  <div className="pb-2 md:mt-6 md:pr-6">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-600">
                      Step {step.number}
                    </p>
                    <h3 className="mt-2 text-[1.08rem] font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed">{step.description}</p>
                  </div>
                </motion.li>
              )
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
