const navegation = document.querySelector('#navegacion');

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navegacion");
  const cartToggle = document.getElementById("cart-toggle");
  const cartDropdown = document.getElementById("cart-dropdown");
  const cartBadge = document.getElementById("cart-badge");
  const cartItems = document.getElementById("cart-items");
  const cartClearBtn = document.getElementById("cart-clear");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("searchButton");

  let cart = [];

  const producto = [
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
    { nombre: "Cisplatino", concentracion: "50 mg/50 mL", forma: "Solución inyectable", lote: "CP202413", precio: "60$", imagen: "../principal/img/cisplatino.png", ubicacion: "San Bernardino, Caracas", latitud: 10.5100, longitud: -66.8950 }
  ];

// Mostrar/ocultar el dropdown del carrito
cartToggle?.addEventListener("click", () => {
  cartDropdown?.classList.toggle("hidden");
});

// Función que refresca la vista del carrito en el frontend
function updateCartUI() {
  cartItems.innerHTML = ""; // Limpiar el contenido actual del carrito
  let totalItems = 0;

  cart.forEach(item => {
    totalItems += item.quantity;

    // Crear un elemento de lista para cada producto
    const li = document.createElement("li");
    li.classList.add("flex", "justify-between", "items-center", "border-b", "py-2");

    li.innerHTML = `
      <div class="flex items-center space-x-2">
        <img src="${item.imagen}" alt="${item.name}" class="w-10 h-10 object-cover rounded">
        <span>${item.name} x${item.quantity}</span>
      </div>
    `;

    cartItems.appendChild(li);
  });

  // Actualizar el badge con el número total de productos
  cartBadge.textContent = totalItems;

  // Mostrar un mensaje si el carrito está vacío
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="text-gray-500 text-sm">Tu carrito está vacío.</p>`;
    cartBadge.textContent = "0";
  }
}

// Agregar producto al carrito (incrementando cantidad si ya existe)
function addToCart(product) {
  const existing = cart.find(p => p.lote === product.lote); 
  //console.log("Producto agregado al carrito:", product);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

// Botón para eliminar todos los productos del carrito
cartClearBtn?.addEventListener("click", () => {
  cart = [];
  updateCartUI();
});

// Funcionalidad de la barra de búsqueda
searchButton.addEventListener("click", () => {

  const query = searchInput?.value.trim().toLowerCase();
  if (query) {
    const foundProduct = producto.find(p => p.nombre.toLowerCase() === query);
    
    if (foundProduct && foundProduct.lote) {
      window.location.href = `/producto?lote=${foundProduct.lote}`;
    } else {
      showNotification("Producto no encontrado o no tiene un lote válido.", "error");
    }
  }
});

searchInput?.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      // Buscar el producto en el array
      const foundProduct = producto.find(p => p.nombre.toLowerCase() === query);

      if (foundProduct) {
        // Redirigir al producto encontrado
        window.location.href = `/producto?lote=${foundProduct.lote}`;
      } else {
        // Mostrar una notificación si no se encuentra el producto
        showNotification("Producto no encontrado. Redirigiendo a la página principal...", "error");
        setTimeout(() => {
          window.location.href = "/principal/";
        }, 3000); // Redirigir después de 3 segundos
      }
    }
  }
});

// Función para mostrar notificaciones
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white ${
    type === "error" ? "bg-red-500" : "bg-green-500"
  }`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Eliminar la notificación después de 3 segundos
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

  // Exponer la función si necesitas usarla en otros scripts
  window.addToCart = addToCart;
});

const crearNavPrincipal = () => {
  navegation.innerHTML = `
<!-- Encabezado -->
<header>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center h-16">
      
      <!-- Logo + Nombre con enlace -->
      <div class="flex items-center space-x-4">
        <a href="/principal/" class="flex items-center space-x-2">
          <img src="/img/favicon.png" alt="logo" class="h-8 w-8">
          <span class="font-semibold text-lg">ROSE</span>
        </a>
      </div>
      
      <!-- Barra de búsqueda -->
      <div class="flex-1 flex justify-center sm:justify-end ml-4">
        <div class="relative w-40 sm:w-80">
          <input
            type="text"
            id="search-input"
            placeholder="Buscar productos..."
            class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
          >
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z"
              clip-rule="evenodd"
            />
          </svg>
          <button 
            id="searchButton" 
            class="absolute right-0 top-0 px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
          >
            Buscar
          </button>
        </div>
      </div>
      
      <!-- Menú de escritorio -->
      <div class="hidden sm:flex space-x-4 items-center ml-4">
        <button
          onclick="location.href='/sesion/'"
          class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
        >
          Login
        </button>
        <button
          onclick="location.href='/registro/'"
          class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
        >
          Registro
        </button>
      </div>
      
      <!-- Carrito -->
      <div class="relative ml-4" id="cart-container">
        <button id="cart-toggle" class="focus:outline-none relative">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.2l1.3 6.4a2 2 0 002 1.6h12"/>
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
          </svg>
          <span id="cart-badge" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">0</span>
        </button>
        <div id="cart-dropdown" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 hidden">
          <p class="text-gray-700 font-semibold mb-2">Tu carrito</p>
          <ul id="cart-items" class="text-sm"></ul>
          <div class="mt-4 flex justify-between">
            <span class="font-bold">Total:</span>
            <span id="cart-total" class="font-bold">$0</span>
          </div>
          <button id="cart-clear" class="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition">
            Eliminar todos
          </button>
        </div>
      </div>
      
      <!-- Menú hamburguesa -->
      <button
        id="menu-toggle"
        class="sm:hidden focus:outline-none ml-4"
        aria-expanded="false"
        aria-label="Abrir menú"
      >
        <svg
          class="w-8 h-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  </div>
</header>
`;

  // Manejo del menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle?.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    mobileMenu?.classList.toggle("hidden");
  });
};

