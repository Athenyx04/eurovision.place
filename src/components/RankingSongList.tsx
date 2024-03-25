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

import type { EntryDetails } from '../lib/data'
import EntryCard from './EntryCard'

type RankingSongListProps = {
  songs: EntryDetails[]
  activeItem: EntryDetails | null
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
            <EntryCard entry={song} position={index + 1} key={song.id} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeItem ? (
          <EntryCard
            entry={activeItem}
            position={songs.findIndex((song) => song.id === activeItem.id) + 1}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default RankingSongList
