const pillBase =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40'

export const pill = {
  primary: `${pillBase} h-11 px-5 bg-primary text-primary-foreground hover:bg-primary/85`,
  glass: `${pillBase} h-11 px-5 border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20`,
  outline: `${pillBase} h-11 px-5 border border-border bg-card text-foreground hover:bg-muted`,
  icon: `${pillBase} size-11 border border-border bg-card text-foreground hover:bg-muted`,
  iconGlass: `${pillBase} size-10 border border-white/20 bg-black/40 text-white backdrop-blur-md hover:bg-black/60`,
}
