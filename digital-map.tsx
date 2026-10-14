'use client'

import { BookOpen, Compass, Info, Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useExplore } from './explore-provider'
import { CaveImage } from './cave-image'
import { Reveal, SectionHeading } from './reveal'
import { getLocation, locations, type LocationId } from '@/lib/data/locations'
import { caveMap } from '@/lib/data/site'
import { cn } from '@/lib/utils'
import { pill } from '@/lib/ui'

const MIN_SCALE = 1
const MAX_SCALE = 3

export function DigitalMap() {
  const { activeId, visited, highlightKey, selectLocation, openStory, openVirtual } = useExplore()
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [expanded, setExpanded] = useState(false)
  const [mapFailed, setMapFailed] = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null)
  const active = getLocation(activeId)
  const showRealMap = caveMap.available && !mapFailed

  useEffect(() => {
    if (!expanded) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [expanded])

  const zoomTo = (next: number) => {
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next))
    setScale(clamped)
    if (clamped === 1) setOffset({ x: 0, y: 0 })
  }

  const reset = () => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (scale === 1) return
    dragRef.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y, moved: false }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag) return
    const dx = event.clientX - drag.x
    const dy = event.clientY - drag.y
    if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 4) {
      drag.moved = true
      setDragging(true)
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    if (!drag.moved) return
    const rect = event.currentTarget.getBoundingClientRect()
    const maxX = (rect.width * (scale - 1)) / 2
    const maxY = (rect.height * (scale - 1)) / 2
    setOffset({
      x: Math.max(-maxX, Math.min(maxX, drag.ox + dx)),
      y: Math.max(-maxY, Math.min(maxY, drag.oy + dy)),
    })
  }

  const endDrag = () => {
    dragRef.current = null
    setDragging(false)
  }

  const onMarkerClick = (id: LocationId) => {
    if (dragging) return
    selectLocation(id)
  }

  return (
    <section id="mapping" aria-labelledby="map-title" className="bg-card/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <SectionHeading
            id="map-title"
            eyebrow="Digital Mapping"
            title="Explore the Cave Through Digital Mapping"
            description="Pilih titik pada peta untuk melihat informasi setiap ruang. Peta dapat diperbesar dan digeser."
          />
        </Reveal>

        <Reveal className="mt-12 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div
            className={cn(
              expanded
                ? 'fixed inset-0 z-[70] flex flex-col bg-background p-3 md:p-6'
                : 'relative',
            )}
            role={expanded ? 'dialog' : undefined}
            aria-modal={expanded ? true : undefined}
            aria-label={expanded ? 'Peta Gua Laumehe layar penuh' : undefined}
          >
            <div
              className={cn(
                'relative overflow-hidden rounded-3xl border border-border bg-background',
                expanded ? 'flex-1' : '',
              )}
              style={expanded ? undefined : { aspectRatio: caveMap.aspectRatio }}
            >
              <div
                className={cn(
                  'absolute inset-0 touch-none select-none',
                  scale > 1 ? 'cursor-grab active:cursor-grabbing' : '',
                )}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              >
                <div
                  className="absolute inset-0 origin-center transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    transitionDuration: dragging ? '0ms' : undefined,
                  }}
                >
                  {showRealMap ? (
                    // eslint-disable-next-line @next/next/no-img-element -- peta asli ditampilkan apa adanya tanpa optimasi/crop
                    <img
                      src={caveMap.src}
                      alt={caveMap.alt}
                      className="absolute inset-0 size-full object-contain"
                      draggable={false}
                      onError={() => setMapFailed(true)}
                    />
                  ) : (
                    <MapPlaceholder />
                  )}

                  {locations.map((location) => {
                    const isActive = location.id === activeId
                    const isVisited = visited.has(location.id)
                    return (
                      <button
                        key={location.id}
                        type="button"
                        onClick={() => onMarkerClick(location.id)}
                        aria-pressed={isActive}
                        aria-label={`Lokasi ${location.number}: ${location.name}`}
                        className="group absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
                        style={{ left: `${location.marker.x}%`, top: `${location.marker.y}%` }}
                      >
                        <span
                          className="flex flex-col items-center gap-1.5"
                          style={{ transform: `scale(${1 / scale})` }}
                        >
                          <span className="relative grid place-items-center">
                            {isActive && (
                              <span
                                key={highlightKey}
                                aria-hidden="true"
                                className="absolute size-10 animate-ping rounded-full bg-primary/50"
                              />
                            )}
                            <span
                              className={cn(
                                'relative grid size-9 place-items-center rounded-full border-2 text-xs font-bold shadow-lg shadow-black/60 transition-all group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background',
                                isActive
                                  ? 'scale-110 border-white bg-primary text-primary-foreground'
                                  : isVisited
                                    ? 'border-primary bg-secondary text-white'
                                    : 'border-white/70 bg-black/80 text-white',
                              )}
                            >
                              {location.number}
                            </span>
                          </span>
                          <span
                            className={cn(
                              'rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap backdrop-blur-md transition-opacity',
                              isActive
                                ? 'bg-primary text-primary-foreground opacity-100'
                                : 'bg-black/70 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 md:opacity-80',
                            )}
                          >
                            {location.name}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => zoomTo(scale + 0.5)}
                  disabled={scale >= MAX_SCALE}
                  className={pill.iconGlass}
                  aria-label="Perbesar peta"
                >
                  <ZoomIn className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => zoomTo(scale - 0.5)}
                  disabled={scale <= MIN_SCALE}
                  className={pill.iconGlass}
                  aria-label="Perkecil peta"
                >
                  <ZoomOut className="size-4" />
                </button>
                <button type="button" onClick={reset} className={pill.iconGlass} aria-label="Atur ulang tampilan peta">
                  <RotateCcw className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className={pill.iconGlass}
                  aria-label={expanded ? 'Keluar layar penuh' : 'Tampilkan peta layar penuh'}
                >
                  {expanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                </button>
              </div>

              <span className="absolute bottom-3 left-3 z-10 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md">
                Zoom {Math.round(scale * 100)}%{scale > 1 ? ' · seret untuk menggeser' : ''}
              </span>
            </div>

            {expanded && (
              <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-primary">{active.number}</p>
                  <p className="truncate font-semibold">{active.name}</p>
                </div>
                <button type="button" onClick={() => setExpanded(false)} className={pill.outline}>
                  Tutup
                </button>
              </div>
            )}

            {!expanded && <MapLegend />}
          </div>

          <LocationPanel
            key={active.id}
            locationId={active.id}
            onStory={() => openStory(active.id)}
            onVirtual={() => openVirtual(active.id)}
          />
        </Reveal>
      </div>
    </section>
  )
}

function MapPlaceholder() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(oklch(1 0 0 / 0.05) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <div className="absolute top-4 left-4 flex max-w-[15rem] flex-col items-start gap-2 pr-4">
        <span className="rounded-full border border-dashed border-white/25 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white/50 uppercase">
          Placeholder
        </span>
        <p className="text-[11px] leading-relaxed text-white/45">
          Peta asli Gua Laumehe belum diunggah. Posisi titik bersifat sementara.
        </p>
      </div>
    </div>
  )
}

