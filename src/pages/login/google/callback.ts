import { OAuth2RequestError } from 'arctic'
import type { APIContext } from 'astro'
import { generateId } from 'lucia'

import { google, lucia } from '../../../auth'
import {
  createUserBySocialId,
  getUserIdBySocialId,
  setNationalityAndYearOfBirthById
} from '../../../db/client'

export async function GET(context: APIContext): Promise<Response> {
  const code = context.url.searchParams.get('code')
  const state = context.url.searchParams.get('state')

  const storedState = context.cookies.get('google_oauth_state')?.value ?? null
  const storedCodeVerifier =
    context.cookies.get('google_oauth_code_verifier')?.value ?? null

  if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
    return new Response(null, {
      status: 400
    })
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier
    )
    const googleUserResponse = await fetch(
      'https://openidconnect.googleapis.com/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      }
    )
    const googleUser: GoogleUser = await googleUserResponse.json()

    const existingUser = await getUserIdBySocialId(googleUser.sub, 'google')

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
    await createUserBySocialId(
      userId,
      'google',
      googleUser.sub,
      googleUser.given_name,
      googleUser.picture
    )
    await setNationalityAndYearOfBirthById(userId, 'ES', '1999')

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

interface GoogleUser {
  sub: string
  name: string
  given_name: string
  picture: string
  locale: string
}
