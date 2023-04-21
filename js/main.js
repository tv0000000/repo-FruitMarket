const nav = document.getElementById("navBar");
const contenedorProductos = document.getElementById("contenedorProductos");
const modal = document.getElementById("modalContainer");
const contadorCarrito = document.getElementById("contadorCarrito");

let carrito = [];

// CONTADOR
const numeroCarrito = () => {
  contadorCarrito.style.display = "inline-block";
  contadorCarrito.innerText = carrito.length;
};

// PRODUCTOS
const archivoJson = "json/productos.json";
fetch(archivoJson)
  .then(respuesta => respuesta.json())
  .then((datos) => {
    mostrarProductos(datos);
  })
  .catch(error => console.log(error))
    
function mostrarProductos(productos) {
  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("col-xl-3", "col-md-6");
    div.innerHTML =
      `<div class="card cardProductos">
                    <img class="img-fluid" src= ${producto.img} alt= ${producto.nombre}>
                    <div class="card-body">
                    <h2 class="cardTitle">${producto.nombre}</h2>
                    <p class="cardText">$${producto.precio}</p></div>
                    <button class="btn btn-dark buttonCard" id = "boton${producto.id}">Añadir al Carrito</button>
                    </div>`

    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregar(producto.id, productos);
    })
  })
}

const agregar = (id, productos) => {
  const enCarrito = carrito.find(producto => producto.id === id);
  // const enCarrito = carrito.some((producto) => producto.id === id)
  if (enCarrito) {
    enCarrito.cantidad++;
    // console.log(enCarrito);
  } else {
    const producto = productos.find(producto => producto.id === id);
    carrito.push(producto);
  }
  numeroCarrito();
  // localStorage.setItem("carrito", JSON.stringify(carrito))
}





















// MI PROYECTO


// ******* BOTON MODO ******* 
  /*Recordar boton creado en el NAV.*/
//   const botonModo = document.getElementById("botonModo");

//   botonModo.addEventListener("click", () => {
//     document.body.classList.toggle("oscuro");
//     if (document.body.classList.contains("oscuro")) {
//       localStorage.setItem("botonModo", "oscuro");
//     } else {
//       localStorage.setItem("botonModo", "claro")
//     }
//   })

//   const modoClaroOscuro = localStorage.getItem("botonModo")

//   if (modoClaroOscuro === "oscuro") {
//     document.body.classList.add("oscuro")
//   } else {
//     document.body.classList.remove("oscuro");
//   }
// }


// ******* FOOTER *******
// const footer = document.getElementById("footerDiv");
// const footerBar = document.createElement("div");
// footerBar.innerHTML =
//   `<div>
//         <ul class="footerDiv">
//             <li class="footerLi"><button class="buttonFotter" id = "botonVerCarrito">Ver carrito</button></li>
//             <li class="footerLi"><button class="buttonFotter" id = "botonVaciarCarrito">Vaciar carrito </button></li>
//             <li class="footerLi"><button class="buttonFotter" id = "finalizarCompra">
//             Ingresar dirección envío</button></li>
//           </ul>
//         </div>`

// footer.appendChild(footerBar);

// let carrito = [];

// ******* CONDICIONAL PARA GUARDAR Y TRAER DEL LOCALSOTRAGE SI HAY CARRITO *******
// if (localStorage.getItem("carrito")) {
//   carrito = JSON.parse(localStorage.getItem("carrito"))
// };

//******* ARCHIVO JSON - UTILIZAMOS FETCH*******
// const contenedorProductos = document.getElementById("contenedorProductos");
// const archivoJson = "json/productos.json";
// fetch(archivoJson)
//   .then(respuesta => respuesta.json())
//   .then((datos) => {
//     // console.log(datos);
//     mostrarProductos(datos);
//   })
//   .catch(error => console.log(error))

// ******* FUNCION PARA MOSTRAR PRODUCTOS EN EL DOM *******    
//Recordar productos = datos
// function mostrarProductos(productos) {
//   productos.forEach(producto => {
//     const div = document.createElement("div");
//     div.classList.add("col-xl-3", "col-md-6");
//     div.innerHTML =
//       `<div class="card cardProductos">
//                     <img src= ${producto.img} alt= ${producto.nombre}>
//                     <div class="card-body">
//                     <h2 class="card-title">${producto.nombre}</h2>
//                     <p class="card-text">${producto.descripcion} </p>
//                     <p class="card-text">$ ${producto.precio} </p></div>
//                     <button class="btn btn-dark buttonCard" id = "boton${producto.id}">Añadir al Carrito</button>
//                     </div>`

//     contenedorProductos.appendChild(div);

    // ******* EVENTO PARA AGREGUAR PRODUCTOS AL CARRITO ******* 
    // Recordar función creada por fuera, entra como parametro. Boton vive en función. 

//     const boton = document.getElementById(`boton${producto.id}`);
//     boton.addEventListener("click", () => {
//       agregar(producto.id, productos);
//     })
//   })
// }

