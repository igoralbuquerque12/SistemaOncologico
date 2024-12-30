let cod_exame = 0 // Declarado no escopo global 

function loadDataExame() {
    const url = window.location.pathname;
    const url_parcionada = url.split('/')
    cod_exame = url_parcionada[url_parcionada.length - 1]
    
    fetch(`/api/v1/exame/${cod_exame}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao buscar exame: ${response.statusText}`)
        }
        return response.json()
    })
    .then(data => {

        const { hora, cod_tipo, crm, cpf, laudo_exame } = data.data

        document.getElementById('hora').value = hora,
        document.getElementById('data').value = data.data.data,
        document.getElementById('cod_tipo').value = cod_tipo,
        document.getElementById('crm').value = crm,
        document.getElementById('cpf').value = cpf,
        document.getElementById('laudo_exame').value = laudo_exame
    })
    .catch(err => console.log(`Erro ao encontrar o exame: ${err.message}`))
}

document.getElementById('updateExameForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let confirmar = confirm('Você confirma as alterações?')
    if (!confirmar) {
        return;
    }

    const exame = {
        hora: document.getElementById('hora').value,
        data: document.getElementById('data').value,
        cod_tipo: document.getElementById('cod_tipo').value,
        crm: document.getElementById('crm').value,
        cpf: document.getElementById('cpf').value,
        laudo_exame: document.getElementById('laudo_exame').value
    }

    fetch(`/api/v1/exame/${cod_exame}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exame)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao atualizar exame: ${Error.statusText}`)
        }
        alert('Dados alterados com sucesso.')
    })
    .catch(err => console.log(`Erro ao atualizar dados do exame: ${err.message}`))
})

document.addEventListener('DOMContentLoaded', loadDataExame);