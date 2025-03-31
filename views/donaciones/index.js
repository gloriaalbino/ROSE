const productos = [
    { nombre: "Trastuzumab",    concentracion: "150 mg/7.2 mL",  forma: "Solución inyectable", lote: "TZ202401", imagen: "img/trastuzumab.png" },
    { nombre: "Pertuzumab",     concentracion: "420 mg/14 mL",   forma: "Solución inyectable", lote: "PZ202402", imagen: "img/pertuzumab.png" },
    { nombre: "Paclitaxel",     concentracion: "100 mg/16.7 mL", forma: "Solución inyectable", lote: "PT202403", imagen: "img/paclitaxel.png" },
    { nombre: "Docetaxel",      concentracion: "80 mg/4 mL",     forma: "Solución inyectable", lote: "DT202404", imagen: "img/docetaxel.png" },
  ];

// Rutas configurables: cambia estos valores por las URL que desees
const routes = {
    donate: "/donar",   // Reemplaza "ruta/donacion" por la ruta deseada para dar donación
    receive: "/recibirDonacion"     // Reemplaza "ruta/recibir" por la ruta deseada para recibir donación
  };
  
  /**
   * Función que se ejecuta al hacer clic en los botones.
   * Recibe el id del modal para identificar qué botón se pulsó.
   * En vez de mostrar el modal, redirecciona a la página correspondiente.
   */
  function openModal(modalId) {
    if (modalId === "donateModal") {
      window.location.href = /donar/;
    } else if (modalId === "receiveModal") {
      window.location.href = /recibirDonacion/;
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    // 1. Renderizar productos en la sección principal
    mostrarProductos();
  });

  function mostrarProductos() {
    // Tomamos 12 productos aleatorios
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


  
