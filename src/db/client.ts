import { createClient } from '@libsql/client'
import { LibSQLAdapter } from '@lucia-auth/adapter-sqlite'
import { type AgeGroup } from '../lib/data'

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

export const getEditionDetailsByEditionId = async (editionId: string) => {
  const response = await db.execute({
    sql: 'SELECT e.name AS eventName, ed.id AS editionId, ed.year AS editionName FROM edition ed JOIN event e ON ed.event_id = e.id WHERE ed.id = ?',
    args: [editionId]
  })

  return response.rows
}

export const getEditionIdByEventNameAndEditionName = async (
  eventName: string,
  editionName: string
) => {
  const response = await db.execute({
    sql: 'SELECT ed.id AS editionId FROM edition ed JOIN event e ON ed.event_id = e.id WHERE e.name = ? AND ed.year = ?',
    args: [eventName, editionName]
  })

  return response.rows[0]?.editionId
}

export const getEditionIdByEventCountryAndEditionName = async (
  eventName: string,
  editionName: string
) => {
  const response = await db.execute({
    sql: 'SELECT ed.id AS editionId, e.name AS eventName FROM edition ed JOIN event e ON ed.event_id = e.id WHERE e.country = ? AND ed.year = ?',
    args: [eventName, editionName]
  })

  return response.rows[0]
}

export const getEntriesByEditionId = async (editionId: string) => {
  const response = await db.execute({
    sql: `SELECT 
      e.song_id AS id, 
      e.edition_id AS editionId, 
      e.country, 
      s.title, 
      s.picture_uri AS pictureUri, 
      s.audio_uri AS audioUri, 
      a.name AS artistName,
      GROUP_CONCAT(g.name) AS categories  
      FROM entry e 
      JOIN song s ON e.song_id = s.id 
      JOIN artist a ON s.artist_id = a.id 
      LEFT JOIN entry_group eg ON e.song_id = eg.song_id AND e.edition_id = eg.edition_id 
      LEFT JOIN group_category g ON eg.group_id = g.id
      WHERE e.edition_id = ?
      GROUP BY e.song_id, e.edition_id, e.country, s.title, s.picture_uri, s.audio_uri, a.name`,
    args: [editionId]
  })

  return response.rows
}

export const getRankingByUserIdAndEditionId = async (
  userId: string,
  editionId: string
) => {
  const response = await db.execute({
    sql: 'SELECT r.positions FROM ranking r WHERE r.user_id = ? AND r.edition_id = ?',
    args: [userId, editionId]
  })

  return response.rows[0]?.positions
}

export const setRankingByUserIdAndEditionId = async (
  userId: string,
  editionId: number,
  positions: string
) => {
  try {
    await db.execute({
      sql: 'INSERT INTO ranking (user_id, edition_id, positions) VALUES (?, ?, ?) ON CONFLICT (user_id, edition_id) DO UPDATE SET positions = excluded.positions',
      args: [userId, editionId, positions]
    })
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export const getSettingsByUserId = async (userId: string) => {
  const response = await db.execute({
    sql: 'SELECT u.name AS displayName, u.year_of_birth AS yearOfBirth, u.nationality FROM user u WHERE u.id = ?',
    args: [userId]
  })

  return response.rows[0]
}

export const updateSettingsByUserId = async (
  userId: string,
  displayName: string,
  yearOfBirth: string,
  nationality: string
) => {
  try {
    await db.execute({
      sql: 'UPDATE user SET name = ?, year_of_birth = ?, nationality = ? WHERE id = ?',
      args: [displayName, yearOfBirth, nationality, userId]
    })
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export const getAllRankingsByEditionId = async (
  editionId: string,
  nationality?: string,
  ageGroup?: AgeGroup
) => {
  let sql =
    'SELECT r.positions FROM ranking r JOIN user u on r.user_id = u.id WHERE r.edition_id = ?'

  const args = [editionId]

  if (nationality) {
    sql += ' AND u.nationality = ?'
    args.push(nationality)
  }

  if (ageGroup && ageGroup !== 'all') {
    const currentYear = new Date().getFullYear()
    const ageRanges: Record<AgeGroup, number[]> = {
      all: [0, currentYear],
      '0-15': [currentYear - 15, currentYear],
      '16-22': [currentYear - 22, currentYear - 16],
      '23-29': [currentYear - 29, currentYear - 23],
      '30-44': [currentYear - 44, currentYear - 30],
      '45-59': [currentYear - 59, currentYear - 45],
      '60-74': [currentYear - 74, currentYear - 60],
      '75+': [0, currentYear - 75]
    }
    const range = ageRanges[ageGroup]

    if (range) {
      sql += ' AND u.year_of_birth BETWEEN ? AND ?'
      args.push(range[0].toString(), range[1].toString())
    }
  }

  const response = await db.execute({ sql, args })

  return response.rows
}

export const getAllNationalFinals = async () => {
  const response = await db.execute({
    sql: `SELECT 
      ed.id AS editionId,
      e.name AS eventName, 
      e.country AS eventCountry, 
      ed.year AS editionYear, 
      ed.event_id AS eventId
      FROM edition ed 
      JOIN event e ON ed.event_id = e.id 
      WHERE ed.event_id != 1 
      AND ed.year <= 2100
      ORDER BY ed.year DESC, e.name ASC`,
    args: []
  })

  return response.rows
}

export const getNationalFinalsByYear = async (year: string) => {
  const response = await db.execute({
    sql: `SELECT 
      ed.id AS editionId,
      e.name AS eventName, 
      e.country AS eventCountry, 
      ed.year AS editionYear, 
      ed.event_id AS eventId
      FROM edition ed 
      JOIN event e ON ed.event_id = e.id 
      WHERE ed.event_id != 1 
      AND ed.year = ?
      ORDER BY e.name ASC`,
    args: [year]
  })

  return response.rows
}

export const getSongById = async (songId: string) => {
  const response = await db.execute({
    sql: `SELECT  
      s.title AS title, 
      s.picture_uri AS pictureUri, 
      s.audio_uri AS audioUri, 
      a.name AS artistName
      FROM song s 
      JOIN artist a ON s.artist_id = a.id 
      WHERE s.id = ?`,
    args: [songId]
  })

  return response.rows[0]
}
