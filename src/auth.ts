import { Google, Twitter } from 'arctic'
import { Lucia } from 'lucia'

import { adapter } from './db/client'

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.ENV === 'dev' ? false : true
    }
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      name: attributes.name,
      picture_uri: attributes.picture_uri,
      nationality: attributes.nationality,
      year_of_birth: attributes.year_of_birth
    }
  }
})

export const twitter = new Twitter(
  import.meta.env.TWITTER_CLIENT_ID,
  import.meta.env.TWITTER_CLIENT_SECRET,
  import.meta.env.TWITTER_REDIRECT_URI
)

export const google = new Google(
  import.meta.env.GOOGLE_CLIENT_ID,
  import.meta.env.GOOGLE_CLIENT_SECRET,
  import.meta.env.GOOGLE_REDIRECT_URI
)

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  id: string
  name: string
  picture_uri: string
  nationality: string | null
  year_of_birth: number | null
}
