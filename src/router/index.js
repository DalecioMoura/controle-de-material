import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
