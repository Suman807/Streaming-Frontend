import axios, { AxiosError } from 'axios'

const TOKEN_KEY = 'streaming.jwt'

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/backend',
})

api.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

/** Called when the backend rejects our token (expired / invalid). */
let onUnauthorized: (() => void) | null = null
export const setUnauthorizedHandler = (fn: (() => void) | null) => {
  onUnauthorized = fn
}

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const status = error.response?.status
    const isLogin = error.config?.url === '/login'
    if (!isLogin && (status === 401 || status === 403)) onUnauthorized?.()
    return Promise.reject(error)
  },
)

/** Extracts a readable message from the backend's various error shapes. */
export function errorMessage(err: unknown, fallback = 'Something went wrong'): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data
    if (typeof data === 'string' && data.trim()) return data
    if (data && typeof data === 'object' && 'message' in data) {
      return String((data as { message: unknown }).message)
    }
    if (!err.response) return 'Cannot reach the server. Is the Spring Boot backend running?'
    return `${fallback} (HTTP ${err.response.status})`
  }
  return fallback
}
