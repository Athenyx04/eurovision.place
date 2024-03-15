import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FilterStore {
  filteredEntries: string[]
  _hasHydrated: boolean
  setFilteredEntries: (filteredEntries: string[]) => void
  setHasHydrated: (state: boolean) => void
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      filteredEntries: ['Israel'],
      _hasHydrated: false,
      setFilteredEntries: (filteredEntries: string[]) =>
        set({ filteredEntries }),
      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state })
      }
    }),
    {
      name: 'filter-store',
      partialize: (state) => ({
        filteredEntries: state.filteredEntries
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true)
        }
      }
    }
  )
)
