import type { Artist, Country } from '../lib/data.ts'
import PlayPauseButton from './PlayPauseButton.tsx'

interface Props {
  artist: Artist
  title: string
  country: Country
  audioUrl: string
  onVote?: () => void
}

const SongScreen = ({ artist, title, country, audioUrl, onVote }: Props) => {
  return (
    <div
      className='flex h-1/2 w-full grow flex-col bg-cover bg-center sm:h-full sm:w-1/2'
      style={{ backgroundImage: `url(${artist.imageUrl})` }}
    >
      <div className='flex grow select-none bg-black/40 p-4 transition-all hover:bg-black/60'>
        <div
          onClick={onVote}
          className='flex grow flex-col justify-center px-2'
        >
          <h1 className='text-2xl font-extrabold tracking-tight'>{title}</h1>
          <p className='text-lg font-light'>{artist.name}</p>
          <p className='flex items-center gap-2 text-sm font-semibold'>
            <span
              className={
                `fi fi-${country.code.toLowerCase()}` + 'size-6 rounded-full'
              }
            />
            {country.name}
          </p>
        </div>
        <div className='flex items-center justify-center'>
          <PlayPauseButton src={audioUrl} size='lg' />
        </div>
      </div>
    </div>
  )
}

export default SongScreen
