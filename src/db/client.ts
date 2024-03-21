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

export const getUserIdBySocialId = async (
  socialId: string,
  provider: string
) => {
  const response = await db.execute({
    sql: 'SELECT user_id FROM oauth_account WHERE provider_id = ? AND provider_user_id = ?',
    args: [provider, socialId]
  })

  return response.rows[0]?.user_id?.toString()
}

export const createUserBySocialId = async (
  id: string,
  provider: string,
  socialId: string,
  name: string,
  pictureUri: string
) => {
  await db.batch([
    {
      sql: 'INSERT INTO user (id, name, picture_uri) VALUES (?, ?, ?)',
      args: [id, name, pictureUri]
    },
    {
      sql: 'INSERT INTO oauth_account (provider_id, provider_user_id, user_id) VALUES (?, ?, ?)',
      args: [provider, socialId, id]
    }
  ])
}

export const setNationalityAndYearOfBirthById = async (
  id: string,
  nationality: string,
  yearOfBirth: string
) => {
  await db.execute({
    sql: 'UPDATE user SET nationality = ?, year_of_birth = ? WHERE id = ?',
    args: [nationality, yearOfBirth, id]
  })
}
