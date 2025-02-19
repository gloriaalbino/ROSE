document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:4500/medicamentos") 
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data);
            generarCarrusel(data);
        })
        .catch(error => console.error("Error al cargar los medicamentos:", error));
});

function mostrarProductos(medicamentos) {
    const container = document.getElementById("productos-container");
    container.innerHTML = "";

    medicamentos.slice(0, 10).forEach(med => {
        const card = document.createElement("div");
        card.className = "bg-white shadow-md rounded-lg p-4";
        card.innerHTML = `
            <img src="${med.imagen}" alt="${med.nombre}" class="h-40 w-auto object-cover rounded-lg shadow-md">
            <h2 class="text-lg font-medium text-purple-700 mt-2">${med.nombre}</h2>
            <p class="text-sm text-gray-600">Concentración: ${med.concentracion}</p>
            <p class="text-sm text-gray-600">Forma: ${med.forma_farmaceutica}</p>
            <p class="text-sm text-gray-600">Lote: ${med.lote}</p>
            <p class="text-sm font-semibold text-purple-700">Precio: ${med.precio}</p>
            <button class="mt-4 bg-purple-500 text-white py-1 px-4 rounded-lg hover:bg-purple-600 transition">Detalles</button>
        `;
        container.appendChild(card);
    });
}

function generarCarrusel(medicamentos) {
    const carruselContainer = document.getElementById("carrusel");
    carruselContainer.innerHTML = "";

    let shuffled = [...medicamentos].sort(() => 0.5 - Math.random()).slice(0, 9);
    
    for (let i = 0; i < shuffled.length; i += 3) {
        const slide = document.createElement("div");
        slide.className = "w-full flex justify-center items-center flex-shrink-0 space-x-4";
        slide.innerHTML = shuffled.slice(i, i + 3).map(med => `
            <div class="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-1/3">
                <img src="${med.imagen}" alt="${med.nombre}" class="h-40 w-auto object-cover rounded-lg shadow-md">
                <h2 class="text-lg font-medium text-purple-700 mt-2">${med.nombre}</h2>
            </div>
        `).join('');
        carruselContainer.appendChild(slide);
    }

    let index = 0;
    function moveCarousel() {
        index++;
        carruselContainer.style.transition = "transform 0.5s ease-in-out";
        carruselContainer.style.transform = `translateX(-${index * 100}%)`;

        if (index >= shuffled.length / 3) {
            setTimeout(() => {
                carruselContainer.style.transition = "none";
                index = 0;
                carruselContainer.style.transform = "translateX(0)";
            }, 500);
        }
    }

    setInterval(moveCarousel, 3000);
    document.getElementById("next").addEventListener("click", moveCarousel);
    document.getElementById("prev").addEventListener("click", () => {
        index = (index - 1 + shuffled.length / 3) % (shuffled.length / 3);
        carruselContainer.style.transition = "transform 0.5s ease-in-out";
        carruselContainer.style.transform = `translateX(-${index * 100}%)`;
    });
}
