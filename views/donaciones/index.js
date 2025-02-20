function openModal(modalId) {
    document.getElementById(modalId).classList.remove("hidden");
    document.getElementById(modalId).classList.add("flex");
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
    document.getElementById(modalId).classList.remove("flex");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".close-modal").forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".fixed");
            if (modal) closeModal(modal.id);
        });
    });
});