const crearNav = ()=>{
    navegation.innerHTML =`
        <!-- Encabezado -->
<header>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center h-16">
      
      <!-- Logo + Nombre con enlace -->
      <div class="flex items-center space-x-4">
        <a href="/principal/" class="flex items-center space-x-2">
          <img src="/img/favicon.png" alt="logo" class="h-8 w-8">
          <span class="font-semibold text-lg">ROSE</span>
        </a>
      </div>
      
      <!-- Barra de búsqueda: en móvil se centra (w-40), en desktop se alarga y alinea a la derecha (w-80) -->
      <div class="flex-1 flex justify-center sm:justify-end ml-4">
        <div class="relative w-40 sm:w-80">
          <input
            type="text"
            id="search-input"
            placeholder="Buscar productos..."
            class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
          >
          <!-- Icono de lupa -->
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z"
              clip-rule="evenodd"
            />
          </svg>
          <button 
            id="searchButton" 
            class="absolute right-0 top-0 px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
          >
            Buscar
          </button>
        </div>
      </div>
      
      <!-- Menú de escritorio (botones Login y Registro) -->
      <div class="hidden sm:flex space-x-4 items-center ml-4">
        <button
          onclick="location.href='/sesion/'"
          class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
        >
          Login
        </button>
        <button
          onclick="location.href='/registro/'"
          class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
        >
          Registro
        </button>
      </div>
      
      <!-- Ícono de carrito (visible en todas las resoluciones) -->
      <div class="relative ml-4" id="cart-container">
        <button id="cart-toggle" class="focus:outline-none relative">
          <!-- Icono de carrito (Heroicons) -->
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.2l1.3 6.4a2 2 0 002 1.6h12"
            />
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
          </svg>
          <!-- Badge con número de artículos -->
          <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </button>
        
        <!-- Menú desplegable del carrito (oculto por defecto) -->
        <div id="cart-dropdown" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 hidden">
          <p class="text-gray-700 font-semibold mb-2">Tu carrito</p>
          <ul class="text-sm">
            <li class="flex justify-between items-center border-b py-2">
              <span>Producto 1</span>
              <span>$10</span>
            </li>
            <li class="flex justify-between items-center border-b py-2">
              <span>Producto 2</span>
              <span>$15</span>
            </li>
          </ul>
          <div class="mt-4 flex justify-between">
            <span class="font-bold">Total:</span>
            <span class="font-bold">$25</span>
          </div>
          <button
            class="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
          >
            Eliminar todos
          </button>
        </div>
      </div>
      
      <!-- Ícono menú hamburguesa (visible solo en móvil) -->
      <button
        id="menu-toggle"
        class="sm:hidden focus:outline-none ml-4"
        aria-expanded="false"
        aria-label="Abrir menú"
      >
        <!-- Tres barras iguales -->
        <svg
          class="w-8 h-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      
    </div>
  </div>
  
  <!-- Menú desplegable en móviles (oculto por defecto) -->
  <div
    id="mobile-menu"
    class="sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2 hidden"
  >
    <button
      onclick="location.href='/sesion'"
      class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4"
    >
      Login
    </button>
    <button
      onclick="location.href='/registro'"
      class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
    >
      Registro
    </button>
  </div>
</header>
`
    // Manejo del menú hamburguesa
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    menuToggle.addEventListener("click",()=> {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        console.log('hola')
        menuToggle.setAttribute("aria-expanded", !isExpanded);
        mobileMenu.classList.toggle("hidden");
    });  

    // Funcionalidad carrito
    const cartToggle = document.getElementById("cart-toggle");
    const cartDropdown = document.getElementById("cart-dropdown");

    cartToggle.addEventListener("click", () => {
      cartDropdown.classList.toggle("hidden");
    });
}

const crearNavSesion = ()=>{
    navegation.innerHTML =`
    <!-- Encabezado -->
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-16">
          
         <!-- Logo + Nombre con enlace -->
      <div class="flex items-center space-x-4">
        <a href="/principal/" class="flex items-center space-x-2">
          <img src="/img/favicon.png" alt="logo" class="h-8 w-8">
          <span class="font-semibold text-lg">ROSE</span>
        </a>
      </div>
          
          <!-- Barra de búsqueda: en móvil se centra (w-40), en desktop se alarga y alinea a la derecha (w-80) -->
          <div class="flex-1 flex justify-center sm:justify-end ml-4">
            <div class="relative w-40 sm:w-80">
              <input
                type="text"
                id="search-input"
                placeholder="Buscar productos..."
                class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              >
              <!-- Icono de lupa -->
              <svg
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z"
                  clip-rule="evenodd"
                />
              </svg>
              <button 
                id="searchButton" 
                class="absolute right-0 top-0 px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
              >
                Buscar
              </button>
            </div>
          </div>
          
          <!-- Menú de escritorio (botones Login y Registro) -->
          <div class="hidden sm:flex space-x-4 items-center ml-4">
            <button
              onclick="location.href='/principal/'"
              class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
            >
              Principal
            </button>
            <button
              onclick="location.href='/registro/'"
              class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
            >
              Registro
            </button>
          </div>
          
          <!-- Ícono de carrito (visible en todas las resoluciones) -->
          <div class="relative ml-4" id="cart-container">
            <button id="cart-toggle" class="focus:outline-none relative">
              <!-- Icono de carrito (Heroicons) -->
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.2l1.3 6.4a2 2 0 002 1.6h12"
                />
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
              </svg>
              <!-- Badge con número de artículos -->
              <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            </button>
            
            <!-- Menú desplegable del carrito (oculto por defecto) -->
            <div id="cart-dropdown" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 hidden">
              <p class="text-gray-700 font-semibold mb-2">Tu carrito</p>
              <ul class="text-sm">
                <li class="flex justify-between items-center border-b py-2">
                  <span>Producto 1</span>
                  <span>$10</span>
                </li>
                <li class="flex justify-between items-center border-b py-2">
                  <span>Producto 2</span>
                  <span>$15</span>
                </li>
              </ul>
              <div class="mt-4 flex justify-between">
                <span class="font-bold">Total:</span>
                <span class="font-bold">$25</span>
              </div>
              <button
                class="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
              >
                Eliminar todos
              </button>
            </div>
          </div>
          
          <!-- Ícono menú hamburguesa (visible solo en móvil) -->
          <button
            id="menu-toggle"
            class="sm:hidden focus:outline-none ml-4"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <!-- Tres barras iguales -->
            <svg
              class="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          
        </div>
      </div>
      
      <!-- Menú desplegable en móviles (oculto por defecto) -->
      <div
        id="mobile-menu"
        class="sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2 hidden"
      >
        <button
          onclick="location.href='/principal'"
          class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4"
        >
          Principal
        </button>
        <button
          onclick="location.href='/registro'"
          class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
        >
          Registro
        </button>
      </div>
    </header>
    `
        // Manejo del menú hamburguesa
        const menuToggle = document.getElementById("menu-toggle");
        const mobileMenu = document.getElementById("mobile-menu");
    
        menuToggle.addEventListener("click",()=> {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            console.log('hola')
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            mobileMenu.classList.toggle("hidden");
        });  
    
        // Funcionalidad carrito
        const cartToggle = document.getElementById("cart-toggle");
        const cartDropdown = document.getElementById("cart-dropdown");
    
        cartToggle.addEventListener("click", () => {
          cartDropdown.classList.toggle("hidden");
        });
    }
    

