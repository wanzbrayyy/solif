import axios from 'axios'

// Pastikan URL Backend Vercel Anda benar
const API_URL = 'https://solid-palm.vercel.app/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request Interceptor: Pasang Token Otomatis
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// Response Interceptor: Menangani error tanpa auto-logout
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error Log:", error.response?.status, error.message)
    return Promise.reject(error)
  }
)

export default {
  // Auth
  register(data) { return apiClient.post('/auth/register', data) },
  login(data) { return apiClient.post('/auth/login', data) },
  
  // 2FA
  setup2FA(userId) { return apiClient.post('/auth/setup-2fa', { userId }) },
  verify2FASetup(data) { return apiClient.post('/auth/verify-2fa-setup', data) },
  verify2FA(data) { return apiClient.post('/auth/verify-2fa', data) },
  
  // User Data
  updateProfile(data) { return apiClient.put('/user/profile', data) },
  
  // Chats (Pribadi)
  getChats() { return apiClient.get('/chats') },
  saveChat(data) { return apiClient.post('/chats', data) },
  deleteChat(id) { return apiClient.delete(`/chats/${id}`) },

  // Chat Publik (FUNGSI BARU)
  getPublicChat(id) { return apiClient.get(`/public/chat/${id}`) }
}