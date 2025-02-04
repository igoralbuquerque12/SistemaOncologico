document.getElementById('formCadastrarUsuario').addEventListener('submit', function(event) {
    event.preventDefault()
    
    const usuario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        usuario: document.getElementById('usuario').value,
        senha: document.getElementById('senha').value
    }

    fetch('/api/v1/usuario/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(response => {
        alert(response.message) // Exibe o 'cadastro realizado com sucesso' ou email/usuario já existentes

        if (response.status === 'success') {
            window.location.href='/login/';
        }

    })    
    .catch(err => console.log(`Erro durante solicitação de cadastro: ${err.message}`)) 
})