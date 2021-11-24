<template>
    
<nav class="navbar navbar-expand-lg navbar-light bg-danger">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">proyecto final</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
       <router-link class="nav-link active" to="/">Home</router-link> 
       <router-link class="nav-link" to="/about">About</router-link> 
        <router-link class="nav-link" to="/catalogo">Catalogo</router-link>
        <router-link class="nav-link" to="/catalogop">Catalogo publico</router-link>
      </div>
    </div>
  </div>
</nav>

<div class="container">
    <router-view/>
</div>


</template>
