const pacienteModel = require('./../models/pacienteModel')

exports.getPacientes = async (req, res) => {
    try {
        if (req.query.nome) { // Verifica se o parâmetro nome existe
            const paciente = await pacienteModel.getPacienteNome(req.query.nome);
            res.status(200).json({
                status: "success",
                data: { pacientes: paciente }
            });
        } else if (req.query.cpf) { // Verifica se o parâmetro crm existe
            const paciente = await pacienteModel.getPacienteCpf(req.query.cpf);
            res.status(200).json({
                status: "success",
                data: { pacientes: paciente }
            });
        } else {
            const paciente = await pacienteModel.getAllPacientes();
            res.status(200).json({
                status: "success",
                data: { pacientes: paciente }
            });
        }
        
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.createPaciente = async (req, res) => {
    try { 
        const paciente = await pacienteModel.createPaciente(req.body)
        res.status(201).json({
            status: "success",
            data: {
                paciente
            }

    }) } catch (err) { 
        res.status(400).json ({
            status: "fail",
            message: err.message
        })
    }
}

exports.updatePaciente = async (req, res) => {
    try {
        // Inicializa o objeto de atualizações
        let atualizacao = {}

        // Preenche o objeto de atualizações com os valores de req.body
        const keys = Object.keys(req.body)
        keys.forEach(key => {
            atualizacao[key] = req.body[key]
        })
        console.log(atualizacao)
        const paciente = await pacienteModel.updatePaciente(atualizacao, req.params.cpf)

        res.status(200).json({
            status: 'success',
            data: { 
                paciente
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deletePaciente = async (req, res) => {
    try {
        const paciente = await pacienteModel.deletePaciente(req.params.cpf)
        
        res.status(200).json({
            status: 'success',
            data: { 
                paciente
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}