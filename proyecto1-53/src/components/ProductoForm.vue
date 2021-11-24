<template>
<h3>mercado</h3>
    <div class="row">
        <div class="col-4">
            <div class="mb-3">
                <label class="form-label" for="">Descripcion</label>
                <input v-model="descripcion" class="form-control" type="text" placeholder="ingrese descripcion">
            </div>
            <div class="mb-3">
                <label class="form-label" for="">Precio venta</label>
                <input v-model="precio_venta" class="form-control" type="text" placeholder="ingrese precio de venta">
            </div>
            <div class="mb-3">
                <label class="form-label" for="">Precio de compra</label>
                <input v-model="precio_compra" class="form-control" type="text" placeholder="ingrese precio de compra">
            </div>
            <div class="mb-3">
                <label class="form-label" for="">stock</label>
                <input v-model="stock" class="form-control" type="text" placeholder="ingrese stock">
            </div>
            <button @click="mostrar()" class="btn btn-info">mostrar</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'ProductoForm',
    data (){
        return{
        descripcion:'',
        precio_venta:'',
        precio_compra:'',
        stock:''
        }
    },
     methods:{
        mostrar(){
            console.log(`
            descripcion:${this.descripcion}
            precio de venta:${this.precio_venta}
            precio de compra:${this.precio_compra}
            stock:${this.stock}
            `)
        }
    }
}
</script>