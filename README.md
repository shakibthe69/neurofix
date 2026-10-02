# Neurofix — Company Website

> **Your Ideas. Our Code. Real Solutions.**

Production-ready marketing website for **Neurofix**, a software development studio based in
Dhaka, Bangladesh. Built as a fast, accessible single page with an interactive 3D hero,
scroll-driven motion, a filterable portfolio and working WhatsApp / email contact flows.

---

## Table of contents

1. [Quick start](#1-quick-start)
2. [Scripts](#2-scripts)
3. [Tech stack](#3-tech-stack)
4. [Project structure](#4-project-structure)
5. [Design system](#5-design-system)
6. [Editing content](#6-editing-content)
7. [Assets (logo and founder photo)](#7-assets-logo-and-founder-photo)
8. [The contact form](#8-the-contact-form)
9. [3D hero and animation](#9-3d-hero-and-animation)
10. [Accessibility](#10-accessibility)
11. [SEO](#11-seo)
12. [Performance notes](#12-performance-notes)
13. [Deployment](#13-deployment)
14. [Known limitations](#14-known-limitations)

---

## 1. Quick start

**Requirements:** Node.js 18+ (developed and tested on Node 24) and npm 9+.

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# type-check the whole project
npm run typecheck

# production build into dist/
npm run build

# serve the production build locally (http://localhost:4173)
npm run preview
```

---

## 2. Scripts

| Script              | What it does                                            |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Vite dev server with HMR                                |
| `npm run build`     | TypeScript project build + optimised Vite bundle         |
| `npm run preview`   | Serves `dist/` exactly as a static host would            |
| `npm run typecheck` | `tsc -b --noEmit`, no files written                      |

There is no ESLint configuration in this project, so no lint script is provided. TypeScript runs
in `strict` mode with `noUnusedLocals` and `noUnusedParameters` enabled, which catches most of
what a linter would in a codebase this size. Add ESLint if you want style-level rules:

```bash
npm i -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh
```

---

## 3. Tech stack

| Area            | Choice                                                    |
| --------------- | --------------------------------------------------------- |
| Framework       | React 19 + Vite 7                                         |
| Language        | TypeScript 5.9 (`strict`)                                 |
| Styling         | Tailwind CSS 3.4 (custom design tokens in `tailwind.config.js`) |
| UI animation    | Framer Motion 12                                          |
| 3D              | Three.js + `@react-three/fiber` 9 + `@react-three/drei` 10 |
| Icons           | `lucide-react`                                            |
| Forms           | `react-hook-form` (uncontrolled inputs, no re-render churn) |

No backend, database or external API is used. See [section 8](#8-the-contact-form).

---

## 4. Project structure

```
public/
  assets/
    logo.jpg              # company logo (navbar, footer, favicon, OG image)
    shakib-ahmed.png      # founder photo
  robots.txt
  sitemap.xml
index.html                # <head>: title, description, Open Graph, fonts

src/
  App.tsx                 # composes every section + JSON-LD structured data
  main.tsx                # entry: React root, MotionConfig, global CSS
  components/
    Navbar.tsx            # sticky nav, scroll spy, animated mobile menu
    Hero.tsx              # hero copy, CTAs, floating tech labels
    Hero3D/               # the lazy-loaded 3D hero
      HeroVisual.tsx      # WebGL detection + lazy loading + fallback switch
      Hero3DScene.tsx     # canvas, lights, parallax rig, scene composition
      objects.tsx         # laptop, phone, glass shapes, rings, particles, lines
      mockScreens.ts      # procedural canvas textures for the device screens
      Hero3DFallback.tsx  # CSS-only visual when WebGL is unavailable
    Services.tsx
    About.tsx
    Founder.tsx
    TechStack.tsx
    Process.tsx
    Portfolio.tsx
    ProjectMock.tsx       # abstract UI wireframes used as project thumbnails
    WhyChooseUs.tsx
    Contact.tsx
    CTA.tsx
    Footer.tsx
    BackToTop.tsx
    ui/                   # Button, Logo, Reveal, SectionHeading, ScrollToTopLink
  data/
    site.ts               # company info, contact links, nav items, deep-link helpers
    services.ts           # services + form dropdown options
    tech.ts               # technology groups + hero labels
    process.ts            # process steps, principles, "why us" blocks
    projects.ts           # portfolio entries
  hooks/
    useMediaQuery.ts      # media query + reduced-motion + desktop helpers
    useScrollSpy.ts       # active section tracking for the navbar
    useTilt.ts            # pointer-driven 3D tilt (disabled for reduced motion)
    useWebGLSupport.ts    # graceful 3D fallback detection
    useDocumentVisible.ts # pauses the render loop in background tabs
  lib/
    motion.ts             # shared Framer Motion variants
    utils.ts              # `cn()` class joiner
  styles/
    globals.css           # Tailwind layers, tokens, component classes
```

**Architecture rule:** copy and configuration live in `src/data/*`, presentation lives in
`src/components/*`, and behaviour lives in `src/hooks/*`. Components hold no hard-coded company
details, so content changes never require touching JSX.

---

## 5. Design system

Defined once in `tailwind.config.js` and `src/styles/globals.css`.

### Colour

| Token             | Hex       | Used for                                    |
| ----------------- | --------- | ------------------------------------------- |
| `ink`             | `#080D19` | Hero, footer, CTA background                |
| `ink-soft`        | `#0D1425` | Secondary dark surfaces, founder section   |
| `ink-line`        | `#1B2440` | Device chassis, dark dividers               |
| `brand-500`       | `#3478F6` | Primary blue (gradient start)               |
| `violet-500`      | `#8054F6` | Accent violet (gradient end)                |
| `mist`            | `#F5F8FF` | Alternating light section background        |
| `body`            | `#64748B` | Body text on light backgrounds              |

Gradients use the `bg-brand-gradient` utility. All body text colours meet WCAG AA contrast
against their intended background.

### Typography

Inter (loaded from Google Fonts with `display=swap` and a `system-ui` fallback). Headings use four
fluid clamp-based sizes — `text-display-xl` / `-lg` / `-md` / `-sm` — so they scale continuously
between 360px and 1440px without breakpoint-specific overrides.

### Reusable classes

`container-page`, `section-y`, `card`, `card-hover`, `gradient-border`, `btn` (+ `btn-primary`,
`btn-ghost-light`, `btn-ghost-dark`, `btn-md`, `btn-lg`), `glass-dark`, `glass-light`, `eyebrow`,
`field`, `field-label`, `field-error`.

> **Opacity scale:** Tailwind's default opacity steps are sparse. `tailwind.config.js` registers
> every integer from 0–100 so modifiers like `border-white/12` and `text-slate-300/85` work.

---

## 6. Editing content

Everything below is safe to edit without touching component code.

| What you want to change        | File                        |
| ------------------------------ | --------------------------- |
| Email, phone, LinkedIn, address | `src/data/site.ts`          |
| Nav labels and order           | `src/data/site.ts` (`navItems`) |
| Services and their feature lists | `src/data/services.ts`    |
| Contact form dropdown options  | `src/data/services.ts` (`serviceOptions`, `budgetOptions`) |
| Technology groups              | `src/data/tech.ts`          |
| Process steps and principles   | `src/data/process.ts`       |
| Portfolio projects             | `src/data/projects.ts`      |
| Page title / meta description  | `index.html`                |
| Sitemap URL                    | `public/sitemap.xml`, `robots.txt` |

**Adding a real project** — append an object to `projects` in `src/data/projects.ts` and set
`url` to the live public address. The "No public link yet" note is automatically replaced by a
"View Project" link opening in a new tab. Leave `url` off for anything that is not publicly
reachable. Set `kind` to `'Demo'` or `'Concept Project'`; the badge on every card is driven by it
so sample work can never be presented as delivered client work.

**Adding a section** — create the component in `src/components/`, give the root element an `id`,
add it to `src/App.tsx`, then add the matching `{ id, label }` to `navItems` in
`src/data/site.ts`. The navbar, scroll spy and footer navigation all read from that one array.

---

## 7. Assets (logo and founder photo)

The supplied files have been copied into the project unchanged:

| Source                                         | Destination                     |
| ---------------------------------------------- | ------------------------------- |
| `D:\company\images\logo.jpg`                    | `public/assets/logo.jpg`        |
| `C:\Users\user\Desktop\ChatGPT Image Jul 26, 2026, 10_51_36 AM.png` | `public/assets/shakib-ahmed.png` |

- **Logo** — 1408×768 JPEG. Used in the navbar, the footer, as the favicon and as the Open Graph
  image. Its aspect ratio is preserved everywhere (`object-contain` inside a fixed-size tile), and
  it sits in a rounded white container so it stays legible on the dark hero and footer as well as
  on light sections. No recoloured or generated copy is used.
- **Founder photo** — 1254×1254 PNG. Displayed at its original aspect ratio in a rounded frame
  with a slow conic-gradient border and a pointer-driven tilt. No substitute or AI-generated
  portrait is used anywhere.

**To swap in new files**, overwrite those two files and keep the same filenames — no code changes
are required. If you rename them, update `src/data/site.ts` (`founder.image`) and `assets` in
`src/data/site.ts`, plus `index.html`.

### Image optimisation

`shakib-ahmed.png` is ~1.3 MB. It is served as-is, but converting it to WebP/AVIF (e.g.
`npx @squoosh/cli --webp auto public/assets/shakib-ahmed.png`) will cut roughly 80% of its weight
with no visible difference. The markup already sets explicit `width`/`height`, `loading="lazy"`
and `decoding="async"`, so swapping the file format only requires updating one `src` string.

---

## 8. The contact form

**There is no backend, and the form does not pretend there is one.**

On submit the form:

1. validates every field with `react-hook-form`,
2. moves focus to the first invalid field and announces errors via `role="alert"`,
3. formats the answers into one readable message, and
4. opens the message in the visitor's **own** WhatsApp or email client, prefilled.

The visitor always presses send themselves, so nothing is silently lost and no data is stored on
the website. Contact links used across the site:

| Channel  | Link                                                        |
| -------- | ----------------------------------------------------------- |
| WhatsApp | `https://wa.me/8801701660169` (prefilled per button)         |
| Email    | `mailto:shakibthe69@gmail.com`                               |
| LinkedIn | `https://www.linkedin.com/in/shakib-ahmed-a83bb2434`         |

### Adding real form delivery

If you want submissions to land in your inbox or a CRM, add a form endpoint and post to it instead
of handing off to WhatsApp:

- **Resend** or **SendGrid** behind a small serverless function (Vercel/Netlify function) — full
  control, needs an API key and a verified sending domain.
- **Formspree**, **Basin** or **Getform** — no backend at all; create a form, then `POST` the
  payload to the endpoint they give you in `deliver()` in `src/components/Contact.tsx`.
- **Web3Forms** — free, client-side, requires only an access key.

Whatever you choose, keep the WhatsApp/email buttons as a fallback and update the transparency
notice in `src/components/Contact.tsx` (`This form has no server behind it…`) so it stays truthful.

---

## 9. 3D hero and animation

The hero scene is a React Three Fiber composition containing a 3D laptop and smartphone (both
showing procedurally drawn Neurofix interfaces), glass spheres, emissive rings, tumbling cubes,
drifting light motes, twinkle particles and faint constellation lines, lit by blue/violet
lightformers and a pointer-driven parallax rig.

**How performance is protected**

- The entire Three.js scene is a **dynamic import** (`React.lazy` in `HeroVisual.tsx`) and is only
  fetched once the hero is near the viewport, so it never delays first paint.
- A `quality` prop switches the scene to a lighter variant on screens under 768px: no
  transmissive glass, fewer objects, fewer particles, lower pixel ratio, antialiasing off.
- `frameloop` is set to `never` while the browser tab is hidden.
- WebGL support is detected before mounting; unsupported browsers get
  `Hero3DFallback.tsx`, a designed CSS composition rather than an error message.
- `prefers-reduced-motion` keeps the scene rendered but frozen (no float, rotation, parallax or
  particle motion) — the visual is never removed, just held still.
- The device screens are drawn with the 2D canvas API instead of loading images or webfonts, so
  there are no extra requests and no font-swap flash inside the 3D scene.

**Bundle impact** — Three.js is roughly 300 KB gzipped and lives in its own lazily-loaded chunk.
The initial JavaScript for the page itself is about 90 KB gzipped including Framer Motion.

**Motion beyond the hero** — Framer Motion drives hero entrance, section reveals, card hovers,
the mobile menu and form state transitions. `MotionConfig reducedMotion="user"` in `main.tsx`
makes every one of them respect the OS preference automatically.

---

## 10. Accessibility

- Semantic landmarks: `header` / `nav` / `main` / `section` / `footer`, with `aria-labelledby`
  wiring every section heading.
- A "Skip to main content" link is the first focusable element.
- Every section is reachable and clearly focusable; focus rings are visible on both light and dark
  surfaces (`:focus-visible` plus a dark-surface override).
- The mobile menu closes on `Escape`, returns focus to its toggle, and locks background scroll.
- Form controls have real `<label>` elements, `aria-invalid`, `aria-describedby`, `role="alert"`
  error messages, and required fields are marked with a dot **and** the word "required" for screen
  readers — meaning is never carried by colour alone.
- The 3D canvas exposes a descriptive `role="img"` label; the floating tech labels are
  `aria-hidden` decoration.
- Decorative shapes, orbs and glows are all `aria-hidden`.
- `prefers-reduced-motion` is honoured in CSS and in every animation library in use.

---

## 11. SEO

- Descriptive `<title>` and meta description, canonical URL, `robots` directive, Open Graph and
  Twitter card metadata in `index.html`.
- `Organization` + `Person` JSON-LD in `src/App.tsx` covering the studio, its location, its
  founder and his LinkedIn profile — no invented ratings, awards or review counts.
- `public/robots.txt` and `public/sitemap.xml`.
- One `<h1>` per page with a strict heading hierarchy beneath it.
- Descriptive `alt` text on the logo and founder photo.

**Before deploying**, replace `https://neurofix.dev/` with the real domain in: `index.html`
(canonical, Open Graph, Twitter), `src/App.tsx` (JSON-LD), `public/robots.txt` and
`public/sitemap.xml`.

---

## 12. Performance notes

- Route-free single page, so there is no router overhead.
- Vendor code is split into `three` and `motion` chunks; the 3D scene is a third, lazy chunk.
- Images carry explicit dimensions to avoid layout shift; the founder photo is lazy-loaded.
- Below-the-fold hover effects use CSS transforms and opacity only.
- No web-font is used inside the 3D scene, avoiding a flash of unstyled text in the mockups.
- No specific Lighthouse score is claimed here — measure it yourself with `npm run build && npm run preview`
  and Chrome Lighthouse against a real deployment. Fonts are the main external dependency; removing
  the Google Fonts link in favour of a self-hosted `woff2` will improve the largest-contentful-paint
  on slow connections.

---

## 13. Deployment

The build output in `dist/` is completely static — any static host works.

### Netlify

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

Or connect the Git repository and use build command `npm run build`, publish directory `dist`.

### Vercel

```bash
npm run build
npx vercel --prod
```

Framework preset: **Vite**. Output directory: `dist`.

### GitHub Pages

```bash
npm run build
npx gh-pages -d dist
```

For a project page served from a sub-path (e.g. `username.github.io/neurofix`), set `base: '/neurofix/'`
in `vite.config.ts`, otherwise asset URLs will 404.

### Any static host / VPS

Upload the contents of `dist/` to your web root. Add a single-page fallback so any unknown path
returns `index.html`:

- **Netlify** — `public/_redirects` containing `/* /index.html 200`
- **Vercel** — handle automatically for Vite projects
- **Apache** — `FallbackResource /index.html`
- **Nginx** — `try_files $uri $uri/ /index.html;`

---

## 14. Known limitations

Being explicit about what is and is not in place:

1. **No backend.** The contact form hands off to WhatsApp/email; it does not deliver submissions
   to a server. See [section 8](#8-the-contact-form) for integration options.
2. **Portfolio entries are samples.** All four projects are self-initiated demo/concept builds and
   are labelled as such on every card. No client names, logos, testimonials, awards or project
   statistics have been invented anywhere on the site.
3. **No analytics, cookie banner or live-chat widget** — none were requested, and all three would
   need a service decision first.
4. **Placeholder domain.** `neurofix.dev` is used in metadata, JSON-LD, `robots.txt` and
   `sitemap.xml`; replace it with the real domain before launch.
5. **Founder photo is unoptimised.** It is served as the original 1.3 MB PNG; see
   [Image optimisation](#image-optimisation).
6. **Google Fonts is an external request.** Self-host Inter to remove it if you need a fully
   self-contained deployment.

---

© 2026 Neurofix. All rights reserved.
