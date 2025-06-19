"use strict";

function renderizarTablero() {
  var divTablero = document.getElementById("tablero");
  divTablero.innerHTML = "";

  // Establecer ancho dinámico para simular filas con Flexbox
  divTablero.style.width = (columnas * 32) + "px"; // 30px celda + 2px gap

  for (var f = 0; f < filas; f++) {
    for (var c = 0; c < columnas; c++) {
      var celda = document.createElement("div");
      celda.className = "celda";
      celda.dataset.fila = f;
      celda.dataset.columna = c;
      divTablero.appendChild(celda);
    }
  }
}

function mostrarModal(titulo, mensaje) {
  var modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = "<div class='modal-contenido'><h2>" + titulo + "</h2><p>" + mensaje + "</p><button onclick='cerrarModal()'>Cerrar</button></div>";
  document.body.appendChild(modal);
}

function cerrarModal() {
  var modal = document.querySelector(".modal");
  if (modal) modal.remove();
}
