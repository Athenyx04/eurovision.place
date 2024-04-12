import type { CommunityVariant } from '../lib/data'
import { Button } from './ui/button'
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
import { MultiSelect, type OptionType } from './ui/multiSelect'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

interface RankingHeaderProps {
  title: string
  viewGroup: string
  entryValues: OptionType[]
  filteredEntries: string[]
  isNationalSelection: boolean
  songCount: number
  communityVariant?: CommunityVariant
  setViewGroup: (value: string) => void
  setFilteredEntries: (prevState: string[]) => void
  handleSelectRanking: (ranking: string) => void
}

const RankingHeader: React.FC<RankingHeaderProps> = ({
  title,
  viewGroup,
  entryValues,
  filteredEntries,
  isNationalSelection,
  songCount,
  communityVariant,
  setViewGroup,
  setFilteredEntries,
  handleSelectRanking
}) => {
  const currentPath = window.location.pathname
  const leaderboardPath = currentPath.replace(/\/ranking$/, '/leaderboard')
  const sorterPath = currentPath.replace(/\/ranking$/, '/sorter')

  return (
    <div
      className={`flex flex-col items-center p-4 shadow-xl ${communityVariant?.customColor ? communityVariant?.customColor : 'bg-eerie'}`}
    >
      {communityVariant?.customColor ? (
        <div className='flex gap-6 py-2'>
          <img
            src='https://www.euromovidas.com/wp-content/uploads/2021/09/logo_euro_movidas-1.png'
            className='w-28'
          />
          <h1 className='font-extrabold'>{title}</h1>
        </div>
      ) : (
        <h1 className='font-extrabold'>{title}</h1>
      )}
      <div className='text-sm font-light flex items-center text-center pt-2 gap-6'>
        <button>
          <a href={sorterPath}>
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
                <path d='M4 15l3 3l3 -3' />
                <path d='M7 6v12' />
                <path d='M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-4z' />
                <path d='M17 14l-3.5 6h7z' />
              </svg>
              <span className='hidden text-sm font-bold text-eerie md:flex'>
                Sorter
              </span>
            </div>
          </a>
        </button>
        {communityVariant?.disableLeaderboard ? null : (
          <button>
            <a href={leaderboardPath}>
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
                  <path d='M21 12a9 9 0 1 0 -9.679 8.974' />
                  <path d='M3.6 9h16.8' />
                  <path d='M3.6 15h6.9' />
                  <path d='M11.5 3a17 17 0 0 0 0 18' />
                  <path d='M12.5 3a16.983 16.983 0 0 1 2.556 8.136' />
                  <path d='M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z' />
                </svg>
                <span className='hidden text-sm font-bold text-eerie md:flex'>
                  Leaderboards
                </span>
              </div>
            </a>
          </button>
        )}
        {!isNationalSelection && (
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
            <DialogContent className='text-eerie'>
              <DialogHeader>
                <DialogTitle>Filter your ranking</DialogTitle>
                <DialogDescription>
                  Select which filters you want to apply to your ranking.
                </DialogDescription>
              </DialogHeader>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-bold text-eerie'>
                  Filtered entries
                </span>
                <MultiSelect
                  options={entryValues}
                  selected={filteredEntries}
                  onChange={setFilteredEntries}
                />
              </div>
              <div className='flex flex-col gap-2'>
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
        )}
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
                  <Button
                    onClick={() => handleSelectRanking('share10')}
                    disabled={songCount < 10}
                  >
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
  )
}

export default RankingHeader
