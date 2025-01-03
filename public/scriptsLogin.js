document.getElementById('formLoginUsuario').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = {
        usuario: document.getElementById('usuario').value,
        senha: document.getElementById('senha').value
    }

    fetch('/api/v1/usuario/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(response => {
        alert(response.message)
        if (response.message === 'Login feito com sucesso.') {
            window.location.href = "/"
        }
    })
    .catch(err => console.log(`Erro ao mandar requisição solicitando login: ${err}`))
})