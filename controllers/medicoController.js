const Medico = require('../models/medico');
const { Op } = require('sequelize');
const path = require('path')

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
    try { 
        const medico = await Medico.create({
            nome: req.body.nome,
            crm: req.body.crm,
            telefone: req.body.telefone,
            email: req.body.email
        })
        res.status(201).json({
            status: "success",
            data: medico

    }) } catch (err) { 
        res.status(400).json ({
            status: "fail",
            message: err.message
        })
    }
}

exports.updateMedico = async (req, res) => {
    try {
        const resultado = await Medico.update(req.body, {
            where: {
                crm: req.params.crm
            }
        })

        if (resultado === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Nenhum paciente encontrado com o CPF fornecido.'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Médico alterado com sucesso.'
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
                crm: req.params.crm
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
