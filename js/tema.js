"use strict";

document.getElementById("modo-tema").addEventListener("click", function () {
  document.body.classList.toggle("modo-oscuro");

  const icono = this.querySelector("i");
  if (document.body.classList.contains("modo-oscuro")) {
    localStorage.setItem("tema", "oscuro");
    icono.classList.remove("fa-moon");
    icono.classList.add("fa-sun");
  } else {
    localStorage.setItem("tema", "claro");
    icono.classList.remove("fa-sun");
    icono.classList.add("fa-moon");
  }
});

window.addEventListener("DOMContentLoaded", function () {
  const temaGuardado = localStorage.getItem("tema");
  const icono = document.getElementById("modo-tema")?.querySelector("i");

  if (temaGuardado === "oscuro") {
    document.body.classList.add("modo-oscuro");
    if (icono) {
      icono.classList.remove("fa-moon");
      icono.classList.add("fa-sun");
    }
  }
});
