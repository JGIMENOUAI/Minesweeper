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

// Variables para pos primer click
var primerClickFila = -1;
var primerClickColumna = -1;

function iniciarJuego(dificultad) {
  const nombre = document.getElementById("nombre-jugador").value.trim();

  if (nombre.length < 3) {
    alert(
      "Por favor, ingresa tu nombre (al menos 3 caracteres) antes de iniciar el juego."
    );
    return; // No iniciar el juego
  }

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
  generarTablero();
  renderizarTablero();
}

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
  // NO colocamos minas aquí, se colocan después del primer clic
}

function colocarMinas(filaExcluida, columnaExcluida) {
  var colocadas = 0;
  while (colocadas < minas) {
    var rf = Math.floor(Math.random() * filas);
    var rc = Math.floor(Math.random() * columnas);

    // Evitar poner mina en la celda del primer clic
    if ((rf === filaExcluida && rc === columnaExcluida) || tablero[rf][rc].mina)
      continue;

    tablero[rf][rc].mina = true;
    colocadas++;
  }

  // Calcular minas alrededor ahora que están colocadas
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

function revelarCelda(f, c) {
  if (juegoTerminado) return;

  // Si no se inició el juego, iniciarlo y colocar minas evitando esta celda
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

  if (celda.mina) {
    div.textContent = "💣";
    div.classList.add("mina-explotada"); // 🔴 Resaltar la mina que explotó
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

  if (celda.minasAlrededor > 0) {
    div.textContent = celda.minasAlrededor;
    div.classList.add(`celda-${celda.minasAlrededor}`); // ✅ Colorea según el número
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

function renderizarTablaPuntajes() {
  let puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];

  // Ordenar alfabéticamente por nombre
  puntajes.sort((a, b) => a.nombre.localeCompare(b.nombre));

  const tbody = document.querySelector("#tabla-puntajes tbody");
  tbody.innerHTML = "";

  for (let p of puntajes) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.dificultad}</td>
      <td>${p.resultado}</td>
      <td>${p.tiempo}</td>
    `;
    tbody.appendChild(fila);
  }
}

// 🔽 Primero definí la función
function borrarPuntajes() {
  if (confirm("¿Estás seguro de que querés borrar todo el historial?")) {
    localStorage.removeItem("puntajes");
    renderizarTablaPuntajes(); // esta función también debe estar declarada antes
  }
}

// 🔽 Luego hacé la asociación con el botón
document.addEventListener("DOMContentLoaded", () => {
  const btnBorrar = document.getElementById("btn-borrar-puntajes");
  if (btnBorrar) {
    btnBorrar.addEventListener("click", borrarPuntajes);
  }
});

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
