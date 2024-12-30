const Paciente = require('./../models/paciente')
const { Op } = require('sequelize')

exports.getPacientes = async (req, res) => {
    try {
        const { nome, cpf } = req.query
        where = {}
        if (nome) {
            where.nome = {
                [Op.like]: `%${nome}%`
            }
        }
        if (cpf) {
            where.cpf = {
                [Op.like]: `%${cpf}%`
            }
        }

        const pacientes = await Paciente.findAll({
            where
        })

        res.status(200).json({
            status: "success",
            data: pacientes 
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.getOnePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByPk(req.params.cpf)

        if (!paciente) {
            return res.status(404).json({
                status: 'fail',
                messgae: 'Nenhum paciente foi encontrado.'
            })
        }

        res.status(200).json({
            status: 'success',
            data: paciente
        })

    } catch (err) {
        res.status(400).json ({
            status: "fail",
            message: err.message
        })
    }
}

exports.createPaciente = async (req, res) => {
    try { 
        const paciente = await Paciente.create({
            nome: req.body.nome,
            cpf: req.body.cpf,
            telefone: req.body.telefone,
            sexo: req.body.sexo,
            data_nasc: req.body.data_nasc
        })

        res.status(201).json({
            status: "success",
            data: paciente

    }) } catch (err) { 
        res.status(400).json ({
            status: "fail",
            message: err.message
        })
    }
}

exports.updatePaciente = async (req, res) => {
    try {
        const [ resultado ] = await Paciente.update(req.body, {
            where: {
                cpf: req.params.cpf
            }
        })

        if (resultado[0] === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Nenhum paciente encontrado com o CPF fornecido.'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Paciente atualizado com sucesso.'
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
        const resultado = await Paciente.destroy({
            where: {
                cpf: req.params.cpf
            }
        })
        
        if (resultado === 0) {
            res.status(400).json({
                status: 'fail',
                message: 'Nenhum paciente foi encontrado'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Médico deletado com sucesso!'
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}