const crearNavRegistro = ()=>{
    navegation.innerHTML =`
    <!-- Encabezado -->
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-16">
          
          <!-- Logo + Nombre con enlace -->
        <div class="flex items-center space-x-4">
            <a href="/principal/" class="flex items-center space-x-2">
            <img src="/img/favicon.png" alt="logo" class="h-8 w-8">
            <span class="font-semibold text-lg">ROSE</span>
            </a>
        </div>
          
          <!-- Barra de búsqueda: en móvil se centra (w-40), en desktop se alarga y alinea a la derecha (w-80) -->
          <div class="flex-1 flex justify-center sm:justify-end ml-4">
            <div class="relative w-40 sm:w-80">
              <input
                type="text"
                id="search-input"
                placeholder="Buscar productos..."
                class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              >
              <!-- Icono de lupa -->
              <svg
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z"
                  clip-rule="evenodd"
                />
              </svg>
              <button 
                id="searchButton" 
                class="absolute right-0 top-0 px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
              >
                Buscar
              </button>
            </div>
          </div>
          
          <!-- Menú de escritorio (botones Login y principal) -->
          <div class="hidden sm:flex space-x-4 items-center ml-4">
            <button
              onclick="location.href='/principal/'"
              class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
            >
              Principal
            </button>
            <button
              onclick="location.href='/sesion/'"
              class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
            >
              Login
            </button>
          </div>
          
          <!-- Ícono de carrito (visible en todas las resoluciones) -->
          <div class="relative ml-4" id="cart-container">
            <button id="cart-toggle" class="focus:outline-none relative">
              <!-- Icono de carrito (Heroicons) -->
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.2l1.3 6.4a2 2 0 002 1.6h12"
                />
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
              </svg>
              <!-- Badge con número de artículos -->
              <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            </button>
            
            <!-- Menú desplegable del carrito (oculto por defecto) -->
            <div id="cart-dropdown" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 hidden">
              <p class="text-gray-700 font-semibold mb-2">Tu carrito</p>
              <ul class="text-sm">
                <li class="flex justify-between items-center border-b py-2">
                  <span>Producto 1</span>
                  <span>$10</span>
                </li>
                <li class="flex justify-between items-center border-b py-2">
                  <span>Producto 2</span>
                  <span>$15</span>
                </li>
              </ul>
              <div class="mt-4 flex justify-between">
                <span class="font-bold">Total:</span>
                <span class="font-bold">$25</span>
              </div>
              <button
                class="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
              >
                Eliminar todos
              </button>
            </div>
          </div>
          
          <!-- Ícono menú hamburguesa (visible solo en móvil) -->
          <button
            id="menu-toggle"
            class="sm:hidden focus:outline-none ml-4"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <!-- Tres barras iguales -->
            <svg
              class="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          
        </div>
      </div>
      
      <!-- Menú desplegable en móviles (oculto por defecto) -->
      <div
        id="mobile-menu"
        class="sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2 hidden"
      >
        <button
          onclick="location.href='/principal'"
          class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4"
        >
          Principal
        </button>
        <button
          onclick="location.href='/registro'"
          class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
        >
          Registro
        </button>
      </div>
    </header>
    `
        // Manejo del menú hamburguesa
        const menuToggle = document.getElementById("menu-toggle");
        const mobileMenu = document.getElementById("mobile-menu");
    
        menuToggle.addEventListener("click",()=> {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            console.log('hola')
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            mobileMenu.classList.toggle("hidden");
        });  
    
        // Funcionalidad carrito
        const cartToggle = document.getElementById("cart-toggle");
        const cartDropdown = document.getElementById("cart-dropdown");
    
        cartToggle.addEventListener("click", () => {
          cartDropdown.classList.toggle("hidden");
        });
    }

