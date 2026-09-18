document.addEventListener('DOMContentLoaded', () => {
    const id = localStorage.getItem('clienteId');
    const user = localStorage.getItem('userName');

    const login = document.getElementById('log-in');
    const logout = document.getElementById('log-out');

    // Verifica si los elementos existen en el DOM
    if (!id || !user) {
        // Usuario no autenticado
        login.classList.remove('ocultarCuenta');
        logout.classList.add('ocultarCuenta');
    } if (id && user) {
        // Usuario autenticado
        logout.classList.remove('ocultarCuenta');
        login.classList.add('ocultarCuenta');
    }
});
