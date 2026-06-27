export const AUTH_STORAGE_KEY = 'vendorlens-auth'

export function isAuthenticated() {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}

export function setAuthenticated() {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(AUTH_STORAGE_KEY, 'true')
  }
}

export function clearAuthentication() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}
