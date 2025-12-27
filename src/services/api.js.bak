import axios from 'axios'

// ⚠️ GANTI INI SETELAH DEPLOY BACKEND
// Contoh: https://wanzofc-api.vercel.app/api
// Jangan lupa tambahkan '/api' di ujungnya karena di index.js backend route-nya pakai awalan /api
const API_URL = 'https://solid-palm.vercel.app/api' 

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
})

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default {
  register(data) { return apiClient.post('/auth/register', data) },
  login(data) { return apiClient.post('/auth/login', data) },
  setup2FA(userId) { return apiClient.post('/auth/setup-2fa', { userId }) },
  verify2FASetup(data) { return apiClient.post('/auth/verify-2fa-setup', data) },
  verify2FA(data) { return apiClient.post('/auth/verify-2fa', data) },
  updateProfile(data) { return apiClient.put('/user/profile', data) },
  getChats() { return apiClient.get('/chats') },
  saveChat(data) { return apiClient.post('/chats', data) },
  deleteChat(id) { return apiClient.delete(`/chats/${id}`) }
}