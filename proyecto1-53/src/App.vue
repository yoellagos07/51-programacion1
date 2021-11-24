<template>

<nav class="navbar navbar-expand-lg navbar-light bg-danger">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">VUE proyecto 1</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
       <router-link class="nav-link active" to="/">Home</router-link> 
       <router-link class="nav-link" to="/about">About</router-link> 
        <router-link v-if="usuario?.email !=null" class="nav-link" to="/taller">Mi taller preferido</router-link>
        <router-link v-if="usuario?.email !=null" class="nav-link" to="/producto">mercado</router-link>
        <router-link v-if="usuario?.email !=null" class="nav-link" to="/notebook">notebook</router-link>
      </div>
      <div class="navbar-nav ms-auto">
        <h6 class="nav-link">{{usuario?.email}}</h6>
        <!-- se va a mostarr el munu iniciar sesion solo cuando emails sea igual a nulo--> 
       <router-link v-if="usuario?.email == null" class="nav-link" to="/autenticacion">iniciar sesion</router-link>
       <button @click="cerrar_sesion()" v-if="usuario?.email !=null" class="btn btn-secondary btn-sm">cerrar sesion</button>
      </div>
    </div>
  </div>
</nav>

  <div class="container  mt-3">
    <router-view/>
  </div>
  
</template>

<script>
import {auth} from '@/utils/firebase.js'
import { signOut,onAuthStateChanged} from 'firebase/auth'
export default {
  data(){
  return{
    usuario:null

  }
  },
methods:{
  usuario_logueado(){
    onAuthStateChanged(auth, (user) => {
      this.usuario = user;
    })
  },
  cerrar_sesion(){
    try{
      signOut(auth)
      this.$router.push('/')
    } catch (error) {
        alert('algo sucedio')
    }
  },
},
mounted(){
  this.usuario_logueado()
}
}

</script>