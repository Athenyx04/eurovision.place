import { useDragAndDrop } from '@formkit/drag-and-drop/react'

import type { Song } from '../lib/data.ts'
import SongCard from './SongCard.tsx'

function Ranking({ songList }: { songList: Song[] }) {
  const songs = songList.map((song) => song)
  const [parent, dndSongs] = useDragAndDrop<HTMLUListElement, Song>(songs)

  return (
    <ul className='grid w-full lg:grid-cols-2 xl:grid-cols-6' ref={parent}>
      {dndSongs?.map((song, index) => (
        <li key={song.country.code} className='select-none'>
          <SongCard
            artist={song.artist}
            country={song.country}
            position={index + 1}
            title={song.title}
            audioUrl={song.audioUrl}
          />
        </li>
      ))}
    </ul>
  )
}

export default Ranking
