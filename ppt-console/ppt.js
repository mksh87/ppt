let scorePlayer=0; //puntaje del usuario
let scoreComputer=0; //puntaje de la computadora
var scoreMax=0; //mayor entre scorePlayer y scoreComputer
var usuario; //elección del usuario
var mensajeUsuario = document.getElementById("mensaje1"); //párrafo de jugada de usuario.
var mensajeComputadora = document.getElementById("mensaje2");//párrafo de jugada de computadora.
var mensajeResultado = document.getElementById("mensaje3"); //párrafo de resultado y score.
var mensajeFin = document.getElementById("mensaje4"); //párrafo de anuncio de ganador.
var partidas; //define variable de cantidad de partidas que se deben ganar para finalizar
var mensajeElement = document.getElementById("mensaje"); //párrafo en caso de no elegir una opción al iniciar partida.
var codigoElement = document.getElementById("codigo"); // toma los elementos del div codigo, que es el de los botones PPT.
var originalOnClicks = {}; // Variable para almacenar los eventos onclick originales
var buttons = document.getElementsByName('eleccion');// Obtener todos los botones con la clase "eleccion"
let ultimoBotonPresionado = null; // Variable para almacenar el último botón presionado

function cambiarFondo(boton) {// Cambiar el fondo del botón presionado a verde
  if (ultimoBotonPresionado !== null) {  // Restablecer el fondo del último botón presionado a su estado original
    ultimoBotonPresionado.style.backgroundColor = '';
  }
  boton.style.backgroundColor = 'green';  // Establecer el fondo del botón presionado a verde
  ultimoBotonPresionado = boton;  // Guardar el botón presionado como el último botón
}

function desactivarOnClick() {   // Desactivar los eventos onclick
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    var originalOnClick = button.getAttribute('onclick');
    originalOnClicks[button.id] = originalOnClick; // Almacenar el evento onclick original
    button.removeAttribute('onclick');
  }
}

function restaurarOnClick() { // Restaurar los eventos onclick originales
var buttons = document.getElementsByName('eleccion');
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    var originalOnClick = originalOnClicks[button.id];
    if (originalOnClick) {
      button.setAttribute('onclick', originalOnClick);
    }
  }
}

function comenzarJuego() { //Confirma cantidad de puntos. Habilita botones con restaurarOnClick()
  var opciones = document.getElementsByName("partidas");
  var seleccionado = false;
  restaurarOnClick();
  for (var i = 0; i < opciones.length; i++) {
    if (opciones[i].checked) {
      seleccionado = true;
      partidas = opciones[i].value;
      break;
    }
  }
  if (seleccionado) {
    document.getElementById("btn-comenzar").removeAttribute('onclick');
    for (var i = 0; i < opciones.length; i++) {
      opciones[i].disabled = true;
    }
    mensajeElement.textContent = "Comienza la partida.\nGana quien llegue primero a " + partidas + " puntos.";
    codigoElement.style.display = "block";
  } else {
    mensajeElement.textContent = "Seleccione una alternativa para poder iniciar.";
  }
}

function obtenerJugadaUsuario(valor) { //Devuelve elección de usuario según botón que presione.
  usuario = Number(valor);
  if (usuario === 1) {
    mensajeUsuario.textContent = "Elegiste PIEDRA.";
  } else if (usuario === 2) {
    mensajeUsuario.textContent = "Elegiste PAPEL.";
  } else if (usuario === 3) {
    mensajeUsuario.textContent = "Elegiste TIJERAS.";
  }
  return usuario;
}

function obtenerJugadaComputadora() {
  let computadora = Math.floor(Math.random() * 3+1);
  if(computadora===1){
    mensajeComputadora.textContent = " La computadora elige PIEDRA.";
  }else if(computadora===2){
    mensajeComputadora.textContent = " La computadora elige PAPEL.";
  }else if(computadora===3){
    mensajeComputadora.textContent = " La computadora elige TIJERAS.";
  }
  return computadora;
}

function checkEnd(){ //Verifica si scoreMax llega a las puntos elegidos. Da mensaje de finalización y deshabilita botones con desactivarOnClick()
  scoreMax = Math.max(scorePlayer,scoreComputer);
  if(scoreMax>=partidas){
    desactivarOnClick()
    if (scorePlayer<scoreComputer){
      mensajeFin.textContent = 
      "La computadora ha llegado a "+partidas+" victorias y gana la partida. No te desanimes! Hay cosas peores en la vida.";
    }else if(scorePlayer>scoreComputer){
      mensajeFin.textContent = 
      "Llegaste a "+partidas+" victorias y ganaste la partida. Siempre confiamos en ti. ¡FELICITACIONES!";
    }else {
      mensajeFin.textContent = 
      "Algo ha salido mal. Por favor informar el bug para ayudara este programador novato.";
    }
  }
}   

function determinarGanador(a){ // Usa obtenerJugadaUsuario y obtenerJugadaComputadora para determinar ganador. Suma puntos y da mensaje
  let user = obtenerJugadaUsuario(a);
  let comp = Number(obtenerJugadaComputadora());
  if( 
  (user===1 && comp===2) || 
  (user===2 && comp===3) || 
  (user===3 && comp===1)){
    scoreComputer++;
    mensajeResultado.textContent =("  Ha ganado la computadora. Era esperable.\nLa partida se encuentra "+scorePlayer+" - "+scoreComputer+".");
  } else if( 
  (user===2 && comp===1) || 
  (user===3 && comp===2) || 
  (user===1 && comp===3)){
    scorePlayer++;
    mensajeResultado.textContent =("  ¡Ganaste! Seguramente fue con suerte.\nLa partida se encuentra "+scorePlayer+" - "+scoreComputer+".");
  } else {
    mensajeResultado.textContent = ("  Empate. Muy poco original copiar a tu rival.\nLa partida continua "+scorePlayer+" - "+scoreComputer+".");
  }

  checkEnd()
}

function resetear() { //Restaura todo a la pantalla de selección de partidas
  var opciones = document.getElementsByName("partidas");
  for (var i = 0; i < opciones.length; i++) {
    opciones[i].disabled = false;
    opciones[i].checked = false;
  }
  if (ultimoBotonPresionado !== null) {  // Restablecer el fondo del último botón presionado a su estado original
    ultimoBotonPresionado.style.backgroundColor = '';
  }
  mensajeElement.textContent = "";
  mensajeUsuario.textContent = "";
  mensajeComputadora.textContent = "";
  mensajeResultado.textContent = "";
  mensajeFin.textContent = "";
  scorePlayer=0;
  scoreComputer=0;
  codigoElement.style.display = "none";
  document.getElementById("btn-comenzar").setAttribute('onclick', 'comenzarJuego()');
}