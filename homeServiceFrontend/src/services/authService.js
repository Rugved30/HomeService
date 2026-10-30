import api from '../api.tsx'

export async function registerUser(userData) {
  const response = await api.post('/users', userData)
  return response.data
}