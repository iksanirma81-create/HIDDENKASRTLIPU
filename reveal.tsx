'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} data-visible={visible} className={cn('reveal', className)}>
      {children}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string
  title: string
  description?: string
  id?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-4xl font-bold tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
