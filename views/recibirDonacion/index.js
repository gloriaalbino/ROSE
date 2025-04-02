document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos el formulario
    const form = document.querySelector("form");
  
    // Obtenemos los elementos de entrada
    const nombreInput = document.getElementById("nombre");
    const concentracionInput = document.getElementById("concentracion");
    const formaInput = document.getElementById("forma");
    const cantidadInput = document.getElementById("cantidad");
    const contactoInput = document.getElementById("contacto");
  
    // Creamos el spinner
    const spinner = document.createElement("div");
    spinner.innerHTML = `
      <div class="flex justify-center items-center mt-4">
        <img src="/img/favicon.png" class="w-16 h-16 animate-spin" alt="Spinner">
      </div>
    `;
    spinner.style.display = "none";
    form.appendChild(spinner);
    
  
    // Evento de envío del formulario
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      // Validaciones
      if (nombreInput.value.trim() === "") {
        alert("Por favor ingresa el nombre del medicamento que necesita.");
        return;
      }
  
      if (concentracionInput.value.trim() === "") {
        alert("Por favor ingresa la concentración del medicamento.");
        return;
      }
  
      if (formaInput.value.trim() === "") {
        alert("Por favor ingresa la forma farmacéutica.");
        return;
      }
  
      if (cantidadInput.value === "" || parseInt(cantidadInput.value) <= 0) {
        alert("La cantidad requerida debe ser un número mayor a cero.");
        return;
      }
  
      if (contactoInput.value.trim() === "") {
        alert("Por favor ingresa un número de contacto.");
        return;
      }
  
      // Mostrar el spinner mientras se procesa el envío
      spinner.style.display = "block";
  
      try {
        // Construimos el objeto con los datos del formulario
        const formData = {
          nombre: nombreInput.value.trim(),
          concentracion: concentracionInput.value.trim(),
          forma: formaInput.value.trim(),
          cantidad: parseInt(cantidadInput.value),
          contacto: contactoInput.value.trim(),
        };
  
        console.log("Enviando datos:", formData);
  
        // Enviar los datos al backend
        const response = await axios.post('/api/donaciones/solicitar', formData);
        console.log("Respuesta del servidor:", response.data);
  
        alert("La solicitud de donación se ha enviado correctamente.");
        form.reset(); // Reiniciar el formulario
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        alert("Ocurrió un error al enviar la solicitud. Por favor, inténtelo de nuevo más tarde.");
      } finally {
        // Ocultar el spinner
        spinner.style.display = "none";
      }
    });
  });