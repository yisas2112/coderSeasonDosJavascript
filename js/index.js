document.addEventListener("DOMContentLoaded", function() {    
    /*Validación de Edad del cliente*/
    let edadLocal =  localStorage.getItem('edad');   
    if(edadLocal == null || edadLocal == 'null'){           
        preguntarEdad()
        //Luego de confirmar edad muestra o no el filtro de categorias
        seleccionCategoria()
    }else if( edadLocal == 'true'){ 
        //Si es mayor muestra los productos, de lo contrario no       
        esMayor()        
        seleccionCategoria()
    }
    
    //Recuperamos los datos del carrito del localStorage
    if(localStorage.getItem('carrito') !== null){
        localStorageInCarrito()
        
    }
});

//Si el carrito está vacío desactiva el botón de ir al carrito
let desactivarBtnCarrito = document.getElementById('irCarrito')
if(localStorage.getItem('carrito') == null){
    desactivarBtnCarrito.style.pointerEvents= 'none'
}


//Función que pregunta al usuario si es mayor o no
function preguntarEdad(){    
    let myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {});
    document.onreadystatechange = function () {
    myModal.show();
    };
        
}

//Funión que muestra que el producto ha sido agregado al carrito
function productoAgregado(){     
    let myModal = new bootstrap.Modal(document.getElementById("productoAgregado"), {});
    myModal.show();
}                    

let contenedor = document.getElementById('productos');
//Si al momento de confirmar edad el usuario confirma que no, muestra mensaje de que se requiere ser mayor para entrar a la página
function esMenor(){    
    let selectCategory = document.getElementById('selects');
    selectCategory.innerHTML = ''

    edadLocal = null
    localStorage.setItem('edad', edadLocal);
    let principal = document.createElement('div');
    principal.classList.add('container')    
    principal.classList.add('text-center')    
    principal.classList.add('mt-2')    
    principal.innerHTML = `<h1>Para poder ingresar a la página debe ser mayor de Edad</h1>`
    
    contenedor.appendChild(principal) 
}

//Función que muestra el filtro de categorías
const seleccionCategoria=()=>{                
    let contenedor = document.getElementById('selects');
    let principal = document.createElement('select');
    principal.classList.add('form-control')
    principal.classList.add('mt-2')
    principal.setAttribute("onchange","filtro()")         
    principal.setAttribute('id', 'selectBox')        
    contenedor.appendChild(principal)
    let newArray = []    
    for(const select of productos){        
        newArray.push(select.categoria)
    }            
    const unique = Array.from(new Set(newArray))
    for(const unico of unique){
        let contenedor = document.getElementById('selectBox');
        let principal = document.createElement('option'); 
        principal.setAttribute('value', unico)        
        principal.innerHTML += `
                                ${unico}        
        `
       contenedor.append(principal)           
    }

    let otroOption = document.createElement('option');
    otroOption.setAttribute('selected', "selected")   
    otroOption.innerHTML="Todos los Productos"
    otroOption.setAttribute('value', 'todo')    
    
    principal.appendChild(otroOption) 

}



let contador = 0  
let stockmax = 20;
//Función que muestra todos los productos
function esMayor(){
    edadLocal = true    
    localStorage.setItem('edad', edadLocal);
    for(const produ of productos){
        let principal = document.createElement('div');        
        principal.classList.add( "card__products" );
        principal.classList.add("col-lg-3");        
        principal.classList.add("col-md-3");
        principal.classList.add("col-sm-4");
        principal.classList.add("text-center");                        
        principal.innerHTML = `        
        <div class="card" style="width: 18rem;">
                <img src=${produ.img} class="card-img-top mt-2" alt="...">
                <div class="card-body d-flex flex-column">
                    <div class="container-title">
                        <h5 class="card-title">${produ.nombre}</h5>
                    </div>
                    <p class="card-text"><b>Marca</b>: ${produ.marca}</p>
                    <p class="card-text"> $${new Intl.NumberFormat("de-DE").format(produ.precio)}</p>
                </div>
                <ul class="list-group list-group-flush">                            
                    <li class="list-group-item">Categoria: ${produ.categoria}</li>
                </ul>
                <div class="card-body">  
                    <div class="d-flex justify-content-center mb-2">                        
                        <button href="#" class="btn btn-info" onclick={sumarContador(${produ.id},${produ.stock})}>+</button>
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
        contador++;        
        let getClass = document.querySelector(`#contadorProduct-${valor}`);
        getClass.innerHTML= `${contador}`;                
        
    }else if(id !== valor && contador < valorStock){        
        contador= 0                 
        contador++;                    
        let getClass = document.querySelector(`#contadorProduct-${valor}`);
        getClass.innerHTML= `${contador}`;        
        id = valor;
    }
    
}

