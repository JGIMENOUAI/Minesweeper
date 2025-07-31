"use strict";
var tablero = [];
var filas = 0;
var columnas = 0;
var minas = 0;
var reveladas = 0;
var temporizador = 0;
var intervalo;
var juegoIniciado = false;
var juegoTerminado = false;

var primerClickFila = -1;
var primerClickColumna = -1;

function iniciarJuego(dificultad) {
  const nombre = document.getElementById("nombre-jugador").value.trim();

  if (nombre.length < 3) {
    // Valida el nombre ingresado (mínimo 3 caracteres).
    mostrarModalNombreInvalido();
    return;
  }

  // Establece el tamaño del tablero y número de minas según la dificultad.
  if (dificultad === "facil") {
    filas = columnas = 8;
    minas = 10;
  } else if (dificultad === "medio") {
    filas = columnas = 12;
    minas = 25;
  } else {
    filas = columnas = 16;
    minas = 40;
  }

  //Reinicia todas las variables y estado del juego.
  tablero = [];
  reveladas = 0;
  clearInterval(intervalo);
  temporizador = 0;
  juegoIniciado = false;
  juegoTerminado = false;
  primerClickFila = -1;
  primerClickColumna = -1;

  document.getElementById("temporizador").textContent = "Tiempo: 0";
  document.getElementById("contador-minas").textContent =
    "Minas restantes: " + minas;
  generarTablero(); // inicializa la matriz vacía del tablero.
  renderizarTablero(); // dibuja visualmente el tablero.
}

// Muestra u oculta un modal si el nombre del jugador no es válido.
function mostrarModalNombreInvalido() {
  const modal = document.getElementById("modal-nombre");
  modal.classList.remove("oculto");
}

function cerrarModalNombreInvalido() {
  const modal = document.getElementById("modal-nombre");
  modal.classList.add("oculto");
}
// inicializa la matriz vacía del tablero. Crea una matriz de objetos para representar cada celda
function generarTablero() {
  for (var f = 0; f < filas; f++) {
    tablero[f] = [];
    for (var c = 0; c < columnas; c++) {
      tablero[f][c] = {
        mina: false,
        revelada: false,
        bandera: false,
        minasAlrededor: 0,
      };
    }
  }
}

// Coloca las minas en el tablero, evitando la celda del primer clic.
function colocarMinas(filaExcluida, columnaExcluida) {
  var colocadas = 0;
  while (colocadas < minas) {
    var rf = Math.floor(Math.random() * filas);
    var rc = Math.floor(Math.random() * columnas);

    if ((rf === filaExcluida && rc === columnaExcluida) || tablero[rf][rc].mina)
      continue;

    tablero[rf][rc].mina = true;
    colocadas++;
  }

  // Calcula las minas alrededor de cada celda.
  for (var f = 0; f < filas; f++) {
    for (var c = 0; c < columnas; c++) {
      if (!tablero[f][c].mina) {
        var total = 0;
        for (var df = -1; df <= 1; df++) {
          for (var dc = -1; dc <= 1; dc++) {
            var nf = f + df;
            var nc = c + dc;
            if (
              nf >= 0 &&
              nf < filas &&
              nc >= 0 &&
              nc < columnas &&
              tablero[nf][nc].mina
            ) {
              total++;
            }
          }
        }
        tablero[f][c].minasAlrededor = total;
      }
    }
  }
}

// Revela una celda al hacer clic. Si es la primera celda, coloca las minas y comienza el temporizador.
function revelarCelda(f, c) {
  if (juegoTerminado) return;

  // Marca que el juego ha iniciado. Coloca las minas después del primer clic. Inicia el temporizador.
  if (!juegoIniciado) {
    juegoIniciado = true;
    primerClickFila = f;
    primerClickColumna = c;
    colocarMinas(f, c);

    intervalo = setInterval(function () {
      temporizador++;
      document.getElementById("temporizador").textContent =
        "Tiempo: " + temporizador;
    }, 1000);
  }

  var celda = tablero[f][c];
  if (celda.revelada || celda.bandera) return;

  celda.revelada = true;
  reveladas++;

  var divs = document.querySelectorAll(".celda");
  var index = f * columnas + c;
  var div = divs[index];
  div.classList.add("revelada");

  // SI hay una mina, termina el juego (derrota), detiene el temporizador y guarda el puntaje.
  if (celda.mina) {
    div.textContent = "💣";
    div.classList.add("mina-explotada");
    mostrarModal("¡Perdiste!", "Has hecho clic en una mina.", false);
    clearInterval(intervalo);
    juegoTerminado = true;
    const nombre = document.getElementById("nombre-jugador").value;
    const dificultad = document.getElementById("dificultad").value;
    if (nombre.length >= 3) {
      guardarPuntaje(nombre, temporizador, dificultad, false);
      renderizarTablaPuntajes();
    }
    return;
  }
  // Si la celda no tiene minas alrededor, revela las celdas adyacentes.
  if (celda.minasAlrededor > 0) {
    div.textContent = celda.minasAlrededor;
    div.classList.add(`celda-${celda.minasAlrededor}`);
  } else {
    for (var df = -1; df <= 1; df++) {
      for (var dc = -1; dc <= 1; dc++) {
        var nf = f + df;
        var nc = c + dc;
        if (nf >= 0 && nf < filas && nc >= 0 && nc < columnas) {
          revelarCelda(nf, nc);
        }
      }
    }
  }
  // Detiene el juego, muestra un modal y guarda el puntaje.
  if (reveladas === filas * columnas - minas) {
    clearInterval(intervalo);
    mostrarModal("¡Ganaste!", "Has revelado todas las celdas.", true);
    juegoTerminado = true;
    var nombre = document.getElementById("nombre-jugador").value;
    if (nombre.length >= 3) {
      const dificultad = document.getElementById("dificultad").value;
      guardarPuntaje(nombre, temporizador, dificultad, true);
      renderizarTablaPuntajes();
    }
  }
}

