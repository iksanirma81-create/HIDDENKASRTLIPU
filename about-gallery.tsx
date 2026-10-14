'use client'

import { Droplets, Leaf, Mountain, Sparkles } from 'lucide-react'
import { useCallback, useState } from 'react'
import { CaveImage } from './cave-image'
import { Lightbox, type LightboxItem } from './lightbox'
import { Reveal, SectionHeading } from './reveal'
import { locations } from '@/lib/data/locations'
import { cn } from '@/lib/utils'

const highlights = [
  {
    icon: Mountain,
    title: 'Keunikan Alam',
    text: 'Ruang-ruang gua kapur dengan formasi batuan dan genangan air di dalamnya.',
  },
  {
    icon: Droplets,
    title: 'Edukasi Geologi',
    text: 'Belajar bagaimana stalaktit, stalagmit, dan lorong gua terbentuk secara alami.',
  },
  {
    icon: Leaf,
    title: 'Pelestarian',
    text: 'Gua adalah ekosistem rapuh yang perlu dijaga bersama pengunjung dan masyarakat.',
  },
  {
    icon: Sparkles,
    title: 'Pengalaman Wisata',
    text: 'Penelusuran berpemandu menuju ruang-ruang yang menyimpan suasana berbeda.',
  },
]

const galleryItems: LightboxItem[] = [
  {
    src: '/images/hero.png',
    alt: 'Ilustrasi lanskap mulut gua di tengah hutan tropis',
    title: 'Lanskap Sekitar Gua',
    caption: 'Ilustrasi suasana lanskap di sekitar mulut gua.',
    isPlaceholder: true,
  },
  ...locations
    .filter((location) => location.image)
    .map((location) => ({
      src: location.image!.src,
      alt: location.image!.alt,
      title: `${location.number} · ${location.name}`,
      caption: location.tagline,
      isPlaceholder: location.image!.isPlaceholder,
    })),
]

export function AboutGallery() {
  const [index, setIndex] = useState<number | null>(null)
  const onIndexChange = useCallback((value: number | null) => setIndex(value), [])

  return (
    <section id="galeri" aria-labelledby="about-title" className="bg-card/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <SectionHeading
            id="about-title"
            eyebrow="Tentang Gua Laumehe"
            title="A Hidden Wonder of Buton Tengah"
            description="Gua Laumehe terletak di Wantopi, Kecamatan Mawasangka Timur, Kabupaten Buton Tengah, Sulawesi Tenggara. Website ini menjadi media pengenalan wisata gua secara digital — interaktif, informatif, dan edukatif."
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-border bg-card p-5">
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-2xl font-bold tracking-tight">Galeri</h3>
            <p className="text-xs text-muted-foreground">Seluruh gambar adalah ilustrasi sementara.</p>
          </div>
          <ul className="mt-6 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
            {galleryItems.map((item, i) => (
              <li
                key={item.src}
                className={cn(i === 0 && 'col-span-2 row-span-2', i === 4 && 'md:col-span-2')}
              >
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="group relative block size-full overflow-hidden rounded-2xl border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Buka ${item.title}`}
                >
                  <CaveImage
                    image={item}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    showBadge={i === 0}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                  <span className="absolute bottom-3 left-3 text-left text-sm font-semibold text-white">
                    {item.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Lightbox items={galleryItems} index={index} onIndexChange={onIndexChange} />
    </section>
  )
}
