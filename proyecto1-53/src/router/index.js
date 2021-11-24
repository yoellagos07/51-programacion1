import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import{getAuth} from 'firebase/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/taller',
    name:'Taller',
    meta: {requiresAuth: true},
    component: () => import('../views/Taller.vue')
  },
  {
    path:'/producto',
    name:'Producto',
    meta: {requiresAuth: true},
    component: ()=> import('../views/Producto.vue')
  },
  {
    path:'/notebook',
    name:'Notebook',
    meta: {requiresAuth: true},
    component: ()=> import('../views/Notebook.vue')
  },
  {
    path:'/autenticacion',
    name:'Autenticacion',
    component: () => import('../views/Autenticacion.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    const auth = getAuth();
    const usuario = auth.currentUser;
    console.log ('usuario desde router', usuario)
    if(!usuario){
      next({path: '/'})
    }else{
      next()
    }
  } else {
    next()
  }
})

export default router
