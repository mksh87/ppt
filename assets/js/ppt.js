let scorePlayer=0, scoreComputer=0, scoreMax=0; //Variables de puntajes
let usuario; //elección del usuario
let partidas; //define variable de cantidad de partidas que se deben ganar para finalizar

//Párrafos de mensajes
const mensajeElement = document.getElementById("mensaje"); // Al elegir (o no) una opción al iniciar partida.
const mensajeUsuario = document.getElementById("mensaje1"); //jugada del usuario.
const mensajeComputadora = document.getElementById("mensaje2");//jugada de computadora.
const mensajeResultado = document.getElementById("mensaje3"); //resultado y score.
const mensajeFin = document.getElementById("mensaje4"); //anuncio de ganador.

//Botones y displays del juego
const opciones = document.getElementsByName("partidas"); //botones de cantidad de partidas
const codigoElement = document.getElementById("codigo"); //div del juego (para mostrarlo u ocultarlo)
const btnGen = document.getElementById("codigo2"); // toma los elementos del div codigo, que es el de los botones PPT.
const buttons = document.getElementsByName("eleccion");// botones de opciones
let originalOnClicks = {}; // Para almacenar los eventos onclick originales
let ultimoBotonPresionado = null; // Para almacenar el último botón presionado


function cambiarFondo(boton) {// Cambiar el fondo del botón presionado a verde
  if (ultimoBotonPresionado !== null) {  // Restablecer el fondo del último botón presionado a su estado original
    ultimoBotonPresionado.style.backgroundColor = '';
  }
  boton.style.backgroundColor = 'green';  // Establecer el fondo del botón presionado a verde
  ultimoBotonPresionado = boton;  // Guardar el botón presionado como el último botón
}

function desactivarOnClick() {   // Desactivar los eventos onclick
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    let originalOnClick = button.getAttribute('onclick');
    originalOnClicks[button.id] = originalOnClick; // Almacenar el evento onclick original
    button.removeAttribute('onclick');
  }
}

function restaurarOnClick() { // Restaurar los eventos onclick originales
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    let originalOnClick = originalOnClicks[button.id];
    if (originalOnClick) {
      button.setAttribute('onclick', originalOnClick);
    }
  }
}

function generarBotones(){
    while (btnGen.firstChild) {
      btnGen.removeChild(btnGen.firstChild);
    }    // Eliminar botones previos
  for (let i = 0; i < jugadas.length; i++) {
    let button = document.createElement("button");
    button.className = "button fit";
    button.name = "eleccion";
    button.id = jugadas[i];
    button.setAttribute("onclick", "determinarGanador(" + i + ");cambiarFondo(this)");
    button.textContent = jugadas[i].toUpperCase();
    btnGen.appendChild(button);
  }
}

function comenzarJuego() { //Confirma cantidad de puntos. Habilita botones con restaurarOnClick()
  let seleccionado = false;
  for (let i = 0; i < opciones.length; i++) {
    if (opciones[i].checked) {
      seleccionado = true;
      partidas = Number(opciones[i].value);
      break;
    }
  }
  if (seleccionado) {
    document.getElementById("btn-comenzar").removeAttribute('onclick');
    for (let i = 0; i < opciones.length; i++) {
      opciones[i].disabled = true;
    }
    mensajeElement.textContent = "Comienza la partida. Gana quien llegue primero a " + partidas + " puntos.";
    generarBotones();
    restaurarOnClick();
    codigoElement.style.display = "block";
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
  let computadora = Math.floor(Math.random() * jugadas.length);
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
    }else{
    for(let r=1; r<jugadas.length;r+=2){
        if((user+r)%jugadas.length===comp){
            scoreComputer++;
            mensajeResultado.textContent =((jugadas[comp]+" "+mensajes[user][comp]+" "+jugadas[user]).toUpperCase()+". Ha ganado la computadora. Era esperable. \nLa partida se encuentra "+scorePlayer+" - "+scoreComputer+".");
        } else if((user+1+r)%jugadas.length===comp){
            scorePlayer++;
            mensajeResultado.textContent =((jugadas[user]+" "+mensajes[user][comp]+" "+jugadas[comp]).toUpperCase()+".  ¡Ganaste! Seguramente fue con suerte. \nLa partida se encuentra "+scorePlayer+" - "+scoreComputer+".");
          }
    }
}
  checkEnd();
}

function resetear() { //Restaura todo a la pantalla de selección de partidas
  for (let i = 0; i < opciones.length; i++) {
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


//viejos por las dudas
/*let mensajes2=["","Papel envuelve Piedra","","Tijeras corta Papel","Piedra aplasta Tijeras",
"Spock rompe Tijera","","Lagarto envenena Spock","Papel desautoriza Spock","Spock vaporiza Piedra",
"","","Tijera decapita Lagarto","","",
"Lagarto come Papel","Piedra aplasta Lagarto"]*/