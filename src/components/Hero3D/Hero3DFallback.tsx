import { heroTechLabels } from '../../data/tech'

/**
 * Non-WebGL hero visual.
 *
 * Shown when the browser cannot create a WebGL context. It is a deliberate,
 * designed composition built from the same brand tokens rather than a
 * "3D failed" message, so the hero still looks finished.
 */
export function Hero3DFallback() {
  return (
    <div
      role="img"
      aria-label="Illustration of a laptop and smartphone showing Neurofix website and application interfaces"
      className="relative mx-auto aspect-square w-full max-w-[560px]"
    >
      {/* Ambient glows */}
      <div
        className="absolute left-[8%] top-[10%] h-56 w-56 rounded-full bg-brand-500/30 blur-[70px] animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[6%] right-[4%] h-64 w-64 rounded-full bg-violet-500/25 blur-[80px] animate-pulse-glow"
        aria-hidden="true"
      />

      {/* Laptop */}
      <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-[62%] rotate-[-4deg]">
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-ink-soft/90 p-2.5 shadow-lift backdrop-blur-sm">
          <div className="rounded-xl bg-ink p-3">
            {/* Fake browser chrome */}
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/25" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full bg-brand-500/20 px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-widest text-brand-200">
                  Your Ideas + Our Code
                </span>
                <p className="mt-2 text-[0.72rem] font-extrabold leading-tight text-white">
                  Build Modern Web &amp;
                  <br />
                  <span className="text-gradient">Application Solutions</span>
                </p>
                <div className="mt-2.5 flex gap-1.5">
                  <span className="h-4 w-14 rounded-full bg-brand-gradient" />
                  <span className="h-4 w-12 rounded-full border border-white/20" />
                </div>
              </div>

              <div className="relative h-16 w-20 shrink-0 rounded-xl bg-brand-gradient-soft ring-1 ring-white/10">
                <span className="absolute left-2 top-3 h-8 w-8 rounded-full bg-brand-gradient opacity-80" />
                <span className="absolute bottom-2 right-2 h-6 w-6 rounded-full bg-violet-500/70" />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {['Web', 'Apps', 'UI/UX'].map((label) => (
                <div key={label} className="rounded-lg bg-white/[0.06] p-1.5">
                  <span className="block h-4 w-4 rounded bg-brand-500/40" />
                  <span className="mt-1.5 block text-[0.5rem] font-semibold text-slate-300">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Laptop base */}
        <div className="mx-auto h-2.5 w-[86%] rounded-b-2xl bg-gradient-to-b from-ink-line to-ink shadow-lift" />
      </div>

      {/* Phone */}
      <div className="absolute bottom-[6%] right-[6%] w-[26%] rotate-[6deg] animate-float">
        <div className="overflow-hidden rounded-[1.4rem] border border-white/12 bg-ink-soft/95 p-1.5 shadow-lift">
          <div className="rounded-[1rem] bg-ink p-2">
            <div className="flex items-center gap-1.5">
              <span className="h-5 w-5 rounded-lg bg-brand-gradient" />
              <span className="text-[0.5rem] font-bold text-white">Neurofix</span>
            </div>
            <div className="mt-2 h-6 rounded-lg bg-brand-gradient" />
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <span className="h-7 rounded-lg bg-white/[0.08]" />
              <span className="h-7 rounded-lg bg-white/[0.08]" />
            </div>
            <div className="mt-1.5 space-y-1.5">
              <span className="block h-5 rounded-lg bg-white/[0.06]" />
              <span className="block h-5 rounded-lg bg-white/[0.06]" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating orbs */}
      <div
        className="absolute left-[2%] bottom-[22%] h-16 w-16 rounded-full border border-brand-300/40 bg-brand-400/15 backdrop-blur-md"
        aria-hidden="true"
      />
      <div
        className="absolute right-[24%] top-[8%] h-10 w-10 rounded-full border border-violet-400/40 bg-violet-500/20 backdrop-blur-md animate-float"
        aria-hidden="true"
      />

      {/* Floating tech chips */}
      {heroTechLabels.slice(0, 3).map((label, index) => (
        <span
          key={label}
          className="absolute rounded-full border border-white/12 bg-white/[0.07] px-2.5 py-1 text-[0.55rem] font-semibold text-slate-200 backdrop-blur-md"
          style={
            index === 0
              ? { left: '0%', top: '18%' }
              : index === 1
                ? { right: '0%', top: '44%' }
                : { left: '8%', bottom: '8%' }
          }
        >
          {label}
        </span>
      ))}
    </div>
  )
}

/** Neutral placeholder shown while the 3D chunk loads or WebGL is detected. */
export function Hero3DSkeleton() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[560px] animate-pulse"
      aria-hidden="true"
    >
      <div className="absolute left-[10%] top-[14%] h-48 w-48 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="absolute bottom-[8%] right-[6%] h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-[52%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/[0.06] bg-white/[0.03]" />
    </div>
  )
}
