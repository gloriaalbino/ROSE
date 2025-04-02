document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos el formulario (se asume que es el único en la página)
    const form = document.querySelector("form");
  
    // Obtenemos los elementos de entrada del formulario
    const nombreComercial = document.getElementById("nombre-comercial");
    const principioActivo = document.getElementById("principio-activo");
    const concentracion = document.getElementById("concentracion");
    const formaFarmaceutica = document.getElementById("forma-farmaceutica");
    const fechaVencimiento = document.getElementById("fecha-vencimiento");
    const lote = document.getElementById("lote");
    const cantidad = document.getElementById("cantidad");
    const numeroContacto = document.getElementById("numero-contacto");
  
    // Creamos el spinner (con la misma estructura)
    const spinner = document.createElement("div");
    spinner.innerHTML = `
      <div class="flex justify-center items-center mt-4">
        <img src="/img/favicon.png" class="w-16 h-16 animate-spin" alt="Spinner">
      </div>
    `;
    spinner.style.display = "none";
    form.appendChild(spinner);
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      // Validación: Nombre Comercial no debe estar vacío
      if (nombreComercial.value.trim() === "") {
        alert("Por favor ingresa el nombre comercial del medicamento.");
        return;
      }
  
      // Validación: Principio Activo no debe estar vacío
      if (principioActivo.value.trim() === "") {
        alert("Por favor ingresa el principio activo del medicamento.");
        return;
      }
  
      // Validación: Concentración debe tener el formato de número seguido de la unidad (e.g., 500mg, 1 g, 250 ml)
      const regConcentracion = /^\d+\s?(mg|g|ml)$/i;
      if (!regConcentracion.test(concentracion.value.trim())) {
        alert("La concentración debe ser un número seguido de la unidad (e.g., 500mg, 1g, 250ml).");
        return;
      }
  
      // Validación: Forma Farmacéutica no debe estar vacía
      if (formaFarmaceutica.value.trim() === "") {
        alert("Por favor ingresa la forma farmacéutica del medicamento.");
        return;
      }
  
      // Validación: Fecha de Vencimiento debe ser una fecha válida y futura
      const hoy = new Date();
      const fechaIngresada = new Date(fechaVencimiento.value);
      if (isNaN(fechaIngresada.getTime())) {
        alert("Por favor ingresa una fecha válida para el vencimiento.");
        return;
      }
      if (fechaIngresada < hoy) {
        alert("La fecha de vencimiento debe ser una fecha futura.");
        return;
      }
  
      // Validación: Lote no debe estar vacío
      if (lote.value.trim() === "") {
        alert("Por favor ingresa el número de lote.");
        return;
      }
  
      // Validación: Cantidad debe ser mayor a cero
      if (cantidad.value === "" || parseInt(cantidad.value) <= 0) {
        alert("La cantidad disponible debe ser un número mayor a cero.");
        return;
      }
  
      // Validación: Número de Contacto no debe estar vacío
      if (numeroContacto.value.trim() === "") {
        alert("Por favor ingresa el número de contacto.");
        return;
      }
  
      // Mostramos el spinner mientras se procesa el envío
      spinner.style.display = "block";
  
      try {
        // Construimos el objeto con los datos a enviar
        const formData = {
          nombreComercial: nombreComercial.value.trim(),
          principioActivo: principioActivo.value.trim(),
          concentracion: concentracion.value.trim(),
          formaFarmaceutica: formaFarmaceutica.value.trim(),
          fechaVencimiento: fechaVencimiento.value,
          lote: lote.value.trim(),
          cantidad: parseInt(cantidad.value),
          numeroContacto: numeroContacto.value.trim()
        };
  
        console.log("Enviando datos:", formData);
  
        // Envío de datos vía POST con axios (ajusta la URL según tu API)
        const response = await axios.post('/api/donar/registrar', formData);
        console.log("Respuesta del servidor:", response.data);
  
        alert("La información se ha enviado correctamente.");
      } catch (error) {
        console.error("Error al enviar la información:", error);
        alert("Ocurrió un error al enviar la información. Por favor, inténtalo de nuevo más tarde.");
      } finally {
        // Ocultamos el spinner y reiniciamos el formulario
        spinner.style.display = "none";
        form.reset();
      }
    });
  });
  