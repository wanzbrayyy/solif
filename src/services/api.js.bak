import axios from 'axios'

// Ganti URL ini dengan domain Vercel Anda yang aktif
const API_URL = 'https://solid-palm.vercel.app/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// INTERCEPTOR PENTING: Sisipkan Token ke Header
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default {
  // Auth
  register(data) { return apiClient.post('/auth/register', data) },
  login(data) { return apiClient.post('/auth/login', data) },
  
  // 2FA (Pastikan userId dikirim dalam object)
  setup2FA(userId) { return apiClient.post('/auth/setup-2fa', { userId }) },
  verify2FASetup(data) { return apiClient.post('/auth/verify-2fa-setup', data) },
  verify2FA(data) { return apiClient.post('/auth/verify-2fa', data) },
  
  // Profile (PUT data)
  updateProfile(data) { return apiClient.put('/user/profile', data) },
  
  // Chats (GET & POST - Otomatis bawa token dari interceptor)
  getChats() { return apiClient.get('/chats') },
  saveChat(data) { return apiClient.post('/chats', data) },
  deleteChat(id) { return apiClient.delete(`/chats/${id}`) }
}