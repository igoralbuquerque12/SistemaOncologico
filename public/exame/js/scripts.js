const examesList = document.getElementById('medicosList');
const createExameForm = document.getElementById('createMedicoForm');

document.getElementById('tipoBusca').addEventListener('change', function() {
    const tipoBusca = this.value
    if (tipoBusca === 'data') {
        document.getElementById('pesquisarExame').type = 'date'
    } else {
        document.getElementById('pesquisarExame').type = 'text'
    }
})

function loadExames() {
    fetch('/api/v1/exame')
        .then(response => response.json())
        .then(data => {
            examesList.innerHTML = ''; 

            data.data.forEach(exame => {
                const li = document.createElement('li');
                
                dataFormatada = new Date(exame.data);
                horaFormatada = exame.hora.split(':').slice(0, 2).join(':');
                
                li.innerHTML = 
                    `Tipo: ${exame.cod_tipo} <br> Data: ${dataFormatada.toLocaleDateString('pt-BR')} - ${horaFormatada} <br> Paciente: ${exame.cpf} | Médico responsável: ${exame.crm} <br> Laudo: ${exame.laudo_exame} 
                    <button data-cod_exame="${exame.cod_exame}" class="deleteBtn">Deletar</button>
                `;
                examesList.appendChild(li);
            });

            applyDeleteListeners();
        })
        .catch(err => console.log(err));
}

function applyDeleteListeners() {
    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', deleteExame);
    });
}

function deleteExame(event) {
    const cod_exame = event.target.getAttribute('data-cod_exame');

    fetch(`/api/v1/exame/${cod_exame}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadExames();
        } else {
            console.log('Erro ao deletar exame');
        }
    })
    .catch(err => console.log(err));
}

createExameForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const exameData = {
        cod_tipo: document.getElementById('tipo').value,
        hora: document.getElementById('hora').value,
        data: document.getElementById('data').value,
        cpf: document.getElementById('cpf').value,
        crm: document.getElementById('crm').value,
        laudo_exame: document.getElementById('laudo').value
    };
    
    fetch('/api/v1/exame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exameData)
    })
    .then(response => response.json())
    .then(data => {
        loadExames(); 
        createExameForm.reset(); 
    })
    .catch(err => console.log(err));
});

document.getElementById('botaoPesquisar').addEventListener('click', function() {
    const tipoBusca = document.getElementById('tipoBusca').value;
    let pesquisarExame = document.getElementById('pesquisarExame').value;

    fetch(`/api/v1/exame?${tipoBusca}=${encodeURIComponent(pesquisarExame)}`)
        .then(response => response.json())
        .then(data => {
            examesList.innerHTML = '';
            if (data.data && data.data.length > 0) {
                data.data.forEach(exame => {

                    const li = document.createElement('li');
                    dataFormatada = new Date(exame.data);
                    horaFormatada = exame.hora.split(':').slice(0, 2).join(':');
                    
                    li.innerHTML = 
                        `Tipo: ${exame.cod_tipo} <br> Data: ${dataFormatada.toLocaleDateString('pt-BR')} - ${horaFormatada} <br> Paciente: ${exame.cpf} | Médico responsável: ${exame.crm} <br> Laudo: ${exame.laudo_exame} 
                        <button data-cod_exame="${exame.cod_exame}" class="deleteBtn">Deletar</button>
                    `;
                    examesList.appendChild(li);
                });
            } else {
                examesList.innerHTML = '<li>Nenhum exame encontrado.</li>';
            }

            applyDeleteListeners();
        })
        .catch(err => console.log('Erro ao buscar exames:', err));
});

loadExames();
