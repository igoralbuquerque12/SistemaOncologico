const examesList = document.getElementById('medicosList');
const createExameForm = document.getElementById('createMedicoForm');

// Função para carregar todos os exames
function loadExames() {
    fetch('/api/v1/exame')
        .then(response => response.json())
        .then(data => {
            examesList.innerHTML = ''; // Limpa a lista existente de exames

            data.data.exames.forEach(exame => {
                const li = document.createElement('li');
                
                dataFormatada = new Date(exame.Data);
                horaFormatada = exame.Hora.split(':').slice(0, 2).join(':');
                
                li.innerHTML = 
                    `Tipo: ${exame.Cod_tipo} <br> Data: ${dataFormatada.toLocaleDateString('pt-BR')} - ${horaFormatada} <br> Paciente: ${exame.Cpf} | Médico responsável: ${exame.CRM} <br> Laudo: ${exame.Laudo_exame} 
                    <button data-cod_exame="${exame.Cod_exame}" class="deleteBtn">Deletar</button>
                `;
                examesList.appendChild(li);
            });

            // Aplica os listeners de delete após carregar a lista
            applyDeleteListeners();
        })
        .catch(err => console.log(err));
}

// Função para aplicar os event listeners de delete nos botões "Deletar"
function applyDeleteListeners() {
    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', deleteExame);
    });
}

// Função para deletar um exame
function deleteExame(event) {
    const cod_exame = event.target.getAttribute('data-cod_exame');

    fetch(`/api/v1/exame/${cod_exame}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadExames(); // Recarrega a lista de exames após deletar
        } else {
            console.log('Erro ao deletar exame');
        }
    })
    .catch(err => console.log(err));
}

// Event listener para o formulário de criação de exames
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
        loadExames(); // Recarrega a lista de exames após adicionar um novo exame
        createExameForm.reset(); // Limpa o formulário
    })
    .catch(err => console.log(err));
});

// Event listener para o botão de busca
document.getElementById('botaoPesquisar').addEventListener('click', function() {
    const tipoBusca = document.getElementById('tipoBusca').value;
    let pesquisarExame = document.getElementById('pesquisarExame').value;
    
    if (pesquisarExame === '') {
        loadExames();
    } else {
        if (tipoBusca === 'data') {
            const partes = pesquisarExame.split('/') // gera um vetor ['02', '10', '2024'] 
            pesquisarExame = `${partes[2]}-${partes[1]}-${partes[0]}`
        }
        console.log(tipoBusca)
        console.log(pesquisarExame)
        let url = `/api/v1/exame?${tipoBusca}=${encodeURIComponent(pesquisarExame)}` // codifica o "?", "$", "/", etc para a variavel nao estragar o URL
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                examesList.innerHTML = ''; // Limpa a lista de exames
    
                if (data.data && data.data.exames.length > 0) {
                    data.data.exames.forEach(exame => {
                        
                        const li = document.createElement('li');
                        dataFormatada = new Date(exame.Data);
                        horaFormatada = exame.Hora.split(':').slice(0, 2).join(':');
                        
                        li.innerHTML = 
                            `Tipo: ${exame.Cod_tipo} | ${exame.Descricao} <br> Data: ${dataFormatada.toLocaleDateString('pt-BR')} - Hora: ${horaFormatada} <br> Paciente: ${exame.Nome_Paciente} | CPF: ${exame.Cpf} <br> Médico: ${exame.Nome_Medico} | CRM: ${exame.CRM} <br> Laudo: ${exame.Laudo_exame}
                            <button data-cod_exame="${exame.Cod_exame}" class="deleteBtn">Deletar</button>
                        `;
                        examesList.appendChild(li);
                    });
                } else {
                    examesList.innerHTML = '<li>Nenhum exame encontrado.</li>';
                }
    
                // Aplica os listeners de delete após a busca
                applyDeleteListeners();
            })
            .catch(err => console.log('Erro ao buscar exames:', err));
    }
});

// Carrega a lista inicial de exames ao abrir a página
loadExames();
