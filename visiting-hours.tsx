import { ArrowUpRight, CalendarDays, Clock, Info, MapPin } from 'lucide-react'
import { Reveal, SectionHeading } from './reveal'
import { visitInfo } from '@/lib/data/site'
import { pill } from '@/lib/ui'

export function VisitingHours() {
  return (
    <section id="informasi" aria-labelledby="hours-title" className="bg-card/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <SectionHeading
            id="hours-title"
            eyebrow="Jam Operasional"
            title="Plan Your Visit"
            description="Informasi dasar sebelum Anda berangkat menuju Gua Laumehe."
          />
        </Reveal>

        <Reveal className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col justify-between rounded-3xl bg-primary p-8 text-primary-foreground md:p-10">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Clock className="size-4" aria-hidden="true" />
              Jam Operasional
            </div>
            <p className="mt-10 text-5xl font-extrabold tracking-tight md:text-7xl">{visitInfo.hours}</p>
            <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80">{visitInfo.reminder}</p>
          </div>

          <dl className="grid gap-4">
            <div className="rounded-3xl border border-border bg-card p-6">
              <dt className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                <CalendarDays className="size-4" aria-hidden="true" />
                Hari Operasional
              </dt>
              <dd className="mt-2 font-medium">{visitInfo.days}</dd>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <dt className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                <MapPin className="size-4" aria-hidden="true" />
                Lokasi
              </dt>
              <dd className="mt-2 font-medium text-pretty">{visitInfo.location}</dd>
              <dd className="mt-5">
                <a href={visitInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className={pill.outline}>
                  Lihat Lokasi
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">(membuka Google Maps di tab baru)</span>
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          {visitInfo.source}
        </p>
      </div>
    </section>
  )
}
