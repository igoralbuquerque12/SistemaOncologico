const medicosList = document.getElementById('medicosList');
const createMedicoForm = document.getElementById('createMedicoForm');

// Função para carregar todos os médicos
function loadMedicos() {
    fetch('/medico')
        .then(response => response.json())
        .then(data => {
            medicosList.innerHTML = ''; // Limpa a lista existente de médicos
            console.log(data)
            data.data.forEach(medico => {
                const li = document.createElement('li');
                li.innerHTML = `
                    Nome: ${medico.Nome} <br> CRM: ${medico.CRM} <br> Telefone: ${medico.Telefone} <br> Email: ${medico.Email}
                    <button data-crm="${medico.CRM}" class="deleteBtn">Deletar</button>
                `;
                medicosList.appendChild(li);
            });

            // Aplica os listeners de delete após carregar a lista
            applyDeleteListeners();
        })
        .catch(err => console.log(err));
}

// Função para aplicar os event listeners de delete nos botões "Deletar"
function applyDeleteListeners() {
    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', deleteMedico); // Liga a função de deletar ao botão
    });
}

// Função para deletar um médico
function deleteMedico(event) {
    const crm = event.target.getAttribute('data-crm');

    fetch(`/medico/${crm}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadMedicos(); // Recarrega a lista de médicos após deletar
        } else {
            console.log('Erro ao deletar médico');
        }
    })
    .catch(err => console.log(err));
}

// Event listener para o formulário de criação de médicos
createMedicoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const medicoData = {
        nome: document.getElementById('nome').value,
        crm: document.getElementById('crm').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value
    };

    fetch('/medico', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicoData)
    })
    .then(response => response.json())
    .then(data => {
        loadMedicos(); // Recarrega a lista de médicos após adicionar um novo médico
        createMedicoForm.reset(); // Limpa o formulário
    })
    .catch(err => console.log(err));
});

// Event listener para o botão de busca
document.getElementById('botaoPesquisar').addEventListener('click', function() {
    const tipoBusca = document.getElementById('tipoBusca').value;
    const pesquisarMedico = document.getElementById('pesquisarMedico').value;

    fetch(`/medico?${tipoBusca}=${encodeURIComponent(pesquisarMedico)}`)
            .then(response => response.json())
            .then(data => {
                medicosList.innerHTML = '';

                if (data.data && data.data.length > 0) {
                    data.data.forEach(medico => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            Nome: ${medico.Nome} <br> CRM: ${medico.CRM} <br> Telefone: ${medico.Telefone} <br> Email: ${medico.Email}
                            <button data-crm="${medico.CRM}" class="deleteBtn">Deletar</button>
                        `;
                        medicosList.appendChild(li);
                    });
                } else {
                    medicosList.innerHTML = '<li>Nenhum médico encontrado.</li>';
                }

                // Aplica os listeners de delete após a busca
                applyDeleteListeners();
            })
            .catch(err => console.log('Erro ao buscar médicos:', err));
});

loadMedicos();
