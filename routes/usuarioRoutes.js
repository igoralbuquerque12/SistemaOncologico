const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')

router
    .route('/cadastro')
    .post(usuarioController.cadastrarUsuario)

router
    .route('/login')
    .post(usuarioController.loginUsuario)

module.exports = router