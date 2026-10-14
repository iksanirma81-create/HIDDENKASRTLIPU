import { Leaf } from 'lucide-react'
import { Reveal, SectionHeading } from './reveal'
import { caveRules } from '@/lib/data/rules'
import { conservationMessage } from '@/lib/data/site'

export function CaveRules() {
  return (
    <section id="tata-tertib" aria-labelledby="rules-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <SectionHeading
            id="rules-title"
            eyebrow="Tata Tertib"
            title="Explore Safely, Preserve Naturally"
            description="Panduan dasar demi keselamatan pengunjung dan kelestarian gua. Sesuaikan dengan kebijakan resmi pengelola setempat."
          />
        </Reveal>

        <Reveal className="mt-12">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {caveRules.map(({ text, icon: Icon }, index) => (
              <li
                key={text}
                className="group flex gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary/60 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <span className="text-[11px] font-bold text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-0.5 text-sm leading-relaxed text-foreground/90">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex flex-col items-start gap-4 rounded-3xl bg-secondary p-6 md:flex-row md:items-center md:p-8">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Leaf className="size-5" aria-hidden="true" />
            </span>
            <p className="text-lg font-semibold text-balance md:text-xl">{conservationMessage}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