const crearNavAdmin = ()=>{
    navegation.innerHTML =`
    <!-- Encabezado -->
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-16">
          
          <!-- Logo + Nombre con enlace -->
        <div class="flex items-center space-x-4">
            <a href="/principal/" class="flex items-center space-x-2">
            <img src="/img/favicon.png" alt="logo" class="h-8 w-8">
            <span class="font-semibold text-lg">ROSE</span>
            </a>
        </div>
          
          <!-- Barra de búsqueda: en móvil se centra (w-40), en desktop se alarga y alinea a la derecha (w-80) -->
          <div class="flex-1 flex justify-center sm:justify-end ml-4">
            <div class="relative w-40 sm:w-80">
              <input
                type="text"
                id="search-input"
                placeholder="Buscar productos..."
                class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              >
              <!-- Icono de lupa -->
              <svg
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z"
                  clip-rule="evenodd"
                />
              </svg>
              <button 
                id="searchButton" 
                class="absolute right-0 top-0 px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
              >
                Buscar
              </button>
            </div>
          </div>
          
          <!-- Menú de escritorio (botones Login y principal) -->
          <div class="hidden sm:flex space-x-4 items-center ml-4">
            <button
              onclick="location.href='/principal/'"
              class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
            >
              Principal
            </button>
            <button
              onclick="location.href='/admin/'"
              class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
            >
              Productos
            </button>
          </div>
          
          <!-- Ícono de carrito (visible en todas las resoluciones) -->
          <div class="relative ml-4" id="cart-container">
            <button id="cart-toggle" class="focus:outline-none relative">
              <!-- Icono de carrito (Heroicons) -->
            <svg xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              class="size-6">
              <path stroke-linecap="round" 
              stroke-linejoin="round" 
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>

              <!-- Badge con número de artículos -->
              <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            </button>
            
            <!-- Menú desplegable de notificaciones (oculto por defecto) -->
            <div id="cart-dropdown" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 hidden">
              <p class="text-gray-700 font-semibold mb-2">Tus notificaciones</p>
              <ul class="text-sm">
                <li class="flex justify-between items-center border-b py-2">
                  <span>Producto 1</span>
                  <span>$10</span>
                </li>
                <li class="flex justify-between items-center border-b py-2">
                  <span>Producto 2</span>
                  <span>$15</span>
                </li>
              </ul>
              <div class="mt-4 flex justify-between">
                <span class="font-bold">Total:</span>
                <span class="font-bold">$25</span>
              </div>
              <button
                class="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
              >
                Eliminar todas
              </button>
            </div>
          </div>
          
          <!-- Ícono menú hamburguesa (visible solo en móvil) -->
          <button
            id="menu-toggle"
            class="sm:hidden focus:outline-none ml-4"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <!-- Tres barras iguales -->
            <svg
              class="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          
        </div>
      </div>
      
      <!-- Menú desplegable en móviles (oculto por defecto) -->
      <div
        id="mobile-menu"
        class="sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2 hidden"
      >
        <button
          onclick="location.href='/principal'"
          class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4"
        >
          Principal
        </button>
        <button
          onclick="location.href='/registro'"
          class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
        >
          Registro
        </button>
      </div>
    </header>
    `
        // Manejo del menú hamburguesa
        const menuToggle = document.getElementById("menu-toggle");
        const mobileMenu = document.getElementById("mobile-menu");
    
        menuToggle.addEventListener("click",()=> {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            console.log('hola')
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            mobileMenu.classList.toggle("hidden");
        });  
    
        // Funcionalidad de las notificaciones
        const cartToggle = document.getElementById("cart-toggle");
        const cartDropdown = document.getElementById("cart-dropdown");
    
        cartToggle.addEventListener("click", () => {
          cartDropdown.classList.toggle("hidden");
        });
}

const crearNavCanje = ()=>{
    navegation.innerHTML =`
    <!-- Encabezado -->
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-16">
          
          <!-- Logo + Nombre con enlace -->
            <div class="flex items-center space-x-4">
                <a href="/principal/" class="flex items-center space-x-2">
                <img src="/img/favicon.png" alt="logo" class="h-8 w-8">
                <span class="font-semibold text-lg">ROSE</span>
                </a>
            </div>
          
          <!-- Barra de búsqueda: en móvil se centra (w-40), en desktop se alarga y alinea a la derecha (w-80) -->
          <div class="flex-1 flex justify-center sm:justify-end ml-4">
            <div class="relative w-40 sm:w-80">
              <input
                type="text"
                id="search-input"
                placeholder="Buscar productos..."
                class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              >
              <!-- Icono de lupa -->
              <svg
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z"
                  clip-rule="evenodd"
                />
              </svg>
              <button 
                id="searchButton" 
                class="absolute right-0 top-0 px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
              >
                Buscar
              </button>
            </div>
          </div>
          
          <!-- Menú de escritorio (botones Login y Registro) -->
          <div class="hidden sm:flex space-x-4 items-center ml-4">
            <button
              onclick="location.href='/principal/'"
              class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
            >
              Principal
            </button>
            <button
              onclick="location.href='/perfil/'"
              class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
            >
              Perfil
            </button>
            <button
              onclick="location.href='/donaciones/'"
              class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
            >
              Donaciones
            </button>
          </div>
          
          <!-- Ícono de carrito (visible en todas las resoluciones) -->
          <div class="relative ml-4" id="cart-container">
            <button id="cart-toggle" class="focus:outline-none relative">
              <!-- Icono de carrito (Heroicons) -->
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.2l1.3 6.4a2 2 0 002 1.6h12"
                />
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
              </svg>
              <!-- Badge con número de artículos -->
              <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            </button>
            
            <!-- Menú desplegable del carrito (oculto por defecto) -->
            <div id="cart-dropdown" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 hidden">
              <p class="text-gray-700 font-semibold mb-2">Tu carrito</p>
              <ul class="text-sm">
                <li class="flex justify-between items-center border-b py-2">
                  <span>Producto 1</span>
                  <span>$10</span>
                </li>
                <li class="flex justify-between items-center border-b py-2">
                  <span>Producto 2</span>
                  <span>$15</span>
                </li>
              </ul>
              <div class="mt-4 flex justify-between">
                <span class="font-bold">Total:</span>
                <span class="font-bold">$25</span>
              </div>
              <button
                class="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
              >
                Eliminar todos
              </button>
            </div>
          </div>
          
          <!-- Ícono menú hamburguesa (visible solo en móvil) -->
          <button
            id="menu-toggle"
            class="sm:hidden focus:outline-none ml-4"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <!-- Tres barras iguales -->
            <svg
              class="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          
        </div>
      </div>
      
      <!-- Menú desplegable en móviles (oculto por defecto) -->
      <div
        id="mobile-menu"
        class="sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2 hidden"
      >
        <button
          onclick="location.href='/principal'"
          class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4"
        >
          Principal
        </button>
        <button
          onclick="location.href='/perfil'"
          class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
        >
          Perfil
        </button>
        <button
          onclick="location.href='/donaciones'"
          class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
        >
          Donaciones
        </button>
      </div>
    </header>
    `
        // Manejo del menú hamburguesa
        const menuToggle = document.getElementById("menu-toggle");
        const mobileMenu = document.getElementById("mobile-menu");
    
        menuToggle.addEventListener("click",()=> {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            console.log('hola')
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            mobileMenu.classList.toggle("hidden");
        });  
    
        // Funcionalidad carrito
        const cartToggle = document.getElementById("cart-toggle");
        const cartDropdown = document.getElementById("cart-dropdown");
    
        cartToggle.addEventListener("click", () => {
          cartDropdown.classList.toggle("hidden");
        });
    }

