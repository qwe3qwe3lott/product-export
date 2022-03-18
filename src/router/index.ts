import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import AboutPage from '@/pages/AboutPage.vue'
import AuthorsPage from '@/pages/AuthorsPage.vue'
import TablesPage from '@/pages/TablesPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: [
      {
        path: 'about',
        name: 'AboutPage',
        component: AboutPage
      },
      {
        path: 'authors',
        name: 'AuthorsPage',
        component: AuthorsPage
      },
      {
        path: '/',
        name: 'TablesPage',
        component: TablesPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
