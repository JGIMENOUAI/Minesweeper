"use strict";

// comienza un nuevo juego con la dificultad elegida.
document.getElementById("nuevo-juego").addEventListener("click", function () {
  var dificultad = document.getElementById("dificultad").value;
  iniciarJuego(dificultad);
});

// Click izquierdo para revelar celdas.
document.getElementById("tablero").addEventListener("click", function (e) {
  if (e.target.classList.contains("celda")) {
    var fila = parseInt(e.target.dataset.fila, 10);
    var columna = parseInt(e.target.dataset.columna, 10);
    revelarCelda(fila, columna);
  }
});

// Click derecho para colocar/quitar banderas.
document
  .getElementById("tablero")
  .addEventListener("contextmenu", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("celda")) {
      var fila = parseInt(e.target.dataset.fila, 10);
      var columna = parseInt(e.target.dataset.columna, 10);
      var celda = tablero[fila][columna];
      if (!celda.revelada) {
        celda.bandera = !celda.bandera;
        e.target.classList.toggle("bandera");
        e.target.textContent = celda.bandera ? "🚩" : "";

        actualizarContadorMinas();
      }
    }
  });
