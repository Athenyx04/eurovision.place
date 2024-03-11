import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

import type { Song } from '../lib/data.ts'
import { useSortingStore } from '../store/sortingStore.ts'
import SongCard from './SongCard.tsx'

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
  const { songs, setSongs } = useSortingStore()
  const hasHydrated = useSortingStore((state) => state._hasHydrated)
  const sensors = useSensors(useSensor(PointerSensor))
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const [activeItem, setActiveItem] = useState<Song | null>(null)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (!over || !songs) {
      return
    }

    if (active.id !== over.id) {
      const oldIndex = songs.findIndex((song) => song.id === active.id)
      const newIndex = songs.findIndex((song) => song.id === over.id)
      const newArray = arrayMove(songs, oldIndex, newIndex)
      setSongs(newArray)
    }
  }

  useEffect(() => {
    useSortingStore.persist.rehydrate()
    setActiveItem(songs?.find((song) => song.id === activeId) ?? null)
  }, [])

  useEffect(() => {
    if (songList && songs?.length === 0 && hasHydrated) {
      setSongs(songList)
    }
  }, [songList, hasHydrated])

  if (!hasHydrated || !songList) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Load />
      </div>
    )
  }

  if (!songs || songs?.length === 0) {
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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={songs.map((song) => song.id)}>
        <div className={'grid w-full lg:grid-cols-2 xl:grid-cols-6'}>
          {songs.map((song, index) => (
            <SongCard
              id={song.id}
              artist={song.artist}
              country={song.country}
              position={index + 1}
              title={song.title}
              audioUrl={song.audioUrl}
              key={song.id}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeItem ? (
          <SongCard
            id={activeItem.id}
            artist={activeItem.artist ?? {}}
            country={activeItem.country ?? {}}
            position={songs.findIndex((song) => song.id === activeItem.id) + 1}
            title={activeItem.title ?? ''}
            audioUrl={activeItem.audioUrl ?? ''}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default Ranking
