const renderCompra = () => {
    renderHeader();
    numeroCarrito();

    carrito.forEach(producto => {
        const carritoCompra = document.createElement("div");
        carritoCompra.className = "carritoCompra"
        carritoCompra.innerHTML =
            `<h3>${producto.nombre}</h3>
            <p>Cantidad: ${producto.cantidad}</p>`
        modal.appendChild(carritoCompra);
    })
}

const finalizar = () => {
    const finalizar = document.createElement("div");
    finalizar.innerHTML = `
<div class="contenedorVaciar">    
<button class="botonVaciar" id="botonVaciar">Vaciar carrito</button>
<button class="botonVaciar" id="botonFinalizar">Finalizar compra</button>
<div>`
    modal.appendChild(finalizar);

    const botonFinalizar = document.getElementById("botonFinalizar");
    const eliminamos = document.getElementById("botonVaciar")

    botonFinalizar.addEventListener("click", () => {
        renderCompra();
        costo();
        dirEnvio();
    });

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
};

//******* FORMULARIO *******
const dirEnvio = () => {
    const form = document.createElement("div");
    form.className = "form";
    form.innerHTML =
        `<div class="formu form-group">
          <h3 class="subForm">Ingrese sus datos </h2>
          <label for="nombre">Nombre</label>
          <input placeholder="ingrese su nombre" class="inpu" type="text" class="form-control" id="nombre">
          <label for="nombre">Dirección de envio</label>
          <input placeholder="ingrese su dirección" class="inpu" id="direccion" type="text" class="form-control" id="nombre">
          <button class="botonForm" id="cancelCompra" class="btn">Cancelar compra</button>
          <button class="botonForm" id="enviarCompra" class="btn">Enviar pedido</button>
      </div>`

    modal.appendChild(form);

        //   <label for="email">Email</label>
        //   <input placeholder="ingrese su email" class="inpu" id="email" type="email" class="form-control" id="email"></input>

    const enviar = document.getElementById("enviarCompra");
    const nombre = document.getElementById("nombre");
    const direccion = document.getElementById("direccion");
    // const mail = document.getElementById("email");

    enviar.addEventListener("click", () => {
        modal.style.display = "none"
        if (carrito.length > 0 && nombre.value != "" && direccion.value != "") {
            Swal.fire({
                title: "Tu pedido esta en camino",
                icon: "success",
                confirmButtonText: "Aceptar",
            })
        eliminamosCarrito()
        numeroCarrito()
        } else {
            Swal.fire({
                title: "No hay productos en el carrito o no completaste nombre/dirección",
                icon: "warning",
                confirmButtonText: "Aceptar",
            })
        }
    });

    const cancelar = document.getElementById("cancelCompra");
    cancelar.addEventListener("click", () => {
        Swal.fire({
            title: "¿Estas seguro?",
            icon: "warning",
            confirmButtonText: "Aceptar",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminamosCarrito();
                numeroCarrito()
                Swal.fire({
                    title: "Compra cancelada",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                })
            }
        })
    })
};
numeroCarrito()

