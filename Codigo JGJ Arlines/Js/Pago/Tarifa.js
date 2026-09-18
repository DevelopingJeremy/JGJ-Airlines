//* Tarifas

// Traer Destinos e info de reservas
let destinosGuardados = JSON.parse(localStorage.getItem("Destinos"));
let reserva = JSON.parse(localStorage.getItem("Info-Reserva"));

console.log(destinosGuardados);
console.log(reserva);

// Seleccionar inputs
let origen = document.getElementById('inputs-reserva-tarifa-pago__origen');
let destino = document.getElementById('inputs-reserva-tarifa-pago__destino');
let ida = document.getElementById('inputs-reserva-tarifa-pago__ida');
let vuelta = document.getElementById('inputs-reserva-tarifa-pago__vuelta');
let pasajeros = document.getElementById('inputs-reserva-tarifa-pago__pasajeros');

// Darle vuelta a las fechas
function acomodoFecha(f) {
    let fechaNueva = ""

    fechaNueva += f.substring(8, 10)
    fechaNueva += f.substring(4, 7)
    fechaNueva += "-"
    fechaNueva += f.substring(0, 4)
    return fechaNueva
}

// Variables con la info final
let info_origen = destinosGuardados[reserva.origen];
let info_destino = destinosGuardados[reserva.destino];
let info_ida = acomodoFecha(reserva.ida);
let info_vuelta = acomodoFecha(reserva.vuelta);
let info_pasajeros = reserva.pasajeros;

// Reemplazar informacion de los inputs
origen.setAttribute('placeholder', "Org: " + info_origen);
destino.setAttribute('placeholder', "Dest: " + info_destino);
ida.setAttribute('placeholder', "Ida: " + info_ida);
vuelta.setAttribute('placeholder', "Vuelta: " + info_vuelta);
pasajeros.setAttribute('placeholder', "Pasajeros: " + info_pasajeros);

//? ----------------------------------

// Seleccionar todos los elementos de tarifa
const tarifas = document.querySelectorAll('.informacion-tarifa');
const botonContinuar = document.querySelector('.boton-continuar-tarifa-pago');
let tarifaEscogida = ""; // Variable para almacenar la tarifa seleccionada

// Agregar el evento click a cada tarifa
tarifas.forEach(tarifa => {
    tarifa.addEventListener('click', () => {
        // Primero, eliminar el estilo de todas las tarifas
        tarifas.forEach(t => {
            t.style.transform = 'scale(1)'; // Restaurar escala
            t.style.boxShadow = '0 0 10px rgba(161, 161, 161, 0.9)'; // Restaurar sombra gris
        });

        // Luego, aplicar el estilo a la tarifa seleccionada
        tarifa.style.transform = 'scale(1.1)'; // Aumentar escala
        tarifa.style.boxShadow = '0 0 20px rgba(76, 247, 113, 0.9)'; // Sombra verde al seleccionar

        // Guardar la tarifa seleccionada en la variable tarifaEscogida
        tarifaEscogida = tarifa.querySelector('.tarifa-titulo').innerText.toUpperCase(); // Convertir a minúsculas
    });
});

// Configurar el botón para redireccionar
botonContinuar.addEventListener('click', () => {
    if (tarifaEscogida) {
        try {
            localStorage.setItem('Tarifa', tarifaEscogida); // Guardar en localStorage
            console.log("Tarifa escogida guardada es " + localStorage.getItem('Tarifa'));
            window.location.pathname = "Codigo%20JGJ%20Arlines/Sistemas%20de%20pago/asiento.html"; // Redirigir
        } catch (error) {
            alert("Error al guardar la tarifa");
            console.error("Error al guardar la tarifa escogida", error);
        }
    } else {
        alert("Seleccione una tarifa");
    }
});


// Agregar estilos de hover sin afectar la selección
tarifas.forEach(tarifa => {
    tarifa.addEventListener('mouseenter', () => {
        if (tarifa.style.boxShadow !== '0 0 20px rgba(76, 247, 113, 0.9)') { // Solo si no está seleccionada
            tarifa.style.boxShadow = '0 0 10px rgba(0, 204, 17, 0.5)'; // Sombra verde al pasar el mouse
        }
    });

    tarifa.addEventListener('mouseleave', () => {
        if (tarifa.style.boxShadow !== '0 0 20px rgba(76, 247, 113, 0.9)') { // Solo si no está seleccionada
            tarifa.style.boxShadow = '0 0 10px rgba(161, 161, 161, 0.9)'; // Restaurar sombra gris
        }
    });
});