"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("formulario-contacto");

  if (!form) return;

  var nombre = form.nombre;
  var email = form.email;
  var mensaje = form.mensaje;

  function mostrarError(input, mensaje) {
    var error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-msg")) {
      error = document.createElement("span");
      error.className = "error-msg";
      error.style.color = "red";
      error.style.fontSize = "0.9em";
      error.style.display = "block";
      input.parentNode.insertBefore(error, input.nextSibling);
    }
    error.textContent = mensaje;
  }

  function limpiarError(input) {
    var error = input.nextElementSibling;
    if (error && error.classList.contains("error-msg")) {
      error.textContent = "";
    }
  }

  function validarNombre() {
    var val = nombre.value.trim();
    if (val.length <= 6 || val.indexOf(" ") === -1) {
      mostrarError(nombre, "Debe tener más de 6 letras y al menos un espacio.");
      return false;
    }
    limpiarError(nombre);
    return true;
  }

  function validarEmail() {
    var val = email.value.trim();
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) {
      mostrarError(email, "Debe ser un email válido.");
      return false;
    }
    limpiarError(email);
    return true;
  }

  function validarMensaje() {
    var val = mensaje.value.trim();
    if (val.length < 5) {
      mostrarError(mensaje, "Debe tener al menos 5 caracteres.");
      return false;
    }
    limpiarError(mensaje);
    return true;
  }

  nombre.addEventListener("blur", validarNombre);
  email.addEventListener("blur", validarEmail);
  mensaje.addEventListener("blur", validarMensaje);

  nombre.addEventListener("focus", function () {
    limpiarError(nombre);
  });
  email.addEventListener("focus", function () {
    limpiarError(email);
  });
  mensaje.addEventListener("focus", function () {
    limpiarError(mensaje);
  });

  form.addEventListener("submit", function (e) {
    var validoNombre = validarNombre();
    var validoEmail = validarEmail();
    var validoMensaje = validarMensaje();
  });
});
