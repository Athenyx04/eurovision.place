import { playlists } from '../lib/data.ts'

interface Request {
  url: string
}

interface Params {
  [key: string]: string
}

export async function GET({
  _params,
  request
}: {
  _params: Params
  request: Request
}) {
  // Get the playlist ID from the URL
  const { url } = request
  const urlObject = new URL(url)
  const id = urlObject.searchParams.get('id')

  const playlist = playlists.find((playlist) => playlist.id === id)

  return new Response(JSON.stringify(playlist), {
    headers: {
      'content-type': 'application/json'
    }
  })
}
