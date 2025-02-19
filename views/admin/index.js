document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("tbody");
    const addButton = document.querySelector(".bg-pink-500");

    function deleteRow(event) {
        if (confirm("¿Estás seguro de que deseas eliminar este medicamento?")) {
            event.target.closest("tr").remove();
        }
    }

    function editRow(event) {
        const row = event.target.closest("tr");
        const cells = row.querySelectorAll("td:not(:last-child)");
        
        if (event.target.innerText === "Editar") {
            cells.forEach(cell => {
                if (cell.classList.contains("image-cell")) {
                    const fileInput = document.createElement("input");
                    fileInput.type = "file";
                    fileInput.accept = "image/*";
                    cell.innerText = "";
                    cell.appendChild(fileInput);
                } else {
                    const input = document.createElement("input");
                    input.type = "text";
                    input.value = cell.innerText;
                    cell.innerText = "";
                    cell.appendChild(input);
                }
            });
            event.target.innerText = "Guardar";
            event.target.classList.remove("bg-green-400", "hover:bg-green-600");
            event.target.classList.add("bg-blue-400", "hover:bg-blue-600");
        } else {
            cells.forEach(cell => {
                if (cell.classList.contains("image-cell")) {
                    const fileInput = cell.querySelector("input[type='file']");
                    if (fileInput && fileInput.files.length > 0) {
                        const img = document.createElement("img");
                        img.src = URL.createObjectURL(fileInput.files[0]);
                        img.classList.add("w-16", "h-16", "object-cover");
                        cell.innerText = "";
                        cell.appendChild(img);
                    }
                } else {
                    cell.innerText = cell.firstChild.value;
                }
            });
            event.target.innerText = "Editar";
            event.target.classList.remove("bg-blue-400", "hover:bg-blue-600");
            event.target.classList.add("bg-green-400", "hover:bg-green-600");
        }
    }

    function saveRow(event) {
        const row = event.target.closest("tr");
        const inputs = row.querySelectorAll("input");
        
        inputs.forEach(input => {
            input.parentElement.innerText = input.value;
        });
        
        event.target.remove();
    }

    addButton.addEventListener("click", () => {
        const newRow = document.createElement("tr");
        newRow.classList.add("bg-white", "border-b");
        newRow.innerHTML = `
            <td class="py-2 px-4 image-cell"><input type="file" accept="image/*"></td>
            <td class="py-2 px-4"><input type="text" placeholder="Nombre"></td>
            <td class="py-2 px-4"><input type="text" placeholder="Lote"></td>
            <td class="py-2 px-4"><input type="date"></td>
            <td class="py-2 px-4"><input type="text" placeholder="Concentración"></td>
            <td class="py-2 px-4"><input type="text" placeholder="Forma Farmacéutica"></td>
            <td class="py-2 px-4"><input type="number" placeholder="Precio"></td>
            <td class="py-2 px-4 flex gap-2">
                <button class="px-4 py-2 rounded-md text-white font-semibold shadow-md bg-green-400 hover:bg-green-600">Editar</button>
                <button class="px-4 py-2 rounded-md text-white font-semibold shadow-md bg-red-500 hover:bg-red-700">Eliminar</button>
                <button class="px-4 py-2 rounded-md text-white font-semibold shadow-md bg-blue-400 hover:bg-blue-600">Guardar</button>
            </td>
        `;
        tableBody.appendChild(newRow);
        newRow.querySelector(".bg-green-400").addEventListener("click", editRow);
        newRow.querySelector(".bg-red-500").addEventListener("click", deleteRow);
        newRow.querySelector(".bg-blue-400").addEventListener("click", saveRow);
    });

    document.querySelectorAll(".bg-green-400").forEach(btn => btn.addEventListener("click", editRow));
    document.querySelectorAll(".bg-red-500").forEach(btn => btn.addEventListener("click", deleteRow));
});


