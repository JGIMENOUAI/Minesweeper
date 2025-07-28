"use strict";

const sonidoVictoria = new Audio("sounds/FortniteWin.mp3");
const sonidoDerrota = new Audio("sounds/FortniteLoss.mp3");

function renderizarTablero() {
  var divTablero = document.getElementById("tablero");
  divTablero.innerHTML = "";

  divTablero.style.display = "block";

  for (var f = 0; f < filas; f++) {
    var filaDiv = document.createElement("div");
    filaDiv.className = "fila";
    filaDiv.style.display = "flex";
    filaDiv.style.gap = "2px";

    for (var c = 0; c < columnas; c++) {
      var celda = document.createElement("div");
      celda.className = "celda";
      celda.dataset.fila = f;
      celda.dataset.columna = c;
      celda.style.width = "30px";
      celda.style.height = "30px";

      celda.addEventListener("click", function (e) {
        var fila = parseInt(e.target.dataset.fila, 10);
        var columna = parseInt(e.target.dataset.columna, 10);
        revelarCelda(fila, columna);
      });

      var presionado;
      celda.addEventListener("touchstart", function () {
        if (juegoTerminado) return;
        presionado = setTimeout(function () {
          alternarBandera(f, c);
        }, 3000); // 3 seg
      });

      celda.addEventListener("touchend", function () {
        clearTimeout(presionado);
      });

      celda.addEventListener("touchcancel", function () {
        clearTimeout(presionado);
      });

      filaDiv.appendChild(celda);
    }

    divTablero.appendChild(filaDiv);
  }
}

function mostrarModal(titulo, mensaje, victoria) {
  var modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class='modal-contenido'>
      <h2>${titulo}</h2>
      <p>${mensaje}</p>
      <button id="btnCerrarModal">Cerrar</button>
    </div>
  `;
  document.body.appendChild(modal);

  if (victoria) {
    sonidoVictoria.play();
  } else {
    sonidoDerrota.play();
  }

  document
    .getElementById("btnCerrarModal")
    .addEventListener("click", function () {
      modal.remove();
      if (titulo === "¡Perdiste!") {
        revelarTodasLasMinas();
      }
    });
}

function cerrarModal() {
  var modal = document.querySelector(".modal");
  if (modal) modal.remove();
}
