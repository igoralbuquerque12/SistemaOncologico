const express = require('express')
const router = express.Router()
const exameController = require('../controllers/exameController')

router
    .route('/')
    .get(exameController.getExames)
    .post(exameController.createExame)

router
    .route('/:cod_exame')
    .patch(exameController.updateExame)
    .delete(exameController.deleteExame)

module.exports = router