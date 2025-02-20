let editingId = null;

function openModal(id = null) {
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('modal-title').textContent = id ? "Editar Producto" : "Agregar Producto";
    document.getElementById('save-btn').textContent = id ? "Guardar Cambios" : "Guardar";
    
    if (id) {
        const product = document.getElementById(id).dataset;
        document.getElementById('med-nombre').value = product.nombre;
        document.getElementById('med-lote').value = product.lote;
        document.getElementById('med-forma').value = product.forma;
        document.getElementById('med-concentracion').value = product.concentracion;
        document.getElementById('med-fecha').value = product.fecha;
        document.getElementById('med-precio').value = product.precio;
        editingId = id;
    } else {
        document.querySelectorAll('#modal input').forEach(input => input.value = '');
        editingId = null;
    }
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

function saveMedicamento() {
    const nombre = document.getElementById('med-nombre').value;
    const lote = document.getElementById('med-lote').value;
    const forma = document.getElementById('med-forma').value;
    const concentracion = document.getElementById('med-concentracion').value;
    const fecha = document.getElementById('med-fecha').value;
    const precio = document.getElementById('med-precio').value;
    
    if (!nombre || !lote || !forma || !concentracion || !fecha || !precio) {
        alert("Todos los campos son obligatorios");
        return;
    }
    
    if (editingId) {
        document.getElementById(editingId).innerHTML = generateRowHTML(editingId, nombre, lote, forma, concentracion, fecha, precio);
    } else {
        const newId = `med-${Date.now()}`;
        document.getElementById('product-list').innerHTML += generateRowHTML(newId, nombre, lote, forma, concentracion, fecha, precio);
    }
    
    closeModal();
}

function generateRowHTML(id, nombre, lote, forma, concentracion, fecha, precio) {
    return `<tr id="${id}" class="bg-white border-b" data-nombre="${nombre}" data-lote="${lote}" data-forma="${forma}" data-concentracion="${concentracion}" data-fecha="${fecha}" data-precio="${precio}">
                <td class="py-2 px-4">${nombre}</td>
                <td class="py-2 px-4">${lote}</td>
                <td class="py-2 px-4">${forma}</td>
                <td class="py-2 px-4">${concentracion}</td>
                <td class="py-2 px-4">${fecha}</td>
                <td class="py-2 px-4">$${precio}</td>
                <td class="py-2 px-4 flex gap-2">
                    <button onclick="openModal('${id}')" class="px-4 py-2 rounded-md text-white bg-pink-500 hover:bg-pink-700">Editar</button>
                    <button onclick="deleteMedicamento('${id}')" class="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-700">Eliminar</button>
                </td>
            </tr>`;
}

function deleteMedicamento(id) {
    if (confirm("¿Seguro que deseas eliminar este medicamento?")) {
        document.getElementById(id).remove();
    }
}

document.getElementById('save-btn').addEventListener('click', saveMedicamento);
