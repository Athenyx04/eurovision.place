import type { APIContext } from 'astro'
import { getAllRankingsByEditionId } from 'src/db/client'
import { type AgeGroup } from '../../lib/data'

export async function GET({ request }: APIContext): Promise<Response> {
  const queryParams = new URL(request.url).searchParams
  const editionId = queryParams.get('editionId')
  const nationality = queryParams.get('nationality')
  const ageGroup = queryParams.get('ageGroup')

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

  const result = await getAllRankingsByEditionId(
    editionId,
    nationality ?? undefined,
    (ageGroup as AgeGroup) ?? undefined
  )

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
