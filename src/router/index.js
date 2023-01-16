import Vue from 'vue'
import VueRouter from 'vue-router'
import Loading from '../views/Loading.vue'
import Home from '../views/Home.vue'
import Chat from '../views/Chat.vue'
import Ads from '../views/Ads.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Loading',
    component: Loading
  },
  {
    path: '/signin',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ads',
    name: 'Ads',
    component: Ads,
    meta: {
      requiresAuth: true
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

window.backButtonDetected = false
window.addEventListener('popstate', () => {
  window.backButtonDetected = true
})

router.beforeEach((to, from, next) => {
  const isBackButton = window.backButtonDetected
  window.backButtonDetected = false

  if (isBackButton) {
    next('/')
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.nickname && store.state.nickname.length > 0) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }

  if (to.name === 'Home') {
    store.commit('setStep', 0)
  }

  if (to.name === 'Ads') {
    const ot = document.querySelector('script[src="//widgets.outbrain.com/outbrain.js"]')

    if (ot) {
      ot.remove()
    }

    console.log(ot)

    const t = document.createElement('script')
    t.setAttribute('type', 'text/javascript')
    t.setAttribute('async', '')
    t.src = '//widgets.outbrain.com/outbrain.js'
    document.head.appendChild(t)
  }

  if (from.name === 'Chat') {
    // document.body.style.height = '100%'
    // document.querySelector('.wrapper').style.height = '100%'
  }
})

export default router
