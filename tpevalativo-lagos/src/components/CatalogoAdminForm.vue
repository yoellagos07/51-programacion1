<template>
    <h3>catalogo</h3>
    <div class="row">
        <div class="col-4">
            <div class="mb-3">
                <label class="form-label" for="">descripcion</label>
                <input v-model="descripcion" class="form-control" type="text" placeholder="ingrese descripcion">
            </div>
            <div class="mb-3">
                <label class="form-label" for="">precio</label>
                <input v-model="precio" class="form-control" type="number" placeholder="ingrese precio">
            </div>
            <div class="mb-3">
                <label class="form-label" for="">porcentaje de descuento</label>
                <input v-model="porcentaje" class="form-control" type="text" placeholder="ingrese porcentaje de descuento">
            </div>
            <div class="mb-3">
                <label class="form-label" for="">categoria</label>
                <input v-model="categoria" class="form-control" type="text" placeholder="ingrese categoria">
            </div>
            <div class="mb-3">
                <label class="form-label" for="">stock</label>
                <input v-model="stock" class="form-control" type="text" placeholder="ingrese stock">
            </div>
            <div class="mb-3">
                <select v-model="estado" class="form-select" aria-label="Default select example">
                <option value="1">inactivo</option>
                <option value="2">activo</option>
                </select>
            </div>
              <div class="mb-3">
                <input id="inp_imagen" class="form-file" type="file">
            </div>
            <button v-if="estado_boton==0" @click="guardar_catalogo()" class="btn btn-success" >mostrar</button>
            <button v-if="estado_boton==1" @click="actualizar_catalogo()" class="btn btn-success ms-1" >actualizar</button>

        </div>
        <div class="col-8">
            <table class="table">
                 <thead>
                     <tr>
                         <th>img</th>
                         <th>descripcion</th>
                         <th>precio</th>
                         <th>%descuento</th>
                         <th>categoria</th>
                         <th>stock</th>
                         <th>accion</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="catalogo of lista_catalogo" v-bind:key="catalogo.id">
                          <td>
                             <img style="width:6rem" :src="catalogo.url" alt="">
                         </td>
                         <td>{{catalogo.descripcion}}</td>
                         <td>{{catalogo.precio}}</td>
                         <td>{{catalogo.porcentaje}}</td>
                         <td>{{catalogo.categoria}}</td>
                         <td>{{catalogo.stock}}</td>
                         <td>
                             <button @click="eliminar_catalogo(catalogo.id)" class="btn btn-danger btn-sm">x</button>
                             <button @click="editar_catalogo(catalogo)" class="btn btn-primary btn-sm ms-1" >Edit</button>
                         </td>
                     </tr>

                 </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { addDoc, collection,onSnapshot, deleteDoc, doc, updateDoc} from '@firebase/firestore'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import {db, storage} from '../utils/firebase.js'
export default {
    name:'CatalogoAdminForm',
    data (){
        return{
            descripcion:'',
            precio:'',
            porcentaje: '',
            categoria:'',
            stock:'',
            estado:1,
            lista_catalogo:[],
            estado_boton:0,
            url:null,
            

        }
    },
    methods:{
         async subir_imagen (){
            const file = document.getElementById("inp_imagen").files[0]
            // indicar o hacer referencia en que sitio del storage vamos a guaradr
            const almacenamiento = ref(storage, 'catalogo/'+ file.name)

            await uploadBytes (almacenamiento,file).then( () => {
                alert('operacion exitosa!')
            })
            
           this.url = await getDownloadURL(almacenamiento)
         },
        async guardar_catalogo(){
            await this.subir_imagen()
            const objeto = {
                descripcion : this.descripcion,
                precio : this.precio,
                porcentaje:this.porcentaje,
                categoria:this.categoria,
                stock:this.stock,
                url:this.url
                }
            const coleccion = collection (db, 'catalogo')
            addDoc(coleccion,objeto)
            this.descripcion = '',
            this.precio = '',
            this.porcentaje = '',
            this.categoria = '',
            this.stock = '',
            document.getElementById("inp_imagen").value=''
        },
         obtener_catalogo (){
            onSnapshot(collection(db , 'catalogo') , (snapshot) =>{
                this.lista_catalogo = []
                snapshot.docs.map ((doc) => {
                    this.lista_catalogo.push ({...doc.data(), id:doc.id})
                })
            })
        },
        eliminar_catalogo(id){
             deleteDoc(doc(db, 'catalogo',id))
        },
        editar_catalogo(catalogo){
            this.descripcion = catalogo.descripcion
            this.precio = catalogo.precio
            this.porcentaje = catalogo.porcentaje
            this.categoria = catalogo.categoria
            this.stock = catalogo.stock
            this.id = catalogo.id
            this.estado = 1;
            this.estado_boton = 1;
            
        },
        async actualizar_catalogo (){
            await this.subir_imagen()
            const catalogoActualizado = {
                descripcion: this.descripcion,
                precio: this.precio,
                porcentaje: this.porcentaje,
                categoria: this.categoria,
                stock:this.stock,
                url:this.url
            }
            this.descripcion = '',
            this.precio = '',
            this.porcentaje = '',
            this.categoria = '',
            this.stock = ''
            document.getElementById("inp_imagen").value=''

            updateDoc(doc(db, 'catalogo', this.id),catalogoActualizado)
            this.estado_boton = 0
        }
    },
     mounted () {
        this.obtener_catalogo()
    }

}
</script>