let contenedor = document.getElementById('main__carrito');
let productosLocalStorage =  JSON.parse(localStorage.getItem('carrito'))


let produtosElegidos = productosLocalStorage.filter(function(e){
    return !e.precioTotal
})



let totalComp = {
    precioTotal: 0
} 



produtosElegidos.length > 0 ? mostrarProductos(): CarritoVacio()
produtosElegidos.length > 0 ? buttonIrForm(): '';
produtosElegidos.length > 0 ? totalCompra(): '';



function buttonIrForm (){    
    let container = document.getElementById('ir__formulario')
    principal = document.createElement('a')    
    principal.classList.add('mx-auto')        
    principal.classList.add('btn')        
    principal.classList.add('btn-secondary')            
    principal.classList.add('w-50')            
    principal.href='formulario.html'
    principal.setAttribute("onclick","irForm()");
    principal.innerHTML ='Completar Compra'
    container.appendChild(principal)
    
}

const irForm=()=>{
    produtosElegidos.push(totalComp)
    console.log(produtosElegidos)
    localStorage.setItem('carrito',JSON.stringify(produtosElegidos))
}




function mostrarProductos(){
        for(const produ of produtosElegidos){        
            let principal = document.createElement('div');
            $(principal).addClass( "card__products" );
            $(principal).addClass("col-3");
            $(principal).addClass( "text-center");
            
                principal.innerHTML = `
                <div id=${produ.id} class="card" style="width: 18rem;">
                        <img src='${produ.img}' class="card-img-top" alt="...">
                        <div class="card-body">
                            <div class="container-title">
                                <h5 class="card-title">${produ.nombre}</h5>
                            </div>
                            <p class="card-text">Marca: ${produ.marca}</p>
                            <p class="card-text"> $${new Intl.NumberFormat("de-DE").format(produ.precio)}</p>
                            <p class="card-text"> Cantidad: ${produ.cantidad}</p>
                        </div>
                        <ul class="list-group list-group-flush">                            
                            <li class="list-group-item">Total: $${new Intl.NumberFormat("de-DE").format(produ.total)}</li>
                        </ul>
                        <div class="card-body">                
                                <button href="#" class="btn btn-info" onclick="EliminarProducto(${produ.id})">Eliminar Producto</button>
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

    principal.innerHTML = `<div class="d-block">
                                <h1 class="my-3">Carrito vacío</h1>
                                <a class="btn btn-primary" class="nav-link active" aria-current="page" href="./index.html">Home</a>
                            </div>`;
    contenedor.appendChild(principal)  
}



function EliminarProducto(id){
    console.log(id)
    console.log(produtosElegidos) 
    for(let i = 0; i < produtosElegidos.length; i++){
        if(produtosElegidos[i].id == id ){
            produtosElegidos.splice(i, 1);
        }
    }    
    document.getElementById(id).remove()
    localStorage.setItem('carrito',JSON.stringify(produtosElegidos))
    location.reload();
    
}

function totalCompra(){               
    for(let total of produtosElegidos){        
        totalComp.precioTotal += total.precio * total.cantidad        
    }
    let principal = document.getElementById('total__compra')
    let container = document.createElement('div')
    container.classList.add('totalCompra')    
    container.classList.add('container')    
    container.classList.add('mx-auto')    
    container.classList.add('bg-info')        
    container.classList.add('border-primary')    
    container.classList.add('w-50')    
    container.classList.add('d-flex')    
    container.classList.add('mb-3')        
    container.classList.add('align-items-center')        
    container.classList.add('justify-content-center')    
    container.innerHTML= `Precio Total: $${new Intl.NumberFormat("de-DE").format(totalComp.precioTotal)}`;
    principal.appendChild(container)  
}

