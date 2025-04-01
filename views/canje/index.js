document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form");
  
    // Obtención de inputs
    const nombreComercial = document.getElementById("nombre-comercial");
    const principioActivo = document.getElementById("principio-activo");
    const concentracion = document.getElementById("concentracion");
    const formaFarmaceutica = document.getElementById("forma-farmaceutica");
    const fechaVencimiento = document.getElementById("fecha-vencimiento");
    const lote = document.getElementById("lote");
    const cantidad = document.getElementById("cantidad");
    const numeroContacto = document.getElementById("numero-contacto");
  
    // Creación del spinner (igual que en el HTML)
    const spinner = document.createElement("div");
    spinner.innerHTML = `
      <div class="flex justify-center items-center mt-4">
        <img src="../img/favicon.png" class="w-16 h-16 animate-spin" alt="Spinner">
      </div>
    `;
    spinner.style.display = "none";
    form.appendChild(spinner);
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      // Validaciones de campos
      if (nombreComercial.value.trim() === "") {
        alert("Por favor ingrese el nombre comercial.");
        return;
      }
      if (principioActivo.value.trim() === "") {
        alert("Por favor ingrese el principio activo.");
        return;
      }
      // Validación de la concentración
      const regConcentracion = /^\d+\s?(mg|g|ml)$/i;
      if (!regConcentracion.test(concentracion.value.trim())) {
        alert("La concentración debe ser un número seguido de la unidad (e.g., 500mg, 1 g, 250 ml).");
        return;
      }
      if (formaFarmaceutica.value.trim() === "") {
        alert("Por favor ingrese la forma farmacéutica.");
        return;
      }
      // Validación de fecha
      const hoy = new Date();
      const fechaIngresada = new Date(fechaVencimiento.value);
      if (isNaN(fechaIngresada.getTime())) {
        alert("Por favor ingrese una fecha válida para el vencimiento.");
        return;
      }
      if (fechaIngresada < hoy) {
        alert("La fecha de vencimiento debe ser una fecha futura.");
        return;
      }
      if (lote.value.trim() === "") {
        alert("Por favor ingrese el número de lote.");
        return;
      }
      if (cantidad.value === "" || parseInt(cantidad.value) <= 0) {
        alert("La cantidad debe ser un número mayor a cero.");
        return;
      }
      if (numeroContacto.value.trim() === "") {
        alert("Por favor ingrese el número de contacto.");
        return;
      }
  
      // Mostrar el spinner
      spinner.style.display = "block";
  
      try {
        // Preparación de datos a enviar
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
  
        // Ejemplo de envío vía POST con axios (ajusta la URL según tu API)
        const response = await axios.post('/api/medicamentos/canjear', formData);
        console.log("Respuesta del servidor:", response.data);
  
        alert("La información se ha enviado correctamente.");
      } catch (error) {
        console.error("Error al enviar la información:", error);
        alert("Ocurrió un error al enviar la información. Por favor, inténtelo de nuevo más tarde.");
      } finally {
        // Ocultar el spinner y reiniciar el formulario
        spinner.style.display = "none";
        form.reset();
      }
    });
  });
  