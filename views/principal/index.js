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
 * 1. INYECTAR EVENTOS DESPUÉS DE QUE EL NAVBAR ESTÉ LISTO
 *****************************************************/
document.addEventListener("DOMContentLoaded", () => {
  // Esperar a que el navbar se inyecte
  const checkNavbar = setInterval(() => {
    const searchBar = document.getElementById("searchBar");
    const searchButton = document.getElementById("searchButton");

    if (searchBar && searchButton) {
      clearInterval(checkNavbar); // Detener el intervalo una vez que los elementos existan

      // Evento para manejar la búsqueda al hacer clic en el botón
      searchButton.addEventListener("click", () => {
        const query = searchBar.value.toLowerCase(); // Obtener el texto ingresado y convertirlo a minúsculas

        // Buscar el producto en el array de productos
        const productoEncontrado = productos.find((producto) =>
          producto.nombre.toLowerCase().includes(query)
        );

        if (productoEncontrado) {
          // Redirigir a la página de producto con el ID del producto encontrado
          window.location.href = `/producto/index.html?id=${productoEncontrado.id}`;
        } else {
          // Mostrar un mensaje si no se encuentra el producto
          alert("Producto no encontrado. Por favor, verifica el nombre.");
        }
      });

      // También puedes buscar al presionar "Enter" en la barra de búsqueda
      searchBar.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          const query = searchBar.value.toLowerCase();
          const productoEncontrado = productos.find((producto) =>
            producto.nombre.toLowerCase().includes(query)
          );

          if (productoEncontrado) {
            window.location.href = `/producto/index.html?id=${productoEncontrado.id}`;
          } else {
            alert("Producto no encontrado. Por favor, verifica el nombre.");
          }
        }
      });
    }
  }, 100); // Revisar cada 100ms si el navbar está listo

  // Configurar el carrito y mostrar productos
  configurarCarrito();
  mostrarProductos();
  configurarCarrusel();
});

/*****************************************************
 * 2. ARRAY DE PRODUCTOS (13 medicamentos)
 *****************************************************/
