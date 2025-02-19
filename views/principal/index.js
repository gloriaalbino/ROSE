const productos = [
    { nombre: "Trastuzumab", concentracion: "150 mg/7.2 mL", forma: "Solución inyectable", lote: "TZ202401", imagen: "img/trastuzumab.png" },
    { nombre: "Pertuzumab", concentracion: "420 mg/14 mL", forma: "Solución inyectable", lote: "PZ202402", imagen: "img/pertuzumab.png" },
    { nombre: "Paclitaxel", concentracion: "100 mg/16.7 mL", forma: "Solución inyectable", lote: "PT202403", imagen: "img/paclitaxel.png" },
    { nombre: "Docetaxel", concentracion: "80 mg/4 mL", forma: "Solución inyectable", lote: "DT202404", imagen: "img/docetaxel.png" },
    { nombre: "Doxorrubicina liposomal", concentracion: "50 mg/25 mL", forma: "Solución inyectable", lote: "DL202405", imagen: "img/doxorrubicina.png" },
    { nombre: "Capecitabina", concentracion: "500 mg", forma: "Tableta recubierta", lote: "CP202406", imagen: "img/capecitabina.png" },
    { nombre: "Tamoxifeno", concentracion: "20 mg", forma: "Tableta recubierta", lote: "TX202407", imagen: "img/tamoxifeno.png" },
    { nombre: "Letrozol", concentracion: "2.5 mg", forma: "Tableta recubierta", lote: "LZ202408", imagen: "img/letrozol.png" },
    { nombre: "Anastrozol", concentracion: "1 mg", forma: "Tableta recubierta", lote: "AZ202409", imagen: "img/anastrozol.png" },
    { nombre: "Fulvestrant", concentracion: "250 mg/5 mL", forma: "Solución inyectable", lote: "FV202410", imagen: "img/fulvestrant.png" }
];

document.addEventListener("DOMContentLoaded", function() {
    const shuffledProductos = [...productos].sort(() => 0.5 - Math.random()).slice(0, 9);
    const container = document.getElementById("productos-container");
    container.innerHTML = "";

    shuffledProductos.forEach(producto => {
        const card = document.createElement("div");
        card.className = "bg-white shadow-md rounded-lg p-4";
        card.innerHTML = `
            <h2 class="text-lg font-medium text-purple-700">${producto.nombre}</h2>
            <p class="text-sm text-gray-600">Concentración: ${producto.concentracion}</p>
            <p class="text-sm text-gray-600">Forma: ${producto.forma}</p>
            <p class="text-sm text-gray-600">Lote: ${producto.lote}</p>
            <button class="mt-4 bg-purple-500 text-white py-1 px-4 rounded-lg hover:bg-purple-600 transition">Detalles</button>
        `;
        container.appendChild(card);
    });

    // Crear carrusel mostrando 3 medicamentos a la vez
    const carruselContainer = document.getElementById("carrusel");
    carruselContainer.innerHTML = "";
    const carruselProductos = [...shuffledProductos, ...shuffledProductos];

    for (let i = 0; i < carruselProductos.length; i += 3) {
        const slide = document.createElement("div");
        slide.className = "w-full flex justify-center items-center flex-shrink-0 space-x-4";
        slide.innerHTML = carruselProductos.slice(i, i + 3).map(producto => `
            <div class="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-1/3">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="h-40 w-auto object-cover rounded-lg shadow-md">
                <h2 class="text-lg font-medium text-purple-700 mt-2">${producto.nombre}</h2>
            </div>
        `).join('');
        carruselContainer.appendChild(slide);
    }

    let index = 0;
    function moveCarousel() {
        index++;
        carruselContainer.style.transition = "transform 0.5s ease-in-out";
        carruselContainer.style.transform = `translateX(-${index * 100}%)`;
        
        if (index >= carruselProductos.length / 3) {
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
        index = (index - 1 + carruselProductos.length / 3) % (carruselProductos.length / 3);
        carruselContainer.style.transition = "transform 0.5s ease-in-out";
        carruselContainer.style.transform = `translateX(-${index * 100}%)`;
    });
});
