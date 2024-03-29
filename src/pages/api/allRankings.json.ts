import type { APIContext } from 'astro'
import { getAllRankingsByEditionId } from 'src/db/client'

export async function GET({ request }: APIContext): Promise<Response> {
  const queryParams = new URL(request.url).searchParams
  const editionId = queryParams.get('editionId')

  if (!editionId) {
    return new Response(
      JSON.stringify({
        message: 'Edition ID not provided.'
      }),
      {
        status: 400
      }
    )
  }

  const result = await getAllRankingsByEditionId(editionId)

  if (!result) {
    return new Response(null, {
      status: 404
    })
  }

  return new Response(
    JSON.stringify({
      result
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
