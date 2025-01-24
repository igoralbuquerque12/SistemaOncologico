const express = require('express')
const router = express.Router()
const medicoController = require('../controllers/medicoController')
const authLogin = require('../middlewares/authLogin')

router
    .route('/')
    .get(authLogin.autenticarUsuario, medicoController.getMedicos)
    .post(authLogin.autenticarUsuario, medicoController.createMedico)

router
    .route('/:crm')
    .get(authLogin.autenticarUsuario, medicoController.getOneMedico)
    .patch(authLogin.autenticarUsuario, medicoController.updateMedico)
    .delete(authLogin.autenticarUsuario, medicoController.deleteMedico)

module.exports = router