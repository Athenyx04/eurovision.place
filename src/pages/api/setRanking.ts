import type { APIContext } from 'astro'
import { setRankingByUserIdAndEditionId } from 'src/db/client'

export async function POST({ request, locals }: APIContext): Promise<Response> {
  const userId = locals.user?.id
  // Check if `userId` is available
  if (!userId) {
    return new Response(
      JSON.stringify({
        message: 'User not logged in; ranking not saved in database.'
      }),
      {
        status: 401
      }
    )
  }

  const body = await request.json()

  const result = await setRankingByUserIdAndEditionId(
    userId,
    body.editionId,
    body.ranking
  )

  if (!result.success) {
    return new Response(
      JSON.stringify({
        message: 'Failed to set ranking.'
      }),
      {
        status: 500
      }
    )
  }

  return new Response(
    JSON.stringify({
      message: 'Ranking successfully set.'
    }),
    {
      status: 200
    }
  )
}
