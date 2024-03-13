import { type Artist, CLOUDFRONT_DOMAIN, type Country } from '../lib/data.ts'
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
          <p className='mt-1 flex items-center gap-2 text-sm font-semibold'>
            <img
              src={`${CLOUDFRONT_DOMAIN}/flags/${country.code.toLowerCase()}.png`}
              alt={country.name}
              className='w-8 rounded-md'
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
