import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ChatInterface from '../views/ChatInterface.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue' // Import Baru
import Verify2FA from '../views/Verify2FA.vue'     // Import Baru

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'landing', component: LandingPage },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/verify-2fa', name: 'verify-2fa', component: Verify2FA }, // Route Baru
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuth') === 'true'
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    next('/chat')
  } else {
    next()
  }
})

export default router