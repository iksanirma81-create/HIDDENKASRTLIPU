'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { chapters } from '@/lib/data/chapters'
import { locations, type LocationId } from '@/lib/data/locations'

type ExploreContextValue = {
  activeId: LocationId
  visited: ReadonlySet<LocationId>
  chapterIndex: number
  highlightKey: number
  selectLocation: (id: LocationId) => void
  setChapterIndex: (index: number) => void
  focusOnMap: (id: LocationId) => void
  openVirtual: (id: LocationId) => void
  openStory: (id: LocationId) => void
}

const ExploreContext = createContext<ExploreContextValue | null>(null)

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function ExploreProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<LocationId>(locations[0].id)
  const [visited, setVisited] = useState<Set<LocationId>>(() => new Set([locations[0].id]))
  const [chapterIndex, setChapterIndexState] = useState(0)
  const [highlightKey, setHighlightKey] = useState(0)

  const selectLocation = useCallback((id: LocationId) => {
    setActiveId(id)
    setVisited((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
  }, [])

  const setChapterIndex = useCallback(
    (index: number) => {
      const safe = (index + chapters.length) % chapters.length
      setChapterIndexState(safe)
      selectLocation(chapters[safe].locationId)
    },
    [selectLocation],
  )

  const focusOnMap = useCallback(
    (id: LocationId) => {
      selectLocation(id)
      setHighlightKey((k) => k + 1)
      scrollToSection('mapping')
    },
    [selectLocation],
  )

  const openVirtual = useCallback(
    (id: LocationId) => {
      selectLocation(id)
      scrollToSection('virtual')
    },
    [selectLocation],
  )

  const openStory = useCallback(
    (id: LocationId) => {
      const index = chapters.findIndex((chapter) => chapter.locationId === id)
      if (index >= 0) setChapterIndexState(index)
      selectLocation(id)
      scrollToSection('storytelling')
    },
    [selectLocation],
  )

  const value = useMemo(
    () => ({
      activeId,
      visited,
      chapterIndex,
      highlightKey,
      selectLocation,
      setChapterIndex,
      focusOnMap,
      openVirtual,
      openStory,
    }),
    [
      activeId,
      visited,
      chapterIndex,
      highlightKey,
      selectLocation,
      setChapterIndex,
      focusOnMap,
      openVirtual,
      openStory,
    ],
  )

  return <ExploreContext.Provider value={value}>{children}</ExploreContext.Provider>
}

export function useExplore() {
  const context = useContext(ExploreContext)
  if (!context) throw new Error('useExplore must be used within ExploreProvider')
  return context
}
