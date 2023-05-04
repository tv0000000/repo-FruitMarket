const nav = document.getElementById("navBar");
const contenedorProductos = document.getElementById("contenedorProductos");
const modal = document.getElementById("modalContainer");
const contadorCarrito = document.getElementById("contadorCarrito");

let carrito = [];

// localStorage
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"))
};

// CONTADOR
const numeroCarrito = () => {
  contadorCarrito.style.display = "inline-block";
  const carritoLength = carrito.length
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
  contadorCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

numeroCarrito();

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
  if (enCarrito) {
    enCarrito.cantidad++;
    // console.log(enCarrito);
  } else {
    const producto = productos.find(producto => producto.id === id);
    carrito.push(producto);
  }
  numeroCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito))
};