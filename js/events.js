
"use strict";

document.getElementById("nuevo-juego").addEventListener("click", function () {
    var dificultad = document.getElementById("dificultad").value;
    iniciarJuego(dificultad);
});

document.getElementById("tablero").addEventListener("click", function (e) {
    if (e.target.classList.contains("celda")) {
        var fila = parseInt(e.target.dataset.fila, 10);
        var columna = parseInt(e.target.dataset.columna, 10);
        revelarCelda(fila, columna);
    }
});

document.getElementById("tablero").addEventListener("contextmenu", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("celda")) {
    var fila = parseInt(e.target.dataset.fila, 10);
    var columna = parseInt(e.target.dataset.columna, 10);
    var celda = tablero[fila][columna];
    if (!celda.revelada) {
      celda.bandera = !celda.bandera;
      e.target.classList.toggle("bandera");
      e.target.textContent = celda.bandera ? "🚩" : "";
    }
  }
});

document.getElementById("formulario-contacto")?.addEventListener("submit", function (e) {
  var nombre = this.nombre.value.trim();
  var email = this.email.value.trim();
  var mensaje = this.mensaje.value.trim();
  if (nombre.length < 3 || !email.includes("@") || mensaje.length < 5) {
    alert("Por favor completa todos los campos correctamente.");
    e.preventDefault();
  }
});

