import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/opcoes',
    name: 'opcoes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Opcoes.vue')
  },
  {
    path: '/cadastro',
    name: 'cadastro',    
    component: () => import('../views/CadastroDeMaterial.vue')
  },
  {
    path: '/editar',
    name: 'editar',    
    component: () => import('../views/EditarMaterial.vue')
  },
  {
    path: '/excluir',
    name: 'excluir',    
    component: () => import('../views/ExcluirMaterial.vue')
  },
  {
    path: '/consulta',
    name: 'consulta',    
    component: () => import('../views/ConsultaDeMatrerial.vue')
  },
  {
    path: '/retirada',
    name: 'retirada',    
    component: () => import('../views/RetiradaDeMaterial.vue')
  },
  {
    path: '/devolucao',
    name: 'devolucao',    
    component: () => import('../views/DevolucaoDeMaterial.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
