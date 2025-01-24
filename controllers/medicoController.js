const Medico = require('../models/medico');
const Auditoria = require('./../models/auditoria');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const jwt = require('jsonwebtoken');

exports.getMedicos = async (req, res) => {
    try {
        const { nome, crm } = req.query;
        let where = {};

        if (nome) {
            where.nome = {
                [Op.like]: `%${nome}%`
            };
        }
        if (crm) {
            where.crm = crm;
        }

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

exports.getOneMedico = async (req, res) => {
    try {
        const medico = await Medico.findByPk(req.params.crm);

        if (!medico) {
            return res.status(404).json({
                status: 'fail',
                message: 'Médico não encontrado.'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: medico
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.createMedico = async (req, res) => {
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
            entidade: 'medicos',
            acao: 'create',
            dados_novos: req.body,
            usuario_id: decode.id,
            data: data
        }, {
            transaction: t
        })

        const medico = await Medico.create({
            nome: req.body.nome,
            crm: req.body.crm,
            telefone: req.body.telefone,
            email: req.body.email
        }, {
            transaction: t    
        })

        await t.commit();

        res.status(201).json({
            status: "success",
            data: medico

    }) } catch (err) { 
        await t.rollback();
        res.status(400).json ({
            status: "fail",
            message: err.message
        })
    }
}

exports.updateMedico = async (req, res) => {

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

        const registroAnterior = await Medico.findByPk(req.params.crm, {
            transaction: t
        });
        
        await Auditoria.create({
            entidade: 'medicos',
            acao: 'update',
            dados_anteriores: registroAnterior,
            dados_novos: req.body,
            usuario_id: decode.id,
            data: data
        }, {
            transaction: t
        })

        const [updatedRows] = await Medico.update(req.body, {
            where: { crm: req.params.crm },
            transaction: t
        });
        
        if (updatedRows === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Nenhum médico encontrado com o CRM fornecido.'
            });
        }

        await t.commit();

        res.status(200).json({
            status: 'success',
            message: 'Médico alterado com sucesso.'
        })
    } catch (err) {
        await t.rollback();
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deleteMedico = async (req, res) => {
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

        const registroAnterior = await Medico.findByPk(req.params.crm, {
            transaction: t
        })

        await Auditoria.create({
            entidade: 'medicos',
            acao: 'create',
            dados_anteriores: registroAnterior,
            usuario_id: decode.id,
            data: data
        }, {
            transaction: t
        })

        const resultado = await Medico.destroy({
            where: {
                crm: req.params.crm
            }, 
            transaction: t
        })

        if (resultado === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Nenhum médico foi encontrado'
            })
        }

        await t.commit();

        res.status(200).json({
            status: 'success',
            message: 'Médico deletado com sucesso'
        })

    } catch (err) {
        t.rollback();
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}
