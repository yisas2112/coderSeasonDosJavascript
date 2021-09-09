let contenedor = document.getElementById('main__carrito');
let produtosElegidos =  JSON.parse(localStorage.getItem('carrito'))
console.log(produtosElegidos)





for(const produ of produtosElegidos){        
    
    let principal = document.createElement('div');
    principal.classList.add("card__products");
    principal.classList.add("col-3");
    principal.classList.add("text-center");
    
    
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
            <li class="list-group-item">Categoria: ${produ.categoria}</li>
            </ul>            
        </div>    
    `;

    contenedor.appendChild(principal)   

    
}