const productos = [
  { nombre: "Trastuzumab", concentracion: "150 mg/7.2 mL", forma: "Solución inyectable", lote: "TZ202401", precio: "170$", imagen: "img/trastuzumab.png", ubicacion: "La Urbina, Caracas", latitud: 10.4982, longitud: -66.8889 },
  { nombre: "Pertuzumab", concentracion: "420 mg/14 mL", forma: "Solución inyectable", lote: "PZ202402", precio: "6$", imagen: "img/pertuzumab.png", ubicacion: "Altamira, Caracas", latitud: 10.4807, longitud: -66.8770 },
  { nombre: "Paclitaxel", concentracion: "100 mg/16.7 mL", forma: "Solución inyectable", lote: "PT202403", precio: "35$", imagen: "img/paclitaxel.png", ubicacion: "Los Palos Grandes, Caracas", latitud: 10.4849, longitud: -66.9096 },
  { nombre: "Docetaxel", concentracion: "80 mg/4 mL", forma: "Solución inyectable", lote: "DT202404", precio: "32$", imagen: "img/docetaxel.png", ubicacion: "Prados del Este, Caracas", latitud: 10.4965, longitud: -66.8832 },
  { nombre: "Doxorrubicina", concentracion: "50 mg/25 mL", forma: "Solución inyectable", lote: "DL202405", precio: "37$", imagen: "img/doxorrubicina.png", ubicacion: "La Castellana, Caracas", latitud: 10.4801, longitud: -66.8933 },
  { nombre: "Capecitabina", concentracion: "500 mg", forma: "Tableta recubierta", lote: "CP202406", precio: "60$", imagen: "img/capecitabina.png", ubicacion: "Propatria, Caracas", latitud: 10.4719, longitud: -66.9043 },
  { nombre: "Tamoxifeno", concentracion: "20 mg", forma: "Tableta recubierta", lote: "TX202407", precio: "15$", imagen: "/img/tamoxifeno.png", ubicacion: "Chacao, Caracas", latitud: 10.4840, longitud: -66.8810 },
  { nombre: "Letrozol", concentracion: "2.5 mg", forma: "Tableta recubierta", lote: "LZ202408", precio: "130$", imagen: "img/letrozol.png", ubicacion: "Antimano, Caracas", latitud: 10.4762, longitud: -66.9275 },
  { nombre: "Anastrozol", concentracion: "1 mg", forma: "Tableta recubierta", lote: "AZ202409", precio: "12$", imagen: "img/anastrozol.png", ubicacion: "Bello monte, Caracas", latitud: 10.4930, longitud: -66.9020 },
  { nombre: "Fulvestrant", concentracion: "250 mg/5 mL", forma: "Solución inyectable", lote: "FV202410", precio: "27$", imagen: "img/fulvestrant.png", ubicacion: "Plaza Venezuela, Caracas", latitud: 10.4772, longitud: -66.8940 },
  { nombre: "Irinotecan", concentracion: "100 mg/5 mL", forma: "Solución inyectable", lote: "IR202411", precio: "242$", imagen: "img/irinotecan.png", ubicacion: "Los Dos Caminos, Caracas", latitud: 10.5040, longitud: -66.9110 },
  { nombre: "Bevacizumab", concentracion: "100 mg/4 mL", forma: "Solución inyectable", lote: "BV202412", precio: "380$", imagen: "img/bevacizumab.png", ubicacion: "El valle, Caracas", latitud: 10.4800, longitud: -66.9130 },
  { nombre: "Cisplatino", concentracion: "50 mg/50 mL", forma: "Solución inyectable", lote: "CP202413", precio: "60$", imagen: "img/cisplatino.png", ubicacion: "San Bernardino, Caracas", latitud: 10.5100, longitud: -66.8950 }
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

/*****************************************************
 * 3. VARIABLES GLOBALES PARA EL CARRITO
 *****************************************************/
let cartItems = []; // Array para almacenar productos agregados al carrito


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


/*****************************************************
 * 5. CARRUSEL (3 PRODUCTOS A LA VEZ)
 *****************************************************/
function configurarCarrusel() {
  const carruselContainer = document.getElementById("carrusel");
  if (!carruselContainer) return; // Evitar errores si no existe el carrusel

  // Tomamos 12 productos aleatorios y los duplicamos para "efecto infinito"
  const shuffledProductos = [...productos].sort(() => 0.5 - Math.random()).slice(0, 12);
  const carruselProductos = [...shuffledProductos, ...shuffledProductos];

  carruselContainer.innerHTML = "";

  // Crear slides de 3 en 3
  for (let i = 0; i < carruselProductos.length; i += 3) {
    const slide = document.createElement("div");
    slide.className = "w-full flex justify-center items-center flex-shrink-0 space-x-4";
    
    // Cada slide tendrá 3 productos
    slide.innerHTML = carruselProductos.slice(i, i + 3).map(prod => `
      <div class="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-1/3">
        <img src="${prod.imagen}" alt="${prod.nombre}" 
             class="h-32 w-auto object-cover rounded-lg shadow-md mb-2">
        <h2 class="text-lg font-medium text-purple-700">${prod.nombre}</h2>
      </div>
    `).join("");

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
      clearInterval(intervalId); // Reiniciar el autoplay (opcional)
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
 * 6. CONFIGURAR CARRITO
 *****************************************************/
function configurarCarrito() {
  const cartToggle    = document.getElementById("cart-toggle");
  const cartDropdown  = document.getElementById("cart-dropdown");
  const cartItemsList = document.getElementById("cart-items");
  const cartBadge     = document.getElementById("cart-badge");
  const cartClearBtn  = document.getElementById("cart-clear");

  // Al hacer clic en "Eliminar todos"
  cartClearBtn.addEventListener("click", () => {
    cartItems = [];
    actualizarCarritoUI();
  });

  // Al hacer clic en el ícono de carrito
  cartToggle.addEventListener("click", () => {
    cartDropdown.classList.toggle("hidden");
  });

  // Manejo de modales (Canje, Donaciones, Disponibilidad)
  const btnOpenCanje          = document.getElementById('openCanje');
  const btnOpenDonaciones     = document.getElementById('openDonaciones');
  const btnOpenDisponibilidad = document.getElementById('openDisponibilidad');

  const modalCanje            = document.getElementById('modalCanje');
  const modalDonaciones       = document.getElementById('modalDonaciones');
  const modalDisponibilidad   = document.getElementById('modalDisponibilidad');

  const btnCloseCanje         = document.getElementById('closeCanje');
  const btnCloseCanjeX        = document.getElementById('closeCanjeX');
  const btnCloseDonaciones    = document.getElementById('closeDonaciones');
  const btnCloseDonacionesX   = document.getElementById('closeDonacionesX');
  const btnCloseDisponibilidad= document.getElementById('closeDisponibilidad');
  const btnCloseDisponibilidadX= document.getElementById('closeDisponibilidadX');

  // Funciones para abrir/cerrar modales
  function openModal(modal) {
    modal.classList.remove("hidden");
  }
  function closeModal(modal) {
    modal.classList.add("hidden");
  }

  // Eventos para abrir
  if (btnOpenCanje)          btnOpenCanje.addEventListener('click', () => openModal(modalCanje));
  if (btnOpenDonaciones)     btnOpenDonaciones.addEventListener('click', () => openModal(modalDonaciones));
  if (btnOpenDisponibilidad) btnOpenDisponibilidad.addEventListener('click', () => openModal(modalDisponibilidad));

  // Eventos para cerrar
  if (btnCloseCanje)         btnCloseCanje.addEventListener('click', () => closeModal(modalCanje));
  if (btnCloseCanjeX)        btnCloseCanjeX.addEventListener('click', () => closeModal(modalCanje));
  if (btnCloseDonaciones)    btnCloseDonaciones.addEventListener('click', () => closeModal(modalDonaciones));
  if (btnCloseDonacionesX)   btnCloseDonacionesX.addEventListener('click', () => closeModal(modalDonaciones));
  if (btnCloseDisponibilidad)btnCloseDisponibilidad.addEventListener('click', () => closeModal(modalDisponibilidad));
  if (btnCloseDisponibilidadX)btnCloseDisponibilidadX.addEventListener('click', () => closeModal(modalDisponibilidad));

  // Cerrar modal al hacer clic en el fondo (opcional)
  window.addEventListener('click', (e) => {
    if (e.target === modalCanje)          closeModal(modalCanje);
    if (e.target === modalDonaciones)     closeModal(modalDonaciones);
    if (e.target === modalDisponibilidad) closeModal(modalDisponibilidad);
  });
}


/*****************************************************
 * 7. ACTUALIZAR LA INTERFAZ DEL CARRITO
 *****************************************************/
function actualizarCarritoUI() {
  // Actualizamos el badge
  const cartBadge = document.getElementById("cart-badge");
  if (cartBadge) {
    cartBadge.innerText = cartItems.length;
  }

  // Actualizamos la lista de productos en el carrito
  const cartItemsList = document.getElementById("cart-items");
  if (cartItemsList) {
    cartItemsList.innerHTML = ""; // Limpiar lista

    cartItems.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "flex justify-between items-center border-b py-2";
      li.innerHTML = `
        <span>${item.nombre}</span>
        <button class="text-red-500 hover:text-red-700" data-index="${index}">X</button>
      `;
      cartItemsList.appendChild(li);
    });

    // Evento para remover productos individualmente
    const removeBtns = cartItemsList.querySelectorAll("button[data-index]");
    removeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"));
        cartItems.splice(idx, 1);
        actualizarCarritoUI();
      });
    });
  }

  // (Opcional) Actualizar total (si cada producto tuviera precio)
  const cartTotal = document.getElementById("cart-total");
  if (cartTotal) {
    // Ejemplo: si cada producto costase $10
    const total = cartItems.length * 10;
    cartTotal.innerText = `$${total}`;
  }
}


/*****************************************************
 * 8. AGREGAR AL CARRITO
 *****************************************************/
function agregarAlCarrito(producto) {
  // (Opcional) lógica para unificar cantidades: busca si existe
  // let existing = cartItems.find(p => p.nombre === producto.nombre);
  // if (existing) {
  //   // Manejar quantity, etc.
  // } else {
  //   cartItems.push(producto);
  // }
  // Pero si no necesitas cantidades, simplemente:
  cartItems.push(producto);

  // Actualizar UI
  actualizarCarritoUI();
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