import type { Artist, Country } from '../lib/data.ts'
import PlayPauseButton from './PlayPauseButton.tsx'

interface Props {
  position: number
  title: string
  artist: Artist
  country: Country
  audioUrl: string
}

function SongCard({ position, title, artist, country, audioUrl }: Props) {
  return (
    <div
      className={`flex w-full select-none ${
        position === 1
          ? 'bg-yellow-200 text-black lg:col-span-2 xl:col-span-6'
          : position === 2
            ? 'border-t-2 border-platinum bg-gray-400 lg:col-span-2 xl:col-span-3'
            : position === 3
              ? 'border-t-2 border-platinum bg-orange-900 lg:col-span-2 xl:col-span-3'
              : 'border-t-2 border-liberty xl:col-span-2'
      }`}
    >
      <div
        className={`relative ${
          position === 1
            ? 'w-1/5 sm:w-1/6 md:w-1/12'
            : position === 2
              ? 'w-1/5 sm:w-1/6 md:w-1/12 xl:w-1/6'
              : position === 3
                ? 'w-1/5 sm:w-1/6 md:w-1/12 xl:w-1/6'
                : 'w-1/5 sm:w-1/6 md:w-1/12 lg:w-1/6 xl:w-1/5'
        }`}
      >
        <img
          className='absolute left-0 top-0 size-full object-cover'
          src={artist.imageUrl}
          alt={artist.name}
        />
        <div className='pb-[100%}'></div>
      </div>
      <div className='flex size-8 -translate-x-4 items-center justify-center self-center rounded-full bg-liberty'>
        <span className='font-bold text-slate-200'>
          {String(position).padStart(2, '0')}
        </span>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <div className='flex h-full w-7 items-center'>
          <span
            className={
              `fi fi-${country.code.toLowerCase()} ` + 'size-7 rounded-full'
            }
          />
        </div>
        <div className='flex flex-col p-2'>
          <span className='font-bold'>{country.name.toUpperCase()}</span>
          <span className='max-w-40 text-sm font-light sm:max-w-56 xl:max-w-40'>
            {title}
          </span>
          <span className='text-sm font-light'>{artist.name}</span>
        </div>
      </div>
      <div className='ml-auto mr-2 flex items-center justify-center'>
        <PlayPauseButton src={audioUrl} />
      </div>
      <div className={'flex items-center justify-center mr-2' + ' drag-handle'}>
        ⠿
      </div>
    </div>
  )
}

export default SongCard
