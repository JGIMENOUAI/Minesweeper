"use strict";

const sonidoVictoria = new Audio("sounds/FortniteWin.mp3");
const sonidoDerrota = new Audio("sounds/FortniteLoss.mp3");


function renderizarTablero() {
  var divTablero = document.getElementById("tablero");
  divTablero.innerHTML = "";
  
  // Quitamos estilos de grid
  divTablero.style.display = "block"; // o no asignar nada para que sea normal
  
  for (var f = 0; f < filas; f++) {
    var filaDiv = document.createElement("div");
    filaDiv.className = "fila"; // para luego estilizar con flexbox
    filaDiv.style.display = "flex";
    filaDiv.style.gap = "2px"; // separación horizontal entre celdas
    
    for (var c = 0; c < columnas; c++) {
      var celda = document.createElement("div");
      celda.className = "celda";
      celda.dataset.fila = f;
      celda.dataset.columna = c;
      celda.style.width = "30px";  // tamaño fijo igual que antes
      celda.style.height = "30px";
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
