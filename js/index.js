
// let edad = confirm('¿Sos mayor de 18?');

let contenedor = document.getElementById('main'); 
let contador = 0  
let stockmax = 20;

for(const produ of productos){        
    let principal = document.createElement('div');
    principal.classList.add("card__products");
    principal.classList.add("col-3");
    principal.classList.add("text-center");
    
    
    principal.innerHTML = `
    <div class="card" style="width: 18rem;">
            <img src=${produ.img} class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${produ.nombre}</h5>
            <p class="card-text">Marca: ${produ.marca}</p>
            <p class="card-text"> $${produ.precio}</p>
            </div>
            <ul class="list-group list-group-flush">                            
            <li class="list-group-item">Categoria: ${produ.categoria}</li>
            </ul>
            <div class="card-body">
            <button href="#" class="card-link" onclick={sumarContador(${produ.id},${produ.stock})}>+</button>
            <div id="contadorProduct-${produ.id}">${contador}</div>
            <button href="#" class="card-link" onclick={restarContador(${produ.id})}>-</button>   
            <button onclick=agregarCarrito(${produ.id})>Agregar Carrito</button>         
            </div>
        </div>    
    `;

    contenedor.appendChild(principal)   

    
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

/*Y este array es el de los productos que están en el carrito*/
let carrito = [];

const agregarCarrito = (id)=>{    
    /* Existe producto se inicializa en false */
    let existeProducto = false;   

    /*Se cerre el carrito para ver si el producto que se quiere agregar ya existe.
    Si existe le variable existe producto la vuelve a true*/
    carrito.forEach((e)=>{        
        if(id === e.id){
            existeProducto = true;
            console.log('is true')
        }
    })    

    /*En este paso se recorre el array de productos para machear el id de los productos que se muestran en pantalla.
    Además si el producto ya existe en el carrito se le pregunta al usuario si desea actualizar la cantidad*/ 
    for(const produ of productos){                  
        if(id == produ.id && existeProducto == false) {                
            producto = new Producto(produ.id, produ.categoria, produ.nombre, produ.marca, produ.precio, produ.stock, contador);            
            carrito.push(producto)            
            console.log('no existe')            
            
        }else if(id == produ.id && existeProducto == true) {                
            console.log('ya existe')
            let confirm  = window.confirm('El producto ya existe, desea actualizar la cantidad?')
            if(confirm = true){                
                producto = new Producto(produ.id, produ.categoria, produ.nombre, produ.marca, produ.precio, produ.stock, contador);                
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
    
}


class Producto{
    constructor(id,categoria, nombre, marca, precio, stock, cantidad){
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.stock = stock;
        this.cantidad = cantidad;
    }

    Carrito(id, contador){
        return `Agregar al carrito: ${contador} del producto id: ${id}`;
    }
}



const localSto = ()=>{
    console.log(carrito)
    
    localStorage.setItem('carrito',JSON.stringify(carrito))
    console.log(localStorage)
}








