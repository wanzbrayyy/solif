<template>
  <div class="auth-container">
    <div class="auth-card zoom-in">
      <div class="icon-header">
        <i class="fa-solid fa-fingerprint"></i>
      </div>
      <h2>welcome back</h2>
      <p class="subtitle">continue your development journey</p>
      
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="input-group">
          <i class="fa-regular fa-envelope"></i>
          <input v-model="email" type="email" placeholder="email address" required>
        </div>
        <div class="input-group">
          <i class="fa-solid fa-lock"></i>
          <input v-model="password" type="password" placeholder="password" required>
        </div>
        
        <button type="submit" class="btn-auth rubber-band-hover">
          <span v-if="!isLoading">login</span>
          <i v-else class="fa-solid fa-circle-notch fa-spin"></i>
        </button>
      </form>

      <div class="auth-footer">
        <p>don't have an account? <router-link to="/register">create one</router-link></p>
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

const handleLogin = () => {
  isLoading.value = true
  // Simulasi API call
  setTimeout(() => {
    localStorage.setItem('isAuth', 'true')
    localStorage.setItem('user', email.value)
    router.push('/chat')
  }, 1500)
}
</script>

<style scoped>
.auth-container {
  height: 100vh;
  background: #020617;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.auth-card {
  background: #0f172a;
  padding: 40px;
  border-radius: 24px;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255,255,255,0.05);
  text-align: center;
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
  text-transform: lowercase;
}

.subtitle {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 30px;
  text-transform: lowercase;
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
}

.btn-auth {
  background: #6366f1;
  color: white;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  margin-top: 10px;
  transition: 0.3s;
  text-transform: lowercase;
}

.btn-auth:hover { background: #4f46e5; }

.auth-footer { margin-top: 20px; font-size: 0.85rem; color: #64748b; }
.auth-footer a { color: #818cf8; text-decoration: none; font-weight: 600; }
</style>