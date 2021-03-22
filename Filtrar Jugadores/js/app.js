// Variables
const liga = document.querySelector('#liga');
const equipo = document.querySelector('#equipo');
const pais = document.querySelector('#pais');
const min = document.querySelector('#min');
const max = document.querySelector('#max');

const formulario = document.querySelector('#buscador');

// Tabla que muestra los resultados
const contenedorJugadores = document.querySelector('#tabla tbody');

const sinElementos = document.querySelector('#noresultado');

//Crear Objeto de la busqueda
const busquedaDatos = {
    liga: '',
    equipo: '',
    pais: '',
    min: '',
    max: ''
};

// Eventos
document.addEventListener('DOMContentLoaded', () => {

    mostrarJugadores(jugadores); // Muestra los jugadores

})

// Listener para cadad Select de la busqueda

liga.addEventListener('change', e => {
    //Asignamos el valor de liga al Objeto
    busquedaDatos.liga = e.target.value;

    filtrarJugador();
});

equipo.addEventListener('change', e => {
    //Asignamos el valor de equipo al Objeto
    busquedaDatos.equipo = e.target.value;

    filtrarJugador();

});

pais.addEventListener('change', e => {
    //Asignamos el valor de pais al Objeto
    busquedaDatos.pais = e.target.value;

   filtrarJugador();

});

min.addEventListener('change', e => {
    //Asignamos el valor de minimo al Objeto
    busquedaDatos.min = e.target.value;

    filtrarJugador();
});

max.addEventListener('change', e => {
    //Asignamos el valor de max al Objeto
    busquedaDatos.max = e.target.value

    filtrarJugador();
})


// Funciones
function mostrarJugadores(jugadores){

    clearHTML();

    jugadores.forEach(jugador => {
        const {nombre, pais, edad, equipo, liga, tecnica} = jugador;

        //Creo Un parrafo para cada elemento
        const jugadorHTML = document.createElement('tr');

        jugadorHTML.innerHTML = `
        <td>${nombre}</td>
        <td>${pais}</td>
        <td>${edad}</td>
        <td>${equipo}</td>
        <td>${liga}</td>
        <td>${tecnica}</td>
        `;

        contenedorJugadores.appendChild(jugadorHTML);

    } );
}

function sinResultados(){

    clearHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultado que mostrar';

    //Estilos
    noResultado.style.color = 'white';
    noResultado.style.textAlign = 'center';
    noResultado.style.fontSize = '20px';

    sinElementos.appendChild(noResultado);

    setTimeout(() => {
        noResultado.remove();

        // Reseteo Formulario
        resetForm()
        mostrarJugadores(jugadores);
        
    }, 2000);

    

}

//Resetear formulario
function resetForm(){
    formulario.reset();
}

function clearHTML(){
    while(contenedorJugadores.firstChild){
        contenedorJugadores.removeChild(contenedorJugadores.firstChild);
    }
};

function filtrarJugador(){
    const filtrado = jugadores.filter( filtrarLiga).filter( filtrarEquipo).filter( filtrarPais).filter( minTecnica).filter( maxTecnica) ; 

    if( filtrado.length ){
        mostrarJugadores(filtrado);
    }else{
        sinResultados();
    }
};

function filtrarLiga(jugador){
    // Comprobar si la liga seleccionada coincide
    const { liga } = busquedaDatos;

    if( liga ){
        return jugador.liga === liga;
    }

    return jugador;
};

function filtrarEquipo(jugador){
    const { equipo } = busquedaDatos;
    
    if( equipo ){
        return jugador.equipo === equipo;
    }

    return jugador;
};

function filtrarPais(jugador){
    const { pais } = busquedaDatos;

    if( pais ){
        return jugador.pais === pais;
    }

    return jugador;
};

function minTecnica(jugador){
    const { min } = busquedaDatos;

    if( min ){
        return jugador.tecnica >= min;
    }

    return jugador;
}

function maxTecnica(jugador){
    const { max } = busquedaDatos;

    if( max ){
        return jugador.tecnica <= max;
    }

    return jugador;
}