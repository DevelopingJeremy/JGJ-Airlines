
const form = document.getElementById('form-signup');

// Constantes de los inputs
const nombre = document.getElementById('nombre_signup');
const apellido = document.getElementById('apellido_signup');
const apellido02 = document.getElementById('apellido_signup02');
const fechaDeNacimiento = document.getElementById('fecha_de_nacimiento_signup');
const numTelefono = document.getElementById('num_telefono_signup');
const correo = document.getElementById('correo_signup');
const signinContrasena = document.getElementById('signin_contrasena');
const signinConfirmarContrasena = document.getElementById('signin_confirmar_contrasena');

form.addEventListener('submit', async function (event) {
    let isValid = true;

    // Limpiar errores
    const limpiarErrores = (input) => {
        input.style.borderBottom = "";  // Restablecer borde normal
    };

    // Validar nombre
    if (nombre.value.trim() === "") {
        nombre.style.borderBottom = "2px solid red";
        isValid = false;
    } else {
        limpiarErrores(nombre);
    }

    // Validar apellido
    if (apellido.value.trim() === "") {
        apellido.style.borderBottom = "2px solid red";
        isValid = false;
    } else {
        limpiarErrores(apellido);
    }

    // Validar fecha de nacimiento
    if (fechaDeNacimiento.value === "") {
        fechaDeNacimiento.style.borderBottom = "2px solid red";
        isValid = false;
    } else {
        limpiarErrores(fechaDeNacimiento);
    }

    // Validar número de teléfono
    if (numTelefono.value === "") {
        numTelefono.style.borderBottom = "2px solid red";
        isValid = false;
    } else {
        limpiarErrores(numTelefono);
    }

    // Validar correo
    if (correo.value.trim() === "") {
        correo.style.borderBottom = "2px solid red";
        isValid = false;
    } else {
        limpiarErrores(correo);
    }

    // Validar contraseña
    if (signinContrasena.value.trim() === "") {
        signinContrasena.style.borderBottom = "2px solid red";
        isValid = false;
    } else {
        limpiarErrores(signinContrasena);
    }


    // Validar confirmación de contraseña
    if (signinConfirmarContrasena.value.trim() === "") {
        signinConfirmarContrasena.style.borderBottom = "2px solid red";
        isValid = false;
    } else {
        limpiarErrores(signinConfirmarContrasena);
    }

    // Validar que ambas contraseñas sean iguales
    if (signinContrasena.value.trim() !== signinConfirmarContrasena.value.trim()) {
        signinConfirmarContrasena.style.borderBottom = "2px solid red";
        signinContrasena.style.borderBottom = "2px solid red";
        alert("Ambas contraseñas son distintas")
        isValid = false;
        return
    } else {
        limpiarErrores(signinConfirmarContrasena);
        limpiarErrores(signinContrasena);
    }

    // Prevenir el envío si no es válido
    if (!isValid) {
        event.preventDefault();
        alert("Por favor rellene todos los campos");
        return
    } else {
        alert("Enviado")
    }

    // Intentar crear un nuevo cliente enviando los datos al servidor
    try {
        const response = await fetch('http://localhost:9000/api/Clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre_cliente: nombre.value,
                apellido1_cliente: apellido.value,
                apellido2_cliente: apellido02.value,
                email_cliente: correo.value,
                contraseña_cliente: signinContrasena.value,
                fecha_nacimiento_cliente: fechaDeNacimiento.value,
                isAdmin: "0"
            })
        });

        const data = await response.json();
        console.log(data);


        if (response.ok) {
            // Si la creación del cliente es exitosa
            alert('Cliente creado exitosamente.');
            // Aquí podrías redirigir al usuario a otra página o limpiar el formulario
        } else {
            // Si la creación del cliente falla, mostrar mensaje de error
            alert(data.msg || 'Error al crear el cliente.');
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Ocurrió un error. Por favor, intenta de nuevo.');
        alert(error)
    }




});



// Manejo del botón de retroceso
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('boton-retroceso').addEventListener('click', function () {
        window.history.back(1);
    });
});
