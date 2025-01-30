const token = sessionStorage.getItem('jwtToken');

function loadDataPacientes() {
    const url = window.location.pathname;
    const url_particionada = url.split('/');
    const cpf = url_particionada[url_particionada.length - 1];
    
    fetch(`/api/v1/paciente/${cpf}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao buscar paciente: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const { nome, cpf, telefone, sexo, data_nasc } = data.data;
        
        document.getElementById('nome').value = nome;
        document.getElementById('cpf').value = cpf;
        document.getElementById('telefone').value = telefone;
        document.getElementById('sexo').value = sexo;
        document.getElementById('data_nasc').value = data_nasc;
    })
    .catch(err => console.log(`Erro na busca pelos dados do paciente: ${err.message}`));
}

document.getElementById('updateEntidadeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let confirmar = confirm('Você confirma as alterações?');
    if (!confirmar) {
        return;
    }

    const paciente = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        sexo: document.getElementById('sexo').value,
        data_nasc: document.getElementById('data_nasc').value,
    };

    fetch(`/api/v1/paciente/${paciente.cpf}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paciente)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao atualizar paciente: ${response.statusText}`);
        }
        alert('Dados alterados com sucesso.');
    })
    .catch(err => console.log(`Erro ao alterar dados do paciente: ${err.message}`));
});

document.addEventListener('DOMContentLoaded', loadDataPacientes);
