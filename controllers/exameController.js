const exameModel = require('./../models/exameModel');

exports.getExames = async (req, res) => {
    try {
        if (req.query.data) { // Verifica se o parâmetro data existe
            const exame = await exameModel.getExamePorData(req.query.data);
            res.status(200).json({
                status: "success",
                data: { exames: exame }
            });
        } else if (req.query.tipo) { // Verifica se o parâmetro cod_tipo existe
            const exame = await exameModel.getExamePorCodTipo(req.query.tipo);
            res.status(200).json({
                status: "success",
                data: { exames: exame }
            });
        } else if (req.query.crm) { // Verifica se o parâmetro crm existe
            const exame = await exameModel.getExamePorCrm(req.query.crm);
            res.status(200).json({
                status: "success",
                data: { exames: exame }
            });
        } else if (req.query.cpf) { // Verifica se o parâmetro cpf existe
            const exame = await exameModel.getExamePorCpf(req.query.cpf);
            res.status(200).json({
                status: "success",
                data: { exames: exame }
            });
        } else if (req.query.cod_exame) { // Verifica se o parâmetro cod_exame existe
            const exame = await exameModel.getExamePorCodExame(req.query.cod_exame);
            res.status(200).json({
                status: "success",
                data: { exames: exame }
            });
        } else {
            const exame = await exameModel.getAllExames();
            res.status(200).json({
                status: "success",
                data: { exames: exame }
            });
        }
        
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.createExame = async (req, res) => {
    try {
        const exame = await exameModel.createExame(req.body);
        res.status(201).json({
            status: "success",
            data: {
                exame
            }
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
        let atualizacao = {};

        const keys = Object.keys(req.body);
        keys.forEach(key => {
            atualizacao[key] = req.body[key];
        });

        const exame = await exameModel.updateExame(atualizacao, req.params.cod_exame);

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
        const exame = await exameModel.deleteExame(req.params.cod_exame);

        res.status(200).json({
            status: 'success',
            data: { 
                exame
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};
