import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import LoginView from '@/views/LoginView.vue'
import WeatherView from '@/views/WeatherView.vue'
import { getAuth } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: RegistrationView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/weather',
      name: 'weather',
      component: WeatherView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/login',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const getUser = localStorage.getItem('user')

  if (to.meta.requiresAuth && !getUser) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
