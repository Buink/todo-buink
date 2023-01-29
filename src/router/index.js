import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../views/DashboardPage.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardPage
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignPage')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProjectsPage')
  },
  {
    path: '/team',
    name: 'team',
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamPage')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
