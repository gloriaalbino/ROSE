/*****************************************************
 * ARRAY DE PRODUCTOS (CON 13 MEDICAMENTOS)
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
   * VARIABLES GLOBALES PARA EL CARRITO
   *****************************************************/
  let cartItems = []; // Array para almacenar los productos agregados al carrito
  
  /*****************************************************
   * EVENTO PRINCIPAL: DOMContentLoaded
   *****************************************************/
  document.addEventListener("DOMContentLoaded", function() {
    // 1. Renderizar productos en la sección principal
    mostrarProductos();
  
    // 2. Configurar carrusel
    configurarCarrusel();
  
    // 3. Configurar eventos del carrito
    configurarCarrito();
  
    // 4. (Opcional) Configurar menú hamburguesa para cerrar carrito, etc.
    //     Por ejemplo: document.getElementById("menu-toggle")?.addEventListener("click", () => {
    //       document.getElementById("cart-dropdown")?.classList.add("hidden");
    //     });
  });
  
  /*****************************************************
   * 1. MOSTRAR PRODUCTOS EN LA SECCIÓN PRINCIPAL
   *****************************************************/
  function mostrarProductos() {
    // Tomamos 12 productos aleatorios
    const shuffledProductos = [...productos].sort(() => 0.5 - Math.random()).slice(0, 12);
    
    // Contenedor principal de productos
    const container = document.getElementById("productos-container");
    if (!container) return; // Evitar errores si no existe el contenedor
    container.innerHTML = "";
  
    // Crear tarjetas
    shuffledProductos.forEach(producto => {
      const card = document.createElement("div");
      card.className = "bg-white shadow-md rounded-lg p-4 flex flex-col justify-between";
      
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="h-40 w-auto object-cover rounded mb-2 mx-auto">
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
        alert(`Detalles de ${producto.nombre} aún no implementados.`);
      });
    });
  }
  
  /*****************************************************
   * 2. CONFIGURAR EL CARRUSEL (3 PRODUCTOS A LA VEZ)
   *****************************************************/
  function configurarCarrusel() {
    const carruselContainer = document.getElementById("carrusel");
    if (!carruselContainer) return; // Evitar errores si no existe el carrusel
    
    // Tomamos 12 productos aleatorios, y los duplicamos para el efecto "infinito"
    const shuffledProductos = [...productos].sort(() => 0.5 - Math.random()).slice(0, 12);
    const carruselProductos = [...shuffledProductos, ...shuffledProductos];
  
    carruselContainer.innerHTML = "";
  
    // Crear slides de 3 en 3
    for (let i = 0; i < carruselProductos.length; i += 3) {
      const slide = document.createElement("div");
      slide.className = "w-full flex justify-center items-center flex-shrink-0 space-x-4";
      
      slide.innerHTML = carruselProductos.slice(i, i + 3).map(prod => `
        <div class="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-1/3">
          <img src="${prod.imagen}" alt="${prod.nombre}" class="h-32 w-auto object-cover rounded-lg shadow-md mb-2">
          <h2 class="text-lg font-medium text-purple-700">${prod.nombre}</h2>
        </div>
      `).join('');
      
      carruselContainer.appendChild(slide);
    }
  
    // Lógica de desplazamiento
    let index = 0;
    function moveCarousel() {
      index++;
      carruselContainer.style.transition = "transform 0.5s ease-in-out";
      carruselContainer.style.transform = `translateX(-${index * 100}%)`;
      
      if (index >= carruselProductos.length / 3) {
        setTimeout(() => {
          carruselContainer.style.transition = "none";
          index = 0;
          carruselContainer.style.transform = "translateX(0)";
        }, 500);
      }
    }
    
    // Autoplay cada 3 segundos
    const intervalId = setInterval(moveCarousel, 3000);
  
    // Botones "prev" y "next"
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        moveCarousel();
        // Reiniciar el autoplay (opcional)
        clearInterval(intervalId);
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        index = (index - 1 + carruselProductos.length / 3) % (carruselProductos.length / 3);
        carruselContainer.style.transition = "transform 0.5s ease-in-out";
        carruselContainer.style.transform = `translateX(-${index * 100}%)`;
        clearInterval(intervalId);
      });
    }
  }
  
  /*****************************************************
   * 3. CONFIGURAR CARRITO
   *****************************************************/
  function configurarCarrito() {
    // Badge para mostrar la cantidad de artículos
    const cartBadge = document.getElementById("cart-badge");
    // Lista de items en el carrito
    const cartItemsList = document.getElementById("cart-items");
    // Botón para vaciar el carrito
    const cartClearBtn = document.getElementById("cart-clear");
    // Botón/ícono para abrir/cerrar el carrito
    const cartToggle = document.getElementById("cart-toggle");
    // Dropdown del carrito
    const cartDropdown = document.getElementById("cart-dropdown");
  
    // Evitar errores si no existen estos elementos en el HTML
    if (!cartBadge || !cartItemsList || !cartClearBtn || !cartToggle || !cartDropdown) {
      return;
    }
  
    // Al hacer clic en "Eliminar todos"
    cartClearBtn.addEventListener("click", () => {
      cartItems = [];
      actualizarCarritoUI();
    });
  
    // Al hacer clic en el ícono de carrito
    cartToggle.addEventListener("click", () => {
      // Alternar la visibilidad del dropdown
      cartDropdown.classList.toggle("hidden");
      // (Opcional) Cerrar el menú móvil si está abierto
      // document.getElementById("mobile-menu")?.classList.add("hidden");
    });
  
    // Actualizar la UI del carrito al inicio
    actualizarCarritoUI();
  }
  
  /*****************************************************
   * 4. AGREGAR AL CARRITO
   *****************************************************/
  function agregarAlCarrito(producto) {
    cartItems.push(producto);
    actualizarCarritoUI();
  }
  
  /*****************************************************
   * 5. ACTUALIZAR LA INTERFAZ DEL CARRITO
   *****************************************************/
  function actualizarCarritoUI() {
    // Actualizar badge
    const cartBadge = document.getElementById("cart-badge");
    if (cartBadge) {
      cartBadge.innerText = cartItems.length;
    }
  
    // Actualizar lista de items
    const cartItemsList = document.getElementById("cart-items");
    if (cartItemsList) {
      cartItemsList.innerHTML = "";
      
      cartItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center border-b py-2";
        li.innerHTML = `
          <span>${item.nombre}</span>
          <button class="text-red-500 hover:text-red-700" data-index="${index}">X</button>
        `;
        cartItemsList.appendChild(li);
      });
  
      // Agregar eventos para remover cada producto
      const removeBtns = cartItemsList.querySelectorAll("button[data-index]");
      removeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-index"));
          cartItems.splice(idx, 1);
          actualizarCarritoUI();
        });
      });
    }
  }
  