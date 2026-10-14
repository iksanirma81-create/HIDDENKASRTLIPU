'use client'

import { useRef, useState } from 'react'

/**
 * Viewer panorama sederhana (geser horizontal, berulang 360°).
 * Aktif otomatis bila sebuah lokasi memiliki properti `panorama`.
 * Dapat diganti dengan viewer equirectangular penuh (mis. three.js) di tahap berikutnya.
 */
export function PanoramaViewer({ src, label }: { src: string; label: string }) {
  const [offset, setOffset] = useState(0)
  const dragRef = useRef<{ x: number; start: number } | null>(null)

  return (
    <div
      role="img"
      aria-label={`Panorama ${label}. Seret atau gunakan tombol panah untuk melihat sekeliling.`}
      tabIndex={0}
      className="absolute inset-0 cursor-grab touch-none bg-repeat-x active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-ring"
      style={{ backgroundImage: `url(${src})`, backgroundSize: 'auto 100%', backgroundPositionX: `${offset}px` }}
      onPointerDown={(event) => {
        dragRef.current = { x: event.clientX, start: offset }
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        if (dragRef.current) setOffset(dragRef.current.start + (event.clientX - dragRef.current.x))
      }}
      onPointerUp={() => (dragRef.current = null)}
      onPointerCancel={() => (dragRef.current = null)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') setOffset((o) => o + 60)
        if (event.key === 'ArrowRight') setOffset((o) => o - 60)
      }}
    />
  )
}
