// Funcion para guardar y verificar datos de la tarjeta

// Obtener Tiquetes
const tiquetes = JSON.parse(localStorage.getItem('Tiquetes'))

document.getElementById('form-pago').addEventListener('submit', event => {
    event.preventDefault()
    // Inputs
    const nombre = document.getElementById('cardName').value;
    const correo = document.getElementById('email').value;
    const tarjeta = document.getElementById('cardNumber').value;
    const expira = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // Verificar tamaño de inputs
    if (!(tarjeta.length == 16)) {
        alert("La tarjeta debe tener 16 caracteres")
    } else if (!(expira.length == 4)) {
        alert("La fecha de expiracion debe ser de 4 caracteres")
    } else if (!(cvv.length == 3)) {
        alert("El cvv debe tener 3 caracteres")
    } else {
        if (nombre && correo && tarjeta && expira && cvv) {
            let datosCompra = {
                nombre: nombre,
                correo: correo,
                tarjeta: esconderTarjeta(tarjeta)
            }

            try {
                localStorage.setItem("Datos_Compra", JSON.stringify(datosCompra));
                console.log("Datos guardados correctamente")
                console.log("Transaccion completa");
            } catch (error) {
                console.error("Hubo un error al guardar o cargar los datos", error);
            }

            //! Guardar todos los datos del tiquete
            // Traer informacion del local
            const reservacion = JSON.parse(localStorage.getItem('Info-Reserva'));
            const destinos = JSON.parse(localStorage.getItem('Destinos'));
            const tarifa = localStorage.getItem('Tarifa');
            const asientos = localStorage.getItem('Asientos');
            const datosCompraOBJ = JSON.parse(localStorage.getItem('Datos_Compra'));

            // Guardar toda la informacion importante del vuelo
            tiquetes.push({
                ID: Math.ceil(Math.random() * 100),
                nombre: datosCompraOBJ.nombre,
                origen: destinos[reservacion.origen],
                destino: destinos[reservacion.destino],
                ida: acomodoFecha(reservacion.ida),
                vuelta: acomodoFecha(reservacion.vuelta),
                pasajeros: reservacion.pasajeros,
                tarifa: tarifa,
                asientos: asientos,
                total: "$" + total_calc()
            })

            try {
                localStorage.setItem("Tiquetes", JSON.stringify(tiquetes));
                console.log("Datos guardados correctamente")
                console.log("Transaccion completa");
            } catch (error) {
                console.error("Hubo un error al guardar o cargar los datos", error);
            }

            console.log(tiquetes)
            window.location.pathname = "Codigo%20JGJ%20Arlines/Sistemas%20de%20pago/factura.html"

            //! Calcular total de la transaccion
            function total_calc() {
                const precios = {
                    "Alajuela, Costa Rica": 300,
                    "Guanacaste, Costa Rica": 500,
                    "Ámsterdam, Países Bajos": 500,
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
        } else {
            event.preventDefault()
            alert("Rellene todos los campos")
        }
    }

    // Ocultar datos de la tarjeta
    function esconderTarjeta(f) {
        let ultDigitos = f.substring(12, 16)
        let asteriscos = "**** **** **** "
        return asteriscos + ultDigitos;
    }



    //! Funciones calculos

    // Darle vuelta a las fechas
    function acomodoFecha(f) {
        let fechaNueva = ""

        fechaNueva += f.substring(8, 10)
        fechaNueva += f.substring(4, 7)
        fechaNueva += "-"
        fechaNueva += f.substring(0, 4)
        return fechaNueva
    }



})

