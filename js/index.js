
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
            <button href="#" class="card-link" onclick={addProduct(${produ.id},${produ.stock})}>+</button>
            <div id="contadorProduct-${produ.id}">${contador}</div>
            <button href="#" class="card-link" onclick={restarProduct(${produ.id})}>-</button>   
            <button onclick=agregarCarrito(${produ.id},${contador})>Agregar Carrito</button>         
            </div>
        </div>    
    `;

    contenedor.appendChild(principal)   

    
}


// let divContador = document.querySelector(`#contadorProduct-${2}`);

let id;
const addProduct = (valor, valorStock)=>{             
    console.log(valorStock)
    console.log(valor)
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

const restarProduct = (valor)=>{
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



class Producto{
    constructor(id,categoria, nombre, marca, precio, stock){
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.stock = stock
    }

    agregarCarrito(id, contador){
        return `Agregar al carrito: ${contador} del producto id: ${id}`;
    }
}



