let jugadas =["piedra","papel","tijeras","spock","lagarto"];
let mensajes=["","Papel envuelve Piedra","","Tijeras corta Papel","Piedra aplasta Tijeras",
"Spock rompe Tijera","","Lagarto envenena Spock","Papel desautoriza Spock","Spock vaporiza Piedra",
"","","Tijera decapita Lagarto","","",
"Lagarto come Papel","Piedra aplasta Lagarto"]
let scorePlayer=0; //puntaje del usuario
let scoreComputer=0; //puntaje de la computadora
var scoreMax=0; //mayor entre scorePlayer y scoreComputer
var usuario; //elección del usuario
var partidas; //define variable de cantidad de partidas que se deben ganar para finalizar
var mensajeUsuario = document.getElementById("mensaje1"); //párrafo de jugada de usuario.
var mensajeComputadora = document.getElementById("mensaje2");//párrafo de jugada de computadora.
var mensajeResultado = document.getElementById("mensaje3"); //párrafo de resultado y score.
var mensajeFin = document.getElementById("mensaje4"); //párrafo de anuncio de ganador.
var mensajeElement = document.getElementById("mensaje"); //párrafo en caso de no elegir una opción al iniciar partida.
var buttons = document.getElementsByName('eleccion');// Obtener todos los botones con la clase "eleccion"
var codigoElement = document.getElementById("codigo"); // toma los elementos del div codigo, que es el de los botones PPT.
var codigoElement2 = document.getElementById("codigo2"); // toma los elementos del div codigo, que es el de los botones PPT.

var originalOnClicks = {}; // Variable para almacenar los eventos onclick originales
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

function generarBotones(){
    while (codigoElement.firstChild) {
      codigoElement.removeChild(codigoElement.firstChild);
    }    // Eliminar botones previos
  for (var i = 0; i < jugadas.length; i++) {
    var button = document.createElement("button");
    button.className = "button fit";
    button.name = "eleccion";
    button.id = jugadas[i];
    button.setAttribute("onclick", "determinarGanador(" + i + ");cambiarFondo(this)");
    button.textContent = jugadas[i].toUpperCase();
    codigoElement.appendChild(button);
  }
}

function comenzarJuego() { //Confirma cantidad de puntos. Habilita botones con restaurarOnClick()
  var opciones = document.getElementsByName("partidas");
  var seleccionado = false;
  for (var i = 0; i < opciones.length; i++) {
    if (opciones[i].checked) {
      seleccionado = true;
      partidas = Number(opciones[i].value);
      break;
    }
  }
  if (seleccionado) {
    document.getElementById("btn-comenzar").removeAttribute('onclick');
    for (var i = 0; i < opciones.length; i++) {
      opciones[i].disabled = true;
    }
    mensajeElement.textContent = "Comienza la partida. Gana quien llegue primero a " + partidas + " puntos.";
    generarBotones();
    restaurarOnClick();
    codigoElement2.style.display = "block";
  } else {
    mensajeElement.textContent = "Seleccione una alternativa para poder iniciar.";
  }
}

function obtenerJugadaUsuario(valor) { //Devuelve elección de usuario según botón que presione.
  usuario = Number(valor);
    mensajeUsuario.textContent = "Elegiste "+jugadas[usuario].toUpperCase();
return usuario;
}

function obtenerJugadaComputadora() {
  let computadora = Math.floor(Math.random() * 5);
    mensajeComputadora.textContent = " La computadora elige "+jugadas[computadora].toUpperCase();
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
  if( user===comp){
    mensajeResultado.textContent = ("  Empate. Muy poco original copiar a tu rival. \nLa partida continua "+scorePlayer+" - "+scoreComputer+".");
      } else if( 
  ((user+1)%jugadas.length===comp) || ((user+3)%jugadas.length===comp)  ){
    scoreComputer++;
    mensajeResultado.textContent =(mensajes[Math.abs(user**2-comp**2)].toUpperCase()+". Ha ganado la computadora. Era esperable. \nLa partida se encuentra "+scorePlayer+" - "+scoreComputer+".");
  } else {
    scorePlayer++;
    mensajeResultado.textContent =(mensajes[Math.abs(user**2-comp**2)].toUpperCase()+".  ¡Ganaste! Seguramente fue con suerte. \nLa partida se encuentra "+scorePlayer+" - "+scoreComputer+".");
  }

  checkEnd();
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
  codigoElement2.style.display = "none";
  codigoElement="";
  codigoElement = document.getElementById("codigo");
  document.getElementById("btn-comenzar").setAttribute('onclick', 'comenzarJuego()');
}