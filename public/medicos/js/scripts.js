const medicosList = document.getElementById('medicosList');
const createMedicoForm = document.getElementById('createMedicoForm');

function loadMedicos() {
    fetch('/medico')
        .then(response => response.json())
        .then(data => {
            medicosList.innerHTML = '';
            
            data.data.forEach(medico => {
                const li = document.createElement('li');
                li.innerHTML = `
                    Nome: ${medico.nome} <br> CRM: ${medico.crm} <br> Telefone: ${medico.telefone} <br> Email: ${medico.email}
                    <button data-crm="${medico.crm}" class="deleteBtn">Deletar</button>
                `;
                medicosList.appendChild(li);
            });

            applyDeleteListeners();
        })
        .catch(err => console.log(err));
}

function applyDeleteListeners() {
    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', deleteMedico);
    });
}

function deleteMedico(event) {
    const crm = event.target.getAttribute('data-crm');

    fetch(`/medico/${crm}`, {
        method: 'DELETE'
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

    fetch('/medico', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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

    fetch(`/medico?${tipoBusca}=${encodeURIComponent(pesquisarMedico)}`)
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
