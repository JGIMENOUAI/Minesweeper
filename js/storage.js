"use strict";
function guardarPuntaje(nombre, tiempo, dificultad, gano) {
  var puntajes = JSON.parse(localStorage.getItem("puntajes") || "[]");
  puntajes.push({
    id: Date.now(), // identificador único
    nombre: nombre,
    tiempo: tiempo,
    dificultad: dificultad,
    resultado: gano ? "Ganó" : "Perdió",
  });
  // ordenar por tiempo o fecha si querés
  puntajes.sort(function (a, b) {
    return a.tiempo - b.tiempo;
  });
  localStorage.setItem("puntajes", JSON.stringify(puntajes));
}

