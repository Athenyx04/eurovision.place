import type { APIContext } from 'astro'
import { getRankingByUserIdAndEditionId } from 'src/db/client'

export async function GET({ request, locals }: APIContext): Promise<Response> {
  const userId = locals.user?.id
  // Check if `userId` is available
  if (!userId) {
    return new Response(
      JSON.stringify({
        message: 'User not logged in.'
      }),
      {
        status: 401
      }
    )
  }

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

  const result = await getRankingByUserIdAndEditionId(userId, editionId)

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
