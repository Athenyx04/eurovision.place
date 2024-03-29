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

export type RankingResponse = {
  positions: string
}
