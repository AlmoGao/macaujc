import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../views/Layout/Layout.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      { // 首页
        path: '/home',
        name: 'home',
        component: () => import('../views/Home/Home.vue')
      },
      { // 记录
        path: '/history',
        name: 'history',
        component: () => import('../views/Home/History.vue')
      },
      { // 走势
        path: '/trend',
        name: 'trend',
        component: () => import('../views/Home/Trend.vue')
      },
      { // 挑码助手
        path: '/picker',
        name: 'picker',
        component: () => import('../views/Home/Picker.vue')
      },
      { // 联系我们
        path: '/us',
        name: 'us',
        component: () => import('../views/Home/Us.vue')
      },
    ]
  },
  { // 登录
    path: '/alogin',
    redirect: '/shell/msde',
  },
  { // 登录
    path: '/shell/msde',
    name: 'alogin',
    component: () => import('../views/Admin/Login.vue')
  },
  { // 管理
    path: '/shell/amanager',
    name: 'amanager',
    redirect: '/shell/aplat',
    component: () => import('../views/Admin/Manager.vue'),
    children: [
      { // 新彩
        path: '/shell/aplat',
        name: 'aplat',
        component: () => import('../views/Admin/C/aplat.vue')
      },
      { // 新澳门六合彩
        path: '/shell/an6c',
        name: 'an6c',
        component: () => import('../views/Admin/C/an6c.vue')
      },
      { // 澳门六合彩
        path: '/shell/a6c',
        name: 'a6c',
        component: () => import('../views/Admin/C/a6c.vue')
      },
      { // 澳门六合彩3分
        path: '/shell/a6c3',
        name: 'a6c3',
        component: () => import('../views/Admin/C/a6c3.vue')
      },
      { // 攻略
        path: '/shell/acheats',
        name: 'acheats',
        component: () => import('../views/Admin/C/cheats.vue')
      },
      { // 
        path: '/shell/aps',
        name: 'aps',
        component: () => import('../views/Admin/C/password.vue')
      },
    ]
  },
  {
    // 找不到路由时
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  setTimeout(() => {
    const layout = document.querySelector('.page-layout')
    if (layout) {
      layout.scrollTop = 0
    }
  }, 300)
})
export default router
