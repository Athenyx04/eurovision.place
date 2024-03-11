import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { useState } from 'react'

import type { Song } from '../lib/data.ts'
import SongCard from './SongCard.tsx'

function Ranking({ songList }: { songList: Song[] }) {
  const [songs, setSongs] = useState(songList)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 250, tolerance: 5 }
    })
  )
  const [activeId, setActiveId] = useState<string | number | null>(null)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (!over) {
      return
    }

    if (active.id !== over.id) {
      setSongs((songs) => {
        const oldIndex = songs.findIndex((song) => song.id === active.id)
        const newIndex = songs.findIndex((song) => song.id === over.id)
        return arrayMove(songs, oldIndex, newIndex)
      })
    }
  }

  const activeItem = songs.find((song) => song.id === activeId)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={songs.map((song) => song.id)}
        strategy={verticalListSortingStrategy}
      >
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
            artist={activeItem.artist}
            country={activeItem.country}
            position={songs.findIndex((song) => song.id === activeItem.id) + 1}
            title={activeItem.title}
            audioUrl={activeItem.audioUrl}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default Ranking
