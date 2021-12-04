let produtosElegidos =  JSON.parse(localStorage.getItem('carrito'))
let ordenDeCompra =  JSON.parse(localStorage.getItem('ordencompra'))

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
    ordenDeCompra(){
      let html = ''
      html = `
      <div class="modal fade"  id="modalCompra" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Orden de Compra N° ${this.numOrden}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          Gracias ${this.nombreCompleto} por la compra!
          </br>
          A la brevedad nos comunicaremos con vos para finalizar la compra 
          </div>
          <div class="modal-footer">
          <a class="btn btn-primary" href="./index.html">Ir a Carrito</a> 
          </div>
        </div>
      </div>
    </div>    
    `
      return html
    }
    
}


let numOrder = 1000
let ordenDeCompraLocal = []

let compraFinal

let form = document.getElementById('formulario')
form.addEventListener('submit', function(event){
    event.preventDefault();
    let formData = new FormData(form)    

    if(ordenDeCompra == null){
        compraFinal = new OrdenCompra(formData.get('nombre_apellido'),formData.get('mail'),formData.get('domicilio'),formData.get('numero'),formData.get('localidad'), formData.get('codigoPostal'), produtosElegidos, numOrder )
        ordenDeCompraLocal.push(compraFinal)

    }else{        
        for(let num of ordenDeCompra){
            numOrder = num.numOrden
        }        
        numOrder++
        ordenDeCompraLocal = ordenDeCompra;
        compraFinal = new OrdenCompra(formData.get('nombre_apellido'),formData.get('mail'),formData.get('domicilio'),formData.get('numero'),formData.get('localidad'), formData.get('codigoPostal'), produtosElegidos, numOrder )
        ordenDeCompraLocal.push(compraFinal)

    }
    localStorage.setItem('ordencompra',JSON.stringify(ordenDeCompraLocal))
    localStorage.setItem('carrito',JSON.stringify([]))
    compraFinalizada() 
    
})



const compraFinalizada=()=>{
    let modal = document.getElementById('idModalCompra')
    let principal = document.createElement('div')

    principal.innerHTML = compraFinal.ordenDeCompra()
    
    modal.append(principal)
    let myModal = new bootstrap.Modal(document.getElementById("modalCompra"), {});
    myModal.show();
}      

