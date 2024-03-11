import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Song } from '../lib/data'

interface SortingStore {
  songs?: Song[]

  // Stores indexes of the songs to be sorted.
  // Initially, it contains a single array with indexes representing all songs.
  sortedIndexes: number[][]
  // Keeps track of relationships between divided segments of sortedIndexes.
  segmentParents: number[]
  // Initialized to track the number of items that have been processed.
  totalSize: number

  // Records the user's preferences.
  comparisonResults: number[]

  // Current segments being compared.
  currentComparisonLeft: number
  currentComparisonRight: number

  // Indexes within the segments being compared.
  comparisonHeadLeft: number
  comparisonHeadRight: number

  finishSize: number
  finishFlag: boolean
  _hasHydrated: boolean
  setSongs: (songs: Song[]) => void
  setHasHydrated: (state: boolean) => void

  // Prepares the list for sorting.
  // Initializes several arrays to manage the sorting state,
  // including dividing the songs into segments for comparison.
  initList: (songs: Song[]) => void

  sortList: (flag: boolean) => void
}

export const useSortingStore = create<SortingStore>()(
  persist(
    (set) => ({
      songs: [],
      sortedIndexes: [],
      segmentParents: [],
      totalSize: 0,
      comparisonResults: [],
      currentComparisonLeft: 0,
      currentComparisonRight: 0,
      comparisonHeadLeft: 0,
      comparisonHeadRight: 0,
      finishSize: 0,
      finishFlag: false,
      _hasHydrated: false,

      setSongs: (songs) => {
        set({ songs })
      },

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state })
      },

      /*
        * Divides the list of songs into smaller segments (or nodes) 
        * and stores these segments in sortedIndexes. It uses segmentParents to keep
        * track of the relationship between these segments, mimicking a binary 
        * tree's structure. Also, sets the initial state for sorting, including the 
        * current segments to be compared and the head positions within those segments.
  
        * @param {Song[]} songs - The list of songs to be sorted.
        */
      initList: (songs) => {
        const totalSongs = songs.length

        // Create an array of song indexes
        const initialSortedIndexes = Array.from(Array(totalSongs).keys())
        const tempSortedIndexes = [initialSortedIndexes]
        const tempSegmentParents = [-1]
        let totalSize = 0
        const queue = [initialSortedIndexes]

        while (queue.length > 0) {
          // Return the first segment in the queue
          const currentSegment = queue.shift()
          if (currentSegment && currentSegment.length > 1) {
            const midIndex = Math.ceil(currentSegment.length / 2)
            const leftSegment = currentSegment.slice(0, midIndex)
            const rightSegment = currentSegment.slice(midIndex)
            const parentIndex = tempSortedIndexes.indexOf(currentSegment)

            // Add new segments to the temp arrays and the queue for further division
            tempSortedIndexes.push(leftSegment, rightSegment)
            tempSegmentParents.push(parentIndex, parentIndex)

            // Increment totalSize for each division
            totalSize += currentSegment.length

            // Only add to the queue if the segment has more than one item
            if (leftSegment.length > 1) {
              queue.push(leftSegment)
            }
            if (rightSegment.length > 1) {
              queue.push(rightSegment)
            }
          }
        }

        // Update state once all divisions are complete
        set({
          songs,
          sortedIndexes: tempSortedIndexes,
          segmentParents: tempSegmentParents,
          totalSize,
          comparisonResults: [],
          currentComparisonLeft: tempSortedIndexes.length - 2,
          currentComparisonRight: tempSortedIndexes.length - 1,
          comparisonHeadLeft: 0,
          comparisonHeadRight: 0,
          finishSize: 0,
          finishFlag: false
        })
      },

      /*
        * Determines the vote winner based on flag and adds it to comparisonResults.
        * It also increments the comparisonHead for the winning side and the finishSize.
        * If one of the segments is exhausted, it pulls the remaining items from the 
        * other segment and merges them with the comparisonResults. 
        * When both segments are exhausted, it merges the comparisonResults back
        * into the main array and prepares for the next comparison.
  
        * @param {boolean} flag - The user's preference for the comparison.
        */
      sortList: (flag: boolean) => {
        set((state) => {
          const {
            sortedIndexes,
            currentComparisonLeft,
            currentComparisonRight,
            comparisonHeadLeft,
            comparisonHeadRight,
            comparisonResults
          } = state

          const newComparisonResults = [...comparisonResults]
          let newComparisonHeadLeft = comparisonHeadLeft
          let newComparisonHeadRight = comparisonHeadRight
          let newFinishSize = state.finishSize

          // Determine the vote winner based on flag and update state accordingly
          if (flag) {
            // If true, right side won
            newComparisonResults.push(
              sortedIndexes[currentComparisonRight][comparisonHeadRight]
            )
            newComparisonHeadRight += 1
          } else {
            // If false, left side won
            newComparisonResults.push(
              sortedIndexes[currentComparisonLeft][comparisonHeadLeft]
            )
            newComparisonHeadLeft += 1
          }
          newFinishSize += 1

          // Check if we need to pull remaining items from one of the segments
          const remainingItemsProcess = () => {
            while (
              newComparisonHeadLeft <
              sortedIndexes[currentComparisonLeft].length
            ) {
              newComparisonResults.push(
                sortedIndexes[currentComparisonLeft][newComparisonHeadLeft]
              )
              newComparisonHeadLeft += 1
              newFinishSize += 1
            }

            while (
              newComparisonHeadRight <
              sortedIndexes[currentComparisonRight].length
            ) {
              newComparisonResults.push(
                sortedIndexes[currentComparisonRight][newComparisonHeadRight]
              )
              newComparisonHeadRight += 1
              newFinishSize += 1
            }
          }

          // Determine if any side ia exhausted and merge if so
          if (
            newComparisonHeadLeft ===
              sortedIndexes[currentComparisonLeft].length ||
            newComparisonHeadRight ===
              sortedIndexes[currentComparisonRight].length
          ) {
            remainingItemsProcess()

            // Merge back into the main array and prepare for the next comparison

            // Remove the last two compared segments
            const newSortedIndexes = sortedIndexes.slice(0, -2)
            newSortedIndexes[state.segmentParents[currentComparisonLeft]] =
              newComparisonResults

            const nextLeft = currentComparisonLeft - 2
            const nextRight = currentComparisonRight - 2
            const finishFlag = nextLeft < 0

            // If finish flag is true, sorting is complete, create the sorted songs array
            if (finishFlag) {
              const sortedSongs = newSortedIndexes[0].map(
                (index) => state.songs?.[index]
              )
              return {
                ...state,
                sortedIndexes: newSortedIndexes,
                comparisonResults: [],
                currentComparisonLeft: nextLeft,
                currentComparisonRight: nextRight,
                comparisonHeadLeft: 0,
                comparisonHeadRight: 0,
                finishSize: newFinishSize,
                finishFlag: finishFlag,
                songs: sortedSongs
              }
            }

            return {
              ...state,
              sortedIndexes: newSortedIndexes,
              comparisonResults: [],
              currentComparisonLeft: nextLeft,
              currentComparisonRight: nextRight,
              comparisonHeadLeft: 0,
              comparisonHeadRight: 0,
              finishSize: newFinishSize,
              // Sorting is complete if no more segments to compare
              finishFlag: finishFlag
            }
          }

          // If not yet exhausted, just update the heads and finish size
          return {
            ...state,
            comparisonHeadLeft: newComparisonHeadLeft,
            comparisonHeadRight: newComparisonHeadRight,
            comparisonResults: newComparisonResults,
            finishSize: newFinishSize
          }
        })
      }
    }),
    {
      name: 'sorting-store',
      partialize: (state) => ({
        songs: state.songs
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true)
        }
      }
    }
  )
)
