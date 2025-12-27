<template>
  <div class="auth-container">
    <div class="auth-card zoom-in">
      
      <!-- Icon Header -->
      <div class="icon-header">
        <i class="fa-solid fa-fingerprint"></i>
      </div>
      
      <!-- Title & Subtitle -->
      <h2>welcome back</h2>
      <p class="subtitle">continue your development journey</p>
      
      <!-- Form Login -->
      <form @submit.prevent="handleLogin" class="auth-form">
        
        <!-- Email Input -->
        <div class="input-group">
          <i class="fa-regular fa-envelope"></i>
          <input 
            v-model="email" 
            type="email" 
            placeholder="email address" 
            required 
            autocomplete="email"
          >
        </div>
        
        <!-- Password Input -->
        <div class="input-group">
          <i class="fa-solid fa-lock"></i>
          <input 
            v-model="password" 
            type="password" 
            placeholder="password" 
            required 
            autocomplete="current-password"
          >
        </div>
        
        <!-- Error Message Display -->
        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

        <!-- Submit Button -->
        <button type-="submit" class="btn-auth rubber-band-hover" :disabled="isLoading">
          <span v-if="!isLoading">login</span>
          <i v-else class="fa-solid fa-circle-notch fa-spin"></i>
        </button>
      </form>

      <!-- Footer Link -->
      <div class="auth-footer">
        <p>don't have an account? <router-link to="/register">create one</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api' // Pastikan file service API sudah ada

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('') // State untuk menampilkan pesan error

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = '' // Reset error setiap kali login
  
  try {
    const res = await api.login({ 
      email: email.value, 
      password: password.value 
    })
    
    // Debugging di console browser
    console.log("Login Response Data:", res.data)

    // Scenario 1: User punya 2FA aktif
    if (res.data.require2FA) {
      // Simpan User ID sementara untuk halaman verifikasi
      localStorage.setItem('tempUserId', res.data.userId)
      // Redirect ke halaman verifikasi
      router.push('/verify-2fa')
    } 
    // Scenario 2: Login normal sukses
    else {
      // Pastikan backend mengirim token dan data user
      if (res.data.token && res.data.user && res.data.user.id) {
        // Simpan token untuk request API selanjutnya
        localStorage.setItem('token', res.data.token)
        
        // Simpan flag bahwa user sudah login
        localStorage.setItem('isAuth', 'true')
        
        // Simpan data user (termasuk ID, username, dll)
        localStorage.setItem('userData', JSON.stringify(res.data.user))

        // Redirect ke halaman chat utama
        router.push('/chat')
      } else {
        // Jika response backend tidak sesuai ekspektasi
        throw new Error("Invalid response from server. User data or token is missing.")
      }
    }
  } catch (error) {
    // Tangani error dari API call
    console.error("Login Error:", error)
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage.value = error.response.data.error // Tampilkan pesan error dari backend
    } else {
      errorMessage.value = 'An unexpected server error occurred.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Gunakan style yang sama untuk konsistensi, bisa juga dipisah ke file CSS global */
.auth-container { 
  height: 100vh; 
  background: #020617; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-family: 'Plus Jakarta Sans', sans-serif; 
  text-transform: lowercase; 
}

.auth-card { 
  background: #0f172a; 
  padding: 40px; 
  border-radius: 24px; 
  width: 100%; 
  max-width: 400px; 
  border: 1px solid rgba(255,255,255,0.05); 
  text-align: center; 
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

.icon-header { 
  font-size: 3rem; 
  color: #6366f1; 
  margin-bottom: 20px; 
}

h2 { 
  color: #f8fafc; 
  font-weight: 700; 
  margin-bottom: 5px; 
  font-size: 1.8rem;
}

.subtitle { 
  color: #64748b; 
  font-size: 0.9rem; 
  margin-bottom: 30px; 
}

.auth-form { 
  display: flex; 
  flex-direction: column; 
  gap: 15px; 
}

.input-group { 
  background: #1e293b; 
  border-radius: 12px; 
  padding: 12px 15px; 
  display: flex; 
  align-items: center; 
  gap: 10px; 
  border: 1px solid rgba(255,255,255,0.05); 
  transition: 0.3s; 
}
.input-group:focus-within { 
  border-color: #6366f1; 
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2); 
}
.input-group i { color: #94a3b8; }
input { 
  background: transparent; 
  border: none; 
  color: white; 
  width: 100%; 
  outline: none; 
  font-size: 1rem;
}

.error-text {
  color: #ef4444;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 0;
}

.btn-auth { 
  background: #6366f1; 
  color: white; 
  padding: 14px; 
  border-radius: 12px; 
  font-weight: 600; 
  margin-top: 10px; 
  cursor: pointer; 
  border: none;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
}
.btn-auth:hover { background: #4f46e5; transform: translateY(-2px); }
.btn-auth:disabled { background: #334155; cursor: not-allowed; }

.auth-footer { 
  margin-top: 20px; 
  font-size: 0.85rem; 
  color: #64748b; 
}
.auth-footer a { 
  color: #818cf8; 
  text-decoration: none; 
  font-weight: 600; 
}
.auth-footer a:hover { text-decoration: underline; }
</style>