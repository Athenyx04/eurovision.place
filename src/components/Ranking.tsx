import { animations } from '@formkit/drag-and-drop'
import { useDragAndDrop } from '@formkit/drag-and-drop/react'

import type { Song } from '../lib/data.ts'
import SongCard from './SongCard.tsx'

function Ranking({ songList }: { songList: Song[] }) {
  const songs = songList.map((song) => song)
  const [parent, dndSongs] = useDragAndDrop<HTMLDivElement, Song>(songs, {
    dragHandle: '.drag-handle',
    plugins: [animations()]
  })

  return (
    <div
      className='grid w-full overflow-x-hidden lg:grid-cols-2 lg:overflow-x-auto xl:grid-cols-6'
      ref={parent}
    >
      {dndSongs?.map((song, index) => (
        <SongCard
          artist={song.artist}
          country={song.country}
          position={index + 1}
          title={song.title}
          audioUrl={song.audioUrl}
          key={song.country.code}
        />
      ))}
    </div>
  )
}

export default Ranking
