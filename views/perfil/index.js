document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const profileUpload = document.getElementById('profile-upload');
    const profileImg = document.getElementById('profile-img');
    const toggleBtn = document.querySelector('button'); // Botón que alterna entre editar y guardar
    // Seleccionamos todos los inputs del formulario (nombre, email, password, teléfono)
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="tel"]');
  
    inputs.forEach(input => {
      input.readOnly = true;
    });
  
    let isEditing = false;
  
    // Evento para alternar entre modo edición y guardar cambios
    toggleBtn.addEventListener('click', () => {
      if (!isEditing) {
        // Activar el modo de edición
        isEditing = true;
        toggleBtn.textContent = "Guardar cambios";
        inputs.forEach(input => {
          input.readOnly = false;
        });
      } else {
        // Guardar cambios y desactivar el modo de edición
        const name = document.querySelector('input[type="text"]').value;
        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelector('input[type="password"]').value;
        const phone = document.querySelector('input[type="tel"]').value;
  
        console.log('Datos guardados:', { name, email, password, phone });
        alert('¡Cambios guardados correctamente!');
  
        isEditing = false;
        toggleBtn.textContent = "Editar";
        inputs.forEach(input => {
          input.readOnly = true;
        });
  
        // Aquí podrías agregar la lógica para enviar los datos a un servidor usando Axios, por ejemplo:
        /*
        axios.post('/api/guardarPerfil', { name, email, password, phone })
          .then(response => console.log(response))
          .catch(error => console.error(error));
        */
      }
    });
  
    // Actualizar la imagen de perfil
    profileUpload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profileImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  });
  