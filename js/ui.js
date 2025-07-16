"use strict";

const sonidoVictoria = new Audio("sounds/FortniteWin.mp3");
const sonidoDerrota = new Audio("sounds/FortniteLoss.mp3");


function renderizarTablero() {
  var divTablero = document.getElementById("tablero");
  divTablero.innerHTML = "";

  divTablero.style.display = "block"; // por si usás flexbox más adelante

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

      // 🖱️ Evento para revelar celda con click
      celda.addEventListener("click", () => {
        revelarCelda(f, c);
      });

      // 📱 Soporte para móviles: mantener presionado 3s para bandera
      let presionado;
      celda.addEventListener("touchstart", () => {
        if (juegoTerminado) return;
        presionado = setTimeout(() => {
          alternarBandera(f, c);
        }, 3000); // 3 segundos
      });

      celda.addEventListener("touchend", () => clearTimeout(presionado));
      celda.addEventListener("touchcancel", () => clearTimeout(presionado));

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
  
    // Reproducir el sonido según victoria o derrota
  if (victoria) {
    sonidoVictoria.play();
  } else {
    sonidoDerrota.play();
  }

  // Al cerrar, si perdiste, revelar minas
  document.getElementById("btnCerrarModal").addEventListener("click", function () {
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
