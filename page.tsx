import { AboutGallery } from '@/components/about-gallery'
import { CaveRules } from '@/components/cave-rules'
import { DigitalMap } from '@/components/digital-map'
import { ExploreProvider } from '@/components/explore-provider'
import { Hero } from '@/components/hero'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Storytelling } from '@/components/storytelling'
import { VirtualExperience } from '@/components/virtual-experience'
import { VisitingHours } from '@/components/visiting-hours'

export default function Page() {
  return (
    <ExploreProvider>
      <SiteHeader />
      <main>
        <Hero />
        <Storytelling />
        <DigitalMap />
        <VirtualExperience />
        <AboutGallery />
        <CaveRules />
        <VisitingHours />
      </main>
      <SiteFooter />
    </ExploreProvider>
  )
}