/* Boton de Restar Contador de cada card*/ 
const restarContador = (valor)=>{
    if(id === valor && contador > 0){
        contador--;
        let getClass = document.querySelector(`#contadorProduct-${valor}`);
        getClass.innerHTML= `${contador}`;                
        
    }else if(id !== valor && contador >0 ){        
        contador= 0 
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
            producto = new Producto(produ.id, produ.categoria, produ.nombre, produ.marca, produ.precio, produ.stock, contador, produ.img, total = contador * produ.precio);            
            carrito.push(producto)
            //Los productos agregados al carrito son agregados al localStorage
            localSto();
            //Modal del producto agregaddo
            productoAgregado()              
        }else if(id == produ.id && existeProducto == true && contador >0) {                                      
            let contadorDos = contador
            //Modal que confirma si desea actualizar la cantidad del carrito
            modalConfirm(function(confirm){
                if(confirm){
                    producto = new Producto(produ.id, produ.categoria, produ.nombre, produ.marca, produ.precio, produ.stock, contadorDos, produ.img, total = contadorDos * produ.precio);                
                    for(let i = 0; i < carrito.length; i++){                                        
                        if(carrito[i].id == id){
                            carrito[i] = producto
                        }                        
                    }
                    //También se agrega los productos al LocalStorage
                    localSto();
                    
                }
            });            
        }
        
    } 
    /*Este paso reestablece todos los contadores a 0*/
    productos.map((e)=>{
        let getClass = document.querySelector(`#contadorProduct-${e.id}`);
        getClass.innerHTML= `${contador = 0}`;    
    })    
    //Habilita el botón para ir al carrito
    desactivarBtnCarrito.style.pointerEvents= 'auto'
    
}


//Función que obtiene los productos del LocalStorage
const localStorageInCarrito = ()=>{    
    let carritoLocalStorage =  JSON.parse(localStorage.getItem('carrito'));
    carrito.push(...carritoLocalStorage)
    
}

//Función que agrega los productos los productos del carrito al LocalStorage
const localSto = ()=>{
    localStorage.setItem('carrito',JSON.stringify(carrito))
        
}

//Función que activa el modal que consulta al usuario si desea actualizar la cantidad de un producto en el carrito
//Se agregó un función de Callbak que espera la confirmación del usuario
let modalConfirm = function(callback){
    let myModal = new bootstrap.Modal(document.getElementById("productoExiste"), {});
    myModal.show();
    document.getElementById('modal-btn-si').onclick = function (){
        callback(true);      
    }
    
    document.getElementById('modal-btn-no').onclick = function (){
        callback(false);      
    }
    
  };


//Función que muestra los productos que seleccionó el usuario en el select de categorias
  function filtro(){
    var data_value = document.getElementById("selectBox").value
    let contenedor = document.getElementById('productos');    
    document.getElementById('oferta').innerHTML = '';    
    
    for(const produ of productos){
        if(produ.categoria == data_value){
        let principal = document.createElement('div');        
        principal.classList.add( "card__products" );
        principal.classList.add("col-lg-3");        
        principal.classList.add("col-md-3");
        principal.classList.add("col-sm-4");        
        principal.classList.add("text-center");                        
        principal.innerHTML = `        
        <div class="card" style="width: 18rem;">
                <img src=${produ.img} class="card-img-top mt-2" alt="...">
                <div class="card-body d-flex flex-column">
                    <div class="container-title">
                        <h5 class="card-title">${produ.nombre}</h5>
                    </div>
                    <p class="card-text"><b>Marca</b>: ${produ.marca}</p>
                    <p class="card-text"> $${new Intl.NumberFormat("de-DE").format(produ.precio)}</p>
                </div>
                <ul class="list-group list-group-flush">                            
                    <li class="list-group-item">Categoria: ${produ.categoria}</li>
                </ul>
                <div class="card-body">  
                    <div class="d-flex justify-content-center mb-2">                        
                        <button href="#" class="btn btn-info" onclick={sumarContador(${produ.id},${produ.stock})}>+</button>
                        <span class="my-auto mx-3" id="contadorProduct-${produ.id}">${contador}</span>
                        <button href="#" class="btn btn-info" onclick={restarContador(${produ.id})}>-</button>   
                    </div>                              
                    <button data-bs-target="#exampleModal" class="btn btn-info mt-1" disable=${contador = 0} onclick="agregarCarrito(${produ.id})">Agregar Carrito</button>         
                </div>
        </div>    
        `;
        contenedor.append(principal)
        }   
        
   }
   if(data_value == "todo"){
    esMayor()
    }

    offer(data_value)
}


