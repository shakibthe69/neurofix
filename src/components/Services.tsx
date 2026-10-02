import { motion } from 'framer-motion'
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react'
import { services } from '../data/services'
import { whatsappLink } from '../data/site'
import { fadeUp, revealViewport, staggerParent } from '../lib/motion'
import { SectionHeading } from './ui/SectionHeading'

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-y relative overflow-hidden bg-mist"
    >
      <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute -right-40 top-20 h-[380px] w-[380px] rounded-full bg-brand-500/[0.07] blur-[110px]"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Our Services"
          titleId="services-heading"
          title="What We Do"
          description="We provide end-to-end web and application development services tailored to your business needs."
        />

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.li key={service.id} variants={fadeUp} className="h-full">
                <article className="gradient-border card card-hover group flex h-full flex-col p-7">
                  <span
                    className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient-soft ring-1 ring-inset ring-brand-500/15 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
                    aria-hidden="true"
                  >
                    <Icon
                      className="h-6 w-6 text-brand-600 transition-colors duration-300 group-hover:text-violet-600"
                      aria-hidden="true"
                    />
                  </span>

                  <h3 className="mt-5 text-[1.15rem] font-bold text-ink">{service.title}</h3>
                  <p className="mt-2.5 text-[0.94rem] leading-relaxed">{service.description}</p>

                  <ul className="mt-5 space-y-2.5 border-t border-ink/[0.06] pt-5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[0.875rem]">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
                          aria-hidden="true"
                        />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={whatsappLink(service.whatsappIntent)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full text-sm font-semibold text-brand-600 transition-colors hover:text-violet-600"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Discuss this service
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only">on WhatsApp (opens in a new tab)</span>
                  </a>
                </article>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
