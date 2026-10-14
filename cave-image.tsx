'use client'

import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type CaveImageProps = {
  image: { src: string; alt: string; isPlaceholder: boolean } | null
  sizes: string
  priority?: boolean
  className?: string
  showBadge?: boolean
  badgePosition?: 'top-left' | 'bottom-right'
}

export function PlaceholderBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white/85 uppercase backdrop-blur-md',
        className,
      )}
    >
      Ilustrasi · bukan foto asli
    </span>
  )
}

export function CaveImage({
  image,
  sizes,
  priority,
  className,
  showBadge = true,
  badgePosition = 'top-left',
}: CaveImageProps) {
  const [failed, setFailed] = useState(false)

  if (!image || failed) {
    return (
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted text-center text-muted-foreground',
          className,
        )}
      >
        <ImageOff className="size-6" aria-hidden="true" />
        <span className="px-4 text-xs font-medium">Foto belum tersedia</span>
      </div>
    )
  }

  return (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', className)}
        onError={() => setFailed(true)}
      />
      {showBadge && image.isPlaceholder && (
        <PlaceholderBadge
          className={cn(
            'absolute z-10',
            badgePosition === 'top-left' ? 'top-3 left-3' : 'right-3 bottom-3',
          )}
        />
      )}
    </>
  )
}
