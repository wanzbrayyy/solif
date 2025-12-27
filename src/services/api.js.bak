import axios from 'axios'

// Pastikan URL ini benar sesuai domain backend Anda di Vercel
const API_URL = 'https://solid-palm.vercel.app/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// INTERCEPTOR (WAJIB ADA)
apiClient.interceptors.request.use(config => {
  // Ambil token dari localStorage
  const token = localStorage.getItem('token')
  
  // Debugging: Cek di console browser apakah token ada
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    console.warn("⚠️ No Token found in LocalStorage")
  }
  
  return config
}, error => {
  return Promise.reject(error)
})

export default {
  // Auth
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