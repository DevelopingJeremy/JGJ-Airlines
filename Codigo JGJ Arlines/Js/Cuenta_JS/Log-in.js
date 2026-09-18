let emailEstado = document.getElementById("login_correo");
let passwordEstado = document.getElementById("login_contrasena");

// Funcion para la subida de archivos
const formularioInicioSesion = document.getElementById('form-login');
const emailInput = document.getElementById('login_correo');
const passwordInput = document.getElementById('login_contrasena');
const textoAlter = document.getElementById('texto-alternativo');
const textoAlter2 = document.getElementById('texto-alternativo2');

// Escuchar el evento submit
formularioInicioSesion.addEventListener('submit', async function (event) {
    event.preventDefault(); // Evitar el envío predeterminado del formulario
    let isValid = true;

    // Validar email
    if (emailInput.value === "") {
        emailInput.style.borderBottom = "2px solid red";
        textoAlter.innerText = "Este campo no puede estar vacío";
        isValid = false;
    } else {

    }

    // Validar contraseña
    if (passwordInput.value === "") {
        passwordInput.style.borderBottom = "2px solid red";
        textoAlter2.innerText = "Este campo no puede estar vacío";
        isValid = false;
    } else {

    }

    // Si algún campo no es válido, no se envía el formulario
    if (!isValid) return;

    // Intentar el inicio de sesión enviando los datos al servidor
    try {
        const response = await fetch('http://localhost:9000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_cliente: emailInput.value,
                contraseña_cliente: passwordInput.value
            })
        });


        const data = await response.json();

        if (response.ok) {
            // Si el inicio de sesión es exitoso
            localStorage.setItem('clientId', data.client.id_cliente); // Guardar el ID en el localStorage
            localStorage.setItem('userName', data.client.nombre_cliente);

            // Estilos Inputs
            emailInput.style.borderBottom = "2px solid green";
            passwordInput.style.borderBottom = "2px solid green";
            textoAlter.innerText = "Inicio de sesión exitoso";
            textoAlter.style.color = "green";
            textoAlter2.innerText = "";

            window.location.pathname = 'Inicio%20-%20Reserva/index.html';
        } else {
            // Si el inicio de sesión falla, mostrar mensaje de error
            textoAlter.innerText = data.msg;
            textoAlter.style.color = "red";
        }
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        textoAlter.innerText = "Ocurrió un error. Por favor, intenta de nuevo.";
        textoAlter.style.color = "red";
    }
});

// Verificar el estado del input del email
function verifyEmail(control) {
    const textoAlter = document.getElementById('texto-alternativo');
    if (control.value == "") {
        control.style.borderBottom = "2px solid red";
        textoAlter.innerText = "Este campo no puede estar vacío";
    } else {
        control.style.borderBottom = "2px solid white";
        textoAlter.innerText = "";
    }
}

// Verificar el estado del input de la contraseña
function verifyPassword(control) {
    const textoAlter2 = document.getElementById('texto-alternativo2');
    if (control.value == "") {
        control.style.borderBottom = "2px solid red";
        textoAlter2.innerText = "Este campo no puede estar vacío";
    } else {
        control.style.borderBottom = "2px solid white";
        textoAlter2.innerText = "";
    }
}

// Volver input a estado natural
function blanquear(control) {
    const textoAlter = document.getElementById('texto-alternativo');
    const textoAlter2 = document.getElementById('texto-alternativo2');
    control.style.borderBottom = "3px solid white";
    textoAlter.innerText = "";
    textoAlter2.innerText = "";
}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('boton-retroceso').addEventListener('click', function () {
        window.history.back(1);
    })
});


