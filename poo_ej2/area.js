export default class Area{
    bi;
    bs;
    a;

    constructor(bi,bs,a){
        this.bi = bi;
        this.bs = bs;
        this.a = a;

    }
    calcularAreaTrap(){
        const resultado= (( parseInt (this.bi) + parseInt (this.bs)  )/(2))*(this.a)
        return resultado;
    }

}