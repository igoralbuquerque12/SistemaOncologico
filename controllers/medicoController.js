const medicoModel = require('./../models/medicoModel')

exports.getMedicos = async (req, res) => {
    try { 
        if (req.query.nome) { // Verifica se o parâmetro nome existe
            const medico = await medicoModel.getMedicoNome(req.query.nome);
            res.status(200).json({
                status: "success",
                data: { medicos: medico }
            });
        } else if (req.query.crm) { // Verifica se o parâmetro crm existe
            const medico = await medicoModel.getMedicoCrm(req.query.crm);
            res.status(200).json({
                status: "success",
                data: { medicos: medico }
            });
        } else {
            const medico = await medicoModel.getAllMedicos();
            res.status(200).json({
                status: "success",
                data: { medicos: medico }
            });
        }
        
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

// A P A G A R
// exports.getAllMedicos = async (req, res) => {
//     try {
//         const medicos = await medicoModel.getAllMedicos()
//         res.status(200).json({
//             status: 'success',
//             results: medicos.length,
//             data: {
//                 medicos
//             }
//         })
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             message: err.message
//         })
//     }
// }

exports.createMedico = async (req, res) => {
    try { 
        const medico = await medicoModel.createMedico(req.body)
        res.status(201).json({
            status: "success",
            data: {
                medico
            }

    }) } catch (err) { 
        res.status(400).json ({
            status: "fail",
            message: err.message
        })
    }
}

exports.updateMedico = async (req, res) => {
    try {
        // Inicializa o objeto de atualizações
        let atualizacao = {}

        // Preenche o objeto de atualizações com os valores de req.body
        const keys = Object.keys(req.body)
        keys.forEach(key => {
            atualizacao[key] = req.body[key]
        })
        console.log(atualizacao)
        const medico = await medicoModel.updateMedico(atualizacao, req.params.crm)

        res.status(200).json({
            status: 'success',
            data: { 
                medico
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deleteMedico = async (req, res) => {
    try {
        const medico = await medicoModel.deleteMedico(req.params.crm)
        
        res.status(200).json({
            status: 'success',
            data: { 
                medico
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}