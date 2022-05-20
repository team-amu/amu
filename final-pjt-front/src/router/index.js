import Vue from 'vue'
import VueRouter from 'vue-router'

// accounts 부분
import LoginView from '@/views/LoginView.vue'
import LogoutView from '@/views/LogoutView.vue'
import SignupView from '@/views/SignupView.vue'

// movies 부분
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  // accounts 부분
  {
    path: '/accounts/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/accounts/logout',
    name: 'logout',
    component: LogoutView,
  },
  {
    path: '/accounts/signup',
    name: 'signup',
    component: SignupView,
  },
  
  // movies 부분
  {
    path: '/movies',
    name: 'home',
    component: HomeView,
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
