import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const baseUrl = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/login/login.vue')
  }
]
export const tRoute = [
  {
    path: '',
    component: () => import('./views/root'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        hidden: false,
        meta: {
          title: '首页'
        },
        component: () => import('./views/welcome.vue')
      },
      {
        path: '/exam',
        name: 'exam',
        hidden: false,
        meta: {
          title: '创建试卷'
        },
        component: () => import('./views/exam/exam.vue')
      },
      {
        path: '/createTitle',
        name: 'createTitle',
        hidden: false,
        meta: {
          title: '创建题目'
        },
        component: () => import('./views/createTitle/createTitle.vue')
      },
      {
        path: '/auditTopics',
        name: 'auditTopics',
        hidden: false,
        meta: {
          title: '审核题目'
        },
        component: () => import('./views/auditTopics/auditTopics.vue')
      }
    ]
  }
]
export const sRoute = [
  {
    path: '',
    component: () => import('./views/root'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        hidden: false,
        meta: {
          title: '首页'
        },
        component: () => import('./views/welcome.vue')
      },
      {
        path: '/write',
        name: 'write',
        hidden: true,
        meta: {
          title: '答题页面'
        },
        component: () => import('./views/write/index.vue')
      },
      {
        path: '/topicsList',
        name: 'topicsList',
        hidden: false,
        meta: {
          title: '题目列表'
        },
        component: () => import('./views/student/topicsList/topicsList.vue')
      },
      {
        path: '/selectTest',
        name: 'selectTest',
        hidden: false,
        meta: {
          title: '考试列表'
        },
        component: () => import('./views/student/selectTest/selectTest.vue')
      },
      {
        path: '/testDetail',
        name: 'testDetail',
        hidden: true,
        meta: {
          title: '考试详情'
        },
        component: () => import('./views/student/testDetail/testDetail.vue')
      },
      {
        path: '/records',
        name: 'records',
        hidden: false,
        meta: {
          title: '提交记录'
        },
        component: () => import('./views/student/records/records.vue')
      }
    ]
  }
]
const router = new Router({
  mode: 'hash',
  routes: baseUrl
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    sessionStorage.clear()
    next()
  } else {
    if (!store.state.hasRouter) {
      // 没有生成路由,或者刷新了页面
      if (!sessionStorage.getItem('teacherId') && !sessionStorage.getItem('studentId')) {
        // 说明没有状态,需要从新登陆
        next({ name: 'login' })
      } else {
        // 已经有了状态,直接生成路由
        // 说明并没有生成路由表
        if (sessionStorage.getItem('teacherId')) {
          // 老师标识存在
          router.addRoutes(tRoute)
          store.state.hasRouter = true
          store.commit('menu', tRoute)
          sessionStorage.setItem('menu', JSON.stringify(tRoute))
        } else {
          // 学生标识存在
          router.addRoutes(sRoute)
          store.state.hasRouter = true
          store.commit('menu', sRoute)
        }
        next({ ...to, replace: true })
      }
    } else {
      next()
    }
  }
})

export default router
