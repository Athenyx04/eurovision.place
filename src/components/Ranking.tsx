import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import html2canvas from 'html2canvas'
import { useEffect, useState } from 'react'
import { useTranslations } from 'src/i18n/utils'
import { useSorterStore } from 'src/store/sorterStore'

import { type EntryDetails } from '../lib/data'
import { $ } from '../lib/dom-selector'
import { useFilterStore } from '../store/filterStore'
import RankingHeader from './RankingHeader'
import RankingSongList from './RankingSongList'
import ShareContainer from './ShareContainer'
import ShareDialog from './ShareDialog'
import { type OptionType } from './ui/multiSelect'

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

function Ranking({ songList }: { songList: EntryDetails[] }) {
  const { sortedEntriesIds, setEntriesIds } = useSorterStore()
  const hasHydrated = useSorterStore((state) => state._hasHydrated)

  const [activeId, setActiveId] = useState<string | number | null>(null)
  const [activeItem, setActiveItem] = useState<EntryDetails | null>(null)
  const [shareImage, setShareImage] = useState<HTMLCanvasElement | null>(null)
  const [songs, setSongs] = useState<EntryDetails[]>([])
  const [filteredSongs, setFilteredSongs] = useState<EntryDetails[]>([])
  const [viewGroup, setViewGroup] = useState<string>('')
  const [entryValues, setEntryValues] = useState<OptionType[]>([])
  const [rankingTitle, setRankingTitle] = useState<string>('My Eurovision 2024')
  const { filteredEntries, setFilteredEntries } = useFilterStore((state) => ({
    filteredEntries: state.filteredEntries,
    setFilteredEntries: state.setFilteredEntries
  }))
  const [positions, setPositions] = useState<number[]>([])
  const t = useTranslations('en')

  function handleSelectRanking(ranking: string) {
    triggerScreenshot(ranking)
  }

  async function triggerScreenshot(elementId: string) {
    const element = $('#' + elementId)

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ctx.drawImage = function (...args: any[]) {
      const image = args[0]
      let sx
      let sy
      let sw
      let sh
      let dx
      let dy
      let dw
      let dh

      if (args.length === 3) {
        [dx, dy] = args.slice(1)
      } else if (args.length === 5) {
        [dx, dy, dw, dh] = args.slice(1)
      } else if (args.length === 9) {
        [sx, sy, sw, sh, dx, dy, dw, dh] = args.slice(1)
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
        originalDrawImage.call(ctx, image, sx, sy, sw, sh, dx, dy, dw, dh)
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
    setEntriesIds(newSongIds)

    // Post the new order to the server
    fetch('/api/setRanking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        editionId: '1',
        ranking: newSongIds
      })
    })
      .then((response) => {
        if (response.ok || response.status === 401) {
          return
        } else {
          throw new Error('Failed to set ranking.')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    async function getUserPositions() {
      const response = await fetch('/api/userRanking.json?editionId=1')
      const data = await response.json()
      const positions = data.result?.split(',').map(Number) as number[]
      if (!positions) {
        if (sortedEntriesIds.length > 0) {
          setPositions(sortedEntriesIds)
        } else {
          setEntriesIds(songList.map((song) => song.id))
          setPositions(songList.map((song) => song.id))
        }
      } else {
        setPositions(positions)
        setEntriesIds(positions)
      }
    }

    getUserPositions()
    useSorterStore.persist.rehydrate()
    setActiveItem(songs?.find((song) => song.id === activeId) ?? null)
  }, [])

  useEffect(() => {
    let initialEntryOrder: EntryDetails[] = []

    if (positions && positions.length > 0) {
      initialEntryOrder = positions
        .map((position) => songList.find((song) => song.id === position))
        .filter((song): song is EntryDetails => song !== undefined)
    }

    const optionEntries = songList.map((entry) => ({
      // @ts-expect-error - ${entry.country} is a database country code
      label: t(`country.${entry.country}`),
      value: entry.id.toString()
    }))
    setEntryValues(optionEntries)

    setSongs(initialEntryOrder)

    if (filteredEntries.length === 0) {
      setFilteredSongs(initialEntryOrder)
      return
    }

    // FilteredEntries is an array of song ids
    const filteredSongs = initialEntryOrder.filter(
      (song) => !filteredEntries.includes(song.id.toString())
    )
    setFilteredSongs(filteredSongs)
  }, [songList, positions])

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

      let filteredSongs = songs.filter(
        (song) => !filteredEntries.includes(song.id.toString())
      )

      if (group) {
        filteredSongs = filteredSongs.filter((song) =>
          song.categories.includes(group)
        )
        setRankingTitle(`My ${group} 2024`)
      } else {
        setRankingTitle('My Eurovision 2024')
      }

      setFilteredSongs(filteredSongs)
    }
  }, [viewGroup, filteredEntries])

  if (!hasHydrated || !songList || songs.length === 0) {
    return (
      <div className='flex grow items-center justify-center'>
        <Load />
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
