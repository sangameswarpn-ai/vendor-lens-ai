import axios from 'axios'
import { getToken, clearAuthentication } from './auth'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor to attach token and bypass localtunnel reminder
api.interceptors.request.use((config) => {
  const token = getToken()
  if (config.headers) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['Bypass-Tunnel-Reminder'] = 'true'
  }
  return config
})

// Response interceptor to handle 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status
    if (status === 401) {
      try {
        clearAuthentication()
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      } catch {
        // ignore
      }
    }
    return Promise.reject(err)
  },
)

export default api
