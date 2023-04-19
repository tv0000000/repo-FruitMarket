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
        <img class"imgCarrito" src= ${producto.img} alt= ${producto.nombre}>
        <h3>${producto.nombre}</h3>
        <p class="carritoText">Cantidad: ${producto.cantidad}</p>
        <button class="btn-dark botonS" id ="botonResta${producto.id}"> - </button>
        <button class=" btn-dark botonS" id ="botonSuma${producto.id}"> + </button>
        <p class="carritoText">Precio unitario: $${producto.precio}</p>

        <p class="carritoText">Total: $ ${producto.cantidad * producto.precio}</p>
        <i class="fa-regular fa-trash-can botonEliminar" id ="botonEliminar${producto.id}"></i>
        `
        modal.appendChild(carritoContent);

        const botonEliminar = document.getElementById(`botonEliminar${producto.id}`);
        botonEliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
            // Toastify({
            //     text: `Se eliminó unidad de ${producto.nombre}`,
            //     position: 'left',
            //     gravity: 'bottom',
            //     duration: 5000,
            //     style: {
            //     background: "linear-gradient(to right, #f17b5d, #f02f2f)",
            //     }
            // }).showToast();
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
    }

    costo();

    const eliminamos = document.getElementById("botonVaciar")
        eliminamos.addEventListener("click", () => {
          if (carrito.length > 0) {
            Swal.fire({
              title: "¿Estas seguro?",
              icon: "warning",
              confirmButtonText: "Aceptar",
              showCancelButton: true,
              cancelButtonText: "Cancelar"
            }).then((result) => {
              if (result.isConfirmed) {
                eliminamosCarrito();
                //localStorage.clear();
                Swal.fire({
                  title: "Se vacio el carrito",
                  icon: "success",
                  confirmButtonText: "Aceptar"
                })
              }
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

const eliminamosCarrito = () => {
    carrito.forEach(producto => {
    producto.cantidad = 1;
    })
    carrito = [];
    renderCarrito();
}