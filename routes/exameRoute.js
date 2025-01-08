const express = require('express')
const router = express.Router()
const exameController = require('../controllers/exameController')
const authLogin = require('./../middlewares/authLogin')

router
    .route('/')
    .get(authLogin.autenticarUsuario, exameController.getExames)
    .post(authLogin.autenticarUsuario, exameController.createExame)

router
    .route('/:cod_exame')
    .get(authLogin.autenticarUsuario, exameController.getOneExame)
    .patch(authLogin.autenticarUsuario, exameController.updateExame)
    .delete(authLogin.autenticarUsuario, exameController.deleteExame)

module.exports = router