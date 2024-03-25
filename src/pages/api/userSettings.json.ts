import type { APIContext } from 'astro'
import { getSettingsByUserId, updateSettingsByUserId } from 'src/db/client'

export async function GET({ locals }: APIContext): Promise<Response> {
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

  const result = await getSettingsByUserId(userId)

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

export async function PUT({ request, locals }: APIContext): Promise<Response> {
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

  const data = await request.json()
  const { displayName, yearOfBirth, nationality } = data

  // Update user settings
  const result = await updateSettingsByUserId(
    userId,
    displayName,
    yearOfBirth,
    nationality
  )

  if (!result) {
    return new Response(null, {
      status: 500
    })
  }

  return new Response(null, {
    status: 200
  })
}
