import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: () => import('../components/home/home.vue'),
      children: [
        {
          path: '/users/:page?',
          component: () => import('../components/users/users.vue')
        },
        {
          path: '/roles',
          component: () => import('../components/roles/roles.vue')
        },
        {
          path: '/rights',
          component: () => import('../components/rights/rights.vue')
        },
        {
          path: '/goods',
          component: () => import('../components/goods/goods.vue')
        },
        {
          path: '/categories',
          component: () => import('../components/categories/categories.vue')
        },
        {
          path: '/goods-add',
          component: () => import('../components/goods-add/goods-add.vue')
        }
      ]
    }
  ]
})

// 导航 守卫
router.beforeEach((to, from, next) => {
  // 判断访问的是不是登录页面
  if (to.path === '/login') {
    next()
  } else {
    // 其他页面
    // 判断有没有登录过
    const token = localStorage.getItem('token')
    // 判断token有没有值

    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
