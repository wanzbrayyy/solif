<template>
  <div class="auth-container">
    <div class="auth-card flip-in">
      
      <!-- Icon Header -->
      <div class="icon-header">
        <i class="fa-solid fa-user-astronaut"></i>
      </div>

      <!-- Title & Subtitle -->
      <h2>join wanzofc</h2>
      <p class="subtitle">start building intelligent apps</p>
      
      <!-- Form Register -->
      <form @submit.prevent="handleRegister" class="auth-form">
        
        <!-- Username Input -->
        <div class="input-group">
          <i class="fa-regular fa-user"></i>
          <input 
            v-model="username"
            type="text" 
            placeholder="username" 
            required 
            autocomplete="username"
          >
        </div>
        
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
            placeholder="create password" 
            required 
            autocomplete="new-password"
          >
        </div>
        
        <!-- Error Message Display -->
        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

        <!-- Submit Button -->
        <button type="submit" class="btn-auth rubber-band-hover" :disabled="isLoading">
          <span v-if="!isLoading">create account</span>
          <i v-else class="fa-solid fa-circle-notch fa-spin"></i>
        </button>
      </form>

      <!-- Footer Link -->
      <div class="auth-footer">
        <p>already have an account? <router-link to="/login">login here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api' // Pastikan file service API sudah ada

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('') // State untuk pesan error

const handleRegister = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    // 1. Panggil API Register
    await api.register({
      username: username.value,
      email: email.value,
      password: password.value
    })

    // 2. Jika register sukses, langsung login otomatis
    const loginResponse = await api.login({
      email: email.value,
      password: password.value
    })
    
    // 3. Simpan data login
    if (loginResponse.data.token && loginResponse.data.user) {
      localStorage.setItem('token', loginResponse.data.token)
      localStorage.setItem('isAuth', 'true')
      localStorage.setItem('userData', JSON.stringify(loginResponse.data.user))
      
      // Redirect ke chat
      router.push('/chat')
    } else {
      // Jika auto-login gagal, arahkan ke halaman login manual
      router.push('/login')
    }

  } catch (error) {
    console.error("Registration Error:", error)
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage.value = error.response.data.error // Tampilkan pesan error dari backend
    } else {
      errorMessage.value = 'Registration failed. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Style sama seperti Login, hanya warna button berbeda */
.auth-container { height: 100vh; background: #020617; display: flex; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', sans-serif; text-transform: lowercase; }
.auth-card { background: #0f172a; padding: 40px; border-radius: 24px; width: 100%; max-width: 400px; border: 1px solid rgba(255,255,255,0.05); text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }

.icon-header { 
  font-size: 3rem; 
  color: #a855f7; /* Warna ungu untuk register */
  margin-bottom: 20px; 
}

h2 { color: #f8fafc; font-weight: 700; margin-bottom: 5px; font-size: 1.8rem; }
.subtitle { color: #64748b; font-size: 0.9rem; margin-bottom: 30px; }

.auth-form { display: flex; flex-direction: column; gap: 15px; }

.input-group { background: #1e293b; border-radius: 12px; padding: 12px 15px; display: flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,0.05); transition: 0.3s; }
.input-group:focus-within { 
  border-color: #a855f7; /* Warna ungu untuk register */
  box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.2); 
}
.input-group i { color: #94a3b8; }
input { background: transparent; border: none; color: white; width: 100%; outline: none; font-size: 1rem; }

.error-text {
  color: #ef4444;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 0;
}

.btn-auth { 
  background: #a855f7; /* Warna ungu untuk register */
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
.btn-auth:hover { background: #9333ea; transform: translateY(-2px); }
.btn-auth:disabled { background: #334155; cursor: not-allowed; }

.auth-footer { margin-top: 20px; font-size: 0.85rem; color: #64748b; }
.auth-footer a { 
  color: #c084fc; /* Warna ungu untuk register */
  text-decoration: none; 
  font-weight: 600; 
}
.auth-footer a:hover { text-decoration: underline; }
</style>