function MapLegend() {
  return (
    <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground" aria-label="Legenda peta">
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-full border-2 border-white/70 bg-black" aria-hidden="true" />
          Titik lokasi
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-full border-2 border-white bg-primary" aria-hidden="true" />
          Lokasi terpilih
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-full border-2 border-primary bg-secondary" aria-hidden="true" />
          Sudah dikunjungi
        </li>
      </ul>
      <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Info className="size-3.5 shrink-0" aria-hidden="true" />
        Posisi titik bersifat visual, bukan koordinat GPS.
      </p>
    </div>
  )
}

function LocationPanel({
  locationId,
  onStory,
  onVirtual,
}: {
  locationId: LocationId
  onStory: () => void
  onVirtual: () => void
}) {
  const location = getLocation(locationId)
  return (
    <aside
      aria-live="polite"
      aria-label={`Informasi ${location.name}`}
      className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <div className="relative aspect-[16/10]">
        <CaveImage image={location.image} sizes="(min-width: 1024px) 380px, 100vw" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold tracking-[0.2em] text-primary">LOKASI {location.number}</p>
        <h3 className="mt-1 text-2xl font-bold tracking-tight">{location.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{location.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/85">{location.description}</p>
        <div className="mt-4 rounded-2xl bg-secondary/40 p-4">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">Edukasi</p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{location.education}</p>
        </div>
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <button type="button" onClick={onStory} className={pill.outline}>
            <BookOpen className="size-4" aria-hidden="true" />
            Buka Cerita
          </button>
          <button type="button" onClick={onVirtual} className={pill.primary}>
            <Compass className="size-4" aria-hidden="true" />
            Virtual Experience
          </button>
        </div>
      </div>
    </aside>
  )
}
