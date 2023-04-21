const verCarrito = document.getElementById("botonCarrito");
// esto nodo lo cree en el NAV en main main.js. Ahora evidentemente lee primero el NAV de main.js y despues lee esto porque sino no debería funcionar. Si lo ponia en main.js pero por encima del NAV no funcionaba. Entiendo que es porque puse en el htm primero mail.js y después carrito.js porque sino no funcionaría. 


// console.log("funciona y no se repite?")
// modal.className = "mostrar";
const renderCarrito = () => {
    modal.innerHTML = "";
    modal.style.display = "flex";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modalHeader";
    modalHeader.innerHTML = `
        <h3>Carrito</h3>
        <i class="fa-regular fa-circle-xmark modalButton" id="buttonClose"></i>
        `
    numeroCarrito();
    modal.appendChild(modalHeader);

    // BOTON CIERRA MODAL
    const buttonClose = document.getElementById("buttonClose");
    buttonClose.addEventListener("click", () => {
        modal.style.display = "none";
        // modal.className =  "ocultar"; entiendo que no funciona asi porque con style  solo le estoy agregando ese estilo indivicual y no estoy modificando el resto de propiedades que le di en css. Si le pongo una nueva clase piso la anterior entonces ahí se va todo al demonio. 
    })

    carrito.forEach(producto => {
        const carritoContent = document.createElement("div");
        carritoContent.className = "carritoContenido"
        carritoContent.innerHTML =
            `	
        
    <div>
        <img class"imgCarrito" src= ${producto.img} alt= ${producto.nombre}>
    </div>
    
    <div>
        <h3>${producto.nombre}</h3>
        
        <div>
            <p class="carritoText">Cantidad: ${producto.cantidad}</p>        
            <button class="btn-dark botonS" id ="botonResta${producto.id}"><i class="fa-solid fa-minus restar-cantidad"></i> </button>
            <button class=" btn-dark botonS" id ="botonSuma${producto.id}"><i class="fa-solid fa-plus sumar-cantidad"></i> </button>
        </div> 

        <p class="carritoText">Precio unitario: $${producto.precio}</p>    
        <p class="carritoText">Total: $${producto.cantidad * producto.precio}</p>
        <span>Eliminar<i class="fa-regular fa-trash-can botonEliminar" id ="botonEliminar${producto.id}"></i></span>
    
    </div>
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
}

// EVENTO RENDER CARRITO
verCarrito.addEventListener("click", () => {
    renderCarrito()
})

// ******* ELIMINAR PRODUCTO *******
const eliminarProducto = (id) => {
    // console.log(carrito);
    const productoEliminado = carrito.find(producto => producto.id === id);
    // console.log(productoEliminado);
    const indice = carrito.indexOf(productoEliminado);
    carrito.splice(indice, 1);
    // console.log(carrito);
    renderCarrito();
    numeroCarrito();
    //   costo()
    //   localStorage.setItem("carrito", JSON.stringify(carrito))
}

// ******* SUMAR O RESTAR ******* 
const sumaProducto = (id) => {
    const sumaCarrito = carrito.find(producto => producto.id === id);
    if (sumaCarrito) {
        sumaCarrito.cantidad++;
        renderCarrito();
        //     localStorage.setItem("carrito", JSON.stringify(carrito))
    }
}

const restaProducto = (id) => {
    const restaCarrito = carrito.find(producto => producto.id === id);
    if (restaCarrito) {
        if (restaCarrito.cantidad > 1) {
            restaCarrito.cantidad--;
        }
        // else {
        //     restaCarrito.cantidad = 0;
        // }
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
    console.log(total);

    const muestroTotal = document.createElement("div");
    muestroTotal.className = "muestroTotal";
    muestroTotal.innerHTML = `
<p>Total de la compra: $${total}</p>
<button class="botonVaciar" id="botonVaciar">Vaciar carrito</button>
`;
    modal.appendChild(muestroTotal);
    // localStorage.setItem("carrito", JSON.stringify(carrito));
    const eliminamos = document.getElementById("botonVaciar")
    eliminamos.addEventListener("click", () => {
        if (carrito.length > 0) {
            eliminamosCarrito();
            numeroCarrito();
            Swal.fire({
                title: "Se vacio el carrito",
                icon: "success",
                confirmButtonText: "Aceptar",
            })
        } else {
            Swal.fire({
                title: "Tu carrito esta vacio",
                icon: "warning",
                confirmButtonText: "Aceptar",
            })
        }
    })
}