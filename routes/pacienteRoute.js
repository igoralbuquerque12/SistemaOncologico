const express = require('express')
const router = express.Router()
const pacienteController = require('../controllers/pacienteController')
const authLogin = require('./../middlewares/authLogin')

router
    .route('/')
    .get(authLogin.autenticarUsuario, pacienteController.getPacientes)
    .post(authLogin.autenticarUsuario, pacienteController.createPaciente)

router
    .route('/:cpf')
    .get(authLogin.autenticarUsuario, pacienteController.getOnePaciente)
    .patch(authLogin.autenticarUsuario, pacienteController.updatePaciente)
    .delete(authLogin.autenticarUsuario, pacienteController.deletePaciente)

module.exports = router