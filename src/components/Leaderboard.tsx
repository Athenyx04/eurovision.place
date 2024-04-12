import { useEffect, useState } from 'react'
import { useTranslations } from 'src/i18n/utils'

import {
  type AgeGroup,
  type CommunityVariant,
  type EntryDetails,
  type RankingResponse
} from '../lib/data'
import { useFilterStore } from '../store/filterStore'
import { type OptionType } from './ui/multiSelect'
import LeaderboardSongList from './LeaderboardSongList'
import LeaderboardHeader from './LeaderboardHeader'

const Load = () => (
  <svg
    role='img'
    aria-hidden='true'
    width='48'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='#e5e5e5'
    fill='none'
    className='animate-spin'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M12 3a9 9 0 1 0 9 9' />
  </svg>
)

function Leaderboard({
  songList,
  editionId,
  eventName,
  editionName,
  communityVariant
}: {
  songList: EntryDetails[]
  editionId: string
  eventName: string
  editionName: string
  communityVariant?: CommunityVariant
}) {
  const hasHydrated = useFilterStore((state) => state._hasHydrated)

  const [songs, setSongs] = useState<EntryDetails[]>([])
  const [filteredSongs, setFilteredSongs] = useState<EntryDetails[]>([])
  const [viewGroup, setViewGroup] = useState<string>('')
  const [entryValues, setEntryValues] = useState<OptionType[]>([])
  const [rankingTitle, setRankingTitle] = useState<string>(
    `${eventName} ${editionName} Leaderboard`
  )
  const [scoringFunction, setScoringFunction] = useState<'linear' | 'esc'>(
    'linear'
  )
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('all')
  const [country, setCountry] = useState<string>('ZZ')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [fetchedPositions, setFetchedPositions] = useState<number[][]>([])
  const [filteredPositions, setFilteredPositions] = useState<number[][]>([])
  const [filteredEntriesCount, setFilteredEntriesCount] = useState<number>(0)
  const { filteredEntries, setFilteredEntries } = useFilterStore((state) => ({
    filteredEntries: state.filteredEntries,
    setFilteredEntries: state.setFilteredEntries
  }))
  const isNationalSelection = eventName === 'Eurovision' ? false : true
  const t = useTranslations('en')

  useEffect(() => {
    async function getAllPositions() {
      const url = new URL('/api/allRankings.json', window.location.href)
      url.searchParams.append('editionId', editionId)
      if (country !== 'ZZ') {
        url.searchParams.append('nationality', country)
      }
      if (ageGroup !== 'all') {
        url.searchParams.append('ageGroup', ageGroup)
      }
      const response = await fetch(url)
      if (!response.ok) {
        setIsLoading(false)
        return
      }
      const data = await response.json()
      const result = data.result as RankingResponse[]
      const allPositions = result.map((result) =>
        result.positions.split(',').map(Number)
      )
      setFetchedPositions(allPositions)
    }

    if (hasHydrated) {
      setIsLoading(true)
      getAllPositions()
    }
  }, [hasHydrated, country, ageGroup])

  useEffect(() => {
    if (!hasHydrated) {
      return
    }

    const updatedFilteredPositions = fetchedPositions.map((ranking) =>
      ranking.filter((songId) => !filteredEntries.includes(songId.toString()))
    )
    const filteredEntriesOfSongList = songList.filter((entry) =>
      filteredEntries.includes(entry.id.toString())
    )
    const filteredEntriesCount = filteredEntriesOfSongList.length

    setFilteredEntriesCount(filteredEntriesCount)
    setFilteredPositions(updatedFilteredPositions)
  }, [filteredEntries, fetchedPositions])

  useEffect(() => {
    const optionEntries = songList.map((entry) => ({
      // @ts-expect-error - ${entry.country} is a database country code
      label: t(`country.${entry.country}`),
      value: entry.id.toString()
    }))
    setEntryValues(optionEntries)
  }, [songList])

  useEffect(() => {
    if (!fetchedPositions.length && !isLoading) {
      return
    }

    if (!filteredPositions.length) {
      setFilteredSongs([])
      setIsLoading(false)
      return
    }

    // Step 1: Initialize points for each song based on the songList
    const points: Record<number, number> = songList.reduce(
      (acc, song) => {
        acc[song.id] = 0
        return acc
      },
      {} as Record<number, number>
    )

    // Determine the total number of unique songs
    const totalSongs = songList.length - filteredEntriesCount
    const scoresESC = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1]

    // Step 2: Assign points based on user rankings
    // Songs not ranked get 0 points implicitly and are already initialized

    if (scoringFunction === 'esc') {
      // ESC scoring system
      filteredPositions.forEach((ranking) => {
        ranking.forEach((songId, index) => {
          if (index >= scoresESC.length) {
            return
          }
          points[songId] += scoresESC[index]
        })
      })
    } else if (scoringFunction === 'linear') {
      // Linear decay function
      filteredPositions.forEach((ranking) => {
        ranking.forEach((songId, index) => {
          points[songId] += Math.round(totalSongs - index)
        })
      })
    }

    // Step 3: Aggregate and sort the points
    const sortedEntries = Object.entries(points)
      .map(([songId, score]: [string, number]) => ({
        score,
        // Include additional info from songList if needed
        ...songList.find((song) => song.id === parseInt(songId))
      }))
      .sort((a, b) => b.score - a.score) as EntryDetails[]

    setSongs(sortedEntries)

    setIsLoading(false)
  }, [scoringFunction, filteredPositions])

  useEffect(() => {
    if (songs && filteredEntries) {
      const group =
        viewGroup === 'big5'
          ? 'Big 5 + Host'
          : viewGroup === 'semiOne'
            ? 'Semifinal 1'
            : viewGroup === 'semiTwo'
              ? 'Semifinal 2'
              : viewGroup === 'nordics'
                ? 'Nordics'
                : viewGroup === 'baltics'
                  ? 'Baltics'
                  : viewGroup === 'balkans'
                    ? 'Balkans'
                    : null

      let filteredSongs = songs.filter(
        (song) => !filteredEntries.includes(song.id.toString())
      )

      if (group) {
        filteredSongs = filteredSongs.filter((song) =>
          song.categories.includes(group)
        )
        setRankingTitle(`${group} ${editionName} Leaderboard`)
      } else {
        setRankingTitle(`${eventName} ${editionName} Leaderboard`)
      }

      if (communityVariant?.customLeaderboardTitle) {
        setRankingTitle(communityVariant.customLeaderboardTitle)
      }

      setFilteredSongs(filteredSongs)
    }
  }, [viewGroup, filteredEntries, songs])

  if (!hasHydrated || !songList) {
    return (
      <div className='flex grow items-center justify-center'>
        <Load />
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col'>
      <LeaderboardHeader
        title={rankingTitle}
        viewGroup={viewGroup}
        entryValues={entryValues}
        filteredEntries={filteredEntries}
        scoringFunction={scoringFunction}
        ageGroup={ageGroup}
        country={country}
        rankingCount={fetchedPositions.length}
        isNationalSelection={isNationalSelection}
        communityVariant={communityVariant}
        setFilteredEntries={setFilteredEntries}
        setViewGroup={setViewGroup}
        setScoringFunction={setScoringFunction}
        setAgeGroup={setAgeGroup}
        setCountry={setCountry}
      />
      {isLoading && !communityVariant?.disableLeaderboard && (
        <div className='flex grow items-center justify-center'>
          <Load />
        </div>
      )}
      {communityVariant?.disableLeaderboard && (
        <div className='flex flex-col gap-4 w-full grow items-center justify-center text-slate-200'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='80'
            height='80'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z' />
            <path d='M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0' />
            <path d='M8 11v-4a4 4 0 1 1 8 0v4' />
          </svg>
          <div className='px-4 text-center'>
            <span className='font-light '>
              Las clasificaciones generales se habilitarán durante el próximo
              directo
            </span>
            <a
              href='https://www.twitch.tv/euromovidas'
              target='_blank'
              className='flex items-center justify-center gap-2 bg-eerie p-2 underline'
            >
              <span className='font-light'>Twitch de Euromovidas</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#ffffff'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0'></path>
                <path d='M15 9l-6 6'></path>
                <path d='M15 15v-6h-6'></path>
              </svg>
            </a>
          </div>
        </div>
      )}
      {!filteredSongs.length &&
        !isLoading &&
        !communityVariant?.disableLeaderboard && (
        <div className='flex flex-col gap-4 w-full grow items-center justify-center text-slate-200'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='80'
            height='80'
            viewBox='0 0 24 24'
            fill='currentColor'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z' />
          </svg>
          <p>There are no rankings with the selected filters</p>
        </div>
      )}
      {filteredSongs.length !== 0 &&
        !isLoading &&
        !communityVariant?.disableLeaderboard && (
        <LeaderboardSongList songs={filteredSongs} />
      )}
    </div>
  )
}

export default Leaderboard
