let contenedor = document.getElementById('main__carrito');
let produtosElegidos =  JSON.parse(localStorage.getItem('carrito'))
console.log(produtosElegidos)

produtosElegidos.length > 0 ? mostrarProductos() : CarritoVacio()

function mostrarProductos(){
        for(const produ of produtosElegidos){        
            console.log(produ.length)
            
            let principal = document.createElement('div');
            $(principal).addClass( "card__products" );
            $(principal).addClass("col-3");
            $(principal).addClass( "text-center");
            
            
                principal.innerHTML = `
                <div id=${produ.id} class="card" style="width: 18rem;">
                        <img src='${produ.img}' class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${produ.nombre}</h5>
                            <p class="card-text">Marca: ${produ.marca}</p>
                            <p class="card-text"> $${produ.precio}</p>
                            <p class="card-text"> Cantidad: ${produ.cantidad}</p>
                        </div>
                        <ul class="list-group list-group-flush">                            
                            <li class="list-group-item">Total: $${produ.total}</li>
                        </ul>
                        <div class="card-body">                
                                <button href="#" class="card-link" onclick={EliminarProducto(${produ.id})}>Eliminar Producto</button>
                        </div>            
                </div>    
                `;
            contenedor.appendChild(principal)   
        }
}

function CarritoVacio (){
    let principal = document.createElement('div');
            $(principal).addClass( "card__products" );
            $(principal).addClass("col-3");
            $(principal).addClass( "text-center");

    principal.innerHTML = `<h1>Para poder ingresar a la página debe ser mayor de Edad</h1>`;

    contenedor.appendChild(principal)  
}



const EliminarProducto = (id)=>{
    console.log(id)
    console.log(produtosElegidos) 
    for(let i = 0; i < produtosElegidos.length; i++){
        if(produtosElegidos[i].id == id ){
            produtosElegidos.splice(i, 1);
        }
    }    
    document.getElementById(id).remove()
    localStorage.setItem('carrito',JSON.stringify(produtosElegidos))
    
}

