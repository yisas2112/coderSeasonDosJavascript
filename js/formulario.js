//Recuperamos del LocalStorage los productos del carrito y las ordenes de commpra
let produtosElegidos =  JSON.parse(localStorage.getItem('carrito'))
let ordenDeCompra =  JSON.parse(localStorage.getItem('ordencompra'))



let numOrder = 1000
let ordenDeCompraLocal = []
let compraFinal

//Obtenemos los datos del form
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


//Función que dispara el método de la clase Orden de Compra
const compraFinalizada=()=>{
    let modal = document.getElementById('idModalCompra')
    let principal = document.createElement('div')

    principal.innerHTML = compraFinal.ordenDeCompra()
    
    modal.append(principal)
    let myModal = new bootstrap.Modal(document.getElementById("modalCompra"), {});
    myModal.show();
}      

