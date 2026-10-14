import { navItems, visitInfo } from '@/lib/data/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="text-lg font-extrabold tracking-[0.22em]">GUA LAUMEHE</p>
          <p className="mt-1 text-sm font-medium text-primary">Digital Cave Experience</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Media pengenalan wisata Gua Laumehe secara digital melalui storytelling, pemetaan interaktif, dan
            pengalaman virtual.
          </p>
        </div>

        <nav aria-label="Navigasi footer">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Jelajahi</p>
          <ul className="mt-4 space-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-foreground/80 hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Kunjungi</p>
          <address className="mt-4 text-sm leading-relaxed text-foreground/80 not-italic">
            {visitInfo.fullLocation}
          </address>
          <p className="mt-3 text-sm text-foreground/80">Jam operasional: {visitInfo.hours}</p>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Gua Laumehe Digital Cave Experience.</p>
          <p>Seluruh gambar pada website ini adalah ilustrasi sementara, bukan foto asli Gua Laumehe.</p>
        </div>
      </div>
    </footer>
  )
}
