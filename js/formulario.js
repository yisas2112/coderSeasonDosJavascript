let produtosElegidos =  JSON.parse(localStorage.getItem('carrito'))
let ordenDeCompra =  JSON.parse(localStorage.getItem('ordencompra'))

console.log(produtosElegidos)


class OrdenCompra{
    constructor(nombreCompleto, email, domicilio, numDomi, localidad, codigoPostal, productos, numOrden){
        this.nombreCompleto = nombreCompleto;
        this.email = email;
        this.domicilio = domicilio;
        this.numDomi = numDomi;
        this.Localidad = localidad;
        this.codigoPostal = codigoPostal
        this.productos = [productos]
        this.numOrden = numOrden
    }

    OrdenDeCompra(nombreCompleto, email,domicilio,numDomi,localidad, productos){
        
    }
}




let numOrder = 0
let ordenDeCompraLocal = []
let arrayVacio = []

let form = document.getElementById('formulario')
form.addEventListener('submit', function(event){
    event.preventDefault();
    let formData = new FormData(form)    

    if(ordenDeCompra == null){
        numOrder = 1
    }else{
        numOrder = ordenDeCompra.numOrden + 1
    }
    
    let prueba = new OrdenCompra(formData.get('nombre_apellido'),formData.get('mail'),formData.get('domicilio'),formData.get('numero'),formData.get('localidad'), formData.get('codigoPostal'), JSON.parse(localStorage.getItem('carrito')), numOrder )
    console.log(prueba)
    produtosElegidos.push(prueba)
    console.log(produtosElegidos)

    localStorage.setItem('ordencompra',JSON.stringify(prueba))
    localStorage.setItem('carrito',JSON.stringify(arrayVacio))
    

     
})




