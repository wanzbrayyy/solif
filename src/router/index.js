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
      path: '/view/:id', 
      name: 'public-chat', 
      component: PublicChatView 
    },
    { 
      path: '/chat/:id?', 
      name: 'chat', 
      component: ChatInterface,
      meta: { requiresAuth: true } 
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    }
  ]
})

// PERBAIKAN LOGIKA NAVIGATION GUARD UNTUK MENCEGAH LAYAR GELAP
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = localStorage.getItem('isAuth') === 'true' && !!token

  const isAuthPage = to.name === 'login' || to.name === 'register';
  const requiresAuth = to.meta.requiresAuth;

  // Case 1: Mencoba akses halaman pribadi (butuh auth) TAPI tidak login
  if (requiresAuth && !isAuthenticated) {
    // Redirect ke login, dan simpan halaman tujuan agar bisa kembali setelah login
    next({ name: 'login', query: { redirect: to.fullPath } });
  } 
  // Case 2: SUDAH login TAPI mencoba akses halaman login/register
  else if (isAuthenticated && isAuthPage) {
    // Redirect ke halaman chat utama
    next({ name: 'chat' });
  } 
  // Case 3: Semua kasus lain (akses halaman publik, atau akses halaman pribadi saat sudah login)
  else {
    // Izinkan navigasi
    next();
  }
})

export default router