<template>
    <h5>{{titulo}}</h5>
    <div class="row">
        <div class="col-4">
            <div class="mb-3">
                 <label class="form-label" for="">Nombre</label>
                 <input v-model='nombre' class="form-control" type="text" placeholder="ingrese nombre">
            </div>
        
            <div class="mb-3">
                <label class="form-label" for="">apellido</label>
                <input v-model='apellido' class="form-control" type="text" placeholder="ingrese apellido">
            </div>
            <div class="mb-3">
                <label class="form-label" for="">DNI</label>
                <input v-model='dni' class="form-control" type="Number" placeholder="ingrese dni">
            </div>
            <div class="mb-3">
                <input id="inp_imagen" class="form-file" type="file">
            </div>
            <button v-if="estado==0" @click="guardar_taller()" class="btn btn-info">guardar</button>
            <button v-if="estado==1" @click="actualizar_taller()" class="btn btn-primary ms-1" >Actualizar</button>
         </div>
         <div class="col-8">
             <table class="table">
                 <thead>
                     <tr>
                         <th>img</th>
                         <th>nombre</th>
                         <th>apellido</th>
                         <th>DNI</th>
                         <th>accion</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="taller of lista_talleres" v-bind:key="taller.id">
                         <td>
                             <img style="width:6rem" :src="taller.url" alt="">
                         </td>
                         <td>{{taller.nombre}}</td>
                         <td>{{taller.apellido}}</td>
                         <td>{{taller.dni}}</td>
                         <td>
                             <button @click="eliminar_taller(taller.id)" class="btn btn-danger btn-sm">x</button>
                             <button @click="editar_taller(taller)" class="btn btn-primary btn-sm ms-1" >Edit</button>
                         </td>
                     </tr>
                 </tbody>
             </table>
         </div>
    </div>

</template>

<script>
import{db,storage} from '../utils/firebase.js'
import { addDoc,collection, onSnapshot, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'

export default {
    name:'TallerForm',
    data(){
        return{
            titulo:'CRUD con vue y firebase',
            nombre:'',
            apellido:'',
            dni:null,
            lista_talleres:[],
            id: null,
            estado:0,
            url: null
        }
    },
    methods:{
        async subir_imagen (){
            const file = document.getElementById("inp_imagen").files[0]
            // indicar o hacer referencia en que sitio del storage vamos a guaradr
            const referencia = ref(storage, 'taller/'+ file.name)

            await uploadBytes (referencia,file).then( () => {
                alert('operacion exitosa!')
            })
            
           this.url = await getDownloadURL(referencia)

        },
        async guardar_taller (){
            await this.subir_imagen()
            const objeto = {
                nombre: this.nombre,
                apellido: this.apellido,
                dni: this.dni,
                url:this.url
            }
            const coleccion = collection(db,'taller')
            addDoc(coleccion,objeto)
            //despues de guaradr vaciamos los atributos
            this.nombre= '';
            this.apellido= '';
            this.dni= null;

        },
        obtener_talleres(){
            onSnapshot (collection(db, 'taller') , (snapshot) => {
                this.lista_talleres = []
                snapshot.docs.map ((doc) =>{
                    this.lista_talleres.push({ ...doc.data(), id:doc.id })
                })
            })
        },
        eliminar_taller (id){
            deleteDoc(doc(db, 'taller',id))
        },
        editar_taller(taller){
            this.nombre = taller.nombre
            this.apellido = taller.apellido
            this.dni = taller.dni
            this.id = taller.id
            this.estado = 1;
        },
        async actualizar_taller (){
            await this.subir_imagen()
            //conformamos el objeto con los datos modificados, a enviar.
            const tallerActualizado = {
                nombre: this.nombre,
                apellido: this.apellido,
                dni: this.dni
            }
            /*para actualizar el documento tenemos que especificar la base de datos 
            a la coleccion que pertenece
            y el id del documento a modificar*/
            updateDoc(doc(db, 'taller', this.id),tallerActualizado)
            this.estado = 0
        }
    },
    mounted(){
        this.obtener_talleres()
    }
}
</script>