// ******* FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO ******* 
// Se invoca en botón dentro de función para mostrar productos.  
// const agregar = (id, productos) => {
  // console.log(id);
  // const enCarrito = carrito.find(producto => producto.id === id);
  // if (enCarrito) {
  //   enCarrito.cantidad++;
  //   // console.log(enCarrito);
  //   costo();
  // } else {
  //   const producto = productos.find(producto => producto.id === id);
  //   carrito.push(producto);
  //   // console.log(producto);
  //   costo();
  // }

  // localStorage SETITEM
//   localStorage.setItem("carrito", JSON.stringify(carrito))
// }

// ******* EVENTO PARA MOSTRAR PRODUCTOS AGREGADOS EN EL CARRITO ******* 
// Invocamos funciones vemos carrito y costo
// const verCarrito = document.getElementById("botonVerCarrito");
// verCarrito.addEventListener("click", () => {
//   if (carrito.length > 0) {
//     vemosCarrito();
//     costo();
//   }
//   else if (carrito.length === 0) {
//     Swal.fire({
//       title: "Te carrito esta vacio, agrega unas Super Hamburgesas!!",
//       icon: "success",
//       confirmButtonText: "Aceptar"
//     })
//   }
// })

// ******* CREAMOS TITULO CARRITO *******
// const titulo = document.getElementById("tituloCarrito");
// const etiquetaTitulo = document.createElement("div");
// etiquetaTitulo.innerHTML = `<div class="divTitulo"><p class="tituloCarrito">Carrito de Compras 🛒</p></div>`
// titulo.appendChild(etiquetaTitulo);

// ******* FUNCION PARA VER CARRITO *******
// Función invocada en el evento ver carrito.
// const carritoMostrarDom = document.getElementById("mostrarCarrito");
// const vemosCarrito = () => {
//   carritoMostrarDom.innerHTML = "";
//   carrito.forEach(producto => {
//     const cardBs = document.createElement("div");
//     cardBs.classList.add("col-xl-3", "col-md-6");
//     cardBs.innerHTML =
//       `<div class="card cardProductos">
//           <img src= ${producto.img} alt= ${producto.nombre}>
//           <div class="card-body">
//           <h2 class="card-title">${producto.nombre}</h2>
//           <button class="btn-dark botonS" id ="botonResta${producto.id}"> - </button>
//           <button class=" btn-dark botonS" id ="botonSuma${producto.id}"> + </button>
//           <p> Cantidad: ${producto.cantidad}</p>
//           <p class="card-text">$ ${producto.precio}</p></div>
//           <button class="btn btn-dark" id ="botonEliminar${producto.id}">Vaciar  ${producto.nombre} del carrito</button>
//           </div>`

//     carritoMostrarDom.appendChild(cardBs);

    // ******* EVENTO ELIMINAR PRODUCTOS DEL CARRITO ******* 
    // Utilizamos sweet alert. invocamos función eliminar carrito creada por fuera.
    // const botonEliminar = document.getElementById(`botonEliminar${producto.id}`);
    // botonEliminar.addEventListener("click", () => {
    //   Swal.fire({
    //     title: "¿Estas seguro de vaciar el producto del carrito?, te lo vas a perder 👽!!!",
    //     icon: "warning",
    //     confirmButtonText: "Aceptar",
    //     showCancelButton: true,
    //     cancelButtonText: "Cancelar"
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       eliminamosProducto(producto.id);
    //       console.log(carrito);
    //       Swal.fire({
    //         title: "Producto del carrito Eliminado!",
    //         icon: "success",
    //         confirmButtonText: "Aceptar"
    //       })
    //     }
    //   })
    // })

    // ******* EVENTO PARA SUMAR O RESTAR EN CARRITO *******
//     const botonSuma = document.getElementById(`botonSuma${producto.id}`);
//     botonSuma.addEventListener("click", () => {
//       sumaProducto(producto.id);
//     })

//     const botonResta = document.getElementById(`botonResta${producto.id}`);
//     botonResta.addEventListener("click", () => {
//       restaProducto(producto.id);
//     })
//   })
// }

// ******* FUNCIONES PARA SUMAR O RESTAR EN CARRITO ******* 
// const sumaProducto = (id) => {
//   const sumaCarrito = carrito.find(producto => producto.id === id);
//   if (sumaCarrito) {
//     sumaCarrito.cantidad++;
//     vemosCarrito();
//     costo();

    // localStorage SETITEM
//     localStorage.setItem("carrito", JSON.stringify(carrito))
//   }
// }

// const restaProducto = (id) => {
//   const restaCarrito = carrito.find(producto => producto.id === id);
//   if (restaCarrito) {
//     if (restaCarrito.cantidad > 0) {
//       restaCarrito.cantidad--;
//     }
//     else {
//       restaCarrito.cantidad = 0;
//     }
//     vemosCarrito();
//     costo();

    // localStorage SETITEM
//     localStorage.setItem("carrito", JSON.stringify(carrito))
//   }
// }

// ******* FUNCION PARA ELIMINAR PRODUCTO ENTERO *******
// const eliminamosProducto = (id) => {
//   const productoEliminado = carrito.find(producto => producto.id === id);
//   const indice = carrito.indexOf(productoEliminado);
//   carrito.splice(indice, 1);
//   vemosCarrito();
//   costo()

  // localStorage SETITEM
