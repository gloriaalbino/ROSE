document.addEventListener("DOMContentLoaded", () => {
  // Array de productos
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
    { nombre: "Cisplatino", concentracion: "50 mg/50 mL", forma: "Solución inyectable", lote: "CP202413", precio: "60$", imagen: "../principal/img/cisplatino.png", ubicacion: "San Bernardino, Caracas", latitud: 10.5100, longitud: -66.8950 }
  ];

  // Inicialización del mapa centrado en La Urbina, Caracas
  const map = L.map('map').setView([10.488552, -66.807082], 15);

  // Capa de mapa de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Icono personalizado
  const redIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  // Obtener el parámetro "lote" de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const lote = urlParams.get("lote");

  // Verificar si el lote está presente
  if (!lote) {
    alert("No se proporcionó un lote de producto. Redirigiendo a la página principal...");
    window.location.href = "/principal";
    return;
  }

  // Buscar el producto en el array global "productos" usando el lote
  const producto = productos.find((p) => p.lote === lote);

  if (!producto) {
    alert("Producto no encontrado. Redirigiendo a la página principal...");
    window.location.href = "/principal";
    return;
  }

  // Mostrar los datos del producto en la página
  const nombreElemento = document.getElementById("nombre");
  const concentracionElemento = document.getElementById("concentracion");
  const formaElemento = document.getElementById("forma");
  const loteElemento = document.getElementById("lote");
  const precioElemento = document.getElementById("precio");
  const imagenElemento = document.getElementById("imagen");
  const ubicacionElemento = document.getElementById("ubicacion");

  if (nombreElemento) nombreElemento.textContent = producto.nombre;
  if (concentracionElemento) concentracionElemento.textContent = producto.concentracion;
  if (formaElemento) formaElemento.textContent = producto.forma;
  if (loteElemento) loteElemento.textContent = producto.lote;
  if (precioElemento) precioElemento.textContent = producto.precio;
  if (imagenElemento) imagenElemento.src = producto.imagen;
  if (ubicacionElemento) {
    ubicacionElemento.textContent = producto.ubicacion;
  } else {
    console.error("El elemento con ID 'ubicacion' no se encontró en el DOM.");
  }

  // Agregar marcador en el mapa con el icono personalizado
  const marker = L.marker([producto.latitud, producto.longitud], { icon: redIcon }).addTo(map);
  marker.bindPopup(`<b>${producto.nombre}</b><br>${producto.ubicacion}`).openPopup();

  // Centrar el mapa en la ubicación del producto
  map.setView([producto.latitud, producto.longitud], 15);

  // Configurar el botón "Agregar al carrito"
  const addToCartBtn = document.querySelector("button.bg-purple-600");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const productoCarrito = {
        id: producto.lote,
        nombre: producto.nombre,
        concentracion: producto.concentracion,
        forma: producto.forma,
        lote: producto.lote,
        ubicacion: producto.ubicacion,
        imagen: producto.imagen,
        latitud: producto.latitud,
        longitud: producto.longitud
      };

      console.log("Producto agregado al carrito:", productoCarrito);

      if (typeof window.addToCart === "function") {
        window.addToCart(productoCarrito);
        alert("Producto agregado al carrito correctamente.");
      } else {
        console.error("La función addToCart no está definida.");
      }
    });
  } else {
    console.error("No se encontró el botón 'Agregar al carrito'.");
  }
});