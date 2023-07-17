    //defino algunas variables que utilizan otras funciones
    var equipo=[];
    var selPlayer

    //para mostrar el listado del equipo en pantalla
    function printList(){
        var equipoInfo=""; //variable de listado de info de jugadores del equipo
            for (i = 0; i< equipo.length; i++) {
            var eq=  equipo[i]; //para cada jugador del equipo
            equipoInfo += '<input onClick="selectPlayer()" type="radio" name="player" value="'+i+'" />' 
            //diferencio value por jugador para ayudar a los bontones Modificar y Eliminar.
            for (var propiedad in eq) { //para cada propiedad del jugador
            equipoInfo += propiedad + ": " + eq[propiedad] + ' | '; 
            }
            equipoInfo += '</br>' 
            //salto del renglon al final de cada jugador
            }
            document.getElementById("listado").innerHTML = equipoInfo; //imprime el listado en el div correspondiente
        }
    
    //para los radio define el valor de selPlayer para luego eliminar o modificar
    function selectPlayer(){
        selPlayer= Number(document.querySelector("input[type='radio'][name=player]:checked").value);
    }

    function deletePlayer(){
        equipo.splice(selPlayer,1); //(se basa en la variable que marca el jugador seleccionado, Elimina un elemento)
        printList(); //llama la función que ya estaba definida antes
    }

    //se llama showResult pero solo agrega el jugador al equipo, la parte de mostrar la separé
    function showResult() {
    const form = document.querySelector('form'); //crea la variable form y ...?
    form.addEventListener('submit', (e) => {  //listener al apretar el botón submit
        e.preventDefault(); // Previene HTML refresh con cada clic del botón
        const formData = new FormData(form); // Junta los resultados del formulario
        var jugador = Object.fromEntries(formData); // edita el objeto jugador
        equipo.push(jugador); //agrega jugador al equipo
        console.log(equipo);
        printList();
        })
}