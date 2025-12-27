<template>
  <div class="auth-container">
    <div class="auth-card flip-in">
      <div class="icon-header">
        <i class="fa-solid fa-user-astronaut"></i>
      </div>
      <h2>join wanzofc</h2>
      <p class="subtitle">start building intelligent apps</p>
      
      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="input-group">
          <i class="fa-regular fa-user"></i>
          <input type="text" placeholder="username" required>
        </div>
        <div class="input-group">
          <i class="fa-regular fa-envelope"></i>
          <input v-model="email" type="email" placeholder="email address" required>
        </div>
        <div class="input-group">
          <i class="fa-solid fa-lock"></i>
          <input v-model="password" type="password" placeholder="create password" required>
        </div>
        
        <button type="submit" class="btn-auth rubber-band-hover">
          <span v-if="!isLoading">create account</span>
          <i v-else class="fa-solid fa-circle-notch fa-spin"></i>
        </button>
      </form>

      <div class="auth-footer">
        <p>already have an account? <router-link to="/login">login here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleRegister = () => {
  isLoading.value = true
  setTimeout(() => {
    localStorage.setItem('isAuth', 'true')
    localStorage.setItem('user', email.value)
    router.push('/chat')
  }, 1500)
}
</script>

<style scoped>
/* Gunakan style yang sama persis dengan LoginView untuk konsistensi */
.auth-container { height: 100vh; background: #020617; display: flex; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', sans-serif; }
.auth-card { background: #0f172a; padding: 40px; border-radius: 24px; width: 100%; max-width: 400px; border: 1px solid rgba(255,255,255,0.05); text-align: center; }
.icon-header { font-size: 3rem; color: #a855f7; margin-bottom: 20px; }
h2 { color: #f8fafc; font-weight: 700; margin-bottom: 5px; text-transform: lowercase; }
.subtitle { color: #64748b; font-size: 0.9rem; margin-bottom: 30px; text-transform: lowercase; }
.auth-form { display: flex; flex-direction: column; gap: 15px; }
.input-group { background: #1e293b; border-radius: 12px; padding: 12px 15px; display: flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,0.05); transition: 0.3s; }
.input-group:focus-within { border-color: #a855f7; box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.2); }
.input-group i { color: #94a3b8; }
input { background: transparent; border: none; color: white; width: 100%; outline: none; }
.btn-auth { background: #a855f7; color: white; padding: 14px; border-radius: 12px; font-weight: 600; margin-top: 10px; transition: 0.3s; text-transform: lowercase; }
.btn-auth:hover { background: #9333ea; }
.auth-footer { margin-top: 20px; font-size: 0.85rem; color: #64748b; }
.auth-footer a { color: #c084fc; text-decoration: none; font-weight: 600; }
</style>