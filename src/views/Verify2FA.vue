<template>
  <div class="auth-container">
    <div class="auth-card zoom-in">
      <div class="icon-header">
        <i class="fa-solid fa-shield-halved"></i>
      </div>
      <h2>verify identity</h2>
      <p class="subtitle">enter the code from your authenticator app</p>
      
      <form @submit.prevent="verify" class="auth-form">
        <div class="input-group">
          <i class="fa-solid fa-key"></i>
          <input 
            v-model="code" 
            type="text" 
            placeholder="123456" 
            maxlength="6" 
            class="otp-input"
          >
        </div>
        
        <button type="submit" class="btn-auth rubber-band-hover">
          <span v-if="!isLoading">verify code</span>
          <i v-else class="fa-solid fa-circle-notch fa-spin"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const code = ref('')
const isLoading = ref(false)

const verify = async () => {
  if (code.value.length !== 6) return
  isLoading.value = true
  
  const tempUserId = localStorage.getItem('tempUserId')
  
  try {
    const res = await api.verify2FA({ userId: tempUserId, code: code.value })
    
    // Auth Success
    localStorage.setItem('isAuth', 'true')
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('userData', JSON.stringify(res.data.user))
    localStorage.removeItem('tempUserId')
    
    router.push('/chat')
  } catch (error) {
    alert('Invalid Code! (For demo use "123456")')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Reuse styles from LoginView for consistency */
.auth-container { height: 100vh; background: #020617; display: flex; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', sans-serif; text-transform: lowercase; }
.auth-card { background: #0f172a; padding: 40px; border-radius: 24px; width: 100%; max-width: 400px; border: 1px solid rgba(255,255,255,0.05); text-align: center; }
.icon-header { font-size: 3rem; color: #22c55e; margin-bottom: 20px; }
h2 { color: #f8fafc; font-weight: 700; margin-bottom: 5px; }
.subtitle { color: #64748b; font-size: 0.9rem; margin-bottom: 30px; }
.input-group { background: #1e293b; border-radius: 12px; padding: 12px 15px; display: flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,0.05); }
.input-group:focus-within { border-color: #22c55e; }
.otp-input { background: transparent; border: none; color: white; width: 100%; outline: none; font-size: 1.5rem; letter-spacing: 5px; text-align: center; font-weight: 700; }
.btn-auth { background: #22c55e; color: white; padding: 14px; border-radius: 12px; font-weight: 600; width: 100%; margin-top: 20px; cursor: pointer; transition: 0.3s; }
.btn-auth:hover { background: #16a34a; }
</style>