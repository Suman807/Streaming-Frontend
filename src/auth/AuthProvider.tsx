import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { setUnauthorizedHandler, tokenStorage } from '../api/client'
import { decodeToken, isTokenExpired, login as loginRequest } from '../api/auth'
import { AuthContext } from './useAuth'
import type { AuthState } from './useAuth'

function initialToken(): string | null {
  const t = tokenStorage.get()
  if (t && isTokenExpired(t)) {
    tokenStorage.clear()
    return null
  }
  return t
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(initialToken)

  const logout = useCallback(() => {
    tokenStorage.clear()
    setToken(null)
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    const jwt = await loginRequest(username, password)
    tokenStorage.set(jwt)
    setToken(jwt)
  }, [])

  // Log out automatically when the backend rejects the token.
  useEffect(() => {
    setUnauthorizedHandler(logout)
    return () => setUnauthorizedHandler(null)
  }, [logout])

  // Log out when the token's exp time passes (backend default: 60 min).
  useEffect(() => {
    const exp = token ? decodeToken(token)?.exp : undefined
    if (!exp) return
    const ms = exp * 1000 - Date.now()
    const id = setTimeout(logout, Math.max(ms, 0))
    return () => clearTimeout(id)
  }, [token, logout])

  const value = useMemo<AuthState>(
    () => ({
      token,
      username: token ? (decodeToken(token)?.sub ?? null) : null,
      login,
      logout,
    }),
    [token, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

