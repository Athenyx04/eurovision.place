import './ShareContainer.module.css'

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
  const songCardHeight = 50

  const numRows = songs.length < 11 ? songs.length : Math.ceil(songs.length / 2)
  const height =
    songs.length < 11 ? 'auto' : headerHeight + songCardHeight * numRows
  const width = height === 'auto' ? 400 : height < 400 ? 400 : height
  const gridTemplateColumns =
    songs.length < 11
      ? 'repeat(1, minmax(0, 1fr))'
      : 'repeat(2, minmax(0, 1fr))'
  const gridColumn = songs.length < 11 ? 'span 1 / span 1' : 'span 2 / span 2'

  if (songs.length < 11) {
    return (
      <div
        id={id}
        className={
          'absolute left-[-9999px] grid grid-cols-1 overflow-hidden bg-eerie'
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
            gridColumn={gridColumn}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      id={id}
      className={
        'absolute left-[-0px] grid grid-cols-1 overflow-hidden bg-eerie'
      }
      style={{
        height,
        width,
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto'
      }}
    >
      <div className='flex bg-slate-200 px-4 py-2' style={{ gridColumn }}>
        <h1 className='font-extrabold text-eerie'>
          eurovision<span className='text-liberty'>.place</span>
        </h1>
        <h1 className='ml-auto font-extrabold text-eerie'>{title}</h1>
      </div>

      {/* Render the first song across both columns */}
      {/* {songs.slice(0, 1).map((song) => (
        <ShareCard
          artist={song.artist}
          country={song.country}
          position={1}
          key={song.id}
          gridColumn='1 / -1'
        />
      ))} */}

      {/* Render the second and third song in separate columns */}
      {/* {songs.slice(1, 3).map((song, index) => (
        <ShareCard
          artist={song.artist}
          country={song.country}
          position={index + 2}
          key={song.id}
          // Position them in the grid based on their index
          gridColumn={index + 1}
        />
      ))} */}

      {/* For songs 1 to half (left column) */}
      {songs.slice(0, Math.ceil(songs.length / 2)).map((song, index) => (
        <ShareCard
          artist={song.artist}
          country={song.country}
          position={index + 1}
          key={song.id}
          gridColumn={1}
        />
      ))}

      {/* For half to end (right column) */}
      {songs.slice(Math.ceil(songs.length / 2)).map((song, index) => (
        <ShareCard
          artist={song.artist}
          country={song.country}
          position={Math.ceil(songs.length / 2) + index + 1}
          key={song.id}
          gridColumn={2}
          gridRowStart={index + 2}
        />
      ))}

      {/* Add a white box if the number of songs is odd */}
      {songs.length % 2 !== 0 && (
        <div
          className='bg-slate-200 border-t-2 border-liberty flex justify-center items-center gap-2'
          style={{
            gridColumn: 2,
            gridRowStart: Math.ceil(songs.length / 2) + 1,
            height: `${songCardHeight}px`, // Assuming this is the height of your ShareCard
            width: '100%' // Assuming ShareCard takes up 100% of the column width
          }}
        >
          {/* <svg
            viewBox='0 0 24 24'
            aria-hidden='true'
            width='24'
            height='24'
            astro-icon='social/twitter'
          >
            <path
              fill='#000'
              d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
            ></path>
          </svg> */}
          <span className='font-bold text-sm text-eerie flex gap-[0.08rem]'>
            made with{' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='scale-90'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z' />
            </svg>{' '}
            at eurovision.place
          </span>
        </div>
      )}
    </div>
  )
}

export default ShareContainer
