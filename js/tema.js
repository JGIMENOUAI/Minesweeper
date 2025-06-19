"use strict";

// Alternar entre modo claro y oscuro
document.getElementById("modo-tema").addEventListener("click", function () {
  document.body.classList.toggle("modo-oscuro");

  // Guardar preferencia en localStorage
  if (document.body.classList.contains("modo-oscuro")) {
    localStorage.setItem("tema", "oscuro");
  } else {
    localStorage.setItem("tema", "claro");
  }
});

// Aplicar tema guardado al cargar la página
window.addEventListener("DOMContentLoaded", function () {
  var temaGuardado = localStorage.getItem("tema");
  if (temaGuardado === "oscuro") {
    document.body.classList.add("modo-oscuro");
  }
});
