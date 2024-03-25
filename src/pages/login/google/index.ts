import { generateCodeVerifier, generateState } from 'arctic'
import type { APIContext } from 'astro'

import { google } from '../../../auth'

export async function GET(context: APIContext): Promise<Response> {
  const state = generateState()
  const codeVerifier = generateCodeVerifier()
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ['profile']
  })

  context.cookies.set('google_oauth_state', state, {
    secure: import.meta.env.ENV !== 'dev',
    path: '/',
    maxAge: 60 * 10,
    httpOnly: true,
    sameSite: 'lax'
  })

  context.cookies.set('google_oauth_code_verifier', codeVerifier, {
    secure: import.meta.env.ENV !== 'dev',
    path: '/',
    maxAge: 60 * 10,
    httpOnly: true,
    sameSite: 'lax'
  })

  return context.redirect(url.toString())
}
