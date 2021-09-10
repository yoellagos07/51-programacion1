import Area from "./area.js"
const mostrar = () =>{
    const bi = document.getElementById('inp_bi').value
    const bs = document.getElementById('inp_bs').value
    const a = document.getElementById('inp_a').value


    const instancia = new Area(bi,bs,a)

    const respuesta = instancia.calcularAreaTrap()
    document.getElementById('resultado').textContent='respuesta=' + respuesta;
}
const boton = document.getElementById("btn_calcular")
boton:addEventListener('click', mostrar)