//   localStorage.setItem("carrito", JSON.stringify(carrito))
// }

// ******* EVENTO PARA VACIAR EL CARRITO ******* 
// Boton creado en el Footer
// const vaciar = document.getElementById("botonVaciarCarrito");
// vaciar.addEventListener("click", () => {
//   if (carrito.length > 0) {
//     Swal.fire({
//       title: "¿Estas seguro de vaciar el carrito?, te lo vas a perder 👽!!!",
//       icon: "warning",
//       confirmButtonText: "Aceptar",
//       showCancelButton: true,
//       cancelButtonText: "Cancelar"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         eliminamosTodo();
//         localStorage.clear();
        // console.log(carrito);
//         Swal.fire({
//           title: "Se vacio el carrito ☹️!",
//           icon: "success",
//           confirmButtonText: "Aceptar"
//         })
//       }
//     })
//   } else {
//     Swal.fire({
//       title: "Tu carrito esta vacio",
//       icon: "warning",
//       confirmButtonText: "Aceptar",
//     })
//   }
// })

// ******* FUNCION PARA VACIAR CARRITO ******* - 
// const eliminamosTodo = () => {
//   carrito.forEach(producto => {
//     producto.cantidad = 1;
//   })
//   carrito = [];
//   vemosCarrito();
//   costo();

  // Actualizamos el localStorage
  // localStorage.setItem("carrito", JSON.stringify(carrito));
  // Borramos el localStorage 
//   localStorage.clear();
// }

// ******* FUNCION PARA VER EL COSTO DE LA COMPRA *******
//La invocamos cuando vaciamos o agregamos productos al carrito.
// const costoCompra = document.getElementById("costo");
// const costo = () => {
//   let total = carrito.reduce((acumulador, productos) => acumulador + (productos.cantidad * productos.precio), 0);
//   console.log(total);
//   costoCompra.innerHTML = `<p class="compra">Total de la compra: $${total}</p>`;

  // localStorage SETITEM
//   localStorage.setItem("carrito", JSON.stringify(carrito));
// }

//******* FORMULARIO FINALIZAR COMPRA *******
// const dirEnvio = () => {
//   const form = document.createElement("div");
//   form.innerHTML =
//     `<div class="formu form-group">
//           <h3 class="subForm">Ingrese sus datos </h2>
//           <label for="nombre">Nombre</label>
//           <input placeholder="ingrese su nombre" class="inpu" type="text" class="form-control" id="nombre">
//           <label for="nombre">Dirección de envio</label>
//           <input placeholder="ingrese su dirección" class="inpu" id="direccion" type="text" class="form-control" id="nombre">
//           <label for="email">Email - Opcional</label>
//           <input placeholder="ingrese su email" class="inpu" type="email" class="form-control" id="email">
//           <button class="botonForm" id="cancelCompra" class="btn">Cancelar compra</button>
//           <button class="botonForm" id="enviarCompra" class="btn">Enviar pedido</button>
//       </div>`

//   carritoMostrarDom.appendChild(form);

//   const cancelar = document.getElementById("cancelCompra");
//   cancelar.addEventListener("click", () => {
//     Swal.fire({
//       title: "¿Estas seguro?, te lo vas a perder!!!",
//       icon: "warning",
//       confirmButtonText: "Aceptar",
//       showCancelButton: true,
//       cancelButtonText: "Cancelar"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         eliminamosTodo();
//         Swal.fire({
//           title: "se cancelo la compra",
//           icon: "success",
//           confirmButtonText: "Aceptar"
//         })
//       }
//     })
//   })

  // Constantes para el boton enviar
  // const enviar = document.getElementById("enviarCompra");
  // const nombre = document.getElementById("nombre");
  // const direccion = document.getElementById("direccion");

  // enviar.addEventListener("click", () => {
    // Mensaje form
    // const mensajeForm = document.createElement("div");
    // console.log(mensajeForm);
//     if (carrito.length > 0 && nombre.value != "" && direccion.value != "") {
//       mensajeForm.innerHTML = `<p class="compra">Muchas gracias su pedido está en camino</p>`;
//       carritoMostrarDom.appendChild(mensajeForm);

//       setTimeout(() => {
//         mensajeForm.innerHTML = '';
//         eliminamosTodo();
//       }, 3000);

//     } else {
//       mensajeForm.innerHTML = `<p class="compra">No hay productos en el carrito o no completaste tu nombre y dirección para el envio</p>`;
//       carritoMostrarDom.appendChild(mensajeForm);

//       setTimeout(() => {
//         mensajeForm.innerHTML = '';
//       }, 3000);
//     }
//   })
// };

// ******* EVENTO FORMULARIO INGRESAR DIRECCION *******
//  Recordar booton creado en el footer
// const finalizar = document.getElementById("finalizarCompra");
// finalizar.addEventListener("click", () => {
//   // console.log(finalizar);
//   vemosCarrito();
//   dirEnvio();
// });






























