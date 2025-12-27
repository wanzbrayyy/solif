import axios from 'axios'

const API_URL = 'https://solid-palm.vercel.app/api' // URL Backend Anda

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
  
  // 2FA Endpoints
  setup2FA(userId) { return apiClient.post('/auth/setup-2fa', { userId }) },
  verify2FASetup(data) { return apiClient.post('/auth/verify-2fa-setup', data) }, // Saat setup
  verify2FA(data) { return apiClient.post('/auth/verify-2fa', data) }, // Saat login
  
  updateProfile(data) { return apiClient.put('/user/profile', data) },
  getChats() { return apiClient.get('/chats') },
  saveChat(data) { return apiClient.post('/chats', data) },
  deleteChat(id) { return apiClient.delete(`/chats/${id}`) }
}