import { useTranslations } from '@/i18n/utils'

import { CLOUDFRONT_DOMAIN, type EntryDetails } from '../lib/data'
import PlayPauseButton from './PlayPauseButton'

type Props = {
  entry: EntryDetails
  onVote?: () => void
}

const EntryScreen = ({ entry, onVote }: Props) => {
  const { title, artistName, country, pictureUri, audioUri } = entry
  const t = useTranslations('en')

  return (
    <div
      className='flex h-1/2 w-full grow flex-col bg-cover bg-center sm:h-full sm:w-1/2'
      style={{ backgroundImage: `url(${CLOUDFRONT_DOMAIN}${pictureUri})` }}
    >
      <div className='flex grow select-none bg-black/40 p-4 transition-all hover:bg-black/60'>
        <div
          onClick={onVote}
          className='flex grow flex-col justify-center px-2'
        >
          <h1 className='text-2xl font-extrabold tracking-tight'>{title}</h1>
          <p className='text-lg font-light'>{artistName}</p>
          <p className='mt-1 flex items-center gap-2 text-sm font-semibold'>
            <img
              src={`${CLOUDFRONT_DOMAIN}/flags/${country.toLowerCase()}.png`}
              // @ts-expect-error - ${country} is a database country code
              alt={t(`country.${country}`)}
              className='w-8 rounded-md'
            />
            {/* @ts-expect-error - ${country} is a database country code */}
            {t(`country.${country}`)}
          </p>
        </div>
        <div className='flex items-center justify-center'>
          <PlayPauseButton src={audioUri} size='lg' />
        </div>
      </div>
    </div>
  )
}

export default EntryScreen
