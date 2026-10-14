'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useExplore } from './explore-provider'
import { navItems } from '@/lib/data/site'
import { getLocation, locations } from '@/lib/data/locations'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { activeId, visited } = useExplore()
  const active = getLocation(activeId)
  const progress = (visited.size / locations.length) * 100

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:px-8">
        <a href="#beranda" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-full border border-primary/50 text-[11px] font-bold text-primary"
          >
            GL
          </span>
          <span className="text-sm font-extrabold tracking-[0.22em] text-white">GUA LAUMEHE</span>
        </a>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 xl:flex" aria-live="polite">
          <span className="text-[11px] tracking-wider text-white/50 uppercase">Lokasi aktif</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            {active.number} · {active.name}
          </span>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className="h-0.5 bg-primary transition-[width] duration-700"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-label="Progres eksplorasi"
        aria-valuenow={visited.size}
        aria-valuemin={0}
        aria-valuemax={locations.length}
      />

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navigasi mobile"
          className="border-t border-white/10 bg-black px-4 pb-6 animate-in fade-in slide-in-from-top-2 lg:hidden"
        >
          <ul className="flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3.5 text-base font-medium text-white/85 hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-white/50">
            Lokasi aktif: {active.number} · {active.name} — {visited.size}/{locations.length} dijelajahi
          </p>
        </nav>
      )}
    </header>
  )
}
