import { About } from './components/About'
import { BackToTop } from './components/BackToTop'
import { Contact } from './components/Contact'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'
import { Founder } from './components/Founder'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Portfolio } from './components/Portfolio'
import { Process } from './components/Process'
import { Services } from './components/Services'
import { TechStack } from './components/TechStack'
import { WhyChooseUs } from './components/WhyChooseUs'
import { founder, site } from './data/site'

/**
 * Structured data describing the studio and its founder.
 * Everything here is factual — no invented ratings, awards or review counts.
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://neurofix.dev/#organization',
      name: site.name,
      description: site.description,
      slogan: site.tagline,
      url: 'https://neurofix.dev/',
      logo: 'https://neurofix.dev/assets/logo.jpg',
      email: founder.email,
      telephone: '+8801701660169',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dhaka',
        addressCountry: 'BD',
      },
      founder: { '@id': 'https://neurofix.dev/#founder' },
      sameAs: [founder.linkedin],
    },
    {
      '@type': 'Person',
      '@id': 'https://neurofix.dev/#founder',
      name: 'MD Shakib Ahmed',
      jobTitle: 'Founder & CEO',
      worksFor: { '@id': 'https://neurofix.dev/#organization' },
      sameAs: [founder.linkedin],
    },
  ],
}

export default function App() {
  return (
    <>
      {/* Static, developer-authored object — no user input is interpolated. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <a
        href="#main"
        className="sr-only-focusable absolute left-4 top-4 z-[70] rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-lift"
      >
        Skip to main content
      </a>

      <Navbar />

      {/* tabIndex={-1} lets the skip link move focus here without adding the
          whole page body to the tab order. */}
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <About />
        <Founder />
        <TechStack />
        <Process />
        <Portfolio />
        <WhyChooseUs />
        <Contact />
        <CTA />
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}
