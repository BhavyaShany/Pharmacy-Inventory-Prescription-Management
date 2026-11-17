const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export function getToken() { return localStorage.getItem('pharmacy_token') }

export async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  const response = await fetch(`${API_URL}${path}`, { ...options, headers })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    let errorMsg = 'Something went wrong'
    if (data.detail) {
      if (typeof data.detail === 'string') {
        errorMsg = data.detail
      } else if (Array.isArray(data.detail)) {
        errorMsg = data.detail.map(err => err.msg || JSON.stringify(err)).join(', ')
      } else if (typeof data.detail === 'object') {
        errorMsg = JSON.stringify(data.detail)
      }
    } else if (data.message) {
      errorMsg = typeof data.message === 'string' ? data.message : JSON.stringify(data.message)
    }
    throw new Error(errorMsg)
  }
  return data
}
