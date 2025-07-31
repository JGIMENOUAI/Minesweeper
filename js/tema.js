"use strict";

document.getElementById("modo-tema").addEventListener("click", function () {
  // Cuando se hace clic en el botón con ID modo-tema, se alterna la clase CSS modo-oscuro en el <body>, activando o desactivando el modo oscuro.
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

// Al cargar la página (DOMContentLoaded), se recupera el tema guardado.
//Si el valor es "oscuro", se aplica la clase modo-oscuro al <body> y se actualiza el ícono.
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
