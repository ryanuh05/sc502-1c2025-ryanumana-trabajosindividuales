document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');
    const registerError = document.getElementById('register-error');

    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const errormsg = "Password and confirmation don't match";

        if (password !== confirmPassword) {
            registerError.innerHTML = `<div class="alert alert-danger fade show" role="alert">
            <strong>Error:</strong> ${errormsg}
            </div>`;
            return;
        } else {
            //envia los datos al servidor usando POST y el HEADER con el formato de dato que se va a enviar
            const response = await fetch('backend/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ email: email, password: password })
            });
            //obtenemos la respuesta del servidor en formato JSON
            const result = await response.json();

            if (response.ok) {
                registerError.innerHTML = `<div class="alert alert-success fade show" role="alert">
             <strong>Success:</strong> Email: ${email} successfully registered.
             </div>`;
                setTimeout(function () {
                    registerError.innerHTML = "";
                    window.location.href = "index.html";
                }, 5000)
            }else{
                registerError.innerHTML = `<div class="alert alert-danger fade show" role="alert">
            <strong>Error:</strong>Error sending data to server
            </div>`;
            }
        }
    })
});