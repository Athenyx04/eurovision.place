import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'

import type { Song } from '../lib/data'
import SongCard from './SongCard'

interface RankingSongListProps {
  songs: Song[]
  activeItem: Song | null
  onDragEnd: (event: DragEndEvent) => void
  onDragStart: (event: DragStartEvent) => void
}

const RankingSongList: React.FC<RankingSongListProps> = ({
  songs,
  onDragEnd,
  onDragStart,
  activeItem
}) => {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={songs.map((song) => song.id)}>
        <div className={'grid w-full md:grid-cols-2 xl:grid-cols-6'}>
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

export default RankingSongList
