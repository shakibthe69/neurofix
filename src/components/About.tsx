import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { principles } from '../data/process'
import { fadeUp, revealViewport, staggerParent } from '../lib/motion'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

/** Colour-graded tokens for the fake editor lines in the illustration. */
const codeLines: { tokens: { text: string; className: string }[] }[] = [
  {
    tokens: [
      { text: 'export function ', className: 'text-violet-400' },
      { text: 'buildProduct', className: 'text-brand-300' },
      { text: '(' , className: 'text-slate-500' },
      { text: 'idea', className: 'text-slate-200' },
      { text: ': ', className: 'text-slate-500' },
      { text: 'Vision', className: 'text-emerald-300' },
      { text: ') {', className: 'text-slate-500' },
    ],
  },
  {
    tokens: [
      { text: '  const ', className: 'text-violet-400' },
      { text: 'plan', className: 'text-slate-200' },
      { text: ' = ', className: 'text-slate-500' },
      { text: 'discover', className: 'text-brand-300' },
      { text: '(idea)', className: 'text-slate-400' },
    ],
  },
  {
    tokens: [
      { text: '  const ', className: 'text-violet-400' },
      { text: 'ui', className: 'text-slate-200' },
      { text: ' = ', className: 'text-slate-500' },
      { text: 'design', className: 'text-brand-300' },
      { text: '(plan, ', className: 'text-slate-400' },
      { text: "'user-first'", className: 'text-amber-300' },
      { text: ')', className: 'text-slate-400' },
    ],
  },
  {
    tokens: [
      { text: '  const ', className: 'text-violet-400' },
      { text: 'app', className: 'text-slate-200' },
      { text: ' = ', className: 'text-slate-500' },
      { text: 'develop', className: 'text-brand-300' },
      { text: '(ui, ', className: 'text-slate-400' },
      { text: "{ scale: true }", className: 'text-emerald-300' },
      { text: ')', className: 'text-slate-400' },
    ],
  },
  {
    tokens: [
      { text: '  return ', className: 'text-violet-400' },
      { text: 'ship', className: 'text-brand-300' },
      { text: '(app, ', className: 'text-slate-400' },
      { text: "'on-time'", className: 'text-amber-300' },
      { text: ')  ', className: 'text-slate-400' },
      { text: '// + support', className: 'text-slate-600' },
    ],
  },
  { tokens: [{ text: '}', className: 'text-slate-500' }] },
]

/** Stylized code-editor card that stands in for a workspace photo. */
function CodeWorkspaceVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [26, -26])

  return (
    <motion.div
      ref={ref}
      style={prefersReducedMotion ? undefined : { y }}
      className="relative"
    >
      <div
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand-gradient-soft blur-2xl"
        aria-hidden="true"
      />

      <div className="overflow-hidden rounded-3xl border border-ink/[0.07] bg-ink shadow-lift">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.07] bg-ink-soft px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" aria-hidden="true" />
          <span className="ml-2 font-mono text-[0.7rem] text-slate-400">build-product.ts</span>
          <span className="ml-auto rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[0.62rem] font-semibold text-emerald-300">
            passing
          </span>
        </div>

        {/* Code body */}
        <div className="relative p-5 font-mono text-[0.78rem] leading-7 sm:text-[0.82rem]">
          <div
            className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-brand-500/60 to-transparent"
            aria-hidden="true"
          />
          {codeLines.map((line, index) => (
            <div key={index} className="flex gap-4">
              <span className="w-4 select-none text-right text-slate-600" aria-hidden="true">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {line.tokens.map((token, tokenIndex) => (
                  <span key={tokenIndex} className={token.className}>
                    {token.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* Build strip */}
        <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] bg-ink-soft px-5 py-3">
          <span className="font-mono text-[0.7rem] text-slate-400">
            build · <span className="text-brand-300">success</span>
          </span>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-1.5 w-10 rounded-full bg-brand-500/70" />
            <span className="h-1.5 w-6 rounded-full bg-violet-500/60" />
            <span className="h-1.5 w-3 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Floating status card */}
      <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-ink/[0.07] bg-white p-4 shadow-lift sm:block">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-body">
          Focus
        </p>
        <p className="mt-1 text-sm font-bold text-ink">Design • Build • Support</p>
      </div>
    </motion.div>
  )
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-y relative overflow-hidden bg-white"
    >
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ---- Copy + principles ---- */}
          <div>
            <SectionHeading
              eyebrow="About Neurofix"
              titleId="about-heading"
              title="We Turn Your Ideas Into Digital Reality"
              description="Neurofix is a modern software development company focused on creating innovative web and application solutions. We combine clean design, powerful technology and a user-centered approach to help businesses grow in the digital world."
              align="left"
            />

            <motion.ul
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              className="mt-10 space-y-4"
            >
              {principles.map((principle) => {
                const Icon = principle.icon
                return (
                  <motion.li
                    key={principle.title}
                    variants={fadeUp}
                    className="group flex gap-4 rounded-2xl border border-transparent p-4 transition-colors hover:border-ink/[0.07] hover:bg-mist"
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient-soft ring-1 ring-inset ring-brand-500/15 transition-transform duration-300 group-hover:scale-105"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5 text-brand-600" />
                    </span>
                    <div>
                      <h3 className="text-[1.02rem] font-bold text-ink">{principle.title}</h3>
                      <p className="mt-1 text-[0.92rem] leading-relaxed">{principle.description}</p>
                    </div>
                  </motion.li>
                )
              })}
            </motion.ul>
          </div>

          {/* ---- Illustration ---- */}
          <Reveal>
            <CodeWorkspaceVisual />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
