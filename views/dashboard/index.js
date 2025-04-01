/*****************************************************
 * 1. Esperar a que el DOM cargue
 *****************************************************/
document.addEventListener("DOMContentLoaded", function() {
    // Verificar existencia de los elementos del carrito
    const cartToggle    = document.getElementById("cart-toggle");
    const cartDropdown  = document.getElementById("cart-dropdown");
    const cartItemsList = document.getElementById("cart-items");
    const cartBadge     = document.getElementById("cart-badge");
    const cartClearBtn  = document.getElementById("cart-clear");
  
    if (!cartToggle)    console.error("Elemento con ID 'cart-toggle' no encontrado.");
    if (!cartDropdown)  console.error("Elemento con ID 'cart-dropdown' no encontrado.");
    if (!cartItemsList) console.error("Elemento con ID 'cart-items' no encontrado.");
    if (!cartBadge)     console.error("Elemento con ID 'cart-badge' no encontrado.");
    if (!cartClearBtn)  console.error("Elemento con ID 'cart-clear' no encontrado.");
  
    // Si todos los elementos están presentes, configurar el carrito
    if (cartToggle && cartDropdown && cartItemsList && cartBadge && cartClearBtn) {
      configurarCarrito();
    }
  
    // Llamamos a funciones que muestren productos y configuren el carrusel (si corresponde)
    mostrarProductos();
    configurarCarrusel();
  });

  /*****************************************************
   * 2. ARRAY DE PRODUCTOS (13 medicamentos)
   *****************************************************/
  const productos = [
    { nombre: "Trastuzumab", concentracion: "150 mg/7.2 mL", forma: "Solución inyectable", lote: "TZ202401", precio: "170$", imagen: "../principal/img/trastuzumab.png", ubicacion: "La Urbina, Caracas", latitud: 10.4982, longitud: -66.8889 },
    { nombre: "Pertuzumab", concentracion: "420 mg/14 mL", forma: "Solución inyectable", lote: "PZ202402", precio: "6$", imagen: "../principal/img/pertuzumab.png", ubicacion: "Altamira, Caracas", latitud: 10.4807, longitud: -66.8770 },
    { nombre: "Paclitaxel", concentracion: "100 mg/16.7 mL", forma: "Solución inyectable", lote: "PT202403", precio: "35$", imagen: "../principal/img/paclitaxel.png", ubicacion: "Los Palos Grandes, Caracas", latitud: 10.4849, longitud: -66.9096 },
    { nombre: "Docetaxel", concentracion: "80 mg/4 mL", forma: "Solución inyectable", lote: "DT202404", precio: "32$", imagen: "../principal/img/docetaxel.png", ubicacion: "Prados del Este, Caracas", latitud: 10.4965, longitud: -66.8832 },
    { nombre: "Doxorrubicina", concentracion: "50 mg/25 mL", forma: "Solución inyectable", lote: "DL202405", precio: "37$", imagen: "../principal/img/doxorrubicina.png", ubicacion: "La Castellana, Caracas", latitud: 10.4801, longitud: -66.8933 },
    { nombre: "Capecitabina", concentracion: "500 mg", forma: "Tableta recubierta", lote: "CP202406", precio: "60$", imagen: "../principal/img/capecitabina.png", ubicacion: "Propatria, Caracas", latitud: 10.4719, longitud: -66.9043 },
    { nombre: "Tamoxifeno", concentracion: "20 mg", forma: "Tableta recubierta", lote: "TX202407", precio: "15$", imagen: "../principal/img/tamoxifeno.png", ubicacion: "Chacao, Caracas", latitud: 10.4840, longitud: -66.8810 },
    { nombre: "Letrozol", concentracion: "2.5 mg", forma: "Tableta recubierta", lote: "LZ202408", precio: "130$", imagen: "../principal/img/letrozol.png", ubicacion: "Antimano, Caracas", latitud: 10.4762, longitud: -66.9275 },
    { nombre: "Anastrozol", concentracion: "1 mg", forma: "Tableta recubierta", lote: "AZ202409", precio: "12$", imagen: "../principal/img/anastrozol.png", ubicacion: "Bello monte, Caracas", latitud: 10.4930, longitud: -66.9020 },
    { nombre: "Fulvestrant", concentracion: "250 mg/5 mL", forma: "Solución inyectable", lote: "FV202410", precio: "27$", imagen: "../principal/img/fulvestrant.png", ubicacion: "Plaza Venezuela, Caracas", latitud: 10.4772, longitud: -66.8940 },
    { nombre: "Irinotecan", concentracion: "100 mg/5 mL", forma: "Solución inyectable", lote: "IR202411", precio: "242$", imagen: "../principal/img/irinotecan.png", ubicacion: "Los Dos Caminos, Caracas", latitud: 10.5040, longitud: -66.9110 },
    { nombre: "Bevacizumab", concentracion: "100 mg/4 mL", forma: "Solución inyectable", lote: "BV202412", precio: "380$", imagen: "../principal/img/bevacizumab.png", ubicacion: "El valle, Caracas", latitud: 10.4800, longitud: -66.9130 },
  ];
