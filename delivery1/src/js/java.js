// Función para abrir el modal de carga
function openUploadModal() {
    document.getElementById("uploadModal").style.display = "block";
}

// Función para cerrar el modal de carga
function closeUploadModal() {
    document.getElementById("uploadModal").style.display = "none";
}

// Función para cerrar el modal y recargar la página tras enviar el formulario
function closeModalAndReload() {
    closeUploadModal();  // Cierra el modal
    setTimeout(() => {
        window.location.reload(); // Recarga la página después de subir
    }, 100);
    return true;  // Permite que el formulario se envíe
}
