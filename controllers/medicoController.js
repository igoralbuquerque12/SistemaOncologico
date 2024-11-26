const Medico = require('./../models/medicoModel');
const { Op } = require('sequelize');

exports.getMedicos = async (req, res) => {
    try {
        const { nome, crm } = req.query;
        let where = {};

        // Adiciona condição para o filtro de nome
        if (nome) {
            where.nome = {
                [Op.like]: `%${nome}%`
            };
        }

        // Adiciona condição para o filtro de CRM
        if (crm) {
            where.CRM = crm;
        }

        // Busca os médicos com base nos filtros aplicados
        const medicos = await Medico.findAll({
            where
        });

        res.status(200).json({
            status: 'success',
            data: medicos
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

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
        const medico = await Medico.create({
            Nome: req.body.Nome,
            CRM: req.body.CRM,
            Telefone: req.body.Telefone,
            Email: req.body.Email
        })
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
        const resultado = await Medico.destroy({
            where: {
                CRM: req.params.CRM
            }
        })

        if (resultado === 0) {
            res.status(404).json({
                status: 'fail',
                message: 'Nenhum médico foi encontrado'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Médico deletado com sucesso'
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}