import { type Artist, CLOUDFRONT_DOMAIN, type Country } from '../lib/data.ts'

interface Props {
  position: number
  artist: Artist
  country: Country
  gridColumn: string | number
  gridRowStart?: number | ''
}

function ShareCard({
  position,
  artist,
  country,
  gridColumn = 'span 1 / span 1',
  gridRowStart
}: Props) {
  return (
    <div
      className={`flex min-w-0 select-none ${
        position === 1
          ? 'border-t-2 border-liberty bg-[#ffcf40] text-eerie'
          : position === 2
            ? 'border-t-2 border-platinum bg-gray-400 text-eerie'
            : position === 3
              ? 'border-t-2 border-platinum bg-[#c96f2a] text-eerie'
              : 'border-t-2 border-liberty bg-eerie'
      } ${gridColumn === 1 ? 'border-r-4 border-r-liberty' : ''}`}
      style={{ gridColumn, gridRowStart }}
    >
      <div className={`relative shrink-0 w-1/5`}>
        <img
          className='absolute left-0 top-0 size-full object-cover'
          src={artist.imageUrl}
          alt={artist.name}
        />
        <div className='pb-[100%}'></div>
      </div>
      <div
        className={`flex size-8 shrink-0 -translate-x-4 items-center justify-center self-center rounded-full shadow-lg ${position === 1 ? 'bg-[#ffdc73] text-eerie' : position === 2 ? 'bg-gray-300 text-eerie' : position === 3 ? 'bg-[#e5703c] text-eerie' : 'bg-liberty'}`}
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
      <div className='flex min-w-0 grow flex-row items-center py-3'>
        <div className='flex min-w-0 grow flex-col'>
          <div className='flex grow items-center gap-3 font-bold'>
            <img
              src={`${CLOUDFRONT_DOMAIN}/flags/${country.code.toLowerCase()}.png`}
              alt={country.name}
              className='w-6 rounded-md'
            />
            <span className=''>{country.name.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareCard
