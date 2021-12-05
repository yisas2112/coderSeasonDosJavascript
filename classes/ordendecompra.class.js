
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
    //Modal de compra finalizada con su respectivo orden de compra
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
          <a class="btn btn-primary" href="./index.html">Seguir Comprando</a> 
          </div>
        </div>
      </div>
    </div>    
    `
      return html
    }
    
}