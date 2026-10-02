import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../data/site'
import { fadeUp, revealViewport, staggerParent } from '../lib/motion'
import { ButtonLink } from './ui/Button'
import { ScrollToTopLink } from './ui/ScrollToTopLink'

const ctaLink = whatsappLink(
  "Hi Neurofix, I'm ready to start a project. Here's what I'd like to build:",
)

/**
 * Decorative animated particle field.
 *
 * Rendered as DOM nodes rather than WebGL: it is a handful of elements, needs
 * no 3D context, and costs nothing on devices that already decline the hero
 * scene. Position and delay are derived from the index so the layout is stable
 * across renders.
 */
function ParticleField() {
  const particles = Array.from({ length: 18 }, (_, index) => {
    const seed = (index * 37) % 100
    return {
      left: `${(seed % 96) + 2}%`,
      top: `${((seed * 7) % 88) + 6}%`,
      size: seed % 3 === 0 ? 4 : 2.5,
      delay: (index % 6) * 0.7,
      duration: 4 + (index % 5),
    }
  })

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-brand-300/60"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="relative px-5 py-20 sm:px-8 md:py-24">
      <div className="container-page">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="on-dark relative isolate overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-center shadow-lift sm:px-12 md:py-20"
        >
          {/* Animated gradient wash */}
          <div
            className="absolute -left-24 -top-24 -z-10 h-[420px] w-[420px] rounded-full bg-brand-500/30 blur-[110px] animate-pulse-glow"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -right-20 -z-10 h-[460px] w-[460px] rounded-full bg-violet-500/28 blur-[120px] animate-pulse-glow"
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-10 bg-grid-overlay opacity-50" aria-hidden="true" />
          <ParticleField />

          <motion.h2
            variants={fadeUp}
            id="cta-heading"
            className="mx-auto max-w-2xl text-display-lg font-extrabold text-white"
          >
            Ready to Build Your <span className="text-gradient">Next Big Idea?</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.08}
            className="mx-auto mt-5 max-w-xl text-[1.02rem] leading-relaxed text-slate-300/85"
          >
            Let&rsquo;s turn your vision into a powerful digital experience.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.16}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <ButtonLink href={ctaLink} external size="lg" srHint="(opens WhatsApp in a new tab)">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Start Your Project
            </ButtonLink>
            <ScrollToTopLink />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
