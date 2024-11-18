const pacientesList = document.getElementById('pacientesList');
const createPacienteForm = document.getElementById('createPacienteForm');

// Função para carregar todos os pacientes
function loadPacientes() {
    fetch('/api/v1/paciente')
        .then(response => response.json())
        .then(data => {
            pacientesList.innerHTML = ''; // Limpa a lista existente de pacientes

            data.data.pacientes.forEach(paciente => {
                const li = document.createElement('li');
                dataFormatada = new Date(paciente.Data_nasc)
                li.innerHTML = `
                    Nome: ${paciente.Nome} <br> CPF: ${paciente.Cpf} <br> Sexo: ${paciente.Sexo} <br> Data de Nascimento: ${dataFormatada.toLocaleDateString('pt-BR')} <br> Número para contato: ${paciente.Telefone}
                    <button data-cpf="${paciente.Cpf}" class="deleteBtn">Deletar</button>
                `;
                pacientesList.appendChild(li);
            });

            // Aplica os listeners de delete após carregar a lista
            applyDeleteListeners();
        })
        .catch(err => console.log(err));
}

// Função para aplicar os event listeners de delete nos botões "Deletar"
function applyDeleteListeners() {
    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', deletePaciente);
    });
}

// Função para deletar um paciente
function deletePaciente(event) {
    const cpf = event.target.getAttribute('data-cpf');

    fetch(`/api/v1/paciente/${cpf}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadPacientes(); // Recarrega a lista de pacientes após deletar
        } else {
            console.log('Erro ao deletar paciente');
        }
    })
    .catch(err => console.log(err));
}

// Event listener para o formulário de criação de pacientes
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
        loadPacientes(); // Recarrega a lista de pacientes após adicionar um novo paciente
        createPacienteForm.reset(); // Limpa o formulário
    })
    .catch(err => console.log(err));
});

// Event listener para o botão de busca
document.getElementById('botaoPesquisar').addEventListener('click', function() {
    const tipoBusca = document.getElementById('tipoBusca').value;
    const pesquisarPaciente = document.getElementById('pesquisarPaciente').value;

    if (tipoBusca === 'nome') {
        fetch(`/api/v1/paciente?nome=${encodeURIComponent(pesquisarPaciente)}`)
            .then(response => response.json())
            .then(data => {
                pacientesList.innerHTML = '';

                if (data.data && data.data.pacientes.length > 0) {
                    data.data.pacientes.forEach(paciente => {
                        const li = document.createElement('li');
                        const dataFormatada = new Date(paciente.Data_nasc)
                        li.innerHTML = `
                            Nome: ${paciente.Nome} <br> CPF: ${paciente.Cpf} <br> Sexo: ${paciente.Sexo} <br> Data de Nascimento: ${dataFormatada.toLocaleDateString('pt-BR')} <br> Número para contato: ${paciente.Telefone}
                           <button data-cpf="${paciente.Cpf}" class="deleteBtn">Deletar</button>
                        `;
                        pacientesList.appendChild(li);
                    });
                } else {
                    pacientesList.innerHTML = '<li>Nenhum paciente encontrado.</li>';
                }

                // Aplica os listeners de delete após a busca
                applyDeleteListeners();
            })
            .catch(err => console.log('Erro ao buscar pacientes:', err));
    } else {
        fetch(`/api/v1/paciente?cpf=${encodeURIComponent(pesquisarPaciente)}`)
            .then(response => response.json())
            .then(data => {
                pacientesList.innerHTML = '';

                if (data.data && data.data.pacientes.length > 0) {
                    data.data.pacientes.forEach(paciente => {
                        const li = document.createElement('li');
                        const dataFormatada = new Date(paciente.Data_nasc)
                        li.innerHTML = `
                            Nome: ${paciente.Nome} <br> CPF: ${paciente.Cpf} <br> Sexo: ${paciente.Sexo} <br> Data de Nascimento: ${dataFormatada.toLocaleDateString('pt-BR')} <br> Número para contato: ${paciente.Telefone}
                            <button data-cpf="${paciente.Cpf}" class="deleteBtn">Deletar</button>
                        `;
                        pacientesList.appendChild(li);
                    });
                } else {
                    pacientesList.innerHTML = '<li>Nenhum paciente encontrado.</li>';
                }

                // Aplica os listeners de delete após a busca
                applyDeleteListeners();
            })
            .catch(err => console.log('Erro ao buscar pacientes:', err));
    }
});

// Carrega a lista inicial de pacientes ao abrir a página
loadPacientes();
