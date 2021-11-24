import {initializeApp} from 'firebase/app' 
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA_ERTqqMZBi9rSQHQn9GVbz8DQuu0wzGc",
    authDomain: "yoellagos-cet30.firebaseapp.com",
    projectId: "yoellagos-cet30",
    storageBucket: "yoellagos-cet30.appspot.com",
    messagingSenderId: "1042107726248",
    appId: "1:1042107726248:web:7581f11f9134320451459d",
    measurementId: "G-PECDE00JYW"
  };
//estamos ejecutando la funcion encargada de inicializar la conexion de firebase
//la inicializacion va primero que firestore siempre
  const app = initializeApp(firebaseConfig)
//conexion con nuestra base de datos firestores
  const db = getFirestore()
  const storage = getStorage (app)
  const auth = getAuth()
//debe es un puente para que pasen datos
  export {db, storage, auth}