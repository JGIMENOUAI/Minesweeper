"use strict";

function guardarPuntaje(nombre, tiempo) {
  var puntajes = JSON.parse(localStorage.getItem("puntajes") || "[]");
  puntajes.push({ nombre: nombre, tiempo: tiempo });
  puntajes.sort(function (a, b) {
    return a.tiempo - b.tiempo;
  });
  localStorage.setItem("puntajes", JSON.stringify(puntajes));
}