/*****************************************************
 * 3. FUNCIONES PARA MOSTRAR PRODUCTOS Y CONFIGURAR EL CARRITO
 *****************************************************/
function mostrarProductos() {
  const container = document.getElementById("productos-container");
  if (!container) return;

  container.innerHTML = "";
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "bg-white shadow-md rounded-lg p-4 flex flex-col justify-between";

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="h-40 w-auto object-cover rounded mb-2 mx-auto">
      <h2 class="text-lg font-medium text-purple-700">${producto.nombre}</h2>
      <p class="text-sm text-gray-600">Concentración: ${producto.concentracion}</p>
      <p class="text-sm text-gray-600">Forma: ${producto.forma}</p>
      <p class="text-sm text-gray-600">Lote: ${producto.lote}</p>
      <p class="text-sm text-gray-600">Precio: ${producto.precio}</p>
      <div class="mt-4 flex justify-between">
        <button class="bg-purple-500 text-white py-1 px-4 rounded-lg hover:bg-purple-600 transition detalles-btn">
          Detalles
        </button>
        <button class="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition add-cart-btn">
          Agregar
        </button>
      </div>
    `;

    container.appendChild(card);

    // Evento: Botón "Agregar al carrito"
    const addCartBtn = card.querySelector(".add-cart-btn");
    addCartBtn.addEventListener("click", () => agregarAlCarrito(producto));

    // Evento: Botón "Detalles"
    const detallesBtn = card.querySelector(".detalles-btn");
    detallesBtn.addEventListener("click", () => {
      window.location.href = `/producto?id=${producto.id}`;
    });
  });
}

function configurarCarrito() {
  // Configuración del carrito (similar a tu implementación actual)
}

function manejarBusqueda(query) {
  const queryLower = query.toLowerCase(); // Convertir el texto ingresado a minúsculas
  const productoEncontrado = productos.find((producto) =>
    producto.nombre.toLowerCase().includes(queryLower)
  );

  if (productoEncontrado) {
    console.log("Producto encontrado:", productoEncontrado);
    // Redirigir a la página de producto con el lote como identificador
    window.location.href = `/producto?lote=${productoEncontrado.lote}`;
  } else {
    console.log("Producto no encontrado");
    alert("Producto no encontrado. Por favor, verifica el nombre.");
  }
}

/*****************************************************
 * 4. PRODUCTOS EN LA SECCIÓN PRINCIPAL
 *****************************************************/
function mostrarProductos() {
  // Tomar 12 productos aleatorios
  const shuffledProductos = [...productos].sort(() => 0.5 - Math.random()).slice(0, 12);

  // Contenedor principal de productos
  const container = document.getElementById("productos-container");
  if (!container) return;
  container.innerHTML = "";

  // Crear tarjetas
  shuffledProductos.forEach(producto => {
    const card = document.createElement("div");
    card.className = "bg-white shadow-md rounded-lg p-4 flex flex-col justify-between";
    
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" 
           class="h-40 w-auto object-cover rounded mb-2 mx-auto">
      <h2 class="text-lg font-medium text-purple-700">${producto.nombre}</h2>
      <p class="text-sm text-gray-600">Concentración: ${producto.concentracion}</p>
      <p class="text-sm text-gray-600">Forma: ${producto.forma}</p>
      <p class="text-sm text-gray-600">Lote: ${producto.lote}</p>
      <p class="text-sm text-gray-600">Precio: ${producto.precio}</p>
      <!-- Botones -->
      <div class="mt-4 flex justify-between">
        <button class="bg-purple-500 text-white py-1 px-4 rounded-lg hover:bg-purple-600 transition detalles-btn">
          Detalles
        </button>
        <button class="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition add-cart-btn">
          Agregar
        </button>
      </div>
    `;
    
    // Insertar la tarjeta en el contenedor
    container.appendChild(card);

    // EVENTO: Botón "Agregar"
    const addCartBtn = card.querySelector(".add-cart-btn");
    addCartBtn.addEventListener("click", () => {
      agregarAlCarrito(producto);
    });

    // EVENTO: Botón "Detalles" (puedes personalizar la lógica o abrir un modal)
    const detallesBtn = card.querySelector(".detalles-btn");
    detallesBtn.addEventListener("click", () => {
      // Redirigir a la página de detalles
      window.location.href = `/producto?lote=${producto.lote}`;
    });
  });
}



