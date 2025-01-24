const Paciente = require('./../models/paciente')
const Auditoria = require('./../models/auditoria')
const { sequelize } = require('../config/database')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')

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
    const t = await sequelize.transaction();

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Token de autenticação não fornecido.'
        });
    }

    const decode = jwt.decode(token);
    if (!decode || !decode.usuario) {
        return res.status(404).json({
            status: 'fail',
            message: 'Usuário não encontrado.'
        });
    }

    const data = new Date();
     
    try { 
        await Auditoria.create({
            entidade: 'pacientes',
            acao: 'create',
            dados_novos: req.body,
            usuario_id: decode.id,
            data: data
        }, {
            transaction: t
        })

        const paciente = await Paciente.create({
            nome: req.body.nome,
            cpf: req.body.cpf,
            telefone: req.body.telefone,
            sexo: req.body.sexo,
            data_nasc: req.body.data_nasc
        })

        t.commit();

        res.status(201).json({
            status: "success",
            data: paciente

    }) } catch (err) { 
        t.rollback();
        res.status(400).json ({
            status: "fail",
            message: err.message
        })
    }
}

exports.updatePaciente = async (req, res) => {

    const t = await sequelize.transaction();

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Token de autenticação não fornecido.'
        });
    }

    const decode = jwt.decode(token);
    if (!decode || !decode.usuario) {
        return res.status(404).json({
            status: 'fail',
            message: 'Usuário não encontrado.'
        });
    }

    const data = new Date();

    try {

        const registroAnterior = await Paciente.findByPk(req.params.cpf, {
            transaction: t
        });
        
        await Auditoria.create({
            entidade: 'pacientes',
            acao: 'update',
            dados_anteriores: registroAnterior,
            dados_novos: req.body,
            usuario_id: decode.id,
            data: data
        }, {
            transaction: t
        })

        const [updatedRows] = await Paciente.update(req.body, {
            where: { cpf: req.params.cpf },
            transaction: t
        });
        
        if (updatedRows === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Nenhum paciente encontrado com o CPF fornecido.'
            });
        }

        await t.commit();

        res.status(200).json({
            status: 'success',
            message: 'Paciente alterado com sucesso.'
        })
    } catch (err) {
        await t.rollback();
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deletePaciente = async (req, res) => {
    const t = await sequelize.transaction();

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Token de autenticação não fornecido.'
        });
    }

    const decode = jwt.decode(token);
    if (!decode || !decode.usuario) {
        return res.status(404).json({
            status: 'fail',
            message: 'Usuário não encontrado.'
        });
    }

    const data = new Date();

    try {
        const registroAnterior = await Paciente.findByPk(req.params.cpf, {
            transaction: t
        })

        await Auditoria.create({
            entidade: 'pacientes',
            acao: 'delete',
            dados_anteriores: registroAnterior,
            usuario_id: decode.id,
            data: data
        }, {
            transaction: t
        })

        const resultado = await Paciente.destroy({
            where: {
                cpf: req.params.cpf
            },
            transaction: t
        })
        
        if (resultado === 0) {
            res.status(400).json({
                status: 'fail',
                message: 'Nenhum paciente foi encontrado'
            })
        }

        t.commit();

        res.status(200).json({
            status: 'success',
            message: 'Médico deletado com sucesso!'
        })
    } catch (err) {
        t.rollback();
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}