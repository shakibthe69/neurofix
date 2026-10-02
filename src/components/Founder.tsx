import { motion } from 'framer-motion'
import { BadgeCheck, Linkedin, MapPin } from 'lucide-react'
import { founder, site } from '../data/site'
import { useTilt } from '../hooks/useTilt'
import { fadeUp, revealViewport, staggerParent } from '../lib/motion'
import { ButtonLink } from './ui/Button'
import { Reveal } from './ui/Reveal'

const focusAreas = [
  'Web and Mobile Development',
  'Software Engineering',
  'Data Science and Machine Learning',
  'Digital Product Innovation',
]

export function Founder() {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>({ max: 6 })

  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="on-dark relative isolate overflow-hidden bg-ink-soft"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 bg-grid-overlay opacity-60" aria-hidden="true" />
      <div
        className="absolute -left-24 top-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-brand-500/20 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-20 bottom-0 -z-10 h-[340px] w-[340px] rounded-full bg-violet-500/20 blur-[130px]"
        aria-hidden="true"
      />

      <div className="container-page section-y">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          {/* ---------- Portrait ---------- */}
          <Reveal className="mx-auto w-full max-w-md lg:mx-0">
            <div
              ref={ref}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              className="relative rounded-[2rem] [transform-style:preserve-3d] will-change-transform"
            >
              {/* Animated gradient frame */}
              <div
                className="absolute -inset-[2px] rounded-[2.05rem] opacity-70 blur-[6px] animate-[spin_9s_linear_infinite]"
                style={{
                  background:
                    'conic-gradient(from 0deg, #3478F6, #8054F6, #22D3EE, #3478F6)',
                }}
                aria-hidden="true"
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink p-2 shadow-lift">
                <img
                  src={founder.image}
                  alt={founder.imageAlt}
                  width={1254}
                  height={1254}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full rounded-[1.6rem] object-cover object-center"
                />

                {/* Name plate */}
                <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-[1.4rem] bg-gradient-to-t from-ink via-ink/85 to-transparent p-5 pt-12">
                  <p className="text-lg font-extrabold tracking-tight text-white">{founder.name}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[0.82rem] font-medium text-brand-200">
                    <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    {founder.role}, {site.name}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---------- Copy ---------- */}
          <div>
            <Reveal>
              <span className="eyebrow eyebrow-dark">Meet the Founder</span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="founder-heading"
                className="mt-5 text-display-lg font-extrabold text-white"
              >
                Meet the Mind Behind <span className="text-gradient">Neurofix</span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-slate-300/85">
                Passionate about software engineering, modern web technologies, mobile application
                development and artificial intelligence, MD Shakib Ahmed founded Neurofix with a
                vision to turn innovative ideas into practical digital solutions.
              </p>
            </Reveal>

            <motion.ul
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {focusAreas.map((area) => (
                <motion.li
                  key={area}
                  variants={fadeUp}
                  className="glass-dark flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[0.9rem] font-medium text-slate-200"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient"
                    aria-hidden="true"
                  />
                  {area}
                </motion.li>
              ))}
            </motion.ul>

            <Reveal delay={0.1}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <ButtonLink
                  href={founder.linkedin}
                  external
                  size="lg"
                  aria-label="Connect with MD Shakib Ahmed on LinkedIn"
                  srHint="(opens LinkedIn in a new tab)"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  Connect on LinkedIn
                </ButtonLink>

                <p className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="h-4 w-4 text-brand-300" aria-hidden="true" />
                  Based in {site.location}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
