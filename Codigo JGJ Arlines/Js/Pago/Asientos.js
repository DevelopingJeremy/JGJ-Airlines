// localStorage reserva y tarifa
const tarifaEscogida = localStorage.getItem('Tarifa');
const reserva = JSON.parse(localStorage.getItem("Info-Reserva"));
const pasajeros = reserva.pasajeros
const spanAsientos = document.getElementById('asientos-seleccionados');

// Imprimir para pruebas
console.log("Tarifa escogida:", tarifaEscogida);
console.log(reserva)
console.log("# Pasajeros: " + pasajeros);

let numeroFilas;
let f = 0; // Para usar como contador de pasajeros
let asientosEscogidos = [];

// Definición de las variables de filas (asegúrate de que estas estén definidas)
const asientosPorFila = 3;
const filasEconomico = 10;
const filasNormal = 15;
const filasPremium = 20;

// Verificar tipo de tarifa
switch (tarifaEscogida) {
    case 'ECONOMICO':
        numeroFilas = filasEconomico;
        break;
    case 'NORMAL':
        numeroFilas = filasNormal;
        break;
    case 'PREMIUM':
        numeroFilas = filasPremium;
        break;
    default:
        console.warn("Tarifa no reconocida. Se asignará un valor predeterminado.");
        let x;
        confirm("Error al cargar su tipo de tarifa, Desea volver?") ? window.history.back(2) : x;
        numeroFilas = 0; // Valor predeterminado o manejo de error
}

console.log("Número de filas:", numeroFilas);

// Generar Asientos
function generarAsientos(numeroFilas) {
    const contenedor = document.getElementById('contenedor-asientos');
    contenedor.innerHTML = ''; // Limpiar el contenedor

    for (let i = 0; i < numeroFilas; i++) {
        const filaContainer = document.createElement('div');
        filaContainer.className = 'fila-container';

        const fila = document.createElement('div');
        fila.className = 'fila';

        // Crear asientos
        for (let j = 0; j < asientosPorFila; j++) {
            const asiento = document.createElement('div');
            asiento.className = 'asiento';
            asiento.textContent = `${String.fromCharCode(65 + i)}${j + 1}`;

            // Si se da click en un asiento ponerlo de color verde
            asiento.addEventListener('click', () => {
                if (f < pasajeros) {
                    asiento.classList.toggle('seleccionado');
                    asientosEscogidos.push(asiento.innerHTML);
                    console.log(asientosEscogidos)
                    f++
                    spanAsientos.innerHTML = asientosEscogidos
                }

            });
            fila.appendChild(asiento);
        }

        filaContainer.appendChild(fila);
        contenedor.appendChild(filaContainer);
    }
}

// Generar los asientos
generarAsientos(numeroFilas);

// Array de tiquetes, verifica si ya existe en localStorage
let tiquetes;

// Verificar si ya hay tiquetes guardados en localStorage
if (localStorage.getItem('Tiquetes')) {
    // Si ya hay tiquetes, los recuperamos y los parseamos
    tiquetes = JSON.parse(localStorage.getItem('Tiquetes'));
} else {
    // Si no hay tiquetes, inicializamos el array vacío
    tiquetes = [];
}

// Manejar clic en el botón de enviar
document.getElementById('enviar').addEventListener('click', () => {
    // Aquí puedes agregar la lógica para enviar los datos de los asientos seleccionados
    if (f == pasajeros) {
        try {
            localStorage.setItem('Asientos', asientosEscogidos)
            console.log(localStorage.getItem('Asientos'));

            localStorage.setItem('Tiquetes', JSON.stringify(tiquetes));
            console.log("Tiquetes guardados", tiquetes)
        } catch (error) {
            console.error("Error al guardar los asientos o el tiquete", error);
        }

        window.location.pathname = "Codigo%20JGJ%20Arlines/Sistemas%20de%20pago/información-pago.html"
    } else {
        alert("Faltan asientos por escoger")
    }
});

