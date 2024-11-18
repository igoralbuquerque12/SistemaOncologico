const express = require('express')
const router = express.Router()
const medicoController = require('../controllers/medicoController')

router
    .route('/')
    .get(medicoController.getMedicos)
    .post(medicoController.createMedico)

router
    .route('/:crm')
    .patch(medicoController.updateMedico)
    .delete(medicoController.deleteMedico)

module.exports = router