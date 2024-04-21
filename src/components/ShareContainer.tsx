import './ShareContainer.module.css'

import type { EntryDetails } from '../lib/data'
import ShareCard from './ShareCard'

function ShareContainer({
  id,
  songs,
  title,
  isDreamSelection = false
}: {
  id: string
  songs: EntryDetails[]
  title: string
  isDreamSelection?: boolean
}) {
  const headerHeight = 40
  const songCardHeight = 50

  const numRows = songs.length < 11 ? songs.length : Math.ceil(songs.length / 2)
  const height =
    songs.length < 11
      ? 'auto'
      : songs.length % 2 === 0
        ? headerHeight + songCardHeight * (numRows + 1)
        : headerHeight + songCardHeight * numRows
  const width = height === 'auto' ? 400 : height < 800 ? 800 : height
  const gridTemplateColumns =
    songs.length < 11
      ? 'repeat(1, minmax(0, 1fr))'
      : 'repeat(2, minmax(0, 1fr))'
  const gridColumn = songs.length < 11 ? 'span 1 / span 1' : 'span 2 / span 2'
  const additionalRows = songs.length % 2 !== 0 ? 1 : 2

  if (songs.length < 1) {
    return null
  }

  if (songs.length < 11) {
    return (
      <div
        id={id}
        className={
          'absolute left-[9999px] grid grid-cols-1 overflow-hidden bg-eerie'
        }
        style={{ height, width, gridTemplateColumns }}
      >
        <div
          className='flex bg-slate-200 px-4 py-2 justify-center'
          style={{ gridColumn }}
        >
          <h1 className='font-extrabold text-eerie truncate'>{title}</h1>
        </div>
        <ShareCard
          artistName={songs[0].artistName}
          country={songs[0].country}
          pictureUri={songs[0].pictureUri}
          position={1}
          key={songs[0].id}
          gridColumn={gridColumn}
          isDreamSelection={isDreamSelection}
        />
        {songs.slice(1).map((song, index) => (
          <ShareCard
            artistName={song.artistName}
            country={song.country}
            pictureUri={song.pictureUri}
            position={index + 2}
            key={song.id}
            gridColumn={gridColumn}
            isDreamSelection={isDreamSelection}
          />
        ))}
        {/* Add a white box with a message */}
        {
          <div
            className='flex items-center justify-center gap-2 border-t-2 border-liberty bg-slate-200'
            style={{
              height: `${headerHeight}px`,
              width: '100%'
            }}
          >
            <span className='flex gap-[0.08rem] text-sm font-bold text-eerie'>
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
              at eurovision<span className='text-liberty'>.place</span>
            </span>
          </div>
        }
      </div>
    )
  }

  return (
    <div
      id={id}
      className={
        'absolute left-[9999px] grid grid-cols-1 overflow-hidden bg-eerie'
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

      {/* For songs 1 to half (left column) */}
      {songs.slice(0, Math.ceil(songs.length / 2)).map((song, index) => (
        <ShareCard
          artistName={song.artistName}
          country={song.country}
          pictureUri={song.pictureUri}
          position={index + 1}
          key={song.id}
          gridColumn={1}
          isDreamSelection={isDreamSelection}
        />
      ))}

      {/* For half to end (right column) */}
      {songs.slice(Math.ceil(songs.length / 2)).map((song, index) => (
        <ShareCard
          artistName={song.artistName}
          country={song.country}
          pictureUri={song.pictureUri}
          position={Math.ceil(songs.length / 2) + index + 1}
          key={song.id}
          gridColumn={2}
          gridRowStart={index + 2}
          isDreamSelection={isDreamSelection}
        />
      ))}

      {/* Add a white box with a message */}
      {
        <div
          className='flex items-center justify-center gap-2 border-t-2 border-liberty bg-slate-200'
          style={{
            gridColumn: `${songs.length % 2 !== 0 ? 2 : 'span 2 / span 2'}`,
            gridRowStart: Math.ceil(songs.length / 2) + additionalRows,
            height: `${songCardHeight}px`,
            width: '100%'
          }}
        >
          <span className='flex gap-[0.08rem] text-sm font-bold text-eerie'>
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
            at eurovision<span className='text-liberty'>.place</span>
          </span>
        </div>
      }
    </div>
  )
}

export default ShareContainer
