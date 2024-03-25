import { useEffect } from 'react'
import { useSorterStore } from 'src/store/sorterStore'

import type { EntryDetails } from '../lib/data'
import { useFilterStore } from '../store/filterStore'
import { usePlayerStore } from '../store/playerStore'
import EntryScreen from './EntryScreen'

function Battler({ songList }: { songList: EntryDetails[] }) {
  const {
    entries,
    sortedIndexes,
    currentComparisonLeft,
    currentComparisonRight,
    comparisonHeadLeft,
    comparisonHeadRight,
    finishFlag,
    sortedEntriesIds,
    setEntries,
    initList,
    sortList
  } = useSorterStore()
  const hasHydrated = useSorterStore((state) => state._hasHydrated)

  const { filteredEntries } = useFilterStore()
  const hasFilterHydrated = useFilterStore((state) => state._hasHydrated)

  const { setIsPlaying } = usePlayerStore()

  useEffect(() => {
    if (songList && hasFilterHydrated) {
      setEntries(songList)
      const filteredSongs = songList.filter(
        (song) => !filteredEntries.includes(song.id.toString())
      )
      initList(filteredSongs)
    }
  }, [songList, hasFilterHydrated])

  useEffect(() => {
    useSorterStore.persist.rehydrate()
    useFilterStore.persist.rehydrate()
  }, [])

  const firstCardIndex =
    sortedIndexes[currentComparisonLeft]?.[comparisonHeadLeft]
  const secondCardIndex =
    sortedIndexes[currentComparisonRight]?.[comparisonHeadRight]

  const firstCard = entries?.[firstCardIndex]
  const secondCard = entries?.[secondCardIndex]

  function handleVote(flag: boolean) {
    setIsPlaying(false)
    sortList(flag)
  }

  if (!hasHydrated) {
    return null
  }

  if (finishFlag) {
    // Redirect to the ranking page for now
    fetch('/api/setRanking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        editionId: '1',
        ranking: sortedEntriesIds
      })
    })
      .then((response) => {
        if (response.ok || response.status === 401) {
          const currentPath = window.location.pathname
          const rankingPath = currentPath.replace(/\/sorter$/, '/ranking')
          window.location.href = rankingPath
        } else {
          throw new Error('Failed to set ranking.')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  if (!firstCard || !secondCard) {
    return null
  }

  return (
    <div className='flex grow flex-col sm:flex-row'>
      <EntryScreen
        key={firstCard.id}
        entry={firstCard}
        onVote={() => {
          handleVote(false)
        }}
      />
      <EntryScreen
        key={secondCard.id}
        entry={secondCard}
        onVote={() => {
          handleVote(true)
        }}
      />
    </div>
  )
}

export default Battler
