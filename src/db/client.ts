import { createClient } from '@libsql/client'
import { LibSQLAdapter } from '@lucia-auth/adapter-sqlite'

const db = createClient({
  url: import.meta.env.DATABASE_URL ?? '',
  authToken: import.meta.env.DATABASE_AUTH_TOKEN ?? ''
})

export const adapter = new LibSQLAdapter(db, {
  user: 'user',
  session: 'session'
})

export const getUserIdByTwitterId = async (twitterId: string) => {
  const response = await db.execute({
    sql: 'SELECT id FROM user WHERE twitter_id = ?',
    args: [twitterId]
  })

  return response.rows[0]?.id?.toString()
}

export const createUserByTwitterId = async (
  id: string,
  twitterId: string,
  name: string
) => {
  await db.execute({
    sql: 'INSERT INTO user (id, twitter_id, name) VALUES (?, ?, ?)',
    args: [id, twitterId, name]
  })
}
