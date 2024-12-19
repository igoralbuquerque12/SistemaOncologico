const Exame = require('./../models/exame');

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

exports.createExame = async (req, res) => {
    try {
        const exame = await Exame.create({
            hora: req.body.hora,
            data: req.body.data,
            cod_tipo: req.body.cod_tipo,
            crm: req.body.crm,
            cpf: req.body.cpf,
            laudo_exame: req.body.laudo_exame
        })
        
        res.status(201).json({
            status: "success",
            data: exame
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.updateExame = async (req, res) => {
    try {
        

        res.status(200).json({
            status: 'success',
            data: { 
                exame
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteExame = async (req, res) => {
    try {
        const resultado = await Exame.destroy({
            where: {
                cod_exame: req.params.cod_exame
            }
        })

        if (resultado === 0) {
            res.status(404).json({
                status: 'fail',
                message: 'Nenhum exame encontrado para ser deletado.'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Exame deletado com sucesso!'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};