const crearNavDonaciones = ()=>{
    navegation.innerHTML =`
    <!-- Encabezado -->
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-16">
          
          <!-- Logo + Nombre con enlace -->
            <div class="flex items-center space-x-4">
                <a href="/principal/" class="flex items-center space-x-2">
                <img src="/img/favicon.png" alt="logo" class="h-8 w-8">
                <span class="font-semibold text-lg">ROSE</span>
                </a>
            </div>
          
          <!-- Barra de búsqueda: en móvil se centra (w-40), en desktop se alarga y alinea a la derecha (w-80) -->
          <div class="flex-1 flex justify-center sm:justify-end ml-4">
            <div class="relative w-40 sm:w-80">
              <input
                type="text"
                id="search-input"
                placeholder="Buscar productos..."
                class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              >
              <!-- Icono de lupa -->
              <svg
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z"
                  clip-rule="evenodd"
                />
              </svg>
              <button 
                id="searchButton" 
                class="absolute right-0 top-0 px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
              >
                Buscar
              </button>
            </div>
          </div>
          
          <!-- Menú de escritorio (botones Login y Registro) -->
          <div class="hidden sm:flex space-x-4 items-center ml-4">
            <button
              onclick="location.href='/principal/'"
              class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
            >
              Principal
            </button>
            <button
              onclick="location.href='/perfil/'"
              class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
            >
              Perfil
            </button>
          </div>
          
          <!-- Ícono de carrito (visible en todas las resoluciones) -->
          <div class="relative ml-4" id="cart-container">
            <button id="cart-toggle" class="focus:outline-none relative">
              <!-- Icono de carrito (Heroicons) -->
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.2l1.3 6.4a2 2 0 002 1.6h12"
                />
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
              </svg>
              <!-- Badge con número de artículos -->
              <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            </button>
            
            <!-- Menú desplegable del carrito (oculto por defecto) -->
            <div id="cart-dropdown" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 hidden">
              <p class="text-gray-700 font-semibold mb-2">Tu carrito</p>
              <ul class="text-sm">
                <li class="flex justify-between items-center border-b py-2">
                  <span>Producto 1</span>
                  <span>$10</span>
                </li>
                <li class="flex justify-between items-center border-b py-2">
                  <span>Producto 2</span>
                  <span>$15</span>
                </li>
              </ul>
              <div class="mt-4 flex justify-between">
                <span class="font-bold">Total:</span>
                <span class="font-bold">$25</span>
              </div>
              <button
                class="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
              >
                Eliminar todos
              </button>
            </div>
          </div>
          
          <!-- Ícono menú hamburguesa (visible solo en móvil) -->
          <button
            id="menu-toggle"
            class="sm:hidden focus:outline-none ml-4"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <!-- Tres barras iguales -->
            <svg
              class="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          
        </div>
      </div>
      
      <!-- Menú desplegable en móviles (oculto por defecto) -->
      <div
        id="mobile-menu"
        class="sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2 hidden"
      >
        <button
          onclick="location.href='/principal'"
          class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4"
        >
          Principal
        </button>
        <button
          onclick="location.href='/perfil'"
          class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
        >
          Perfil
        </button>
         <button
          onclick="location.href='/canje'"
          class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
        >
          Canje
        </button>
      </div>
    </header>
    `
        // Manejo del menú hamburguesa
        const menuToggle = document.getElementById("menu-toggle");
        const mobileMenu = document.getElementById("mobile-menu");
    
        menuToggle.addEventListener("click",()=> {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            console.log('hola')
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            mobileMenu.classList.toggle("hidden");
        });  
    
        // Funcionalidad carrito
        const cartToggle = document.getElementById("cart-toggle");
        const cartDropdown = document.getElementById("cart-dropdown");
    
        cartToggle.addEventListener("click", () => {
          cartDropdown.classList.toggle("hidden");
        });
    }


  const crearNavDonar = ()=>{
    navegation.innerHTML =`
    <!-- Encabezado -->
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-16">
          
          <!-- Logo + Nombre con enlace -->
            <div class="flex items-center space-x-4">
                <a href="/principal/" class="flex items-center space-x-2">
                <img src="/img/favicon.png" alt="logo" class="h-8 w-8">
                <span class="font-semibold text-lg">ROSE</span>
                </a>
            </div>
          
          <!-- Barra de búsqueda: en móvil se centra (w-40), en desktop se alarga y alinea a la derecha (w-80) -->
          <div class="flex-1 flex justify-center sm:justify-end ml-4">
            <div class="relative w-40 sm:w-80">
              <input
                type="text"
                id="search-input"
                placeholder="Buscar productos..."
                class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              >
              <!-- Icono de lupa -->
              <svg
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z"
                  clip-rule="evenodd"
                />
              </svg>
              <button 
                id="searchButton" 
                class="absolute right-0 top-0 px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
              >
                Buscar
              </button>
            </div>
          </div>
          
          <!-- Menú de escritorio (botones Login y Registro) -->
          <div class="hidden sm:flex space-x-4 items-center ml-4">
            <button
              onclick="location.href='/principal/'"
              class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
            >
              Principal
            </button>
            <button
              onclick="location.href='/perfil/'"
              class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
            >
              Perfil
            </button>
          </div>
          
          <!-- Ícono de carrito (visible en todas las resoluciones) -->
          <div class="relative ml-4" id="cart-container">
            <button id="cart-toggle" class="focus:outline-none relative">
              <!-- Icono de carrito (Heroicons) -->
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.2l1.3 6.4a2 2 0 002 1.6h12"
                />
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
              </svg>
              <!-- Badge con número de artículos -->
              <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            </button>
            
            <!-- Menú desplegable del carrito (oculto por defecto) -->
            <div id="cart-dropdown" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 hidden">
              <p class="text-gray-700 font-semibold mb-2">Tu carrito</p>
              <ul class="text-sm">
                <li class="flex justify-between items-center border-b py-2">
                  <span>Producto 1</span>
                  <span>$10</span>
                </li>
                <li class="flex justify-between items-center border-b py-2">
                  <span>Producto 2</span>
                  <span>$15</span>
                </li>
              </ul>
              <div class="mt-4 flex justify-between">
                <span class="font-bold">Total:</span>
                <span class="font-bold">$25</span>
              </div>
              <button
                class="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
              >
                Eliminar todos
              </button>
            </div>
          </div>
          
          <!-- Ícono menú hamburguesa (visible solo en móvil) -->
          <button
            id="menu-toggle"
            class="sm:hidden focus:outline-none ml-4"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <!-- Tres barras iguales -->
            <svg
              class="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          
        </div>
      </div>
      
      <!-- Menú desplegable en móviles (oculto por defecto) -->
      <div
        id="mobile-menu"
        class="sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2 hidden"
      >
        <button
          onclick="location.href='/principal'"
          class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4"
        >
          Principal
        </button>
        <button
          onclick="location.href='/perfil'"
          class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
        >
          Perfil
        </button>
          <button
          onclick="location.href='/canje'"
          class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
        >
          Canje
        </button>
      </div>
    </header>
    `
        // Manejo del menú hamburguesa
        const menuToggle = document.getElementById("menu-toggle");
        const mobileMenu = document.getElementById("mobile-menu");
    
        menuToggle.addEventListener("click",()=> {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            console.log('hola')
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            mobileMenu.classList.toggle("hidden");
        });  
    
        // Funcionalidad carrito
        const cartToggle = document.getElementById("cart-toggle");
        const cartDropdown = document.getElementById("cart-dropdown");
    
        cartToggle.addEventListener("click", () => {
          cartDropdown.classList.toggle("hidden");
        });
}


