document.addEventListener("DOMContentLoaded", function() {
    /*Validación de Edad del cliente*/
    let edadLocal =  localStorage.getItem('edad');            
    if(edadLocal == null || edadLocal == 'null'){           
        preguntarEdad()
    }else if( edadLocal == 'true'){        
        esMayor()        
    }
   
    //Recuperamos los datos del carrito del localStorage
    if(localStorage.getItem('carrito') !== null){
        localStorageInCarrito()
    }
});


function preguntarEdad(){    
    let myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {});
    document.onreadystatechange = function () {
    myModal.show();
    };
        
}

function productoAgregado(){     
    let myModal = new bootstrap.Modal(document.getElementById("productoAgregado"), {});
    myModal.show();
}                    

let contenedor = document.getElementById('main');
function esMenor(){    
    edadLocal = null
    localStorage.setItem('edad', edadLocal);
    let principal = document.createElement('div');    
    principal.innerHTML = `<h1>Para poder ingresar a la página debe ser mayor de Edad</h1>`
    
    contenedor.appendChild(principal) 
}


let contador = 0  
let stockmax = 20;
function esMayor(){
    edadLocal = true
    localStorage.setItem('edad', edadLocal);
    for(const produ of productos){        
        let principal = document.createElement('div');
        $(principal).addClass( "card__products" );
        $(principal).addClass( "col-3" );
        $(principal).addClass( "text-center");
        
        principal.innerHTML = `
        <div class="card" style="width: 18rem;">
                <img src=${produ.img} class="card-img-top" alt="...">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${produ.nombre}</h5>
                    <p class="card-text"><b>Marca</b>: ${produ.marca}</p>
                    <p class="card-text"> $${produ.precio}</p>
                </div>
                <ul class="list-group list-group-flush">                            
                    <li class="list-group-item">Categoria: ${produ.categoria}</li>
                </ul>
                <div class="card-body">  
                    <div class="d-flex justify-content-center mb-2">
                        <button href="#" class="btn btn-info" disable onclick={sumarContador(${produ.id},${produ.stock})}>+</button>
                        <span class="my-auto mx-3" id="contadorProduct-${produ.id}">${contador}</span>
                        <button href="#" class="btn btn-info" onclick={restarContador(${produ.id})}>-</button>   
                    </div>                              
                    <button data-bs-target="#exampleModal" class="btn btn-info mt-1" disable=${contador = 0} onclick="agregarCarrito(${produ.id})">Agregar Carrito</button>         
                </div>
        </div>    
        `;
        contenedor.appendChild(principal)   
    }
}



/*CONTADORES*/ 
/*  Los contadores nunca van a sumar por encima del stock actual ni restar en negativo */
let id;
const sumarContador = (valor, valorStock)=>{                     
    if(id === valor && contador < valorStock ){        
        console.log('es igual')              
        contador++;
        console.log(contador)
        let getClass = document.querySelector(`#contadorProduct-${valor}`);
        getClass.innerHTML= `${contador}`;                
        
    }else if(id !== valor && contador < valorStock){        
        contador= 0         
        console.log('No es igual')        
        contador++;            
        console.log(contador)
        let getClass = document.querySelector(`#contadorProduct-${valor}`);
        getClass.innerHTML= `${contador}`;        
        id = valor;
    }
    
}

/* Boton de Restar Contador de cada car*/ 
const restarContador = (valor)=>{
    if(id === valor && contador > 0){
        console.log('es igual')              
        contador--;
        let getClass = document.querySelector(`#contadorProduct-${valor}`);
        getClass.innerHTML= `${contador}`;                
        
    }else if(id !== valor && contador >0 ){        
        contador= 0 
        console.log('No es igual')
        contador--;            
        let getClass = document.querySelector(`#contadorProduct-${valor}`);
        getClass.innerHTML= `${contador}`;        
        id = valor;
    }
    
}


/*Este array es donde se crean los objetos de productos*/
let producto = []
let confirma = false
/*Y este array es el de los productos que están en el carrito*/
let carrito = [];

const agregarCarrito = (id)=>{    
    /* Existe producto se inicializa en false */
    let existeProducto = false;       
    
    /*Se recorre el carrito para ver si el producto que se quiere agregar ya existe.
    Si existe le variable existe producto la vuelve a true*/
    carrito.forEach((e)=>{        
        if(id === e.id){
            existeProducto = true;
            
        }
    })    

    /*En este paso se recorre el array de productos para machear el id de los productos que se muestran en pantalla.
    Además si el producto ya existe en el carrito se le pregunta al usuario si desea actualizar la cantidad*/ 
    for(const produ of productos){                  
        if(id == produ.id && existeProducto == false && contador > 0) {  
            productoAgregado()              
            producto = new Producto(produ.id, produ.categoria, produ.nombre, produ.marca, produ.precio, produ.stock, contador, produ.img, total = contador * produ.precio);            
            
        }else if(id == produ.id && existeProducto == true && contador >0) {                            
            productoExistente()                     
            if(confirma == true){   
                console.log('cofirma actualización')             
                producto = new Producto(produ.id, produ.categoria, produ.nombre, produ.marca, produ.precio, produ.stock, contador, produ.img, total = contador * produ.precio);                
                for(let i = 0; i < carrito.length; i++){                                        
                    if(carrito[i].id == id){
                        carrito[i] = producto
                    }
                    
                }
            }
        }
        
    } 
    /*Este paso reestablece todos los contadores a 0*/
    productos.map((e)=>{
        let getClass = document.querySelector(`#contadorProduct-${e.id}`);
        getClass.innerHTML= `${contador = 0}`;    
    })    
    
    console.log(carrito)
    localSto();
    let verLocal = JSON.parse(localStorage.getItem('carrito'));
    console.log(verLocal)
    
}


class Producto{
    constructor(id,categoria, nombre, marca, precio, stock, cantidad,img, total){
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.stock = stock;
        this.cantidad = cantidad;
        this.img = img;
        this.total = total
    }
    
}

const localStorageInCarrito = ()=>{    
    let carritoLocalStorage =  JSON.parse(localStorage.getItem('carrito'));
    carrito.push(...carritoLocalStorage)
    
}

const localSto = ()=>{
    console.log(carrito)
    localStorage.setItem('carrito',JSON.stringify(carrito))
        console.log(localStorage)   
}


function productoExistente(){    
    let actualiza = true
    let noActualiza = false
    let prueba = true;

    let container = document.getElementById('pruebamodal')
    container.innerHTML = `
    <div class="modal fade"  id="productoExiste" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">El producto ya existe en el carrito</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>      
        <div class="modal-body">
        ¿Desea actualizar la cantidad?
      </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="${prueba = true}" data-bs-dismiss="modal">Si</button>
        <button type="button" class="btn btn-secondary" onclick="${prueba = false}" data-bs-dismiss="modal">No</button>
        </div>
      </div>
    </div>
  </div>
    `
    
    let myModal = new bootstrap.Modal(document.getElementById("productoExiste"), {});
    myModal.show();
}

const actualizaCarrito = (confirm)=>{    
    confirma = confirm
    console.log(typeof(confirma))
}


