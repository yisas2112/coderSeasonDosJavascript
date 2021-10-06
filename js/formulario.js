let produtosElegidos =  JSON.parse(localStorage.getItem('carrito'))



class Persona{
    constructor(nombreCompleto, email, domicilio, numDomi, localidad, partido, productos){
        this.nombreCompleto = nombreCompleto;
        this.email = email;
        this.domicilio = domicilio;
        this.numDomi = numDomi;
        this.Localidad = localidad;
        this.partido = partido;
        this.productos = [productos]
    }

    OrdenDeCompra(nombreCompleto, email,domicilio,numDomi,localidad,partido, productos){
        
    }
}