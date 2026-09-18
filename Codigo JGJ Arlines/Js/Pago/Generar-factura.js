document.addEventListener('DOMContentLoaded', () => {
    // Traer informacion del local
    const reservacion = JSON.parse(localStorage.getItem('Info-Reserva'));
    const destinos = JSON.parse(localStorage.getItem('Destinos'));
    const tarifa = localStorage.getItem('Tarifa');
    const asientos = localStorage.getItem('Asientos');
    const datosCompra = JSON.parse(localStorage.getItem('Datos_Compra'));
    const tiquetes = JSON.parse(localStorage.getItem('Tiquetes'));

    console.log(reservacion);
    console.log(destinos);
    console.log(tarifa);
    console.log(asientos);
    console.log(datosCompra);

    // Inputs
    let nombre = document.getElementById('nombre');
    let correo = document.getElementById('correo');
    let tarjeta = document.getElementById('tarjeta');
    let origen = document.getElementById('origen');
    let destino = document.getElementById('destino');
    let ida = document.getElementById('fecha-ida');
    let vuelta = document.getElementById('fecha-vuelta');
    let pasajeros = document.getElementById('num-pasajeros');
    let tarifa_inpt = document.getElementById('tarifa');
    let asientos_inpt = document.getElementById('asientos');
    let total = document.getElementById('total');

    // Info del usuario
    nombre.value = datosCompra.nombre;
    correo.value = datosCompra.correo;
    tarjeta.value = datosCompra.tarjeta;

    // Reservacion
    origen.value = destinos[reservacion.origen];
    destino.value = destinos[reservacion.destino];
    ida.value = acomodoFecha(reservacion.ida);
    vuelta.value = acomodoFecha(reservacion.vuelta);
    pasajeros.value = reservacion.pasajeros;

    // Info de los boletos
    tarifa_inpt.value = tarifa;
    asientos_inpt.value = asientos;
    total.value = "$" + total_calc();

    // Calcular total de la transaccion
    function total_calc() {
        const precios = {
            "Alajuela, Costa Rica": 300,
            "Guanacaste, Costa Rica": 500,
            "Amsterdam, Países Bajos": 500,
            "Banff National Park, Canadá": 950,
            "Barcelona, España": 450,
            "Bora Bora, Polinesia Francesa": 750,
            "Cancún, México": 300,
            "Cinque Terre, Italia": 700,
            "Ciudad de México, México": 200,
            "Costa Amalfitana, Italia": 750,
            "Fiordos Noruegos, Noruega": 800,
            "Islas Galápagos, Ecuador": 600,
            "Islas Lofoten, Noruega": 950,
            "Kyoto, Japón": 900,
            "Madrid, España": 500,
            "New York, EEUU": 300,
            "París, Francia": 600,
            "Sidney, Australia": 800
        }

        total = precios[destinos[reservacion.destino]];

        // Cambiar dependiendo de la tarifa
        if (tarifa == "economico") {
            total -= parseInt((total * 0.15));
        } else if (tarifa == "premium") {
            total += parseInt((total * 0.15));
        }

        // Multiplicar por numero de pasajeros
        total *= reservacion.pasajeros

        return total
    }

    // Darle vuelta a las fechas
    function acomodoFecha(f) {
        let fechaNueva = ""

        fechaNueva += f.substring(8, 10)
        fechaNueva += f.substring(4, 7)
        fechaNueva += "-"
        fechaNueva += f.substring(0, 4)
        return fechaNueva
    }

    document.getElementById('btn-inicio').addEventListener('click', event => {
        event.preventDefault()
        window.location.pathname = "Codigo%20JGJ%20Arlines/Inicio%20-%20Reserva/index.html"
    })

    document.getElementById('btn-imprimir').addEventListener('click', () => {
        window.print();
    })

    console.log(tiquetes)
})

