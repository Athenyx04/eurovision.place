import type { Dispatch, SetStateAction } from 'react'

import { Button } from './ui/button.tsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog.tsx'
import { MultiSelect, type OptionType } from './ui/multiSelect.tsx'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group.tsx'

interface RankingHeaderProps {
  title: string
  viewGroup: string
  entryValues: OptionType[]
  filteredEntries: string[]
  setViewGroup: (value: string) => void
  setFilteredEntries: Dispatch<SetStateAction<string[]>>
  handleSelectRanking: (ranking: string) => void
}

const RankingHeader: React.FC<RankingHeaderProps> = ({
  title,
  viewGroup,
  entryValues,
  filteredEntries,
  setViewGroup,
  setFilteredEntries,
  handleSelectRanking
}) => {
  return (
    <div className='flex items-center p-4'>
      <h1 className='font-extrabold'>{title}</h1>
      <div className='ml-auto flex gap-4'>
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
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-bold text-eerie'>Groups</span>
              <ToggleGroup
                type='single'
                variant='outline'
                className='flex flex-wrap justify-normal gap-2'
                value={viewGroup}
                onValueChange={(value) => setViewGroup(value)}
              >
                <div className='flex w-full gap-4'>
                  <ToggleGroupItem
                    value='big5'
                    size={'text'}
                    aria-label='Toggle Big 5 + Host'
                  >
                    <span>Big 5 + Host</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='semiOne'
                    size={'text'}
                    aria-label='Toggle Semifinal 1'
                  >
                    <span>Semifinal 1</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='semiTwo'
                    size={'text'}
                    aria-label='Toggle Semifinal 2'
                  >
                    <span>Semifinal 2</span>
                  </ToggleGroupItem>
                </div>
                <div className='flex w-full gap-4'>
                  <ToggleGroupItem
                    value='nordics'
                    size={'text'}
                    aria-label='Toggle Nordics'
                  >
                    <span>Nordics</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='baltics'
                    size={'text'}
                    aria-label='Toggle Baltics'
                  >
                    <span>Baltics</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='balkans'
                    size={'text'}
                    aria-label='Toggle Balkans'
                  >
                    <span>Balkans</span>
                  </ToggleGroupItem>
                </div>
              </ToggleGroup>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-bold text-eerie'>
                Filtered entries
              </span>
              <MultiSelect
                options={entryValues}
                selected={filteredEntries}
                onChange={setFilteredEntries}
              />
            </div>
            <DialogFooter className='gap-4'>
              <DialogClose asChild>
                <Button onClick={() => {}}>Save</Button>
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
  )
}

export default RankingHeader
