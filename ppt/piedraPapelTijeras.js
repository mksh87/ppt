console.log("\nBienvenido al juego de piedra-papel-tijeras! Competirás contra la computadora en una batalla sin igual.");
const readlineSync = require('readline-sync');

//el jugador elije la cantidad de rondas que se deben ganar para ganar el juego
let partidas
do{
partidas = Number(readlineSync.question('Cuantas rondas debe ganar un jugador para que termine la partida? '));
    if(partidas>0 && partidas%1===0){
        console.log(" El que llegue a %i partidas será el ganador.\n",partidas)
    } else { console.log(" Elegiste un valor inválido. Elegir un valor numérico entero.") }
}while(!(partidas>0 && partidas%1===0));

//contador para puntajes
let scorePlayer=0;
let scoreComputer=0;
var scoreMax=0;
let elecciones=["piedra","papel","tijeras"]; //opciones para asignar según random de la computadora

function obtenerJugadaUsuario(){
    let usuario;
    do{
    usuario =readlineSync.question('Ingresa tu opcion: pierda, papel o tijeras? --> ');
    usuario=usuario.toLowerCase();
        if(!(usuario==="piedra" || usuario==="papel" || usuario ==="tijeras")){
            console.log(" Elegiste un valor inválido.\n Por favor selecciona piedra, papel o tijeras. Revisa ortografía.");
        }else {
            console.log(" >> Elegiste "+usuario.toUpperCase());
        }
    } while(!(usuario==="piedra" || usuario==="papel" || usuario ==="tijeras"));
return usuario;
}

function obtenerJugadaComputadora() {
    let random = Math.floor(Math.random() * 3);
    let computadora=elecciones[random]
    console.log(" >> La computadora eligió "+computadora.toUpperCase());
return computadora;
}

function determinarGanador(){
    let user = obtenerJugadaUsuario()
    let comp = obtenerJugadaComputadora();
    if( 
    (user==="piedra" && comp==="papel") || 
    (user==="papel" && comp==="tijeras") || 
    (user==="tijeras" && comp==="piedra")){
        scoreComputer++;
        console.log("Ganó la computadora. La partida se encuentra %i - %i.\n",scorePlayer,scoreComputer);
    } else if( 
    (user==="papel" && comp==="piedra") || 
    (user==="tijeras" && comp==="papel") || 
    (user==="piedra" && comp==="tijeras")){
        scorePlayer++;
        console.log("GANASTE!! La partida se encuentra %i - %i.\n",scorePlayer,scoreComputer);
    } else {
        console.log("EMPATE. La partida continúa %i - %i.\n",scorePlayer,scoreComputer);
    }
}

while(scoreMax<partidas){
    determinarGanador();
    scoreMax = Math.max(scorePlayer,scoreComputer);
}

if (scorePlayer<scoreComputer){
    console.log("La computadora llegó a %i victorias y ganó la partida. No te desanimes! Hay cosas peores en la vida.",partidas);
} else if(scorePlayer>scoreComputer){
    console.log("Llegaste a %i victorias y ganaste la partida. FELICITACIONES!",partidas);
}else {
    console.log("Algo salió mal. Por favor informar el bug para ayudara este programador novato.");
}