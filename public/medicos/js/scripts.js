const medicosList = document.getElementById('medicosList');
const createMedicoForm = document.getElementById('createMedicoForm');

const token = sessionStorage.getItem('jwtToken');

function loadMedicos() {
    fetch('/api/v1/medico', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(response => {

            if (response.message == 'Token inválido ou expirado.' || response.message == 'Requisição não possui parâmetro de autorização.') {
                window.location.href = '/login.html'
                alert('Você não está autenticado no sistema. Faça seu login.')
                return;
            }

            if (!response || !response.data) {
                console.error('Formato de resposta inesperado', response);
                return;
            }

            medicosList.innerHTML = '';
            
            response.data.forEach(medico => {
                const li = document.createElement('li');
                li.innerHTML = `
                    Nome: ${medico.nome} <br> CRM: ${medico.crm} <br> Telefone: ${medico.telefone} <br> Email: ${medico.email}
                    <div class="buttons-container">
                        <button data-crm="${medico.crm}" class="updateBtn">Atualizar</button>
                        <button data-crm="${medico.crm}" class="deleteBtn">Deletar</button>
                    </div>
                `;
                medicosList.appendChild(li);
            });

            applyDeleteListeners();
            applyUpdateListeners();
        })
        .catch(err => console.log(err));
}

function applyUpdateListeners() {
    document.querySelectorAll('.updateBtn').forEach(button => {
        button.addEventListener('click', updateMedico)
    });
}

function updateMedico(event) {
    const crm = event.target.getAttribute('data-crm');
    window.location.href = `/medico/atualizar/${crm}`;
}

function applyDeleteListeners() {
    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', deleteMedico);
    });
}

function deleteMedico(event) {
    const crm = event.target.getAttribute('data-crm');

    fetch(`/api/v1/medico/${crm}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            loadMedicos();
        } else {
            console.log('Erro ao deletar médico');
        }
    })
    .catch(err => console.log(err));
}

createMedicoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const medicoData = {
        nome: document.getElementById('nome').value,
        crm: document.getElementById('crm').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value
    };

    fetch('/api/v1/medico', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(medicoData)
    })
    .then(response => response.json())
    .then(data => {
        loadMedicos();
        createMedicoForm.reset(); 
    })
    .catch(err => console.log(err));
});

document.getElementById('botaoPesquisar').addEventListener('click', function() {
    const tipoBusca = document.getElementById('tipoBusca').value;
    const pesquisarMedico = document.getElementById('pesquisarMedico').value;

    fetch(`/api/v1/medico?${tipoBusca}=${encodeURIComponent(pesquisarMedico)}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        medicosList.innerHTML = '';

        if (data.data && data.data.length > 0) {
            data.data.forEach(medico => {
                const li = document.createElement('li');
                li.innerHTML = `
                    Nome: ${medico.nome} <br> CRM: ${medico.crm} <br> Telefone: ${medico.telefone} <br> Email: ${medico.email}
                    <button data-crm="${medico.crm}" class="deleteBtn">Deletar</button>
                `;
                medicosList.appendChild(li);
            });
        } else {
            medicosList.innerHTML = '<li>Nenhum médico encontrado.</li>';
        }

        applyDeleteListeners();
    })
    .catch(err => console.log('Erro ao buscar médicos:', err));
});

loadMedicos();
