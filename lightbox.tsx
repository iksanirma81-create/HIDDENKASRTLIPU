'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect } from 'react'
import { PlaceholderBadge } from './cave-image'
import { pill } from '@/lib/ui'

export type LightboxItem = {
  src: string
  alt: string
  title: string
  caption: string
  isPlaceholder: boolean
}

type LightboxProps = {
  items: LightboxItem[]
  index: number | null
  onIndexChange: (index: number | null) => void
}

export function Lightbox({ items, index, onIndexChange }: LightboxProps) {
  const open = index !== null
  const item = open ? items[index] : null

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onIndexChange(null)
      if (event.key === 'ArrowRight') onIndexChange(((index ?? 0) + 1) % items.length)
      if (event.key === 'ArrowLeft') onIndexChange(((index ?? 0) - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, index, items.length, onIndexChange])

  if (!item || index === null) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galeri: ${item.title}`}
      className="fixed inset-0 z-[80] flex flex-col bg-black/95 animate-in fade-in"
    >
      <div className="flex items-center justify-between gap-4 p-4 text-white">
        <p className="text-sm font-medium text-white/70">
          {index + 1} / {items.length}
        </p>
        <button
          type="button"
          onClick={() => onIndexChange(null)}
          className={pill.iconGlass}
          aria-label="Tutup galeri"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex-1">
        <Image
          key={item.src}
          src={item.src}
          alt={item.alt}
          fill
          sizes="100vw"
          className="object-contain animate-in fade-in zoom-in-95"
        />
        {item.isPlaceholder && <PlaceholderBadge className="absolute top-3 left-3" />}
        <button
          type="button"
          onClick={() => onIndexChange((index - 1 + items.length) % items.length)}
          className={`${pill.iconGlass} absolute top-1/2 left-3 -translate-y-1/2`}
          aria-label="Foto sebelumnya"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => onIndexChange((index + 1) % items.length)}
          className={`${pill.iconGlass} absolute top-1/2 right-3 -translate-y-1/2`}
          aria-label="Foto berikutnya"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-3xl p-6 text-center text-white">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-white/70">{item.caption}</p>
      </div>
    </div>
  )
}
