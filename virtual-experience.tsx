'use client'

import { BookOpen, ChevronLeft, ChevronRight, Expand, Map } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useExplore } from './explore-provider'
import { CaveImage } from './cave-image'
import { Lightbox, type LightboxItem } from './lightbox'
import { PanoramaViewer } from './panorama-viewer'
import { Reveal, SectionHeading } from './reveal'
import { getLocationIndex, locations } from '@/lib/data/locations'
import { cn } from '@/lib/utils'
import { pill } from '@/lib/ui'

const lightboxItems: LightboxItem[] = locations
  .filter((location) => location.image)
  .map((location) => ({
    src: location.image!.src,
    alt: location.image!.alt,
    title: `${location.number} · ${location.name}`,
    caption: location.narration,
    isPlaceholder: location.image!.isPlaceholder,
  }))

export function VirtualExperience() {
  const { activeId, visited, selectLocation, openStory, focusOnMap } = useExplore()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const index = getLocationIndex(activeId)
  const location = locations[index]
  const progress = ((index + 1) / locations.length) * 100

  const step = (direction: 1 | -1) => {
    const next = (index + direction + locations.length) % locations.length
    selectLocation(locations[next].id)
  }

  const onLightboxChange = useCallback((value: number | null) => setLightboxIndex(value), [])

  return (
    <section id="virtual" aria-labelledby="virtual-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="virtual-title"
            eyebrow="Virtual Experience"
            title="Step Inside Gua Laumehe"
            description="Telusuri enam lokasi secara berurutan. Saat ini menggunakan foto ilustrasi; viewer panorama 360° akan aktif otomatis bila data panorama ditambahkan."
          />
          <div className="w-full max-w-xs shrink-0">
            <div className="flex items-center justify-between text-xs font-medium">
              <span>
                Lokasi {location.number} dari {String(locations.length).padStart(2, '0')}
              </span>
              <span className="text-muted-foreground">
                {visited.size}/{locations.length} dijelajahi
              </span>
            </div>
            <div
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-label="Posisi penelusuran"
              aria-valuenow={index + 1}
              aria-valuemin={1}
              aria-valuemax={locations.length}
            >
              <div className="h-full rounded-full bg-primary transition-[width] duration-700" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card sm:aspect-[16/10] lg:aspect-[21/9]">
            <div key={location.id} className="absolute inset-0 animate-in fade-in zoom-in-[1.02] duration-700">
              {location.panorama ? (
                <PanoramaViewer src={location.panorama} label={location.name} />
              ) : (
                <CaveImage image={location.image} sizes="(min-width: 1280px) 1216px, 100vw" showBadge={false} />
              )}
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30"
            />

            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-6">
              <span className="rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-white/85 uppercase backdrop-blur-md">
                {location.panorama ? 'Panorama 360°' : 'Pratinjau foto · bukan simulasi 360°/3D'}
                {location.image?.isPlaceholder && !location.panorama ? ' · ilustrasi' : ''}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className={pill.iconGlass}
                aria-label="Lihat foto layar penuh"
              >
                <Expand className="size-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => step(-1)}
              className={`${pill.iconGlass} absolute top-1/2 left-3 hidden -translate-y-1/2 sm:inline-flex md:left-6 md:size-12`}
              aria-label="Lokasi sebelumnya"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className={`${pill.iconGlass} absolute top-1/2 right-3 hidden -translate-y-1/2 sm:inline-flex md:right-6 md:size-12`}
              aria-label="Lokasi berikutnya"
            >
              <ChevronRight className="size-5" />
            </button>

            <div
              key={`text-${location.id}`}
              aria-live="polite"
              className="absolute inset-x-0 bottom-0 p-5 text-white animate-in fade-in slide-in-from-bottom-4 duration-700 md:p-10"
            >
              <p className="text-sm font-bold tracking-[0.2em] text-primary">{location.number}</p>
              <h3 className="mt-1 text-3xl font-bold tracking-tight md:text-5xl">{location.name}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-white/80 md:text-base">
                {location.narration}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => openStory(location.id)} className={pill.primary}>
                  <BookOpen className="size-4" aria-hidden="true" />
                  Baca Cerita
                </button>
                <button type="button" onClick={() => focusOnMap(location.id)} className={pill.glass}>
                  <Map className="size-4" aria-hidden="true" />
                  Kembali ke Peta
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button type="button" onClick={() => step(-1)} className={`${pill.icon} sm:hidden`} aria-label="Lokasi sebelumnya">
              <ChevronLeft className="size-4" />
            </button>
            <ol className="no-scrollbar flex flex-1 gap-3 overflow-x-auto md:grid md:grid-cols-6 md:overflow-visible" aria-label="Langkah penelusuran">
              {locations.map((item, i) => {
                const isActive = item.id === activeId
                return (
                  <li key={item.id} className="w-32 shrink-0 md:w-auto">
                    <button
                      type="button"
                      onClick={() => selectLocation(item.id)}
                      aria-current={isActive ? 'step' : undefined}
                      className={cn(
                        'group relative block aspect-[16/10] w-full overflow-hidden rounded-xl border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        isActive ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100',
                      )}
                    >
                      <CaveImage image={item.image} sizes="200px" showBadge={false} />
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <span className="absolute bottom-1.5 left-2 text-left text-[11px] leading-tight font-semibold text-white">
                        <span className="text-primary">{String(i + 1).padStart(2, '0')}</span> {item.name}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
            <button type="button" onClick={() => step(1)} className={`${pill.icon} sm:hidden`} aria-label="Lokasi berikutnya">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </Reveal>
      </div>

      <Lightbox items={lightboxItems} index={lightboxIndex} onIndexChange={onLightboxChange} />
    </section>
  )
}
