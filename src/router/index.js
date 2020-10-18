import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from '../store'
import Login from '../views/Login'
import Register from '../views/Register'
import Home from '../views/Home'
import Chat from '../views/Chat'
import Forgot from '../views/ForgotPassword'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgot',
    name: 'ForgotPassword',
    component: Forgot
  },
  {
    path: '/',
    name: 'chat',
    component: Chat,
    meta: {
      requiresAuth: true,
      title: 'Chat'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { // jika ada requiresAuth TRUE di setiap path
    if (!store.getters['auth/isLogin']) { // masuk selanjutnya jika tidak ada getters di login
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
