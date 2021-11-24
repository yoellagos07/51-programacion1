<template>
    <div class="row">
        <div v-for="catalogo of lista_catalogo" v-bind:key="catalogo.id" class="col-3 me-1">
            <div class="card" >
            <img :src="catalogo.url" class="card-img-top" >
            <div class="card-body">
                <h5 class="card-title">{{catalogo.descripcion}}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">precio {{catalogo.precio}}</li>
                <li class="list-group-item">stock {{catalogo.stock}}</li>
            </ul>
            <div class="card-body">
             <button class="btn btn-primary"> agregar al carrito</button>
            </div>
            </div>

        </div>
    </div>
</template>
<script>
import {  collection,onSnapshot} from 'firebase/firestore'
import {db} from '../utils/firebase.js'
export default {
    name:'Catalogo.vue',
    data () {
        return{
            lista_catalogo:[]
        }
    },
    methods:{
        obtener_catalogo (){
            onSnapshot(collection(db , 'catalogo') , (snapshot) =>{
                this.lista_catalogo = []
                snapshot.docs.map ((doc) => {
                    this.lista_catalogo.push ({...doc.data(), id:doc.id})
                })
            })
        }
    },
    mounted (){
        this.obtener_catalogo()
        
    }
}
</script>