const offer = (value)=>{    
    let productosfiltrados = []
    let prueba = document.getElementById('ModalOferta');
    if(prueba !== null){
        prueba.innerHTML = ''
    }
    for(const produ of productos){
        if(value == produ.categoria){
            productosfiltrados.push(produ)            
        }
    }
    var item = productosfiltrados[Math.floor(Math.random()*productosfiltrados.length)];    
    console.log(item.nombre)
    
    
    var data_value = document.getElementById("oferta")
    var principal = document.createElement('div')    
    principal.innerHTML = `<a href="#" onclick="idOferta(${item.id})"><div class="bbb_deals_featured">
                                <div class="container__offer">
                                    <div class="row">
                                        <div class="col d-flex flex-lg-row flex-column align-items-center justify-content-center">
                                            <!-- bbb_deals -->
                                            <div class="bbb_deals">
                                                <div class="ribbon ribbon-top-right"><span>50% OFF</span></div>
                                                <div class="bbb_deals_title">Oferta del Día</div>
                                                <div class="bbb_deals_slider_container">
                                                    <!-- bbb_deals Item -->
                                                    <div class=" bbb_deals_item">
                                                        <div class="bbb_deals_image"><img src="${item.img}" alt=""></div>
                                                        <div class="bbb_deals_content">
                                                            <div class="bbb_deals_info_line d-flex flex-row justify-content-start">
                                                                <div class="bbb_deals_item_category"><a href="#">Categoría ${item.categoria}</a></div>
                                                                
                                                            </div>
                                                            <div class="bbb_deals_info_line d-flex flex-row justify-content-start">
                                                                <div class="bbb_deals_item_name">${item.nombre}</div>
                                                                <br>
                                                                <div class="bbb_deals_item_price ml-auto">  <del>$${item.precio}</del>$${item.precio /2}</div>
                                                            </div>                                
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> <!-- Featured -->
                                        </div>
                                    </div>
                                </div>
                            </div></a>`
    
    data_value.append(principal)    
    setTimeout(()=>{
        data_value.innerHTML = ''
    },9000)
    
    


}


const idOferta=(id)=>{    
    let container = document.getElementById('ModalOferta');
    let principal = document.createElement('div')
    let addOfer;
    let contador = 0
    console.log(addOfer)
    for(const produ of productos){
        
        if(produ.id == id){

            addOfer = produ
        }
    }
    console.log(addOfer)
    principal.innerHTML = `    
        <!-- Modal: modalQuickView -->
        <div class="modal fade" id="modalQuickView" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-5">
                        <!--Carousel Wrapper-->
                        <div id="carousel-thumb" class="carousel slide carousel-fade carousel-thumbnails"
                            data-ride="carousel">
                            <!--Slides-->
                            <div class="carousel-inner" role="listbox">
                                <div class="carousel-item active">
                                    <img class="d-block w-100"
                                    src="${addOfer.img}"
                                    alt="First slide">
                                </div>
                                
                            </div>                        
                        </div>                    
                        </div>
                        <div class="col-lg-7">
                        <h2 class="h2-responsive product-name">
                            <strong>${addOfer.nombre}</strong>
                        </h2>
                        <h4 class="h4-responsive">
                            <span class="green-text">
                            <div class="bbb_deals_item_price ml-auto">  <del>$${addOfer.precio}</del>$${addOfer.precio = addOfer.precio /2}</div>
                            </span>                            
                        </h4>
                        <!-- Add to Cart -->
                        <div class="card-body text-lg-start text-md-center text-sm-center text-center">                        
                            <div class="mb-3">        
                            <button href="#" class="btn btn-info" onclick={sumarContador(${addOfer.id},${addOfer.stock})}>+</button>
                            <span class="my-auto mx-3" id="contadorProduct-${addOfer.id}">${contador}</span>
                            <button href="#" class="btn btn-info" onclick={restarContador(${addOfer.id})}>-</button>                               
                            </div>
                            <button data-bs-target="#exampleModal" class="btn btn-info mt-1" disable=${contador = 0} onclick="agregarCarrito(${addOfer.id})">Agregar Carrito</button>         
                        </div>
                        <!-- /.Add to Cart -->
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
            `
    container.append(principal)

    let myModal = new bootstrap.Modal(document.getElementById("modalQuickView"), {});
    myModal.show();
}