const token = sessionStorage.getItem('jwtToken');

function loadDataMedicos() {
    const url = window.location.pathname;
    const url_parcionada = url.split('/')
    const crm = url_parcionada[url_parcionada.length - 1]
    
    fetch(`/api/v1/medico/${crm}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const { crm, nome, email, telefone } = data.data

        document.getElementById('crm').value = crm;
        document.getElementById('nome').value = nome;
        document.getElementById('email').value = email;
        document.getElementById('telefone').value = telefone; 
    })
    .catch(err => console.log(`Erro ao buscar os dados do médico: ${err}`))
}

updateMedicoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let confirmar = confirm('Você confirma as alterações?')
    if (!confirmar) {
        return;
    }

    const medico = {
        nome: document.getElementById('nome').value,
        crm: document.getElementById('crm').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value
    }

    fetch(`/api/v1/medico/${medico.crm}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(medico)
    })
    .then(alert('Dados alterados com sucesso.'))
    .catch(err => console.log(`Erro ao alterar dados do médico: ${err.message}`))
})

document.addEventListener('DOMContentLoaded', loadDataMedicos)