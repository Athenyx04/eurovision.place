import { useTranslations } from 'src/i18n/utils'

import { CLOUDFRONT_DOMAIN, type EntryDetails } from '../lib/data'
import { Badge } from './ui/badge'

type Props = {
  entry: EntryDetails
  position: number
}

function LeaderboardCard({ entry, position }: Props) {
  const { title, artistName, country, pictureUri, score } = entry
  const t = useTranslations('en')

  return (
    <div
      className={`flex min-w-0 select-none ${
        position === 1
          ? 'bg-[#ffcf40] text-eerie md:col-span-2 xl:col-span-6'
          : position === 2
            ? 'border-t-2 border-platinum bg-gray-400 text-eerie md:col-span-2 xl:col-span-3'
            : position === 3
              ? 'border-t-2 border-platinum bg-[#c96f2a] text-eerie md:col-span-2 xl:col-span-3'
              : 'border-t-2 border-liberty bg-eerie xl:col-span-2'
      }`}
    >
      <div
        className={`relative shrink-0 ${
          position === 1
            ? 'w-1/5 sm:w-1/6 md:w-1/12'
            : position === 2
              ? 'w-1/5 sm:w-1/6 md:w-1/12 xl:w-1/6'
              : position === 3
                ? 'w-1/5 sm:w-1/6 md:w-1/12 xl:w-1/6'
                : 'w-1/5 sm:w-1/6 md:w-1/6 xl:w-1/5'
        }`}
      >
        <img
          className='absolute left-0 top-0 size-full object-cover'
          src={`${CLOUDFRONT_DOMAIN}${pictureUri}`}
          alt={artistName}
        />
        <div className='pb-[100%}'></div>
      </div>
      <div
        className={`flex size-8 shrink-0 -translate-x-4 items-center justify-center self-center rounded-full drop-shadow-lg ${position === 1 ? 'bg-[#ffdc73] text-eerie' : position === 2 ? 'bg-gray-300 text-eerie' : position === 3 ? 'bg-[#e5703c] text-eerie' : 'bg-liberty'}`}
        style={{
          backgroundImage: `linear-gradient(
            30deg,
            transparent 20%,
            transparent 40%,
            rgba(255, 255, 255, ${position === 1 ? '0.8' : position === 2 ? '0.8' : position === 3 ? '0.4' : '0.25'}) 50%,
            rgba(255, 255, 255, ${position === 1 ? '0.8' : position === 2 ? '0.8' : position === 3 ? '0.4' : '0.25'}) 55%,
            transparent 70%,
            transparent 100%
          )`
        }}
      >
        <span className='font-bold'>{String(position).padStart(2, '0')}</span>
      </div>
      <div className='flex min-w-0 flex-row items-center py-2'>
        <div className='flex min-w-0 flex-col'>
          <div className='flex items-center gap-2 font-bold'>
            <img
              src={`${CLOUDFRONT_DOMAIN}/flags/${country.toLowerCase()}.png`}
              // @ts-expect-error - ${country} is a database country code
              alt={t(`country.${country}`)}
              className='w-6 rounded-md'
            />
            <span className='truncate'>
              {/* @ts-expect-error - ${country} is a database country code */}
              {t(`country.${country}`).toUpperCase()}
            </span>
          </div>
          <span className='truncate text-sm font-light'>{title}</span>
          <span className='truncate text-sm font-light'>{artistName}</span>
        </div>
      </div>
      <div className='flex min-w-0 flex-col items-center justify-center pl-2 pr-4 ml-auto shrink-0'>
        <Badge className='bg-slate-200 text-liberty border-2 border-liberty text-sm leading-tight hover:bg-white'>
          {score}
          <svg height='8' width='8' className='ml-2'>
            <circle cx='4' cy='4' r='4' fill='currentColor' />
          </svg>
        </Badge>
      </div>
    </div>
  )
}

export default LeaderboardCard
