const tiquetes = JSON.parse(localStorage.getItem('Tiquetes'));
const carrito = document.getElementById('tiquetes-containers');

console.log(tiquetes)

if (!tiquetes || tiquetes.length == 0) {
    carrito.innerHTML = `
        <div class="alerta-vacio">
            <h1>No tienes Tiquetes comprados</h1>
        </div>`
} else {
    let guardar = ""

    for (let i = 0; i < tiquetes.length; i++) {
        carrito.innerHTML = guardar += `
            <div class="carrito-container ">
            <div class="tiquete">
                <div class="tiquete-header">
                    <h2>Tiquete de Vuelo</h2>
                </div>
                <div class="tiquete-info">
                    <div class="tiquete-encabezados">
                        <span class="tiquete-titulo">ID Tiquete</span>
                        <span class="tiquete-titulo">Origen</span>
                        <span class="tiquete-titulo">Destino</span>
                        <span class="tiquete-titulo">Fecha Ida</span>
                        <span class="tiquete-titulo">Fecha Regreso</span>
                        <span class="tiquete-titulo">Núm. Pasajeros</span>
                        <span class="tiquete-titulo">Tipo Tarifa</span>
                        <span class="tiquete-titulo">Asientos</span>
                        <span class="tiquete-titulo">Total</span>
                    </div>
                    <div class="tiquete-valores">
                        <span class="tiquete-id">${tiquetes[i].ID}</span>
                        <span class="tiquete-origen">${tiquetes[i].origen}</span>
                        <span class="tiquete-destino">${tiquetes[i].destino}</span>
                        <span class="tiquete-fecha-ida">${tiquetes[i].ida}</span>
                        <span class="tiquete-fecha-regreso">${tiquetes[i].vuelta}</span>
                        <span class="tiquete-pasajeros">${tiquetes[i].pasajeros}</span>
                        <span class="tiquete-tipo-pasajeros">${tiquetes[i].tarifa}</span>
                        <span class="tiquete-asientos">${tiquetes[i].asientos}</span>
                        <span class="tiquete-total-value">${tiquetes[i].total}</span>
                    </div>
                </div>
            </div>
        </div>
    `
    }


    console.log(tiquetes, tiquetes.length);

    console.log(tiquetes.ID)
}
