const pacientesList = document.getElementById('pacientesList');
const createPacienteForm = document.getElementById('createPacienteForm');


function loadPacientes() {
    fetch('/api/v1/paciente')
        .then(response => response.json())
        .then(data => {          
            pacientesList.innerHTML = '';
            data.data.forEach(paciente => {
                const li = document.createElement('li');
                dataFormatada = new Date(paciente.data_nasc)
                li.innerHTML = `
                    Nome: ${paciente.nome} <br> CPF: ${paciente.cpf} <br> Sexo: ${paciente.sexo} <br> Data de Nascimento: ${dataFormatada.toLocaleDateString('pt-BR')} <br> Número para contato: ${paciente.telefone}
                    <div class="buttons-container">
                        <button data-cpf="${paciente.cpf}" class="updateBtn">Atualizar</button>
                        <button data-cpf="${paciente.cpf}" class="deleteBtn">Deletar</button>
                    </div>
                `;
                pacientesList.appendChild(  li);
            });
            applyUpdateListeners()
            applyDeleteListeners();
        })
        .catch(err => console.log(err));
}

function applyUpdateListeners() {
    document.querySelectorAll('.updateBtn').forEach(button => {
        button.addEventListener('click', updatePaciente);
    })
}

function updatePaciente(event) {
    const cpf = event.target.getAttribute('data-cpf');
    window.location.href = `/paciente/atualizar/${cpf}`;
    
}

function applyDeleteListeners() {
    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', deletePaciente);
    });
}

function deletePaciente(event) {
    const cpf = event.target.getAttribute('data-cpf');

    fetch(`/api/v1/paciente/${cpf}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadPacientes(); 
        } else {
            console.log('Erro ao deletar paciente');
        }
    })
    .catch(err => console.log(err));
}

createPacienteForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const pacienteData = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        sexo: document.getElementById('sexo').value,
        data_nasc: document.getElementById('data_nasc').value
    };

    fetch('/api/v1/paciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pacienteData)
    })
    .then(response => response.json())
    .then(data => {
        loadPacientes(); 
        createPacienteForm.reset();
    })
    .catch(err => console.log(err));
});


document.getElementById('botaoPesquisar').addEventListener('click', function() {
    const tipoBusca = document.getElementById('tipoBusca').value;
    const pesquisarPaciente = document.getElementById('pesquisarPaciente').value;

    
    fetch(`/api/v1/paciente?${tipoBusca}=${encodeURIComponent(pesquisarPaciente)}`)
        .then(response => response.json())
        .then(data => {
            pacientesList.innerHTML = '';

            if (data.data && data.data.length > 0) {
                data.data.forEach(paciente => {
                    const li = document.createElement('li');
                    const dataFormatada = new Date(paciente.data_nasc)
                    li.innerHTML = `
                        Nome: ${paciente.nome} <br> CPF: ${paciente.cpf} <br> Sexo: ${paciente.sexo} <br> Data de Nascimento: ${dataFormatada.toLocaleDateString('pt-BR')} <br> Número para contato: ${paciente.telefone}
                        <button data-cpf="${paciente.cpf}" class="deleteBtn">Deletar</button>
                    `;
                    pacientesList.appendChild(li);
                });
            } else {
                pacientesList.innerHTML = '<li>Nenhum paciente encontrado.</li>';
            }

            applyDeleteListeners();
        })
        .catch(err => console.log('Erro ao buscar pacientes:', err));
});

loadPacientes();
