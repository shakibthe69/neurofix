import type { Project } from '../data/projects'

/**
 * Abstract interface mockups for the portfolio cards.
 *
 * There are no screenshots of real builds yet, so instead of stock imagery or
 * empty placeholders each card renders a small, purpose-built wireframe of the
 * interface it describes. It is visually cohesive with the brand and can never
 * be mistaken for a screenshot of shipped client work.
 */
export function ProjectMock({ variant }: { variant: Project['mock'] }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden bg-gradient-to-br from-ink to-ink-soft p-4 transition-transform duration-500 group-hover:scale-[1.04]"
    >
      <div
        className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-brand-500/25 blur-2xl"
      />
      <div
        className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl"
      />

      {variant === 'commerce' && <CommerceMock />}
      {variant === 'dashboard' && <DashboardMock />}
      {variant === 'mobile' && <MobileMock />}
      {variant === 'booking' && <BookingMock />}
    </div>
  )
}

function Bar({ className }: { className: string }) {
  return <span className={`block rounded-full bg-white/[0.09] ${className}`} />
}

function CommerceMock() {
  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center justify-between">
        <Bar className="h-2.5 w-14" />
        <div className="flex items-center gap-1.5">
          <Bar className="h-2.5 w-5" />
          <span className="h-4 w-4 rounded-full bg-brand-gradient" />
        </div>
      </div>

      <div className="mt-3 h-14 rounded-xl bg-brand-gradient-soft ring-1 ring-inset ring-white/10" />

      <div className="mt-3 grid flex-1 grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col rounded-lg bg-white/[0.06] p-1.5">
            <span className="h-8 rounded bg-white/[0.09]" />
            <span className="mt-1.5 block h-1.5 w-8 rounded-full bg-white/20" />
            <span className="mt-1 block h-1.5 w-5 rounded-full bg-brand-400/60" />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-white/[0.06] px-2 py-1.5">
        <Bar className="h-1.5 w-10" />
        <span className="rounded-full bg-brand-gradient px-2 py-0.5 text-[0.5rem] font-bold text-white">
          Cart 2
        </span>
      </div>
    </div>
  )
}

function DashboardMock() {
  return (
    <div className="relative flex h-full gap-2.5">
      <div className="flex w-1/5 flex-col gap-1.5 rounded-lg bg-white/[0.05] p-2">
        <span className="h-3 w-3 rounded bg-brand-gradient" />
        <Bar className="h-1.5 w-full" />
        <Bar className="h-1.5 w-4/5" />
        <Bar className="h-1.5 w-full" />
        <Bar className="h-1.5 w-3/5" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg bg-white/[0.06] p-2">
              <span className="block h-1.5 w-6 rounded-full bg-white/20" />
              <span className="mt-1.5 block h-3 w-9 rounded bg-brand-400/40" />
            </div>
          ))}
        </div>

        <div className="mt-2.5 flex flex-1 items-end gap-1.5 rounded-lg bg-white/[0.05] p-2.5">
          {[38, 62, 45, 80, 55, 92, 70].map((height, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-brand-500/40 to-violet-500/80"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileMock() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="h-full w-[46%] rounded-[1.1rem] border border-white/12 bg-ink p-2">
        <div className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-md bg-brand-gradient" />
          <Bar className="h-1.5 w-10" />
        </div>
        <div className="mt-2 h-8 rounded-lg bg-brand-gradient" />
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <span className="h-6 rounded-lg bg-white/[0.09]" />
          <span className="h-6 rounded-lg bg-white/[0.09]" />
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] p-1.5">
            <span className="h-3.5 w-3.5 rounded-md bg-brand-500/50" />
            <Bar className="h-1.5 flex-1" />
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] p-1.5">
            <span className="h-3.5 w-3.5 rounded-md bg-violet-500/50" />
            <Bar className="h-1.5 flex-1" />
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] p-1.5">
            <span className="h-3.5 w-3.5 rounded-md bg-brand-500/30" />
            <Bar className="h-1.5 flex-1" />
          </div>
        </div>
      </div>

      <div className="ml-3 flex-1 space-y-1.5">
        <Bar className="h-2 w-3/4" />
        <Bar className="h-2 w-1/2" />
        <div className="!mt-3 rounded-lg bg-white/[0.06] p-2">
          <span className="block h-1.5 w-2/3 rounded-full bg-white/20" />
          <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  )
}

function BookingMock() {
  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center justify-between">
        <Bar className="h-2.5 w-16" />
        <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[0.5rem] font-bold text-emerald-300">
          Available
        </span>
      </div>

      <div className="mt-3 grid grid-cols-6 gap-1.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className={`h-5 rounded-md ${
              i === 7 ? 'bg-brand-gradient' : 'bg-white/[0.07]'
            }`}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-1 gap-2">
        <div className="flex-1 space-y-1.5">
          {['09:00', '11:30', '14:00'].map((slot, i) => (
            <div
              key={slot}
              className={`flex items-center justify-between rounded-lg px-2 py-1.5 ${
                i === 1 ? 'bg-brand-500/25 ring-1 ring-inset ring-brand-400/40' : 'bg-white/[0.06]'
              }`}
            >
              <span className="text-[0.5rem] font-semibold text-slate-300">{slot}</span>
              <span className="h-1.5 w-6 rounded-full bg-white/15" />
            </div>
          ))}
        </div>

        <div className="w-1/3 rounded-lg bg-white/[0.05] p-2">
          <span className="mx-auto block h-6 w-6 rounded-full bg-brand-gradient" />
          <span className="mx-auto mt-1.5 block h-1.5 w-4/5 rounded-full bg-white/20" />
          <span className="mx-auto mt-1 block h-1.5 w-3/5 rounded-full bg-white/10" />
          <span className="mt-2 block h-5 rounded-md bg-brand-gradient" />
        </div>
      </div>
    </div>
  )
}
