document.getElementById('buscar').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const emailInput = document.querySelector('#email-input'); // Seleccionar el input de correo
    const email = emailInput.value; // Obtener el valor del input

    console.log('Email ingresado:', email); // Verifica que se está capturando el email correctamente

    try {
        const response = await fetch('http://localhost:9000/api/buscar-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_cliente: email
            }) // Enviar el correo como JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Convertir la respuesta a JSON

        // Si la búsqueda es exitosa
        document.getElementById('info').innerText = JSON.stringify(data.usuario, null, 2); // Mostrar la información del usuario
    } catch (error) {
        console.error("Error en la búsqueda:", error); // Mostrar el error en la consola
        document.getElementById('info').innerText = "Ocurrió un error. Por favor, intenta de nuevo.";
    }
});



// Función para editar el usuario
function editarUsuario() {
    const infoPara = document.getElementById('info');
    const userId = infoPara.dataset.id;

    const nuevoNombre = prompt('Ingrese el nuevo nombre:');
    const nuevoEmail = prompt('Ingrese el nuevo email:');

    if (nuevoNombre && nuevoEmail) {
        // Enviar la actualización al servidor
        fetch(`http://localhost:9000/api/editar-usuario/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre_cliente: nuevoNombre,
                email_cliente: nuevoEmail
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('info').innerText = `Nombre: ${nuevoNombre}, Email: ${nuevoEmail}`;
                    alert('Usuario actualizado con éxito.');
                } else {
                    alert(data.msg);
                }
            })
            .catch(error => {
                console.error("Error al editar:", error);
                alert("Ocurrió un error al actualizar el usuario.");
            });
    }
}

// Función para eliminar el usuario
function eliminarUsuario() {
    const infoPara = document.getElementById('info');
    const userId = infoPara.dataset.id;

    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        fetch(`http://localhost:9000/api/eliminar-usuario/${userId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('info').innerText = '';
                    alert('Usuario eliminado con éxito.');
                    document.getElementById('editar').style.display = 'none';
                    document.getElementById('eliminar').style.display = 'none';
                } else {
                    alert(data.msg);
                }
            })
            .catch(error => {
                console.error("Error al eliminar:", error);
                alert("Ocurrió un error al eliminar el usuario.");
            });
    }
}