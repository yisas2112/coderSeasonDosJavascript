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

let prueba

let form = document.getElementById('formulario')
form.addEventListener('submit', function(event){
    event.preventDefault();
    console.log(ordenDeCompraLocal)
    console.log(ordenDeCompra)
    let formData = new FormData(form)    

    if(ordenDeCompra == null){
        console.log('No existe')        
        prueba = new OrdenCompra(formData.get('nombre_apellido'),formData.get('mail'),formData.get('domicilio'),formData.get('numero'),formData.get('localidad'), formData.get('codigoPostal'), produtosElegidos, numOrder )
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
        prueba = new OrdenCompra(formData.get('nombre_apellido'),formData.get('mail'),formData.get('domicilio'),formData.get('numero'),formData.get('localidad'), formData.get('codigoPostal'), produtosElegidos, numOrder )
        console.log(prueba)    
        ordenDeCompraLocal.push(prueba)
        console.log(ordenDeCompraLocal)
    }
    localStorage.setItem('ordencompra',JSON.stringify(ordenDeCompraLocal))
    localStorage.setItem('carrito',JSON.stringify([]))
     
})


function compraFinalizada(){     
    console.log('asd')
    let modal = document.getElementById('idModalCompra')
    let principal = document.createElement('div')
    console.log(prueba)
    principal.innerHTML = `
    <div class="modal fade"  id="modalCompra" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Bienvenido a Ecommerce los Ebrios</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ¿Sos Mayor de 18?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Si</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
        </div>
      </div>
    </div>
  </div>
    
    `
    modal.append(principal)
    let myModal = new bootstrap.Modal(document.getElementById("modalCompra"), {});
    myModal.show();
}      