// Recorre todo el tablero. Cuenta las celdas que tienen bandera = true.
function actualizarContadorMinas() {
  var banderas = 0;
  for (var f = 0; f < filas; f++) {
    for (var c = 0; c < columnas; c++) {
      if (tablero[f][c].bandera) banderas++;
    }
  }
  var restantes = minas - banderas;
  document.getElementById("contador-minas").textContent =
    "Minas restantes: " + restantes;
}

// Cuando el jugador pierde, muestra todas las minas del tablero.
function revelarTodasLasMinas() {
  var divs = document.querySelectorAll(".celda");
  for (var f = 0; f < filas; f++) {
    for (var c = 0; c < columnas; c++) {
      var celda = tablero[f][c];
      if (celda.mina) {
        var index = f * columnas + c;
        var div = divs[index];
        if (!celda.revelada) {
          div.classList.add("revelada");
          div.textContent = "💣";
        }
      }
    }
  }
}

// Carga los puntajes guardados en localStorage y los muestra en una tabla HTML.
function renderizarTablaPuntajes() {
  const puntajes = JSON.parse(localStorage.getItem("puntajes")) || []; // Lee el array de puntajes desde localStorage.

  puntajes.sort(function (a, b) {
    // Lo ordena alfabéticamente por nombre.
    return a.nombre.localeCompare(b.nombre);
  });

  const tbody = document.querySelector("#tabla-puntajes tbody"); // Limpia el contenido anterior de la tabla.
  tbody.innerHTML = "";

  puntajes.forEach(function (p) {
    // Crea una fila (<tr>) por cada puntaje con nombre, dificultad, resultado y tiempo.
    var fila = document.createElement("tr");
    fila.innerHTML =
      "<td>" +
      p.nombre +
      "</td>" +
      "<td>" +
      p.dificultad +
      "</td>" +
      "<td>" +
      p.resultado +
      "</td>" +
      "<td>" +
      p.tiempo +
      "</td>";
    tbody.appendChild(fila);
  });
}

// Este bloque se ejecuta cuando la página ha terminado de cargar. Define comportamiento para los botones relacionados con los puntajes
document.addEventListener("DOMContentLoaded", function () {
  var btnVerPuntajes = document.getElementById("btn-ver-puntajes");
  var modalPuntajes = document.getElementById("modal-puntajes");
  var cerrarModal = document.getElementById("cerrar-modal-puntajes");

  var modalConfirmacion = document.getElementById("modal-confirmacion");
  var btnBorrar = document.getElementById("btn-borrar-puntajes");
  var btnConfirmar = document.getElementById("btn-confirmar-borrado");
  var btnCancelar = document.getElementById("btn-cancelar-borrado");

  function abrirModalConfirmacion() {
    modalConfirmacion.style.display = "flex";
  }

  if (btnVerPuntajes) {
    btnVerPuntajes.addEventListener("click", function () {
      renderizarTablaPuntajes();
      modalPuntajes.className = modalPuntajes.className
        .replace("oculto", "")
        .trim();
    });
  }

  if (cerrarModal) {
    cerrarModal.addEventListener("click", function () {
      if (modalPuntajes.className.indexOf("oculto") === -1) {
        modalPuntajes.className += " oculto";
      }
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modalPuntajes) {
      if (modalPuntajes.className.indexOf("oculto") === -1) {
        modalPuntajes.className += " oculto";
      }
    }
  });

  if (btnBorrar) {
    btnBorrar.addEventListener("click", abrirModalConfirmacion);
  }

  if (btnCancelar) {
    btnCancelar.addEventListener("click", function () {
      modalConfirmacion.style.display = "none";
    });
  }

  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", function () {
      localStorage.removeItem("puntajes");
      renderizarTablaPuntajes();
      modalConfirmacion.style.display = "none";
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modalConfirmacion) {
      modalConfirmacion.style.display = "none";
    }
  });
});

// Coloca o quita una bandera en una celda específica (usado para marcar minas).
function alternarBandera(f, c) {
  var celda = tablero[f][c];
  if (celda.revelada) return;

  celda.bandera = !celda.bandera;

  var divs = document.querySelectorAll(".celda");
  var index = f * columnas + c;
  var div = divs[index];

  div.textContent = celda.bandera ? "🚩" : "";
  div.classList.toggle("bandera", celda.bandera);

  actualizarContadorMinas();
}
