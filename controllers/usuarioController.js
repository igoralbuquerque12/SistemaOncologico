const Usuario = require('../models/usuario')
const { Op } = require('sequelize')

exports.cadastrarUsuario = async (req, res) => {
    try {
        const { nome, email, usuario, senha } = req.body;

        const usuarioExistentes = await Usuario.findAll({
            where: {
                [Op.or]: [
                    { email: email },
                    { usuario: usuario }
                ]
            }
        })

        for (const registro of usuarioExistentes) {
            if (email === registro.dataValues.email) {
                return res.status(400).json({ message: 'Este e-mail já foi cadastrado.' })
            }
            if (usuario === registro.dataValues.usuario){
                return res.status(400).json({ message: 'Este nome de usuario já existe.' })
            }
        }

        await Usuario.create({
            nome: nome,
            email: email,
            usuario: usuario,
            senha: senha
        })

        res.status(201).json({
            status: 'success',
            message: 'Cadastro realizado com sucesso.'
        })

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}