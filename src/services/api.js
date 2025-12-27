import axios from 'axios'

// Pastikan URL ini sesuai dengan Backend Vercel Anda
const API_URL = 'https://solid-palm.vercel.app/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// === INTERCEPTOR PENTING ===
apiClient.interceptors.request.use(config => {
  // Ambil token langsung dari localStorage setiap kali request mau dikirim
  const token = localStorage.getItem('token')
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log(`[API REQUEST] Sending token for: ${config.url}`) // Debug di Console Browser
  } else {
    console.warn(`[API WARNING] No token found for: ${config.url}`)
  }
  
  return config
}, error => {
  return Promise.reject(error)
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Log error lengkap agar mudah debug
    console.error("API Error:", error.response?.status, error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default {
  register(data) { return apiClient.post('/auth/register', data) },
  login(data) { return apiClient.post('/auth/login', data) },
  
  // 2FA
  setup2FA(userId) { return apiClient.post('/auth/setup-2fa', { userId }) },
  verify2FASetup(data) { return apiClient.post('/auth/verify-2fa-setup', data) },
  verify2FA(data) { return apiClient.post('/auth/verify-2fa', data) },
  
  // Profile & Chats
  updateProfile(data) { return apiClient.put('/user/profile', data) },
  getChats() { return apiClient.get('/chats') },
  saveChat(data) { return apiClient.post('/chats', data) },
  deleteChat(id) { return apiClient.delete(`/chats/${id}`) }
}