import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/kamera/Home.vue'
import Createkamera from '../views/kamera/Createkamera.vue'
import Editkamera from '../views/kamera/Editkamera.vue'
import Detailkamera from '../views/kamera/Detailkamera.vue'
import Index from '../views/pelanggan/Index.vue'
import Createpelanggan from '../views/pelanggan/Createpelanggan.vue'
import Editpelanggan from '../views/pelanggan/Editpelanggan.vue'
import Sewa from '../views/sewa/Sewa.vue'
import Detailsewa from '../views/sewa/Detailsewa.vue'
import Createsewa from '../views/sewa/Createsewa.vue'
import Editsewa from '../views/sewa/Editsewa.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/createkamera',
    name: 'Createkamera',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Createkamera
  },
  {
    path: '/editkamera',
    name: 'Editkamera',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Editkamera
  },
  {
    path: '/detailkamera/:id',
    name: 'Detailkamera',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Detailkamera
  },
  {
    path: '/pelanggan',
    name: 'Index',
    component: Index
  },
  {
    path: '/createpelanggan',
    name: 'Createpelanggan',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Createpelanggan
  },
  {
    path: '/editpelanggan',
    name: 'Editpelanggan',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Editpelanggan
  },
  {
    path: '/sewa',
    name: 'Sewa',
    component: Sewa
  },
  {
    path: '/detailsewa',
    name: 'Detailsewa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Detailsewa
  },
  {
    path: '/createsewa',
    name: 'Createsewa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Createsewa
  },
  {
    path: '/editsewa',
    name: 'Editsewa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Editsewa
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
