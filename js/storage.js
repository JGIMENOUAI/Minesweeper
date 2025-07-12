"use strict";
function guardarPuntaje(nombre, tiempo, dificultad, gano) {
  var puntajes = JSON.parse(localStorage.getItem("puntajes") || "[]");
  puntajes.push({
    nombre: nombre,
    tiempo: tiempo,
    dificultad: dificultad,
    resultado: gano ? "Ganó" : "Perdió"
  });
  puntajes.sort(function (a, b) {
    return a.tiempo - b.tiempo;
  });
  localStorage.setItem("puntajes", JSON.stringify(puntajes));
}
