const db = firebase.firestore ()
const guardar_cliente = () => {

    const unCliente ={
        nombre:'juan',
        apellido:'perez',
        dni:37589632
    }

    db.collection('cliente').doc().set(unCliente)


}

const boton = document.getElementById("btn_guardar")
boton.addEventListener("click", guardar_cliente)