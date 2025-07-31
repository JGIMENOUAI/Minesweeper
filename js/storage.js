"use strict";
// guarda un nuevo puntaje con los datos recibidos
function guardarPuntaje(nombre, tiempo, dificultad, gano) {
  var puntajes = JSON.parse(localStorage.getItem("puntajes") || "[]");
  puntajes.push({
    id: Date.now(),
    nombre: nombre,
    tiempo: tiempo,
    dificultad: dificultad,
    resultado: gano ? "Ganó" : "Perdió",
  });
  puntajes.sort(function (a, b) {
    // ordena los puntajes por tiempo ascendente.
    return a.tiempo - b.tiempo;
  });
  localStorage.setItem("puntajes", JSON.stringify(puntajes)); // guarda los puntajes en localStorage en formato json.
}
