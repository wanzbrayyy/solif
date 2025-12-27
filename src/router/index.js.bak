import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ChatInterface from '../views/ChatInterface.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import Verify2FA from '../views/Verify2FA.vue'
import PublicChatView from '../views/PublicChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', 
      name: 'landing', 
      component: LandingPage 
    },
    { 
      path: '/login', 
      name: 'login', 
      component: LoginView 
    },
    { 
      path: '/register', 
      name: 'register', 
      component: RegisterView 
    },
    { 
      path: '/verify-2fa', 
      name: 'verify-2fa', 
      component: Verify2FA 
    },
    { 
      // Rute Publik (Tidak perlu login)
      path: '/view/:id', 
      name: 'public-chat', 
      component: PublicChatView 
    },
    { 
      // Rute Chat Pribadi (Wajib login)
      path: '/chat/:id?', 
      name: 'chat', 
      component: ChatInterface,
      meta: { requiresAuth: true } 
    },
    {
      // Rute Profile (Wajib login)
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation Guard: Melindungi Rute Pribadi
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = localStorage.getItem('isAuth') === 'true' && !!token
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Jika mencoba akses halaman pribadi tanpa login, redirect ke login
    next('/login')
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    // Jika sudah login dan mencoba akses halaman login/register, redirect ke chat
    next('/chat')
  } else {
    // Lanjutkan navigasi
    next()
  }
})

export default router