const renderCompra = () => {
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

    const buttonClose = document.getElementById("buttonClose");
    buttonClose.addEventListener("click", () => {
        modal.style.display = "none"; 
    })

    carrito.forEach(producto => {
        const carritoCompra = document.createElement("div");
        carritoCompra.className = "carritoCompra"
        carritoCompra.innerHTML =
            `
        <div>    
        <h3>${producto.nombre}</h3>
        </div>
        <div>
        <p>Cantidad: ${producto.cantidad}</p>
        </div>

        `
        modal.appendChild(carritoCompra);
    })
}

const costoFinal = () => {
    let total = carrito.reduce((acumulador, productos) => acumulador + (productos.cantidad * productos.precio), 0);
    console.log(total);

    const muestroTotal = document.createElement("div");
    muestroTotal.className = "muestroTotal";
    muestroTotal.innerHTML = `
<p>Total de la compra: $${total}</p>
`;
    modal.appendChild(muestroTotal);
}

const finalizar = () => {
    const finalizar = document.createElement("div")
    finalizar.innerHTML = `
<button class="botonVaciar" id="botonFinalizar">Finalizar compra</button>
`
    modal.appendChild(finalizar);

    const botonFinalizar = document.getElementById("botonFinalizar");
    botonFinalizar.addEventListener("click", () => {
        renderCompra();
        costoFinal();
        dirEnvio();
    });
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
          <label for="email">Email - Opcional</label>
          <input placeholder="ingrese su email" class="inpu" type="email" class="form-control" id="email">
          <button class="botonForm" id="cancelCompra" class="btn">Cancelar compra</button>
          <button class="botonForm" id="enviarCompra" class="btn">Enviar pedido</button>
      </div>`

    modal.appendChild(form);
};

