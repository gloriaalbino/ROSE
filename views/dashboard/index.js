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
    { nombre: "Trastuzumab",    concentracion: "150 mg/7.2 mL",  forma: "Solución inyectable", lote: "TZ202401", imagen: "img/trastuzumab.png" },
    { nombre: "Pertuzumab",     concentracion: "420 mg/14 mL",   forma: "Solución inyectable", lote: "PZ202402", imagen: "img/pertuzumab.png" },
    { nombre: "Paclitaxel",     concentracion: "100 mg/16.7 mL", forma: "Solución inyectable", lote: "PT202403", imagen: "img/paclitaxel.png" },
    { nombre: "Docetaxel",      concentracion: "80 mg/4 mL",     forma: "Solución inyectable", lote: "DT202404", imagen: "img/docetaxel.png" },
    { nombre: "Doxorrubicina",  concentracion: "50 mg/25 mL",    forma: "Solución inyectable", lote: "DL202405", imagen: "img/doxorrubicina.png" },
    { nombre: "Capecitabina",   concentracion: "500 mg",         forma: "Tableta recubierta",  lote: "CP202406", imagen: "img/capecitabina.png" },
    { nombre: "Tamoxifeno",     concentracion: "20 mg",          forma: "Tableta recubierta",  lote: "TX202407", imagen: "img/tamoxifeno.png" },
    { nombre: "Letrozol",       concentracion: "2.5 mg",         forma: "Tableta recubierta",  lote: "LZ202408", imagen: "img/letrozol.png" },
    { nombre: "Anastrozol",     concentracion: "1 mg",           forma: "Tableta recubierta",  lote: "AZ202409", imagen: "img/anastrozol.png" },
    { nombre: "Fulvestrant",    concentracion: "250 mg/5 mL",    forma: "Solución inyectable", lote: "FV202410", imagen: "img/fulvestrant.png" },
    { nombre: "Irinotecan",     concentracion: "100 mg/5 mL",    forma: "Solución inyectable", lote: "IR202411", imagen: "img/irinotecan.png" },
    { nombre: "Bevacizumab",    concentracion: "100 mg/4 mL",    forma: "Solución inyectable", lote: "BV202412", imagen: "img/bevacizumab.png" },
    { nombre: "Cisplatino",     concentracion: "50 mg/50 mL",    forma: "Solución inyectable", lote: "CP202413", imagen: "img/cisplatino.png" }
  ];
 /*****************************************************
 * 4. MOSTRAR PRODUCTOS EN LA SECCIÓN PRINCIPAL
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
      window.location.href = '/producto/';
    });
  });
}

