export const CLOUDFRONT_DOMAIN = 'https://d9b4wd4n2m1ts.cloudfront.net'

export type EntryDetails = {
  id: number
  editionId: number
  country: string
  title: string
  pictureUri: string
  audioUri: string
  artistName: string
  categories: string
  score?: number
}

export type EditionDetails = {
  editionId: number
  eventName: string
  eventCountry: string
  editionYear: number
  eventId: number
}

export type RankingResponse = {
  positions: string
}

export type AgeGroup =
  | 'all'
  | '0-15'
  | '16-22'
  | '23-29'
  | '30-44'
  | '45-59'
  | '60-74'
  | '75+'

export type CommunityVariant = {
  disableLeaderboard?: boolean
  customRankingTitle?: string
  customLeaderboardTitle?: string
  customSorterTitle?: string
  customColor?: string
}
