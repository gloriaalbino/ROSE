// Datos de ejemplo (simulando una base de datos)
let productos = [
    {
      id: 1,
      imagen: "https://via.placeholder.com/150",
      nombre: "Tamoxifeno",
      lote: "L12345",
      fechaVencimiento: "2025-12-31",
      concentracion: "20 mg",
      formaFarmaceutica: "Tableta",
      precio: 50.0,
      ubicacion: "Almacén A",
    },
  ];
  
  // Selección de elementos del DOM
  const galeriaProductos = document.querySelector(".grid");
  
  // Función para renderizar la galería de productos
  function renderizarGaleria() {
    galeriaProductos.innerHTML = productos
      .map(
        (producto) => `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden p-4" data-id="${producto.id}">
          <img src="${producto.imagen}" alt="Imagen del producto" class="w-full h-48 object-cover product-image">
          <div class="p-4">
            <input type="text" value="${producto.nombre}" class="text-lg font-semibold text-pastel-purple editable bg-transparent border-none w-full" readonly>
            <input type="text" value="${producto.lote}" class="text-sm text-gray-600 editable bg-transparent border-none w-full" readonly>
            <input type="date" value="${producto.fechaVencimiento}" class="text-sm text-gray-600 editable bg-transparent border-none w-full" readonly>
            <input type="text" value="${producto.concentracion}" class="text-sm text-gray-600 editable bg-transparent border-none w-full" readonly>
            <input type="text" value="${producto.formaFarmaceutica}" class="text-sm text-gray-600 editable bg-transparent border-none w-full" readonly>
            <input type="number" value="${producto.precio}" class="text-sm text-gray-600 editable bg-transparent border-none w-full" readonly>
            <input type="text" value="${producto.ubicacion}" class="text-sm text-gray-600 editable bg-transparent border-none w-full" readonly>
            <div class="mt-4 flex space-x-2">
              <button onclick="toggleEdit(${producto.id})" class="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700 edit-btn">Editar</button>
              <button onclick="guardarProducto(${producto.id})" class="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-700 hidden save-btn">Guardar</button>
              <button onclick="eliminarProducto(${producto.id})" class="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-700">Eliminar</button>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }
  
  function toggleEdit(productId) {
      const card = document.querySelector(`[data-id='${productId}']`);
      const inputs = card.querySelectorAll(".editable");
      const editBtn = card.querySelector(".edit-btn");
      const saveBtn = card.querySelector(".save-btn");
  
      const isEditing = !inputs[0].readOnly;
      
      inputs.forEach(input => {
          input.readOnly = isEditing;
          input.classList.toggle("bg-pink-200", !isEditing);
      });
  
      editBtn.classList.toggle("hidden", !isEditing);
      saveBtn.classList.toggle("hidden", isEditing);
  }
  
  function guardarProducto(productId) {
      toggleEdit(productId);
  }
  
  function eliminarProducto(id) {
      productos = productos.filter((p) => p.id !== id);
      renderizarGaleria();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
      renderizarGaleria();
  });
