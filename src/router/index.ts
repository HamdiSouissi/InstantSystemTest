import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SearchView from '../views/SearchView.vue';
import ResultView from '../views/ResultView.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: SearchView
  },
  {
    path: '/result',
    name: 'result',
    component: ResultView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
