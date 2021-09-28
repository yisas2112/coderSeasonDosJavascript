let contenedor = document.getElementById('main__carrito');
let produtosElegidos =  JSON.parse(localStorage.getItem('carrito'))
console.log(produtosElegidos)





for(const produ of produtosElegidos){        
    
    let principal = document.createElement('div');
    $(principal).addClass( "card__products" );
    $(principal).addClass("col-3");
    $(principal).addClass( "text-center");
    
    
    
    principal.innerHTML = `
    <div class="card" style="width: 18rem;">
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



const EliminarProducto = (id)=>{
    console.log(id)
    console.log(produtosElegidos)
    for(const produ of produtosElegidos){
        if(produ.id == id){
            console.log(produ)
            produtosElegidos.splice(produ,1)
        }
    }
    // for(let i = 0; i < produtosElegidos.length;i++){
    //     console.log(produtosElegidos[i])    
    //     if(produtosElegidos.id = id){
    //         produtosElegidos.splice(produtosElegidos[i],1)
            
    //     }
    // }
    console.log(produtosElegidos)
}