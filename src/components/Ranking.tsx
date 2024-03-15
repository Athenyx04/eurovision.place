import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import html2canvas from 'html2canvas'
import { useEffect, useState } from 'react'

import { type Song } from '../lib/data.ts'
import { useSortingStore } from '../store/sortingStore.ts'
import RankingHeader from './RankingHeader.tsx'
import RankingSongList from './RankingSongList.tsx'
import ShareContainer from './ShareContainer.tsx'
import ShareDialog from './ShareDialog.tsx'
import { type OptionType } from './ui/multiSelect.tsx'

const Load = () => (
  <svg
    role='img'
    aria-hidden='true'
    width='48'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='#e5e5e5'
    fill='none'
    className='animate-spin'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M12 3a9 9 0 1 0 9 9' />
  </svg>
)

function Ranking({ songList }: { songList: Song[] }) {
  const { sortedSongIds, setSongIds } = useSortingStore()
  const hasHydrated = useSortingStore((state) => state._hasHydrated)

  const [activeId, setActiveId] = useState<string | number | null>(null)
  const [activeItem, setActiveItem] = useState<Song | null>(null)
  const [shareImage, setShareImage] = useState<HTMLCanvasElement | null>(null)
  const [songs, setSongs] = useState<Song[]>([])
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([])
  const [viewGroup, setViewGroup] = useState<string>('')
  const [filteredEntries, setFilteredEntries] = useState<string[]>(['Israel'])
  const [entryValues, setEntryValues] = useState<OptionType[]>([])
  const [rankingTitle, setRankingTitle] = useState<string>('My Eurovision 2024')

  function handleSelectRanking(ranking: string) {
    triggerScreenshot(ranking)
  }

  async function triggerScreenshot(elementId: string) {
    const element = document.getElementById(elementId)

    if (!element) {
      console.error('Element not found:', elementId)
      return
    }

    const scale = 2
    const canvas = document.createElement('canvas')
    const logging = false
    canvas.width = element.offsetWidth * scale
    canvas.height = element.offsetHeight * scale

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.error('Canvas context not found')
      return
    }
    const originalDrawImage = ctx.drawImage

    ctx.drawImage = function (...args: any[]) {
      let image = args[0]
      let sx, sy, sw, sh, dx, dy, dw, dh

      if (args.length === 3) {
        ;[dx, dy] = args.slice(1)
      } else if (args.length === 5) {
        ;[dx, dy, dw, dh] = args.slice(1)
      } else if (args.length === 9) {
        ;[sx, sy, sw, sh, dx, dy, dw, dh] = args.slice(1)
      }

      if (image instanceof HTMLImageElement && args.length === 9) {
        if (sw / dw < sh / dh) {
          const originalDh = dh
          dh = sh * (dw / sw)
          dy += (originalDh - dh) / 2
        } else {
          const originalDw = dw
          dw = sw * (dh / sh)
          dx += (originalDw - dw) / 2
        }
      }

      if (args.length === 9) {
        return originalDrawImage.call(
          ctx,
          image,
          sx,
          sy,
          sw,
          sh,
          dx,
          dy,
          dw,
          dh
        )
      }
    }

    const finalCanvas = await html2canvas(element, {
      canvas,
      scale,
      logging,
      useCORS: true
    })
    setShareImage(finalCanvas)
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (!over || active.id === over.id) {
      return
    }

    // Find indexes in the filtered list
    const oldIndex = filteredSongs.findIndex((song) => song.id === active.id)
    const newIndex = filteredSongs.findIndex((song) => song.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      return // If for some reason the indexes are not found, exit
    }

    // Generate a new array based on the filteredSongs order
    const newFilteredSongs = arrayMove(filteredSongs, oldIndex, newIndex)
    setFilteredSongs(newFilteredSongs)

    // Apply the new order to the original songs array (filteredSongs is a subset of songs)
    const originalOriginIndex = songs.findIndex((song) => song.id === active.id)
    const originalOverIndex = songs.findIndex((song) => song.id === over.id)
    const newSongs = arrayMove(songs, originalOriginIndex, originalOverIndex)
    setSongs(newSongs)

    // Save the new songs order to the sortedSongIds store
    const newSongIds = newSongs.map((song) => song.id)
    setSongIds(newSongIds)
  }

  useEffect(() => {
    useSortingStore.persist.rehydrate()
    setActiveItem(songs?.find((song) => song.id === activeId) ?? null)
  }, [])

  useEffect(() => {
    if (hasHydrated && sortedSongIds && filteredEntries) {
      const allEntries = songList.map((song) => song.country)
      const optionEntries = allEntries.map((entry) => ({
        label: entry.name,
        value: entry.name
      }))
      setEntryValues(optionEntries)

      if (songList && sortedSongIds.length === 0) {
        setSongIds(songList.map((song) => song.id))
        return
      }
      const newSongs = songList.filter(
        (song) => !sortedSongIds.includes(song.id)
      )
      const newSongIds = newSongs.map((song) => song.id)
      const orderedSongIds = [...sortedSongIds, ...newSongIds]

      if (newSongIds.length > 0) {
        setSongIds(orderedSongIds)
      }

      const orderedSongs = orderedSongIds
        .map((id) => {
          return songList.find((song) => song.id === id)
        })
        .filter((song): song is Song => song !== undefined)

      if (orderedSongs) {
        setSongs(orderedSongs)
      }

      const filteredSongs = orderedSongs.filter((song) => {
        // Check against the country.name property of each song
        return !filteredEntries.includes(song.country.name)
      })

      if (filteredSongs) {
        setFilteredSongs(filteredSongs)
      }
    }
  }, [songList, hasHydrated])

  useEffect(() => {
    if (songs && filteredEntries) {
      const group =
        viewGroup === 'big5'
          ? 'Big 5 + Host'
          : viewGroup === 'semiOne'
            ? 'Semifinal 1'
            : viewGroup === 'semiTwo'
              ? 'Semifinal 2'
              : viewGroup === 'nordics'
                ? 'Nordics'
                : viewGroup === 'baltics'
                  ? 'Baltics'
                  : viewGroup === 'balkans'
                    ? 'Balkans'
                    : null
      let filteredSongs = songs

      if (group) {
        filteredSongs = songs.filter((song) => {
          // Check against the country.name property of each song
          return song.groups.includes(group)
        })
        setRankingTitle(`My ${group} 2024`)
      } else {
        setRankingTitle('My Eurovision 2024')
      }

      filteredSongs = filteredSongs.filter((song) => {
        // Check against the country.name property of each song
        return !filteredEntries.includes(song.country.name)
      })

      if (filteredSongs) {
        setFilteredSongs(filteredSongs)
      }
    }
  }, [filteredEntries, viewGroup])

  if (!hasHydrated || !songList || songs.length === 0) {
    return (
      <div className='flex grow items-center justify-center'>
        <Load />
      </div>
    )
  }

  if (!sortedSongIds || sortedSongIds?.length === 0) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <h2 className='text-2xl text-gray-500'>No ranking has been found.</h2>
        <h3 className='text-gray-500'>
          Please use the sorter once first to load the list.
        </h3>
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col'>
      <RankingHeader
        title={rankingTitle}
        viewGroup={viewGroup}
        entryValues={entryValues}
        filteredEntries={filteredEntries}
        setFilteredEntries={setFilteredEntries}
        setViewGroup={setViewGroup}
        handleSelectRanking={handleSelectRanking}
      />
      <RankingSongList
        activeItem={activeItem}
        songs={filteredSongs}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      />
      <ShareContainer
        id='shareAll'
        songs={filteredSongs}
        title={rankingTitle}
      />
      <ShareContainer
        id='share10'
        songs={filteredSongs.slice(0, 10)}
        title={`${rankingTitle} Top 10`}
      />
      <ShareDialog shareImage={shareImage} setShareImage={setShareImage} />
    </div>
  )
}

export default Ranking
