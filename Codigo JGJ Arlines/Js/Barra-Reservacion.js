// Evento al enviar la informacion de la reserva
document.getElementById('selecciones-informacion-barra-reservacion').addEventListener('submit', event => {
    event.preventDefault();

    // Obtener los valores de los inputs
    let origen = document.getElementById('origen-reservacion-vuelo').value;
    let destino = document.getElementById('destino-reservacion-vuelo').value;
    let ida = document.getElementById('fecha-id-reservacion-vuelo').value;
    let vuelta = document.getElementById('fecha-vuelta-reservacion-vuelo').value;
    let pasajeros = document.getElementById('numero-pasajeros-').value;

    // Convierte los valores a objetos Date
    let fechaIda = new Date(ida);
    let fechaVuelta = new Date(vuelta);

    // Verificar que todos los inputs estén completos y sean diferente a 0
    if (origen && destino && ida && vuelta && pasajeros && origen > 0 && destino > 0 && pasajeros > 0) {
        
        // Verificar que la fecha de ida sea menor a la de vuelta
        if (fechaVuelta > fechaIda) {
            let reservacion = {
                origen: origen,
                destino: destino,
                ida: ida,
                vuelta: vuelta,
                pasajeros: pasajeros,
            };

            // Intentar guardar la información de la reserva en localStorage
            try {
                localStorage.setItem("Info-Reserva", JSON.stringify(reservacion));
                console.log("Información de la reserva guardada correctamente");
            } catch (error) {
                console.error("Error al guardar la información de la reserv: ", error);
                return
            }

            // Redirigir al proceso de pago después de guardar
            window.location.pathname = "Codigo%20JGJ%20Arlines/Sistemas%20de%20pago/escoger-tarifas.html"; // Redirección a la página de pago
        } else {
            alert("La fecha de regreso debe ser mayor a la de ida.")
        }

    } else {
        alert("Por favor, complete todos los campos.");
        console.error("Faltan campos por llenar");
    }
});

// Guardar destinos en localStorage
let destinos = {
    0: "Default",
    1: "Alajuela, Costa Rica",
    2: "Guanacaste, Costa Rica",
    3: "Amsterdam, Países Bajos",
    4: "Banff National Park, Canadá",
    5: "Barcelona, España",
    6: "Bora Bora, Polinesia Francesa",
    7: "Cancún, México",
    8: "Cinque Terre, Italia",
    9: "Ciudad de México, México",
    10: "Costa Amalfitana, Italia",
    11: "Fiordos Noruegos, Noruega",
    12: "Islas Galápagos, Ecuador",
    13: "Islas Lofoten, Noruega",
    14: "Kyoto, Japón",
    15: "Madrid, España",
    16: "New York, EEUU",
    17: "París, Francia",
    18: "Sidney, Australia"
}

try {
    // Guardar destinos en localStorage
    localStorage.setItem("Destinos", JSON.stringify(destinos));
} catch (error) {
    console.error("Error al guardar los destino: ", error)
}