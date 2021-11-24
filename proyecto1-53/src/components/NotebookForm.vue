<template>
<h3>Notebook</h3>
    <div class="row">
        <div class="col-4">
            <div class="mb-3">
                <label class="form-label" for="">marca</label>
                <input v-model="marca" class="form-control" type="text" placeholder="ingrese marca">
            </div>
            <div class="mb-3">
                <label class="form-label" for="">procesador</label>
                <input v-model="procesador" class="form-control" type="text" placeholder="ingrese procesador">
            </div>
                <div class="mb-3">
                <label class="form-label" for="">ram</label>
                <input v-model="ram" class="form-control" type="text" placeholder="ingrese ram">
            </div>
            <div class="mb-3">
                <label class="form-label" for="">ssd</label>
                <input v-model="ssd" class="form-control" type="text" placeholder="ingrese ssd">
            </div>
            <div class="mb-3">
                <label class="form-label" for="">precio</label>
                <input v-model="precio" class="form-control" type="number" placeholder="ingrese precio">
            </div>
            <button v-if="estado==0" @click="guardar_notebook()" class="btn btn-primary">mostrar</button>
            <button v-if="estado==1" @click="actualizar_notebook()" class="btn btn-primary ms-1" >Actualizar</button>
        </div>
        <div class="col-8">
        <table class="table">
                 <thead>
                     <tr>
                         <th>marca</th>
                         <th>procesador</th>
                         <th>ram</th>
                         <th>ssd</th>
                         <th>precio</th>
                         <th>accion</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="notebook of lista_notebook" v-bind:key="notebook.id">
                         <td>{{notebook.marca}}</td>
                         <td>{{notebook.procesador}}</td>
                         <td>{{notebook.ram}}</td>
                         <td>{{notebook.ssd}}</td>
                         <td>{{notebook.precio}}</td>
                         <td>
                             <button @click="eliminar_notebook(notebook.id)" class="btn btn-danger btn-sm">x</button>
                             <button @click="editar_notebook(notebook)" class="btn btn-primary btn-sm ms-1" >Edit</button>
                         </td>
                     </tr>
                 </tbody>
        </table>
        </div>
    </div>
</template>
<script>
import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc} from '@firebase/firestore'
import {db} from '../utils/firebase.js'
export default {
    name:'NotebookForm',
    data (){
        return{
            marca: '',
            procesador: '',
            ram: '',
            ssd: '',
            precio: '',
            estado: 0,
            lista_notebook: []
        }

    },
    methods:{
        guardar_notebook(){
            const objeto = {
                marca : this.marca,
                procesador : this.procesador,
                ram : this.ram,
                ssd : this.ssd,
                precio : this.precio

            }
            const coleccion = collection (db, 'notebook')
            addDoc(coleccion,objeto)
            this.marca = '',
            this.procesador = '',
            this.ram = '',
            this.ssd = '',
            this.precio = ''
        },
        obtener_notebook (){
            onSnapshot(collection(db , 'notebook') , (snapshot) =>{
                this.lista_notebook = []
                snapshot.docs.map ((doc) => {
                    this.lista_notebook.push ({...doc.data(), id:doc.id})
                })
            })
        },
           eliminar_notebook (id){
            deleteDoc(doc(db, 'notebook',id))
        },
        editar_notebook(notebook){
            this.marca = notebook.marca
            this.procesador = notebook.procesador
            this.ram = notebook.ram
            this.precio = notebook.precio
            this.id = notebook.id
            this.estado = 1;
        },
        actualizar_notebook (){
            const notebookActualizado = {
                marca: this.marca,
                procesador: this.procesador,
                ram: this.ram,
                precio: this.precio
               
            }
            this.marca = '',
            this.procesador = '',
            this.ram = '',
            this.ssd = '',
            this.precio = ''
         
            updateDoc(doc(db, 'notebook', this.id),notebookActualizado)
            this.estado = 0
        }
    },
    mounted () {
        this.obtener_notebook()
    }
    
    
}
</script>