let produtosElegidos =  JSON.parse(localStorage.getItem('carrito'))
let ordenDeCompra =  JSON.parse(localStorage.getItem('ordencompra'))

console.log(produtosElegidos)
console.log(ordenDeCompra)



class OrdenCompra{
    constructor(nombreCompleto, email, domicilio, numDomi, localidad, codigoPostal, productos, numOrden){
        this.nombreCompleto = nombreCompleto;
        this.email = email;
        this.domicilio = domicilio;
        this.numDomi = numDomi;
        this.Localidad = localidad;
        this.codigoPostal = codigoPostal;
        this.productos = productos;
        this.numOrden = numOrden;
    }

    OrdenDeCompra(nombreCompleto, email,domicilio,numDomi,localidad, productos){
        
    }
}




let numOrder = 1000
let ordenDeCompraLocal = []



let form = document.getElementById('formulario')
form.addEventListener('submit', function(event){
    event.preventDefault();
    console.log(ordenDeCompraLocal)
    console.log(ordenDeCompra)
    let formData = new FormData(form)    

    if(ordenDeCompra == null){
        console.log('No existe')        
        let prueba = new OrdenCompra(formData.get('nombre_apellido'),formData.get('mail'),formData.get('domicilio'),formData.get('numero'),formData.get('localidad'), formData.get('codigoPostal'), produtosElegidos, numOrder )
        console.log(prueba)    
        ordenDeCompraLocal.push(prueba)
        console.log(produtosElegidos)
    }else{        
        console.log('existe')
        for(let num of ordenDeCompra){
            numOrder = num.numOrden
        }
        
        numOrder++
        console.log(ordenDeCompraLocal)
        ordenDeCompraLocal = ordenDeCompra;
        console.log(ordenDeCompraLocal)
        let prueba = new OrdenCompra(formData.get('nombre_apellido'),formData.get('mail'),formData.get('domicilio'),formData.get('numero'),formData.get('localidad'), formData.get('codigoPostal'), produtosElegidos, numOrder )
        console.log(prueba)    
        ordenDeCompraLocal.push(prueba)
        console.log(ordenDeCompraLocal)
    }
    


    

    localStorage.setItem('ordencompra',JSON.stringify(ordenDeCompraLocal))
    localStorage.setItem('carrito',JSON.stringify([]))
    

     
})




