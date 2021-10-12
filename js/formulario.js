let produtosElegidos =  JSON.parse(localStorage.getItem('carrito'))
console.log(produtosElegidos)


class Persona{
    constructor(nombreCompleto, email, domicilio, numDomi, localidad, codigoPostal, productos){
        this.nombreCompleto = nombreCompleto;
        this.email = email;
        this.domicilio = domicilio;
        this.numDomi = numDomi;
        this.Localidad = localidad;
        this.codigoPostal = codigoPostal
        this.productos = [productos]
    }

    OrdenDeCompra(nombreCompleto, email,domicilio,numDomi,localidad, productos){
        
    }
}




let form = document.getElementById('formulario')

form.addEventListener('submit', function(event){
    event.preventDefault();
    let formData = new FormData(form)    
    
    let prueba = new Persona(formData.get('nombre_apellido'),formData.get('mail'),formData.get('domicilio'),formData.get('numero'),formData.get('localidad'), formData.get('codigoPostal'), JSON.parse(localStorage.getItem('carrito')) )

    console.log(prueba)

     
})




