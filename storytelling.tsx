'use client'

import { BookOpen, ChevronLeft, ChevronRight, MapPin, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { useExplore } from './explore-provider'
import { CaveImage } from './cave-image'
import { Reveal, SectionHeading } from './reveal'
import { chapters } from '@/lib/data/chapters'
import { getLocation } from '@/lib/data/locations'
import { cn } from '@/lib/utils'
import { pill } from '@/lib/ui'

export function Storytelling() {
  const { chapterIndex, setChapterIndex, focusOnMap } = useExplore()
  const [expanded, setExpanded] = useState(false)
  const chapter = chapters[chapterIndex]
  const location = getLocation(chapter.locationId)

  const goTo = (index: number) => {
    setExpanded(false)
    setChapterIndex(index)
  }

  return (
    <section id="storytelling" aria-labelledby="story-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <SectionHeading
            id="story-title"
            eyebrow="Digital Storytelling"
            title="Every Cave Has a Story"
            description="Telusuri Gua Laumehe bab demi bab. Setiap bab terhubung dengan satu lokasi pada peta digital."
          />
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
          <nav aria-label="Daftar bab cerita" className="min-w-0">
            <ol className="no-scrollbar relative flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
              <span
                aria-hidden="true"
                className="absolute top-3 bottom-3 left-[15px] hidden w-px bg-border lg:block"
              />
              <span
                aria-hidden="true"
                className="absolute top-3 left-[15px] hidden w-px bg-primary transition-[height] duration-700 lg:block"
                style={{ height: `calc((100% - 24px) * ${chapterIndex / (chapters.length - 1)})` }}
              />
              {chapters.map((item, index) => {
                const isActive = index === chapterIndex
                const isDone = index < chapterIndex
                return (
                  <li key={item.number} className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={isActive ? 'step' : undefined}
                      className={cn(
                        'flex items-center gap-3 rounded-full py-2 pr-4 pl-1 text-left transition-colors lg:w-full lg:rounded-xl lg:py-3',
                        isActive ? 'bg-card' : 'hover:bg-card/60',
                      )}
                    >
                      <span
                        className={cn(
                          'relative z-10 grid size-[30px] shrink-0 place-items-center rounded-full border text-[11px] font-bold transition-colors',
                          isActive
                            ? 'border-primary bg-primary text-primary-foreground'
                            : isDone
                              ? 'border-primary bg-background text-primary'
                              : 'border-border bg-background text-muted-foreground',
                        )}
                      >
                        {item.number}
                      </span>
                      <span
                        className={cn(
                          'text-sm font-medium whitespace-nowrap lg:whitespace-normal',
                          isActive ? 'text-foreground' : 'text-muted-foreground',
                        )}
                      >
                        {item.title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>

          <article
            key={chapter.number}
            aria-live="polite"
            className="grid min-w-0 overflow-hidden rounded-3xl border border-border bg-card animate-in fade-in slide-in-from-bottom-4 duration-700 md:grid-cols-2"
          >
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px]">
              <CaveImage
                image={location.image}
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-card/30"
              />
              <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                Lokasi {location.number} · {location.name}
              </span>
            </div>

            <div className="flex flex-col p-6 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <span
                  aria-hidden="true"
                  className="text-7xl leading-none font-extrabold text-transparent md:text-8xl"
                  style={{ WebkitTextStroke: '1.5px var(--primary)' }}
                >
                  {chapter.number}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  Bab {chapterIndex + 1} dari {chapters.length}
                </span>
              </div>

              <p className="mt-6 text-xs font-semibold tracking-[0.24em] text-primary uppercase">
                {chapter.kicker}
              </p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-balance md:text-4xl">
                {chapter.title}
              </h3>
              <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">{chapter.summary}</p>

              {chapter.needsVerification && (
                <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-xs leading-relaxed text-amber-100">
                  <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  Konten budaya pada bab ini menunggu verifikasi dari masyarakat dan pengelola setempat.
                </p>
              )}

              <div
                id={`chapter-body-${chapter.number}`}
                hidden={!expanded}
                className="mt-4 space-y-3 border-l-2 border-primary/50 pl-4 text-sm leading-relaxed text-foreground/85 animate-in fade-in"
              >
                {chapter.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  aria-controls={`chapter-body-${chapter.number}`}
                  className={pill.primary}
                >
                  <BookOpen className="size-4" aria-hidden="true" />
                  {expanded ? 'Tutup Cerita' : 'Baca Cerita'}
                </button>
                <button
                  type="button"
                  onClick={() => focusOnMap(chapter.locationId)}
                  className={pill.outline}
                >
                  <MapPin className="size-4" aria-hidden="true" />
                  Lihat di Peta
                </button>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
                <button
                  type="button"
                  onClick={() => goTo(chapterIndex - 1)}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                  Bab sebelumnya
                </button>
                <button
                  type="button"
                  onClick={() => goTo(chapterIndex + 1)}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Bab berikutnya
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
