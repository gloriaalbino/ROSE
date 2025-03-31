document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const profileUpload = document.getElementById('profile-upload');
    const profileImg = document.getElementById('profile-img');
    const toggleBtn = document.querySelector('#toggle-edit'); // Botón que alterna entre editar y guardar
    const logoutBtn = document.querySelector('#logout-btn'); // Botón para cerrar sesión
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="tel"]');
  
    inputs.forEach(input => {
      input.readOnly = true;
    });
  
    let isEditing = false;
  
    // Evento para alternar entre modo edición y guardar cambios
    toggleBtn.addEventListener('click', async () => {
      if (!isEditing) {
        // Activar el modo de edición
        isEditing = true;
        toggleBtn.textContent = "Guardar cambios";
        inputs.forEach(input => {
          input.readOnly = false;
        });
      } else {
        // Guardar cambios y desactivar el modo de edición
        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const phone = document.querySelector('input[name="phone"]').value;
  
        try {
          const response = await fetch('/api/perfil', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, phone }),
          });
  
          if (response.ok) {
            console.log('Datos guardados:', { name, email, password, phone });
            alert('¡Cambios guardados correctamente!');
          } else {
            console.error('Error al guardar los datos');
            alert('Hubo un error al guardar los cambios.');
          }
        } catch (error) {
          console.error('Error al enviar los datos:', error);
          alert('Hubo un error al guardar los cambios.');
        }
  
        isEditing = false;
        toggleBtn.textContent = "Editar";
        inputs.forEach(input => {
          input.readOnly = true;
        });
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
  
    // Evento para cerrar sesión
    logoutBtn.addEventListener('click', async () => {
      try {
        const response = await fetch('/api/logout', { method: 'POST' });
        if (response.ok) {
          alert('Sesión cerrada correctamente.');
          window.location.href = '/login'; // Redirigir al login
        } else {
          console.error('Error al cerrar sesión');
          alert('Hubo un error al cerrar la sesión.');
        }
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Hubo un error al cerrar la sesión.');
      }
    });
  });