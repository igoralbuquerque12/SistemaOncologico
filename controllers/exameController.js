const Exame = require('./../models/exame');
const { sequelize } = require('../config/database')
const Auditoria = require('./../models/auditoria')
const jwt = require('jsonwebtoken');

exports.getExames = async (req, res) => {
    try {
        const { cod_tipo, cpf, crm, data } = req.query;
        const where = {}

        if (cod_tipo) {
            where.cod_tipo = cod_tipo
        }
        if (cpf) {
            where.cpf = cpf
        }
        if (crm) {
            where.crm = crm
        }
        if (data) {
            where.data = data
        }

        const exames = await Exame.findAll({
            where
        })

        res.status(200).json({
            status: "success",
            data: exames
        });
        
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.getOneExame = async (req, res) => {
    try {
        const exame = await Exame.findByPk(req.params.cod_exame)

        if (!exame) {
            return res.status(404).json({
                status: 'fail',
                message: 'Exame não encontrado.'
            });
        }

        res.status(200).json({
            status: 'success',
            data: exame
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}

exports.createExame = async (req, res) => {
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
            entidade: 'exames',
            acao: 'create',
            dados_novos: req.body,
            usuario_id: decode.id,
            data: data
        }, {
            transaction: t
        })

        const exame = await Exame.create({
            hora: req.body.hora,
            data: req.body.data,
            cod_tipo: req.body.cod_tipo,
            crm: req.body.crm,
            cpf: req.body.cpf,
            laudo_exame: req.body.laudo_exame
        }, {
            transaction: t    
        })

        await t.commit();

        res.status(201).json({
            status: "success",
            data: exame
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.updateExame = async (req, res) => {
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
        const registroAnterior = await Exame.findByPk(req.params.cod_exame, {
            transaction: t
        });
        
        await Auditoria.create({
            entidade: 'exames',
            acao: 'update',
            dados_anteriores: registroAnterior,
            dados_novos: req.body,
            usuario_id: decode.id,
            data: data
        }, {
            transaction: t
        })

        const [updatedRows] = await Exame.update(req.body, {
            where: { cod_exame: req.params.cod_exame },
            transaction: t
        });
        
        if (updatedRows === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Nenhum exame encontrado com o código fornecido.'
            });
        }

        await t.commit();

        res.status(200).json({
            status: 'success',
            message: 'Exame alterado com sucesso.'
        });
    } catch (err) {
        t.rollback();
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteExame = async (req, res) => {
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
        const registroAnterior = await Exame.findByPk(req.params.cod_exame, {
            transaction: t
        })

        await Auditoria.create({
            entidade: 'exames',
            acao: 'delete',
            dados_anteriores: registroAnterior,
            usuario_id: decode.id,
            data: data
        }, {
            transaction: t
        })

        const resultado = await Exame.destroy({
            where: {
                cod_exame: req.params.cod_exame
            },
            transaction: t
        })
        
        if (resultado === 0) {
            res.status(400).json({
                status: 'fail',
                message: 'Nenhum exame foi encontrado'
            })
        }

        t.commit();

        res.status(200).json({
            status: 'success',
            message: 'Exame deletado com sucesso!'
        })
    } catch (err) {
        t.rollback();
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};
