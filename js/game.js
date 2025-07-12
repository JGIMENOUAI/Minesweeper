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

function iniciarJuego(dificultad) {
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
  document.getElementById("temporizador").textContent = "Tiempo: 0";
  document.getElementById("contador-minas").textContent = "Minas restantes: " + minas;
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
        minasAlrededor: 0
      };
    }
  }
  var colocadas = 0;
  while (colocadas < minas) {
    var rf = Math.floor(Math.random() * filas);
    var rc = Math.floor(Math.random() * columnas);
    if (!tablero[rf][rc].mina) {
      tablero[rf][rc].mina = true;
      colocadas++;
    }
  }
  for (var f = 0; f < filas; f++) {
    for (var c = 0; c < columnas; c++) {
      if (!tablero[f][c].mina) {
        var total = 0;
        for (var df = -1; df <= 1; df++) {
          for (var dc = -1; dc <= 1; dc++) {
            var nf = f + df;
            var nc = c + dc;
            if (nf >= 0 && nf < filas && nc >= 0 && nc < columnas && tablero[nf][nc].mina) {
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

  if (!juegoIniciado) {
    juegoIniciado = true;
    intervalo = setInterval(function () {
      temporizador++;
      document.getElementById("temporizador").textContent = "Tiempo: " + temporizador;
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
    mostrarModal("¡Perdiste!", "Has hecho clic en una mina.");
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
    mostrarModal("¡Ganaste!", "Has revelado todas las celdas.");
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
  document.getElementById("contador-minas").textContent = "Minas restantes: " + restantes;
}
