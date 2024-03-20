import { Twitter } from 'arctic'
import { Lucia } from 'lucia'

import { adapter } from './db/client'

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // secure: true
    }
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      name: attributes.name
    }
  }
})

export const twitter = new Twitter(
  import.meta.env.TWITTER_CLIENT_ID,
  import.meta.env.TWITTER_CLIENT_SECRET,
  import.meta.env.TWITTER_REDIRECT_URI
)

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  id: string
  twitter_id: string
  name: string
}
