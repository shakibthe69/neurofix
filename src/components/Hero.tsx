import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Play } from 'lucide-react'
import { heroTechLabels } from '../data/tech'
import { whatsappLink } from '../data/site'
import { fadeUp, revealViewport, staggerParent } from '../lib/motion'
import { ButtonLink } from './ui/Button'
import { HeroVisual } from './Hero3D/HeroVisual'

/** Floating labels arranged around the 3D composition (desktop only). */
const labelPositions = [
  'left-[-2%] top-[14%]',
  'right-[2%] top-[30%]',
  'left-[4%] bottom-[22%]',
  'right-[8%] bottom-[12%]',
  'left-[38%] top-[2%]',
  'right-[28%] bottom-[2%]',
]

/** Sections the hero CTAs jump to. */
const primaryCta = whatsappLink(
  "Hi Neurofix, I'd like to get started on a project. Here's what I have in mind:",
)

export function Hero() {
  return (
    <section
      id="home"
      tabIndex={-1}
      aria-labelledby="hero-heading"
      className="on-dark relative isolate overflow-hidden bg-ink pb-24 pt-32 sm:pt-36 lg:pb-28 lg:pt-40"
    >
      {/* ---- Backdrop ---- */}
      <div className="absolute inset-0 -z-10 bg-grid-overlay opacity-70" aria-hidden="true" />
      <div
        className="absolute -left-32 top-[-10%] -z-10 h-[420px] w-[420px] rounded-full bg-brand-500/25 blur-[120px] animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 top-[18%] -z-10 h-[460px] w-[460px] rounded-full bg-violet-500/20 blur-[130px] animate-pulse-glow"
        aria-hidden="true"
      />
      {/* Seam into the next, light section */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-white"
        aria-hidden="true"
      />

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
          {/* ---------------- Copy ---------------- */}
          <motion.div variants={staggerParent} initial="hidden" animate="visible" className="max-w-2xl">
            <motion.p
              variants={fadeUp}
              custom={0}
              className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-200 backdrop-blur-md"
            >
              <span className="text-brand-300">Your Ideas</span>
              <span aria-hidden="true" className="text-slate-400">
                +
              </span>
              <span className="text-violet-300">Our Code</span>
              <span aria-hidden="true" className="text-slate-400">
                =
              </span>
              <span className="text-white">Real Solutions</span>
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={0.08}
              id="hero-heading"
              className="mt-6 text-display-xl font-extrabold text-white"
            >
              Build Modern Web &amp; Application Solutions with{' '}
              <span className="text-gradient">Neurofix</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.16}
              className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-slate-300/85"
            >
              We design and develop high-quality websites and applications that help businesses
              grow, engage users and achieve their goals. Your vision, our expertise — together we
              build the future.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.24}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <ButtonLink
                href={primaryCta}
                external
                size="lg"
                srHint="(opens WhatsApp in a new tab)"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Get Started
              </ButtonLink>

              <ButtonLink href="#portfolio" variant="ghostDark" size="lg">
                <Play className="h-4 w-4" aria-hidden="true" />
                View Our Work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </motion.div>

            {/* Technology chips — states what we build with, not a claim of scale */}
            <motion.div variants={fadeUp} custom={0.32} className="mt-10">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Building with
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {heroTechLabels.map((label) => (
                  <li
                    key={label}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* ---------------- 3D visual ---------------- */}
          <div className="relative">
            <HeroVisual />

            {/* Floating tech labels layered over the scene (pointer-events-none so
                they never intercept a drag or a click). */}
            <ul
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden lg:block"
            >
              {heroTechLabels.map((label, index) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.12, duration: 0.5 }}
                  className={`absolute animate-float rounded-full border border-white/12 bg-white/[0.07] px-3 py-1.5 text-[0.68rem] font-semibold text-slate-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md ${labelPositions[index] ?? ''}`}
                  style={{ animationDelay: `${index * 0.6}s` }}
                >
                  {label}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Screen-reader-only note: the visual is decorative. */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={fadeUp}
        className="sr-only"
      >
        Decorative animated 3D scene.
      </motion.p>
    </section>
  )
}
