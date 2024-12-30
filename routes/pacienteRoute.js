const express = require('express')
const router = express.Router()
const pacienteController = require('../controllers/pacienteController')

router
    .route('/')
    .get(pacienteController.getPacientes)
    .post(pacienteController.createPaciente)

router
    .route('/:cpf')
    .get(pacienteController.getOnePaciente)
    .patch(pacienteController.updatePaciente)
    .delete(pacienteController.deletePaciente)

module.exports = router