const crearNavRecibirDonacion = ()=>{
  navegation.innerHTML =`
  <!-- Encabezado -->
  <header>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center h-16">
        
        <!-- Logo + Nombre con enlace -->
          <div class="flex items-center space-x-4">
              <a href="/principal/" class="flex items-center space-x-2">
              <img src="/img/favicon.png" alt="logo" class="h-8 w-8">
              <span class="font-semibold text-lg">ROSE</span>
              </a>
          </div>
        
        <!-- Barra de búsqueda: en móvil se centra (w-40), en desktop se alarga y alinea a la derecha (w-80) -->
        <div class="flex-1 flex justify-center sm:justify-end ml-4">
          <div class="relative w-40 sm:w-80">
            <input
              type="text"
              id="search-input"
              placeholder="Buscar productos..."
              class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
            >
            <!-- Icono de lupa -->
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z"
                clip-rule="evenodd"
              />
            </svg>
            <button 
              id="searchButton" 
              class="absolute right-0 top-0 px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
            >
              Buscar
            </button>
          </div>
        </div>
        
        <!-- Menú de escritorio (botones Login y Registro) -->
        <div class="hidden sm:flex space-x-4 items-center ml-4">
          <button
            onclick="location.href='/principal/'"
            class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
          >
            Principal
          </button>
          <button
            onclick="location.href='/perfil/'"
            class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
          >
            Perfil
          </button>
        </div>
        
        <!-- Ícono de carrito (visible en todas las resoluciones) -->
        <div class="relative ml-4" id="cart-container">
          <button id="cart-toggle" class="focus:outline-none relative">
            <!-- Icono de carrito (Heroicons) -->
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.2l1.3 6.4a2 2 0 002 1.6h12"
              />
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
            </svg>
            <!-- Badge con número de artículos -->
            <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
          </button>
          
          <!-- Menú desplegable del carrito (oculto por defecto) -->
          <div id="cart-dropdown" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 hidden">
            <p class="text-gray-700 font-semibold mb-2">Tu carrito</p>
            <ul class="text-sm">
              <li class="flex justify-between items-center border-b py-2">
                <span>Producto 1</span>
                <span>$10</span>
              </li>
              <li class="flex justify-between items-center border-b py-2">
                <span>Producto 2</span>
                <span>$15</span>
              </li>
            </ul>
            <div class="mt-4 flex justify-between">
              <span class="font-bold">Total:</span>
              <span class="font-bold">$25</span>
            </div>
            <button
              class="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
            >
              Eliminar todos
            </button>
          </div>
        </div>
        
        <!-- Ícono menú hamburguesa (visible solo en móvil) -->
        <button
          id="menu-toggle"
          class="sm:hidden focus:outline-none ml-4"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <!-- Tres barras iguales -->
          <svg
            class="w-8 h-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        
      </div>
    </div>
    
    <!-- Menú desplegable en móviles (oculto por defecto) -->
    <div
      id="mobile-menu"
      class="sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2 hidden"
    >
      <button
        onclick="location.href='/principal'"
        class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4"
      >
        Principal
      </button>
      <button
        onclick="location.href='/perfil'"
        class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
      >
        Perfil
      </button>
        <button
        onclick="location.href='/canje'"
        class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
      >
        Canje
      </button>
    </div>
  </header>
  `
      // Manejo del menú hamburguesa
      const menuToggle = document.getElementById("menu-toggle");
      const mobileMenu = document.getElementById("mobile-menu");
  
      menuToggle.addEventListener("click",()=> {
          const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
          console.log('hola')
          menuToggle.setAttribute("aria-expanded", !isExpanded);
          mobileMenu.classList.toggle("hidden");
      });  
  
      // Funcionalidad carrito
      const cartToggle = document.getElementById("cart-toggle");
      const cartDropdown = document.getElementById("cart-dropdown");
  
      cartToggle.addEventListener("click", () => {
        cartDropdown.classList.toggle("hidden");
      });
  }


