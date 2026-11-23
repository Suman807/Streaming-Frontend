import { api } from './client'

/** POST /login → returns the raw JWT string as the response body. */
export async function login(username: string, password: string): Promise<string> {
  const res = await api.post<string>(
    '/login',
    { username, password },
    { responseType: 'text', transformResponse: (d) => d },
  )
  return res.data.trim()
}

/** Reads the JWT payload (no verification — display purposes only). */
export function decodeToken(token: string): { sub?: string; exp?: number } | null {
  try {
    const payload = token.split('.')[1]
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  const exp = decodeToken(token)?.exp
  return exp !== undefined && exp * 1000 <= Date.now()
}
