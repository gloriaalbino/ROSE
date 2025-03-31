document.addEventListener("DOMContentLoaded", () => {
  // Asignar eventos a las tarjetas existentes
  attachCardEventListeners();

  // Evento para el botón "Agregar Nuevo Producto"
  const addProductBtn = document.getElementById("addProductBtn");
  if (addProductBtn) {
    addProductBtn.addEventListener("click", addNewProduct);
  }
});

function attachCardEventListeners() {
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach(card => {
    const editBtn = card.querySelector(".edit-btn");
    const deleteBtn = card.querySelector(".delete-btn");

    if (editBtn) {
      editBtn.addEventListener("click", () => toggleEdit(card));
    }
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => deleteProduct(card));
    }
  });
}

function toggleEdit(card) {
  // Seleccionar elementos editables
  const titleEl = card.querySelector(".product-title");
  const concentracionEl = card.querySelector(".product-concentracion");
  const formaEl = card.querySelector(".product-forma");
  const loteEl = card.querySelector(".product-lote");
  const vencimientoEl = card.querySelector(".product-vencimiento");
  const precioEl = card.querySelector(".product-precio");
  const ubicacionEl = card.querySelector(".product-ubicacion");
  const editBtn = card.querySelector(".edit-btn");
  const imageInput = card.querySelector(".image-input");
  const uploadBtn = card.querySelector(".upload-image-btn");

  if (editBtn.textContent.trim() === "Editar") {
    // Activar modo edición: se hacen editables los textos y se muestran input e ícono para subir imagen
    titleEl.contentEditable = "true";
    concentracionEl.contentEditable = "true";
    formaEl.contentEditable = "true";
    loteEl.contentEditable = "true";
    vencimientoEl.contentEditable = "true";
    precioEl.contentEditable = "true";
    ubicacionEl.contentEditable = "true";

    [titleEl, concentracionEl, formaEl, loteEl, vencimientoEl, precioEl, ubicacionEl].forEach(el => {
      el.classList.add("border", "border-purple-500", "p-1");
    });

    // Mostrar input y botón para subir imagen
    if (imageInput && uploadBtn) {
      imageInput.classList.remove("hidden");
      uploadBtn.classList.remove("hidden");
      // Al hacer clic en el botón, se dispara el input file
      uploadBtn.addEventListener("click", function() {
        imageInput.click();
      });
      // Actualizar la imagen al seleccionar un archivo
      imageInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            const imgElement = card.querySelector(".product-image");
            imgElement.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }
    editBtn.textContent = "Guardar";
  } else {
    // Guardar cambios: desactivar edición y ocultar input y botón de subir imagen
    titleEl.contentEditable = "false";
    concentracionEl.contentEditable = "false";
    formaEl.contentEditable = "false";
    loteEl.contentEditable = "false";
    vencimientoEl.contentEditable = "false";
    precioEl.contentEditable = "false";
    ubicacionEl.contentEditable = "false";

    [titleEl, concentracionEl, formaEl, loteEl, vencimientoEl, precioEl, ubicacionEl].forEach(el => {
      el.classList.remove("border", "border-purple-500", "p-1");
    });

    if (imageInput && uploadBtn) {
      imageInput.classList.add("hidden");
      uploadBtn.classList.add("hidden");
    }
    editBtn.textContent = "Editar";

    // Aquí podrías agregar una llamada AJAX para persistir los cambios.
    const updatedProduct = {
      nombre: titleEl.textContent.trim(),
      concentracion: concentracionEl.textContent.trim(),
      formaFarmaceutica: formaEl.textContent.trim(),
      lote: loteEl.textContent.trim(),
      fechaVencimiento: vencimientoEl.textContent.trim(),
      precio: parseFloat(precioEl.textContent.trim()),
      ubicacion: ubicacionEl.textContent.trim()
    };

    const productId = card.getAttribute("data-id");
    updateProduct(productId, updatedProduct);
  }
}

function deleteProduct(card) {
  if (confirm("¿Estás seguro de eliminar este producto?")) {
    const productId = card.getAttribute("data-id");
    deleteProductById(productId);
    card.remove();
  }
}

function addNewProduct() {
  const productGallery = document.getElementById("productGallery");
  const card = document.createElement("div");
  card.className = "product-card bg-white rounded-lg shadow-md p-4 flex flex-col";
  card.setAttribute("data-id", Date.now());

  // Crear la estructura de la tarjeta en modo edición desde el inicio
  card.innerHTML = `
    <div class="image-container relative mb-4">
      <img src="../principal/img/img-vacia.png" alt="Nuevo Producto" class="product-image rounded-md w-full h-auto">
      <input type="file" class="image-input hidden absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" accept="image/*">
      <button class="upload-image-btn hidden absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
        Subir Imagen
      </button>
    </div>
    <h2 class="product-title text-lg font-semibold text-purple-700 mb-2" contenteditable="true">Nuevo Producto</h2>
    <p class="product-concentracion text-sm text-gray-600 mb-2" contenteditable="true">Concentración: </p>
    <p class="product-forma text-sm text-gray-600 mb-2" contenteditable="true">Forma Farmacéutica: </p>
    <p class="product-lote text-sm text-gray-600 mb-2" contenteditable="true">Lote: </p>
    <p class="product-vencimiento text-sm text-gray-600 mb-2" contenteditable="true">Fecha de vencimiento: </p>
    <p class="product-precio text-sm text-gray-600 mb-2" contenteditable="true">Precio: </p>
    <p class="product-ubicacion text-sm text-gray-600 mb-4" contenteditable="true">Ubicación: </p>
    <div class="mt-auto flex justify-between">
      <button class="edit-btn bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded">Guardar</button>
      <button class="delete-btn bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Eliminar</button>
    </div>
  `;
  productGallery.appendChild(card);

  const editBtn = card.querySelector(".edit-btn");
  const deleteBtn = card.querySelector(".delete-btn");
  if (editBtn) {
    editBtn.addEventListener("click", () => toggleEdit(card));
  }
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => deleteProduct(card));
  }

  // Crear el producto en la base de datos
  const nuevoProducto = {
    nombre: "Nuevo Producto",
    concentracion: "",
    formaFarmaceutica: "",
    lote: "",
    fechaVencimiento: "",
    precio: 0,
    ubicacion: ""
  };
  crearProducto(nuevoProducto).then(productoCreado => {
    card.setAttribute("data-id", productoCreado._id);
  });
}

// Función para crear un producto en la base de datos
async function crearProducto(producto) {
  try {
    const response = await fetch('/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    });
    const data = await response.json();
    console.log('Producto creado:', data);
    return data;
  } catch (error) {
    console.error('Error al crear el producto:', error);
  }
}

// Función para actualizar un producto en la base de datos
async function updateProduct(id, producto) {
  try {
    const response = await fetch(`/api/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    });
    const data = await response.json();
    console.log('Producto actualizado:', data);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
}

// Función para eliminar un producto en la base de datos
async function deleteProductById(id) {
  try {
    const response = await fetch(`/api/productos/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    console.log('Producto eliminado:', data);
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
}