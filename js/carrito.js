const verCarrito = document.getElementById("botonCarrito");

const renderHeader = ()=> {
modal.innerHTML = "";
modal.style.display = "flex";
const modalHeader = document.createElement("div");
modalHeader.className = "modalHeader";
modalHeader.innerHTML = `
    <h3>Carrito</h3>
    <i class="fa-regular fa-circle-xmark modalButton" id="buttonClose"></i>
    `
modal.appendChild(modalHeader);

// BOTON CIERRA MODAL
const buttonClose = document.getElementById("buttonClose");
buttonClose.addEventListener("click", () => {
    modal.style.display = "none"; 
 })
}


const renderCarrito = () => {
    renderHeader();
    carrito.forEach(producto => {
        const carritoContent = document.createElement("div");
        carritoContent.className = "carritoContenido"
        carritoContent.innerHTML =
            `	
        <img class"imgCarrito" src= ${producto.img} alt= ${producto.nombre}>
        <h3>${producto.nombre}</h3>            
        <div class="contenedorBotonesC">
            <button class="btn-dark botonS" id ="botonResta${producto.id}"><i class="fa-solid fa-minus restar-cantidad"></i></button>
            <p class="cantidad">${producto.cantidad}</p>
            <button class=" btn-dark botonS" id ="botonSuma${producto.id}"><i class="fa-solid fa-plus sumar-cantidad"></i></button>
        </div>
        
        <p class="carritoText">Unidad: $${producto.precio}</p>    
        <p class="carritoText">Total: $${producto.cantidad * producto.precio}</p>
        <span><i class="fa-regular fa-trash-can botonEliminar" id ="botonEliminar${producto.id}"></i></span>
        `
        modal.appendChild(carritoContent);
        
        const botonEliminar = document.getElementById(`botonEliminar${producto.id}`);
        botonEliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
        });

        const botonSuma = document.getElementById(`botonSuma${producto.id}`);
        botonSuma.addEventListener("click", () => {
            sumaProducto(producto.id);
            numeroCarrito();
        })

        const botonResta = document.getElementById(`botonResta${producto.id}`);
        botonResta.addEventListener("click", () => {
            restaProducto(producto.id);
        })
    });
    costo();
    finalizar();
}

// EVENTO RENDER CARRITO
verCarrito.addEventListener("click", () => {
    renderCarrito();
})

// ******* ELIMINAR PRODUCTO *******
const eliminarProducto = (id) => {
    const productoEliminado = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(productoEliminado);
    carrito.splice(indice, 1);
    renderCarrito();
    numeroCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// ******* SUMAR O RESTAR ******* 
const sumaProducto = (id) => {
    const sumaCarrito = carrito.find(producto => producto.id === id);
    if (sumaCarrito) {
        sumaCarrito.cantidad++;
        renderCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
}

const restaProducto = (id) => {
    const restaCarrito = carrito.find(producto => producto.id === id);
    if (restaCarrito) {
        if (restaCarrito.cantidad > 1) {
            restaCarrito.cantidad--;
        }
        renderCarrito();
    }
}

// ELIMINAMOS CARRITO
const eliminamosCarrito = () => {
    carrito.forEach(producto => {
        producto.cantidad = 1;
    })
    carrito = [];
    renderCarrito();
}

// COSTO
const costo = () => {
    let total = carrito.reduce((acumulador, productos) => acumulador + (productos.cantidad * productos.precio), 0);
    // console.log(total);

    const muestroTotal = document.createElement("div");
    muestroTotal.className = "muestroTotal";
    muestroTotal.innerHTML = `
<p>Total de la compra: $${total}</p>
`;
    modal.appendChild(muestroTotal);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}