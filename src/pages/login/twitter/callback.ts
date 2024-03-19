import { OAuth2RequestError } from 'arctic'
import type { APIContext } from 'astro'
import { generateId } from 'lucia'

import { lucia, twitter } from '../../../auth'
import { createUserByTwitterId, getUserIdByTwitterId } from '../../../db/client'

export async function GET(context: APIContext): Promise<Response> {
  const code = context.url.searchParams.get('code')
  const state = context.url.searchParams.get('state')

  const storedState = context.cookies.get('twitter_oauth_state')?.value ?? null
  const storedCodeVerifier =
    context.cookies.get('twitter_oauth_code_verifier')?.value ?? null

  if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
    return new Response(null, {
      status: 400
    })
  }

  try {
    const tokens = await twitter.validateAuthorizationCode(
      code,
      storedCodeVerifier
    )
    const twitterUserResponse = await fetch(
      'https://api.twitter.com/2/users/me?user.fields=id,name,profile_image_url',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      }
    )
    const twitterUserObject = await twitterUserResponse.json()
    const twitterUser: TwitterUser = twitterUserObject.data

    console.log(twitterUser)
    const existingUser = await getUserIdByTwitterId(twitterUser.id)

    if (existingUser) {
      const session = await lucia.createSession(existingUser, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
      return context.redirect('/')
    }

    const userId = generateId(15)
    await createUserByTwitterId(userId, twitterUser.id, twitterUser.name)

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    return context.redirect('/')
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400
      })
    }
    return new Response(null, {
      status: 500
    })
  }
}

interface TwitterUser {
  id: string
  name: string
  profile_image_url: string
}
