import { useEffect } from 'react'

import type { Song } from '../lib/data'
import { useFilterStore } from '../store/filterStore'
import { usePlayerStore } from '../store/playerStore'
import { useSortingStore } from '../store/sortingStore'
import SongScreen from './SongScreen'

function BattlePair({ songList }: { songList: Song[] }) {
  const {
    songs,
    sortedIndexes,
    currentComparisonLeft,
    currentComparisonRight,
    comparisonHeadLeft,
    comparisonHeadRight,
    finishFlag,
    setSongs,
    initList,
    sortList
  } = useSortingStore()
  const hasHydrated = useSortingStore((state) => state._hasHydrated)

  const { filteredEntries } = useFilterStore()
  const hasFilterHydrated = useFilterStore((state) => state._hasHydrated)

  const { setIsPlaying } = usePlayerStore()

  useEffect(() => {
    if (songList && hasFilterHydrated) {
      setSongs(songList)
      const filteredSongs = songList.filter((song) => {
        // Check against the country.name property of each song
        return !filteredEntries.includes(song.country.name)
      })
      initList(filteredSongs)
    }
  }, [songList, hasFilterHydrated])

  useEffect(() => {
    useSortingStore.persist.rehydrate()
    useFilterStore.persist.rehydrate()
  }, [])

  const firstCardIndex =
    sortedIndexes[currentComparisonLeft]?.[comparisonHeadLeft]
  const secondCardIndex =
    sortedIndexes[currentComparisonRight]?.[comparisonHeadRight]

  const firstCard = songs?.[firstCardIndex]
  const secondCard = songs?.[secondCardIndex]

  function handleVote(flag: boolean) {
    setIsPlaying(false)
    sortList(flag)
  }

  if (!hasHydrated) {
    return null
  }

  if (finishFlag) {
    // Redirect to the ranking page for now
    window.location.href = '/ranking'
  }

  if (!firstCard || !secondCard) {
    return null
  }

  return (
    <div className='flex grow flex-col sm:flex-row'>
      <SongScreen
        key={firstCard.id}
        title={firstCard.title}
        artist={firstCard.artist}
        country={firstCard.country}
        audioUrl={firstCard.audioUrl}
        onVote={() => handleVote(false)}
      />
      <SongScreen
        key={secondCard.id}
        title={secondCard.title}
        artist={secondCard.artist}
        country={secondCard.country}
        audioUrl={secondCard.audioUrl}
        onVote={() => handleVote(true)}
      />
    </div>
  )
}

export default BattlePair