const crearNavDasboard = ()=>{
    navegation.innerHTML =`
    <!-- Encabezado -->
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-16">
          
           <!-- Logo + Nombre con enlace -->
          <div class="flex items-center space-x-4">
            <a href="/principal/" class="flex items-center space-x-2">
              <img src="/img/favicon.png" alt="logo" class="h-8 w-8">
              <span class="font-semibold text-lg">ROSE</span>
            </a>
          </div>
          
          <!-- Barra de búsqueda: en móvil se centra (w-40), en desktop se alarga y alinea a la derecha (w-80) -->
          <div class="flex-1 flex justify-center sm:justify-end ml-4">
            <div class="relative w-40 sm:w-80">
              <input
                type="text"
                id="search-input"
                placeholder="Buscar productos..."
                class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              >
              <!-- Icono de lupa -->
              <svg
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z"
                  clip-rule="evenodd"
                />
              </svg>
              <button 
                id="searchButton" 
                class="absolute right-0 top-0 px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
              >
                Buscar
              </button>
            </div>
          </div>
          
          <!-- Menú de escritorio (botones Login y Registro) -->
          <div class="hidden sm:flex space-x-4 items-center ml-4">
            <button
              onclick="location.href='/donaciones/'"
              class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
            >
              Donaciones
            </button>
            <button
              onclick="location.href='/canje/'"
              class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
            >
              Canjeo
            </button>
            <button
              onclick="location.href='/perfil/'"
              class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
            >
              Perfil
            </button>
          </div>
          
        <div class="relative ml-4" id="cart-container">
            <button id="cart-toggle" class="focus:outline-none relative">
                <!-- Icono de carrito (Heroicons) -->
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.2l1.3 6.4a2 2 0 002 1.6h12"/>
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                </svg>
                <!-- Badge con número de artículos (agregamos id="cart-badge") -->
                <span id="cart-badge" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">0</span>
            </button>
    
    
            <!-- Menú desplegable del carrito (agregamos id="cart-items" para la lista) -->
                <div id="cart-dropdown" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 hidden">
                    <p class="text-gray-700 font-semibold mb-2">Tu carrito</p>
                    <ul id="cart-items" class="text-sm">
                        <!-- Aquí se inyectarán los productos -->
                    </ul>
                    <div class="mt-4 flex justify-between">
                        <span class="font-bold">Total:</span>
                        <span id="cart-total" class="font-bold">$0</span>
                    </div>
                    <button id="cart-clear" class="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition">
                        Eliminar todos
                    </button>
                </div>
          
          <!-- Ícono menú hamburguesa (visible solo en móvil) -->
          <button
            id="menu-toggle"
            class="sm:hidden focus:outline-none ml-4"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <!-- Tres barras iguales -->
            <svg
              class="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          
        </div>
      </div>
      
      <!-- Menú desplegable en móviles (oculto por defecto) -->
      <div
        id="mobile-menu"
        class="sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2"
      >
        <button
          onclick="location.href='/donaciones'"
          class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4"
        >
          Donaciones
        </button>
        <button
          onclick="location.href='/canje'"
          class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
        >
          Canjeo
        </button>
         <button
          onclick="location.href='/perfil'"
          class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
        >
          Perfil
        </button>
      </div>
    </header>
    `
        // Manejo del menú hamburguesa
        const menuToggle = document.getElementById("menu-toggle");
        const mobileMenu = document.getElementById("mobile-menu");
    
        menuToggle.addEventListener("click",()=> {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            console.log('hola')
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            mobileMenu.classList.toggle("hidden");
        });  
    
        // Funcionalidad carrito
        const cartToggle = document.getElementById("cart-toggle");
        const cartDropdown = document.getElementById("cart-dropdown");
    
        cartToggle.addEventListener("click", () => {
          cartDropdown.classList.toggle("hidden");
        });
    }
    
