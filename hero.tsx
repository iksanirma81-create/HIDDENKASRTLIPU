'use client'

import Image from 'next/image'
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Compass, Map, MapPin } from 'lucide-react'
import { useRef } from 'react'
import { useExplore } from './explore-provider'
import { CaveImage, PlaceholderBadge } from './cave-image'
import { locations } from '@/lib/data/locations'
import { visitInfo } from '@/lib/data/site'
import { pill } from '@/lib/ui'

const quickLinks = [
  { label: 'Storytelling', href: '#storytelling', icon: BookOpen },
  { label: 'Digital Map', href: '#mapping', icon: Map },
  { label: 'Virtual Tour', href: '#virtual', icon: Compass },
]

export function Hero() {
  const trackRef = useRef<HTMLUListElement>(null)
  const { openVirtual } = useExplore()

  const scrollTrack = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('li')
    const amount = card ? card.getBoundingClientRect().width + 12 : 200
    track.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }

  return (
    <section
      id="beranda"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-16"
    >
      <Image
        src="/images/hero.png"
        alt="Ilustrasi lanskap mulut gua kapur di tengah hutan tropis"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/30 to-background"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/20 to-transparent"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 md:px-8">
        <nav aria-label="Akses cepat eksplorasi" className="mt-6 flex justify-center md:mt-8">
          <ul className="flex items-center gap-1 rounded-full border border-white/15 bg-black/40 p-1.5 backdrop-blur-md">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-bold tracking-[0.16em] text-white/85 uppercase transition-colors hover:bg-white/15 hover:text-white sm:px-4"
                >
                  <Icon className="size-3.5 text-primary" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-1 flex-col justify-end gap-10 pt-16 pb-10 lg:flex-row lg:items-end lg:justify-between lg:pb-16">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-primary uppercase">
              <MapPin className="size-3.5" aria-hidden="true" />
              Buton Tengah · Sulawesi Tenggara
            </p>
            <h1
              id="hero-title"
              className="mt-4 text-5xl leading-[0.95] font-extrabold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl"
            >
              Discover the Hidden World of Laumehe
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/80 md:text-lg">
              Jelajahi ruang-ruang gua, kenali cerita alam dan budaya, serta rasakan pengalaman
              eksplorasi digital Gua Laumehe.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#storytelling" className={pill.primary}>
                START EXPLORING
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a href="#virtual" className={pill.glass}>
                VIRTUAL EXPERIENCE
              </a>
            </div>
            <p className="mt-6 text-xs text-white/60">
              Buka setiap hari {visitInfo.hours}* · <span className="text-white/45">*konfirmasi ke pengelola</span>
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
                6 Lokasi Eksplorasi
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollTrack(-1)}
                  className={pill.iconGlass}
                  aria-label="Lokasi sebelumnya"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTrack(1)}
                  className={pill.iconGlass}
                  aria-label="Lokasi berikutnya"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
            <ul
              ref={trackRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
              aria-label="Carousel lokasi eksplorasi"
            >
              {locations.map((location) => (
                <li key={location.id} className="w-40 shrink-0 snap-start sm:w-44">
                  <button
                    type="button"
                    onClick={() => openVirtual(location.id)}
                    className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/15 text-left shadow-2xl shadow-black/50 transition-transform duration-500 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <CaveImage
                      image={location.image}
                      sizes="176px"
                      showBadge={false}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
                    />
                    <span className="absolute inset-x-3 bottom-3 block">
                      <span className="block text-[11px] font-bold text-primary">{location.number}</span>
                      <span className="block text-sm leading-tight font-semibold text-white">
                        {location.name}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <PlaceholderBadge className="mt-2" />
          </div>
        </div>
      </div>
    </section>
  )
}
