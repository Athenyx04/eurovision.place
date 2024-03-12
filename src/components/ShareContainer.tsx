import type { Song } from '../lib/data.ts'
import ShareCard from './ShareCard.tsx'

function ShareContainer({
  id,
  songs,
  title
}: {
  id: string
  songs: Song[]
  title: string
}) {
  const headerHeight = 40
  const firstSongCardHeight = 48
  const songCardHeight = 50

  const numRows =
    songs.length < 11 ? songs.length : Math.ceil((songs.length - 1) / 2)
  const height =
    songs.length < 11
      ? 'auto'
      : headerHeight + firstSongCardHeight + songCardHeight * numRows
  const width = height === 'auto' ? 400 : height < 400 ? 400 : height
  const gridTemplateColumns =
    songs.length < 11
      ? 'repeat(1, minmax(0, 1fr))'
      : 'repeat(2, minmax(0, 1fr))'
  const gridColumn = songs.length < 11 ? 'span 1 / span 1' : 'span 2 / span 2'

  return (
    <div
      id={id}
      className={
        'absolute left-[-9999px] grid grid-cols-1 overflow-hidden rounded-lg'
      }
      style={{ height, width, gridTemplateColumns }}
    >
      <div className='flex bg-slate-200 px-4 py-2' style={{ gridColumn }}>
        <h1 className='font-extrabold text-eerie'>
          eurovision<span className='text-liberty'>.place</span>
        </h1>
        <h1 className='ml-auto font-extrabold text-eerie'>{title}</h1>
      </div>
      <ShareCard
        artist={songs[0].artist}
        country={songs[0].country}
        position={1}
        key={songs[0].id}
        gridColumn={gridColumn}
      />
      {songs.slice(1).map((song, index) => (
        <ShareCard
          artist={song.artist}
          country={song.country}
          position={index + 2}
          key={song.id}
        />
      ))}
    </div>
  )
}

export default ShareContainer
