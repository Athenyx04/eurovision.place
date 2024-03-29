import { Button } from './ui/button'
import { Badge } from './ui/badge'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { useTranslations } from '@/i18n/utils'
import { MultiSelect, type OptionType } from './ui/multiSelect'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { countries } from 'countries-list'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import type { AgeGroup } from '@/lib/data'

interface LeaderboardHeaderProps {
  title: string
  viewGroup: string
  entryValues: OptionType[]
  filteredEntries: string[]
  scoringFunction: 'linear' | 'esc'
  country: string
  ageGroup: AgeGroup
  rankingCount: number
  setViewGroup: (value: string) => void
  setFilteredEntries: (prevState: string[]) => void
  setScoringFunction: (value: 'linear' | 'esc') => void
  setCountry: (value: string) => void
  setAgeGroup: (value: AgeGroup) => void
  handleSelectRanking: (ranking: string) => void
}

const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({
  title,
  viewGroup,
  entryValues,
  filteredEntries,
  scoringFunction,
  country,
  ageGroup,
  rankingCount,
  setViewGroup,
  setFilteredEntries,
  setScoringFunction,
  setCountry,
  setAgeGroup,
  handleSelectRanking
}) => {
  const t = useTranslations('en')

  const alphabeticCountries = Object.entries(countries).sort((a, b) =>
    a[1].name.localeCompare(b[1].name)
  )

  // Add an empty option for selecting no country
  alphabeticCountries.unshift([
    'ZZ',
    {
      name: 'All countries',
      native: '',
      capital: '',
      languages: [],
      continent: 'EU',
      currency: [],
      phone: []
    }
  ])

  const ageGroupColours: Record<AgeGroup, string> = {
    all: '#111827',
    '0-15': '#76c043',
    '16-22': '#55bf9a',
    '23-29': '#09aae0',
    '30-44': '#804f9f',
    '45-59': '#d94599',
    '60-74': '#ed3e23',
    '75+': '#f6931d'
  }

  const currentPath = window.location.pathname
  const rankingPath = currentPath.replace(/\/leaderboard$/, '/ranking')

  return (
    <div className='flex flex-col items-center px-4 pt-4 shadow-xl'>
      <h1 className='font-extrabold'>{title}</h1>
      <div className='text-sm font-light flex items-center text-center pt-2 gap-2'>
        <Badge className='text-slate-200 border-2 border-liberty'>
          {/* @ts-expect-error - code value is in list */}
          {t(`country.${country}`)}
        </Badge>
        <Badge className='flex gap-1 items-center text-slate-200 border-2 border-liberty'>
          {ageGroup !== 'all' && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='12'
              height='12'
              viewBox='0 0 24 24'
              fill={ageGroupColours[ageGroup]}
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z' />
            </svg>
          )}
          {ageGroup !== 'all' ? `${ageGroup} years old` : 'All age groups'}
        </Badge>
        <Badge className='text-slate-200 border-2 border-liberty'>
          {rankingCount} {rankingCount === 1 ? 'ranking' : 'rankings'}
        </Badge>
      </div>
      <div className='flex w-full gap-4 py-4 pb-4'>
        <Button
          onClick={() => setScoringFunction('linear')}
          className={`${
            scoringFunction === 'linear'
              ? 'bg-slate-200 text-eerie border-2 border-liberty'
              : 'bg-eerie text-white'
          } p-2 rounded-md min-w-20 w-1/6 hover:bg-slate-200 hover:text-eerie`}
        >
          All Places
        </Button>
        <Button
          onClick={() => setScoringFunction('esc')}
          className={`${
            scoringFunction === 'esc'
              ? 'bg-slate-200 text-eerie border-2 border-liberty'
              : 'bg-eerie text-white'
          } p-2 rounded-md min-w-20 w-1/6 hover:bg-slate-200 hover:text-eerie`}
        >
          Top 10's
        </Button>
        <div className='ml-auto flex gap-4'>
          <button>
            <a href={rankingPath}>
              <div
                className={
                  'flex flex-row items-center justify-center gap-2 rounded-full bg-gray-200 p-2 text-eerie hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:scale-100'
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
                  <path d='M6 21v-2a4 4 0 0 1 4 -4h.5' />
                  <path d='M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z' />
                </svg>
                <span className='hidden text-sm font-bold text-eerie md:flex'>
                  My ranking
                </span>
              </div>
            </a>
          </button>
          <Dialog>
            <DialogTrigger>
              <div
                className={
                  'flex flex-row items-center justify-center gap-2 rounded-full bg-gray-200 p-2 text-white hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:scale-100'
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  strokeWidth='1.7'
                  stroke='#111827'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                  <path d='M4 6l8 0' />
                  <path d='M16 6l4 0' />
                  <path d='M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                  <path d='M4 12l2 0' />
                  <path d='M10 12l10 0' />
                  <path d='M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                  <path d='M4 18l11 0' />
                  <path d='M19 18l1 0' />
                </svg>
                <span className='hidden text-sm font-bold text-eerie md:flex'>
                  Filter
                </span>
              </div>
            </DialogTrigger>
            <DialogContent className='text-eerie p-4 sm:p-8'>
              <DialogHeader>
                <DialogTitle>Filter the leaderboard</DialogTitle>
                <DialogDescription>
                  Select which filters you want to apply to the leaderboard.
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-2'>
                <span className='text-sm font-bold text-eerie'>Country</span>
                <Select
                  value={country}
                  onValueChange={(value) => {
                    setCountry(value)
                  }}
                  defaultValue={'ZZ'}
                >
                  <SelectTrigger className='text-eerie'>
                    <SelectValue placeholder='Your nationality' />
                  </SelectTrigger>

                  <SelectContent>
                    {Object.entries(alphabeticCountries).map(([, [code]]) => (
                      <SelectItem key={code} value={code}>
                        {/* @ts-expect-error - code value is in list */}
                        {t(`country.${code}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <span className='text-sm font-bold text-eerie'>Age Group</span>
                <ToggleGroup
                  type='single'
                  variant='outline'
                  className='flex flex-wrap justify-between gap-1'
                  value={ageGroup}
                  onValueChange={(value) => setAgeGroup(value as AgeGroup)}
                >
                  <ToggleGroupItem
                    value='0-15'
                    size={'text'}
                    aria-label='Toggle 0-15 years old age group'
                    className='flex-auto items-center justify-between w-1/3 max-h-12 p-2'
                    style={{ maxWidth: 'calc(33.333% - 0.25rem)' }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='#76c043'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z' />
                    </svg>
                    <span>0-15</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='16-22'
                    size={'text'}
                    aria-label='Toggle 16-22 years old age group'
                    className='flex-auto items-center justify-between w-1/3 max-h-12 p-2'
                    style={{ maxWidth: 'calc(33.333% - 0.25rem)' }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='#55bf9a'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z' />
                    </svg>
                    <span>16-22</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='23-29'
                    size={'text'}
                    aria-label='Toggle 23-29 years old age group'
                    className='flex-auto items-center justify-between w-1/3 max-h-12 p-2'
                    style={{ maxWidth: 'calc(33.333% - 0.25rem)' }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='#09aae0'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z' />
                    </svg>
                    <span>23-29</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='30-44'
                    size={'text'}
                    aria-label='Toggle 30-44 years old age group'
                    className='flex-auto items-center justify-between w-1/3 max-h-12 p-2'
                    style={{ maxWidth: 'calc(33.333% - 0.25rem)' }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='#804f9f'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z' />
                    </svg>
                    <span>30-44</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='45-59'
                    size={'text'}
                    aria-label='Toggle 45-59 years old age group'
                    className='flex-auto items-center justify-between w-1/3 max-h-12 p-2'
                    style={{ maxWidth: 'calc(33.333% - 0.25rem)' }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='#d94599'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z' />
                    </svg>
                    <span>45-59</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='60-74'
                    size={'text'}
                    aria-label='Toggle 60-74 years old age group'
                    className='flex-auto items-center justify-between w-1/3 max-h-12 p-2'
                    style={{ maxWidth: 'calc(33.333% - 0.25rem)' }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='#ed3e23'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z' />
                    </svg>
                    <span>60-74</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='75+'
                    size={'text'}
                    aria-label='Toggle 75+ years old age group'
                    className='flex-auto items-center gap-6 w-full max-h-12 p-2'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='#f6931d'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z' />
                    </svg>
                    <span>75+</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className='space-y-2'>
                <span className='text-sm font-bold text-eerie'>
                  Filtered entries
                </span>
                <MultiSelect
                  options={entryValues}
                  selected={filteredEntries}
                  onChange={setFilteredEntries}
                />
              </div>
              <div className='space-y-2'>
                <span className='text-sm font-bold text-eerie'>Group</span>
                <ToggleGroup
                  type='single'
                  variant='outline'
                  className='flex flex-wrap justify-normal gap-2'
                  value={viewGroup}
                  onValueChange={(value) => setViewGroup(value)}
                >
                  <div className='flex w-full gap-2'>
                    <ToggleGroupItem
                      value='big5'
                      size={'text'}
                      aria-label='Toggle Big 5 + Host'
                      className='flex grow'
                    >
                      <span>Big 5 + Host</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value='semiOne'
                      size={'text'}
                      aria-label='Toggle Semifinal 1'
                      className='flex grow'
                    >
                      <span>Semifinal 1</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value='semiTwo'
                      size={'text'}
                      aria-label='Toggle Semifinal 2'
                      className='flex grow'
                    >
                      <span>Semifinal 2</span>
                    </ToggleGroupItem>
                  </div>
                  <div className='flex w-full gap-2'>
                    <ToggleGroupItem
                      value='nordics'
                      size={'text'}
                      aria-label='Toggle Nordics'
                      className='flex grow'
                    >
                      <span>Nordics</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value='baltics'
                      size={'text'}
                      aria-label='Toggle Baltics'
                      className='flex grow'
                    >
                      <span>Baltics</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value='balkans'
                      size={'text'}
                      aria-label='Toggle Balkans'
                      className='flex grow'
                    >
                      <span>Balkans</span>
                    </ToggleGroupItem>
                  </div>
                </ToggleGroup>
              </div>
              <DialogFooter className='gap-4'>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <div
                className={
                  'flex flex-row items-center justify-center gap-2 rounded-full bg-gray-200 p-2 text-white hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:scale-100'
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#111827'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                  <path d='M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'></path>
                  <path d='M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'></path>
                  <path d='M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'></path>
                  <path d='M8.7 10.7l6.6 -3.4'></path>
                  <path d='M8.7 13.3l6.6 3.4'></path>
                </svg>
                <span className='hidden text-sm font-bold text-eerie md:flex'>
                  Share
                </span>
              </div>
            </DialogTrigger>
            <DialogContent className='text-eerie'>
              <DialogHeader>
                <DialogTitle>Share your ranking</DialogTitle>
                <DialogDescription>
                  Select which ranking you want to generate as an image (Screen
                  may freeze for a few seconds while generating).
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className='gap-4'>
                {(viewGroup === 'semiOne' ||
                  viewGroup === 'semiTwo' ||
                  viewGroup === '') && (
                  <DialogClose asChild>
                    <Button onClick={() => handleSelectRanking('share10')}>
                      Top 10
                    </Button>
                  </DialogClose>
                )}
                <DialogClose asChild>
                  <Button onClick={() => handleSelectRanking('shareAll')}>
                    Full Top
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardHeader
