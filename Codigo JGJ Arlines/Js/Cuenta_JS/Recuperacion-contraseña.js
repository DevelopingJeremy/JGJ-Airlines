// Mostrar Input del Email
function showEmail() {
    document.getElementById("enviar-instrucciones").innerText = "Te enviaremos un email con instrucciones";
    document.getElementById("email-input").style.display = "block";
    document.getElementById("sms-input").style.display = "none";
}

// Mostrar Input del SMS
function showSMS() {
    document.getElementById("enviar-instrucciones").innerText = "Te enviaremos un sms con instrucciones";
    document.getElementById("sms-input").style.display = "block";
    document.getElementById("email-input").style.display = "none";
}

function submitFormAndRedirect() {
    document.location.pathname = "Codigo%20JGJ%20Arlines/Cuenta/envio-exitoso.html"
}