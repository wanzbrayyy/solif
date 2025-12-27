import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ChatInterface from '../views/ChatInterface.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'landing', component: LandingPage },
    { path: '/chat', name: 'chat', component: ChatInterface }
  ]
})

export default router