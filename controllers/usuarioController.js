const Usuario = require('../models/usuario')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(senha, salt);

        await Usuario.create({
            nome: nome,
            email: email,
            usuario: usuario,
            senha: hash
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

exports.loginUsuario = async (req, res) => {
    console.log('chegou')
    const { usuario, senha } = req.body;

    const usuarioEncontrado = await Usuario.findOne({
        where: {
            usuario: usuario
        }
    })

    if (!usuarioEncontrado) {
        return res.status(404).json({
            satus: 'fail',
            message: 'Nenhum usuário encontrado. Faça seu cadastro.'
        })
    }

    const confirmarSenha = await bcrypt.compare(senha, usuarioEncontrado.senha)

    if (!confirmarSenha) {
        return res.status(404).json({
            status: 'fail',
            message: 'Senha incorreta.'
        })
    }
    
    const token = jwt.sign(
        { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.status(200).json({
        status: 'success',
        token,
        message: 'Login feito com sucesso.',
        data: {
            id: usuarioEncontrado.id,
            usuario: usuarioEncontrado.usuario
        }
    })

}