const crearNavPerfil = ()=>{
    navegation.innerHTML =`
           <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center space-x-4">
                    <img src="/img/favicon.png" alt="logo" class="h-8 w-8">
                    <span class="font-semibold text-lg">ROSE</span>
                </div>

                 <!-- Menú de escritorio -->
                <div class="hidden sm:flex space-x-6 items-center">
                    <button onclick="location.href='/donaciones/'" class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition">
                        Donaciones
                    </button>
                    <button onclick="location.href='/canje/' "class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition">
                        Canje
                    </button>
                     <button onclick="location.href='/principal/'" class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition">
                        Principal
                    </button>
                </div>

                <!-- Barra de búsqueda con icono de lupa -->
                <div class="relative flex w-full sm:w-auto max-w-lg">
                    <input type="text" id="search-input" placeholder="Buscar productos..."
                        class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all">
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" 
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z" clip-rule="evenodd"/>
                    </svg>
                    <button 
                      id="searchButton" 
                      class="absolute right-0 top-0 px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
                    >
                      Buscar
                    </button>
                </div>


                <!-- Icono del menú hamburguesa (visible solo en móviles) -->
                <button id="menu-toggle" class="sm:hidden focus:outline-none" aria-expanded="false" aria-label="Abrir menú">
                    <svg class="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Menú desplegable en móviles -->
        <div id="mobile-menu" class="sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2">
            <button onclick="location.href='/donaciones'" class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4">
                Donaciones
            </button>
            <button onclick="location.href='/canje'" class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4">
                Canje
            </button>
        </div>
`
    // Manejo del menú hamburguesa
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    menuToggle.addEventListener("click",()=> {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        console.log('hola')
        menuToggle.setAttribute("aria-expanded", !isExpanded);
        mobileMenu.classList.toggle("hidden");
    });
}

const crearNavProducto = ()=>{
  navegation.innerHTML =`
<!-- Encabezado -->
<header>
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="flex items-center h-16">
    
     <!-- Logo + Nombre con enlace -->
    <div class="flex items-center space-x-4">
      <a href="/principal/" class="flex items-center space-x-2">
        <img src="/img/favicon.png" alt="logo" class="h-8 w-8">
        <span class="font-semibold text-lg">ROSE</span>
      </a>
    </div>
    
    <!-- Barra de búsqueda: en móvil se centra (w-40), en desktop se alarga y alinea a la derecha (w-80) -->
    <div class="flex-1 flex justify-center sm:justify-end ml-4">
      <div class="relative w-40 sm:w-80">
        <input
          type="text"
          id="search-input"
          placeholder="Buscar productos..."
          class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
        >
        <!-- Icono de lupa -->
        <svg
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z"
            clip-rule="evenodd"
          />
        </svg>
        <button 
            id="searchButton" 
            class="absolute right-0 top-0 px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
          >
            Buscar
        </button>
      </div>
    </div>
    
    <!-- Menú de escritorio (botones Login y Registro) -->
    <div class="hidden sm:flex space-x-4 items-center ml-4">
      <button
        onclick="location.href='/sesion/'"
        class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
      >
        Login
      </button>
      <button
        onclick="location.href='/registro/'"
        class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
      >
        Registro
      </button>
    </div>
    
  <div class="relative ml-4" id="cart-container">
      <button id="cart-toggle" class="focus:outline-none relative">
          <!-- Icono de carrito (Heroicons) -->
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.2l1.3 6.4a2 2 0 002 1.6h12"/>
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          </svg>
          <!-- Badge con número de artículos (agregamos id="cart-badge") -->
          <span id="cart-badge" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">0</span>
      </button>


      <!-- Menú desplegable del carrito (agregamos id="cart-items" para la lista) -->
          <div id="cart-dropdown" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 hidden">
              <p class="text-gray-700 font-semibold mb-2">Tu carrito</p>
              <ul id="cart-items" class="text-sm">
                  <!-- Aquí se inyectarán los productos -->
              </ul>
              <div class="mt-4 flex justify-between">
                  <span class="font-bold">Total:</span>
                  <span id="cart-total" class="font-bold">$0</span>
              </div>
              <button id="cart-clear" class="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition">
                  Eliminar todos
              </button>
          </div>
    
    <!-- Ícono menú hamburguesa (visible solo en móvil) -->
    <button
      id="menu-toggle"
      class="sm:hidden focus:outline-none ml-4"
      aria-expanded="false"
      aria-label="Abrir menú"
    >
      <!-- Tres barras iguales -->
      <svg
        class="w-8 h-8 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
    
  </div>
</div>

<!-- Menú desplegable en móviles (oculto por defecto) -->
<div
  id="mobile-menu"
  class="sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2"
>
  <button
    onclick="location.href='/sesion'"
    class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4"
  >
    Login
  </button>
  <button
    onclick="location.href='/registro'"
    class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4"
  >
    Registro
  </button>
</div>
</header>
`
  // Manejo del menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click",()=> {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      console.log('hola')
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.classList.toggle("hidden");
  });  

  // Funcionalidad carrito
  const cartToggle = document.getElementById("cart-toggle");
  const cartDropdown = document.getElementById("cart-dropdown");

  cartToggle.addEventListener("click", () => {
    cartDropdown.classList.toggle("hidden");
  });
}


//con esto discrimino si estoy en una pagina u otra
//agrego la ruta para los componentes
if(window.location.pathname === '/principal/'){
//crear la barra de navegacion para la pagina principal 
    crearNavPrincipal();
}else if(window.location.pathname === '/sesion/'){
//Crear la pagina de navegacion de inicio de sesion
    crearNavSesion()
}else if(window.location.pathname === '/registro/'){
//Crear la pagina de navegacion de registro 
    crearNavRegistro()
}else if(window.location.pathname === '/donaciones/'){
    crearNavDonaciones()
}else if(window.location.pathname === '/canje/'){
    crearNavCanje()
}else if(window.location.pathname === '/admin/'){
    crearNavAdmin()
}else if(window.location.pathname === '/dashboard/'){
    crearNavDasboard()
}else if(window.location.pathname === '/perfil/'){
    crearNavPerfil()
}else if(window.location.pathname === '/'){
    crearNav()
}else if(window.location.pathname === '/recibirDonacion/'){
  crearNavRecibirDonacion()
}else if(window.location.pathname === '/donar/'){
  crearNavDonar()
}else if(window.location.pathname === '/producto/'){
  crearNavProducto()
}