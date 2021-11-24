<template>
    <div class="row justify-content-md-center">
        <div class="col-md-auto">
            <div class="mb-3 text-center">
                <h4>ingreso al sistema</h4>
            </div>
        <div class="mb-3">
            <label class="form-label">correo electronico</label>
            <input v-model="correo" class="form-control" type="email">
        </div>
        <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input v-model="password" class="form-control" type="password">
        </div>
        <button @click="registrar_usuario()" class="btn btn-success">registrar</button>
        <button @click="iniciar_sesion()" class="btn btn-primary" >iniciar sesion</button>
        </div>
        
    </div>  
    
</template>

<script>
import {auth} from '@/utils/firebase.js'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
export default {
    name:'AutenticacionForm',
    data () {
        return{
            correo:'',
            password:''

        }
    },
    methods:{
        vaciar(){
            this.correo = '',
            this.password = ''
        },
        async registrar_usuario(){
            try{
            await createUserWithEmailAndPassword(auth, this.correo, this.password)
            this.vaciar(
                
            )
            } catch (error){
                alert('error al crear usuario')
            }
        },
        async iniciar_sesion(){
        try {
        await signInWithEmailAndPassword(auth,this.correo,this.password)
        alert('se inicio sesion')
        this.$router.push('taller')
        } catch (error){
            alert ('algo sucedio')
      }
     }
    }
}
</script>