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
      { // 挑码助手
        path: '/picker',
        name: 'picker',
        component: () => import('../views/Home/Picker.vue')
      },
    ]
  },
  { // 登录
    path: '/alogin',
    name: 'alogin',
    component: () => import('../views/Admin/Login.vue')
  },
  { // 管理
    path: '/amanager',
    name: 'amanager',
    redirect: '/aplat',
    component: () => import('../views/Admin/Manager.vue'),
    children: [
      { // 平台彩
        path: '/aplat',
        name: 'aplat',
        component: () => import('../views/Admin/C/aplat.vue')
      },
      { // 新澳门六合彩
        path: '/an6c',
        name: 'an6c',
        component: () => import('../views/Admin/C/an6c.vue')
      },
      { // 澳门六合彩
        path: '/a6c',
        name: 'a6c',
        component: () => import('../views/Admin/C/a6c.vue')
      },
      { // 澳门六合彩3分
        path: '/a6c3',
        name: 'a6c3',
        component: () => import('../views/Admin/C/a6c3.vue')
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
